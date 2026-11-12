import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/app/components/CartDrawer";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mgcreations.store"),
  title: {
    default: "MG Creations — Curated Storefront",
    template: "%s — MG Creations",
  },
  description:
    "Curated custom apparel, graphic tees, mugs, totes, and accessories. Shop MG Creations.",
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
      className={`${playfair.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#fffaf5] text-[#241f1b]">
        <CartProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
