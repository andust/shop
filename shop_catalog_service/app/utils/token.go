package utils

import (
	"errors"
	"net/http"
)

func VerifyToken(access string) error {
	req, err := http.NewRequest("GET", "http://shop_user_service:7008/api/v1/token/verify", nil)
	if err != nil {
		return err
	}
	req.AddCookie(&http.Cookie{Name: "access", Value: access})
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusUnauthorized {
		return errors.New("Unauthorized")
	}

	return nil
}

func RefreshToken(access string) string {
	req, err := http.NewRequest("GET", "http://shop_user_service:7008/api/v1/token/refresh", nil)
	if err != nil {
		return ""
	}
	req.AddCookie(&http.Cookie{Name: "access", Value: access})
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return ""
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusUnauthorized {
		return ""
	}

	for _, c := range resp.Cookies() {
		if c.Name == "access" {
			return c.Value
		}
	}

	return ""
}
