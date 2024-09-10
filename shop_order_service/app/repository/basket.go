package repository

import (
	"context"
	"time"

	model "github.com/andust/shop_order_service/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type BasketRepository interface {
	FindOne(q BasketQuery) (*model.Basket, error)
	InsertOne() (*model.Basket, error)
}

type basketRepository struct {
	collection *mongo.Collection
}

func NewBasketRepository(collection *mongo.Collection) basketRepository {
	return basketRepository{
		collection: collection,
	}
}

type BasketQuery struct {
	ID string
	Options
}

func (b BasketQuery) Filter() bson.D {
	filter := bson.D{}

	if b.ID != "" {
		if id, err := primitive.ObjectIDFromHex(b.ID); err != nil {
			filter = append(filter, bson.E{
				Key:   "_id",
				Value: id,
			})
		}
	}

	return filter
}

func (b basketRepository) FindOne(q BasketQuery) (*model.Basket, error) {
	ctx, cancel := context.WithTimeout(context.Background(), DB_TIMEOUT)
	defer cancel()

	var basket model.Basket

	filter := q.Filter()
	opts := q.OneEntryOptions()
	err := b.collection.FindOne(ctx, filter, opts).Decode(&basket)
	if err != nil {
		return nil, err
	}

	return &basket, nil
}

func (b basketRepository) InsertOne() (*model.Basket, error) {
	ctx, cancel := context.WithTimeout(context.Background(), DB_TIMEOUT)
	defer cancel()

	basket := model.Basket{
		CreatedAt: time.Now(),
	}
	insertedResult, err := b.collection.InsertOne(ctx, basket)
	if err != nil {
		return nil, err
	}

	if oid, ok := insertedResult.InsertedID.(primitive.ObjectID); ok {
		basket.ID = oid.Hex()
	}

	return &basket, nil
}
