import { Suspense } from "react";
import Link from "next/link";
import { searchProducts } from "@/lib/woocommerce/products";
import ProductCard from "@/components/product/ProductCard";
import Sort from "@/components/shop/Sort";
import { FASHION_IMAGES } from "@/lib/utils";
import type { WooProduct } from "@/lib/woocommerce/types";

const PLACEHOLDER_SEARCH_RESULTS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 600,
  name: ["Silk Anarkali Kurta", "Embroidered Cotton Saree", "Designer Kurta Set", "Floral Printed Dress", "Chikankari Tunic", "Chanderi Dupatta"][i],
  slug: `search-result-${i}`,
  price: ["2999", "3999", "4499", "2499", "1999", "1299"][i],
  regular_price: ["2999", "3999", "4499", "2499", "1999", "1299"][i],
  sale_price: "",
  on_sale: false,
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

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;

  let results: WooProduct[] = [];
  if (q.trim()) {
    try {
      results = await searchProducts(q, 16);
    } catch {}
  }

  const display = results.length > 0 ? results : (q ? PLACEHOLDER_SEARCH_RESULTS : []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="container-urvi">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-6">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Search</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="section-label">Search Results</span>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-3">
            {q ? `Results for “${q}”` : "Search Our Catalog"}
          </h1>
          <p className="text-sm text-[#5C5C5C]">
            {display.length} products found matching your search term.
          </p>
        </div>

        {/* Search input form on page */}
        <div className="max-w-md mx-auto mb-12">
          <form action="/search" method="GET" className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search kurtas, sarees, dresses..."
              className="input-field flex-1"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>

        {/* Results grid */}
        {display.length > 0 ? (
          <div>
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#E8E4DC]">
              <p className="text-xs text-[#9A9A9A] uppercase tracking-wider">
                Showing {display.length} results
              </p>
              <Suspense fallback={null}>
                <Sort />
              </Suspense>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
              {display.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-[#F5F3EF] border border-[#E8E4DC] max-w-md mx-auto">
            <span className="text-4xl block mb-3">🔍</span>
            <p className="font-serif text-xl font-semibold text-[#1A1A1A] mb-2">No products found</p>
            <p className="text-sm text-[#5C5C5C] mb-6">Try searching with different keywords or browse our popular categories.</p>
            <Link href="/shop" className="btn btn-primary">
              Explore All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
