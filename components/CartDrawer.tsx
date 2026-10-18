
"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/sheets";

export default function CartDrawer() {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        totalCount,
        totalPrice,
    } = useCart();

    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [checkoutError, setCheckoutError] = useState("");

    // Accessible dialog behavior: focus management, Escape, and scroll lock.
    useEffect(() => {
        if (!isCartOpen) return;

        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";
        closeRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsCartOpen(false);
                return;
            }

            if (event.key !== "Tab" || !dialogRef.current) return;

            const focusable = Array.from(
                dialogRef.current.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )
            ).filter((element) => element.getAttribute("aria-hidden") !== "true");

            if (focusable.length === 0) {
                event.preventDefault();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (
                !event.shiftKey &&
                document.activeElement === last
            ) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);

            if (previousFocus instanceof HTMLElement) {
                previousFocus.focus();
            }
        };
    }, [isCartOpen, setIsCartOpen]);

    async function handleCheckout() {
        if (checkoutLoading || cart.length === 0) return;

        setCheckoutLoading(true);
        setCheckoutError("");

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: cart.map((item) => ({
                        productId: item.product.productId,
                        quantity: item.quantity,
                        selectedColor: item.selectedColor,
                        selectedSize: item.selectedSize,
                    })),
                }),
            });

            const result = await response.json();

            if (!response.ok || typeof result.url !== "string") {
                throw new Error(
                    result.error || "Checkout could not be started."
                );
            }

            // Redirect to the Stripe-hosted checkout page.
            window.location.assign(result.url);
        } catch (error) {
            setCheckoutError(
                error instanceof Error
                    ? error.message
                    : "Unable to start checkout. Please try again."
            );
            setCheckoutLoading(false);
        }
    }

    if (!isCartOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    setIsCartOpen(false);
                }
            }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-heading"
                className="flex h-full w-full max-w-md flex-col bg-[#fffaf5] p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <h2
                        id="cart-heading"
                        className="text-2xl font-black"
                    >
                        YOUR CART ({totalCount})
                    </h2>

                    <button
                        ref={closeRef}
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        aria-label="Close shopping cart"
                        className="rounded-lg p-2 text-xl font-black hover:text-[#e85d3f] focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        ✕
                    </button>
                </div>

                {/* Cart items */}
                <div className="min-h-0 flex-1 overflow-y-auto py-6">
                    {cart.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="text-5xl" aria-hidden="true">
                                🛍️
                            </div>
                            <p className="mt-4 font-bold text-black/50">
                                Your cart is empty.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => {
                                const {
                                    product,
                                    selectedColor,
                                    selectedSize,
                                    quantity,
                                } = item;

                                const lineKey = JSON.stringify([
                                    product.productId,
                                    selectedColor ?? null,
                                    selectedSize ?? null,
                                ]);

                                return (
                                    <div
                                        key={lineKey}
                                        className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
                                    >
                                        <img
                                            src={product.imageUrl || ""}
                                            alt={product.title}
                                            className="h-16 w-16 shrink-0 rounded-xl bg-[#f3eee8] object-cover"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <h3 className="line-clamp-2 text-sm font-black">
                                                {product.title}
                                            </h3>

                                            {(selectedColor || selectedSize) && (
                                                <p className="mt-1 text-xs text-black/50">
                                                    {[selectedColor, selectedSize]
                                                        .filter(Boolean)
                                                        .join(" • ")}
                                                </p>
                                            )}

                                            <p className="mt-2 text-sm font-black text-[#e85d3f]">
                                                {formatPrice(
                                                    product.price * quantity
                                                )}
                                            </p>

                                            <div className="mt-3 flex flex-wrap items-center gap-3">
                                                <div className="flex items-center rounded-full border border-black/15">
                                                    <button
                                                        type="button"
                                                        aria-label={`Decrease quantity of ${product.title}`}
                                                        onClick={() =>
                                                            updateQuantity(
                                                                product.productId,
                                                                quantity - 1,
                                                                selectedColor,
                                                                selectedSize
                                                            )
                                                        }
                                                        className="rounded-l-full px-3 py-1 hover:bg-black/5 focus-visible:outline-2"
                                                    >
                                                        −
                                                    </button>

                                                    <span
                                                        aria-label={`Quantity ${quantity}`}
                                                        className="min-w-7 text-center text-sm font-bold"
                                                    >
                                                        {quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        aria-label={`Increase quantity of ${product.title}`}
                                                        disabled={quantity >= 99}
                                                        onClick={() =>
                                                            updateQuantity(
                                                                product.productId,
                                                                quantity + 1,
                                                                selectedColor,
                                                                selectedSize
                                                            )
                                                        }
                                                        className="rounded-r-full px-3 py-1 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFromCart(
                                                            product.productId,
                                                            selectedColor,
                                                            selectedSize
                                                        )
                                                    }
                                                    className="text-xs font-bold text-red-600 hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="border-t border-black/10 pt-4">
                        <div className="mb-2 flex justify-between text-lg font-black">
                            <span>Subtotal</span>
                            <span className="text-[#e85d3f]">
                                {formatPrice(totalPrice)}
                            </span>
                        </div>

                        <p className="mb-4 text-xs text-black/50">
                            Shipping and taxes are handled at checkout
                            according to your Stripe settings.
                        </p>

                        <button
                            type="button"
                            onClick={handleCheckout}
                            disabled={checkoutLoading || cart.length === 0}
                            className="w-full rounded-full bg-[#e85d3f] py-4 text-sm font-black uppercase text-white shadow-lg transition hover:bg-[#d94f32] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {checkoutLoading
                                ? "Redirecting to checkout..."
                                : "Proceed to Checkout →"}
                        </button>

                        {checkoutError && (
                            <p
                                role="alert"
                                className="mt-3 text-sm text-red-600"
                            >
                                {checkoutError}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
