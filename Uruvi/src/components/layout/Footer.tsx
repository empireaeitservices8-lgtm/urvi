import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

const FOOTER_LINKS = {
  shop: [
    { label: "Men's Collection", href: "/mens" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/shop?sort=popularity" },
    { label: "Dresses", href: "/shop/dresses" },
    { label: "Kurtas", href: "/shop/kurtas" },
    { label: "Sarees", href: "/shop/sarees" },
    { label: "Collections", href: "/collections" },
  ],
  care: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Returns & Refunds", href: "/return-policy" },
    { label: "FAQs", href: "/contact#faqs" },
    { label: "Size Guide", href: "/size-guide" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/return-policy" },
    { label: "Shipping Policy", href: "/shipping-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Main footer */}
      <div className="container-urvi py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.png"
                alt="Urvi Designs"
                width={52}
                height={52}
                className="w-12 h-12 object-contain rounded-full"
              />
              <span className="font-serif text-xl tracking-wide text-white">URVI DESIGNS</span>
            </Link>
            <p className="text-[#9A9A9A] text-sm leading-relaxed mb-6 max-w-[300px]">
              Urvi Designs brings together contemporary fashion and timeless elegance, creating thoughtfully designed pieces for the modern wardrobe.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#3A3A3A] flex items-center justify-center text-[#9A9A9A] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#3A3A3A] flex items-center justify-center text-[#9A9A9A] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/919895660061"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#3A3A3A] flex items-center justify-center text-[#9A9A9A] hover:text-[#25D366] hover:border-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.523 5.824L.057 23.886a.5.5 0 00.606.62l6.245-1.628A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.938a9.932 9.932 0 01-5.073-1.388l-.362-.215-3.712.967.985-3.605-.237-.373A9.893 9.893 0 012.062 12C2.062 6.488 6.488 2.062 12 2.062c5.513 0 9.938 4.426 9.938 9.938 0 5.513-4.425 9.938-9.938 9.938z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-2">
            <h3 className="text-[0.625rem] font-semibold tracking-[0.16em] uppercase text-[#C9A84C] mb-5">Shop</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#9A9A9A] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="lg:col-span-2">
            <h3 className="text-[0.625rem] font-semibold tracking-[0.16em] uppercase text-[#C9A84C] mb-5">Customer Care</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.care.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#9A9A9A] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-2">
            <h3 className="text-[0.625rem] font-semibold tracking-[0.16em] uppercase text-[#C9A84C] mb-5">Legal</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#9A9A9A] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2">
            <h3 className="text-[0.625rem] font-semibold tracking-[0.16em] uppercase text-[#C9A84C] mb-5">Contact</h3>
            <address className="not-italic space-y-3">
              <div className="flex gap-2.5 text-sm text-[#9A9A9A]">
                <MapPin size={14} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <span>
                  Vellayambalam,<br />
                  Trivandrum,<br />
                  Kerala 695010
                </span>
              </div>
              <div className="flex gap-2.5 text-sm text-[#9A9A9A]">
                <Phone size={14} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919895660061" className="block hover:text-white transition-colors">+91 98956 60061</a>
                  <a href="tel:+919895669000" className="block hover:text-white transition-colors">+91 98956 69000</a>
                </div>
              </div>
              <div className="flex gap-2.5 text-xs sm:text-sm text-[#9A9A9A]">
                <Mail size={14} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <a href="mailto:urvibyajithapillai@gmail.com" className="hover:text-white transition-colors whitespace-nowrap">
                  urvibyajithapillai@gmail.com
                </a>
              </div>
            </address>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2A2A2A]">
        <div className="container-urvi py-5 text-center sm:text-left">
          <p className="text-xs text-[#5C5C5C]">
            © {new Date().getFullYear()} Urvi Designs. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
