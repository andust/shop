package repository

import (
	"fmt"
	"strings"

	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB

type Repository struct {
	Product  ProductRepository
	Category CategoryRepository
}

func New(dbWrapper *sqlx.DB) Repository {
	db = dbWrapper
	return Repository{
		Product:  &productRepository{},
		Category: &categoryRepository{},
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

func InStringQuery(params []string, columnName string, args map[string]any) string {
	result := ""

	if len(params) > 0 {
		for i, v := range params {
			if v != "" {
				queryKey := fmt.Sprintf("%s%v", columnName, i)
				result += fmt.Sprintf(":%s, ", queryKey)
				args[queryKey] = v
			}
		}
		result = strings.TrimSuffix(result, ", ")
		if result != "" {
			result = fmt.Sprintf("IN (%s)", result)
		}
	}

	return result
}
