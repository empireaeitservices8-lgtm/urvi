import { Suspense } from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import Sort from "@/components/shop/Sort";
import { getNewArrivals } from "@/lib/woocommerce/products";
import { FASHION_IMAGES } from "@/lib/utils";
import type { WooProduct } from "@/lib/woocommerce/types";

const PLACEHOLDER_COLLECTION_PRODUCTS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 400,
  name: [
    "Signature Embroidered Kurta",
    "Handloom Mulberry Silk Saree",
    "Layered Festive Anarkali",
    "Silk Dupatta & Tunic Set",
    "Chanderi Tissue Saree",
    "Hand-block Printed Co-ord",
    "Contrast Embroidered Dress",
    "Festive Georgette Kurta",
  ][i % 8],
  slug: `collection-item-${i}`,
  price: ["3499", "5999", "4999", "3899", "6499", "2999", "3299", "4299"][i % 8],
  regular_price: ["3499", "5999", "4999", "3899", "6499", "2999", "3299", "4299"][i % 8],
  sale_price: "",
  on_sale: false,
  images: [{ id: i, src: Object.values(FASHION_IMAGES)[i % Object.values(FASHION_IMAGES).length], name: "", alt: "" }],
  stock_status: "instock",
  rating_count: 8,
  average_rating: "4.9",
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

interface CollectionSlugPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionSlugPage({ params }: CollectionSlugPageProps) {
  const { slug } = await params;
  const formattedTitle = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  let products: WooProduct[] = [];
  try {
    products = await getNewArrivals(8);
  } catch {}

  const display = products.length > 0 ? products : PLACEHOLDER_COLLECTION_PRODUCTS;

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="container-urvi">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-6">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-[#1A1A1A]">Collections</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium capitalize">{formattedTitle}</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-label">Collection</span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-3 capitalize">
            {formattedTitle} Collection
          </h1>
          <p className="text-sm text-[#5C5C5C] leading-relaxed">
            Discover pieces from our {formattedTitle.toLowerCase()} edit — designed with refined craftsmanship and modern elegance.
          </p>
        </div>

        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#E8E4DC]">
          <p className="text-xs text-[#9A9A9A] uppercase tracking-wider">
            Showing {display.length} items
          </p>
          <Suspense fallback={null}>
            <Sort />
          </Suspense>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {display.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
