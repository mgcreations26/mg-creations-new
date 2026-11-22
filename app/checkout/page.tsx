"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/sheets";
import { ShieldCheck, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function CheckoutPage() {
    const { items, hydrated } = useCart();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function startCheckout() {
        if (loading) return;

        if (items.length === 0) {
            setError("Your cart is empty. Please add a product first.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        selectedStyle:
                            item.selectedStyle === "default" || item.selectedStyle === "Standard"
                                ? undefined
                                : item.selectedStyle,
                        selectedColor:
                            item.selectedColor === "default"
                                ? undefined
                                : item.selectedColor,
                        selectedSize:
                            item.selectedSize === "default"
                                ? undefined
                                : item.selectedSize,
                        unitPrice: item.unitPrice || item.price,
                    })),
                }),
            });

            const data: { url?: string; error?: string } =
                await response.json();

            if (!response.ok || !data.url) {
                throw new Error(
                    data.error || "Unable to start checkout. Please try again."
                );
            }

            window.location.assign(data.url);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
            setLoading(false);
        }
    }

    if (!hydrated) {
        return (
            <main className="mx-auto min-h-[60vh] max-w-3xl px-5 py-16">
                <p className="text-[#59413c]">Loading your order…</p>
            </main>
        );
    }

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <main className="mx-auto min-h-[60vh] max-w-3xl px-5 py-12 sm:py-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad3]/70 text-[#8b1a02] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#a93017]" />
                <span>MG Creations Studio</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1f1b17]">
                Order Review & Checkout
            </h1>

            {items.length === 0 ? (
                <section className="mt-8 rounded-3xl border border-[#e0bfb8]/40 bg-[#fdf2eb] p-8 text-center">
                    <p className="text-sm text-[#59413c]">
                        Your cart is empty. Add a handcrafted design before checking out.
                    </p>
                    <Link
                        href="/shop"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#a93017] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#cb482c] transition-all"
                    >
                        <span>Browse Catalog</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </section>
            ) : (
                <section className="mt-8 rounded-3xl border border-[#e0bfb8]/40 bg-white p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center justify-between border-b border-[#e0bfb8]/40 pb-4">
                        <h2 className="font-serif text-lg font-bold text-[#1f1b17]">
                            Selected Items ({items.length})
                        </h2>
                        <span className="text-xs font-semibold text-[#8d716b]">
                            Bespoke Packaging Included
                        </span>
                    </div>

                    <ul className="mt-2 divide-y divide-[#e0bfb8]/30">
                        {items.map((item) => (
                            <li
                                key={item.cartKey}
                                className="flex justify-between gap-4 py-4 text-xs sm:text-sm"
                            >
                                <div>
                                    <p className="font-bold text-[#1f1b17]">
                                        {item.title} × {item.quantity}
                                    </p>
                                    {item.selectedColor &&
                                        item.selectedColor !== "default" && (
                                            <p className="mt-0.5 text-xs text-[#59413c]">
                                                Color: {item.selectedColor}
                                            </p>
                                        )}
                                    {item.selectedSize &&
                                        item.selectedSize !== "default" && (
                                            <p className="mt-0.5 text-xs text-[#59413c]">
                                                Size: {item.selectedSize}
                                            </p>
                                        )}
                                </div>
                                <p className="shrink-0 font-bold text-[#1f1b17]">
                                    {formatPrice(item.price * item.quantity)}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 flex justify-between border-t border-[#e0bfb8]/40 pt-5 text-base font-bold text-[#1f1b17]">
                        <span>Total Items Subtotal</span>
                        <span className="text-xl text-[#a93017]">
                            {formatPrice(subtotal)}
                        </span>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#59413c]">
                        Taxes and standard or rush shipping are handled securely via Stripe.
                    </p>

                    {error && (
                        <p
                            role="alert"
                            className="mt-5 rounded-2xl bg-red-50 border border-red-200 p-4 text-xs sm:text-sm font-semibold text-red-700"
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={startCheckout}
                        disabled={loading}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#a93017] px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_32px_-8px_rgba(169,48,23,0.35)] transition-all hover:bg-[#cb482c] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Lock className="w-4 h-4" />
                        <span>{loading ? "Connecting to secure checkout..." : "Proceed to Secure Payment"}</span>
                    </button>

                    <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-[#59413c]">
                        <ShieldCheck className="w-4 h-4 text-[#a93017]" />
                        <span>Encrypted SSL checkout provided by Stripe</span>
                    </div>

                    <Link
                        href="/cart"
                        className="mt-4 block text-center text-xs font-bold uppercase tracking-wider text-[#8d716b] hover:text-[#a93017] transition-colors"
                    >
                        ← Return to cart
                    </Link>
                </section>
            )}
        </main>
    );
}
