INSERT INTO buckets (count, location) VALUES
(
    200,
    ST_SetSRID(ST_MakePoint(-122.4194, 37.7749), 4326) -- Example: San Francisco coordinates
);