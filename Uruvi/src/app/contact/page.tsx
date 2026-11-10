"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Thank you! Your message has been sent. We'll respond shortly.");
    setFormData({ name: "", email: "", phone: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="container-urvi">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-8">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Contact Us</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Connect With Us</span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4">
            We&apos;re Here to Help
          </h1>
          <p className="text-sm text-[#5C5C5C] leading-relaxed">
            Have a question about sizing, custom orders, or shipping? Reach out to our customer care team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Left */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 border border-[#E8E4DC] space-y-6">
              <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A]">URVI DESIGNS</h2>

              <div className="space-y-4 text-sm text-[#5C5C5C]">
                <div className="flex gap-3">
                  <MapPin size={20} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A1A1A] block">Boutique Address</span>
                    <p>Vellayambalam,</p>
                    <p>Trivandrum, Kerala 695010,</p>
                    <p>India</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone size={20} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A1A1A] block">Phone & WhatsApp</span>
                    <a href="tel:+919895660061" className="block hover:text-[#C9A84C]">+91 98956 60061</a>
                    <a href="tel:+919895669000" className="block hover:text-[#C9A84C]">+91 98956 69000</a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail size={20} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A1A1A] block">Email Support</span>
                    <a href="mailto:urvibyajithapillai@gmail.com" className="hover:text-[#C9A84C] break-all">
                      urvibyajithapillai@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock size={20} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A1A1A] block">Boutique Hours</span>
                    <p>Monday – Saturday: 10:00 AM – 7:30 PM IST</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <a
                href="https://wa.me/919895660061"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold w-full justify-center gap-2"
              >
                <MessageSquare size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form Right */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 border border-[#E8E4DC]">
              <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field"
                      placeholder="urvibyajithapillai@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                    placeholder="9895660061"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Your Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field"
                    placeholder="How can we assist you today?"
                  />
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary w-full py-4 justify-center gap-2">
                  {loading ? "Sending..." : <>Send Message <Send size={14} /></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
