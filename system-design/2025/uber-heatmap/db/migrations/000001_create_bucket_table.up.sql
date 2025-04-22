CREATE TABLE buckets (
    -- Unique identifier for the bucket, automatically incrementing integer
    bucket_id SERIAL PRIMARY KEY,

    -- Timestamp indicating when the bucket started or was created
    started_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Number of drivers reported in this bucket
    count INTEGER,

    -- PostGIS geometry column to store the location (latitude/longitude)
    -- 'geometry(Point, 4326)' specifies:
    --   - The type stored is geometry.
    --   - The specific geometry shape is Point.
    --   - The Spatial Reference System Identifier (SRID) is 4326,
    --     which corresponds to WGS 84 (standard GPS coordinates).
    location geometry(Point, 4326) -- Use SRID 4326 for standard lat/lon
);
