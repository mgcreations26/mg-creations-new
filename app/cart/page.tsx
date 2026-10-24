"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const money = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export default function CartPage() {
  const { items, itemCount, subtotal, hydrated, updateQuantity, removeItem, clearCart } =
    useCart();

  if (!hydrated) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-6xl px-5 py-16">
        <p className="text-sm text-stone-500">Loading your cart…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[65vh] max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#e85d3f]">
            Your picks, your style
          </p>
          <h1 className="text-3xl font-black tracking-tight text-[#241f1b] sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-sm font-bold text-stone-500 underline underline-offset-4 hover:text-[#e85d3f]"
          >
            Clear cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <section className="rounded-3xl border border-orange-100 bg-[#fffaf5] px-6 py-16 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-[#e85d3f]">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-black text-[#241f1b]">
            Your cart is taking a little break.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-600">
            Find something that feels like you, then come back here when you’re ready.
          </p>
          <Link
            href="/categories"
            className="mt-7 inline-flex rounded-full bg-[#e85d3f] px-6 py-3 text-sm font-bold text-white hover:bg-[#cf4b31]"
          >
            Explore products
          </Link>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="space-y-4" aria-label="Cart items">
            {items.map((item) => (
              <article
                key={item.cartKey}
                className="flex gap-4 rounded-2xl border border-orange-100 bg-white p-4 sm:gap-5 sm:p-5"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#fffaf5] sm:h-32 sm:w-32">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 96px, 128px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs font-bold text-stone-400">
                      MG CREATIONS
                    </div>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-bold leading-5 text-[#241f1b] hover:text-[#e85d3f]"
                      >
                        {item.title}
                      </Link>
                      {item.color && (
                        <p className="mt-1 text-xs text-stone-500">Color: {item.color}</p>
                      )}
                      {item.size && (
                        <p className="mt-1 text-xs text-stone-500">Size: {item.size}</p>
                      )}
                      <p className="mt-2 text-sm font-bold text-[#e85d3f]">
                        {money(item.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.cartKey)}
                      aria-label={`Remove ${item.title}`}
                      className="rounded-lg p-2 text-stone-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <div className="inline-flex items-center rounded-full border border-orange-100">
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.title}`}
                        className="rounded-l-full p-2 hover:bg-orange-50"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.title}`}
                        className="rounded-r-full p-2 hover:bg-orange-50"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-black text-[#241f1b]">
                      {money(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
            <Link
              href="/categories"
              className="inline-flex pt-2 text-sm font-bold text-[#e85d3f] hover:underline"
            >
              ← Continue shopping
            </Link>
          </section>

          <aside className="h-fit rounded-3xl border border-orange-100 bg-[#fffaf5] p-6 sm:p-7">
            <h2 className="text-lg font-black text-[#241f1b]">Order summary</h2>
            <div className="mt-6 space-y-3 border-b border-orange-100 pb-5 text-sm">
              <div className="flex justify-between gap-4 text-stone-600">
                <span>Subtotal</span>
                <span className="font-bold text-[#241f1b]">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between gap-4 text-stone-600">
                <span>Shipping</span>
                <span>At checkout</span>
              </div>
              <div className="flex justify-between gap-4 text-stone-600">
                <span>Taxes</span>
                <span>At checkout</span>
              </div>
            </div>
            <div className="flex justify-between gap-4 py-5 text-base font-black text-[#241f1b]">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <p className="mb-4 text-xs leading-5 text-stone-500">
              Shipping and applicable taxes are not included.
            </p>
            <Link
              href="/checkout"
              className="flex w-full items-center justify-center rounded-full bg-[#e85d3f] px-5 py-3.5 text-sm font-black text-white hover:bg-[#cf4b31]"
            >
              Continue to checkout
            </Link>
            <p className="mt-3 text-center text-[11px] leading-4 text-stone-500">
              Checkout must be connected to your order and payment provider before accepting real orders.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}