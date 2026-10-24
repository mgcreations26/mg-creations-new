
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, formatPrice } from "@/lib/sheets";
import AddToCartButton from "./AddToCartButton";

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
          (product.category &&
            item.category === product.category) ||
          (product.theme && item.theme === product.theme)
        )
    )
    .slice(0, 4);

  const colors = product.color
    ? product.color.split(",").map((value) => value.trim()).filter(Boolean)
    : [];

  const sizes = product.size
    ? product.size.split(",").map((value) => value.trim()).filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-[#fdfbf7] text-slate-800">
      {/* Product page content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400"
        >
          <Link href="/" className="transition-colors hover:text-[#c2410c]">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/categories"
            className="transition-colors hover:text-[#c2410c]"
          >
            Shop
          </Link>
          {product.category && (
            <>
              <span>/</span>
              <span>{product.category}</span>
            </>
          )}
          <span>/</span>
          <span className="max-w-[220px] truncate text-slate-600">
            {product.title}
          </span>
        </nav>

        {/* Main product layout */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Product image */}
          <section className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[88px_minmax(0,1fr)]">
              {/* A thumbnail strip is omitted until real additional images exist. */}
              <div className="hidden sm:block">
                <div className="aspect-square overflow-hidden rounded-md border-2 border-[#c2410c] bg-[#f3eee8]">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={`${product.title} thumbnail`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-2 text-center text-xs text-slate-400">
                      Image coming soon
                    </div>
                  )}
                </div>
              </div>

              <div className="group relative aspect-square overflow-hidden rounded-lg bg-[#f3eee8]">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400">
                    <span className="text-5xl" aria-hidden="true">
                      ✦
                    </span>
                    <p className="text-sm">Product image coming soon</p>
                  </div>
                )}

                {product.trending && (
                  <span className="absolute left-4 top-4 rounded-sm bg-[#4a5d4e] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                    Trending
                  </span>
                )}
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-slate-400 sm:text-left">
              Designed with care by MG Creations
            </p>
          </section>

          {/* Product details */}
          <section className="flex flex-col lg:col-span-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4a5d4e]">
                {product.category || product.productType || "MG Creations"}
                {product.brand ? ` · ${product.brand}` : ""}
              </p>

              <h1 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl lg:text-[2.7rem]">
                {product.title}
              </h1>

              <div className="mt-5 border-b border-orange-100 pb-6">
                <p className="text-3xl font-bold tracking-tight text-[#c2410c]">
                  {formatPrice(product.price)}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Price shown before any applicable shipping or taxes.
                </p>
              </div>
            </div>

            <div className="space-y-6 border-b border-orange-100 py-6">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-800">
                  About this product
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {product.description ||
                    "Made with care for everyday style by MG Creations."}
                </p>
              </div>

              {product.productType && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    Product type
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-800">
                    {product.productType}
                  </p>
                </div>
              )}

              {colors.length > 0 && (
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-800">
                    Available colors / options
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <span
                        key={color}
                        className="rounded-sm border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {sizes.length > 0 && (
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-800">
                    Available sizes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <span
                        key={size}
                        className="min-w-11 rounded-sm border border-slate-200 bg-white px-3 py-2 text-center text-sm text-slate-700"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.theme && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    Collection
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    {product.theme}
                  </p>
                </div>
              )}
            </div>

            {/* Keep the existing cart integration */}
            <div className="mt-6">
              <AddToCartButton product={product} />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                <span className="text-lg text-[#c2410c]" aria-hidden="true">
                  ♧
                </span>
                Thoughtfully designed
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                <span className="text-lg text-[#c2410c]" aria-hidden="true">
                  ✓
                </span>
                Secure checkout
              </div>
            </div>
          </section>
        </div>

        {/* Description section */}
        <section className="mt-20 border-t border-orange-100 pt-8">
          <div className="mb-8 border-b border-orange-100 pb-5">
            <h2 className="font-serif text-2xl text-slate-900">
              Product Details
            </h2>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-400">
              The details that make it yours
            </p>
          </div>

          <div className="max-w-3xl">
            <h3 className="font-serif text-xl text-slate-800">
              Made for your everyday moments
            </h3>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
              {product.description ||
                "Discover thoughtful design and a personal touch with MG Creations."}
            </p>

            <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              {product.productType && (
                <p>
                  <span className="mr-2 text-[#c2410c]">✦</span>
                  {product.productType}
                </p>
              )}
              {product.category && (
                <p>
                  <span className="mr-2 text-[#c2410c]">✦</span>
                  Category: {product.category}
                </p>
              )}
              {product.brand && (
                <p>
                  <span className="mr-2 text-[#c2410c]">✦</span>
                  Brand: {product.brand}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Related products from the existing product feed */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4a5d4e]">
                  Discover more
                </p>
                <h2 className="mt-2 font-serif text-3xl text-slate-900">
                  You May Also Like
                </h2>
              </div>
              <Link
                href="/categories"
                className="shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-[#c2410c] hover:underline"
              >
                Shop all
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/product/${item.slug}`}
                  className="group min-w-0"
                >
                  <div className="aspect-square overflow-hidden rounded-md bg-[#f3eee8]">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-400">
                        Image coming soon
                      </div>
                    )}
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-sm font-bold uppercase tracking-wide text-slate-800 transition-colors group-hover:text-[#c2410c]">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-bold text-[#c2410c]">
                    {formatPrice(item.price)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
