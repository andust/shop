import type { Metadata } from "next";

import { inter } from "./_constants/font";

import "./globals.css";
import "./_assets/icons.css";

import Providers from "./providers";
import { LoadUser } from "./_context/userContext";

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
          <LoadUser>
            <main>{children}</main>
          </LoadUser>
        </Providers>
      </body>
    </html>
  );
}
