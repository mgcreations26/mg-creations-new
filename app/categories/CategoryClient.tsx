"use client";

import Link from "next/link";
import type { Category } from "@/lib/sheets";

type CategoryClientProps = {
    categories: Category[];
};

export default function CategoryClient({ categories }: CategoryClientProps) {
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
                        <Link href="/shop" className="hover:text-[#e85d3f]">
                            SHOP
                        </Link>
                        <span className="text-[#e85d3f]">CATEGORIES</span>
                    </nav>
                </div>
            </header>

            {/* HERO */}
            <section className="px-5 pb-8 pt-16 text-center">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#e85d3f]">
                    Shop By Item Type
                </p>

                <h1 className="mt-4 text-6xl font-black tracking-tight sm:text-7xl">
                    APPAREL & GEAR
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-black/55">
                    Select a category below to explore dedicated product lines.
                </p>
            </section>

            {/* CATEGORY CARDS GRID FROM GOOGLE SHEETS */}
            <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug || cat.name}
                            href={`/categories/${cat.slug}`}
                            className="group block overflow-hidden rounded-[2rem] bg-white border-2 border-transparent shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#e85d3f] hover:shadow-xl"
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-[#f3eee8] relative">
                                {cat.imageUrl ? (
                                    <img
                                        src={cat.imageUrl}
                                        alt={cat.name}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-5xl opacity-30">
                                        🛍️
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 rounded-full bg-black/70 px-4 py-1.5 text-xs font-black text-white uppercase tracking-wider backdrop-blur">
                                    View Category →
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-xs font-black uppercase tracking-wider text-[#e85d3f]">
                                    Category
                                </p>
                                <h3 className="mt-1 text-2xl font-black">{cat.name}</h3>
                                {cat.description && (
                                    <p className="mt-2 text-sm text-black/55 line-clamp-2">
                                        {cat.description}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}