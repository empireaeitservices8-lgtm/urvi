"use client";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, count, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const shipping = subtotal > 1999 ? 0 : 150;
  const grandTotal = subtotal + shipping;

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="container-urvi">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-8">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Shopping Bag</span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-8">
          Your Shopping Bag ({count})
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-[#F5F3EF] border border-[#E8E4DC] max-w-lg mx-auto">
            <ShoppingBag size={48} className="mx-auto text-[#C9A84C] mb-4" />
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-2">Your bag is empty</h2>
            <p className="text-sm text-[#5C5C5C] mb-6">Looks like you haven&apos;t added any items yet.</p>
            <Link href="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items Table */}
            <div className="lg:col-span-2 space-y-4">
              <div className="hidden md:grid grid-cols-12 pb-3 border-b border-[#E8E4DC] text-xs font-semibold uppercase tracking-wider text-[#9A9A9A]">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-[#E8E4DC] border-b border-[#E8E4DC]">
                {items.map((item) => (
                  <div key={item.key} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Product */}
                    <div className="md:col-span-6 flex gap-4">
                      <div className="relative w-20 h-24 bg-[#F5F3EF] flex-shrink-0 overflow-hidden">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#EDE9E0]" />
                        )}
                      </div>
                      <div>
                        <Link href={`/products/${item.productId}`} className="font-medium text-sm text-[#1A1A1A] hover:text-[#C9A84C] transition-colors line-clamp-2">
                          {item.name}
                        </Link>
                        {item.attributes && (
                          <p className="text-xs text-[#9A9A9A] mt-1">
                            {item.attributes.map((a) => `${a.name}: ${a.value}`).join(" | ")}
                          </p>
                        )}
                        <button
                          onClick={() => removeItem(item.key)}
                          className="flex items-center gap-1 text-xs text-[#9A9A9A] hover:text-[#C0392B] transition-colors mt-2"
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-left md:text-center text-sm font-medium">
                      {formatPrice(item.price)}
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-start md:justify-center">
                      <div className="flex items-center border border-[#E8E4DC]">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#5C5C5C] hover:text-[#1A1A1A]"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#5C5C5C] hover:text-[#1A1A1A]"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 text-left md:text-right font-serif font-bold text-base">
                      {formatPrice(parseFloat(item.price) * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button onClick={clearCart} className="text-xs text-[#9A9A9A] hover:text-[#C0392B] underline">
                  Clear Entire Cart
                </button>
                <Link href="/shop" className="text-xs font-medium text-[#1A1A1A] hover:text-[#C9A84C] transition-colors">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="bg-[#F5F3EF] p-6 lg:p-8 border border-[#E8E4DC] h-fit space-y-6">
              <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pb-3 border-b border-[#E8E4DC]">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#5C5C5C]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1A1A1A]">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-[#5C5C5C]">
                  <span>Shipping</span>
                  <span className="font-medium text-[#1A1A1A]">
                    {shipping === 0 ? <span className="text-[#2D7D46]">FREE</span> : formatPrice(shipping)}
                  </span>
                </div>

                {subtotal < 1999 && (
                  <p className="text-xs text-[#C9A84C]">
                    Add {formatPrice(1999 - subtotal)} more for FREE shipping!
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-[#E8E4DC] flex justify-between items-baseline">
                <span className="font-semibold text-[#1A1A1A]">Grand Total</span>
                <span className="font-serif text-2xl font-bold text-[#1A1A1A]">{formatPrice(grandTotal)}</span>
              </div>

              <Link href="/checkout" className="btn btn-primary w-full justify-center py-4 text-sm">
                Proceed to Checkout <ArrowRight size={16} />
              </Link>

              <div className="flex items-center gap-2 text-xs text-[#9A9A9A] justify-center pt-2">
                <ShieldCheck size={16} className="text-[#C9A84C]" />
                <span>100% Secure Checkout Guaranteed</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
