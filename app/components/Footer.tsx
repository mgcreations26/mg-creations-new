import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#e0bfb8]/40 bg-[#fdf2eb] py-16 text-[#1f1b17] transition-colors duration-200">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* BRAND COLUMN */}
          <div className="col-span-1">
            <Link href="/" className="inline-block group mb-4">
              <span className="font-serif text-2xl text-[#a93017] font-bold group-hover:text-[#cb482c] transition-colors">
                MG Creations
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#59413c]">
                Handmade & Personalized
              </p>
            </Link>
            <p className="text-sm text-[#59413c] leading-relaxed mb-6">
              Thoughtfully handcrafted bespoke gifts, engraved keepsakes, vibrant apparel, and custom treasures designed with love.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a93017] uppercase tracking-wider bg-[#ffdad3]/60 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Crafted for You, Hand-Finished in Austin</span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest mb-6 text-[#1f1b17]">
              Navigation
            </h5>
            <ul className="space-y-3 text-sm text-[#59413c] font-medium">
              <li>
                <Link href="/" className="hover:text-[#a93017] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#a93017] transition-colors">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[#a93017] transition-colors">
                  Product Categories
                </Link>
              </li>
              <li>
                <Link href="/themes" className="hover:text-[#a93017] transition-colors">
                  Curated Themes
                </Link>
              </li>
              <li>
                <Link href="/moods" className="hover:text-[#a93017] transition-colors">
                  Moods & Aesthetics
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT COLUMN */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest mb-6 text-[#1f1b17]">
              Customer Care
            </h5>
            <ul className="space-y-3 text-sm text-[#59413c] font-medium">
              <li>
                <Link href="/faq" className="hover:text-[#a93017] transition-colors">
                  FAQ & Proofing
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#a93017] transition-colors">
                  Shipping & Handling
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#a93017] transition-colors">
                  Returns & Guarantee
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#a93017] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* OFFICIAL STORE & PROMISE */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest mb-6 text-[#1f1b17]">
              Our Studio
            </h5>
            <p className="text-sm text-[#59413c] mb-4">
              Need a bespoke bulk order or custom design proof? Get in touch with our creative studio team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#a93017] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#cb482c] transition-all"
            >
              <span>Request Custom Proof</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-16 pt-8 border-t border-[#e0bfb8]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#59413c] font-medium">
          <p>© {new Date().getFullYear()} MG Creations. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-[#a93017] fill-current" /> for craft & design enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
}
