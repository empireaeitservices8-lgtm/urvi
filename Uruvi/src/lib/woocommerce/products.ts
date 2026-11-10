import { wooFetch } from "./client";
import type { WooProduct, ProductFilters } from "./types";
import { MENS_PRODUCTS } from "@/lib/mensData";

// ============================================================
// Products API
// ============================================================

export async function getProducts(filters: ProductFilters = {}): Promise<{
  products: WooProduct[];
  total: number;
  totalPages: number;
}> {
  const params: Record<string, string | number | boolean> = {
    per_page: filters.perPage || 12,
    page: filters.page || 1,
    status: "publish",
  };

  if (filters.search) params.search = filters.search;
  if (filters.category) params.category = filters.category;
  if (filters.minPrice) params.min_price = filters.minPrice;
  if (filters.maxPrice) params.max_price = filters.maxPrice;
  if (filters.onSale) params.on_sale = true;
  if (filters.inStock) params.stock_status = "instock";

  switch (filters.orderBy) {
    case "date":
      params.orderby = "date";
      params.order = "desc";
      break;
    case "popularity":
      params.orderby = "popularity";
      params.order = "desc";
      break;
    case "price":
      params.orderby = "price";
      params.order = "asc";
      break;
    case "price-desc":
      params.orderby = "price";
      params.order = "desc";
      break;
    case "rating":
      params.orderby = "rating";
      params.order = "desc";
      break;
    default:
      params.orderby = "menu_order";
      params.order = "asc";
  }

  if (filters.attribute && filters.attributeTerm) {
    params.attribute = filters.attribute;
    params.attribute_term = filters.attributeTerm;
  }

  try {
    // We need headers for pagination, so use a direct fetch
    const WOOCOMMERCE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "";
    const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || "";
    const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || "";

    const url = new URL(`${WOOCOMMERCE_URL}/wp-json/wc/v3/products`);
    url.searchParams.set("consumer_key", CONSUMER_KEY);
    url.searchParams.set("consumer_secret", CONSUMER_SECRET);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

    const response = await fetch(url.toString(), { next: { revalidate: 60 } });

    if (!response.ok) throw new Error("API unavailable");

    const products: WooProduct[] = await response.json();
    const total = parseInt(response.headers.get("X-WP-Total") || "0", 10);
    const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "0", 10);

    return { products, total, totalPages };
  } catch {
    return { products: [], total: 0, totalPages: 0 };
  }
}

export async function getProductBySlug(slug: string): Promise<WooProduct | null> {
  const mensMatch = MENS_PRODUCTS.find((p) => p.slug === slug);
  if (mensMatch) return mensMatch;

  try {
    const products = await wooFetch<WooProduct[]>("products", {}, { slug });
    return products[0] || null;
  } catch {
    return null;
  }
}

export async function getFeaturedProducts(limit = 8): Promise<WooProduct[]> {
  try {
    return await wooFetch<WooProduct[]>("products", {}, {
      featured: true,
      per_page: limit,
      status: "publish",
    });
  } catch {
    return [];
  }
}

export async function getBestSellingProducts(limit = 8): Promise<WooProduct[]> {
  try {
    return await wooFetch<WooProduct[]>("products", {}, {
      orderby: "popularity",
      order: "desc",
      per_page: limit,
      status: "publish",
    });
  } catch {
    return [];
  }
}

export async function getNewArrivals(limit = 8): Promise<WooProduct[]> {
  try {
    return await wooFetch<WooProduct[]>("products", {}, {
      orderby: "date",
      order: "desc",
      per_page: limit,
      status: "publish",
    });
  } catch {
    return [];
  }
}

export async function getRelatedProducts(productId: number, limit = 6): Promise<WooProduct[]> {
  try {
    // Get related product IDs from the product
    const product = await wooFetch<WooProduct>(`products/${productId}`);
    if (!product.related_ids?.length) return [];

    const ids = product.related_ids.slice(0, limit).join(",");
    return await wooFetch<WooProduct[]>("products", {}, {
      include: ids,
      per_page: limit,
    });
  } catch {
    return [];
  }
}

export async function searchProducts(query: string, limit = 12): Promise<WooProduct[]> {
  try {
    return await wooFetch<WooProduct[]>("products", {}, {
      search: query,
      per_page: limit,
      status: "publish",
    });
  } catch {
    return [];
  }
}

export async function getProductsByCategory(categoryId: number, limit = 12): Promise<WooProduct[]> {
  try {
    return await wooFetch<WooProduct[]>("products", {}, {
      category: categoryId,
      per_page: limit,
      status: "publish",
    });
  } catch {
    return [];
  }
}

export async function getOnSaleProducts(limit = 8): Promise<WooProduct[]> {
  try {
    return await wooFetch<WooProduct[]>("products", {}, {
      on_sale: true,
      per_page: limit,
      status: "publish",
    });
  } catch {
    return [];
  }
}

// Helper: Format price with Indian Rupee symbol
export function formatPrice(price: string | number): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numPrice)) return "₹0";
  return `₹${numPrice.toLocaleString("en-IN")}`;
}

// Helper: Get discount percentage
export function getDiscountPercentage(regularPrice: string, salePrice: string): number {
  const regular = parseFloat(regularPrice);
  const sale = parseFloat(salePrice);
  if (!regular || !sale) return 0;
  return Math.round(((regular - sale) / regular) * 100);
}
