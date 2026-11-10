import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FASHION_IMAGES } from "@/lib/utils";

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
      <Image
        src={FASHION_IMAGES.promo}
        alt="Shop Urvi Designs"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 container-urvi h-full flex flex-col items-center justify-center text-center py-24 gap-6">
        <span className="text-[0.625rem] font-semibold tracking-[0.22em] uppercase text-[#C9A84C]">
          New Season
        </span>
        <h2 className="font-serif text-white max-w-2xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Your Next Signature Look Starts Here
        </h2>
        <p className="text-white/75 text-base max-w-[44ch] leading-relaxed">
          Discover pieces designed to move effortlessly from everyday moments to special occasions.
        </p>
        <Link href="/shop" className="btn btn-white mt-2">
          Shop Now <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </section>
  );
}
