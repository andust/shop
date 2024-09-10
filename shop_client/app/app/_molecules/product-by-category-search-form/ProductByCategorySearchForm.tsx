"use client";
import Select from "react-select";

import Button from "../../_atoms/button/Button";
import { FormEventHandler, useState } from "react";

interface Option {
  value: string; label: string
}

interface Props {
  options: Option[];
  onSubmitHandler: FormEventHandler<HTMLFormElement>;
  searchDefaultValue?: string;
  selectDefaultValue?: string;
}

const ProductByCategorySearchForm = ({
  options,
  onSubmitHandler,
  searchDefaultValue = "",
  selectDefaultValue = "",
}: Props) => {
  const [selectValue, setSelectValue] = useState<string>(selectDefaultValue);
  return (
    <form className="flex" onSubmit={onSubmitHandler}>
      <div className="flex items-center border rounded-l-md pl-3">
        <input
          className="rounded-md text-sm w-48 focus:outline-none"
          placeholder="Search Product..."
          name="product"
          defaultValue={searchDefaultValue}
        />
        <div className="h-2/4 w-[1px] bg-slate-300 mr-1"></div>
        <Select
          placeholder="All categories"
          options={options}
          name="categories"
          value={options.find(({ value }) => {

            return value === selectValue
          })}
          onChange={(newValue) => { setSelectValue(newValue?.label ?? "") }}
          classNames={{
            control: () => "w-56",
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: 0,
              boxShadow: "none",
            }),
          }}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => <i className="arrow-down"></i>,
          }}
        />
      </div>
      <Button type="submit" className="bg-green text-white p-2 px-3 rounded-r-md">
        Search
      </Button>
    </form>
  );
}

export default ProductByCategorySearchForm;
