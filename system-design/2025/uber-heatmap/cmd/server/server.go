package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"uber-heatmap/pkg/heatmap"
	"uber-heatmap/pkg/location"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

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

	http.HandleFunc("GET /heatmap", heatmap.GetGetHeatmapController(db))
	http.HandleFunc("POST /location", location.GetCreateLocationController(db))

	fmt.Println("starting server on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
