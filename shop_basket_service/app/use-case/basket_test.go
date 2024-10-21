package usecase

import (
	"testing"
	"time"

	internalerrors "github.com/andust/shop_basket_service/internal-errors"
	"github.com/andust/shop_basket_service/model"
	"github.com/andust/shop_basket_service/repository"
	"github.com/andust/shop_basket_service/repository/mock"
	"github.com/stretchr/testify/assert"
)

func newProduct(id string, price float32, quantity int) model.Product {
	return model.Product{
		ID:       id,
		Price:    price,
		Quantity: quantity,
		AddedAt:  time.Now(),
	}
}

// go test -timeout 30s -v -run ^Test_BasketUseCaseAddProdcutWithIdAndUserID$ ./use-case
func Test_BasketUseCaseAddProdcutWithIdAndUserID(t *testing.T) {
	userId := "1"

	product1 := newProduct("1", 12.99, 1)
	product1q3 := newProduct("1", 12.99, 3)
	product2 := newProduct("2", 29.00, 2)
	product2qMinus3 := newProduct("2", 29.00, -3)

	tests := []struct {
		name             string
		GetFcCall        func(q repository.BasketQuery) (*model.Basket, error)
		addProduct       model.Product
		result           model.Basket
		productsQuantity int
		isErr            bool
		errType          error
	}{
		{
			name: "Add one product to empty basket",
			GetFcCall: func(q repository.BasketQuery) (*model.Basket, error) {
				return &model.Basket{
					UserId: userId,
				}, nil
			},
			addProduct: product1,
			result: model.Basket{
				Products: []model.Product{
					product1,
				},
			},
			productsQuantity: 1,
		},
		{
			name: "Add next product to basket",
			GetFcCall: func(q repository.BasketQuery) (*model.Basket, error) {
				return &model.Basket{
					UserId: userId,
					Products: []model.Product{
						product1,
					},
				}, nil
			},
			addProduct: product2,
			result: model.Basket{
				Products: []model.Product{
					product1,
					product2,
				},
			},
			productsQuantity: 3,
		},
		{
			name: "Insert more product quantity to basket",
			GetFcCall: func(q repository.BasketQuery) (*model.Basket, error) {
				return &model.Basket{
					UserId: userId,
					Products: []model.Product{
						product1,
						product2,
					},
				}, nil
			},
			addProduct: product1q3,
			result: model.Basket{
				Products: []model.Product{
					product1,
					product1q3,
				},
			},
			productsQuantity: 5,
		},
		{
			name: "Insert lt 1 product quantity to basket",
			GetFcCall: func(q repository.BasketQuery) (*model.Basket, error) {
				return &model.Basket{
					UserId: userId,
					Products: []model.Product{
						product1q3,
						product2,
					},
				}, nil
			},
			addProduct: product2qMinus3,
			result: model.Basket{
				Products: []model.Product{
					product1q3,
					product2,
				},
			},
			productsQuantity: 5,
			isErr:            true,
			errType:          internalerrors.ErrMinusQuantity,
		},
	}

	for _, tt := range tests {
		mBasketRepository := &mock.MockBasketRepository{
			GetFn: tt.GetFcCall,
		}

		basketUseCase := NewBasket(userId, mBasketRepository)

		basket, err := basketUseCase.AddProduct(tt.addProduct)
		if tt.isErr {
			assert.ErrorIs(t, err, tt.errType)
			return
		}

		assert.NoError(t, err, "Expected no error while adding product to basket", tt.name)
		assert.Equal(t, len(tt.result.Products), len(basket.Products), tt.name)
		assert.Equal(t, tt.productsQuantity, basket.TotalProductsQuantity(), tt.name)
	}
}
