package location

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/mmcloughlin/geohash"
	"github.com/redis/go-redis/v9"
)

type Location struct {
	Lat  float64
	Long float64
}

func GetCacheKey(t time.Time, lat float64, long float64, precision uint) string {
	now := t.Truncate(time.Minute).Format("2006/01/02_03:04PM") // pacific time
	geo := geohash.EncodeWithPrecision(lat, long, precision)
	return fmt.Sprintf("time:%s-location:%s", now, geo)
}

func GetCreateLocationController(redisClient *redis.Client) func(http.ResponseWriter, *http.Request) {
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

		redisClient.Incr(r.Context(), GetCacheKey(time.Now(), input.Lat, input.Long, 9))
	}
}
