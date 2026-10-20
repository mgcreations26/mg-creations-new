import Link from "next/link";
import { getProducts, formatPrice } from "@/lib/sheets";
import AddToCartButton from "./AddToCartButton";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) notFound();

  return (
    <main className="flex min-h-screen flex-col bg-[#fffaf5] text-[#241f1b]">
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

      <section className="mx-auto flex-1 max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* PRODUCT IMAGE */}
          <div className="aspect-square overflow-hidden rounded-[2.5rem] bg-[#f3eee8] border border-black/5 shadow-sm">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-black uppercase tracking-widest text-[#e85d3f]">
              {product.category} • {product.brand}
            </p>
            <h1 className="mt-2 text-4xl font-black uppercase sm:text-5xl">
              {product.title}
            </h1>
            <p className="mt-4 text-3xl font-black text-[#e85d3f]">
              {formatPrice(product.price)}
            </p>

            {/* DESCRIPTION */}
            <p className="mt-6 text-base leading-relaxed text-black/70">
              {product.description ||
                `Crafted with high-quality materials for everyday durability and style. Express yourself with MG Creations' signature custom line.`}
            </p>

            {/* PRODUCT TYPE & COLOR SPECIFICATIONS */}
            <div className="mt-8 space-y-4 rounded-2xl bg-white p-6 border border-black/5 shadow-sm">
              {product.productType && (
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-black/40">
                    Product Type
                  </span>
                  <p className="text-base font-bold text-black">{product.productType}</p>
                </div>
              )}
              {product.color && (
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-black/40">
                    Available Colors / Options
                  </span>
                  <p className="text-base font-bold text-[#e85d3f]">{product.color}</p>
                </div>
              )}
            </div>

            {/* ADD TO CART & CHECKOUT */}
            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}