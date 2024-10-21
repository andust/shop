package subscriber

import (
	"encoding/json"
	"fmt"

	"github.com/andust/shop_basket_service/model"
	"github.com/andust/shop_basket_service/repository"
	usecase "github.com/andust/shop_basket_service/use-case"
	"github.com/nats-io/nats.go"
)

type subscriber struct {
	NC *nats.Conn
}

func NewSubscriber(nc *nats.Conn) subscriber {
	return subscriber{NC: nc}
}

func (s subscriber) ProductToBasket(basketRepository repository.BasketRepository) {
	s.NC.Subscribe("product_to_basket", func(m *nats.Msg) {
		var ptbDTO model.ProductToBasketDTO
		json.Unmarshal(m.Data, &ptbDTO)
		basketUsecase := usecase.NewBasket(ptbDTO.UserId, basketRepository)
		product := model.Product{
			ID:       ptbDTO.ProductId,
			Price:    ptbDTO.Price,
			Quantity: ptbDTO.Quantity,
			AddedAt:  ptbDTO.AddedAt,
		}
		basket, err := basketUsecase.AddProduct(product)
		fmt.Println(basket, err)
	})
}
