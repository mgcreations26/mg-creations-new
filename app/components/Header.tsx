"use client";

import Link from "next/link";
import { ShoppingBag, Sparkles, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 shadow-[0_12px_32px_-8px_rgba(169,48,23,0.08),0_4px_12px_-2px_rgba(31,27,23,0.04)]">
      {/* Announcement Ribbon */}
      <div className="w-full bg-[#a93017] text-white py-1.5 px-4 text-center text-xs font-semibold tracking-wide">
        <div className="max-w-[1320px] mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#ffdad3]" />
          <span>Free shipping on orders over $65 • Handcrafted with love in Austin, TX</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-[#fff8f5]/90 backdrop-blur-xl border-b border-[#e0bfb8]/40">
        <div className="h-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Brand */}
          <Link
            href="/"
            aria-label="MG Creations home"
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1f1b17] group-hover:text-[#a93017] transition-colors">
                MG Creations
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#a93017]">
                Handmade & Personalized
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold tracking-wider uppercase text-[#59413c]"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#a93017] text-[#a93017]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="transition-colors hover:text-[#a93017]"
            >
              Shop All
            </Link>
            <Link
              href="/themes"
              className="transition-colors hover:text-[#a93017]"
            >
              Themes
            </Link>
            <Link
              href="/categories"
              className="transition-colors hover:text-[#a93017]"
            >
              Categories
            </Link>
            <Link
              href="/moods"
              className="transition-colors hover:text-[#a93017]"
            >
              Vibes & Moods
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdf2eb] text-[#59413c] hover:bg-[#f7ece5] hover:text-[#1f1b17] transition-all text-xs font-semibold"
            >
              <Search className="w-3.5 h-3.5 text-[#8d716b]" />
              <span>Search designs...</span>
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              aria-label="Open Shopping Cart"
              className="relative p-2.5 rounded-full bg-[#fdf2eb] text-[#1f1b17] hover:bg-[#f7ece5] hover:text-[#a93017] transition-all"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-[#a93017] text-[11px] font-bold text-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
