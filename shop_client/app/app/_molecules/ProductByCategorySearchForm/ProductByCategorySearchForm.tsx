"use client";
import Select from "react-select";

import Button from "../../_atoms/Button/Button";

interface Props {
  options: { value: string; label: string }[];
}

export default function ProductByCategorySearchForm({ options }: Props) {
  return (
    <div className="flex">
      <div className="flex items-center border rounded-l-md pl-3">
        <input
          className="rounded-md text-sm w-48"
          placeholder="Search Product..."
        />
        <div className="h-2/4 w-[1px] bg-slate-300 mr-1"></div>
        <Select
          placeholder="All categories"
          options={options}
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
      <Button className="bg-green text-white p-2 px-3 rounded-r-md">
        Search
      </Button>
    </div>
  );
}
