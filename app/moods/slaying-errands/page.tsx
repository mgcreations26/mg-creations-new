import Link from "next/link";

const products = [
  {
    emoji: "👕",
    name: "Slaying Errands Tee",
    type: "T-Shirt",
    price: "$29.95",
  },
  {
    emoji: "👜",
    name: "Slaying Errands Tote",
    type: "Tote Bag",
    price: "$24.95",
  },
  {
    emoji: "🧢",
    name: "Slaying Errands Hat",
    type: "Hat",
    price: "$27.95",
  },
  {
    emoji: "🥤",
    name: "Slaying Errands Tumbler",
    type: "40 oz Tumbler",
    price: "$34.95",
  },
];

export default function SlayingErrandsPage() {
  return (
    <main className="min-h-screen bg-[#fffaf5] text-[#241f1b]">
      {/* Header */}
      <header className="border-b border-black/5 bg-[#fffaf5]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight sm:text-3xl"
          >
            MG <span className="text-[#e85d3f]">CREATIONS</span>
          </Link>

          <nav className="flex items-center gap-5 text-sm font-semibold sm:gap-8">
            <Link href="/" className="hover:text-[#e85d3f]">
              HOME
            </Link>

            <Link href="/shop" className="hover:text-[#e85d3f]">
              SHOP
            </Link>

            <Link
              href="/moods"
              className="font-black text-[#e85d3f]"
            >
              MOODS
            </Link>

            <button
              aria-label="Shopping cart"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white"
            >
              🛒
            </button>
          </nav>
        </div>
      </header>

      {/* Mood Hero */}
      <section className="relative overflow-hidden bg-orange-100 px-5 py-20 lg:px-8 lg:py-28">
        <div className="absolute -right-20 -top-20 text-[18rem] opacity-10">
          😎
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="text-7xl">😎</div>

          <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-[#e85d3f]">
            Your current mood
          </p>

          <h1 className="mt-3 text-6xl font-black leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
            SLAYING
            <br />
            <span className="text-[#e85d3f]">ERRANDS</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-black/60 sm:text-xl">
            Out in the world getting things done — one Target run, coffee stop,
            and unnecessary purchase at a time.
          </p>
        </div>
      </section>

      {/* Product Collection */}
      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#e85d3f]">
              Shop the mood
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              THE SLAYING ERRANDS COLLECTION
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-black/55">
              Same mood. Pick your favorite way to show it.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.name}
                href="/shop"
                className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex aspect-square items-center justify-center bg-[#f4eee7] text-8xl transition duration-300 group-hover:scale-[1.03]">
                  {product.emoji}
                </div>

                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-black/40">
                    {product.type}
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    {product.name}
                  </h3>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-black">{product.price}</span>

                    <span className="text-sm font-black text-[#e85d3f]">
                      VIEW →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Type CTA */}
      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] bg-[#241f1b] px-6 py-14 text-center text-white sm:px-10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-300">
              How are you wearing it?
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              PICK YOUR PRODUCT
            </h2>

            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {["👕 T-Shirts", "👜 Totes", "🧢 Hats", "🥤 Tumblers"].map(
                (product) => (
                  <Link
                    key={product}
                    href="/shop"
                    className="rounded-2xl border border-white/10 bg-white/10 px-4 py-5 text-sm font-black transition hover:bg-white hover:text-[#241f1b]"
                  >
                    {product}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other Moods */}
      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#e85d3f]">
            Keep exploring
          </p>

          <h2 className="mt-3 text-4xl font-black sm:text-5xl">
            WHAT&apos;S YOUR NEXT MOOD?
          </h2>

          <Link
            href="/moods"
            className="mt-8 inline-block rounded-full bg-[#e85d3f] px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#d94f32]"
          >
            Explore All Moods →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white px-5 py-10 lg:px-8">
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
            href="/moods"
            className="text-sm font-bold hover:text-[#e85d3f]"
          >
            ← Back to Moods
          </Link>
        </div>
      </footer>
    </main>
  );
}