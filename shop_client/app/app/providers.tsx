"use client";

import { BasketProvider } from "./_context/basketContext";
import { UserProvider } from "./_context/userContext";
import ToastProvider from "./_libs/ToastProvider";
import { ChildrenProp } from "./types";

export default function Providers({ children }: ChildrenProp) {
  return (
    <UserProvider>
      <BasketProvider>
        <ToastProvider>{children}</ToastProvider>
      </BasketProvider>
    </UserProvider>
  );
}
