import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="container-urvi max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-8">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Terms & Conditions</span>
        </div>

        <span className="section-label">Legal</span>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-8 pb-4 border-b border-[#E8E4DC]">
          Terms & Conditions
        </h1>

        <div className="space-y-6 text-sm text-[#5C5C5C] leading-relaxed">
          <p>
            Welcome to <strong>URVI DESIGNS</strong>. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">1. Intellectual Property</h2>
          <p>
            All content on this website—including images, text, logos, graphics, and apparel designs—is the exclusive property of URVI DESIGNS and protected by copyright laws.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">2. Product Colors & Accuracy</h2>
          <p>
            We make every effort to display product colors and details accurately. However, actual colors may vary slightly depending on your screen settings or handloom fabric variations.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">3. Pricing & Availability</h2>
          <p>
            Prices are listed in Indian Rupees (INR) and inclusive of taxes. We reserve the right to update prices or modify product availability at any time without prior notice.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">4. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of Kerala, India.
          </p>
        </div>
      </div>
    </div>
  );
}
