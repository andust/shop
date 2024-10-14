import React from "react";
import { ChildrenProp } from "../../types";

interface Props extends ChildrenProp {
  number: number;
}

const Badge = ({ number, children }: Props) => {
  return (
    <div className="relative inline-block">
      {children}
      <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-slate text-black text-xs font-bold border rounded-full bg-white w-5 h-5 flex items-center justify-center">
        {number}
      </span>
    </div>
  );
};

export default Badge;
