import { Suspense } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/woocommerce/products";
import { getRootCategories } from "@/lib/woocommerce/categories";
import ProductCard from "@/components/product/ProductCard";
import Filters from "@/components/shop/Filters";
import Sort from "@/components/shop/Sort";
import { FASHION_IMAGES } from "@/lib/utils";
import type { WooProduct, WooCategory } from "@/lib/woocommerce/types";

const PRODUCT_IMAGE_LIST = [
  FASHION_IMAGES.product1,
  FASHION_IMAGES.product2,
  FASHION_IMAGES.product3,
  FASHION_IMAGES.product4,
  FASHION_IMAGES.product5,
  FASHION_IMAGES.product6,
  FASHION_IMAGES.product7,
  FASHION_IMAGES.product8,
];

const PLACEHOLDER_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: [
    "Handloom Silk Kurta Set",
    "Chanderi Cotton Saree",
    "Floral Printed Co-ord Set",
    "Embroidered Anarkali Dress",
    "Zari Work Cotton Kurta",
    "Block Print Mulmul Saree",
    "Designer Linen Tunic",
    "Celebration Lehenga Set",
    "Festive Georgette Kurta",
    "Handwoven Tussar Silk Saree",
    "Casual Cotton Palazzo Set",
    "Contemporary Peplum Top",
  ][i % 12],
  slug: `shop-item-${i}`,
  price: ["2999", "4599", "3299", "5499", "2499", "3999", "1999", "8999", "3499", "6499", "2299", "1799"][i % 12],
  regular_price: ["3499", "4599", "3999", "5499", "2999", "3999", "1999", "9999", "3499", "6499", "2299", "1799"][i % 12],
  sale_price: i % 3 === 0 ? ["2999", "4599", "3299", "5499"][i % 4] : "",
  on_sale: i % 3 === 0,
  images: [
    { id: i, src: PRODUCT_IMAGE_LIST[i % PRODUCT_IMAGE_LIST.length], name: "", alt: "" },
    { id: i + 100, src: PRODUCT_IMAGE_LIST[(i + 1) % PRODUCT_IMAGE_LIST.length], name: "", alt: "" }
  ],
  stock_status: "instock",
  rating_count: [12, 5, 20, 8, 15, 3, 9, 14, 7, 11, 4, 18][i % 12],
  average_rating: ["4.8", "4.5", "4.9", "4.7", "4.6", "4.4", "4.5", "4.9", "4.8", "4.6", "4.3", "4.7"][i % 12],
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

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page, 10) : 1;
  const sort = typeof params.sort === "string" ? params.sort : "menu_order";
  const category = typeof params.category === "string" ? params.category : undefined;

  let products: WooProduct[] = [];
  let categories: WooCategory[] = [];
  let totalPages = 1;

  try {
    const [res, cats] = await Promise.all([
      getProducts({ page, perPage: 12, category }),
      getRootCategories()
    ]);
    products = res.products;
    totalPages = res.totalPages || 1;
    categories = cats;
  } catch {}

  const displayProducts = products.length > 0 ? products : PLACEHOLDER_PRODUCTS;

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-8 lg:py-12">
      <div className="container-urvi">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-6">
          <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Shop</span>
        </div>

        {/* Banner */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="section-label">All Collections</span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-3">
            Shop All Products
          </h1>
          <p className="text-sm text-[#5C5C5C] leading-relaxed">
            Explore our full catalog of contemporary Indian clothing — thoughtfully designed for grace, comfort, and timeless beauty.
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <Suspense fallback={<div className="w-64 h-96 skeleton" />}>
            <Filters categories={categories.map(c => ({ label: c.name, slug: c.slug }))} />
          </Suspense>

          {/* Main Product Grid Area */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8E4DC]">
              <p className="text-xs text-[#9A9A9A] uppercase tracking-wider">
                Showing {displayProducts.length} items
              </p>
              <Suspense fallback={null}>
                <Sort />
              </Suspense>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <Link
                    key={i}
                    href={`/shop?page=${i + 1}&sort=${sort}`}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-medium border ${
                      page === i + 1
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : "border-[#E8E4DC] text-[#5C5C5C] hover:border-[#1A1A1A]"
                    }`}
                  >
                    {i + 1}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
