import Link from "next/link";
import { getCategories, getProducts } from "@/lib/sheets";

export default async function CategoriesPage() {
    const [categoriesList, products] = await Promise.all([
        getCategories(),
        getProducts(),
    ]);

    // Helper to normalize strings for comparison (lowercase, strip symbols, singular)
    const cleanStr = (s: string) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "").replace(/s$/, "");

    // Build category cards with item counts
    const cards = categoriesList.map((cat) => {
        const targetClean = cleanStr(cat.slug);
        const nameClean = cleanStr(cat.name);

        const count = products.filter((p) => {
            const prodCatClean = cleanStr(p.category);
            return prodCatClean === targetClean || prodCatClean === nameClean;
        }).length;

        return {
            name: cat.name,
            slug: cat.slug,
            description: cat.description,
            imageUrl: cat.imageUrl,
            count,
        };
    });

    // Also include any categories present in products that aren't in categoriesList
    for (const product of products) {
        const rawCat = product.category || "General";
        const prodCatClean = cleanStr(rawCat);
        const alreadyExists = cards.some(
            (c) => cleanStr(c.slug) === prodCatClean || cleanStr(c.name) === prodCatClean
        );
        if (!alreadyExists && rawCat !== "General") {
            const slug = rawCat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
            const count = products.filter((p) => cleanStr(p.category) === prodCatClean).length;
            cards.push({
                name: rawCat,
                slug,
                description: `Explore custom ${rawCat} pieces.`,
                imageUrl: product.imageUrl,
                count,
            });
        }
    }

    return (
        <main className="flex min-h-screen flex-col bg-[#fffaf5] text-[#241f1b]">
            {/* HEADER */}


            {/* HERO */}
            <section className="px-5 pb-8 pt-16 text-center">
                <h1 className="text-5xl font-black uppercase tracking-tight sm:text-6xl">
                    Shop By Category
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-black/60">
                    Explore our curated collections across all product lines.
                </p>
            </section>

            {/* CATEGORIES GRID */}
            <section className="mx-auto flex-1 max-w-7xl px-5 pb-24 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/categories/${cat.slug}`}
                            className="group overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl border border-black/5 flex flex-col justify-between"
                        >
                            <div className="aspect-square overflow-hidden rounded-2xl bg-[#f3eee8]">
                                {cat.imageUrl ? (
                                    <img
                                        src={cat.imageUrl}
                                        alt={cat.name}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-4xl opacity-20">
                                        ðŸ›ï¸
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-black uppercase">{cat.name}</h2>
                                    <p className="mt-1 text-xs font-bold text-black/40">
                                        {cat.count} {cat.count === 1 ? "item" : "items"}
                                    </p>
                                </div>
                                <span className="text-sm font-black text-[#e85d3f] transition group-hover:translate-x-1">
                                    View â†’
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </main>
    );
}
