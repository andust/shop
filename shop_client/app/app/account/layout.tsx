import type { Metadata } from "next";

import AccountLayout from "../_layout/AccountLayout";

export const metadata: Metadata = {
  title: "Products",
  description: "Shop products",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AccountLayout>{children}</AccountLayout>;
}
