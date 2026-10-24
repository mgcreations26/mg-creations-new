"use client";

import { useState } from "react";
import type { Product } from "@/data/products";

export default function ProductOptions({
    product,
}: {
    product: Product;
}) {
    const [selectedColor, setSelectedColor] = useState(
        product.colors[0]
    );

    const [selectedSize, setSelectedSize] = useState(
        product.sizes[0]
    );

    const [quantity, setQuantity] = useState(1);

    function addToCart() {
        alert(
            `Added to cart:\n\n${quantity} × ${product.title}\nColor: ${selectedColor}\nSize: ${selectedSize}`
        );
    }

    return (
        <div>

            {/* Color */}
            <div className="mt-8">

                <div className="flex items-center justify-between">

                    <label className="text-sm font-black uppercase tracking-wide">
                        Color
                    </label>

                    <span className="text-sm font-semibold text-black/50">
                        {selectedColor}
                    </span>

                </div>

                <div className="mt-3 flex flex-wrap gap-2">

                    {product.colors.map((color) => (

                        <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${selectedColor === color
                                    ? "border-[#e85d3f] bg-[#e85d3f] text-white"
                                    : "border-black/15 bg-white hover:border-[#e85d3f]"
                                }`}
                        >
                            {color}
                        </button>

                    ))}

                </div>

            </div>

            {/* Size */}
            <div className="mt-7">

                <div className="flex items-center justify-between">

                    <label className="text-sm font-black uppercase tracking-wide">
                        Size
                    </label>

                    <span className="text-sm font-semibold text-black/50">
                        {selectedSize}
                    </span>

                </div>

                <div className="mt-3 flex flex-wrap gap-2">

                    {product.sizes.map((size) => (

                        <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`rounded-lg border px-4 py-3 text-sm font-bold transition ${selectedSize === size
                                    ? "border-[#241f1b] bg-[#241f1b] text-white"
                                    : "border-black/15 bg-white hover:border-[#241f1b]"
                                }`}
                        >
                            {size}
                        </button>

                    ))}

                </div>

            </div>

            {/* Quantity */}
            <div className="mt-7">

                <label className="text-sm font-black uppercase tracking-wide">
                    Quantity
                </label>

                <div className="mt-3 flex w-fit items-center overflow-hidden rounded-xl border border-black/15 bg-white">

                    <button
                        type="button"
                        onClick={() =>
                            setQuantity(Math.max(1, quantity - 1))
                        }
                        className="px-5 py-3 text-lg font-bold hover:bg-black/5"
                    >
                        −
                    </button>

                    <span className="min-w-12 text-center font-black">
                        {quantity}
                    </span>

                    <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-5 py-3 text-lg font-bold hover:bg-black/5"
                    >
                        +
                    </button>

                </div>

            </div>

            {/* Add to Cart */}
            <button
                type="button"
                onClick={addToCart}
                className="mt-10 w-full rounded-full bg-[#e85d3f] px-8 py-5 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#d94f32]"
            >
                Add to Cart →
            </button>

        </div>
    );
}