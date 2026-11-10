// ============================================================
// Utility helpers
// ============================================================
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string | number): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "₹0";
  return `₹${num.toLocaleString("en-IN")}`;
}

export function getDiscountPercentage(regular: string, sale: string): number {
  const r = parseFloat(regular);
  const s = parseFloat(sale);
  if (!r || !s || s >= r) return 0;
  return Math.round(((r - s) / r) * 100);
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "…";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

export function getStockLabel(status: string): string {
  switch (status) {
    case "instock":
      return "In Stock";
    case "outofstock":
      return "Out of Stock";
    case "onbackorder":
      return "Available on Backorder";
    default:
      return "";
  }
}

// Unsplash fashion image URLs for placeholders (Verified live URLs)
export const FASHION_IMAGES = {
  hero1: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1600&q=85",
  hero2: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=1600&q=85",
  hero3: "https://images.unsplash.com/photo-1594938298603-c8148c4b4857?w=1600&q=85",
  collection1: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=80",
  collection2: "https://images.unsplash.com/photo-1614251056798-0a63eda2bb25?w=800&q=80",
  collection3: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80",
  collection4: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
  product1: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&q=80",
  product2: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
  product3: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
  product4: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80",
  product5: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&q=80",
  product6: "https://images.unsplash.com/photo-1520367745676-56196632073f?w=600&q=80",
  product7: "https://images.unsplash.com/photo-1614251056798-0a63eda2bb25?w=600&q=80",
  product8: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
  editorial: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=85",
  promo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=85",
  about: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=85",
  occasion1: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=600&q=80",
  occasion2: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
  occasion3: "https://images.unsplash.com/photo-1550928431-ee0ec6db30d3?w=600&q=80",
  occasion4: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80",
  occasion5: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  instagram1: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
  instagram2: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80",
  instagram3: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80",
  instagram4: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&q=80",
  instagram5: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80",
  instagram6: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80",
  category1: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=500&q=80",
  category2: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=500&q=80",
  category3: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80",
  category4: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=500&q=80",
};
