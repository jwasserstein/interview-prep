# Uber Heatmap
Thinking through some options for a system design problem I had from my Uber interview

## Problem
You need to build a system which can show Uber employees a heatmap of where Uber drivers have been.  The driver's mobile app will report its location periodically, and we need to build a system which can store that data and show it to users in the form of a geographical heatmap.  You need to store the last 20 minutes of data and make it available in 1 minute increments.


## Assumptions
- 10 million uber drivers
- 1000 uber employees


## Solution Options

### Geohashing + Redis
My first thought was to buffer the writes in Redis since this is a write heavy workload.  Then I thought since we're only storing 20 minutes of data, storing it persistently on disk may not even be necessary (only takes 20 minutes to rebuild data).  My thought was:
- Use geohash to represent geospatial index
- Store data in Redis (key: `time:geohash`, value: `count`)
- Use Redis' `INCRBY` when location is reported

This can work, but it has the following problems:
- The number of keys we need to list then read from Redis becomes huge


### Database + Buffering in Kafka
Thinking more after the interview, here's another approach.  We can buffer the location events in Kafka, which is fast because Kafka partitions are structured as append-only logs (sequential writes are fast).  We can partition the events by location.  An aggregation service bulk reads events from a partition, aggregates them in-memory, then does an atomic update on that time/location bucket in the database.  Since the events are partitioned by location, no two aggregation nodes will be trying to lock the same database row at the same time.

This is fast because:
- publishing to Kafka is simply appending to a log file
- location events can be partitioned across an arbitrarily large number of partitions
- the aggregators will never compete to lock a given database row, because the rows are all unique per location and the events have been partitioned by location at the Kafka level
