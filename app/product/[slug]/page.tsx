import Link from "next/link";
import { getProducts, formatPrice } from "@/lib/sheets";
import { notFound } from "next/navigation";
import AddToCartButton from "../AddToCartButton";

type ProductPageProps = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug ?? "";

  if (!rawSlug) {
    notFound();
  }

  const targetSlug = rawSlug.toLowerCase().trim();
  const products = await getProducts();

  // Match by exact generated slug or product ID
  const product = products.find((p) => {
    const slugMatch = p.slug.toLowerCase().trim() === targetSlug;
    const idMatch = p.productId.toLowerCase().trim() === targetSlug;
    return slugMatch || idMatch;
  });

  if (!product) {
    notFound();
  }

  // Parse color and size options from comma-separated string fields
  const colors = product.color
    ? product.color.split(",").map((c) => c.trim()).filter(Boolean)
    : [];

  const sizes = product.size
    ? product.size.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-[#fffaf5] text-[#241f1b]">
      {/* ── HEADER ── */}
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

      {/* ── BREADCRUMB & PRODUCT DETAIL ── */}
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black/50">
          <Link href="/shop" className="hover:text-[#e85d3f]">Shop</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-[#e85d3f]">{product.category || "General"}</Link>
          <span>/</span>
          <span className="text-black">{product.title}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* PRODUCT IMAGE GALLERY */}
          <div className="overflow-hidden rounded-[2.5rem] bg-white p-4 shadow-sm border border-black/5">
            <div className="aspect-square w-full overflow-hidden rounded-[2rem] bg-[#f3eee8]">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-6xl opacity-20">
                  🛍️
                </div>
              )}
            </div>
          </div>

          {/* PRODUCT INFO & OPTIONS */}
          <div className="flex flex-col justify-center">
            {product.collection && (
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e85d3f]">
                {product.collection}
              </p>
            )}

            <h1 className="mt-2 text-4xl font-black sm:text-5xl tracking-tight">
              {product.title}
            </h1>

            <p className="mt-4 text-3xl font-black text-[#241f1b]">
              {formatPrice(product.price)}
            </p>

            {/* DESCRIPTION */}
            {product.description && (
              <div className="mt-6 border-t border-black/10 pt-6">
                <h2 className="text-xs font-black uppercase tracking-wider text-black/50">
                  Description
                </h2>
                <p className="mt-2 text-base leading-relaxed text-black/70 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* COLOR VARIANTS */}
            {colors.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xs font-black uppercase tracking-wider text-black/50">
                  Available Colors
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <span
                      key={color}
                      className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold shadow-sm"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SIZE VARIANTS */}
            {sizes.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xs font-black uppercase tracking-wider text-black/50">
                  Available Sizes
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <span
                      key={size}
                      className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold shadow-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}


            {/* PURCHASE BUTTON */}
            <div className="mt-8 border-t border-black/10 pt-6">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
