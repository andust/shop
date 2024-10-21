import pytest
from playwright.sync_api import sync_playwright


@pytest.fixture(scope="session")
def playwright():
    with sync_playwright() as p:
        yield p


@pytest.fixture(scope="session")
def browser(playwright):
    browser = playwright.chromium.launch(headless=True)
    yield browser
    browser.close()


def test_client_app(browser):
    page = browser.new_page()
    page.goto("http://shop_client:3001")  # Używamy nazwy serwisu z docker-compose
    assert page.title() == "Shop"
