import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-orange-100 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-950 py-16 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* BRAND COLUMN */}
                    <div className="col-span-1">
                        <h3 className="font-serif text-2xl text-[#c2410c] font-bold mb-4">
                            MG Creations
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed mb-6">
                            Unique custom apparel, graphic tees, mugs, totes, and vibrant lifestyle accessories designed with love.
                        </p>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Crafted for You, Designed by Us
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h5 className="text-xs font-bold uppercase tracking-widest mb-6 dark:text-white text-slate-900">
                            Navigation
                        </h5>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-zinc-400 font-medium">
                            <li>
                                <Link href="/" className="hover:text-[#c2410c] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:text-[#c2410c] transition-colors">
                                    Shop All
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="hover:text-[#c2410c] transition-colors">
                                    Categories
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* SUPPORT COLUMN */}
                    <div>
                        <h5 className="text-xs font-bold uppercase tracking-widest mb-6 dark:text-white text-slate-900">
                            Support
                        </h5>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-zinc-400 font-medium">
                            <li>
                                <Link href="/faq" className="hover:text-[#c2410c] transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="hover:text-[#c2410c] transition-colors">
                                    Shipping Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="hover:text-[#c2410c] transition-colors">
                                    Returns & Refunds
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#c2410c] transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* NEWSLETTER / OFFICIAL LINK */}
                    <div>
                        <h5 className="text-xs font-bold uppercase tracking-widest mb-6 dark:text-white text-slate-900">
                            Official Store
                        </h5>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-4">
                            Visit our live storefront:
                        </p>
                        <a
                            href="https://mg-creations-new-backend--mg-creations-new.us-central1.hosted.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block font-bold text-[#c2410c] underline hover:opacity-80 text-sm"
                        >
                            mg-creations.com â†’
                        </a>
                    </div>
                </div>

                {/* COPYRIGHT */}
                <div className="mt-16 pt-8 border-t border-slate-200 dark:border-zinc-800 text-center text-xs text-slate-400 uppercase tracking-widest font-bold">
                    Â© {new Date().getFullYear()} MG Creations. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
