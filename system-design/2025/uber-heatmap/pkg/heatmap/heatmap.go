package heatmap

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"uber-heatmap/pkg/location"
)

type Heatmap struct {
	Buckets []location.AggregatedBucket
}

func GetGetHeatmapController(db *sql.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		query := r.URL.Query()
		lat := query["lat"]
		if len(lat) == 0 {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		long := query["long"]
		if len(long) == 0 {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		heatmap := Heatmap{
			Buckets: location.GetBuckets(db, lat[0], long[0]),
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
