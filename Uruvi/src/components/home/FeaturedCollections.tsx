import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ACFHomePage } from "@/lib/wordpress/pages";

interface FeaturedCollectionsProps {
  acf?: ACFHomePage | null;
}

export default function FeaturedCollections({ acf }: FeaturedCollectionsProps) {
  const label = acf?.collections_label || "Collections";
  const title = acf?.collections_title || "Curated For You";
  const subtitle = acf?.collections_subtitle || "Discover thoughtfully selected pieces designed to become part of your signature style.";

  // Extract collections from ACF
  const collections = [1, 2, 3, 4]
    .map((i) => {
      const colTitle = acf?.[`collection_${i}_title` as keyof ACFHomePage];
      const colDesc = acf?.[`collection_${i}_desc` as keyof ACFHomePage];
      const colTag = acf?.[`collection_${i}_tag` as keyof ACFHomePage];
      const colLink = acf?.[`collection_${i}_link` as keyof ACFHomePage];
      const colImage = acf?.[`collection_${i}_image` as keyof ACFHomePage];

      return {
        title: colTitle as string,
        desc: colDesc as string,
        tag: colTag as string,
        href: colLink as string,
        image: colImage as string,
      };
    })
    .filter((col) => col.title && col.image); // Only keep ones that have at least a title and image defined in ACF

  // If no collections are defined in WordPress yet, hide the section
  if (collections.length === 0) return null;

  return (
    <section className="section-py bg-[#FAFAF8]">
      <div className="container-urvi">
        {/* Header */}
        <div className="section-header">
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {collections.map((col, i) => (
            <Link
              key={col.title || i}
              href={col.href || "#"}
              className="group relative overflow-hidden block"
              style={{ aspectRatio: "4/5" }}
            >
              {/* Image */}
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 overlay-bottom" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                {col.tag && (
                  <span className="text-[0.5625rem] font-semibold tracking-[0.18em] uppercase text-[#C9A84C] block mb-2">
                    {col.tag}
                  </span>
                )}
                <h3 className="font-serif text-white text-xl mb-1 leading-tight">
                  {col.title}
                </h3>
                {col.desc && (
                  <p className="text-white/70 text-xs leading-relaxed mb-3 max-w-[22ch]">
                    {col.desc}
                  </p>
                )}
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white border-b border-white/40 pb-0.5 group-hover:border-[#C9A84C] group-hover:text-[#C9A84C] transition-colors">
                  Explore <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
