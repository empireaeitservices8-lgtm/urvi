"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown, ChevronRight, User, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: { name: string; slug: string }[];
}

export default function MobileMenu({ isOpen, onClose, categories = [] }: MobileMenuProps) {
  const dynamicCategoryLinks = [
    { label: "All Products", href: "/shop" },
    ...categories.map(c => ({ label: c.name, href: `/shop/${c.slug}` }))
  ];

  const MENU_ITEMS = [
    { label: "Home", href: "/" },
    {
      label: "Collections",
      href: "/collections",
      sub: dynamicCategoryLinks,
    },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const [expanded, setExpanded] = useState<string | null>(null);
  const { count: cartCount, openCart } = useCart();

  const toggle = (label: string) => setExpanded((e) => (e === label ? null : label));

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-[320px] max-w-[90vw] bg-[#FAFAF8] z-50 flex flex-col transition-transform duration-350 ease-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DC]">
          <Link href="/" onClick={onClose}>
            <Image src="/logo.png" alt="Urvi Designs" width={40} height={40} className="w-9 h-9 object-contain" />
          </Link>
          <button onClick={onClose} className="p-1 text-[#1A1A1A] hover:text-[#C9A84C] transition-colors" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {MENU_ITEMS.map((item) => (
            <div key={item.label} className="border-b border-[#E8E4DC]/50">
              {item.sub ? (
                <>
                  <button
                    onClick={() => toggle(item.label)}
                    className="flex items-center justify-between w-full px-5 py-4 text-[0.875rem] font-medium tracking-wide text-[#1A1A1A]"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={cn("transition-transform duration-200 text-[#9A9A9A]", expanded === item.label ? "rotate-180" : "")}
                    />
                  </button>
                  {expanded === item.label && (
                    <div className="bg-[#F5F3EF] px-5 py-2">
                      {item.sub.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={onClose}
                          className="flex items-center gap-2 py-2.5 text-sm text-[#5C5C5C] hover:text-[#1A1A1A] transition-colors"
                        >
                          <ChevronRight size={12} className="text-[#C9A84C]" />
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block px-5 py-4 text-[0.875rem] font-medium tracking-wide text-[#1A1A1A] hover:text-[#C9A84C] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-[#E8E4DC] p-5">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-3 border border-[#E8E4DC] text-xs text-[#5C5C5C] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
            >
              <User size={18} />
              Account
            </Link>
            <button
              onClick={() => { openCart(); onClose(); }}
              className="flex items-center justify-center gap-2 py-3 border border-[#E8E4DC] text-xs text-[#5C5C5C] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors relative"
            >
              <ShoppingBag size={18} />
              Cart
              {cartCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Contact info */}
          <div className="text-xs text-[#9A9A9A] space-y-0.5">
            <p>📞 9895660061 / 9895669000</p>
            <p>📧 urvibyajithapillai@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
}
