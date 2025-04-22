ALTER TABLE buckets
ADD CONSTRAINT unique_bucket_time_location UNIQUE (started_at, location);