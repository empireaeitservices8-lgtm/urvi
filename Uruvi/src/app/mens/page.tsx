import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/product/ProductCard";
import Sort from "@/components/shop/Sort";
import Filters from "@/components/shop/Filters";
import { getProductsByCategory } from "@/lib/woocommerce/products";
import { getRootCategories } from "@/lib/woocommerce/categories";
import { MENS_PRODUCTS } from "@/lib/mensData";
import { Sparkles, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Men's Collection | Handcrafted Printed Shirts & Kasavu Mundu Sets | Urvi Designs",
  description:
    "Explore Urvi's exclusive Men's Ethnic Collection featuring hand-block printed cotton shirts, Theyyam art kurtas, and traditional Kerala Kasavu Mundu combo sets.",
};

export default async function MensCollectionPage() {
  let products = await getProductsByCategory(10, 50);
  if (!products || products.length === 0) {
    products = MENS_PRODUCTS;
  }
  let categories: any[] = [];
  try {
    categories = await getRootCategories();
  } catch {}
  
  return (
    <div className="bg-[#FAFAF8] min-h-screen py-8 lg:py-12">
      <div className="container-urvi">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-6">
          <Link href="/" className="hover:text-[#1A1A1A] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#1A1A1A] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Men's Collection</span>
        </div>

        {/* Hero Section Header */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1A1A1A] text-white p-8 md:p-14 mb-12 shadow-xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
            <Image
              src="/images/mens/mens-combo-1.jpg"
              alt="Urvi Menswear Hero"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A84C]/20 border border-[#C9A84C]/40 rounded-full text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles size={14} /> Traditional Heritage & Modern Craft
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              Men's Kasavu & Ethnic Collection
            </h1>
            <p className="text-sm sm:text-base text-[#D4D4D4] leading-relaxed mb-6">
              Experience authentic Kerala handloom Kasavu Mundus paired with handcrafted block-printed shirts and Theyyam folklore art kurtas. Engineered for timeless festive elegance.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-[#E8E4DC]">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-sm">
                ✨ 100% Pure Breathable Cotton & Linen
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-sm">
                🥻 Authentic Woven Golden Zari Kasavu
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-sm">
                📐 Available Sizes: S to 3XL
              </span>
            </div>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 bg-white border border-[#E8E4DC] p-4 rounded-xl shadow-xs">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#E8E4DC] flex items-center justify-center text-[#C9A84C]">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1A1A1A]">Hand-Block Prints</p>
              <p className="text-[11px] text-[#7A7A7A]">Crafted by Master Artisans</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#E8E4DC] flex items-center justify-center text-[#C9A84C]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1A1A1A]">Authentic Kasavu</p>
              <p className="text-[11px] text-[#7A7A7A]">Genuine Kerala Weave</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#E8E4DC] flex items-center justify-center text-[#C9A84C]">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1A1A1A]">Express Shipping</p>
              <p className="text-[11px] text-[#7A7A7A]">Dispatched in 24 Hours</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#E8E4DC] flex items-center justify-center text-[#C9A84C]">
              <RefreshCw size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1A1A1A]">Easy Exchange</p>
              <p className="text-[11px] text-[#7A7A7A]">Hassle-Free Size Swaps</p>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <Suspense fallback={<div className="w-64 h-96 skeleton" />}>
            <Filters currentCategory="mens" categories={categories.map(c => ({ label: c.name, slug: c.slug }))} />
          </Suspense>

          {/* Main Product Grid Area */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8E4DC]">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#1A1A1A]">
                  Men's Combo & Ethnic Sets
                </h2>
                <p className="text-xs text-[#9A9A9A]">
                  Showing {products.length} curated designs
                </p>
              </div>
              <Suspense fallback={null}>
                <Sort />
              </Suspense>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group relative bg-white border border-[#E8E4DC] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Banner Section */}
            <div className="mt-14 p-8 bg-[#F5F3EF] border border-[#E8E4DC] rounded-2xl text-center max-w-3xl mx-auto">
              <span className="text-xs font-semibold tracking-widest text-[#C9A84C] uppercase">Need Custom Sizes or Bulk Gifting?</span>
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-2 mb-3">
                Weddings, Groomsmen & Festive Bulk Orders
              </h3>
              <p className="text-sm text-[#5C5C5C] mb-6 leading-relaxed">
                Looking for matching Kasavu sets for your groomsmen, family functions, or corporate festive gifting? Get customized sizing and personalized embroidery from Urvi Designs.
              </p>
              <a
                href="https://wa.me/919895660061?text=Hi%20Urvi%20Designs,%20I'm%20interested%20in%20Men's%20Kasavu%20Sets"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white font-medium text-xs uppercase tracking-wider rounded-lg hover:bg-[#C9A84C] transition-colors"
              >
                💬 WhatsApp Concierge (+91 98956 60061)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
