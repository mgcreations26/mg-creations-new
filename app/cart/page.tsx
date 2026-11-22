"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/sheets";

export default function CartPage() {
  const { items, itemCount, subtotal, hydrated, updateQuantity, removeItem, clearCart } =
    useCart();

  if (!hydrated) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-[1320px] px-4 py-16">
        <p className="text-sm text-[#59413c]">Loading your keepsake cart…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[65vh] max-w-[1320px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#e0bfb8]/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad3]/70 text-[#8b1a02] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#a93017]" />
            <span>Personalized Keepsakes</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1f1b17]">
            Your Keepsake Bag
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#59413c]">
            {itemCount} {itemCount === 1 ? "handcrafted piece" : "handcrafted pieces"} in your order
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-bold text-[#8d716b] hover:text-[#a93017] transition-colors"
          >
            Clear Entire Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <section className="rounded-3xl border border-[#e0bfb8]/40 bg-[#fdf2eb] px-6 py-20 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#a93017] shadow-sm">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1f1b17]">
            Your keepsake bag is currently empty
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm leading-relaxed text-[#59413c]">
            Discover handcrafted gifts, apparel, wooden signs, and custom treasures designed for your style.
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#a93017] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#cb482c] transition-all"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Cart Items List */}
          <section className="space-y-4" aria-label="Cart items">
            {items.map((item) => (
              <article
                key={item.cartKey}
                className="flex gap-4 rounded-2xl border border-[#e0bfb8]/40 bg-white p-4 sm:gap-5 sm:p-5 shadow-sm"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#fdf2eb] sm:h-28 sm:w-28">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 96px, 112px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-serif text-2xl text-[#a93017]/30">
                      MG
                    </div>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-serif text-base font-bold text-[#1f1b17] hover:text-[#a93017] transition-colors"
                      >
                        {item.title}
                      </Link>
                      {item.selectedStyle && item.selectedStyle !== "Standard" && (
                        <p className="mt-0.5 text-xs text-[#59413c]">
                          Style: {item.selectedStyle}
                        </p>
                      )}
                      {(item.selectedColor || item.color) && (
                        <p className="mt-0.5 text-xs text-[#59413c]">
                          Color: {item.selectedColor || item.color}
                        </p>
                      )}
                      {(item.selectedSize || item.size) && (
                        <p className="text-xs text-[#59413c]">
                          Size: {item.selectedSize || item.size}
                        </p>
                      )}
                      <p className="mt-2 text-sm font-bold text-[#a93017]">
                        {formatPrice(item.unitPrice || item.price)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.cartKey)}
                      aria-label={`Remove ${item.title}`}
                      className="rounded-full p-2 text-[#8d716b] hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <div className="inline-flex items-center rounded-full border border-[#e0bfb8]/60 bg-[#fff8f5] px-2 py-0.5 text-xs font-bold">
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.title}`}
                        className="p-1 hover:text-[#a93017]"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-8 text-center text-xs font-bold text-[#1f1b17]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.title}`}
                        className="p-1 hover:text-[#a93017]"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-base font-bold text-[#1f1b17]">
                      {formatPrice((item.unitPrice || item.price) * item.quantity)}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 pt-2 text-xs font-bold uppercase tracking-wider text-[#a93017] hover:text-[#cb482c]"
            >
              <span>← Continue shopping</span>
            </Link>
          </section>

          {/* Summary Aside */}
          <aside className="h-fit rounded-3xl border border-[#e0bfb8]/40 bg-[#fdf2eb] p-6 sm:p-7 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#1f1b17]">
              Order Summary
            </h2>
            <div className="mt-6 space-y-3 border-b border-[#e0bfb8]/40 pb-5 text-xs sm:text-sm">
              <div className="flex justify-between gap-4 text-[#59413c]">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#1f1b17]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between gap-4 text-[#59413c]">
                <span>Personalized Proofing</span>
                <span className="font-bold text-[#a93017]">Free Included</span>
              </div>
              <div className="flex justify-between gap-4 text-[#59413c]">
                <span>Shipping & Taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between gap-4 py-5 text-base font-bold text-[#1f1b17]">
              <span>Estimated Total</span>
              <span className="text-xl text-[#a93017]">{formatPrice(subtotal)}</span>
            </div>

            <Link
              href="/checkout"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#a93017] px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#cb482c] transition-all transform hover:-translate-y-0.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-[#59413c]">
              <ShieldCheck className="w-4 h-4 text-[#a93017]" />
              <span>Stripe 256-bit encrypted checkout</span>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
