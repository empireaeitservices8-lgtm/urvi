import Link from "next/link";
import Image from "next/image";
import { FASHION_IMAGES } from "@/lib/utils";

const OCCASIONS = [
  { label: "Everyday", href: "/shop?occasion=everyday", image: FASHION_IMAGES.occasion1 },
  { label: "Festive", href: "/shop?occasion=festive", image: FASHION_IMAGES.occasion2 },
  { label: "Party", href: "/shop?occasion=party", image: FASHION_IMAGES.occasion3 },
  { label: "Wedding", href: "/shop?occasion=wedding", image: FASHION_IMAGES.occasion4 },
  { label: "Vacation", href: "/shop?occasion=vacation", image: FASHION_IMAGES.occasion5 },
];

export default function OccasionSection() {
  return (
    <section className="section-py bg-[#FAFAF8]">
      <div className="container-urvi">
        <div className="section-header">
          <span className="section-label">Every Occasion</span>
          <h2 className="section-title">Shop By Occasion</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {OCCASIONS.map((occ) => (
            <Link
              key={occ.label}
              href={occ.href}
              className="group relative overflow-hidden block rounded-sm"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={occ.image}
                alt={occ.label}
                fill
                className="object-cover transition-transform duration-600 group-hover:scale-107"
                sizes="(max-width: 640px) 50vw, 20vw"
              />
              <div className="absolute inset-0 overlay-bottom group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <p className="font-serif text-white text-lg font-semibold">{occ.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
