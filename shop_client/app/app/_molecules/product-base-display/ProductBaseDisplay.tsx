import Image from "next/image";
import Link from "next/link";

import { Product } from "../../_models/product";

import Button from "../../_atoms/button/Button";
import pImg1 from "../../_assets/img/p-img-1.webp";

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
      <div className="text-lg font-semibold mb-2">
        <span className="text-slate-600 line-through mr-3">$12.99</span>
        <span className="text-red">$6.99</span>
      </div>
    </div>
    <Button className="p-3 bg-green-200 rounded w-full text-green">
      + Add To Cart
    </Button>
  </div>
);

export default ProductBaseDisplay;
