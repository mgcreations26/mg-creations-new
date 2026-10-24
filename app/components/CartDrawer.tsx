
"use client";

import Link from "next/link";
import { useCart, type CartItem } from "@/context/CartContext";
import { formatPrice } from "@/lib/sheets";

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
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={closeCart}
            />

            {/* DRAWER */}
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="flex w-screen max-w-md flex-col bg-[#fffaf5] text-[#241f1b] shadow-2xl">

                    {/* HEADER */}
                    <div className="flex items-center justify-between border-b border-black/5 px-6 py-5">
                        <h2 className="text-lg font-black uppercase tracking-wider">
                            Your Cart ({itemCount})
                        </h2>

                        <button
                            type="button"
                            onClick={closeCart}
                            aria-label="Close cart"
                            className="rounded-full p-2 text-black/60 transition hover:bg-black/5 hover:text-black"
                        >
                            ✕
                        </button>
                    </div>

                    {/* CART ITEMS */}
                    <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                        {items.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                                <span className="mb-3 text-4xl">🛍️</span>

                                <p className="text-sm font-bold text-black/60">
                                    Your cart is currently empty.
                                </p>

                                <Link
                                    href="/shop"
                                    onClick={closeCart}
                                    className="mt-4 rounded-full bg-[#e85d3f] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#d94f32]"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            items.map((item: CartItem) => (
                                <div
                                    key={item.cartKey}
                                    className="flex gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
                                >
                                    {/* PRODUCT IMAGE */}
                                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f3eee8]">
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-xs opacity-30">
                                                MG
                                            </div>
                                        )}
                                    </div>

                                    {/* PRODUCT DETAILS */}
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="line-clamp-1 text-sm font-black uppercase">
                                                    {item.title}
                                                </h3>

                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.cartKey)}
                                                    aria-label={`Remove ${item.title}`}
                                                    className="text-xs font-bold text-red-500 hover:text-red-700"
                                                >
                                                    ✕
                                                </button>
                                            </div>

                                            <p className="mt-0.5 text-xs font-bold text-[#e85d3f]">
                                                {formatPrice(item.price)}
                                            </p>

                                            {(item.selectedColor || item.color) && (
                                                <p className="mt-1 text-[11px] text-black/50">
                                                    Color: {item.selectedColor || item.color}
                                                </p>
                                            )}

                                            {(item.selectedSize || item.size) && (
                                                <p className="text-[11px] text-black/50">
                                                    Size: {item.selectedSize || item.size}
                                                </p>
                                            )}
                                        </div>

                                        {/* QUANTITY CONTROLS */}
                                        <div className="flex items-center gap-3 pt-2">
                                            <div className="flex items-center rounded-full border border-black/10 bg-[#fffaf5] px-2 py-0.5 text-xs font-bold">
                                                <button
                                                    type="button"
                                                    aria-label={`Decrease quantity of ${item.title}`}
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.cartKey,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    className="px-2 py-0.5 hover:text-[#e85d3f]"
                                                >
                                                    −
                                                </button>

                                                <span className="px-2">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    aria-label={`Increase quantity of ${item.title}`}
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.cartKey,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="px-2 py-0.5 hover:text-[#e85d3f]"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <span className="ml-auto text-xs font-black">
                                                {formatPrice(
                                                    item.price * item.quantity
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* FOOTER */}
                    {items.length > 0 && (
                        <div className="space-y-4 border-t border-black/5 bg-white px-6 py-6">
                            <div className="flex items-center justify-between text-sm font-black uppercase">
                                <span>Subtotal</span>

                                <span className="text-base text-[#e85d3f]">
                                    {formatPrice(subtotal)}
                                </span>
                            </div>

                            <p className="text-[11px] text-black/50">
                                Taxes and shipping calculated at checkout.
                            </p>

                            <div className="space-y-2">
                                <Link
                                    href="/cart"
                                    onClick={closeCart}
                                    className="block w-full rounded-full border border-black/10 py-3 text-center text-xs font-black uppercase tracking-wider text-black transition hover:bg-black/5"
                                >
                                    View Full Cart
                                </Link>

                                <Link
                                    href="/checkout"
                                    onClick={closeCart}
                                    className="block w-full rounded-full bg-[#e85d3f] py-3.5 text-center text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-[#d94f32]"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
