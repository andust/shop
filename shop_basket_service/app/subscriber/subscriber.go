package subscriber

import (
	"encoding/json"
	"fmt"

	"github.com/andust/shop_basket_service/model"
	"github.com/nats-io/nats.go"
)

type subscriber struct {
	NC *nats.Conn
}

type Subscriber interface {
	ProductToBasket()
}

func NewSubscriber(nc *nats.Conn) Subscriber {
	return subscriber{NC: nc}
}

func (s subscriber) ProductToBasket() {
	s.NC.Subscribe("product_to_basket", func(m *nats.Msg) {
		var p model.Product
		json.Unmarshal(m.Data, &p)
		fmt.Println("-----> received a message in basket service: ", p.Quantity, p.ID, p.Price)
	})
}
