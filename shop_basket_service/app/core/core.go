package core

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/andust/shop_basket_service/repository"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	_ "github.com/jackc/pgx/v5/stdlib"

	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

var counts int8

type Core struct {
	InfoLog    *log.Logger
	ErrorLog   *log.Logger
	Repository repository.Repository
}

func New() *Core {
	return &Core{
		InfoLog:  log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime),
		ErrorLog: log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile),
	}
}
func (c *Core) initDB(db string) (*mongo.Client, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(db))

	if err != nil {
		return nil, err
	}

	err = client.Ping(ctx, nil)

	if err != nil {
		return nil, err
	}

	return client, nil
}

func (c *Core) InitRepository(databaseName string) error {
	client, err := c.initDB(
		os.Getenv("SBS_DB"),
	)
	if err != nil {
		return err
	}

	c.Repository = *repository.New(client, databaseName)

	return nil
}
