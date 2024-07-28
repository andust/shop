import type { Metadata } from "next";

import Header from "./_organisms/Header/Header";

import { inter } from "./_utils/fonts";

import "./globals.css";
import "./_assets/icons.css";

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
      </body>
    </html>
  );
}
