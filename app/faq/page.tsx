import Link from "next/link";
import Footer from "@/components/Footer";

export default function FAQPage() {
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
                        <Link href="/faq" className="text-[#c2410c] font-bold">FAQ</Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
                <h1 className="font-serif text-4xl font-bold text-[#c2410c] mb-8 text-center">
                    Frequently Asked Questions
                </h1>

                <div className="space-y-8">
                    <section className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <h2 className="text-xl font-bold mb-4 text-[#c2410c]">General FAQs</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold">What types of crafts do you make?</h3>
                                <p className="text-sm text-slate-600 dark:text-zinc-400 mt-1">
                                    We specialize in custom apparel, graphic tees, mugs, tote bags, and personalized gifts crafted for special moments.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold">How long does it take to create a custom order?</h3>
                                <p className="text-sm text-slate-600 dark:text-zinc-400 mt-1">
                                    Most physical items are made to order. Please allow 2–7 business days for production before shipping.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <h2 className="text-xl font-bold mb-4 text-[#c2410c]">Shipping FAQs</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold">How much does shipping cost?</h3>
                                <p className="text-sm text-slate-600 dark:text-zinc-400 mt-1">
                                    Shipping costs and estimated delivery times are calculated automatically at checkout based on your delivery destination.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold">Can I track my order?</h3>
                                <p className="text-sm text-slate-600 dark:text-zinc-400 mt-1">
                                    Yes! Once your order ships, an email confirmation containing carrier tracking information will be sent directly to you.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <h2 className="text-xl font-bold mb-4 text-[#c2410c]">Payment & Support</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold">What payment methods do you accept?</h3>
                                <p className="text-sm text-slate-600 dark:text-zinc-400 mt-1">
                                    We accept all major credit/debit cards, PayPal, Apple Pay, and Google Pay through secure checkout processing.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}