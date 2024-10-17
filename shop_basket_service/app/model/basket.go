package model

import (
	"time"
)

type PymentStatus uint8

const (
	StartedPymentStatus   PymentStatus = 1
	PendingPymentStatus   PymentStatus = 2
	CompletedPymentStatus PymentStatus = 3
	FailedPymentStatus    PymentStatus = 4
)

type Basket struct {
	ID            string       `json:"id" bson:"_id,omitempty"`
	Products      []Product    `json:"products" bson:"products"`
	PaymentStatus PymentStatus `json:"pymentStatus" bson:"pymentStatus"`
	UserId        string       `json:"userId" bson:"userId"`
	CreatedAt     time.Time    `json:"createdAt"`
}

type Product struct {
	ID       string    `json:"id" bson:"_id,omitempty"`
	Price    float32   `json:"price" bson:"price"`
	Quantity int       `json:"quantity" bson:"quantity"`
	AddedAt  time.Time `json:"addedAt"`
}

func (b *Basket) TotalProductsQuantity() int {
	var result int
	for _, product := range b.Products {
		result += product.Quantity
	}
	return result
}
