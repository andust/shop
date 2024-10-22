import { BasketProduct } from "./basket";

export interface User {
  id: string;
  username: string;
  email: string;
  role: "client" | "admin" | "super-admin";
  createdAt: string;
  updatedAt: string;
}

export const getUser = async () => {
  return fetch("/api/account", { method: "get", cache: "no-cache" });
};

export const syncBasket = async (products: BasketProduct[]) => {
  return fetch("/api/basket/sync", {
    method: "post",
    body: JSON.stringify({ products }),
    cache: "no-cache",
  });
};
