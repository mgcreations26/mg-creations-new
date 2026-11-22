import Image from "next/image";
import { Product } from "@/lib/sheets";

interface ImageGalleryProps {
  product: Product;
  selectedStyle?: string;
  selectedColor?: string;
}

export default function ImageGallery({
  product,
  selectedStyle,
  selectedColor,
}: ImageGalleryProps) {
  const src = product.imageUrl || "";
  const alt = product.title;

  return (
    <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#fdf2eb] border-2 border-white shadow-sm">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1023px) 100vw, 58vw"
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center font-serif text-5xl text-[#a93017]/30">
          MG
        </div>
      )}
    </div>
  );
}
