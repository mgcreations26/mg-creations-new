import Link from "next/link";

export default function CheckoutCancelPage() {
    return (
        <main className="mx-auto max-w-2xl px-6 py-24 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#e85d3f]">
                MG Creations
            </p>

            <h1 className="mt-4 text-4xl font-black">
                Checkout canceled
            </h1>

            <p className="mt-6 text-gray-600">
                No order was confirmed through this checkout attempt.
                You can return to the shop and try again.
            </p>

            <Link
                href="/shop"
                className="mt-8 inline-block rounded-full bg-[#e85d3f] px-8 py-4 font-bold text-white hover:bg-[#d94f32]"
            >
                Return to Shop
            </Link>
        </main>
    );
}