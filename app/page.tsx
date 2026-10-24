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
      {/* â”€â”€ Header â”€â”€ */}


      {/* Hero */}
      <section className="relative overflow-hidden px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        {/* Decorative accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#e85d3f]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#e8c9b5]/30 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Compact brand lockup */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#e85d3f]/15 bg-white/80 px-5 py-3 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e85d3f] text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
                <path d="M19 15l1.1 2.9L23 19l-2.9 1.1L19 23l-1.1-2.9L15 19l2.9-1.1L19 15z" />
              </svg>
            </span>
            <span className="text-lg font-black tracking-tight text-[#241f1b]">
              MG <span className="text-[#e85d3f]">CREATIONS</span>
            </span>
          </div>

          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-[#e85d3f] sm:text-sm">
            Personality in Every Detail
          </p>

          <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Your Style.
            <br />
            <span className="text-[#e85d3f]">Your Story.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-black/60 sm:text-lg sm:leading-8">
            Discover unique finds, personalized gifts, and statement-making
            designs created to celebrate your style and every moment that
            makes it yours.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#e85d3f] px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-[#e85d3f]/20 transition hover:-translate-y-0.5 hover:bg-[#d94f32]"
            >
              Shop the Collection
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-[#241f1b]/15 bg-white/70 px-7 py-4 text-sm font-black uppercase tracking-wide text-[#241f1b] transition hover:border-[#e85d3f] hover:text-[#e85d3f]"
            >
              Explore Our Style
            </Link>
          </div>

          <div className="mx-auto mt-12 flex max-w-xl flex-wrap justify-center gap-x-7 gap-y-3 text-xs font-bold uppercase tracking-wider text-black/45">
            <span>✦ Thoughtful Designs</span>
            <span>✦ Personalized Touches</span>
            <span>✦ Made for You</span>
          </div>
        </div>
      </section>


      {/* â”€â”€ Featured Products â”€â”€ */}
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
                See All â†’
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
                        ðŸ›ï¸
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
                      <span className="text-sm font-bold text-[#e85d3f]">View â†’</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* â”€â”€ Collections Strip â”€â”€ */}
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
                Explore All â†’
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

      {/* Testimonials */}
      <section className="bg-[#fffaf5] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#e85d3f]">
              The MG Creations Experience
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              MADE WITH LOVE.
              <br />
              <span className="text-[#e85d3f]">LOVED BY YOU.</span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-black/55">
              Every creation tells a story. This is where our customers'
              stories will shine.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                category: "Personalized Gifts",
                quote:
                  "[Add a real customer review about a personalized gift here.]",
              },
              {
                category: "Custom Apparel",
                quote:
                  "[Add a real customer review about the design and quality here.]",
              },
              {
                category: "Drinkware & Tumblers",
                quote:
                  "[Add a real customer review about a mug or tumbler here.]",
              },
              {
                category: "Customer Service",
                quote:
                  "[Add a real customer review about their shopping experience here.]",
              },
            ].map((review) => (
              <article
                key={review.category}
                className="flex flex-col rounded-[1.75rem] border border-black/5 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  aria-hidden="true"
                  className="text-3xl font-black text-[#e85d3f]"
                >
                  “
                </span>

                <p className="mt-2 flex-1 text-sm leading-7 text-black/60">
                  {review.quote}
                </p>

                <div className="mt-6 border-t border-black/5 pt-5">
                  <p className="font-black">Customer Name</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#e85d3f]">
                    {review.category}
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-[#fff0e9] px-3 py-1 text-xs font-bold text-[#b7442c]">
                    Placeholder Review
                  </span>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-black/40">
            Sample layout — customer reviews will appear here as they are collected.
          </p>
        </div>
      </section>

      {/* â”€â”€ Footer â”€â”€ */}
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
