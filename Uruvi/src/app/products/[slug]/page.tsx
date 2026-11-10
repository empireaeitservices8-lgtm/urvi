import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/lib/woocommerce/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";
import { FASHION_IMAGES } from "@/lib/utils";
import type { WooProduct } from "@/lib/woocommerce/types";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const PLACEHOLDER_SINGLE_PRODUCT: WooProduct = {
  id: 999,
  name: "Handcrafted Silk Anarkali Kurta Set",
  slug: "handcrafted-silk-anarkali-kurta-set",
  permalink: "",
  type: "simple",
  status: "publish",
  featured: true,
  catalog_visibility: "visible",
  description: "<p>Elevate your festive look with this handcrafted silk Anarkali kurta set. Features delicate metallic embroidery along the neckline, paired with tailored cigarette pants and a matching sheer organza dupatta.</p>",
  short_description: "Handcrafted silk Anarkali kurta set with metallic zari detailing.",
  sku: "URV-ANK-001",
  price: "4499",
  regular_price: "5499",
  sale_price: "4499",
  on_sale: true,
  purchasable: true,
  total_sales: 42,
  virtual: false,
  downloadable: false,
  manage_stock: true,
  stock_quantity: 15,
  stock_status: "instock",
  backorders: "no",
  backorders_allowed: false,
  backordered: false,
  weight: "0.8",
  categories: [{ id: 1, name: "Kurta Sets", slug: "kurta-sets" }],
  tags: [{ id: 1, name: "Festive", slug: "festive" }],
  images: [
    { id: 1, src: FASHION_IMAGES.product1, name: "", alt: "Main view" },
    { id: 2, src: FASHION_IMAGES.product2, name: "", alt: "Detail view" },
    { id: 3, src: FASHION_IMAGES.product3, name: "", alt: "Fabric view" },
    { id: 4, src: FASHION_IMAGES.product4, name: "", alt: "Back view" },
  ],
  attributes: [
    { id: 1, name: "Size", position: 0, visible: true, variation: true, options: ["XS", "S", "M", "L", "XL", "XXL"] },
    { id: 2, name: "Color", position: 1, visible: true, variation: true, options: ["Royal Gold", "Midnight Black", "Emerald"] },
  ],
  variations: [],
  average_rating: "4.9",
  rating_count: 14,
  related_ids: [1, 2, 3, 4],
  meta_data: [],
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  let product: WooProduct | null = null;
  try {
    product = await getProductBySlug(slug);
  } catch {}

  const p = product || {
    ...PLACEHOLDER_SINGLE_PRODUCT,
    name: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    slug,
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-8 lg:py-12">
      <div className="container-urvi">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-8">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#1A1A1A]">Shop</Link>
          <span>/</span>
          {p.categories?.[0] && (
            <>
              <Link href={`/shop/${p.categories[0].slug}`} className="hover:text-[#1A1A1A]">
                {p.categories[0].name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#1A1A1A] font-medium truncate max-w-[200px]">{p.name}</span>
        </div>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <ProductGallery images={p.images} productName={p.name} />
          <ProductInfo product={p} />
        </div>

        {/* Related Products */}
        <RelatedProducts productId={p.id} />
      </div>
    </div>
  );
}
