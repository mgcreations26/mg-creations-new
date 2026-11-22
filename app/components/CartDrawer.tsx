"use client";

import Link from "next/link";
import { useCart, type CartItem } from "@/context/CartContext";
import { formatPrice } from "@/lib/sheets";
import { ShoppingBag, X, Plus, Minus, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-[#1f1b17]/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* DRAWER */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="flex w-screen max-w-md flex-col bg-[#fff8f5] text-[#1f1b17] shadow-2xl border-l border-[#e0bfb8]/40">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-[#e0bfb8]/40 px-6 py-5 bg-[#fff8f5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#a93017]" />
              <h2 className="font-serif text-lg font-bold">
                Keepsake Bag ({itemCount})
              </h2>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Close cart"
              className="rounded-full p-2 text-[#59413c] hover:bg-[#f7ece5] hover:text-[#1f1b17] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CART ITEMS */}
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#fdf2eb] flex items-center justify-center text-[#a93017] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>

                <p className="font-serif text-lg font-semibold text-[#1f1b17]">
                  Your cart is currently empty
                </p>
                <p className="text-xs text-[#59413c] mt-1 max-w-xs">
                  Discover handcrafted bespoke items, apparel, and personalized keepsakes.
                </p>

                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-6 rounded-full bg-[#a93017] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#cb482c] shadow-md transition"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              items.map((item: CartItem) => (
                <div
                  key={item.cartKey}
                  className="flex gap-4 rounded-2xl border border-[#e0bfb8]/50 bg-white p-4 shadow-sm"
                >
                  {/* PRODUCT IMAGE */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#fdf2eb]">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs font-serif font-bold text-[#a93017]/40">
                        MG
                      </div>
                    )}
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-1 text-sm font-bold text-[#1f1b17]">
                          {item.title}
                        </h3>

                        <button
                          type="button"
                          onClick={() => removeItem(item.cartKey)}
                          aria-label={`Remove ${item.title}`}
                          className="text-xs font-semibold text-[#8d716b] hover:text-[#a93017]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="mt-0.5 text-xs font-bold text-[#a93017]">
                        {formatPrice(item.price)}
                      </p>

                      {item.selectedStyle && item.selectedStyle !== "Standard" && (
                        <p className="mt-1 text-[11px] text-[#59413c]">
                          Style: {item.selectedStyle}
                        </p>
                      )}

                      {(item.selectedColor || item.color) && (
                        <p className="mt-0.5 text-[11px] text-[#59413c]">
                          Color: {item.selectedColor || item.color}
                        </p>
                      )}

                      {(item.selectedSize || item.size) && (
                        <p className="text-[11px] text-[#59413c]">
                          Size: {item.selectedSize || item.size}
                        </p>
                      )}
                    </div>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center rounded-full border border-[#e0bfb8]/60 bg-[#fff8f5] px-2 py-0.5 text-xs font-bold">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.title}`}
                          onClick={() =>
                            updateQuantity(item.cartKey, item.quantity - 1)
                          }
                          className="p-1 hover:text-[#a93017]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="px-2">{item.quantity}</span>

                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.title}`}
                          onClick={() =>
                            updateQuantity(item.cartKey, item.quantity + 1)
                          }
                          className="p-1 hover:text-[#a93017]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="ml-auto text-xs font-bold text-[#1f1b17]">
                        {formatPrice((item.unitPrice || item.price) * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER */}
          {items.length > 0 && (
            <div className="space-y-4 border-t border-[#e0bfb8]/40 bg-white px-6 py-6">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-[#59413c]">Estimated Subtotal</span>
                <span className="text-lg font-bold text-[#a93017]">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <p className="text-[11px] text-[#59413c]">
                Taxes, gift packaging, and shipping calculated at checkout.
              </p>

              <div className="space-y-2">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full rounded-full border border-[#1f1b17]/20 py-3 text-center text-xs font-bold uppercase tracking-wider text-[#1f1b17] transition hover:bg-[#fdf2eb]"
                >
                  View Full Cart
                </Link>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-[#a93017] py-3.5 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#cb482c]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
