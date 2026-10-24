"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/lib/sheets";

export type CartItem = Product & {
    cartKey: string;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
};

export type CartContextType = {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    hydrated: boolean;
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addToCart: (product: Product, quantity?: number) => void;
    updateQuantity: (cartKey: string, quantity: number) => void;
    removeItem: (cartKey: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem("mg_cart");
            if (stored) {
                setItems(JSON.parse(stored));
            }
        } catch {
            // Ignore read errors
        }
        setHydrated(true);
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        if (hydrated) {
            try {
                localStorage.setItem("mg_cart", JSON.stringify(items));
            } catch {
                // Ignore write errors
            }
        }
    }, [items, hydrated]);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const addToCart = (product: Product, quantity: number = 1) => {
        const cartKey = `${product.slug}-${product.color || "default"}-${product.size || "default"}`;

        setItems((prev) => {
            const existing = prev.find((item) => item.cartKey === cartKey);
            if (existing) {
                return prev.map((item) =>
                    item.cartKey === cartKey
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, cartKey, quantity }];
        });

        setIsOpen(true);
    };

    const updateQuantity = (cartKey: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(cartKey);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.cartKey === cartKey ? { ...item, quantity } : item
            )
        );
    };

    const removeItem = (cartKey: string) => {
        setItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
    };

    const clearCart = () => {
        setItems([]);
    };

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                itemCount,
                subtotal,
                hydrated,
                isOpen,
                openCart,
                closeCart,
                addToCart,
                updateQuantity,
                removeItem,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}