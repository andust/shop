"use client";
import { useRef } from "react";

import { ChildrenProp } from "../../types";
import { useIsVisible } from "../../_hooks/useIsVisible";

export default function FadeWrapper({ children }: ChildrenProp) {
  const ref = useRef(null);
  const isVisible = useIsVisible(ref);
  return (
    <div
      ref={ref}
      className={`transition-all ease-in duration-500 relative ${isVisible ? "opacity-100 top-[0px]" : "opacity-0 top-[20px]"}`}
    >
      {children}
    </div>
  );
}
