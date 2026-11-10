"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Truck, RotateCcw, ShieldCheck, Plus, Minus, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, getDiscountPercentage, cn } from "@/lib/utils";
import type { WooProduct } from "@/lib/woocommerce/types";
import toast from "react-hot-toast";

interface ProductInfoProps {
  product: WooProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [openTab, setOpenTab] = useState<string | null>("description");

  const isOutOfStock = product.stock_status === "outofstock";
  const discount = getDiscountPercentage(product.regular_price, product.sale_price);

  // Extract size/color attributes
  const sizeAttr = product.attributes?.find((a) => a.name.toLowerCase() === "size");
  const colorAttr = product.attributes?.find((a) => a.name.toLowerCase() === "color");

  const handleAddToCart = () => {
    if (sizeAttr && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const attrs = [];
    if (selectedSize) attrs.push({ name: "Size", value: selectedSize });
    if (selectedColor) attrs.push({ name: "Color", value: selectedColor });

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price || product.regular_price,
      regularPrice: product.regular_price,
      quantity,
      image: product.images[0]?.src || "",
      attributes: attrs,
    });
    toast.success("Added to bag!");
  };

  const handleBuyNow = () => {
    if (sizeAttr && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="space-y-6">
      {/* Category breadcrumb hint */}
      {product.categories?.[0] && (
        <span className="text-[0.625rem] font-semibold tracking-[0.16em] uppercase text-[#C9A84C]">
          {product.categories[0].name}
        </span>
      )}

      {/* Title */}
      <h1 className="font-serif text-3xl lg:text-4xl text-[#1A1A1A] font-semibold leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      {product.rating_count > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex text-[#C9A84C] text-sm">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>{parseFloat(product.average_rating) >= star ? "★" : "☆"}</span>
            ))}
          </div>
          <span className="text-xs text-[#9A9A9A]">({product.rating_count} reviews)</span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3 pb-4 border-b border-[#E8E4DC]">
        {product.on_sale && product.sale_price ? (
          <>
            <span className="font-serif text-3xl font-bold text-[#C0392B]">
              {formatPrice(product.sale_price)}
            </span>
            <span className="text-base text-[#9A9A9A] line-through">
              {formatPrice(product.regular_price)}
            </span>
            {discount > 0 && (
              <span className="badge badge-sale">Save {discount}%</span>
            )}
          </>
        ) : (
          <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
            {formatPrice(product.price || product.regular_price || 2999)}
          </span>
        )}
        <span className="text-xs text-[#9A9A9A]">Inclusive of all taxes</span>
      </div>

      {/* Short Description */}
      {product.short_description && (
        <div
          className="text-sm text-[#5C5C5C] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product.short_description }}
        />
      )}

      {/* Color Selector */}
      {colorAttr && (
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-3">
            Color: <span className="text-[#C9A84C] font-normal">{selectedColor || "Select"}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {colorAttr.options.map((clr) => (
              <button
                key={clr}
                onClick={() => setSelectedColor(clr)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium border transition-all",
                  selectedColor === clr
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "border-[#E8E4DC] text-[#5C5C5C] hover:border-[#1A1A1A]"
                )}
              >
                {clr}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selector */}
      {sizeAttr && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
              Size: <span className="text-[#C9A84C] font-normal">{selectedSize || "Select Size"}</span>
            </label>
            <button className="text-xs text-[#C9A84C] underline hover:text-[#9E7B28]">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizeAttr.options.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={cn(
                  "w-11 h-11 text-xs font-medium border flex items-center justify-center transition-all",
                  selectedSize === sz
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "border-[#E8E4DC] text-[#5C5C5C] hover:border-[#1A1A1A]"
                )}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Default sizes fallback if attributes are missing */}
      {!sizeAttr && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
              Select Size
            </label>
            <span className="text-xs text-[#9A9A9A]">Standard fit</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={cn(
                  "w-11 h-11 text-xs font-medium border flex items-center justify-center transition-all",
                  selectedSize === sz
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "border-[#E8E4DC] text-[#5C5C5C] hover:border-[#1A1A1A]"
                )}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-3">
          Quantity
        </label>
        <div className="flex items-center border border-[#E8E4DC] w-32">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-[#5C5C5C] hover:text-[#1A1A1A]"
            aria-label="Decrease"
          >
            <Minus size={14} />
          </button>
          <span className="flex-1 text-center font-medium text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-[#5C5C5C] hover:text-[#1A1A1A]"
            aria-label="Increase"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="btn btn-primary w-full py-3.5 justify-center gap-2 disabled:opacity-50"
        >
          <ShoppingBag size={18} />
          {isOutOfStock ? "Sold Out" : "Add to Bag"}
        </button>

        {!isOutOfStock && (
          <button
            onClick={handleBuyNow}
            className="btn btn-gold w-full py-3.5 justify-center"
          >
            Buy It Now
          </button>
        )}
      </div>

      {/* Trust icons */}
      <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#E8E4DC] text-center text-xs text-[#5C5C5C]">
        <div className="flex flex-col items-center gap-1.5">
          <Truck size={18} className="text-[#C9A84C]" />
          <span>Free Express Shipping</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <RotateCcw size={18} className="text-[#C9A84C]" />
          <span>15-Day Easy Returns</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <ShieldCheck size={18} className="text-[#C9A84C]" />
          <span>100% Authentic Quality</span>
        </div>
      </div>

      {/* Accordion Tabs */}
      <div className="border-t border-[#E8E4DC] divide-y divide-[#E8E4DC]">
        {/* Description */}
        <div>
          <button
            onClick={() => setOpenTab(openTab === "description" ? null : "description")}
            className="flex items-center justify-between w-full py-4 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]"
          >
            Description
            <ChevronDown size={16} className={cn("transition-transform", openTab === "description" ? "rotate-180" : "")} />
          </button>
          {openTab === "description" && (
            <div className="pb-4 text-sm text-[#5C5C5C] leading-relaxed space-y-2">
              {product.description ? (
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              ) : (
                <p>
                  Crafted with precision and elegance, this piece embodies contemporary Indian aesthetic. Designed for maximum comfort and sophisticated style for your everyday & special moments.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Fabric & Care */}
        <div>
          <button
            onClick={() => setOpenTab(openTab === "fabric" ? null : "fabric")}
            className="flex items-center justify-between w-full py-4 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]"
          >
            Fabric & Care
            <ChevronDown size={16} className={cn("transition-transform", openTab === "fabric" ? "rotate-180" : "")} />
          </button>
          {openTab === "fabric" && (
            <div className="pb-4 text-sm text-[#5C5C5C] leading-relaxed space-y-1">
              <p>• Premium Handloom/Natural Fiber Blend</p>
              <p>• Dry Clean Only or Gentle Cold Hand Wash</p>
              <p>• Do Not Bleach / Tumble Dry</p>
              <p>• Warm Iron on Reverse Side</p>
            </div>
          )}
        </div>

        {/* Shipping & Returns */}
        <div>
          <button
            onClick={() => setOpenTab(openTab === "shipping" ? null : "shipping")}
            className="flex items-center justify-between w-full py-4 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]"
          >
            Shipping & Returns
            <ChevronDown size={16} className={cn("transition-transform", openTab === "shipping" ? "rotate-180" : "")} />
          </button>
          {openTab === "shipping" && (
            <div className="pb-4 text-sm text-[#5C5C5C] leading-relaxed space-y-1">
              <p>• Standard Delivery: 3-5 business days across India</p>
              <p>• Express Shipping available at checkout</p>
              <p>• Returns accepted within 15 days of delivery</p>
              <p>• Dispatched directly from Trivandrum, Kerala</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
