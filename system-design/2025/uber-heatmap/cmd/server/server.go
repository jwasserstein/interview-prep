package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type AggregatedLocations struct {
	Count     int
	Latitude  float64
	Longitude float64
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

	http.HandleFunc("GET /locations", GetGetLocationController(db))
	http.HandleFunc("POST /locations", GetAddLocationController(db))
	http.HandleFunc("OPTIONS /locations", GetOptionsController())

	fmt.Println("starting server on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func GetOptionsController() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header()["Access-Control-Allow-Origin"] = []string{"*"}
		w.WriteHeader(http.StatusOK)
	}
}

func GetAddLocationController(db *sql.DB) func(http.ResponseWriter, *http.Request) {
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

		query := "INSERT INTO location (loc) VALUES (ST_SetSRID(ST_MakePoint($1, $2), 4326));"
		rows, err := db.Query(query, strconv.FormatFloat(input.Long, 'f', -1, 64), strconv.FormatFloat(input.Lat, 'f', -1, 64))
		if err != nil {
			log.Fatalf("update bucket failed: %v\n", err)
		}
		defer rows.Close()
	}
}

func GetGetLocationController(db *sql.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header()["Access-Control-Allow-Origin"] = []string{"*"}

		queryString := r.URL.Query()
		lat := queryString["lat"]
		if len(lat) == 0 {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		long := queryString["long"]
		if len(long) == 0 {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		radius := queryString["radius"]
		if len(radius) == 0 {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		squareSize := queryString["squareSize"]
		if len(squareSize) == 0 {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		query := `WITH Params AS (
			SELECT
				ST_SetSRID(ST_MakePoint($1, $2), 4326) AS target_point_geom,
				CAST($3 AS int) AS radius_meters,
				32610 AS proj_srid,
				CAST($4 as int) AS square_size_meters
			),
			PointsInRadius AS (
				SELECT
					l.location_id,
					ST_Transform(l.loc, p.proj_srid) AS location_proj
				FROM
					location AS l, Params AS p
				WHERE
					ST_DWithin(
						l.loc::geography,
						p.target_point_geom::geography,
						p.radius_meters
					)
			),
			GridBounds AS (
				SELECT ST_Extent(pir.location_proj) AS raw_bounds
				FROM PointsInRadius pir
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
				WHERE gb.raw_bounds IS NOT NULL AND NOT ST_IsEmpty(gb.raw_bounds)
			)
			SELECT
				ST_Y(ST_PointOnSurface(ST_Transform(h.geom, 4326))) AS square_center_lat,
				ST_X(ST_PointOnSurface(ST_Transform(h.geom, 4326))) AS square_center_lon,
				COUNT(pir.location_id) AS total_count
			FROM
				SquareGrid h
			JOIN
				PointsInRadius pir ON ST_Intersects(h.geom, pir.location_proj)
			GROUP BY
				h.geom;`
		rows, err := db.Query(query, long[0], lat[0], radius[0], squareSize[0])
		if err != nil {
			log.Fatalf("query failed: %v\n", err)
		}
		defer rows.Close()

		data := make([]AggregatedLocations, 0)
		for rows.Next() {
			next := AggregatedLocations{}
			err := rows.Scan(&next.Latitude, &next.Longitude, &next.Count)
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
