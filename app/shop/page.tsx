import Link from "next/link";
import { getProducts, formatPrice } from "@/lib/sheets";
import { Sparkles, ArrowRight, Star } from "lucide-react";

type ShopPageProps = {
    searchParams: Promise<{
        theme?: string;
        collection?: string;
    }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const [{ theme, collection }, allProducts] = await Promise.all([
        searchParams,
        getProducts(),
    ]);

    const selectedFilter = theme?.trim() || collection?.trim();

    const products = allProducts.filter((product) => {
        if (!selectedFilter) return true;

        const matchTheme = product.theme?.trim().toLowerCase() === selectedFilter.toLowerCase();
        const matchCol = product.collection?.trim().toLowerCase() === selectedFilter.toLowerCase();
        return matchTheme || matchCol;
    });

    return (
        <main className="min-h-screen bg-[#fff8f5] text-[#1f1b17]">
            {/* Header Banner */}
            <section className="relative overflow-hidden bg-[#fdf2eb] border-b border-[#e0bfb8]/40 px-5 py-14 text-center">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-[#a93017]/10 blur-3xl"
                />

                <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ffdad3]/70 text-[#8b1a02] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-[#a93017]" />
                        <span>Curated Catalog</span>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1f1b17]">
                        {selectedFilter ? selectedFilter : "Shop All Creations"}
                    </h1>

                    <p className="mt-4 text-sm sm:text-base text-[#59413c] leading-relaxed">
                        {selectedFilter
                            ? `Explore handcrafted pieces in the ${selectedFilter} collection.`
                            : "Discover custom apparel, bespoke signs, keepsake gifts, drinkware, and lifestyle treasures."}
                    </p>

                    {selectedFilter && (
                        <Link
                            href="/shop"
                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#a93017] hover:text-[#cb482c] transition-colors"
                        >
                            <span>← View Full Collection</span>
                        </Link>
                    )}

                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#8d716b]">
                        Showing {products.length} {products.length === 1 ? "design" : "unique designs"}
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 py-16">
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link
                                key={product.productId || product.slug}
                                href={`/product/${product.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col border border-[#e0bfb8]/40"
                            >
                                <div className="relative aspect-square overflow-hidden bg-[#f7ece5]">
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center font-serif text-3xl text-[#a93017]/30">
                                            MG
                                        </div>
                                    )}

                                    {product.bestSeller && (
                                        <span className="absolute top-3 left-3 bg-[#a43c22] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                                            Best Seller
                                        </span>
                                    )}
                                </div>

                                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center justify-between text-xs text-[#59413c]">
                                            <span>{product.category || "Original"}</span>
                                            <span className="flex items-center text-[#825100] font-semibold gap-1">
                                                <Star className="w-3.5 h-3.5 fill-current" /> 5.0
                                            </span>
                                        </div>

                                        <h2 className="font-serif text-base font-bold text-[#1f1b17] group-hover:text-[#a93017] transition-colors line-clamp-2 leading-snug">
                                            {product.title}
                                        </h2>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-[#e0bfb8]/30">
                                        <span className="font-bold text-lg text-[#1f1b17]">
                                            {formatPrice(product.price)}
                                        </span>

                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#a93017] group-hover:translate-x-0.5 transition-transform">
                                            <span>Customize</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center">
                        <p className="font-serif text-xl font-bold text-[#1f1b17]">
                            No products found in this category
                        </p>
                        <p className="mt-2 text-sm text-[#59413c]">
                            Try browsing all our handcrafted creations.
                        </p>
                        <Link
                            href="/shop"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#a93017] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#cb482c] shadow-md transition"
                        >
                            <span>Browse All Products</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
}
