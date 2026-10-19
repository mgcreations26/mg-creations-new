import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mgcreations.store"),
  title: {
    default: "MG Creations — Curated Storefront",
    template: "%s — MG Creations",
  },
  description: "Curated custom apparel, graphic tees, mugs, totes, and accessories. Shop MG Creations.",
  alternates: { canonical: "https://mgcreations.store" },
  openGraph: {
    siteName: "MG Creations",
    type: "website",
    locale: "en_US",
    url: "https://mgcreations.store",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#fffaf5] text-[#241f1b]">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}