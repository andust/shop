package mock

import (
	"github.com/andust/shop_basket_service/model"
	"github.com/andust/shop_basket_service/repository"
)

type MockBasketRepository struct {
	GetFn          func(q repository.BasketQuery) (*model.Basket, error)
	CreateFn       func(basket *model.Basket) (*model.Basket, error)
	InsertProdctFn func() (*model.Basket, error)
}

func (m MockBasketRepository) Get(q repository.BasketQuery) (*model.Basket, error) {
	if m.GetFn != nil {
		return m.GetFn(q)
	}

	return nil, nil
}

func (m MockBasketRepository) Create(basket *model.Basket) (*model.Basket, error) {
	if m.CreateFn != nil {
		return m.CreateFn(basket)
	}

	return nil, nil
}

func (m MockBasketRepository) InsertProdct(product model.Product) (*model.Basket, error) {
	if m.InsertProdctFn != nil {
		return m.InsertProdctFn()
	}

	return nil, nil
}
