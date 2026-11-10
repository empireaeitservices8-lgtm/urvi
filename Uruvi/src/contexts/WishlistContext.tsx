"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { WishlistItem } from "@/lib/woocommerce/types";

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("urvi_wishlist") || localStorage.getItem("uruvi_wishlist");
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (newItems: WishlistItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem("urvi_wishlist", JSON.stringify(newItems));
    } catch {}
  };

  const addToWishlist = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      const next = [...prev, item];
      localStorage.setItem("urvi_wishlist", JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromWishlist = useCallback((id: number) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      localStorage.setItem("urvi_wishlist", JSON.stringify(next));
      return next;
    });
  }, []);

  const isInWishlist = useCallback((id: number) => items.some((i) => i.id === id), [items]);

  const clearWishlist = useCallback(() => persist([]), []);

  return (
    <WishlistContext.Provider
      value={{ items, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist, count: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
