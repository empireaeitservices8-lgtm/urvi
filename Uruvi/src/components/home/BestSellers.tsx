import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBestSellingProducts } from "@/lib/woocommerce/products";
import ProductCard from "@/components/product/ProductCard";
import type { WooProduct } from "@/lib/woocommerce/types";
import { ACFHomePage } from "@/lib/wordpress/pages";

interface BestSellersProps {
  acf?: ACFHomePage | null;
}

export default async function BestSellers({ acf }: BestSellersProps) {
  let products: WooProduct[] = [];
  try {
    products = await getBestSellingProducts(4);
  } catch {}

  if (!products || products.length === 0) return null;

  const label = acf?.bestsellers_label || "Favourites";
  const title = acf?.bestsellers_title || "Most Loved";
  const subtitle = acf?.bestsellers_subtitle || "Pieces our customers keep coming back for.";

  return (
    <section className="section-py bg-[#F5F3EF]">
      <div className="container-urvi">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="section-label">{label}</span>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold text-[#1A1A1A]">
              {title}
            </h2>
            <p className="text-sm text-[#9A9A9A] mt-1">{subtitle}</p>
          </div>
          <Link href="/shop?sort=popularity" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#1A1A1A] hover:text-[#C9A84C] transition-colors">
            Shop All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
