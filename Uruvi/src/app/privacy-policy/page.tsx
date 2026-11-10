import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="container-urvi max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-8">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Privacy Policy</span>
        </div>

        <span className="section-label">Legal</span>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-8 pb-4 border-b border-[#E8E4DC]">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-sm text-[#5C5C5C] leading-relaxed">
          <p>
            <strong>URVI DESIGNS</strong> respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">1. Data We Collect</h2>
          <p>
            We collect personal information that you provide voluntarily when creating an account, placing an order, or subscribing to our newsletter (e.g., name, email address, phone number, shipping address).
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to process orders, communicate delivery updates, respond to customer inquiries, and send promotional newsletters (only if opted in).
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">3. Data Security</h2>
          <p>
            We implement robust technical and organizational security measures to prevent unauthorized access, disclosure, or modification of your personal data.
          </p>

          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pt-4">4. Contact Us</h2>
          <p>
            For privacy inquiries, reach us at urvibyajithapillai@gmail.com or visit our store in Trivandrum, Kerala 695010.
          </p>
        </div>
      </div>
    </div>
  );
}
