package model

import (
	"time"
)

type Basket struct {
	ID        string    `json:"id" bson:"_id,omitempty"`
	UserId        string    `json:"userId" bson:"userId"`
	CreatedAt time.Time `json:"createdAt"`
}

// userId: {
//     type: String,
//     required: true,
//   },
//   products: [
//     {
//       id: {
//         type: String,
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//       price: { type: Number, required: true },
//     },
//   ],
//   paymentStatus: {
//     type: String,
//     enum: ["pending", "completed", "failed"],
//     default: "pending",
//   },
//   orderStatus: {
//     type: String,
//     enum: ["processing", "shipped", "delivered", "cancelled"],
//     default: "processing",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },