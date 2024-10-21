package usecase

import (
	"time"

	model "github.com/andust/shop_catalog_service/models"
	"github.com/andust/shop_catalog_service/publisher"
	"github.com/andust/shop_catalog_service/repository"
)

type basket struct {
	ProductRepository repository.ProductRepository
	Publisher         publisher.Publisher
}

func NewBasket(productRepository repository.ProductRepository, publisher publisher.Publisher) *basket {
	return &basket{ProductRepository: productRepository, Publisher: publisher}
}

func (b *basket) AddProduct(userId, productId string, quantity int) error {
	result, err := b.ProductRepository.Filter(&repository.ProductFilter{ID: productId})
	if err != nil {
		return err
	}

	firstResult := result.First()
	if firstResult == nil {
		return err
	}

	ptbDTO := model.ProductToBasketDTO{
		BasketId:  "123",
		UserId:    userId,
		ProductId: productId,
		Price:     firstResult.Price,
		Quantity:  quantity,
		AddedAt:   time.Now(),
	}

	b.Publisher.ProductToBasket(ptbDTO)

	return nil
}
