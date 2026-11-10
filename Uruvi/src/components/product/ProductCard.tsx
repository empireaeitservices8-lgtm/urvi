"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, getDiscountPercentage, cn } from "@/lib/utils";
import type { WooProduct } from "@/lib/woocommerce/types";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: WooProduct;
  className?: string;
  priority?: boolean;
}

export default function ProductCard({ product, className, priority }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hoverImgError, setHoverImgError] = useState(false);

  const { addItem } = useCart();

  const mainImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0];
  const discount = getDiscountPercentage(product.regular_price, product.sale_price);
  const isOutOfStock = product.stock_status === "outofstock";

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.type === "variable") {
      window.location.href = `/products/${product.slug}`;
      return;
    }

    setAddingToCart(true);
    try {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price || product.regular_price,
        regularPrice: product.regular_price,
        quantity: 1,
        image: product.images[0]?.src || "",
      });
      toast.success("Added to bag!");
    } catch {
      toast.error("Could not add to bag");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div
      className={cn("group relative", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image container */}
        <div className="product-card-image aspect-product relative bg-[#F5F3EF]">
          {/* Main image */}
          {mainImage && !imgError ? (
            <Image
              src={mainImage.src}
              alt={mainImage.alt || product.name}
              fill
              className={cn(
                "object-cover transition-opacity duration-500",
                hovered && hoverImage && hoverImage.src !== mainImage.src && !hoverImgError ? "opacity-0" : "opacity-100"
              )}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-[#EDE9E0] flex flex-col items-center justify-center p-4 text-center">
              <span className="text-3xl mb-1">👗</span>
              <span className="font-serif text-xs text-[#5C5C5C] font-medium">{product.name}</span>
            </div>
          )}

          {/* Hover image */}
          {hoverImage && hoverImage.src !== mainImage?.src && !hoverImgError && (
            <Image
              src={hoverImage.src}
              alt={hoverImage.alt || product.name}
              fill
              className={cn(
                "object-cover transition-opacity duration-500 absolute inset-0",
                hovered && !imgError ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={() => setHoverImgError(true)}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {isOutOfStock && <span className="badge badge-out">Sold Out</span>}
            {!isOutOfStock && product.on_sale && discount > 0 && (
              <span className="badge badge-sale">-{discount}%</span>
            )}
          </div>

          {/* Actions overlay */}
          <div className={cn(
            "absolute inset-0 flex items-end justify-center pb-4 gap-2 transition-opacity duration-300",
            hovered ? "opacity-100" : "opacity-0"
          )}>
            {/* Quick add to cart */}
            {!isOutOfStock && (
              <button
                onClick={handleQuickAdd}
                disabled={addingToCart}
                className="flex items-center gap-2 bg-[#1A1A1A] text-white text-xs font-medium uppercase tracking-wider px-4 py-2.5 hover:bg-[#C9A84C] transition-colors disabled:opacity-70"
                aria-label="Quick add to cart"
              >
                <ShoppingBag size={14} />
                {addingToCart ? "Adding..." : product.type === "variable" ? "Select Options" : "Add to Bag"}
              </button>
            )}
            {isOutOfStock && (
              <span className="bg-[#9A9A9A] text-white text-xs font-medium uppercase tracking-wider px-4 py-2.5">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Product info */}
        <div className="pt-3 pb-1">
          <h3 className="text-sm font-medium text-[#1A1A1A] mb-1 line-clamp-2 leading-snug group-hover:text-[#C9A84C] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            {product.on_sale && product.sale_price ? (
              <>
                <span className="text-sm font-semibold text-[#C0392B]">{formatPrice(product.sale_price)}</span>
                <span className="text-xs text-[#9A9A9A] line-through">{formatPrice(product.regular_price)}</span>
              </>
            ) : (
              <span className="text-sm font-medium text-[#1A1A1A]">{formatPrice(product.price || product.regular_price)}</span>
            )}
          </div>

          {/* Rating */}
          {product.rating_count > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={cn("text-xs", parseFloat(product.average_rating) >= star ? "text-[#C9A84C]" : "text-[#E8E4DC]")}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-[#9A9A9A]">({product.rating_count})</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

// Skeleton version
export function ProductCardSkeleton() {
  return (
    <div>
      <div className="aspect-product skeleton" />
      <div className="pt-3 space-y-2">
        <div className="h-3.5 skeleton rounded" />
        <div className="h-3.5 skeleton w-2/3 rounded" />
        <div className="h-3 skeleton w-1/3 rounded" />
      </div>
    </div>
  );
}
