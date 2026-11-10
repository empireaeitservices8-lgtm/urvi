import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Package, ArrowRight, Phone, Mail } from "lucide-react";

interface OrderConfirmationProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function OrderConfirmationPage({ searchParams }: OrderConfirmationProps) {
  const { orderId = "URV-849201" } = await searchParams;

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="container-urvi max-w-xl text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image
            src="/logo.png"
            alt="Urvi Designs Logo"
            width={56}
            height={56}
            className="w-14 h-14 object-contain rounded-full shadow-sm"
          />
        </div>
        <div className="w-16 h-16 bg-[#2D7D46]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#2D7D46]">
          <CheckCircle2 size={36} />
        </div>

        <span className="section-label">Thank You For Your Order</span>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-3">
          Order Confirmed!
        </h1>
        <p className="text-sm text-[#5C5C5C] leading-relaxed mb-6">
          We&apos;re getting your handcrafted order ready. We will send you shipping updates via email and WhatsApp.
        </p>

        <div className="bg-[#F5F3EF] border border-[#E8E4DC] p-6 mb-8 text-left space-y-3">
          <div className="flex justify-between text-xs pb-3 border-b border-[#E8E4DC]">
            <span className="text-[#9A9A9A] uppercase tracking-wider font-semibold">Order ID</span>
            <span className="font-mono font-bold text-[#1A1A1A]">{orderId}</span>
          </div>
          <div className="flex justify-between text-xs pb-3 border-b border-[#E8E4DC]">
            <span className="text-[#9A9A9A] uppercase tracking-wider font-semibold">Dispatch Address</span>
            <span className="text-[#1A1A1A] font-medium">Vellayambalam, Trivandrum, Kerala 695010</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#9A9A9A] uppercase tracking-wider font-semibold">Estimated Delivery</span>
            <span className="text-[#2D7D46] font-semibold">3 – 5 Business Days</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/shop" className="btn btn-primary w-full justify-center">
            Continue Shopping <ArrowRight size={16} />
          </Link>
          <Link href="/account" className="btn btn-outline w-full justify-center">
            View Order Status
          </Link>
        </div>

        <div className="mt-12 pt-6 border-t border-[#E8E4DC] text-xs text-[#9A9A9A] space-y-1">
          <p>Need help with your order?</p>
          <p>📞 9895660061 / 9895669000 &nbsp;|&nbsp; 📧 urvibyajithapillai@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
