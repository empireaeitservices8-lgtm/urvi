"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Kerala",
    pincode: "",
    paymentMethod: "upi",
  });

  const shipping = subtotal > 1999 ? 0 : 150;
  const grandTotal = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.paymentMethod === "upi") {
        const res = await loadRazorpay();
        if (!res) {
          toast.error("Razorpay SDK failed to load");
          setLoading(false);
          return;
        }

        const orderRes = await fetch("/api/razorpay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: grandTotal }),
        });
        const orderData = await orderRes.json();

        if (!orderRes.ok) throw new Error(orderData.error);

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.order.amount,
          currency: orderData.order.currency,
          name: "Urvi Designs",
          description: "Purchase from Urvi Designs",
          order_id: orderData.order.id,
          handler: async function (response: any) {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              clearCart();
              toast.success("Payment Successful!");
              router.push(`/order-confirmation?orderId=URV-${Math.floor(100000 + Math.random() * 900000)}`);
            } else {
              toast.error("Payment verification failed");
              setLoading(false);
            }
          },
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#C9A84C",
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        // @ts-ignore
        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", function (response: any) {
          toast.error(response.error.description);
          setLoading(false);
        });
        paymentObject.open();
      } else {
        // Simulate WooCommerce Order API endpoint integration
        await new Promise((resolve) => setTimeout(resolve, 1500));
        clearCart();
        toast.success("Order Placed Successfully!");
        router.push(`/order-confirmation?orderId=URV-${Math.floor(100000 + Math.random() * 900000)}`);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error(error);
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-urvi py-20 text-center">
        <h1 className="font-serif text-3xl mb-4">Your bag is empty</h1>
        <p className="text-sm text-[#5C5C5C] mb-6">Add products to your cart before proceeding to checkout.</p>
        <Link href="/shop" className="btn btn-primary">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-10">
      <div className="container-urvi">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8E4DC]">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Urvi Designs Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-serif text-2xl font-semibold text-[#1A1A1A] group-hover:text-[#C9A84C] transition-colors">
              URVI DESIGNS
            </span>
          </Link>
          <div className="flex items-center gap-1 text-xs text-[#5C5C5C]">
            <Lock size={14} className="text-[#C9A84C]" /> Secure Checkout
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Checkout Steps Left */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact Info */}
            <div className="bg-white p-6 border border-[#E8E4DC] space-y-4">
              <h2 className="font-serif text-xl font-semibold text-[#1A1A1A]">1. Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="urvibyajithapillai@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="9895660061"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 border border-[#E8E4DC] space-y-4">
              <h2 className="font-serif text-xl font-semibold text-[#1A1A1A]">2. Delivery Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="House No, Street, Vellayambalam"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Trivandrum"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="695010"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 border border-[#E8E4DC] space-y-4">
              <h2 className="font-serif text-xl font-semibold text-[#1A1A1A]">3. Payment Method</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 border border-[#C9A84C] bg-[#FDFCF9]">
                  <CheckCircle2 className="text-[#C9A84C]" size={20} />
                  <div>
                    <span className="font-medium text-sm text-[#1A1A1A] block">UPI / Razorpay / Cards / NetBanking</span>
                    <span className="text-xs text-[#9A9A9A]">Instant payment via GPay, PhonePe, Paytm, or Credit/Debit Card.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Right */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 lg:p-8 border border-[#E8E4DC] space-y-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] pb-3 border-b border-[#E8E4DC]">
                Order Summary ({items.length})
              </h2>

              <div className="divide-y divide-[#E8E4DC] max-h-60 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.key} className="py-3 flex gap-3 items-center">
                    <div className="relative w-14 h-16 bg-[#F5F3EF] flex-shrink-0">
                      {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-medium text-[#1A1A1A] line-clamp-1">{item.name}</p>
                      <p className="text-[#9A9A9A]">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold">{formatPrice(parseFloat(item.price) * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm border-t border-[#E8E4DC] pt-4">
                <div className="flex justify-between text-[#5C5C5C]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1A1A1A]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#5C5C5C]">
                  <span>Shipping</span>
                  <span className="font-medium text-[#1A1A1A]">
                    {shipping === 0 ? <span className="text-[#2D7D46]">FREE</span> : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E4DC] flex justify-between items-baseline">
                <span className="font-semibold text-[#1A1A1A]">Total Payable</span>
                <span className="font-serif text-2xl font-bold text-[#1A1A1A]">{formatPrice(grandTotal)}</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-4 text-sm justify-center disabled:opacity-50"
              >
                {loading ? "Processing Order..." : "Place Order"}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#9A9A9A] pt-2">
                <ShieldCheck size={16} className="text-[#C9A84C]" />
                100% Encrypted & Safe Checkout
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
