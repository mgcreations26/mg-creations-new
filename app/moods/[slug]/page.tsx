import Link from "next/link";
import { moods as moodData } from "@/data/moods";
import { products } from "@/data/products";

const moodVisuals = [
    {
        emoji: "😎",
        color: "bg-orange-100 border-orange-200",
    },
    {
        emoji: "🛍️",
        color: "bg-emerald-100 border-emerald-200",
    },
    {
        emoji: "🥂",
        color: "bg-yellow-100 border-yellow-200",
    },
    {
        emoji: "💻",
        color: "bg-indigo-100 border-indigo-200",
    },
    {
        emoji: "🎪",
        color: "bg-fuchsia-100 border-fuchsia-200",
    },
    {
        emoji: "🌳",
        color: "bg-green-100 border-green-200",
    },
];

export default function MoodsPage() {
    const uniqueMoods = moodData.filter(
        (mood, index, array) =>
            array.findIndex((item) => item.slug === mood.slug) === index
    );

    return (
        <main className="min-h-screen bg-[#fffaf5] text-[#241f1b]">

            {/* HEADER */}
            <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fffaf5]/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">

                    <Link
                        href="/"
                        className="text-2xl font-black tracking-tight sm:text-3xl"
                    >
                        MG <span className="text-[#e85d3f]">CREATIONS</span>
                    </Link>

                    <nav className="flex items-center gap-5 text-sm font-semibold sm:gap-8">

                        <Link
                            href="/"
                            className="hover:text-[#e85d3f]"
                        >
                            HOME
                        </Link>

                        <Link
                            href="/shop"
                            className="hover:text-[#e85d3f]"
                        >
                            SHOP
                        </Link>

                        <span className="font-black text-[#e85d3f]">
                            MOODS
                        </span>

                        <button
                            aria-label="Shopping cart"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white"
                        >
                            🛒
                        </button>

                    </nav>
                </div>
            </header>


            {/* HERO */}
            <section className="px-5 pb-14 pt-16 text-center sm:pt-20 lg:px-8 lg:pb-20">

                <div className="mx-auto max-w-4xl">

                    <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#e85d3f]">
                        Shop by feeling
                    </p>

                    <h1 className="text-6xl font-black leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
                        WHAT&apos;S
                        <br />
                        YOUR <span className="text-[#e85d3f]">MOOD?</span>
                    </h1>

                    <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-black/55">
                        Whatever you&apos;re doing today, there&apos;s a mood for that.
                    </p>

                </div>

            </section>


            {/* MOOD CARDS */}
            <section className="px-5 pb-24 lg:px-8">

                <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {uniqueMoods.map((mood, index) => {

                        const visual =
                            moodVisuals[index % moodVisuals.length];

                        // Find actual products belonging to this mood
                        const moodProducts = products.filter(
                            (product) =>
                                product.listOnWebsite &&
                                product.mood.toLowerCase() ===
                                mood.mood.toLowerCase()
                        );

                        const featuredProduct = moodProducts[0];

                        const isLive = moodProducts.length > 0;

                        return (

                            <div
                                key={mood.slug}
                                className={`group min-h-[390px] rounded-[2rem] border p-8 transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${visual.color}`}
                            >

                                <div className="flex h-full flex-col">

                                    {/* MOOD ICON */}
                                    <div className="text-6xl transition duration-300 group-hover:scale-110">
                                        {visual.emoji}
                                    </div>


                                    <div className="mt-auto pt-8">

                                        {/* MOOD NAME */}
                                        <h2 className="text-3xl font-black tracking-tight">
                                            {mood.mood}
                                        </h2>


                                        {/* MOOD TAGLINE */}
                                        <p className="mt-3 text-sm font-semibold leading-6 text-black/55">
                                            {mood.tagline}
                                        </p>


                                        {/* FEATURED PRODUCT */}
                                        <div className="mt-6 rounded-2xl bg-white/70 p-5">

                                            <p className="text-xs font-black uppercase tracking-wider text-black/40">
                                                {isLive
                                                    ? "Featured"
                                                    : "Coming Soon"}
                                            </p>


                                            {featuredProduct ? (

                                                <>
                                                    <h3 className="mt-2 text-lg font-black">
                                                        {featuredProduct.title}
                                                    </h3>

                                                    <p className="mt-2 text-sm leading-5 text-black/55">
                                                        {featuredProduct.description}
                                                    </p>

                                                    <p className="mt-3 text-lg font-black">
                                                        {featuredProduct.websitePrice ||
                                                            "Coming Soon"}
                                                    </p>

                                                    <Link
                                                        href={`/product/${featuredProduct.slug}`}
                                                        className="mt-5 inline-block text-sm font-black uppercase text-[#e85d3f] hover:underline"
                                                    >
                                                        Shop Now →
                                                    </Link>
                                                </>

                                            ) : (

                                                <>
                                                    <h3 className="mt-2 text-lg font-black">
                                                        {mood.productTitle}
                                                    </h3>

                                                    <p className="mt-2 text-sm leading-5 text-black/55">
                                                        {mood.productCaption}
                                                    </p>

                                                    <span className="mt-5 inline-block text-sm font-black uppercase text-black/40">
                                                        Coming Soon
                                                    </span>
                                                </>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        );
                    })}

                </div>

            </section>


            {/* CTA */}
            <section className="bg-[#241f1b] px-5 py-20 text-center text-white lg:px-8">

                <div className="mx-auto max-w-2xl">

                    <div className="text-5xl">✨</div>

                    <h2 className="mt-5 text-4xl font-black sm:text-5xl">
                        CAN&apos;T PICK A MOOD?
                    </h2>

                    <p className="mt-4 text-white/60">
                        Browse everything and see what catches your eye.
                    </p>

                    <Link
                        href="/shop"
                        className="mt-8 inline-block rounded-full bg-[#e85d3f] px-8 py-4 text-sm font-black uppercase tracking-wide transition hover:bg-[#d94f32]"
                    >
                        Browse Everything →
                    </Link>

                </div>

            </section>


            {/* FOOTER */}
            <footer className="bg-white px-5 py-10 lg:px-8">

                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">

                    <div>

                        <div className="text-xl font-black">
                            MG <span className="text-[#e85d3f]">CREATIONS</span>
                        </div>

                        <p className="mt-1 text-sm text-black/45">
                            Made for your mood.
                        </p>

                    </div>

                    <Link
                        href="/"
                        className="text-sm font-bold hover:text-[#e85d3f]"
                    >
                        ← Back Home
                    </Link>

                </div>

            </footer>

        </main>
    );
}