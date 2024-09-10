"use client";
import { FormEvent, useEffect, useState } from "react";
import Button from "../../_atoms/button/Button";

const ProductAddToCardForm = () => {
  const [value, setValue] = useState(1);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const basketID = sessionStorage.getItem("bid");
    console.log(basketID, e);
  };

  useEffect(() => {
    if (value <= 0) {
      setValue(1)
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
