import Link from "next/link";
import { getProducts, getCategories, getThemes, formatPrice } from "@/lib/sheets";
import { Sparkles, ArrowRight, Star, ShieldCheck, Heart, PackageCheck, Zap } from "lucide-react";

export default async function HomePage() {
  const [products, categories, themes] = await Promise.all([
    getProducts(),
    getCategories(),
    getThemes(),
  ]);

  // Featured / fresh products dynamically from Google Sheets
  const freshProducts = products.filter((p) => p.freshDrop || p.trending).slice(0, 8);
  const displayProducts = freshProducts.length > 0 ? freshProducts : products.slice(0, 8);

  // Take top categories & themes for bento displays
  const curatedThemes = themes.slice(0, 5);
  const curatedCategories = categories.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#fff8f5] text-[#1f1b17]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#fdf2eb] pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-[#e0bfb8]/40">
        {/* Ambient atmospheric orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#a93017]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -right-32 h-[30rem] w-[30rem] rounded-full bg-[#ffddb8]/40 blur-3xl"
        />

        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left: Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-[#ffdad3]/70 text-[#8b1a02] text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-4 h-4 text-[#a93017]" />
                <span>Bespoke Keepsakes & Studio Originals</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[#1f1b17]">
                Handcrafted Wonder. <br />
                <span className="text-[#a93017] italic font-semibold">Personalized</span> Just for You.
              </h1>

              <p className="text-base sm:text-lg text-[#59413c] max-w-xl leading-relaxed">
                Artisanal bespoke gifts, laser-engraved keepsakes, custom stationery, and handcrafted lifestyle treasures designed to celebrate life's most unforgettable moments.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/shop"
                  className="px-8 py-4 rounded-full bg-[#a93017] text-white text-sm font-bold uppercase tracking-wider shadow-[0_12px_32px_-8px_rgba(169,48,23,0.35)] hover:bg-[#cb482c] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>Shop Fresh Drops</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/themes"
                  className="px-8 py-4 rounded-full bg-[#f7ece5] text-[#1f1b17] text-sm font-bold uppercase tracking-wider shadow-sm hover:bg-[#f1e6df] border border-[#e0bfb8]/60 transition-all"
                >
                  Explore Occasions
                </Link>
              </div>

              {/* Trust Badges Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#e0bfb8]/40">
                <div className="flex items-center gap-2 text-[#1f1b17]">
                  <Star className="w-4 h-4 text-[#825100] fill-current" />
                  <span className="text-xs font-bold">4.9/5 Craft Loved</span>
                </div>
                <div className="flex items-center gap-2 text-[#1f1b17]">
                  <ShieldCheck className="w-4 h-4 text-[#a93017]" />
                  <span className="text-xs font-bold">Custom Proofing</span>
                </div>
                <div className="flex items-center gap-2 text-[#1f1b17]">
                  <PackageCheck className="w-4 h-4 text-[#a93017]" />
                  <span className="text-xs font-bold">Zero-Waste Packaging</span>
                </div>
                <div className="flex items-center gap-2 text-[#1f1b17]">
                  <Zap className="w-4 h-4 text-[#a93017]" />
                  <span className="text-xs font-bold">Ships in 48-72 hrs</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_48px_-12px_rgba(31,27,23,0.18)] bg-[#f7ece5] border-2 border-white">
                <img
                  src={
                    displayProducts[0]?.imageUrl ||
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuB3wPwD32KF_1FIxTISD9NkuUq6-D4fsoakB_DLIsrAdi8mUrLX0boll_tWe1uyVSrwcRlqwL9OFiMW8nyvRStRdq_ULHtEVpoobVZH71O58cfmNyrrH9GwqIXGHPmnPxn9Sb7oNWFUg16T51QbwLX0GfXjmFotLUvPnYyYESn1gU01-tk4atOB9HhJ0y5UOs1-ov43zNQSdf7ahTecCnn-on22kG1jOyO15rMRcGU8"
                  }
                  alt="MG Creations Handcrafted Studio Item"
                  className="w-full h-full object-cover"
                />

                {/* Studio Pill */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-between border border-[#e0bfb8]/40">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a93017] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#a93017]"></span>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1f1b17]">
                        Studio Workbench Active
                      </span>
                      <span className="text-[11px] text-[#59413c]">
                        Handcrafted in Austin, TX
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#a93017] uppercase tracking-wider bg-[#ffdad3]/60 px-2.5 py-1 rounded-full">
                    Artisanal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPS / CRAFT PROMISES */}
      <section className="w-full py-16 bg-[#fff8f5]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#fdf2eb] rounded-2xl p-6 flex flex-col gap-3 border border-[#e0bfb8]/40 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#a93017]/10 text-[#a93017] flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1f1b17]">
                Hand-Finished with Care
              </h3>
              <p className="text-xs sm:text-sm text-[#59413c] leading-relaxed">
                Every item is rigorously inspected, finished by hand, and sealed with organic, non-toxic materials.
              </p>
            </div>

            <div className="bg-[#fdf2eb] rounded-2xl p-6 flex flex-col gap-3 border border-[#e0bfb8]/40 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#a93017]/10 text-[#a93017] flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1f1b17]">
                Free Proofing & Preview
              </h3>
              <p className="text-xs sm:text-sm text-[#59413c] leading-relaxed">
                Confirm your custom names, dates, quotes, and layouts so you can order with absolute confidence.
              </p>
            </div>

            <div className="bg-[#fdf2eb] rounded-2xl p-6 flex flex-col gap-3 border border-[#e0bfb8]/40 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#a93017]/10 text-[#a93017] flex items-center justify-center font-bold">
                <PackageCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1f1b17]">
                Plastic-Free Packaging
              </h3>
              <p className="text-xs sm:text-sm text-[#59413c] leading-relaxed">
                Boutique heirloom unboxing wrapped in recycled kraft, botanical pressed twine, and wax stamps.
              </p>
            </div>

            <div className="bg-[#fdf2eb] rounded-2xl p-6 flex flex-col gap-3 border border-[#e0bfb8]/40 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#a93017]/10 text-[#a93017] flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1f1b17]">
                Prompt Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-[#59413c] leading-relaxed">
                Made-to-order craft items dispatched swiftly in 48-72 hours with reliable tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FRESH DROPS (DYNAMIC GOOGLE SHEETS PRODUCTS) */}
      <section className="w-full py-16 bg-[#fdf2eb] border-y border-[#e0bfb8]/40" id="fresh-drops">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase font-bold tracking-widest text-[#a93017]">
                ✨ Just Off The Workbench
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1f1b17]">
                Fresh Drops & Popular Originals
              </h2>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a93017] hover:text-[#cb482c] transition-colors group"
            >
              <span>View All ({products.length}) Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product, idx) => (
              <div
                key={`${product.productId}-${product.slug}-${idx}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col border border-[#e0bfb8]/40"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square bg-[#f7ece5] overflow-hidden">
                  <Link href={`/product/${product.slug}`} className="block w-full h-full">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-serif text-4xl text-[#a93017]/30">
                        MG
                      </div>
                    )}
                  </Link>

                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-[#a43c22] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {product.bestSeller
                      ? "Best Seller"
                      : product.freshDrop
                      ? "New Drop"
                      : "Bespoke"}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs text-[#59413c]">
                      <span>{product.category || product.collection || "Artisan"}</span>
                      <span className="flex items-center text-[#825100] font-semibold gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" /> 5.0
                      </span>
                    </div>

                    <Link
                      href={`/product/${product.slug}`}
                      className="font-serif text-base font-bold text-[#1f1b17] hover:text-[#a93017] transition-colors line-clamp-1"
                    >
                      {product.title}
                    </Link>

                    <p className="text-xs text-[#59413c] line-clamp-1">
                      {product.description || "Handcrafted with personal care"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#e0bfb8]/30">
                    <span className="font-bold text-lg text-[#1f1b17]">
                      {formatPrice(product.price)}
                    </span>

                    <Link
                      href={`/product/${product.slug}`}
                      className="px-3.5 py-1.5 rounded-full bg-[#a93017] text-white text-xs font-bold hover:bg-[#cb482c] transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Customize</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CURATED THEMES / OCCASIONS MOSAIC */}
      {curatedThemes.length > 0 && (
        <section className="w-full py-20 bg-[#fff8f5]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
            <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto">
              <span className="text-xs uppercase font-bold tracking-widest text-[#a93017]">
                Heartfelt Collections
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1f1b17]">
                Shop by Theme & Celebration
              </h2>
              <p className="text-sm text-[#59413c]">
                Find thoughtful, made-to-order treasures tailor-made for weddings, milestones, gifts, and home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {curatedThemes.map((theme, idx) => {
                const colSpan = idx === 0 ? "md:col-span-7 h-80" : idx === 1 ? "md:col-span-5 h-80" : "md:col-span-4 h-72";
                return (
                  <Link
                    key={theme.slug}
                    href={`/shop?theme=${encodeURIComponent(theme.name)}`}
                    className={`${colSpan} group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#e0bfb8]/40`}
                  >
                    {theme.imageUrl ? (
                      <img
                        src={theme.imageUrl}
                        alt={theme.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#f7ece5] flex items-center justify-center font-serif text-2xl text-[#a93017]/40">
                        {theme.name}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1f1b17]/85 via-[#1f1b17]/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                      <div>
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider mb-2 inline-block">
                          Featured Theme
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold">
                          {theme.name}
                        </h3>
                        <p className="text-xs text-white/80 line-clamp-1 max-w-xs">
                          {theme.description || "Explore customized pieces"}
                        </p>
                      </div>
                      <span className="w-10 h-10 rounded-full bg-white text-[#1f1b17] flex items-center justify-center group-hover:bg-[#a93017] group-hover:text-white transition-colors shrink-0 shadow-sm">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. CRAFT CATEGORIES */}
      {curatedCategories.length > 0 && (
        <section className="w-full py-16 bg-[#fdf2eb] border-t border-[#e0bfb8]/40">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase font-bold tracking-widest text-[#a93017]">
                  Categories
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1f1b17]">
                  Explore by Category
                </h2>
              </div>
              <Link
                href="/categories"
                className="text-xs font-bold uppercase tracking-wider text-[#a93017] hover:text-[#cb482c] transition-colors"
              >
                All Categories →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {curatedCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="bg-white p-5 rounded-2xl flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group border border-[#e0bfb8]/40"
                >
                  <div className="w-16 h-16 rounded-full bg-[#fdf2eb] text-[#a93017] flex items-center justify-center group-hover:bg-[#a93017] group-hover:text-white transition-colors overflow-hidden">
                    {category.imageUrl ? (
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Sparkles className="w-7 h-7" />
                    )}
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#1f1b17] group-hover:text-[#a93017] transition-colors line-clamp-1">
                    {category.name}
                  </h3>
                  <span className="text-[11px] text-[#59413c]">
                    Explore Pieces
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
