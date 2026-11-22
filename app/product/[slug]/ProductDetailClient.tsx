"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Star, Sparkles, ArrowRight } from "lucide-react";
import type { getProducts } from "@/lib/sheets";
import { useCart } from "@/app/context/CartContext";

import Breadcrumb from "@/app/components/ProductDetail/Breadcrumb";
import ImageGallery from "@/app/components/ProductDetail/ImageGallery";
import StyleSelector, {
  getStylePricing,
} from "@/app/components/ProductDetail/StyleSelector";
import ColorSwatches from "@/app/components/ProductDetail/ColorSwatches";
import SizeGrid from "@/app/components/ProductDetail/SizeGrid";
import QuantityStepper from "@/app/components/ProductDetail/QuantityStepper";
import PriceBar from "@/app/components/ProductDetail/PriceBar";
import PromoLine from "@/app/components/ProductDetail/PromoLine";
import AddToCartCTA from "@/app/components/ProductDetail/AddToCartCTA";

type Product = Awaited<ReturnType<typeof getProducts>>[number];

type ProductDetailClientProps = {
  product: Product;
  relatedProducts: Product[];
};

function parseCSVList(value?: string): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
}

function formatPrice(price: number | string): string {
  const numeric =
    typeof price === "number"
      ? price
      : parseFloat(String(price ?? "0").replace(/[^0-9.]/g, "")) || 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numeric);
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  // Derive initial style + price from product data
  const initialPricing = getStylePricing(
    product.productType,
    product.stylePrices
  );

  const [selectedStyle, setSelectedStyle] = useState(
    initialPricing?.style ?? "Standard"
  );
  const [unitPrice, setUnitPrice] = useState(
    initialPricing?.price ?? Number(product.price)
  );
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const colors = parseCSVList(product.color);
    const sizes = parseCSVList(product.size);

    if (colors.length) setSelectedColor(colors[0]);
    if (sizes.length) setSelectedSize(sizes[0]);
  }, [product.color, product.size]);

  const handleStyleChange = (style: string, price: number) => {
    setSelectedStyle(style);
    setUnitPrice(price);
  };

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      selectedColor,
      selectedSize,
      selectedStyle,
      unitPrice
    );
  };

  return (
    <main className="min-h-screen bg-[#fff8f5] text-[#1f1b17]">
      <div className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb product={product} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <section className="lg:col-span-7">
            <ImageGallery
              product={product}
              selectedStyle={selectedStyle}
              selectedColor={selectedColor}
            />

            <div className="flex items-center justify-between text-xs text-[#59413c] px-2 mt-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#a93017]" />
                Handcrafted in White Plains, NY
              </span>
              <span className="text-[#8d716b]">
                Authentic MG Creations Studio Original
              </span>
            </div>
          </section>

          <section className="flex flex-col lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad3]/70 text-[#8b1a02] text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-current text-[#825100]" />
              <span>
                {product.category || product.collection || "Custom Keepsake"}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              {product.title}
            </h1>

            <StyleSelector
              productType={product.productType}
              stylePrices={product.stylePrices}
              selectedStyle={selectedStyle}
              onSelect={handleStyleChange}
            />

            <ColorSwatches
              colors={parseCSVList(product.color)}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />

            <SizeGrid
              sizes={parseCSVList(product.size)}
              selected={selectedSize}
              onSelect={setSelectedSize}
            />

            <QuantityStepper quantity={quantity} setQuantity={setQuantity} />

            <PriceBar unitPrice={unitPrice} quantity={quantity} />

            <PromoLine />
            <AddToCartCTA onAdd={handleAddToCart} />

            {product.description && (
              <div className="mt-6 border-t border-[#e0bfb8]/50 pt-6 text-sm leading-7 text-[#59413c] whitespace-pre-line">
                {product.description}
              </div>
            )}
          </section>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-24 border-t border-[#e0bfb8]/40 pt-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#a93017]">
                  Curated Pairings
                </span>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#1f1b17]">
                  You May Also Love
                </h2>
              </div>

              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#a93017] hover:text-[#cb482c] transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/product/${item.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col border border-[#e0bfb8]/40"
                >
                  <div className="aspect-square overflow-hidden bg-[#f7ece5]">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center font-serif text-3xl text-[#a93017]/30 h-full">
                        MG
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                    <h3 className="line-clamp-1 font-serif text-sm font-bold text-[#1f1b17] group-hover:text-[#a93017] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-bold text-sm text-[#a93017]">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
