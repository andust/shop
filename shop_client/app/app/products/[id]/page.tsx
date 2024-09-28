import Button from "../../_atoms/button/Button";
import { Product } from "../../_models/product";
import ProductAddToCardForm from "../../_molecules/add-to-card-product-form/ProductAddToCardForm";
import ProductPrice from "../../_molecules/product-base-display/ProductPrice";

export default async ({ params }: { params: { id: string } }) => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // async function onSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   setIsLoading(true); // Set loading to true when the request starts

  //   try {
  //     const formData = new FormData(event.currentTarget);
  //     const response = await fetch("/api/submit", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     // Handle response if necessary
  //     const data = await response.json();
  //     // ...
  //   } catch (error) {
  //     // Handle error if necessary
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false); // Set loading to false when the request completes
  //   }
  // }

  try {
    const response = await fetch(
      `http://shop_catalog_service:7007/api/v1/products/${params.id}`,
      { cache: "no-cache" },
    );
    const product: Product = await response.json();

    return (
      <section className="container">
        <p>breadcrumbs</p>
        <div className="flex justify-between">
          <div className="flex-1">Image</div>
          <div className="flex-1">
            <p className="text-slate-600 uppercase mb-0">
              {product.category.name}
            </p>
            <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
            <p className="mb-4">
              <i className="icon-star-half" />
              <i className="icon-star-empty" />
              <i className="icon-star-empty" />
              <i className="icon-star-empty" />
              <i className="icon-star-empty" /> 0 Reviews
            </p>
            <ProductPrice product={product} />

            <p className="mb-8">{product.description}</p>
            <p className="bg-slate-100 p-2 rounded-lg font-semibold mb-8 inline-block">
              Availabillity :{" "}
              <span className="text-green">
                {product.quantityInStock} Products Available
              </span>
            </p>
            <ProductAddToCardForm productId={product.id} />
          </div>
        </div>
      </section>
    );
  } catch (error) {
    return <p>Not found error</p>;
  }
};
