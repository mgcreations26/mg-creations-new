"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/sheets";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [personalization, setPersonalization] = useState("");

  // Parse color/option variants
  const colorOptions = product.color
    ? product.color.split(",").map((c) => c.trim()).filter(Boolean)
    : [];
  const [selectedColor, setSelectedColor] = useState(colorOptions[0] || "");

  // Default size options
  const sizes = ["S", "M", "L", "XL", "2XL"];
  const [selectedSize, setSelectedSize] = useState("S");

  return (
    <div className="space-y-6 border-y border-orange-100 dark:border-zinc-800 py-6">
      {/* COLOR SELECTION */}
      {colorOptions.length > 0 && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300 mb-3">
            Color
          </label>
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((col, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedColor(col)}
                className={`px-4 py-2 text-xs font-bold uppercase rounded transition-all ${selectedColor === col
                    ? "bg-[#c2410c] text-white ring-2 ring-[#c2410c] ring-offset-2"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-zinc-700 hover:border-[#c2410c]"
                  }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SIZE SELECTION */}
      <div>
        <div className="flex justify-between items-end mb-3">
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">
            Size Selection
          </label>
          <span className="text-[10px] text-[#c2410c] font-bold uppercase tracking-wider cursor-pointer hover:underline">
            Size Guide
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => setSelectedSize(sz)}
              className={`px-5 py-2 text-sm font-bold transition-all ${selectedSize === sz
                  ? "border-2 border-[#c2410c] text-[#c2410c] bg-orange-50 dark:bg-[#c2410c]/10"
                  : "border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 hover:border-[#c2410c]"
                }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* PERSONALIZATION */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300 mb-3">
          Personalization (Optional)
        </label>
        <input
          type="text"
          value={personalization}
          onChange={(e) => setPersonalization(e.target.value)}
          placeholder="Enter name or short message"
          className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-md text-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#c2410c] text-slate-800 dark:text-slate-100"
        />
      </div>

      {/* QUANTITY AND ADD TO CART */}
      <div className="space-y-3 pt-2">
        <div className="flex gap-4">
          <div className="w-32 flex items-center border border-slate-200 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-3 hover:text-[#c2410c] transition-colors text-slate-600 dark:text-slate-300 font-bold"
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
              className="px-3 py-3 hover:text-[#c2410c] transition-colors text-slate-600 dark:text-slate-300 font-bold"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              for (let i = 0; i < quantity; i++) {
                addToCart({
                  ...product,
                  color: selectedColor || product.color,
                  size: selectedSize,
                });
              }
            }}
            className="flex-grow bg-[#c2410c] text-white font-bold py-4 px-6 rounded hover:bg-orange-700 transition-colors shadow-lg shadow-orange-700/20 active:scale-[0.98] transform uppercase tracking-wider text-sm"
          >
            ADD TO CART
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            addToCart({
              ...product,
              color: selectedColor || product.color,
              size: selectedSize,
            });
          }}
          className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-4 rounded flex items-center justify-center space-x-2 hover:bg-black dark:hover:bg-slate-100 transition-all active:scale-[0.98] transform text-sm"
        >
          <span>Buy with</span>
          <span className="text-orange-400">G Pay</span>
        </button>
      </div>
    </div>
  );
}