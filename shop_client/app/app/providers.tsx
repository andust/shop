"use client";

import { BasketProvider } from "./_context/basketContext";
import ToastProvider from "./_libs/ToastProvider";
import { ChildrenProp } from "./types";

export default function Providers({ children }: ChildrenProp) {
  return (
    <BasketProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </BasketProvider>
  );
}
