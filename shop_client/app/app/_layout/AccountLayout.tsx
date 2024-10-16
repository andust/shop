import type { Metadata } from "next";
import Link from "next/link";

import LogoutButton from "../_molecules/logout-button/LogoutButton";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop client",
};

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-5">
      <header className="bg-slate-200 py-3">
        <ul className="container flex items-center justify-between">
          <ul className="flex space-x-3">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Orders</Link>
            </li>
          </ul>
          <li>
            <LogoutButton theme="base">Logout</LogoutButton>
          </li>
        </ul>
      </header>
      <div className="container">
        <main>{children}</main>
      </div>
    </div>
  );
}
