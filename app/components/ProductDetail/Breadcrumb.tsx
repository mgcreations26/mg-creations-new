import Link from 'next/link';
import { Product } from '@/lib/sheets';

interface BreadcrumbProps {
  product: Product;
}

export default function Breadcrumb({ product }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8d716b]">
      <Link href="/" className="hover:text-[#a93017] transition-colors">Home</Link>
      <span>/</span>
      <Link href="/shop" className="hover:text-[#a93017] transition-colors">Shop</Link>
      {product.category && (
        <>
          <span>/</span>
          <Link href={`/categories`} className="hover:text-[#a93017] transition-colors">
            {product.category}
          </Link>
        </>
      )}
      <span>/</span>
      <span className="truncate text-[#1f1b17] font-bold">{product.title}</span>
    </nav>
  );
}
