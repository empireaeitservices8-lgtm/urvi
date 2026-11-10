import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getProductsByCategory, getProducts } from "@/lib/woocommerce/products";
import { ArrowRight, Sparkles } from "lucide-react";
import { ACFHomePage } from "@/lib/wordpress/pages";

interface MensSectionProps {
  acf?: ACFHomePage | null;
}

export default async function MensSection({ acf }: MensSectionProps) {
  let products: any[] = [];
  try {
    const { getCategoryBySlug } = await import("@/lib/woocommerce/categories");
    const mensCategory = await getCategoryBySlug("mens");
    if (mensCategory) {
      products = await getProductsByCategory(mensCategory.id, 4);
    }
    
    // Fallback: If 'mens' category doesn't exist or has no products, just show recent products
    if (!products || products.length === 0) {
      const res = await getProducts({ perPage: 4 });
      products = res.products || [];
    }
  } catch {}

  const sectionLabel = acf?.mens_section_label || "New Launch";
  const sectionTitle = acf?.mens_section_title || "Urvi Men — Kasavu & Ethnic Combos";
  const sectionSubtitle = acf?.mens_section_subtitle || "Discover our exclusive men's ethnic edit featuring hand-block printed cotton shirts, Theyyam artwork, and traditional Kerala Kasavu Mundus.";

  return (
    <section className="section-py bg-[#FAFAF8] relative overflow-hidden border-t border-[#E8E4DC]">
      <div className="container-urvi">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
              <Sparkles size={14} /> {sectionLabel}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              {sectionTitle}
            </h2>
            <p className="text-sm text-[#5C5C5C] mt-2 max-w-xl">
              {sectionSubtitle}
            </p>
          </div>
          <Link
            href="/shop/mens"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#C9A84C] transition-colors pb-1 border-b border-[#1A1A1A] hover:border-[#C9A84C] self-start md:self-auto"
          >
            Explore Men's Edit <ArrowRight size={14} />
          </Link>
        </div>

        {/* Featured Showcase Grid */}
        {/* Product Cards Grid */}
        {products && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#E8E4DC] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
