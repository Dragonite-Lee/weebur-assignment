import type { Metadata } from "next";

import Provider from "@/lib/queryClient";

import "./globals.css";

export const metadata: Metadata = {
  title: "Product list by filters",
  description: "Search product by filters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
