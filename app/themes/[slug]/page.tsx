import Link from "next/link";
import { getThemes, getProducts, formatPrice } from "@/lib/sheets";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const themes = await getThemes();
    const theme = themes.find((t) => t.slug === slug);
    if (!theme) return {};
    return {
        title: `${theme.name} — Shop By Theme`,
        description: `Browse all MG Creations products in the "${theme.name}" theme.`,
    };
}

export default async function ThemeDetailPage({ params }: Props) {
    const { slug } = await params;

    const [themes, products] = await Promise.all([getThemes(), getProducts()]);

    const theme = themes.find((t) => t.slug === slug);
    if (!theme) notFound();

    const themeProducts = products.filter(
        (p) => (p.theme ?? "").toLowerCase().trim() === theme.name.toLowerCase().trim()
    );

    return (
        <main className="flex min-h-screen flex-col bg-[#fffaf5] text-[#241f1b]">

            {/* ── HERO ── */}
            <section className="px-5 pb-8 pt-16 text-center lg:px-8">
                <Link
                    href="/themes"
                    className="inline-block text-xs font-black uppercase tracking-widest text-[#e85d3f] hover:underline"
                >
                    ← All Themes
                </Link>
                <h1 className="mt-4 text-6xl font-black uppercase tracking-tight sm:text-7xl">
                    {theme.name}
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-base text-black/55">
                    {themeProducts.length > 0
                        ? `${themeProducts.length} ${themeProducts.length === 1 ? "product" : "products"} in this theme`
                        : "No products listed yet — check back soon!"}
                </p>
            </section>

            {/* ── PRODUCTS GRID ── */}
            <section className="mx-auto w-full max-w-7xl flex-1 px-5 pb-24 lg:px-8">
                {themeProducts.length === 0 ? (
                    <div className="rounded-[2rem] bg-white px-6 py-20 text-center border border-black/5 shadow-sm">
                        <div className="text-5xl">🎨</div>
                        <h2 className="mt-4 text-3xl font-black">No items here yet!</h2>
                        <Link
                            href="/shop"
                            className="mt-6 inline-block rounded-full bg-[#e85d3f] px-7 py-3 text-sm font-black text-white"
                        >
                            Explore Full Shop →
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {themeProducts.map((product, idx) => (
                            <Link
                                key={`${product.productId}-${product.slug}-${idx}`}
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
                                        <span className="text-lg font-black">{formatPrice(product.price)}</span>
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
