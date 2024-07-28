package repository

import "github.com/jmoiron/sqlx"

var db *sqlx.DB

type Repository struct {
	Product productRepository
	Category categoryRepository
}

func New(dbWrapper *sqlx.DB) Repository {
	db = dbWrapper
	return Repository{
		Product: productRepository{},
		Category: categoryRepository{},
	}
}

func CloseDB() {
	db.Close()
}

func DB() *sqlx.DB {
	return db
}

type Paginator struct {
	Count    int `json:"count"`
	Limit    int `json:"limit"`
	Page     int `json:"page"`
	PagesQty int `json:"pagesQty"`
}

type Filter interface {
	FilterQuery(*[]string, map[string]any)
	LimitOffsetQuery(*[]string, map[string]any, int) int
	GetLimit() int
	GetPage() int
}
