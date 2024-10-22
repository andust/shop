package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/andust/shop_basket_service/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type BasketRepository interface {
	Get(q BasketQuery) (*model.Basket, error)
	Create(basket *model.Basket) (*model.Basket, error)
	InsertProdct(product model.Product) (*model.Basket, error)
	UpdateByUserId(userId string, updateFields map[string]any) error
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
	ID     string
	UserId string
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

	if b.UserId != "" {
		filter = append(filter, bson.E{
			Key:   "userId",
			Value: b.UserId,
		})
	}

	return filter
}

func (b basketRepository) Get(q BasketQuery) (*model.Basket, error) {
	ctx, cancel := context.WithTimeout(context.Background(), DB_TIMEOUT)
	defer cancel()

	var basket *model.Basket

	filter := q.Filter()
	opts := q.OneEntryOptions()
	err := b.collection.FindOne(ctx, filter, opts).Decode(&basket)
	if err != nil && err != mongo.ErrNilDocument {
		return nil, err
	}

	if basket == nil {
		fmt.Println("pusty")
	}

	return basket, nil
}

func (b basketRepository) Create(basket *model.Basket) (*model.Basket, error) {
	ctx, cancel := context.WithTimeout(context.Background(), DB_TIMEOUT)
	defer cancel()

	insertedResult, err := b.collection.InsertOne(ctx, basket, &options.InsertOneOptions{})
	if err != nil {
		return nil, err
	}

	if oid, ok := insertedResult.InsertedID.(primitive.ObjectID); ok {
		basket.ID = oid.Hex()
	}

	return basket, nil
}

func (b basketRepository) InsertProdct(product model.Product) (*model.Basket, error) {
	ctx, cancel := context.WithTimeout(context.Background(), DB_TIMEOUT)
	defer cancel()

	basket := model.Basket{
		CreatedAt: time.Now(),
		Products:  []model.Product{product},
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

func (b basketRepository) UpdateByUserId(userId string, updateFields map[string]any) error {
	filter := bson.D{{Key: "userId", Value: userId}}

	update := bson.M{
		"$set": bson.M{}, // Używamy $set, aby zaktualizować istniejące pola lub dodać nowe
	}

	for field, value := range updateFields {
		update["$set"].(bson.M)[field] = value
	}

	_, err := b.collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		fmt.Println(err)
	}

	return nil
}
