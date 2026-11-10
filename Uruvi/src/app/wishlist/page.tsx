"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (item: typeof items[0]) => {
    addItem({
      productId: item.id,
      name: item.name,
      price: item.price || item.regular_price,
      regularPrice: item.regular_price,
      quantity: 1,
      image: item.image?.src || "",
    });
    removeFromWishlist(item.id);
    toast.success("Moved to bag!");
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="container-urvi">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-8">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Wishlist</span>
        </div>

        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8E4DC]">
          <div>
            <span className="section-label">Saved Items</span>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A]">
              My Wishlist ({items.length})
            </h1>
          </div>
          {items.length > 0 && (
            <button onClick={clearWishlist} className="text-xs text-[#9A9A9A] hover:text-[#C0392B] underline">
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-[#F5F3EF] border border-[#E8E4DC] max-w-lg mx-auto">
            <Heart size={48} className="mx-auto text-[#C9A84C] mb-4" />
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-2">Your Wishlist is Empty</h2>
            <p className="text-sm text-[#5C5C5C] mb-6">Save your favorite pieces by clicking the heart icon on any product.</p>
            <Link href="/shop" className="btn btn-primary">
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {items.map((item) => (
              <div key={item.id} className="group relative bg-white border border-[#E8E4DC]">
                <div className="relative aspect-product bg-[#F5F3EF] overflow-hidden">
                  {item.image ? (
                    <Image src={item.image.src} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#EDE9E0]" />
                  )}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full text-[#C0392B] hover:bg-white transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="p-4 space-y-2">
                  <Link href={`/products/${item.slug}`} className="text-sm font-medium text-[#1A1A1A] hover:text-[#C9A84C] line-clamp-1 block">
                    {item.name}
                  </Link>
                  <p className="font-serif font-bold text-sm text-[#1A1A1A]">{formatPrice(item.price)}</p>

                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="btn btn-primary w-full text-xs py-2 justify-center gap-1.5"
                  >
                    <ShoppingBag size={14} /> Move to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
