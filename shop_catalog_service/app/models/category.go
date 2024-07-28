package model

import "database/sql"

type Category struct {
	ID     string    `json:"id"`
	Name   string    `json:"name"`
	Slug   string    `json:"slug"`
	Icon   string    `json:"icon"`
	Parent *Category `json:"parent"`
}

func NewCategoryFromSql(c CategorySql) Category {
	return Category{
		ID: c.ID.String,
		Name: c.Name.String,
		Slug: c.Slug.String,
		Icon: c.Icon.String,
		Parent: c.Parent,
	}
}

type CategorySql struct {
	ID     sql.NullString    `json:"id"`
	Name   sql.NullString    `json:"name"`
	Slug   sql.NullString    `json:"slug"`
	Icon   sql.NullString    `json:"icon"`
	Parent *Category `json:"parent"`
}
