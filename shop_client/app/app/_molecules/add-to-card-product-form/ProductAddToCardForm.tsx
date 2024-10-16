"use client";

import { FormEvent, useContext, useEffect, useState } from "react";

import Button from "../../_atoms/button/Button";
import { BasketContext } from "../../_context/basketContext";

const ProductAddToCardForm = ({ productId }: { productId: string }) => {
  const [value, setValue] = useState(1);
  const { addProduct } = useContext(BasketContext);
  
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const { quantity } = target;
    
    // TODO check if product quantity is in DB
    addProduct({ id: productId, quantity: quantity.value });
  };

  useEffect(() => {
    if (value <= 0) {
      setValue(1);
    }
  }, [value]);

  return (
    <form className="flex space-x-3 justify-between" onSubmit={onSubmit}>
      <div className="border flex rounded">
        <Button
          className="p-3"
          onClick={() => {
            if (value > 1) {
              setValue(value - 1);
            }
          }}
        >
          -
        </Button>
        <input
          className="w-[50px] text-center"
          name="quantity"
          value={value}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            if (v) {
              setValue(parseInt(e.target.value));
            }
          }}
        />
        <Button
          className="p-3"
          onClick={() => {
            setValue(value + 1);
          }}
        >
          +
        </Button>
      </div>
      <Button className="border rounded w-[50px]">
        <i className="icon-heart" />
      </Button>
      <Button
        className="flex-1 rounded bg-green text-white font-semibold"
        type="submit"
      >
        + Add to Cart
      </Button>
    </form>
  );
};

export default ProductAddToCardForm;
