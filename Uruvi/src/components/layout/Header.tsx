"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import AnnouncementBar from "./AnnouncementBar";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "@/components/ui/SearchOverlay";
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  categories?: { name: string; slug: string }[];
}

export default function Header({ categories = [] }: HeaderProps) {
  const dynamicCategoryLinks = [
    { label: "All Products", href: "/shop" },
    ...categories.map(c => ({ label: c.name, href: `/shop/${c.slug}` }))
  ];

  type NavItem = {
    label: string;
    href: string;
    mega?: boolean;
    sub?: { label: string; href: string }[];
    columns?: { heading: string; links: { label: string; href: string }[] }[];
  };

  const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Collections",
      href: "/collections",
      mega: false,
      sub: dynamicCategoryLinks,
    },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { count: cartCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <AnnouncementBar />

      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-[#FAFAF8]/95 backdrop-blur-sm shadow-soft border-b border-[#E8E4DC]"
            : "bg-[#FAFAF8] border-b border-[#E8E4DC]"
        )}
      >
        <div className="container-urvi">
          {/* Top Row: Absolutely Centered Logo + Heading */}
          <div className="relative flex items-center justify-between py-4 min-h-[76px] md:min-h-[88px]">

            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden z-10">
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 -ml-2 text-[#1A1A1A] hover:text-[#C9A84C] transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>

            {/* Centered Brand Heading: Logo + Text in single horizontal row */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Link href="/" className="pointer-events-auto flex items-center gap-3 md:gap-4 group">
                <Image
                  src="/logo.png"
                  alt="Urvi Designs Logo"
                  width={56}
                  height={56}
                  className="w-10 h-10 md:w-13 md:h-13 object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <h1 className="font-serif font-bold text-xl md:text-2xl lg:text-3xl tracking-[0.18em] uppercase text-[#1A1A1A] group-hover:text-[#C9A84C] transition-colors whitespace-nowrap leading-none">
                  URVI DESIGNS
                </h1>
              </Link>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center justify-end gap-1 md:gap-2 ml-auto z-10">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[#1A1A1A] hover:text-[#C9A84C] transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                href="/account"
                className="p-2 text-[#1A1A1A] hover:text-[#C9A84C] transition-colors hidden sm:block"
                aria-label="My Account"
              >
                <User size={20} />
              </Link>

              <button
                onClick={openCart}
                className="p-2 relative text-[#1A1A1A] hover:text-[#C9A84C] transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#1A1A1A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Bar Row: Centered single-line menu */}
          <div className="hidden lg:flex items-center justify-center border-t border-[#E8E4DC]/60 py-2.5">
            <nav
              ref={menuRef}
              className="flex items-center gap-7"
              onMouseLeave={() => setActiveMenu(null)}
            >
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative group">
                  {item.sub || item.mega ? (
                    <button
                      className={cn(
                        "flex items-center gap-1.5 py-1 text-[0.8125rem] font-medium tracking-widest uppercase transition-colors whitespace-nowrap",
                        activeMenu === item.label ? "text-[#C9A84C]" : "text-[#1A1A1A] hover:text-[#C9A84C]"
                      )}
                      onMouseEnter={() => setActiveMenu(item.label)}
                    >
                      {item.label}
                      <ChevronDown size={12} className={cn(
                        "transition-transform duration-200",
                        activeMenu === item.label ? "rotate-180" : ""
                      )} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-1 text-[0.8125rem] font-medium tracking-widest uppercase text-[#1A1A1A] hover:text-[#C9A84C] transition-colors whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Mega menu */}
                  {item.mega && item.columns && activeMenu === item.label && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[520px] bg-[#FAFAF8] border border-[#E8E4DC] shadow-medium animate-fade-in z-50"
                      onMouseEnter={() => setActiveMenu(item.label)}
                    >
                      <div className="p-7 grid grid-cols-2 gap-6">
                        {item.columns.map((col) => (
                          <div key={col.heading}>
                            <p className="text-[0.625rem] font-semibold tracking-[0.16em] uppercase text-[#C9A84C] mb-3">
                              {col.heading}
                            </p>
                            <ul className="space-y-2">
                              {col.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    href={link.href}
                                    className="text-sm text-[#5C5C5C] hover:text-[#1A1A1A] transition-colors"
                                    onClick={() => setActiveMenu(null)}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dropdown */}
                  {!item.mega && item.sub && activeMenu === item.label && (
                    <div
                      className="absolute top-full left-0 mt-0 w-52 bg-[#FAFAF8] border border-[#E8E4DC] shadow-medium animate-fade-in z-50"
                      onMouseEnter={() => setActiveMenu(item.label)}
                    >
                      <ul className="py-2">
                        {item.sub.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              className="block px-5 py-2.5 text-sm text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-[#F5F3EF] transition-colors"
                              onClick={() => setActiveMenu(null)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} categories={categories} />

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
