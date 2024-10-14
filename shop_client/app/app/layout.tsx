import type { Metadata } from "next";

import { inter } from "./_constants/font";

import "./globals.css";
import "./_assets/icons.css";
import Footer from "./_organisms/footer/Footer";
import Header from "./_organisms/header/Header";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop client",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <div>
            <Header />
          </div>
          <main>{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
