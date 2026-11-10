import Link from "next/link";

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="container-urvi max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-8">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Shipping Policy</span>
        </div>

        <span className="section-label">Information</span>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-8 pb-4 border-b border-[#E8E4DC]">
          Shipping & Delivery Policy
        </h1>

        <div className="space-y-6 text-sm text-[#5C5C5C] leading-relaxed">
          <p>
            At <strong>URVI DESIGNS</strong>, we strive to deliver your orders promptly and in pristine condition. All orders are carefully packaged and dispatched directly from our boutique studio in Trivandrum, Kerala.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">1. Order Processing Time</h2>
          <p>
            Standard in-stock orders are processed within 1 to 3 business days (excluding Sundays and national holidays). Custom tailored or pre-order pieces may require 7–10 business days for handcrafting.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">2. Shipping Charges & Delivery Timeline</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Free Standard Delivery:</strong> On all orders above ₹1,999 within India.</li>
            <li><strong>Standard Shipping Fee:</strong> Flat ₹150 for orders below ₹1,999.</li>
            <li><strong>Delivery Timeline:</strong> 3–5 business days for major metro cities across India; 5–7 business days for rest of India.</li>
          </ul>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">3. Order Tracking</h2>
          <p>
            Once your order is shipped, you will receive an email and WhatsApp message containing your courier tracking link.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">4. Address & Contact Support</h2>
          <p>
            Please ensure all shipping information (including PIN code and phone number) is accurate. For urgent address modifications, contact us immediately at +91 9895660061 or urvibyajithapillai@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
}
