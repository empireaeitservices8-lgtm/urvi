import { wooFetch } from "./client";
import type { WooCategory } from "./types";

// ============================================================
// Categories API
// ============================================================

export async function getCategories(params: {
  parent?: number;
  hideEmpty?: boolean;
  perPage?: number;
} = {}): Promise<WooCategory[]> {
  try {
    return await wooFetch<WooCategory[]>("products/categories", {}, {
      per_page: params.perPage || 100,
      hide_empty: params.hideEmpty !== false,
      ...(params.parent !== undefined ? { parent: params.parent } : {}),
      orderby: "name",
      order: "asc",
    });
  } catch (err) {
    console.error("[CATEGORIES] Error fetching categories:", err);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<WooCategory | null> {
  try {
    const cats = await wooFetch<WooCategory[]>("products/categories", {}, { slug });
    return cats[0] || null;
  } catch {
    return null;
  }
}

export async function getRootCategories(): Promise<WooCategory[]> {
  const cats = await getCategories({ hideEmpty: false });
  // Filter out WooCommerce's default "Uncategorized" category
  return cats.filter(c => c.slug !== "uncategorized");
}

// Map of well-known category slugs to display info
export const CATEGORY_MAP: Record<string, { label: string; icon: string }> = {
  dresses: { label: "Dresses", icon: "👗" },
  kurtas: { label: "Kurtas", icon: "🥻" },
  "kurta-sets": { label: "Kurta Sets", icon: "✨" },
  sarees: { label: "Sarees", icon: "🌸" },
  "co-ord-sets": { label: "Co-ord Sets", icon: "💫" },
  tops: { label: "Tops", icon: "👕" },
  "bottom-wear": { label: "Bottom Wear", icon: "👖" },
  "occasion-wear": { label: "Occasion Wear", icon: "🌟" },
  mens: { label: "Men's Collection", icon: "👔" },
  "kasavu-combos": { label: "Kasavu Combo Sets", icon: "✨" },
};
