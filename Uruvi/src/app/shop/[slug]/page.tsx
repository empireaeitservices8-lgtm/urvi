import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategory, getProducts } from "@/lib/woocommerce/products";
import { getCategoryBySlug, CATEGORY_MAP, getRootCategories } from "@/lib/woocommerce/categories";
import ProductCard from "@/components/product/ProductCard";
import Filters from "@/components/shop/Filters";
import Sort from "@/components/shop/Sort";
import { FASHION_IMAGES } from "@/lib/utils";
import type { WooProduct, WooCategory } from "@/lib/woocommerce/types";

const PLACEHOLDER_PRODUCTS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 50,
  name: [
    "Designer Printed Kurta",
    "Cotton Silk Saree",
    "Festive Co-ord Set",
    "Embroidered Dress",
    "Casual Tunic Top",
    "Palazzo Bottom Wear",
    "Handloom Cotton Saree",
    "Anarkali Suit Set",
  ][i % 8],
  slug: `category-item-${i}`,
  price: ["2499", "3999", "3299", "4999", "1899", "1499", "4299", "5999"][i % 8],
  regular_price: ["2999", "3999", "3999", "4999", "1899", "1499", "4299", "6499"][i % 8],
  sale_price: i % 2 === 0 ? ["2499", "3999", "3299", "4999"][i % 4] : "",
  on_sale: i % 2 === 0,
  images: [{ id: i, src: Object.values(FASHION_IMAGES)[i % Object.values(FASHION_IMAGES).length], name: "", alt: "" }],
  stock_status: "instock",
  rating_count: 5,
  average_rating: "4.8",
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

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryInfo = CATEGORY_MAP[slug] || { label: slug.replace(/-/g, " ").toUpperCase() };

  let products: WooProduct[] = [];
  let categories: WooCategory[] = [];
  try {
    const [cat, cats] = await Promise.all([
      getCategoryBySlug(slug),
      getRootCategories()
    ]);
    categories = cats;
    if (cat) {
      products = await getProductsByCategory(cat.id, 12);
    }
  } catch {}

  const displayProducts = products.length > 0 ? products : PLACEHOLDER_PRODUCTS;

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-8 lg:py-12">
      <div className="container-urvi">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-6">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#1A1A1A]">Shop</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium capitalize">{categoryInfo.label}</span>
        </div>

        {/* Banner */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="section-label">Category</span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-3 capitalize">
            {categoryInfo.label}
          </h1>
          <p className="text-sm text-[#5C5C5C] leading-relaxed">
            Discover our curated collection of {categoryInfo.label.toLowerCase()} — handcrafted with premium fabrics and modern silhouettes.
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          <Suspense fallback={<div className="w-64 h-96 skeleton" />}>
            <Filters currentCategory={slug} categories={categories.map(c => ({ label: c.name, slug: c.slug }))} />
          </Suspense>

          <div className="flex-1">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8E4DC]">
              <p className="text-xs text-[#9A9A9A] uppercase tracking-wider">
                Showing {displayProducts.length} items
              </p>
              <Suspense fallback={null}>
                <Sort />
              </Suspense>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
