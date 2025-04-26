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

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

const originLat = 37.7910
const originLong = -122.4285
const dLat = 0.0015
const dLong = 0.0035

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

		lat, long := getBoundingBoxCenter(input.Lat, input.Long)

		query := "INSERT INTO location (loc, count) VALUES (ST_SetSRID(ST_MakePoint($1, $2), 4326), 1) ON CONFLICT (loc) DO UPDATE SET count = location.count + 1;"
		rows, err := db.Query(query, strconv.FormatFloat(long, 'f', -1, 64), strconv.FormatFloat(lat, 'f', -1, 64))
		if err != nil {
			log.Fatalf("update bucket failed: %v\n", err)
		}
		defer rows.Close()
	}
}

func GetGetLocationController(db *sql.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header()["Access-Control-Allow-Origin"] = []string{"*"}

		northWestLat := getParam("northWestLat", r.URL.Query())
		northWestLong := getParam("northWestLong", r.URL.Query())
		southEastLat := getParam("southEastLat", r.URL.Query())
		southEastLong := getParam("southEastLong", r.URL.Query())

		query := `SELECT ST_Y(location.loc), ST_X(location.loc), count FROM location WHERE ST_Contains(ST_SetSRID(ST_MakeEnvelope($2,$3,$4,$1), 4326), location.loc);`
		rows, err := db.Query(query, northWestLat, northWestLong, southEastLat, southEastLong)
		if err != nil {
			log.Fatalf("query failed: %v\n", err)
		}
		defer rows.Close()

		data := make([]AggregatedLocations, 0)
		for rows.Next() {
			lat := new(float64)
			long := new(float64)
			count := new(int)

			err := rows.Scan(lat, long, count)
			if err != nil {
				log.Fatalf("failed to read row: %v\n", err)
			}

			nwLat, nwLong, seLat, seLong := getBoundingBoxCorners(*lat, *long)
			next := AggregatedLocations{
				NorthWestLatitude:  nwLat,
				NorthWestLongitude: nwLong,
				SouthEastLatitude:  seLat,
				SouthEastLongitude: seLong,
				Count:              *count,
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

func getBoundingBoxCenter(lat float64, long float64) (float64, float64) {
	centerLat := math.Floor((lat-originLat)/dLat)*dLat + originLat + dLat/2
	centerLong := math.Floor((long-originLong)/dLong)*dLong + originLong + dLong/2

	return centerLat, centerLong
}

func getBoundingBoxCorners(lat float64, long float64) (float64, float64, float64, float64) {
	return lat - dLat/2, long - dLong/2, lat + dLat/2, long + dLong/2
}

/*

dLat = 0.0015
dLong = 0.0035

center = 37.7910, -122.4285

*/
