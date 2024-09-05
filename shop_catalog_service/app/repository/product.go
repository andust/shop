package repository

import (
	"database/sql"
	"fmt"
	"log"
	"strings"

	model "github.com/andust/shop_catalog_service/models"
)

type productRepository struct{}

type ProductFilter struct {
	ID          string
	IDs         []string
	Limit       int
	Page        int
	ProductName string
	CategoryIDs []string
}

type ProductFilterResult struct {
	Results []model.Product `json:"results"`
	Paginator
}

func (p *ProductFilterResult) First() *model.Product {
	if l := len(p.Results); l > 0 {
		return &p.Results[0]
	}

	return nil
}

func (p *ProductFilter) FilterQuery(query *[]string, args map[string]any) {
	where := []string{}

	if p.ID != "" {
		where = append(where, "p.id = :id")
		args["id"] = p.ID
	}

	if inQueryResult := InStringQuery(p.CategoryIDs, "category_id", args); inQueryResult != "" {
		where = append(where, fmt.Sprintf("p.category_id %s", inQueryResult))
	}

	if p.ProductName != "" {
		where = append(where, "LOWER(p.name) LIKE :product_name")
		args["product_name"] = "%" + strings.ToLower(p.ProductName) + "%"
	}

	if len(where) > 0 {
		*query = append(*query, fmt.Sprintf("WHERE %s", strings.Join(where, " AND ")))
	}
}

func (p *ProductFilter) LimitOffsetQuery(query *[]string, args map[string]any, allResultCount int) int {
	var pagesQty int

	if p.Limit != 0 {
		*query = append(*query, "LIMIT :limit")
		args["limit"] = p.Limit
	}

	if p.Limit != 0 {
		pagesQty = allResultCount / p.Limit
		if isRest := allResultCount%p.Limit != 0; isRest {
			pagesQty += 1
		}
	}

	if p.Page > 1 {
		*query = append(*query, "OFFSET :offset")
		args["offset"] = p.Limit * (p.Page - 1)
	}

	return pagesQty
}

func (p *ProductFilter) GetPage() int {
	return p.Page
}

func (p *ProductFilter) GetLimit() int {
	return p.Limit
}

func (p *productRepository) Filter(filter Filter) (ProductFilterResult, error) {
	var products []model.Product
	//1. set up queries filters
	query := []string{`
		SELECT
		-- Product
		p.id,
		p.name,
		p.description,
		p.created_at,
		p.updated_at,
		p.price,
		p.discount_price,
		p.quantity_in_stock,

		-- Category
		p.category_id,
		c.name,
		c.slug,
		c.icon
		
		FROM products AS p

		LEFT JOIN categories as c
		ON p.category_id = c.id
	`}
	paginationQuery := []string{`
		SELECT COUNT(p.id)
		
		FROM products AS p

		LEFT JOIN categories as c
		ON p.category_id = c.id
	`}

	args := make(map[string]any, 0)
	paginationArgs := make(map[string]any, 0)

	filter.FilterQuery(&query, args)
	filter.FilterQuery(&paginationQuery, paginationArgs)
	//2. count resultes for pagination
	stmt, err := db.PrepareNamed(strings.Join(paginationQuery, "\n"))
	if err != nil {
		log.Fatalln(err)
	}
	var allResultCount int
	err = stmt.Get(&allResultCount, paginationArgs)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("Empty result")
		} else {
			log.Fatalln(err)
		}
	}

	//3. order base query
	query = append(query, "ORDER BY created_at DESC")

	//4. limit and offset results
	pagesQty := filter.LimitOffsetQuery(&query, args, allResultCount)
	rows, err := db.NamedQuery(strings.Join(query, "\n"), args)
	if err != nil {
		return ProductFilterResult{}, err
	}

	var product model.Product
	var categorySql model.CategorySql
	for rows.Next() {
		err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Description,
			&product.CreatedAt,
			&product.UpdatedAt,
			&product.Price,
			&product.DiscountPrice,
			&product.QuantityInStock,

			// Cateogry
			&categorySql.ID,
			&categorySql.Name,
			&categorySql.Slug,
			&categorySql.Icon,
		)

		if err != nil {
			return ProductFilterResult{}, err
		}

		if categorySql.ID.Valid {
			product.Category = model.NewCategoryFromSql(categorySql)
		}
		products = append(products, product)
	}

	paginator := Paginator{
		Count:    allResultCount,
		Page:     filter.GetPage(),
		PagesQty: pagesQty,
		Limit:    filter.GetLimit(),
	}

	return ProductFilterResult{Results: products, Paginator: paginator}, nil
}
