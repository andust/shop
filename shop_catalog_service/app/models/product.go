package model

import (
	"time"
)

type Product struct {
	ID               string    `json:"id"`
	Name             string    `json:"name"`
	ShortDescription string    `json:"shortDescription"`
	Description      string    `json:"description"`
	Price            float32   `json:"price"`
	DiscountPrice    *float32  `json:"discountPrice"`
	QuantityInStock  uint16    `json:"quantityInStock"`
	CreatedAt        time.Time `json:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt"`
	SKU              string    `json:"sku"`
	Brand            Brand     `json:"brand"`
	Category         Category  `json:"category"`
}

type ProductToBasketDTO struct {
	BasketId  string    `json:"basketId" bson:"_id,omitempty"`
	UserId    string    `json:"userId" bson:"userId"`
	ProductId string    `json:"productId" bson:"_id,omitempty"`
	Price     float32   `json:"price" bson:"price"`
	Quantity  int       `json:"quantity" bson:"quantity"`
	AddedAt   time.Time `json:"addedAt"`
}
