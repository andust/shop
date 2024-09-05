import { Category } from "./category";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  quantityInStock: number;
  category: Category;
}

export interface ProductResponse {
  results: Product[];
}
