package core

import (
	"log"
	"os"
	"time"

	"github.com/andust/shop_catalog_service/repository"
	"github.com/jmoiron/sqlx"
	"github.com/nats-io/nats.go"

	_ "github.com/jackc/pgx/v5/stdlib"

	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

var counts int8

type Core struct {
	InfoLog    *log.Logger
	ErrorLog   *log.Logger
	Repository repository.Repository
	NC         *nats.Conn
}

func New() *Core {
	return &Core{
		InfoLog:  log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime),
		ErrorLog: log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile),
	}
}

func (c *Core) InitNats() {
	nc, err := nats.Connect("nats://nats:4222")
	if err != nil {
		c.ErrorLog.Fatal("nats connection error:", err)
	}

	c.NC = nc
}

func (c *Core) InitRepository() {
	conn := initDB()
	c.Repository = repository.New(conn)
}

func initDB() *sqlx.DB {
	dsn := os.Getenv("CATALOG_DSN")
	for {
		connection, err := openDB(dsn)
		if err != nil {
			log.Println("postgres not yet ready...")
			counts++
		} else {
			log.Println("connected to postgres")
			return connection
		}

		if counts > 10 {
			return nil
		}

		log.Println("backing off for two seconds...")
		time.Sleep(2 * time.Second)
		continue
	}
}

func openDB(dsn string) (*sqlx.DB, error) {
	db, err := sqlx.Open("postgres", dsn)
	if err != nil {
		return nil, err
	}

	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}
