package main

import (
	"bytes"
	"encoding/json"
	"fmt"
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
	numLocations := 20

	northWestLat, northWestLong := 38.292986, -122.990019 //37.801057, -122.515872
	southEastLat, southEastLong := 37.010379, -121.266550 //37.730492, -122.373565

	for i := 0; i < numLocations; i++ {
		req := Location{
			Lat:  southEastLat + (northWestLat-southEastLat)*rand.Float64(),
			Long: southEastLong + (northWestLong-southEastLong)*rand.Float64(),
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
	numWorkers := 1000
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
