package usecase

import (
	"fmt"

	internalerrors "github.com/andust/shop_basket_service/internal-errors"
	"github.com/andust/shop_basket_service/model"
	"github.com/andust/shop_basket_service/repository"
)

type basket struct {
	id               string
	userId           string
	BasketRepository repository.BasketRepository
}

func NewBasket(id, userId string, basketRepository repository.BasketRepository) *basket {
	return &basket{BasketRepository: basketRepository}
}

// If user log in we synchronize/create basket for this user
func (b *basket) SynchronizeBasket(products []model.Product) (*model.Basket, error) {
	dbBasket, err := b.BasketRepository.Get(repository.BasketQuery{
		UserId: b.userId,
	})
	if err != nil {
		return nil, err
	}

	// TODO finish this if necessary
	fmt.Println(dbBasket)

	return nil, nil
}

func (b *basket) AddProduct(product model.Product) (*model.Basket, error) {
	if product.Quantity < 1 {
		return nil, internalerrors.ErrMinusQuantity
	}

	dbBasket, err := b.BasketRepository.Get(repository.BasketQuery{
		ID:     b.id,
		UserId: b.userId,
	})
	if err != nil {
		return nil, err
	}

	if len(dbBasket.Products) > 0 {
		// check if product is in basket,
		// if yes, update basket product quantity
		var isInBasket bool
		for i := range dbBasket.Products {
			if dbBasket.Products[i].ID == product.ID {
				dbBasket.Products[i].Quantity = product.Quantity
				isInBasket = true
			}
		}

		// if we don't find product in basket, then we add it to basket
		if !isInBasket {
			dbBasket.Products = append(dbBasket.Products, product)
		}
	} else {
		dbBasket.Products = append(dbBasket.Products, product)
	}

	// update basket in db

	return dbBasket, nil
}
