package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"math"
	"math/rand"
	"net/http"
	"sync"
	"time"
)

type Location struct {
	Lat  float64
	Long float64
}

func reportLocation() {
	numLocations := 10

	centerLat := 37.77
	centerLong := -122.44
	cityWidth := 10000.0
	deltaLat := cityWidth / 111111 / 2
	deltaLong := cityWidth / (111111 * math.Cos(centerLat+deltaLat) / 2)

	for i := 0; i < numLocations; i++ {
		req := Location{
			Lat:  deltaLat*(2*rand.Float64()-1) + centerLat,
			Long: deltaLong*(2*rand.Float64()-1) + centerLong,
		}
		marshaledReq, err := json.Marshal(req)
		if err != nil {
			fmt.Printf("failed to marshal json: %v\n", req)
			return
		}

		_, err = http.Post("http://localhost:8080/locations", "application/json", bytes.NewBuffer(marshaledReq))
		if err != nil {
			fmt.Printf("failed to report location: %v\n", err)
		}

		time.Sleep(time.Second)
	}
}

func main() {
	numWorkers := 100
	wg := sync.WaitGroup{}
	wg.Add(numWorkers)

	for i := 0; i < numWorkers; i++ {
		go func() {
			defer wg.Done()
			time.Sleep(time.Duration(rand.Intn(5000)) * time.Millisecond)
			reportLocation()
		}()
	}

	wg.Wait()
}
