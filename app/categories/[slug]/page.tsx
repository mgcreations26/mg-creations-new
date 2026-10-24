import Link from "next/link";
import { getProducts, getCategories, formatPrice } from "@/lib/sheets";
import { notFound } from "next/navigation";

type CategoryPageProps = {
    params: Promise<{
        slug?: string;
    }>;
};

export default async function IndividualCategoryPage({ params }: CategoryPageProps) {
    const resolvedParams = await params;
    const rawSlug = resolvedParams?.slug ?? "";

    if (!rawSlug) {
        notFound();
    }

    const targetSlug = rawSlug.toLowerCase().trim();
    const normalizedTarget = targetSlug.replace(/s$/, ""); // e.g. "mugs" -> "mug"
    const targetClean = targetSlug.replace(/[^a-z0-9]/g, "").replace(/s$/, ""); // e.g. "totebags" -> "totebag"

    const [products, categories] = await Promise.all([
        getProducts(),
        getCategories(),
    ]);

    // Find category metadata matching exact slug, singular, or clean alphanumeric variation
    const categoryMeta = categories.find((c) => {
        const cSlug = c.slug.toLowerCase().trim();
        const cClean = cSlug.replace(/[^a-z0-9]/g, "").replace(/s$/, "");
        return (
            cSlug === targetSlug ||
            cSlug === normalizedTarget ||
            cSlug.replace(/s$/, "") === normalizedTarget ||
            cClean === targetClean
        );
    });

    const metaNameClean = categoryMeta?.name.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/s$/, "");

    // Filter products by matching category slug, name, clean name, or style/theme
    const categoryProducts = products.filter((p) => {
        const catLower = (p.category || "").toLowerCase().trim();
        const catSlug = catLower.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
        const catClean = catLower.replace(/[^a-z0-9]/g, "").replace(/s$/, "");
        const styleLower = (p.style || "").toLowerCase();
        const themeLower = (p.theme || "").toLowerCase();

        // 1. Direct category match
        const matchesCategory =
            catSlug === targetSlug ||
            catSlug === normalizedTarget ||
            catClean === targetClean ||
            (metaNameClean && catClean === metaNameClean) ||
            catLower === targetSlug.replace(/-/g, " ");

        // 2. Fallbacks for style or theme
        const matchesStyle = styleLower === normalizedTarget || styleLower === targetClean;
        const matchesTheme = themeLower === normalizedTarget || themeLower === targetClean;

        return matchesCategory || matchesStyle || matchesTheme;
    });

    const categoryName =
        categoryMeta?.name ||
        (categoryProducts.length > 0 ? categoryProducts[0].category : targetSlug.replace(/-/g, " "));

    return (
        <main className="min-h-screen flex flex-col bg-[#fffaf5] text-[#241f1b]">
            {/* HEADER */}
            <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fffaf5]/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
                    <Link href="/" className="text-2xl font-black tracking-tight sm:text-3xl">
                        MG <span className="text-[#e85d3f]">CREATIONS</span>
                    </Link>

                    <nav className="flex items-center gap-6 text-sm font-bold">
                        <Link href="/" className="hover:text-[#e85d3f]">HOME</Link>
                        <Link href="/shop" className="hover:text-[#e85d3f]">SHOP</Link>
                        <Link href="/categories" className="hover:text-[#e85d3f]">CATEGORIES</Link>
                    </nav>
                </div>
            </header>

            {/* HERO */}
            <section className="px-5 pb-8 pt-16 text-center">
                <Link
                    href="/categories"
                    className="inline-block text-xs font-black uppercase tracking-widest text-[#e85d3f] hover:underline"
                >
                    ← All Categories
                </Link>

                <h1 className="mt-4 text-6xl font-black uppercase tracking-tight sm:text-7xl">
                    {categoryName}
                </h1>
                {categoryMeta?.description ? (
                    <p className="mx-auto mt-4 max-w-xl text-black/60 leading-relaxed">
                        {categoryMeta.description}
                    </p>
                ) : (
                    <p className="mx-auto mt-4 max-w-lg text-black/55">
                        Browsing all custom pieces in our {categoryName} collection.
                    </p>
                )}
            </section>

            {/* PRODUCTS GRID */}
            <section className="mx-auto flex-1 max-w-7xl px-5 pb-24 lg:px-8">
                {categoryProducts.length === 0 ? (
                    <div className="rounded-[2rem] bg-white px-6 py-20 text-center border border-black/5 shadow-sm">
                        <div className="text-5xl">☕</div>
                        <h2 className="mt-4 text-3xl font-black">
                            No items listed under {categoryName} yet!
                        </h2>
                        <Link
                            href="/shop"
                            className="mt-6 inline-block rounded-full bg-[#e85d3f] px-7 py-3 text-sm font-black text-white"
                        >
                            Explore Full Shop →
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {categoryProducts.map((product, index) => (
                            <Link
                                key={`${product.productId}-${product.slug}-${index}`}
                                href={`/product/${product.slug}`}
                                className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl border border-black/5"
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
                                        {product.category}
                                    </p>
                                    <h2 className="mt-2 text-xl font-black line-clamp-2">{product.title}</h2>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-lg font-black">
                                            {formatPrice(product.price)}
                                        </span>
                                        <span className="text-sm font-bold text-[#e85d3f]">View Product →</span>
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
