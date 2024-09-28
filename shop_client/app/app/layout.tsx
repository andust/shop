import type { Metadata } from "next";

import { inter } from "./_utils/fonts";

import "./globals.css";
import "./_assets/icons.css";
import Footer from "./_organisms/footer/Footer";
import Header from "./_organisms/header/Header";

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
        <div>
          <Header />
        </div>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
