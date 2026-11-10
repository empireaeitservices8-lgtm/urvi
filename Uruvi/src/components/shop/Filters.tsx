"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";



const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];
const COLORS = [
  { name: "Black", hex: "#1A1A1A" },
  { name: "Ivory / White", hex: "#FAF8F5" },
  { name: "Gold / Beige", hex: "#C9A84C" },
  { name: "Maroon / Red", hex: "#800020" },
  { name: "Emerald Green", hex: "#046307" },
  { name: "Navy Blue", hex: "#000080" },
  { name: "Pastel Pink", hex: "#F4C2C2" },
];

const PRICE_RANGES = [
  { label: "Under ₹2,000", min: 0, max: 2000 },
  { label: "₹2,000 – ₹4,000", min: 2000, max: 4000 },
  { label: "₹4,000 – ₹6,000", min: 4000, max: 6000 },
  { label: "Above ₹6,000", min: 6000, max: 50000 },
];

interface FiltersProps {
  currentCategory?: string;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  categories?: { label: string; slug: string }[];
}

export default function Filters({ currentCategory, isOpenMobile, onCloseMobile, categories = [] }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(currentCategory || searchParams.get("category") || "");
  const [selectedSize, setSelectedSize] = useState(searchParams.get("size") || "");
  const [selectedColor, setSelectedColor] = useState(searchParams.get("color") || "");
  const [selectedPrice, setSelectedPrice] = useState(searchParams.get("price") || "");
  const [onSaleOnly, setOnSaleOnly] = useState(searchParams.get("sale") === "true");

  // Determine which categories to show
  const displayCategories = categories.length > 0 
    ? [{ label: "All Products", slug: "" }, ...categories]
    : [{ label: "All Products", slug: "" }];

  const applyFilters = (newCategory?: string, newSize?: string, newColor?: string, newPrice?: string, newSale?: boolean) => {
    const cat = newCategory !== undefined ? newCategory : selectedCategory;
    const size = newSize !== undefined ? newSize : selectedSize;
    const color = newColor !== undefined ? newColor : selectedColor;
    const price = newPrice !== undefined ? newPrice : selectedPrice;
    const sale = newSale !== undefined ? newSale : onSaleOnly;

    const params = new URLSearchParams(searchParams.toString());
    if (cat) params.set("category", cat); else params.delete("category");
    if (size) params.set("size", size); else params.delete("size");
    if (color) params.set("color", color); else params.delete("color");
    if (price) params.set("price", price); else params.delete("price");
    if (sale) params.set("sale", "true"); else params.delete("sale");
    params.delete("page");

    const targetUrl = cat ? `/shop/${cat}?${params.toString()}` : `/shop?${params.toString()}`;
    router.push(targetUrl);
    if (onCloseMobile) onCloseMobile();
  };

  const clearAll = () => {
    setSelectedCategory("");
    setSelectedSize("");
    setSelectedColor("");
    setSelectedPrice("");
    setOnSaleOnly(false);
    router.push("/shop");
    if (onCloseMobile) onCloseMobile();
  };

  const content = (
    <div className="space-y-8">
      {/* Category filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1A1A] mb-4 pb-2 border-b border-[#E8E4DC]">
          Categories
        </h4>
        <ul className="space-y-2.5">
          {displayCategories.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  applyFilters(cat.slug);
                }}
                className={cn(
                  "text-sm transition-colors text-left w-full flex items-center justify-between",
                  selectedCategory === cat.slug
                    ? "font-semibold text-[#C9A84C]"
                    : "text-[#5C5C5C] hover:text-[#1A1A1A]"
                )}
              >
                {cat.label}
                {selectedCategory === cat.slug && <Check size={14} className="text-[#C9A84C]" />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Size filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1A1A] mb-4 pb-2 border-b border-[#E8E4DC]">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((sz) => (
            <button
              key={sz}
              onClick={() => {
                const next = selectedSize === sz ? "" : sz;
                setSelectedSize(next);
                applyFilters(undefined, next);
              }}
              className={cn(
                "px-3 py-1.5 text-xs font-medium border transition-colors min-w-[36px]",
                selectedSize === sz
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : "border-[#E8E4DC] text-[#5C5C5C] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
              )}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Color filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1A1A] mb-4 pb-2 border-b border-[#E8E4DC]">
          Color
        </h4>
        <div className="space-y-2">
          {COLORS.map((clr) => (
            <button
              key={clr.name}
              onClick={() => {
                const next = selectedColor === clr.name ? "" : clr.name;
                setSelectedColor(next);
                applyFilters(undefined, undefined, next);
              }}
              className="flex items-center gap-3 w-full text-left py-1 text-sm text-[#5C5C5C] hover:text-[#1A1A1A]"
            >
              <span
                className="w-4 h-4 rounded-full border border-[#E8E4DC] flex items-center justify-center"
                style={{ backgroundColor: clr.hex }}
              >
                {selectedColor === clr.name && <Check size={10} className={clr.name.includes("White") || clr.name.includes("Ivory") ? "text-black" : "text-white"} />}
              </span>
              <span className={selectedColor === clr.name ? "font-semibold text-[#1A1A1A]" : ""}>{clr.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1A1A] mb-4 pb-2 border-b border-[#E8E4DC]">
          Price Range
        </h4>
        <div className="space-y-2">
          {PRICE_RANGES.map((pr) => (
            <button
              key={pr.label}
              onClick={() => {
                const val = `${pr.min}-${pr.max}`;
                const next = selectedPrice === val ? "" : val;
                setSelectedPrice(next);
                applyFilters(undefined, undefined, undefined, next);
              }}
              className={cn(
                "text-sm w-full text-left py-1 transition-colors flex items-center justify-between",
                selectedPrice === `${pr.min}-${pr.max}`
                  ? "font-semibold text-[#C9A84C]"
                  : "text-[#5C5C5C] hover:text-[#1A1A1A]"
              )}
            >
              {pr.label}
              {selectedPrice === `${pr.min}-${pr.max}` && <Check size={14} className="text-[#C9A84C]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Sale filter */}
      <div className="pt-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={onSaleOnly}
            onChange={(e) => {
              setOnSaleOnly(e.target.checked);
              applyFilters(undefined, undefined, undefined, undefined, e.target.checked);
            }}
            className="w-4 h-4 accent-[#C9A84C]"
          />
          <span className="text-sm font-medium text-[#1A1A1A]">On Sale Only</span>
        </label>
      </div>

      {/* Clear button */}
      {(selectedCategory || selectedSize || selectedColor || selectedPrice || onSaleOnly) && (
        <button
          onClick={clearAll}
          className="btn btn-outline w-full text-xs py-2 mt-4"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 pr-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E4DC]">
          <h3 className="font-serif text-lg font-semibold flex items-center gap-2">
            <SlidersHorizontal size={16} /> Filters
          </h3>
          {(selectedCategory || selectedSize || selectedColor || selectedPrice || onSaleOnly) && (
            <button onClick={clearAll} className="text-xs text-[#C9A84C] hover:underline">
              Clear All
            </button>
          )}
        </div>
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/50" onClick={onCloseMobile} />
          <div className="absolute top-0 right-0 h-full w-[320px] max-w-[85vw] bg-[#FAFAF8] z-10 flex flex-col p-6 overflow-y-auto shadow-strong">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E4DC]">
              <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                <SlidersHorizontal size={18} /> Filters
              </h3>
              <button onClick={onCloseMobile} className="p-1 text-[#1A1A1A]">
                <X size={22} />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
