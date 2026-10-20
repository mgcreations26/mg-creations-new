import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-black/10 bg-white py-12 text-[#241f1b]">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-3">
                    <div>
                        <h3 className="text-2xl font-black">
                            MG <span className="text-[#e85d3f]">CREATIONS</span>
                        </h3>
                        <p className="mt-2 text-sm text-black/60 leading-relaxed">
                            Custom apparel, graphic tees, mugs, totes, and vibrant lifestyle accessories.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-black/40">
                            Quick Links
                        </h4>
                        <ul className="mt-3 space-y-2 text-sm font-bold">
                            <li><Link href="/" className="hover:text-[#e85d3f]">Home</Link></li>
                            <li><Link href="/shop" className="hover:text-[#e85d3f]">Shop Catalog</Link></li>
                            <li><Link href="/categories" className="hover:text-[#e85d3f]">Categories</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-black/40">
                            Official Website
                        </h4>
                        <p className="mt-3 text-sm text-black/60">
                            Visit our official home:
                        </p>
                        <a
                            href="https://mg-creations-new-backend--mg-creations-new.us-central1.hosted.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block font-black text-[#e85d3f] underline hover:opacity-80"
                        >
                            mg-creations.com →
                        </a>
                    </div>
                </div>

                <div className="mt-12 border-t border-black/5 pt-6 text-center text-xs font-bold text-black/40">
                    © {new Date().getFullYear()} MG Creations. All rights reserved.
                </div>
            </div>
        </footer>
    );
}