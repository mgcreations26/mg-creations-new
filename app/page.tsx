import Link from "next/link";
import { getProducts, getCollections, formatPrice } from "@/lib/sheets";

export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ]);

  const featuredProducts = products.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#fffaf5] text-[#241f1b]">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fffaf5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Link href="/" className="text-2xl font-black tracking-tight sm:text-3xl">
            MG <span className="text-[#e85d3f]">CREATIONS</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-bold">
            <Link href="/" className="hover:text-[#e85d3f]">HOME</Link>
            <Link href="/shop" className="hover:text-[#e85d3f]">SHOP</Link>
            <Link href="/categories" className="hover:text-[#e85d3f]">CATEGORIES</Link>
            <button
              aria-label="Shopping cart"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white hover:border-[#e85d3f]"
            >
              🛒
            </button>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="px-5 py-24 text-center lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-[#e85d3f]">
            Curated Collections & Custom Pieces
          </p>

          <h1 className="text-7xl font-black leading-[0.9] tracking-[-0.04em] sm:text-8xl lg:text-9xl">
            MG
            <br />
            <span className="text-[#e85d3f]">CREATIONS</span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-xl leading-8 text-black/55">
            Explore curated collections crafted for every season, style, and moment.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-[#e85d3f] px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#d94f32]"
            >
              Shop All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      {featuredProducts.length > 0 && (
        <section className="px-5 pb-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#e85d3f]">
                  Fresh Drops
                </p>
                <h2 className="mt-2 text-4xl font-black sm:text-5xl">
                  FEATURED
                </h2>
              </div>

              <Link
                href="/shop"
                className="text-sm font-black uppercase hover:text-[#e85d3f]"
              >
                See All →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product, idx) => (
                <Link
                  key={`${product.productId}-${product.slug}-${idx}`}
                  href={`/product/${product.slug}`}
                  className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-square overflow-hidden bg-[#f3eee8]">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl opacity-20">
                        🛍️
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-black uppercase tracking-wider text-[#e85d3f]">
                      {product.collection || product.category}
                    </p>
                    <h3 className="mt-2 text-lg font-black">{product.title}</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-bold text-lg">{formatPrice(product.price)}</span>
                      <span className="text-sm font-bold text-[#e85d3f]">View →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Collections Strip ── */}
      {collections.length > 0 && (
        <section className="bg-[#241f1b] px-5 py-20 text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#e85d3f]">
                  Browse By Line
                </p>
                <h2 className="mt-2 text-4xl font-black sm:text-5xl">
                  COLLECTIONS
                </h2>
              </div>

              <Link
                href="/shop"
                className="text-sm font-black uppercase text-white/60 hover:text-white"
              >
                Explore All →
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {collections.map((col) => (
                <Link
                  key={col}
                  href={`/shop?collection=${encodeURIComponent(col)}`}
                  className="rounded-full border border-white/15 px-5 py-3 text-sm font-black transition hover:border-[#e85d3f] hover:text-[#e85d3f]"
                >
                  {col}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="bg-white px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="text-xl font-black">
              MG <span className="text-[#e85d3f]">CREATIONS</span>
            </div>
            <p className="mt-1 text-sm text-black/45">Curated with intent.</p>
          </div>

          <nav className="flex gap-6 text-sm font-bold text-black/50">
            <Link href="/shop" className="hover:text-[#e85d3f]">
              Shop
            </Link>
            <Link href="/categories" className="hover:text-[#e85d3f]">
              Categories
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}