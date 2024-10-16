import type { Metadata } from "next";

import Footer from "../_organisms/footer/Footer";
import Header from "../_organisms/header/Header";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop client",
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
