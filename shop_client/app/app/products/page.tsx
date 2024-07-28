import { Product } from "../_models/product";
import ProductBaseDisplay from "../_molecules/ProductBaseDisplay/ProductBaseDisplay";

import { FilterResponse } from "../types";

export const revalidate = 600;

export default async function Products() {
  let products: Product[] = [];
  try {
    const res = await fetch("http://shop_catalog_service:7007/api/v1/products");
    const productsResponse: FilterResponse<Product> = await res.json();
    products = productsResponse.results;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="container flex mt-10">
      <aside className="w-1/5 p-5 shadow-xl mr-2">
        <h3>Product Categories</h3>
      </aside>
      <section className="flex-auto ml-2">
        <div className="grid grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductBaseDisplay product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
