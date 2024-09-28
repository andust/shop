FROM golang:1.23-alpine

# TODO make migrate run as another script
RUN go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@v4.15.2

WORKDIR /code/shop_catalog_service

COPY ./app .

RUN go mod download

CMD [ "api" ]
