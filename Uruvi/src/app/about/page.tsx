import Image from "next/image";
import Link from "next/link";
import { FASHION_IMAGES } from "@/lib/utils";

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="container-urvi max-w-5xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-8">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">About Us</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Urvi Designs Logo"
            width={64}
            height={64}
            className="w-16 h-16 object-contain rounded-full mb-4 shadow-sm"
          />
          <span className="section-label">Brand Story</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1A1A1A] mb-6">
            The Story of Urvi
          </h1>
          <p className="text-base text-[#5C5C5C] leading-relaxed italic font-serif">
            &ldquo;Where contemporary design meets the timeless spirit of Indian fashion.&rdquo;
          </p>
        </div>

        {/* Feature Editorial Image */}
        <div className="relative aspect-hero mb-16 overflow-hidden rounded-sm bg-[#F5F3EF]">
          <Image
            src={FASHION_IMAGES.about}
            alt="Urvi Designs Craftsmanship"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Story Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="section-label">Our Origin</span>
            <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-4">
              Rooted in Kerala, Crafted for Every Woman
            </h2>
            <p className="text-sm text-[#5C5C5C] leading-relaxed mb-4">
              Born in the historic capital of Trivandrum, Kerala, Urvi Designs emerged from a passion for authentic Indian textiles, handloom weaves, and modern tailoring.
            </p>
            <p className="text-sm text-[#5C5C5C] leading-relaxed">
              We believe fashion should feel like an extension of your own grace — effortlessly comfortable, rich in detail, and quietly luxurious.
            </p>
          </div>
          <div className="relative aspect-collection bg-[#F5F3EF] overflow-hidden">
            <Image src={FASHION_IMAGES.editorial} alt="Urvi Aesthetics" fill className="object-cover" />
          </div>
        </div>

        {/* Brand Values */}
        <div className="bg-[#1A1A1A] text-white p-10 md:p-14 mb-20 text-center">
          <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.2em] block mb-4">
            Our Philosophy
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6 max-w-2xl mx-auto">
            Thoughtful Design & Uncompromising Craftsmanship
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-[#3A3A3A] pt-8">
            <div>
              <span className="text-[#C9A84C] text-2xl font-serif block mb-2">01</span>
              <h3 className="font-serif text-lg font-semibold mb-2">Timeless Silhouettes</h3>
              <p className="text-xs text-[#9A9A9A] leading-relaxed">
                Designs designed to transcend seasonal trends and become permanent treasures in your wardrobe.
              </p>
            </div>
            <div>
              <span className="text-[#C9A84C] text-2xl font-serif block mb-2">02</span>
              <h3 className="font-serif text-lg font-semibold mb-2">Artisanal Touch</h3>
              <p className="text-xs text-[#9A9A9A] leading-relaxed">
                Partnering directly with skilled artisans across Kerala and India to preserve age-old embroidery and weaving techniques.
              </p>
            </div>
            <div>
              <span className="text-[#C9A84C] text-2xl font-serif block mb-2">03</span>
              <h3 className="font-serif text-lg font-semibold mb-2">Modern Versatility</h3>
              <p className="text-xs text-[#9A9A9A] leading-relaxed">
                Silhouettes tailored for the modern woman who transitions seamlessly from everyday work to grand celebrations.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center py-8">
          <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-4">Visit Our Boutique</h2>
          <p className="text-sm text-[#5C5C5C] mb-6">Vellayambalam, Trivandrum, Kerala 695010, India</p>
          <Link href="/contact" className="btn btn-primary">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
