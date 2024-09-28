import moment from "moment";

export interface BasketProduct {
  id: string;
  quantity: number;
}

export class Basket {
  id: string;
  products: BasketProduct[];
  LOCAL_STORAGE_KEY = "lsk";

  constructor(id?: string, products?: BasketProduct[]) {
    this.id = id ?? "";
    this.products = products ?? [];
  }

  initFromLocalStorage() {
    try {
      if (!localStorage.getItem(this.LOCAL_STORAGE_KEY)) {
        this.setBasketToLocalStorage();
      }

      const localBasket = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (localBasket) {
        const localBasketData = JSON.parse(localBasket);
        this.id = localBasketData.id;
        this.products = localBasketData.products;
      }
    } catch (error) {
      console.log(error);
    }
  }

  setBasketToLocalStorage() {
    const date = moment();
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify({
        id: this.id,
        products: this.products,
        updatedAt: date.format("D/MM/YYYY h:mm:ss"),
      }),
    );
  }

  addProduct(productId: string, quantity: number) {
    const productInBasket = this.products.find(({ id }) => productId === id);
    if (productInBasket) {
      this.products.map((product) => {
        if (product.id === productInBasket.id) {
          product.quantity = quantity;
        }

        return product;
      });
    } else {
      this.products.push({ id: productId, quantity });
    }
    this.setBasketToLocalStorage();
  }
}
