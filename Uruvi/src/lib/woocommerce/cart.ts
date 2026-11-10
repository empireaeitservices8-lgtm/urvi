// ============================================================
// WooCommerce Store API — Cart (Client-side, no credentials needed)
// ============================================================

const WORDPRESS_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_WORDPRESS_URL || ""
    : process.env.NEXT_PUBLIC_WORDPRESS_URL || "";

const STORE_API = `${WORDPRESS_URL}/wp-json/wc/store/v1`;

async function storeFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${STORE_API}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Cart API error ${res.status}`);
  }
  return res.json();
}

export async function getCart() {
  return storeFetch("/cart");
}

export async function addToCart(productId: number, quantity = 1, variationId?: number) {
  return storeFetch("/cart/add-item", {
    method: "POST",
    body: JSON.stringify({
      id: variationId || productId,
      quantity,
    }),
  });
}

export async function updateCartItem(key: string, quantity: number) {
  return storeFetch("/cart/update-item", {
    method: "POST",
    body: JSON.stringify({ key, quantity }),
  });
}

export async function removeCartItem(key: string) {
  return storeFetch("/cart/remove-item", {
    method: "POST",
    body: JSON.stringify({ key }),
  });
}

export async function applyCoupon(code: string) {
  return storeFetch("/cart/apply-coupon", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

export async function removeCoupon(code: string) {
  return storeFetch("/cart/remove-coupon", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}
