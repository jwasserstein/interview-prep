package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/StefanSchroeder/Golang-Ellipsoid/ellipsoid"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type AggregatedLocations struct {
	NorthWestLatitude  float64
	NorthWestLongitude float64
	SouthEastLatitude  float64
	SouthEastLongitude float64
	Count              int
}

type Heatmap struct {
	Locations []AggregatedLocations
}

type Location struct {
	Lat  float64
	Long float64
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("error loading .env file: %v\n", err)
	}

	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("unable to connect to db: %v\n", err)
	}
	defer db.Close()

	cache := &[]Location{}
	lock := &sync.Mutex{}

	http.HandleFunc("GET /locations", GetGetLocationController(db))
	http.HandleFunc("POST /locations", GetAddLocationController(db, cache, lock))
	http.HandleFunc("OPTIONS /locations", GetOptionsController())

	go func() {
		for {
			time.Sleep(time.Second)
			flushCacheToDB(db, cache, lock)
		}
	}()

	fmt.Println("starting server on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func GetOptionsController() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header()["Access-Control-Allow-Origin"] = []string{"*"}
		w.WriteHeader(http.StatusOK)
	}
}

func GetAddLocationController(db *sql.DB, cache *[]Location, lock *sync.Mutex) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header()["Access-Control-Allow-Origin"] = []string{"*"}

		body, err := io.ReadAll(r.Body)
		if err != nil {
			fmt.Println("failed to read body:", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		var input Location
		err = json.Unmarshal(body, &input)
		if err != nil {
			fmt.Println("failed to unmarshal body:", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		lock.Lock()
		*cache = append(*cache, input)
		lock.Unlock()
	}
}

func GetGetLocationController(db *sql.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header()["Access-Control-Allow-Origin"] = []string{"*"}

		northWestLat := getParam("northWestLat", r.URL.Query())
		northWestLong := getParam("northWestLong", r.URL.Query())
		southEastLat := getParam("southEastLat", r.URL.Query())
		southEastLong := getParam("southEastLong", r.URL.Query())
		squareSize := getSquareSize(northWestLat, northWestLong, southEastLat, southEastLong)

		query := `WITH Params AS (
SELECT
	ST_SetSRID(ST_MakeEnvelope(
		$2,
		$3,
		$4,
		$1 
	), 4326) AS bbox_geom_4326,
	CAST($5 AS int) AS square_size_meters,
	CAST($6 AS int) AS proj_srid
),
PointsInBounds AS (
    SELECT
        l.location_id,
        ST_Transform(l.loc, p.proj_srid) AS location_proj
    FROM
        location AS l, Params AS p
    WHERE
        ST_Contains(p.bbox_geom_4326, l.loc)
),
GridBounds AS (
    SELECT ST_Extent(pib.location_proj) AS raw_bounds
    FROM PointsInBounds pib
),
SquareGrid AS (
    SELECT
         ST_SetSRID(t.geom, p.proj_srid) AS geom,
         t.i,
         t.j 
    FROM
         GridBounds gb
    CROSS JOIN
         Params p
    CROSS JOIN
         LATERAL ST_SquareGrid(p.square_size_meters, ST_SetSRID(gb.raw_bounds, p.proj_srid)) as t
    WHERE
        gb.raw_bounds IS NOT NULL AND NOT ST_IsEmpty(gb.raw_bounds)
)
SELECT
    ST_YMax(ST_Envelope(ST_Transform(h.geom, 4326))) AS nw_latitude,
    ST_XMin(ST_Envelope(ST_Transform(h.geom, 4326))) AS nw_longitude,
    ST_YMin(ST_Envelope(ST_Transform(h.geom, 4326))) AS se_latitude,
    ST_XMax(ST_Envelope(ST_Transform(h.geom, 4326))) AS se_longitude,
    COUNT(pib.location_id) AS total_count
FROM
    SquareGrid h
JOIN
    PointsInBounds pib ON ST_Intersects(h.geom, pib.location_proj)
GROUP BY
    h.geom
ORDER BY
    nw_latitude DESC, nw_longitude ASC;`
		rows, err := db.Query(query, northWestLat, northWestLong, southEastLat, southEastLong, squareSize, 32610)
		if err != nil {
			log.Fatalf("query failed: %v\n", err)
		}
		defer rows.Close()

		data := make([]AggregatedLocations, 0)
		for rows.Next() {
			next := AggregatedLocations{}
			err := rows.Scan(&next.NorthWestLatitude, &next.NorthWestLongitude, &next.SouthEastLatitude, &next.SouthEastLongitude, &next.Count)
			if err != nil {
				log.Fatalf("failed to read row: %v\n", err)
			}
			data = append(data, next)
		}

		heatmap := Heatmap{
			Locations: data,
		}
		jsonBytes, err := json.Marshal(heatmap)
		if err != nil {
			fmt.Println("failed to marshal response")
			w.WriteHeader(http.StatusInternalServerError)
		}
		w.WriteHeader(http.StatusOK)
		w.Write(jsonBytes)
	}
}

func getParam(key string, values url.Values) float64 {
	strs := values[key]
	if len(strs) == 0 {
		return 0.0
	}
	parsed, err := strconv.ParseFloat(strs[0], 64)
	if err != nil {
		return 0.0
	}
	return parsed
}

func getSquareSize(nwLat float64, nwLong float64, seLat float64, seLong float64) int {
	e := ellipsoid.Init("WGS84", ellipsoid.Degrees, ellipsoid.Meter, ellipsoid.LongitudeIsSymmetric, ellipsoid.BearingIsSymmetric)
	x, y := e.Displacement(nwLat, nwLong, seLat, seLong)

	greater := math.Max(math.Abs(x), math.Abs(y))

	return int(math.Floor(greater / 30.0))
}

func flushCacheToDB(db *sql.DB, cache *[]Location, lock *sync.Mutex) {
	if len(*cache) == 0 {
		return
	}

	lock.Lock()
	cacheCopy := *cache
	*cache = []Location{}
	lock.Unlock()

	num := 1
	strs := []string{}
	values := []any{}
	for _, location := range cacheCopy {
		strs = append(strs, fmt.Sprintf("(ST_SetSRID(ST_MakePoint($%d, $%d), 4326))", num, num+1))
		values = append(values, location.Long, location.Lat)

		num += 2
	}

	fmt.Printf("going to flush %v row(s)\n", len(strs))

	query := "INSERT INTO location (loc) VALUES " + strings.Join(strs, ", ") + ";"
	rows, err := db.Query(query, values...)
	if err != nil {
		log.Fatalf("update bucket failed: %v\n", err)
	}
	defer rows.Close()
}
