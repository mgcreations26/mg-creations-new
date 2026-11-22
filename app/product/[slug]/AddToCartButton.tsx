"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/sheets";
import { ShoppingBag, Check, Plus, Minus } from "lucide-react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [personalization, setPersonalization] = useState("");
  const [added, setAdded] = useState(false);

  // Parse color/option variants
  const colorOptions = product.color
    ? product.color.split(",").map((c) => c.trim()).filter(Boolean)
    : [];
  const [selectedColor, setSelectedColor] = useState(colorOptions[0] || "");

  // Default size options
  const rawSizes = product.size
    ? product.size.split(",").map((s) => s.trim()).filter(Boolean)
    : ["S", "M", "L", "XL", "2XL"];
  const [selectedSize, setSelectedSize] = useState(rawSizes[0] || "M");

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      selectedColor || undefined,
      selectedSize || undefined
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  };

  return (
    <div className="space-y-6 border-y border-[#e0bfb8]/40 py-6">
      {/* COLOR SELECTION */}
      {colorOptions.length > 0 && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1f1b17] mb-2.5">
            Color Option
          </label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((col, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedColor(col)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                  selectedColor === col
                    ? "bg-[#a93017] text-white shadow-sm ring-2 ring-[#a93017] ring-offset-2"
                    : "bg-[#fff8f5] text-[#59413c] border border-[#e0bfb8]/60 hover:border-[#a93017]"
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SIZE SELECTION */}
      {rawSizes.length > 0 && (
        <div>
          <div className="flex justify-between items-end mb-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1f1b17]">
              Size Selection
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {rawSizes.map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSelectedSize(sz)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                  selectedSize === sz
                    ? "bg-[#a93017] text-white shadow-sm ring-2 ring-[#a93017] ring-offset-2"
                    : "bg-[#fff8f5] text-[#59413c] border border-[#e0bfb8]/60 hover:border-[#a93017]"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PERSONALIZATION (PROOFING HOOK) */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1f1b17] mb-2">
          Personalization / Custom Engraving (Optional)
        </label>
        <input
          type="text"
          value={personalization}
          onChange={(e) => setPersonalization(e.target.value)}
          placeholder="e.g. The Miller Family • Est. 2024"
          className="w-full bg-[#fdf2eb] border border-[#e0bfb8]/60 rounded-full text-xs sm:text-sm py-3 px-5 focus:outline-none focus:ring-2 focus:ring-[#a93017] text-[#1f1b17] placeholder:text-[#8d716b]"
        />
        <p className="mt-1.5 text-[11px] text-[#59413c]">
          Free live proofing available prior to dispatch.
        </p>
      </div>

      {/* QUANTITY AND ADD TO CART */}
      <div className="space-y-3 pt-2">
        <div className="flex gap-4">
          <div className="flex items-center border border-[#e0bfb8]/60 rounded-full bg-[#fdf2eb] px-2 py-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 hover:text-[#a93017] transition-colors text-[#59413c]"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-10 text-center bg-transparent border-none text-xs font-bold text-[#1f1b17] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 hover:text-[#a93017] transition-colors text-[#59413c]"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-4 px-6 rounded-full bg-[#a93017] hover:bg-[#cb482c] text-white font-bold text-xs uppercase tracking-wider shadow-[0_12px_32px_-8px_rgba(169,48,23,0.35)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added to Keepsake Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
