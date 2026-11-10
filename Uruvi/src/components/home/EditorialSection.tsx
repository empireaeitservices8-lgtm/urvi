import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FASHION_IMAGES } from "@/lib/utils";

export default function EditorialSection() {
  return (
    <section className="section-py bg-[#FAFAF8]">
      <div className="container-urvi">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
            <Image
              src={FASHION_IMAGES.editorial}
              alt="The Urvi Edit"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gold accent border */}
            <div className="absolute inset-0 border-[3px] border-transparent" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <span className="section-label block mb-5">Editorial</span>
            <h2 className="font-serif text-[#1A1A1A] mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              The <em className="text-[#C9A84C] not-italic font-light">Urvi</em> Edit
            </h2>

            <div className="w-12 h-px bg-[#C9A84C] mb-6" />

            <p className="text-[#5C5C5C] text-base leading-relaxed mb-4 max-w-[40ch]">
              Where contemporary design meets the timeless spirit of Indian fashion. Each piece in The Urvi Edit is chosen for its ability to move effortlessly through your life.
            </p>
            <p className="text-[#5C5C5C] text-base leading-relaxed mb-8 max-w-[40ch]">
              Thoughtfully crafted, beautifully worn — from quiet mornings to celebrated evenings.
            </p>

            <Link href="/collections" className="btn btn-primary group">
              Discover The Edit
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
