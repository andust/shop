package model

import "time"

type Product struct {
	ID       string    `json:"id" bson:"_id,omitempty"`
	Price    float32   `json:"price" bson:"price"`
	Quantity int       `json:"quantity" bson:"quantity"`
	AddedAt  time.Time `json:"addedAt"`
}
