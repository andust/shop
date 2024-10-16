import type { Metadata } from "next";

import MainLayout from "../_layout/MainLayout";

export const metadata: Metadata = {
  title: "Products",
  description: "Shop products",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
