package publisher

import (
	"encoding/json"
	"errors"

	model "github.com/andust/shop_catalog_service/models"
	"github.com/nats-io/nats.go"
)

type publisher struct {
	NC *nats.Conn
}

type Publisher interface {
	ProductToBasket(ptbDTO model.ProductToBasketDTO) error
}

func NewPublisher(nc *nats.Conn) Publisher {
	return &publisher{NC: nc}
}

func (p *publisher) ProductToBasket(ptbDTO model.ProductToBasketDTO) error {
	ptbDTOByte, err := json.Marshal(ptbDTO)
	if err != nil {
		return errors.New("marshal problem")
	}

	return p.NC.Publish("product_to_basket", ptbDTOByte)
}
