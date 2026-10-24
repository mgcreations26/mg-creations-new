
export default function ReturnsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#fdfbf7] font-sans text-slate-800 dark:bg-[#1a1a1a] dark:text-slate-100">
            <main className="mx-auto w-full max-w-4xl flex-1 space-y-6 px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-center font-serif text-4xl font-bold text-[#c2410c]">
                    Return &amp; Refund Policy
                </h1>

                <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-8 text-sm leading-relaxed text-slate-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                    <section>
                        <h2 className="mb-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                            1. Return Window &amp; Eligibility
                        </h2>
                        <p>
                            You have 14 days from the date of package delivery
                            to request a return or exchange. Items must be
                            unused, unworn, unwashed, and in original packaging.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                            2. Non-Returnable Items
                        </h2>
                        <p>
                            Due to custom print-on-demand production,
                            custom/personalized orders, digital downloads,
                            and final sale items cannot be returned unless
                            they arrive defective or damaged.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                            3. Restocking &amp; Shipping Fees
                        </h2>
                        <p>
                            We charge $0 restocking fees. Customers cover
                            return shipping unless the item arrived damaged,
                            defective, or incorrect.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
