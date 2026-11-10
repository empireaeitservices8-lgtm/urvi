"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // TODO: Connect to WooCommerce newsletter / Mailchimp
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Welcome to the Urvi Circle! 🌸");
    setEmail("");
    setLoading(false);
  };

  return (
    <section className="bg-[#F5F3EF] border-y border-[#E8E4DC]">
      <div className="container-urvi py-16 lg:py-20">
        <div className="max-w-xl mx-auto text-center">
          <span className="section-label">Newsletter</span>
          <h2 className="font-serif text-[#1A1A1A] text-[clamp(1.75rem,3.5vw,2.75rem)] mb-4">
            Stay in the Urvi Circle
          </h2>
          <p className="text-sm text-[#5C5C5C] mb-8 leading-relaxed">
            Be the first to discover new collections, exclusive edits, and special offers. No spam — only the good stuff.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="input-field flex-1"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-shrink-0"
            >
              {loading ? "Subscribing..." : (
                <>Subscribe <ArrowRight size={14} /></>
              )}
            </button>
          </form>

          <p className="text-xs text-[#9A9A9A] mt-4">
            By subscribing, you agree to our{" "}
            <a href="/privacy-policy" className="underline hover:text-[#1A1A1A] transition-colors">
              Privacy Policy
            </a>
            . Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
