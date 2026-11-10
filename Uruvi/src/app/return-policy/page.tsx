import Link from "next/link";

export default function ReturnPolicyPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="container-urvi max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-8">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Return & Refund Policy</span>
        </div>

        <span className="section-label">Information</span>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-8 pb-4 border-b border-[#E8E4DC]">
          Return & Refund Policy
        </h1>

        <div className="space-y-6 text-sm text-[#5C5C5C] leading-relaxed">
          <p>
            Customer satisfaction is at the heart of <strong>URVI DESIGNS</strong>. If you are not completely satisfied with your purchase, we offer a hassle-free return and exchange process.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">1. 15-Day Return Window</h2>
          <p>
            You may request a return or size exchange within 15 days from the date of package delivery.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">2. Eligibility Criteria</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Item must be unused, unwashed, and in original condition with all original tags attached.</li>
            <li>Item must be returned in original brand packaging.</li>
            <li>Customized, altered, or final sale items are not eligible for returns.</li>
          </ul>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">3. Refund Process</h2>
          <p>
            Upon receiving and inspecting the returned item at our Trivandrum studio, refunds will be initiated within 3–5 business days to your original payment method or as store credit.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">4. How to Initiate a Return</h2>
          <p>
            To initiate a return, please contact our support team at urvibyajithapillai@gmail.com or WhatsApp us at +91 9895660061 with your Order ID.
          </p>
        </div>
      </div>
    </div>
  );
}
