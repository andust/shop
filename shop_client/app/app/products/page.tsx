import { Product } from "../_models/product";
import ProductBaseDisplay from "../_molecules/product-base-display/ProductBaseDisplay";

import { FilterResponse } from "../types";

export default async function Products({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  let sp = "";
  if (searchParams) {
    sp = `?${new URLSearchParams(searchParams).toString()}`;
  }

  let products: Product[] = [];
  try {
    const res = await fetch(
      `http://shop_catalog_service:7007/api/v1/products${sp}`,
      { cache: "no-cache" },
    );
    const productsResponse: FilterResponse<Product> = await res.json();
    products = productsResponse.results ?? [];
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="container flex mt-10">
      <aside className="w-1/5 p-5 shadow-xl mr-2">
        <h3>Product Categories</h3>
      </aside>
      <section className="ml-2 grid grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductBaseDisplay product={p} />
        ))}
      </section>
    </div>
  );
}
