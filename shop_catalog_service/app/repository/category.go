package repository

import (
	"strings"

	model "github.com/andust/shop_catalog_service/models"
)

type CategoryRepository interface {
	Filter() ([]model.Category, error)
}

type categoryRepository struct{}

func (c *categoryRepository) Filter() ([]model.Category, error) {
	var categories []model.Category

	query := []string{`
		SELECT
		c.id,
		c.name,
		c.slug,
		c.icon
		
		FROM categories AS c
	`}

	args := make(map[string]any, 0)

	query = append(query, "ORDER BY id DESC")

	rows, err := db.NamedQuery(strings.Join(query, "\n"), args)
	if err != nil {
		return []model.Category{}, err
	}

	var category model.Category
	for rows.Next() {
		err := rows.Scan(
			&category.ID,
			&category.Name,
			&category.Slug,
			&category.Icon,
		)

		if err != nil {
			return []model.Category{}, err
		}

		categories = append(categories, category)
	}

	return categories, nil
}
