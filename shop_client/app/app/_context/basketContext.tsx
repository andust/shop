import { createContext, useEffect, useState } from "react";
import moment from "moment";

import { BasketProduct } from "../_models/basket";
import { BASKET_STORAGE_KEY } from "../_constants/storage";
import { ChildrenProp } from "../types";

interface BasketContextProps {
  products: BasketProduct[];
  addProduct: (product: BasketProduct) => void;
  refresh: number;
}

export const BasketContext = createContext<BasketContextProps>({
  products: [],
  addProduct: () => {},
  refresh: 1,
});

export const BasketProvider = ({ children }: ChildrenProp) => {
  const [refresh, setRefresh] = useState(1);
  const [products, setProducts] = useState<BasketProduct[]>([]);

  const addProduct = (product: BasketProduct) => {
    const productInBasket = products.find(({ id }) => id === product.id);
    if (productInBasket) {
      products.map((p) => {
        if (p.id === productInBasket.id) {
          p.quantity = product.quantity;
        }

        return p;
      });
    } else {
      setProducts([...products, product]);
    }
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    if (products.length) {
      const date = moment();
      localStorage.setItem(
        BASKET_STORAGE_KEY,
        JSON.stringify({
          refresh,
          products: products,
          updatedAt: date.format("D/MM/YYYY h:mm:ss"),
        }),
      );
    }
  }, [refresh]);

  useEffect(() => {
    try {
      const storageBasket = localStorage.getItem(BASKET_STORAGE_KEY);
      if (storageBasket) {
        const data = JSON.parse(storageBasket);
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <BasketContext.Provider value={{ products, addProduct, refresh }}>
      {children}
    </BasketContext.Provider>
  );
};
