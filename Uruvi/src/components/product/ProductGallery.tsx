"use client";
import { useState } from "react";
import Image from "next/image";
import type { WooImage } from "@/lib/woocommerce/types";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: WooImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);

  const displayImages = images.length > 0 ? images : [
    { id: 1, src: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=1000&q=85", alt: productName, name: productName }
  ];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-20 flex-shrink-0">
          {displayImages.map((img, i) => (
            <button
              key={img.id || i}
              onClick={() => setSelected(i)}
              className={cn(
                "relative w-16 h-20 md:w-20 md:h-24 flex-shrink-0 bg-[#F5F3EF] overflow-hidden border transition-all",
                selected === i ? "border-[#C9A84C] ring-1 ring-[#C9A84C]" : "border-[#E8E4DC] hover:border-[#1A1A1A]"
              )}
            >
              <Image
                src={img.src}
                alt={img.alt || `${productName} view ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 relative aspect-product bg-[#F5F3EF] overflow-hidden">
        <Image
          src={displayImages[selected]?.src || displayImages[0].src}
          alt={displayImages[selected]?.alt || productName}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
}
