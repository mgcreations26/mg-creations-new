
import Link from "next/link";
import { getProducts, formatPrice } from "@/lib/sheets";

type ShopPageProps = {
    searchParams: Promise<{
        theme?: string;
    }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const [{ theme }, allProducts] = await Promise.all([
        searchParams,
        getProducts(),
    ]);

    const selectedTheme = theme?.trim();

    const products = allProducts.filter((product) => {
        if (!selectedTheme) return true;

        return (
            product.theme?.trim().toLowerCase() ===
            selectedTheme.toLowerCase()
        );
    });

    return (
        <main className="min-h-screen bg-[#fffaf5] text-[#241f1b]">
            <section className="px-5 pb-8 pt-16 text-center">
                <h1 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
                    {selectedTheme ? selectedTheme : "Shop All Products"}
                </h1>

                <p className="mx-auto mt-4 max-w-lg text-black/60">
                    {selectedTheme
                        ? `Explore our products in the ${selectedTheme} collection.`
                        : "Discover custom apparel, graphic tees, mugs, totes, and more."}
                </p>

                {selectedTheme && (
                    <Link
                        href="/shop"
                        className="mt-5 inline-block text-sm font-bold text-[#c2410c] hover:underline"
                    >
                        ← View All Products
                    </Link>
                )}

                <p className="mt-4 text-sm text-black/50">
                    {products.length}{" "}
                    {products.length === 1 ? "product" : "products"}
                </p>
            </section>

            <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
                {products.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                        {products.map((product) => (
                            <Link
                                key={product.productId || product.slug}
                                href={`/product/${product.slug}`}
                                className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="aspect-square overflow-hidden bg-[#f3eee8]">
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center p-4 text-center text-sm text-black/40">
                                            Image coming soon
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    {product.category && (
                                        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-black/40">
                                            {product.category}
                                        </p>
                                    )}

                                    <h2 className="line-clamp-2 font-bold leading-snug">
                                        {product.title}
                                    </h2>

                                    <p className="mt-2 font-black text-[#c2410c]">
                                        {formatPrice(product.price)}
                                    </p>

                                    <p className="mt-3 text-xs font-bold uppercase tracking-wide text-black/50 transition group-hover:text-[#c2410c]">
                                        View Product →
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-black/5 bg-white px-6 py-16 text-center">
                        <h2 className="text-xl font-bold">
                            No products found
                        </h2>
                        <p className="mt-2 text-black/60">
                            Try browsing all of our available products.
                        </p>
                        <Link
                            href="/shop"
                            className="mt-5 inline-block rounded-full bg-[#e85d3f] px-6 py-3 font-bold text-white transition hover:opacity-90"
                        >
                            Shop All Products
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
}
