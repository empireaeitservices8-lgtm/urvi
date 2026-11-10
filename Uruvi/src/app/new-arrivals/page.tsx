import { Suspense } from "react";
import Link from "next/link";
import { getNewArrivals } from "@/lib/woocommerce/products";
import ProductCard from "@/components/product/ProductCard";
import Sort from "@/components/shop/Sort";
import { FASHION_IMAGES } from "@/lib/utils";
import type { WooProduct } from "@/lib/woocommerce/types";

const PLACEHOLDER_NEW = Array.from({ length: 8 }, (_, i) => ({
  id: i + 300,
  name: ["Festive Velvet Anarkali", "Pure Organza Printed Saree", "Minimalist Cotton Co-ord", "Embroidered Tunic Dress"][i % 4],
  slug: `new-arrival-${i}`,
  price: ["3999", "4599", "2999", "2499"][i % 4],
  regular_price: ["3999", "4599", "2999", "2499"][i % 4],
  sale_price: "",
  on_sale: false,
  images: [{ id: i, src: Object.values(FASHION_IMAGES)[i % Object.values(FASHION_IMAGES).length], name: "", alt: "" }],
  stock_status: "instock",
  rating_count: 0,
  average_rating: "0",
  type: "simple",
  categories: [],
  attributes: [],
  variations: [],
  related_ids: [],
  tags: [],
  meta_data: [],
  description: "",
  short_description: "",
} as unknown as WooProduct));

export default async function NewArrivalsPage() {
  let products: WooProduct[] = [];
  try {
    products = await getNewArrivals(12);
  } catch {}

  const display = products.length > 0 ? products : PLACEHOLDER_NEW;

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="container-urvi">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-6">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">New Arrivals</span>
        </div>

        {/* Hero Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-label">Fresh Off The Loom</span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4">
            New Arrivals
          </h1>
          <p className="text-sm text-[#5C5C5C] leading-relaxed">
            Fresh silhouettes, refined details, and effortless style. Discover the latest handcrafted creations from Urvi Designs.
          </p>
        </div>

        {/* Header bar */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#E8E4DC]">
          <p className="text-xs text-[#9A9A9A] uppercase tracking-wider">
            Showing {display.length} new styles
          </p>
          <Suspense fallback={null}>
            <Sort />
          </Suspense>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {display.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
