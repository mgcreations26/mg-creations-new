
"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Product } from "@/lib/sheets";

export type CartItem = {
    product: Product;
    selectedColor?: string;
    selectedSize?: string;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product, color?: string, size?: string) => void;
    removeFromCart: (productId: string, color?: string, size?: string) => void;
    updateQuantity: (
        productId: string,
        quantity: number,
        color?: string,
        size?: string
    ) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    totalCount: number;
    totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "mg_creations_cart";
const MAX_QUANTITY = 99;

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (saved) {
                const parsed: unknown = JSON.parse(saved);

                if (Array.isArray(parsed)) {
                    const valid = parsed.filter((item): item is CartItem => {
                        return (
                            item !== null &&
                            typeof item === "object" &&
                            item.product !== null &&
                            typeof item.product === "object" &&
                            typeof item.product.productId === "string" &&
                            Number.isSafeInteger(item.quantity) &&
                            item.quantity >= 1 &&
                            item.quantity <= MAX_QUANTITY
                        );
                    });

                    setCart(valid);
                }
            }
        } catch (error) {
            console.error("Unable to restore cart:", error);
        } finally {
            setHydrated(true);
        }
    }, []);

    useEffect(() => {
        if (!hydrated) return;

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.error("Unable to save cart:", error);
        }
    }, [cart, hydrated]);

    const addToCart = useCallback(
        (product: Product, color?: string, size?: string) => {
            setCart((current) => {
                const existing = current.find(
                    (item) =>
                        item.product.productId === product.productId &&
                        item.selectedColor === color &&
                        item.selectedSize === size
                );

                if (existing) {
                    return current.map((item) =>
                        item.product.productId === product.productId &&
                            item.selectedColor === color &&
                            item.selectedSize === size
                            ? {
                                ...item,
                                product,
                                quantity: Math.min(item.quantity + 1, MAX_QUANTITY),
                            }
                            : item
                    );
                }

                return [
                    ...current,
                    {
                        product,
                        selectedColor: color,
                        selectedSize: size,
                        quantity: 1,
                    },
                ];
            });

            setIsCartOpen(true);
        },
        []
    );

    const removeFromCart = useCallback(
        (productId: string, color?: string, size?: string) => {
            setCart((current) =>
                current.filter(
                    (item) =>
                        !(
                            item.product.productId === productId &&
                            item.selectedColor === color &&
                            item.selectedSize === size
                        )
                )
            );
        },
        []
    );

    const updateQuantity = useCallback(
        (productId: string, quantity: number, color?: string, size?: string) => {
            if (!Number.isSafeInteger(quantity)) return;

            if (quantity <= 0) {
                removeFromCart(productId, color, size);
                return;
            }

            setCart((current) =>
                current.map((item) =>
                    item.product.productId === productId &&
                        item.selectedColor === color &&
                        item.selectedSize === size
                        ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY) }
                        : item
                )
            );
        },
        [removeFromCart]
    );

    const clearCart = useCallback(() => setCart([]), []);

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = cart.reduce((sum, item) => {
        const price = Number(item.product.price);
        return Number.isFinite(price) && price >= 0
            ? sum + price * item.quantity
            : sum;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                isCartOpen,
                setIsCartOpen,
                totalCount,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextType {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside a CartProvider");
    }

    return context;
}
