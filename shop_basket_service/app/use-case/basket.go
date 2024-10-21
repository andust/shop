package usecase

import (
	"errors"
	"fmt"
	"time"

	internalerrors "github.com/andust/shop_basket_service/internal-errors"
	"github.com/andust/shop_basket_service/model"
	"github.com/andust/shop_basket_service/repository"
	"go.mongodb.org/mongo-driver/mongo"
)

type basket struct {
	userId           string
	BasketRepository repository.BasketRepository
}

type Basket interface {
	AddProduct(product model.Product) (*model.Basket, error)
}

func NewBasket(userId string, basketRepository repository.BasketRepository) *basket {
	return &basket{userId: userId, BasketRepository: basketRepository}
}

func (b *basket) SynchronizeBasket(basket model.Basket) (*model.Basket, error) {
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

	if b.userId == "" {
		return nil, errors.New("no user")
	}

	dbBasket, err := b.BasketRepository.Get(repository.BasketQuery{
		UserId: b.userId,
	})
	if err != nil {
		if err == mongo.ErrNoDocuments {
			dbBasket, err = b.BasketRepository.Create(&model.Basket{
				UserId:    b.userId,
				CreatedAt: time.Now(),
			})
			if err != nil {
				return nil, err
			}
		}

		if dbBasket == nil {
			return nil, err
		}
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
