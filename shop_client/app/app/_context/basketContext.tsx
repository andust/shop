import { createContext, useState } from "react";
import { ChildrenProp } from "../types";
import { BasketProduct } from "../_models/basket";

interface BasketContextProps {
  products: BasketProduct[];
  setProducts: (products: BasketProduct[]) => void;
}

export const BasketContext = createContext<BasketContextProps>({
  products: [],
  setProducts: () => {},
});

export const BasketProvider = ({ children }: ChildrenProp) => {
  const [products, setProducts] = useState<BasketProduct[]>([]);

  return (
    <BasketContext.Provider value={{ products, setProducts }}>
      {children}
    </BasketContext.Provider>
  );
};
