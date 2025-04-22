CREATE TABLE location (
    location_id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    loc geometry(Point, 4326)
);
