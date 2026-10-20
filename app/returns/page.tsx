import Link from "next/link";
import Footer from "@/components/Footer";

export default function ReturnsPage() {
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
                        <Link href="/returns" className="text-[#c2410c] font-bold">Returns</Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-6">
                <h1 className="font-serif text-4xl font-bold text-[#c2410c] mb-8 text-center">
                    Return & Refund Policy
                </h1>

                <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg border border-slate-200 dark:border-zinc-800 space-y-6 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">1. Return Window & Eligibility</h2>
                        <p>You have 14 days from the date of package delivery to request a return or exchange. Items must be unused, unworn, unwashed, and in original packaging.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">2. Non-Returnable Items</h2>
                        <p>Due to custom print-on-demand production, custom/personalized orders, digital downloads, and final sale items cannot be returned unless they arrive defective or damaged.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">3. Restocking & Shipping Fees</h2>
                        <p>We charge $0 restocking fees. Customers cover return shipping unless the item arrived damaged, defective, or incorrect.</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}