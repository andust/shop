package core

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/andust/shop_user_service/repository"
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
	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	return &Core{
		InfoLog:  infoLog,
		ErrorLog: errorLog,
	}
}
func (c *Core) initDB(db string) (error, *mongo.Client) {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(db))

	if err != nil {
		return err, nil
	}

	err = client.Ping(ctx, nil)

	if err != nil {
		return err, nil
	}

	return nil, client
}

func (c *Core) InitRepository(databaseName string) error {
	err, client := c.initDB(
		os.Getenv("SUS_DB"),
	)
	if err != nil {
		return err
	}

	c.Repository = *repository.New(client, databaseName)

	return nil
}
