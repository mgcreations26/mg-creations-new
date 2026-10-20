"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/sheets";

export default function ShopClient({
    products,
    collections,
}: {
    products: Product[];
    collections: string[];
}) {
    const [selectedTheme, setSelectedTheme] = useState<string>("All");
    const [onlyTrending, setOnlyTrending] = useState<boolean>(false);

    // Extract unique themes from products list
    const availableThemes = [
        "All",
        ...Array.from(
            new Set(
                products
                    .map((p) => p.theme)
                    .filter((t) => t && t.trim() !== "" && t !== "undefined")
            )
        ).sort(),
    ];

    // Filter products by selected Theme and Trending flag
    const filteredProducts = products.filter((product) => {
        const matchesTheme =
            selectedTheme === "All" ||
            product.theme.toLowerCase().trim() === selectedTheme.toLowerCase().trim();

        const matchesTrending = onlyTrending ? Boolean(product.trending) : true;

        return matchesTheme && matchesTrending;
    });

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            {/* THEME & TRENDING FILTER CONTROLS */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-orange-100 dark:border-zinc-800">
                {/* THEME TABS */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mr-2 shrink-0">
                        Themes:
                    </span>
                    {availableThemes.map((theme) => (
                        <button
                            key={theme}
                            onClick={() => setSelectedTheme(theme)}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all shrink-0 ${selectedTheme === theme
                                    ? "bg-[#c2410c] text-white shadow-md"
                                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-zinc-700 hover:border-[#c2410c]"
                                }`}
                        >
                            {theme}
                        </button>
                    ))}
                </div>

                {/* TRENDING TOGGLE BUTTON */}
                <button
                    onClick={() => setOnlyTrending(!onlyTrending)}
                    className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all border shrink-0 ${onlyTrending
                            ? "bg-amber-500 text-white border-amber-500 shadow-md"
                            : "bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-zinc-700 hover:border-amber-500"
                        }`}
                >
                    <span>🔥</span>
                    <span>{onlyTrending ? "Showing Trending Only" : "Filter Trending"}</span>
                </button>
            </div>

            {/* PRODUCTS GRID */}
            <div className="mt-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-serif text-2xl font-bold dark:text-white">
                        {selectedTheme === "All" ? "All Products" : `${selectedTheme} Collection`}
                    </h2>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
                    </span>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800">
                        <div className="text-4xl mb-3">🛍️</div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                            No products found in this theme or category.
                        </h3>
                        <button
                            onClick={() => {
                                setSelectedTheme("All");
                                setOnlyTrending(false);
                            }}
                            className="mt-4 px-6 py-2.5 bg-[#c2410c] text-white text-xs font-bold uppercase tracking-wider rounded-full"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <Link
                                key={product.slug}
                                href={`/product/${product.slug}`}
                                className="group cursor-pointer flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-lg p-3 border border-slate-200 dark:border-zinc-800 hover:shadow-xl transition-all duration-300"
                            >
                                <div>
                                    <div className="relative aspect-square overflow-hidden rounded-md bg-slate-50 dark:bg-zinc-800 mb-3">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {product.trending && (
                                            <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
                                                🔥 Trending
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a5d4e]">
                                        {product.theme || product.category}
                                    </span>
                                    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200 group-hover:text-[#c2410c] transition-colors line-clamp-2 mt-1">
                                        {product.title}
                                    </h3>
                                </div>

                                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                                    <span className="text-sm font-bold text-[#c2410c]">
                                        {formatPrice(product.price)}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase text-[#c2410c] group-hover:underline">
                                        View →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}