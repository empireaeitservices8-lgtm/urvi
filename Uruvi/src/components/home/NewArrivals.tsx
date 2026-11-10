import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getNewArrivals } from "@/lib/woocommerce/products";
import ProductCard from "@/components/product/ProductCard";
import type { WooProduct } from "@/lib/woocommerce/types";
import { ACFHomePage } from "@/lib/wordpress/pages";

interface NewArrivalsProps {
  products?: WooProduct[];
  acf?: ACFHomePage | null;
}

export default async function NewArrivals({ products, acf }: NewArrivalsProps) {
  let items = products;
  if (!items) {
    try {
      items = await getNewArrivals(8);
    } catch {
      items = [];
    }
  }
  
  if (!items || items.length === 0) return null;

  const label = acf?.new_arrivals_label || "Just Arrived";
  const title = acf?.new_arrivals_title || "New Arrivals";
  const subtitle = acf?.new_arrivals_subtitle || "Fresh silhouettes, refined details.";

  return (
    <section className="section-py bg-[#FAFAF8]">
      <div className="container-urvi">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="section-label">{label}</span>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold text-[#1A1A1A]">
              {title}
            </h2>
            <p className="text-sm text-[#9A9A9A] mt-1">{subtitle}</p>
          </div>
          <Link href="/new-arrivals" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#1A1A1A] hover:text-[#C9A84C] transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {items.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-10 text-center sm:hidden">
          <Link href="/new-arrivals" className="btn btn-outline">
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
