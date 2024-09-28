package usecase

import (
	"github.com/andust/shop_catalog_service/constants"
	model "github.com/andust/shop_catalog_service/models"
	"github.com/andust/shop_catalog_service/repository"
)

type page struct {
	Repository *repository.Repository
}

func NewPage(repository *repository.Repository) *page {
	return &page{Repository: repository}
}

func (p *page) HomePageData() ([]model.Product, error) {
	var result []model.Product
	// just for fun gorutine for this page
	ch := make(chan []model.Product, 2)

	go func() {
		filterResult, err := p.Repository.Product.Filter(&repository.ProductFilter{
			Limit:       4,
			CategoryIDs: []string{constants.VEGETABLES_CATEGORY_ID},
		})
		if err != nil {
			ch <- nil
		}
		ch <- filterResult.Results
	}()

	go func() {
		filterResult, err := p.Repository.Product.Filter(&repository.ProductFilter{
			Limit:       4,
			CategoryIDs: []string{constants.OTHER_FOOD_CATEGORY_ID},
		})
		if err != nil {
			ch <- nil
		}
		ch <- filterResult.Results
	}()

	for i := 0; i < 2; i++ {
		products := <-ch
		if products != nil {
			result = append(result, products...)
		}
	}

	return result, nil
}
