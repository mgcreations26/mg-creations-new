
import Link from "next/link";
import { getThemes } from "@/lib/sheets";

export default async function ShopThemePage() {
    const themes = await getThemes();

    return (
        <main className="flex min-h-screen flex-col bg-[#fffaf5] text-[#241f1b]">
            <section className="px-5 pb-8 pt-16 text-center">
                <h1 className="text-5xl font-black uppercase tracking-tight sm:text-6xl">
                    Shop By Theme
                </h1>

                <p className="mx-auto mt-4 max-w-lg text-black/60">
                    Explore our custom product lines organized by unique aesthetic themes.
                </p>
            </section>

            <section className="mx-auto w-full max-w-7xl flex-1 px-5 pb-24 lg:px-8">
                {themes.length === 0 ? (
                    <p className="py-12 text-center text-black/60">
                        No active themes are available right now.
                    </p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {themes.map((theme) => (
                            <Link
                                key={theme.slug}
                                href={`/shop?theme=${encodeURIComponent(theme.name)}`}
                                className="group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="aspect-square overflow-hidden rounded-2xl bg-[#f3eee8]">
                                    {theme.imageUrl ? (
                                        <img
                                            src={theme.imageUrl}
                                            alt={theme.name}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-black/30">
                                            No image available
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <div className="flex items-center justify-between gap-3">
                                        <h2 className="text-2xl font-black uppercase">
                                            {theme.name}
                                        </h2>

                                        {theme.trending && (
                                            <span className="rounded-full bg-[#e85d3f]/10 px-3 py-1 text-xs font-bold text-[#e85d3f]">
                                                Trending
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-3 text-sm leading-6 text-black/60">
                                        {theme.description}
                                    </p>

                                    <p className="mt-4 text-sm font-black text-[#e85d3f] transition group-hover:translate-x-1">
                                        Explore →
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
