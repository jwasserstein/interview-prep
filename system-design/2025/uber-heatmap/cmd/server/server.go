package main

import (
	"fmt"
	"log"
	"net/http"
	"uber-heatmap/pkg/heatmap"
	"uber-heatmap/pkg/location"

	"github.com/redis/go-redis/v9"
)

func main() {
	redisClient := redis.NewClient(&redis.Options{Addr: "localhost:6379"})

	http.HandleFunc("GET /heatmap", heatmap.GetGetHeatmapController(redisClient))
	http.HandleFunc("POST /location", location.GetCreateLocationController(redisClient))

	fmt.Println("starting server on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
