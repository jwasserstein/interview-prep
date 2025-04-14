package heatmap

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"
	"uber-heatmap/pkg/location"

	"github.com/redis/go-redis/v9"
)

type Heatmap struct {
	Buckets map[string]int64
}

func GetGetHeatmapController(redisClient *redis.Client) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		query := r.URL.Query()
		lat, err := strconv.ParseFloat(query["lat"][0], 64)
		if err != nil {
			fmt.Printf("failed to parse lat: %v", err)
			return
		}
		long, err := strconv.ParseFloat(query["long"][0], 64)
		if err != nil {
			fmt.Printf("failed to parse lat: %v", err)
			return
		}

		prefixes := make([]string, 20)
		allKeys := make([]string, 0)
		for i := range prefixes {
			t := time.Now().Add(time.Duration(int64(-i)) * time.Minute)
			prefixes[i] = location.GetCacheKey(t, lat, long, 8) + "*"

			keys, err := redisClient.Keys(r.Context(), prefixes[0]).Result()
			if err != nil {
				fmt.Println("failed to list keys:", err)
				w.WriteHeader(http.StatusInternalServerError)
				return
			}

			allKeys = append(allKeys, keys...)
		}
		if len(allKeys) == 0 {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		values, err := redisClient.MGet(r.Context(), allKeys...).Result()
		if err != nil {
			fmt.Println("failed to lookup keys:", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		// aggregate buckets over time
		buckets := map[string]int64{}
		for i, key := range allKeys {
			value, ok := values[i].(string)
			if !ok {
				fmt.Println("failed to cast to a string")
				w.WriteHeader(http.StatusInternalServerError)
				return
			}

			intValue, err := strconv.ParseInt(value, 10, 64)
			if err != nil {
				fmt.Println("failed to parse string to ind")
				w.WriteHeader(http.StatusInternalServerError)
				return
			}

			geoHash := key[len(key)-9:]
			buckets[geoHash] = intValue
		}

		heatmap := Heatmap{
			Buckets: buckets,
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
