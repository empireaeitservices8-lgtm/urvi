// ============================================================
// WooCommerce API TypeScript Types
// ============================================================

export interface WooImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: WooImage | null;
  count: number;
}

export interface WooAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WooVariation {
  id: number;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  attributes: { id: number; name: string; option: string }[];
  image: WooImage | null;
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: "simple" | "variable" | "grouped" | "external";
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  manage_stock: boolean;
  stock_quantity: number | null;
  stock_status: "instock" | "outofstock" | "onbackorder";
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  weight: string;
  categories: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
  images: WooImage[];
  attributes: WooAttribute[];
  variations: number[];
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  meta_data: { id: number; key: string; value: unknown }[];
}

export interface WooReview {
  id: number;
  date_created: string;
  review: string;
  rating: number;
  name: string;
  email: string;
  verified: boolean;
  product_id: number;
}

export interface WooCartItem {
  key: string;
  id: number;
  quantity: number;
  name: string;
  sku: string;
  permalink: string;
  images: { src: string; alt: string }[];
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
  };
  totals: {
    line_subtotal: string;
    line_total: string;
  };
  variation: { attribute: string; value: string }[];
}

export interface WooCart {
  items: WooCartItem[];
  items_count: number;
  totals: {
    subtotal: string;
    subtotal_tax: string;
    shipping_total: string;
    discount_total: string;
    total: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
  };
  coupons: { code: string; totals: { total_discount: string } }[];
  shipping_address: WooAddress;
  billing_address: WooAddress;
}

export interface WooAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface WooOrder {
  id: number;
  number: string;
  status: string;
  date_created: string;
  total: string;
  subtotal: string;
  shipping_total: string;
  discount_total: string;
  currency: string;
  currency_symbol: string;
  billing: WooAddress & { email: string; phone: string };
  shipping: WooAddress;
  line_items: {
    id: number;
    name: string;
    product_id: number;
    quantity: number;
    sku: string;
    price: number;
    total: string;
    image: { src: string } | null;
    meta_data: { id: number; key: string; value: string; display_key: string; display_value: string }[];
  }[];
  payment_method: string;
  payment_method_title: string;
  customer_note: string;
}

export interface WooCustomer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  billing: WooAddress & { email: string; phone: string };
  shipping: WooAddress;
}

// ============================================================
// Frontend Types
// ============================================================

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
  inStock?: boolean;
  orderBy?: "date" | "popularity" | "price" | "price-desc" | "rating";
  page?: number;
  perPage?: number;
  search?: string;
  attribute?: string;
  attributeTerm?: string;
}

export interface WishlistItem {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  image: WooImage | null;
  stock_status: "instock" | "outofstock" | "onbackorder";
}

export interface CartLocalItem {
  productId: number;
  variationId?: number;
  quantity: number;
  name: string;
  price: string;
  image: string;
  attributes?: { name: string; value: string }[];
}
