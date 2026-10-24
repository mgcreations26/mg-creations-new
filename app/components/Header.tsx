import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  // Placeholder until connected to your actual cart state.
  const cartCount = 0;

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-[#fffaf5]/95 text-[#241f1b] shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          aria-label="MG Creations home"
          className="shrink-0 text-xl font-black tracking-tight sm:text-2xl"
        >
          MG <span className="text-[#e85d3f]">CREATIONS</span>
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-3 text-xs font-bold sm:gap-6 sm:text-sm"
        >
          <Link href="/" className="transition-colors hover:text-[#e85d3f]">
            HOME
          </Link>

          <Link
            href="/themes"
            className="transition-colors hover:text-[#e85d3f]"
          >
            THEMES
          </Link>

          <Link
            href="/categories"
            className="transition-colors hover:text-[#e85d3f]"
          >
            CATEGORIES
          </Link>

          {/* Cart Icon Link */}
          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className="relative p-2 transition-colors hover:text-[#e85d3f]"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#e85d3f] text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
