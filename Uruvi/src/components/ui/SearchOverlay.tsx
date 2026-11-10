"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { X, Search, ArrowRight } from "lucide-react";
import { searchProducts } from "@/lib/woocommerce/products";
import { formatPrice } from "@/lib/utils";
import type { WooProduct } from "@/lib/woocommerce/types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WooProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const products = await searchProducts(query, 6);
        setResults(products);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
      <div className="absolute inset-0 bg-[#1A1A1A]/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-[#FAFAF8] shadow-strong">
        <div className="container-urvi py-5">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <Search size={22} className="text-[#9A9A9A] flex-shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for kurtas, sarees, dresses..."
              className="flex-1 bg-transparent border-none outline-none font-serif text-2xl text-[#1A1A1A] placeholder-[#C9C9C9]"
            />
            <button type="button" onClick={onClose} className="p-2 text-[#5C5C5C] hover:text-[#1A1A1A] transition-colors">
              <X size={22} />
            </button>
          </form>
        </div>

        {/* Results */}
        {(results.length > 0 || isLoading) && (
          <div className="border-t border-[#E8E4DC] bg-[#FAFAF8]">
            <div className="container-urvi py-6">
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i}>
                      <div className="aspect-product skeleton mb-2" />
                      <div className="h-3 skeleton mb-1.5 rounded" />
                      <div className="h-3 skeleton w-2/3 rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-xs text-[#9A9A9A] uppercase tracking-wider mb-4">
                    {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={onClose}
                        className="group"
                      >
                        <div className="aspect-product bg-[#F5F3EF] overflow-hidden mb-2 relative">
                          {product.images[0] ? (
                            <Image
                              src={product.images[0].src}
                              alt={product.images[0].alt || product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 50vw, 16vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#EDE9E0]" />
                          )}
                        </div>
                        <p className="text-sm text-[#1A1A1A] group-hover:text-[#C9A84C] transition-colors line-clamp-1 mb-0.5">
                          {product.name}
                        </p>
                        <p className="text-sm font-medium text-[#5C5C5C]">{formatPrice(product.price)}</p>
                      </Link>
                    ))}
                  </div>

                  {results.length === 6 && (
                    <Link
                      href={`/search?q=${encodeURIComponent(query)}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#C9A84C] hover:text-[#9E7B28] transition-colors"
                    >
                      View all results <ArrowRight size={14} />
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
