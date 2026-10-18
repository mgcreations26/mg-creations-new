"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/sheets";
import type { Product } from "@/lib/sheets";

export default function AddToCartButton({
    product,
}: {
    product: Product;
}) {
    const { addToCart } = useCart();

    return (
        <button
            type="button"
            onClick={() => addToCart(product)}
            className="w-full rounded-full bg-[#e85d3f] py-5 text-center text-sm font-black uppercase tracking-wider text-white shadow-lg transition duration-300 hover:bg-[#d94f32] hover:shadow-xl active:scale-[0.99]"
        >
            Add To Cart — {formatPrice(product.price)}
        </button>
    );
}
