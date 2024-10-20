import Image from "next/image";
import Link from "next/link";

import { Product } from "../../_models/product";

import Button from "../../_atoms/button/Button";
import pImg1 from "../../_assets/img/p-img-1.webp";
import ProductPrice from "./ProductPrice";

const ProductBaseDisplay = ({ product }: { product: Product }) => (
  <div
    key={product.id}
    className="text-center bg-white p-6 shadow-xl flex flex-col justify-between"
  >
    <div>
      <Image src={pImg1} alt="tomato" className="m-auto mb-12" />
      <div>
        <i className="icon-star-full"></i>
        <i className="icon-star-full"></i>
        <i className="icon-star-full"></i>
        <i className="icon-star-full"></i>
        <i className="icon-star-empty"></i>
      </div>
      <Link href={`/products/${product.id}`}>
        <h3 className="text-xl font-bold mb-3">{product.name}</h3>
      </Link>
      <ProductPrice product={product} />
    </div>
    <Button className="p-3 bg-green-200 rounded w-full text-green">
      + Add To Cart
    </Button>
  </div>
);

export default ProductBaseDisplay;
