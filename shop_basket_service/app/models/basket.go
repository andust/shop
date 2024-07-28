package model

import (
	"time"
)

type Basket struct {
	ID        string    `json:"id" bson:"_id,omitempty"`
	CreatedAt time.Time `json:"createdAt"`
}
