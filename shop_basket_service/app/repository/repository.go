package repository

import (
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)

const DB_TIMEOUT = time.Second * 3

var db *mongo.Client

type Repository struct {
	BasketRepository BasketRepository
}

func collection(databaseName string, collectionName string) *mongo.Collection {
	return db.Database(databaseName).Collection(collectionName)
}

func New(client *mongo.Client, databaseName string) *Repository {
	db = client

	return &Repository{
		BasketRepository: NewBasketRepository(collection(databaseName, "basket")),
	}
}
