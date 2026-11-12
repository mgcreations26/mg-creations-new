import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, formatPrice } from "@/lib/sheets";
import AddToCartButton from "./AddToCartButton";
import { Star, ShieldCheck, Sparkles, PackageCheck, Zap, ArrowRight } from "lucide-react";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts();

  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  const relatedProducts = products
    .filter(
      (item) =>
        item.slug !== product.slug &&
        (
          (product.category && item.category === product.category) ||
          (product.theme && item.theme === product.theme)
        )
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#fff8f5] text-[#1f1b17]">
      <div className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8d716b]"
        >
          <Link href="/" className="hover:text-[#a93017] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#a93017] transition-colors">
            Shop
          </Link>
          {product.category && (
            <>
              <span>/</span>
              <Link
                href={`/categories`}
                className="hover:text-[#a93017] transition-colors"
              >
                {product.category}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="truncate text-[#1f1b17] font-bold">
            {product.title}
          </span>
        </nav>

        {/* Main product layout */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Product image section */}
          <section className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#fdf2eb] border-2 border-white shadow-sm">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center font-serif text-5xl text-[#a93017]/30">
                  MG
                </div>
              )}

              {product.bestSeller && (
                <span className="absolute left-4 top-4 rounded-full bg-[#a43c22] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                  Best Seller
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#59413c] px-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#a93017]" /> Handcrafted in Austin, TX
              </span>
              <span className="text-[#8d716b]">Authentic MG Creations Studio Original</span>
            </div>
          </section>

          {/* Product details section */}
          <section className="flex flex-col lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad3]/70 text-[#8b1a02] text-xs font-bold uppercase tracking-wider mb-3">
                <Star className="w-3.5 h-3.5 fill-current text-[#825100]" />
                <span>{product.category || product.collection || "Custom Keepsake"}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1f1b17] leading-tight">
                {product.title}
              </h1>

              <div className="mt-4 flex items-center justify-between border-b border-[#e0bfb8]/40 pb-6">
                <div>
                  <p className="text-3xl font-bold tracking-tight text-[#a93017]">
                    {formatPrice(product.price)}
                  </p>
                  <p className="mt-1 text-xs text-[#59413c]">
                    Taxes and personalized packaging calculated at checkout.
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[#825100] text-sm font-bold bg-[#fdf2eb] px-3 py-1.5 rounded-full border border-[#e0bfb8]/40">
                  <Star className="w-4 h-4 fill-current" />
                  <span>5.0 (Review Verified)</span>
                </div>
              </div>
            </div>

            {/* Product description & options */}
            <div className="space-y-4 py-6 border-b border-[#e0bfb8]/40">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1f1b17]">
                About this Piece
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-[#59413c] whitespace-pre-line">
                {product.description ||
                  "Handcrafted with personal care, laser-precise detailing, and premium materials."}
              </p>

              {product.productType && (
                <div className="pt-2">
                  <span className="text-xs font-semibold text-[#8d716b]">Medium / Type: </span>
                  <span className="text-xs font-bold text-[#1f1b17]">{product.productType}</span>
                </div>
              )}
            </div>

            {/* Shopping Cart button */}
            <div className="mt-2">
              <AddToCartButton product={product} />
            </div>

            {/* Value Ribbons */}
            <div className="mt-6 grid grid-cols-2 gap-3 pt-4">
              <div className="flex items-center gap-2 rounded-2xl bg-[#fdf2eb] p-3 text-xs font-bold text-[#1f1b17] border border-[#e0bfb8]/40">
                <ShieldCheck className="w-4 h-4 text-[#a93017]" />
                <span>Proof Before Dispatch</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-[#fdf2eb] p-3 text-xs font-bold text-[#1f1b17] border border-[#e0bfb8]/40">
                <Zap className="w-4 h-4 text-[#a93017]" />
                <span>Ships in 48-72 Hours</span>
              </div>
            </div>
          </section>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 border-t border-[#e0bfb8]/40 pt-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#a93017]">
                  Curated Pairings
                </span>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#1f1b17]">
                  You May Also Love
                </h2>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#a93017] hover:text-[#cb482c] transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/product/${item.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col border border-[#e0bfb8]/40"
                >
                  <div className="aspect-square overflow-hidden bg-[#f7ece5]">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-serif text-3xl text-[#a93017]/30">
                        MG
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                    <h3 className="line-clamp-1 font-serif text-sm font-bold text-[#1f1b17] group-hover:text-[#a93017] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-bold text-sm text-[#a93017]">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
