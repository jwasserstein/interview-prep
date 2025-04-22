package location

import (
	"database/sql"
	"log"
	"time"
)

type Bucket struct {
	Bucket_id  string
	Started_at time.Time
	Count      int
	Location   string
}

type AggregatedBucket struct {
	Count     int
	Latitude  float64
	Longitude float64
}

func GetBuckets(db *sql.DB, lat string, long string) []AggregatedBucket {
	query := `-- Define target point, radius, projection SRID, and SQUARE size
WITH Params AS (
    SELECT
        ST_SetSRID(ST_MakePoint(-122.44, 37.77), 4326) AS target_point_geom, -- Target Lon/Lat WGS84
        (1000 / 3.28084) AS radius_meters,
        32610 AS proj_srid, -- SRID for WGS 84 / UTM Zone 10N (meters) - Suitable for SF
        25.0 AS square_size_meters -- EXAMPLE: Side length of square grid cells in meters (tune as needed)
),
-- 1. Find relevant points within the initial search radius and project them to the chosen PCS
PointsInRadius AS (
    SELECT
        b.bucket_id,
        b.count,
        -- Project the location geometry to the chosen projected coordinate system (e.g., UTM)
        ST_Transform(b.location, p.proj_srid) AS location_proj
    FROM
        buckets AS b, Params AS p
    WHERE
        b.location IS NOT NULL -- Ensure location is not NULL
        AND ST_DWithin(
            b.location::geography,
            p.target_point_geom::geography,
            p.radius_meters
        )
),
-- 2. Calculate the raw bounding box of the relevant projected points (SRID may be missing)
GridBounds AS (
    SELECT ST_Extent(pir.location_proj) AS raw_bounds -- Calculate only the extent geometry
    FROM PointsInRadius pir
    WHERE pir.location_proj IS NOT NULL -- Need at least one point to define bounds
),
-- 3. Generate the SQUARE grid covering the calculated bounds
SquareGrid AS (
    SELECT
         -- **FIX 2:** Apply ST_SetSRID to the final geometry output by ST_SquareGrid
         ST_SetSRID(t.geom, p.proj_srid) AS geom,
         t.i,
         t.j
    FROM
         GridBounds gb
    CROSS JOIN -- Need parameters (p) for size and SRID
         Params p
    CROSS JOIN -- Use LATERAL for the set-returning function ST_SquareGrid
         -- **FIX 1:** Apply ST_SetSRID to the raw_bounds *before* passing to ST_SquareGrid
         LATERAL ST_SquareGrid(p.square_size_meters, ST_SetSRID(gb.raw_bounds, p.proj_srid)) as t
    WHERE gb.raw_bounds IS NOT NULL AND NOT ST_IsEmpty(gb.raw_bounds) -- Ensure bounds are valid
)
-- 4. Assign points to squares using a spatial join and aggregate the counts
SELECT
    -- Optional: Get representative lat/lon for the square center (in WGS84)
    ST_Y(ST_PointOnSurface(ST_Transform(h.geom, 4326))) AS square_center_lat,
    ST_X(ST_PointOnSurface(ST_Transform(h.geom, 4326))) AS square_center_lon,

    -- Sum the 'count' of all points falling within this square
    SUM(pir.count) AS total_count
FROM
    SquareGrid h -- Use the corrected SquareGrid CTE
JOIN
    PointsInRadius pir ON ST_Intersects(h.geom, pir.location_proj) -- Both SRIDs should now be proj_srid (32610)
GROUP BY
    h.geom -- Group by the unique square geometry (in the projected CRS, 32610)
ORDER BY
    total_count DESC; -- Optional: Order by the most populated squares`
	rows, err := db.Query(query)
	if err != nil {
		log.Fatalf("query failed: %v\n", err)
	}
	defer rows.Close()

	data := make([]AggregatedBucket, 0)
	for rows.Next() {
		next := AggregatedBucket{}
		err := rows.Scan(&next.Latitude, &next.Longitude, &next.Count)
		if err != nil {
			log.Fatalf("failed to read row: %v\n", err)
		}
		data = append(data, next)
	}

	return data
}

func UpdateBucket(db *sql.DB, lat string, long string, count int) []Bucket {
	query := "INSERT INTO buckets (location, started_at, count) VALUES (ST_SetSRID(ST_MakePoint($1, $2), 4326), $3, 1) ON CONFLICT (started_at, location) DO UPDATE SET count = buckets.count + 1 RETURNING *;"
	rows, err := db.Query(query, long, lat, time.Now().Truncate(time.Minute))
	if err != nil {
		log.Fatalf("update bucket failed: %v\n", err)
	}
	defer rows.Close()

	data := make([]Bucket, 0)
	for rows.Next() {
		next := Bucket{}
		err := rows.Scan(&next.Bucket_id, &next.Started_at, &next.Count, &next.Location)
		if err != nil {
			log.Fatalf("failed to read row: %v\n", err)
		}
		data = append(data, next)
	}

	return data
}
