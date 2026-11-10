import { Shield, RotateCcw, Star, HeadphonesIcon } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: "Secure Payments",
    desc: "Your payments are always protected with end-to-end encryption",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "Simple 15-day return experience, no questions asked",
  },
  {
    icon: Star,
    title: "Quality Assured",
    desc: "Every piece is carefully inspected before it reaches you",
  },
  {
    icon: HeadphonesIcon,
    title: "Customer Support",
    desc: "Our team is here to help, every step of the way",
  },
];

export default function TrustSection() {
  return (
    <section className="section-py bg-[#FAFAF8] border-y border-[#E8E4DC]">
      <div className="container-urvi">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {TRUST_ITEMS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Icon size={28} className="text-[#C9A84C]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[0.75rem] font-semibold tracking-[0.1em] uppercase text-[#1A1A1A] mb-2">
                {title}
              </h3>
              <p className="text-[0.8125rem] text-[#9A9A9A] leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
