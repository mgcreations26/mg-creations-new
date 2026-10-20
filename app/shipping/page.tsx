import Link from "next/link";
import Footer from "@/components/Footer";

export default function ShippingPage() {
    return (
        <div className="bg-[#fdfbf7] dark:bg-[#1a1a1a] text-slate-800 dark:text-slate-100 font-sans min-h-screen flex flex-col">
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-orange-100 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                    <Link href="/" className="font-serif text-3xl text-[#c2410c] font-bold">
                        MG Creations
                    </Link>
                    <div className="flex gap-6 text-sm font-medium uppercase tracking-wider">
                        <Link href="/" className="hover:text-[#c2410c]">Home</Link>
                        <Link href="/shop" className="hover:text-[#c2410c]">Shop</Link>
                        <Link href="/shipping" className="text-[#c2410c] font-bold">Shipping</Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-6">
                <h1 className="font-serif text-4xl font-bold text-[#c2410c] mb-8 text-center">
                    Shipping & Delivery Policy
                </h1>

                <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg border border-slate-200 dark:border-zinc-800 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                    <p>
                        <strong className="text-slate-800 dark:text-slate-200">Processing Time:</strong> Most physical items are made to order. Please allow 2–7 business days for production before shipment. Digital products are delivered instantly after payment confirmation.
                    </p>
                    <p>
                        <strong className="text-slate-800 dark:text-slate-200">Shipping & Delivery:</strong> Shipping rates and estimated delivery windows are calculated at checkout. Delivery times may vary depending on carrier transit times or weather/holiday delays beyond our control.
                    </p>
                    <p>
                        <strong className="text-slate-800 dark:text-slate-200">Order Changes & Cancellations:</strong> Orders may be changed or canceled within 12 hours of purchase. Once an item enters active production or a digital file is delivered, cancellations can no longer be processed.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}