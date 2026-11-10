"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "Priya M.",
    location: "Kochi, Kerala",
    rating: 5,
    review:
      "The quality of the kurta set is absolutely outstanding. The fabric is so soft and the embroidery is exquisite. It fits perfectly and I received so many compliments at the wedding!",
    product: "Embroidered Kurta Set",
  },
  {
    name: "Ananya R.",
    location: "Bengaluru",
    rating: 5,
    review:
      "I discovered Urvi Designs while looking for something special for Onam. The saree I ordered was exactly as pictured — beautiful handwork and delivered in lovely packaging. Will definitely shop again.",
    product: "Handwoven Cotton Saree",
  },
  {
    name: "Meera S.",
    location: "Chennai",
    rating: 5,
    review:
      "The co-ord set is absolutely stunning. Perfect for both office and casual outings. Urvi Designs understands what modern Indian women want — effortless style without compromising on tradition.",
    product: "Co-ord Set",
  },
  {
    name: "Lakshmi K.",
    location: "Trivandrum, Kerala",
    rating: 5,
    review:
      "I've been a loyal customer for over a year now. Every piece I've bought has been exceptional. The customer service team is also incredibly helpful and responsive.",
    product: "Multiple purchases",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section className="section-py bg-[#1A1A1A]">
      <div className="container-urvi max-w-3xl text-center">
        <span className="section-label">Reviews</span>
        <h2 className="font-serif text-white text-[clamp(1.75rem,3.5vw,2.75rem)] mb-12">
          Loved By You
        </h2>

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-[#C9A84C] text-xl">★</span>
          ))}
        </div>

        {/* Review */}
        <blockquote key={current} className="animate-fade-in">
          <p className="font-serif text-white/90 text-xl lg:text-2xl leading-relaxed mb-8 italic">
            &ldquo;{t.review}&rdquo;
          </p>
        </blockquote>

        {/* Reviewer */}
        <div className="mb-2">
          <p className="text-[#C9A84C] font-medium text-sm">{t.name}</p>
          <p className="text-white/50 text-xs">{t.location}</p>
          {t.product && (
            <p className="text-white/40 text-xs mt-0.5">Purchased: {t.product}</p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-200",
                  i === current ? "bg-[#C9A84C] w-4" : "bg-white/30"
                )}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            aria-label="Next review"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <p className="text-xs text-white/30 mt-6">
          Reviews are placeholder content. Real customer reviews will display when connected to WooCommerce.
        </p>
      </div>
    </section>
  );
}
