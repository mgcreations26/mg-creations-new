"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/sheets";
import { formatPrice } from "@/lib/sheets";

type ShopClientProps = {
    products: Product[];
    collections: string[];
};

export default function ShopClient({ products, collections }: ShopClientProps) {
    const [selectedCollection, setSelectedCollection] = useState("All");

    const collectionFilters = ["All", ...collections];

    const visibleProducts = products.filter((p) => {
        if (selectedCollection === "All") return true;
        return (
            p.collection.toLowerCase().trim() ===
            selectedCollection.toLowerCase().trim()
        );
    });

    return (
        <main className="min-h-screen bg-[#fffaf5] text-[#241f1b]">
            {/* HEADER */}
            <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fffaf5]/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
                    <Link href="/" className="text-2xl font-black tracking-tight sm:text-3xl">
                        MG <span className="text-[#e85d3f]">CREATIONS</span>
                    </Link>

                    <nav className="flex items-center gap-6 text-sm font-bold">
                        <Link href="/" className="hover:text-[#e85d3f]">
                            HOME
                        </Link>
                        <span className="text-[#e85d3f]">SHOP</span>
                    </nav>
                </div>
            </header>

            {/* HERO */}
            <section className="px-5 pb-10 pt-16 text-center">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#e85d3f]">
                    The Complete Catalog
                </p>

                <h1 className="mt-4 text-6xl font-black tracking-tight sm:text-7xl">
                    OUR COLLECTIONS
                </h1>
            </section>

            {/* COLLECTION FILTERS */}
            <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
                <div className="flex flex-wrap justify-center gap-3">
                    {collectionFilters.map((col) => {
                        const active = selectedCollection === col;
                        return (
                            <button
                                key={col}
                                onClick={() => setSelectedCollection(col)}
                                className={`rounded-full border px-5 py-3 text-sm font-black transition ${active
                                        ? "border-[#e85d3f] bg-[#e85d3f] text-white"
                                        : "border-black/10 bg-white hover:border-[#e85d3f] hover:text-[#e85d3f]"
                                    }`}
                            >
                                {col}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* PRODUCTS */}
            <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
                {visibleProducts.length === 0 ? (
                    <div className="rounded-[2rem] bg-white px-6 py-20 text-center">
                        <div className="text-5xl">✨</div>
                        <h2 className="mt-5 text-3xl font-black">No products found.</h2>
                        <button
                            onClick={() => setSelectedCollection("All")}
                            className="mt-6 rounded-full bg-[#e85d3f] px-7 py-3 text-sm font-black text-white"
                        >
                            Browse All Collections
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleProducts.map((product) => (
                            <Link
                                key={product.productId || product.slug}
                                href={`/product/${product.slug}`}
                                className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="aspect-square overflow-hidden bg-[#f3eee8]">
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-4xl opacity-20">
                                            🛍️
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <p className="text-xs font-black uppercase tracking-wider text-[#e85d3f]">
                                        {product.collection || product.category}
                                    </p>
                                    <h2 className="mt-2 text-xl font-black">{product.title}</h2>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-lg font-black">
                                            {formatPrice(product.price)}
                                        </span>
                                        <span className="text-sm font-bold">View Product →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}