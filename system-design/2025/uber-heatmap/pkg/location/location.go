package location

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
)

type Location struct {
	Lat  float64
	Long float64
}

func GetCreateLocationController(db *sql.DB) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
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

		UpdateBucket(db, strconv.FormatFloat(input.Lat, 'f', -1, 64), strconv.FormatFloat(input.Long, 'f', -1, 64), 1)
	}
}
