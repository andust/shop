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

type OrderStatus uint8

const (
	ProcessingOrderStatus   OrderStatus = 1
	ShippedOrderStatus   OrderStatus = 2
	DeliveredOrderStatus OrderStatus = 3
	CancelledOrderStatus    OrderStatus = 4
)


type Order struct {
	ID        string    `json:"id" bson:"_id,omitempty"`
	UserId    string    `json:"userId" bson:"userId"`
	PaymentStatus PymentStatus `json:"pymentStatus" bson:"pymentStatus"`
	Status    OrderStatus    `json:"status" bson:"status"`
	CreatedAt time.Time `json:"createdAt"`
}
