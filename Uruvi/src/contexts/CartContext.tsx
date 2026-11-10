"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface CartItem {
  key: string;
  productId: number;
  variationId?: number;
  name: string;
  price: string;
  regularPrice: string;
  quantity: number;
  image: string;
  attributes?: { name: string; value: string }[];
  maxStock?: number;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "key">) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

function generateKey(productId: number, variationId?: number): string {
  return `${productId}-${variationId || 0}-${Date.now()}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("urvi_cart") || localStorage.getItem("uruvi_cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem("urvi_cart", JSON.stringify(newItems));
    } catch {}
  };

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: Omit<CartItem, "key">) => {
    setItems((prev) => {
      // Check if same product+variation already in cart
      const existing = prev.find(
        (i) => i.productId === item.productId && i.variationId === item.variationId
      );
      let next: CartItem[];
      if (existing) {
        next = prev.map((i) =>
          i.key === existing.key
            ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.maxStock || 99) }
            : i
        );
      } else {
        next = [...prev, { ...item, key: generateKey(item.productId, item.variationId) }];
      }
      localStorage.setItem("urvi_cart", JSON.stringify(next));
      return next;
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.key !== key);
      localStorage.setItem("urvi_cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => {
        const next = prev.filter((i) => i.key !== key);
        localStorage.setItem("urvi_cart", JSON.stringify(next));
        return next;
      });
      return;
    }
    setItems((prev) => {
      const next = prev.map((i) =>
        i.key === key ? { ...i, quantity: Math.min(quantity, i.maxStock || 99) } : i
      );
      localStorage.setItem("urvi_cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem("urvi_cart");
    localStorage.removeItem("uruvi_cart");
  }, []);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, isOpen, isLoading, openCart, closeCart, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
