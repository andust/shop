FROM golang:1.22-alpine

WORKDIR /code/shop_basket_service

COPY ./app .

RUN go mod download

CMD [ "api" ]
