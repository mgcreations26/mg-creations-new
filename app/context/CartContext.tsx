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
    // Primary API (used by /cart)
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    hydrated: boolean;
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addToCart: (
        product: Product,
        quantity?: number,
        selectedColor?: string,
        selectedSize?: string
    ) => void;
    updateQuantity: (cartKey: string, quantity: number) => void;
    removeItem: (cartKey: string) => void;
    clearCart: () => void;

    // Legacy Aliases (used by CartDrawer)
    cart: CartItem[];
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    removeFromCart: (cartKey: string) => void;
    totalCount: number;
    totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    // Load cart from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem("mg_cart");
            if (stored) {
                setItems(JSON.parse(stored));
            }
        } catch {
            // Ignore storage read error
        }
        setHydrated(true);
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        if (hydrated) {
            try {
                localStorage.setItem("mg_cart", JSON.stringify(items));
            } catch {
                // Ignore storage write error
            }
        }
    }, [items, hydrated]);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const addToCart = (
        product: Product,
        quantity: number = 1,
        selectedColor?: string,
        selectedSize?: string
    ) => {
        const color = selectedColor || product.color || "default";
        const size = selectedSize || product.size || "default";
        const cartKey = `${product.slug}-${color}-${size}`;

        setItems((prev) => {
            const existing = prev.find((item) => item.cartKey === cartKey);
            if (existing) {
                return prev.map((item) =>
                    item.cartKey === cartKey
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [
                ...prev,
                {
                    ...product,
                    cartKey,
                    quantity,
                    selectedColor: color,
                    selectedSize: size,
                },
            ];
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

                // Legacy aliases
                cart: items,
                isCartOpen: isOpen,
                setIsCartOpen: setIsOpen,
                removeFromCart: removeItem,
                totalCount: itemCount,
                totalPrice: subtotal,
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