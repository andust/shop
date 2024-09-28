FROM golang:1.23-alpine

WORKDIR /code/shop_order_service

COPY ./app .

RUN go mod download

CMD [ "api" ]
