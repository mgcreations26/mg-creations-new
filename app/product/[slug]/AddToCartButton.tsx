"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/sheets";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        {/* QUANTITY COUNTER */}
        <div className="w-32 flex items-center border border-slate-200 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-3 hover:text-primary transition-colors text-slate-600 dark:text-slate-300 font-bold"
          >
            -
          </button>
          <input
            type="number"
            readOnly
            value={quantity}
            className="w-full text-center border-none bg-transparent focus:ring-0 text-sm font-bold text-slate-800 dark:text-slate-100"
          />
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-3 hover:text-primary transition-colors text-slate-600 dark:text-slate-300 font-bold"
          >
            +
          </button>
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          onClick={() => {
            for (let i = 0; i < quantity; i++) {
              addToCart(product);
            }
          }}
          className="flex-grow bg-[#c2410c] text-white font-bold py-4 px-6 rounded hover:bg-orange-700 transition-colors shadow-lg shadow-orange-700/20 active:scale-[0.98] transform uppercase tracking-wider"
        >
          ADD TO CART
        </button>
      </div>

      {/* FAST CHECKOUT BUTTON */}
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-4 rounded flex items-center justify-center space-x-2 hover:bg-black dark:hover:bg-slate-100 transition-all active:scale-[0.98] transform"
      >
        <span>Buy now</span>
      </button>
    </div>
  );
}