import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FASHION_IMAGES } from "@/lib/utils";
import { getRootCategories } from "@/lib/woocommerce/categories";

export default async function CollectionsPage() {
  let categories: any[] = [];
  try {
    categories = await getRootCategories();
  } catch {}

  const allProductsCollection = {
    title: "All Products",
    slug: "all-products",
    href: "/shop",
    desc: "Explore our complete catalog of contemporary Indian clothing.",
    image: FASHION_IMAGES.editorial,
    count: "All",
  };

  const dynamicCollections = categories.map((c, i) => ({
    title: c.name,
    slug: c.slug,
    href: `/shop/${c.slug}`,
    desc: `Explore our exclusively curated ${c.name.toLowerCase()} edit.`,
    image: Object.values(FASHION_IMAGES)[i % Object.values(FASHION_IMAGES).length],
    count: c.count || 0,
  }));

  const displayCollections = [allProductsCollection, ...dynamicCollections];

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="container-urvi">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-6">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Collections</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Curated Edits</span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4">
            Collections
          </h1>
          <p className="text-sm text-[#5C5C5C] leading-relaxed">
            Discover thoughtfully curated edits designed around moments, celebrations, and daily elegance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCollections.map((col) => (
            <Link
              key={col.slug}
              href={col.href}
              className="group block bg-[#F5F3EF] overflow-hidden border border-[#E8E4DC] hover:border-[#C9A84C] transition-colors"
            >
              <div className="relative aspect-collection overflow-hidden">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-4 right-4 bg-[#1A1A1A]/80 text-white text-[10px] uppercase font-semibold px-2.5 py-1">
                  {col.count} Styles
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] group-hover:text-[#C9A84C] transition-colors mb-2">
                  {col.title}
                </h3>
                <p className="text-sm text-[#5C5C5C] leading-relaxed mb-4">
                  {col.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] group-hover:text-[#C9A84C]">
                  Explore Edit <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
