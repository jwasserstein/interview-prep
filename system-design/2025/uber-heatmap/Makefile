.PHONY: migrate-up
migrate-up:
	migrate -database "postgres://postgres:example@localhost:5432/postgres?sslmode=disable" -path db/migrations up

.PHONY: migrate-down
migrate-down:
	migrate -database "postgres://postgres:example@localhost:5432/postgres?sslmode=disable" -path db/migrations down

.PHONY: migrate-create
migrate-create:
	migrate create -ext sql -dir db/migrations -seq $(NAME)