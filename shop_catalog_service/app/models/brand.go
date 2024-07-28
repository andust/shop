package model

type Brand struct {
	ID   string `json:"id"`
	Name string `json:"brand"`
	Code string `json:"code"`
}

func NewBrand(name, code string) Brand {
	return Brand{
		Name: name,
		Code: code,
	}
}
