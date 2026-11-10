// ============================================================
// WooCommerce REST API Client
// ============================================================

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "";
const WOOCOMMERCE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "";
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || "";
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || "";

// Server-side authenticated client (uses consumer key/secret)
export async function wooFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  params: Record<string, string | number | boolean> = {}
): Promise<T> {
  if (!WOOCOMMERCE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error("WooCommerce API credentials not configured");
  }

  const url = new URL(`${WOOCOMMERCE_URL}/wp-json/wc/v3/${endpoint}`);
  url.searchParams.set("consumer_key", CONSUMER_KEY);
  url.searchParams.set("consumer_secret", CONSUMER_SECRET);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString(), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || `WooCommerce API error: ${response.status}`);
  }

  return response.json();
}

// Client-side Store API (no credentials needed — uses nonce)
export async function storeApiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = WORDPRESS_URL || "";
  const url = `${baseUrl}/wp-json/wc/store/v1/${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || `Store API error: ${response.status}`);
  }

  return response.json();
}

// WordPress REST API fetch (for posts, pages, etc.)
export async function wpFetch<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {}
): Promise<T> {
  const baseUrl = WORDPRESS_URL || "";
  const url = new URL(`${baseUrl}/wp-json/wp/v2/${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status}`);
  }

  return response.json();
}

export { WORDPRESS_URL, WOOCOMMERCE_URL };
