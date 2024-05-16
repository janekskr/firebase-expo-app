import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Header } from "@/components";

import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Cosmic Casino",
  description: "You'll never lose again.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        {children}
        </body>
    </html>
  );
}
