import { Product } from "../../_models/product";

const ProductPrice = ({ product }: { product: Product }) => (
  <div className="text-xl font-semibold mb-2">
    {product.discountPrice ? (
      <>
        <span className="text-slate-600 line-through mr-3">
          ${product.price}
        </span>
        <span className="text-red">${product.discountPrice}</span>
      </>
    ) : (
      <span className="text-slate-600">${product.price}</span>
    )}
  </div>
);

export default ProductPrice;
