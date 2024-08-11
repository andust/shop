include ./shop_catalog_service/.env
CATALOG_SERVICE_NAME=shop_catalog_service
CATALOG_DATABASE = "postgres://$(CATALOG_POSTGRES_USER):$(CATALOG_POSTGRES_PASSWORD)@$(CATALOG_POSTGRES_DB_HOST):$(CATALOG_POSTGRES_DB_PORT)/$(CATALOG_POSTGRES_DB)?sslmode=disable"

USER_SERVICE_NAME=shop_user_service


migration_dir = migrate/migrations/

# CATALOG SERVICE
catalog-build-api:
	docker compose exec ${CATALOG_SERVICE_NAME} env GOOS=linux CGO_ENABLED=0 go build -o api cmd/api/main.go 

catalog-build-scripts:
	docker compose exec ${CATALOG_SERVICE_NAME} env GOOS=linux CGO_ENABLED=0 go build -o scripts cmd/scripts/main.go 

catalog-build: catalog-build-api catalog-build-scripts
	@echo "build all catalog services"

# example:
# make catalog-migrate-create filename=create_user_table
catalog-migrate-create:
	docker compose exec ${CATALOG_SERVICE_NAME} migrate create -ext sql -dir $(migration_dir) -seq $(filename)

catalog-migrate-up:
	docker compose exec ${CATALOG_SERVICE_NAME} migrate -path $(migration_dir) -database $(CATALOG_DATABASE) -verbose up

catalog-migrate-down:
	docker compose exec ${CATALOG_SERVICE_NAME} migrate -path $(migration_dir) -database $(CATALOG_DATABASE) -verbose down

catalog-build-scripts:
	docker compose exec ${CATALOG_SERVICE_NAME} env GOOS=linux CGO_ENABLED=0 go build -o scripts cmd/scripts/main.go 


# USER SERVICE
user-build-api:
	docker compose exec ${USER_SERVICE_NAME} env GOOS=linux CGO_ENABLED=0 go build -o api cmd/api/main.go 

user-build-scripts:
	docker compose exec ${USER_SERVICE_NAME} env GOOS=linux CGO_ENABLED=0 go build -o scripts cmd/scripts/main.go 

user-build: user-build-api user-build-scripts
	@echo "build all user services"

# ALL
build-api: catalog-build-api user-build-api
	@echo "build all services"
