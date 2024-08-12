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
	Discount         uint8     `json:"discount"`
	QuantityInStock  uint16    `json:"quantityInStock"`
	CreatedAt        time.Time `json:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt"`
	SKU              string    `json:"sku"`
	Brand            Brand     `json:"brand"`
	Category         Category  `json:"category"`
}
