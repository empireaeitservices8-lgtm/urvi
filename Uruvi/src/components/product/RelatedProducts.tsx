import ProductCard from "./ProductCard";
import { getRelatedProducts } from "@/lib/woocommerce/products";
import type { WooProduct } from "@/lib/woocommerce/types";
import { FASHION_IMAGES } from "@/lib/utils";

const PLACEHOLDER_RELATED = Array.from({ length: 4 }, (_, i) => ({
  id: i + 200,
  name: ["Block-printed Chanderi Kurta", "Zari Embroidered Dupatta", "Silk Blend Saree", "Designer Palazzo Set"][i],
  slug: `related-${i}`,
  price: ["2799", "1899", "4599", "3199"][i],
  regular_price: ["2799", "1899", "4599", "3199"][i],
  sale_price: "",
  on_sale: false,
  images: [{ id: i, src: Object.values(FASHION_IMAGES).slice(2, 6)[i], name: "", alt: "" }],
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

interface RelatedProductsProps {
  productId: number;
}

export default async function RelatedProducts({ productId }: RelatedProductsProps) {
  let products: WooProduct[] = [];
  try {
    products = await getRelatedProducts(productId, 4);
  } catch {}
  const display = products.length > 0 ? products : PLACEHOLDER_RELATED;

  return (
    <section className="mt-20 pt-16 border-t border-[#E8E4DC]">
      <div className="section-header">
        <span className="section-label">Recommendations</span>
        <h2 className="section-title">You May Also Like</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {display.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
