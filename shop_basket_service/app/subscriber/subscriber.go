package subscriber

import (
	"encoding/json"
	"log"

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

func (s subscriber) ProductToBasket(basketRepository repository.BasketRepository, errorLog *log.Logger) {
	s.NC.Subscribe("product_to_basket", func(m *nats.Msg) {
		var ptbDTO model.ProductToBasketDTO
		json.Unmarshal(m.Data, &ptbDTO)
		basketUsecase := usecase.NewBasket(ptbDTO.UserId, basketRepository)
		product := model.Product{
			ID:       ptbDTO.ID,
			Price:    ptbDTO.Price,
			Quantity: ptbDTO.Quantity,
			AddedAt:  ptbDTO.AddedAt,
		}
		err := basketUsecase.AddProduct(product)
		if err != nil {
			errorLog.Println(err)
		}
	})
}
