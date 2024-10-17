package publisher

import "github.com/nats-io/nats.go"

type publisher struct {
	NC *nats.Conn
}

type Publisher interface{}

func NewPublisher(nc *nats.Conn) Publisher {
	return publisher{NC: nc}
}
