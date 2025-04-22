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
	numLocations := 50

	for i := 0; i < numLocations; i++ {
		req := Location{
			Lat:  .1*(rand.Float64()-.5) + 37.77,
			Long: .1*(rand.Float64()-.5) - 122.44,
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
