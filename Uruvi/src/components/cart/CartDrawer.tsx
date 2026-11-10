"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, cn } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, count } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Trap focus
  useEffect(() => {
    if (isOpen) drawerRef.current?.focus();
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-[#FAFAF8] z-50 flex flex-col shadow-strong transition-transform duration-350 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E4DC]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="font-serif text-xl">Your Bag</h2>
            {count > 0 && (
              <span className="text-xs text-[#9A9A9A] font-sans">({count} {count === 1 ? "item" : "items"})</span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-[#5C5C5C] hover:text-[#1A1A1A] transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-4">
              <div className="w-20 h-20 bg-[#F5F3EF] rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-[#C9A84C]" />
              </div>
              <div>
                <p className="font-serif text-2xl mb-2">Your bag is empty</p>
                <p className="text-sm text-[#9A9A9A]">Add pieces you love to your bag</p>
              </div>
              <button onClick={closeCart} className="btn btn-primary mt-2">
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#E8E4DC]">
              {items.map((item) => (
                <li key={item.key} className="px-6 py-5 flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-24 flex-shrink-0 bg-[#F5F3EF] overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full skeleton" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.productId}`}
                      onClick={closeCart}
                      className="text-sm font-medium text-[#1A1A1A] hover:text-[#C9A84C] transition-colors line-clamp-2 leading-snug mb-1"
                    >
                      {item.name}
                    </Link>

                    {/* Attributes */}
                    {item.attributes && item.attributes.length > 0 && (
                      <p className="text-xs text-[#9A9A9A] mb-2">
                        {item.attributes.map((a) => `${a.name}: ${a.value}`).join(" · ")}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-[#E8E4DC]">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#5C5C5C] hover:text-[#1A1A1A] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#5C5C5C] hover:text-[#1A1A1A] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <p className="text-sm font-medium">{formatPrice(parseFloat(item.price) * item.quantity)}</p>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.key)}
                    className="self-start p-1 text-[#9A9A9A] hover:text-[#C0392B] transition-colors flex-shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E8E4DC] px-6 py-5 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#5C5C5C]">Subtotal</span>
              <span className="font-serif text-xl">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-[#9A9A9A]">Shipping & taxes calculated at checkout</p>

            {/* CTAs */}
            <div className="space-y-2.5">
              <Link href="/checkout" onClick={closeCart} className="btn btn-primary w-full justify-center">
                Proceed to Checkout
              </Link>
              <Link href="/cart" onClick={closeCart} className="btn btn-outline w-full justify-center">
                View Full Cart
              </Link>
            </div>

            <button onClick={closeCart} className="w-full text-center text-sm text-[#9A9A9A] hover:text-[#1A1A1A] transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
