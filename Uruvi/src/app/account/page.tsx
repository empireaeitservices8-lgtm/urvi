"use client";
import { useState } from "react";
import Link from "next/link";
import { User, Package, MapPin, Heart, LogOut, ExternalLink } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { formatPrice } from "@/lib/utils";

export default function AccountDashboardPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "details">("orders");
  const { items: wishlistItems } = useWishlist();

  // Mock WooCommerce customer orders
  const mockOrders = [
    {
      id: "URV-849201",
      date: "August 8, 2026",
      status: "Processing",
      total: "₹4,499",
      items: "Handcrafted Silk Anarkali Kurta Set (x1)",
    },
    {
      id: "URV-731902",
      date: "July 22, 2026",
      status: "Delivered",
      total: "₹3,999",
      items: "Handwoven Cotton Saree (x1)",
    },
  ];

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="container-urvi">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8E4DC]">
          <div>
            <span className="section-label">Account</span>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A]">
              My Account
            </h1>
          </div>
          <Link href="/account/login" className="btn btn-outline text-xs py-2">
            <LogOut size={14} /> Sign Out
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-1">
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left ${
                activeTab === "orders" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#5C5C5C] hover:bg-[#F5F3EF]"
              }`}
            >
              <Package size={16} /> My Orders
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left ${
                activeTab === "addresses" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#5C5C5C] hover:bg-[#F5F3EF]"
              }`}
            >
              <MapPin size={16} /> Addresses
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left ${
                activeTab === "details" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#5C5C5C] hover:bg-[#F5F3EF]"
              }`}
            >
              <User size={16} /> Account Details
            </button>
            <Link
              href="/wishlist"
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium bg-white text-[#5C5C5C] hover:bg-[#F5F3EF] transition-colors"
            >
              <span className="flex items-center gap-3"><Heart size={16} /> Wishlist</span>
              <span className="text-xs font-bold bg-[#C9A84C] text-white px-2 py-0.5 rounded-full">{wishlistItems.length}</span>
            </Link>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9 bg-white border border-[#E8E4DC] p-6 lg:p-8">
            {activeTab === "orders" && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-6">Order History</h2>
                {mockOrders.length > 0 ? (
                  <div className="divide-y divide-[#E8E4DC]">
                    {mockOrders.map((ord) => (
                      <div key={ord.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-sm text-[#1A1A1A]">{ord.id}</span>
                            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 ${
                              ord.status === "Delivered" ? "bg-[#2D7D46]/10 text-[#2D7D46]" : "bg-[#C9A84C]/15 text-[#C9A84C]"
                            }`}>
                              {ord.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#9A9A9A] mt-1">{ord.date} &nbsp;•&nbsp; {ord.items}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-serif font-bold text-base text-[#1A1A1A]">{ord.total}</span>
                          <button className="text-xs text-[#C9A84C] hover:underline flex items-center gap-1 font-medium">
                            Details <ExternalLink size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#5C5C5C]">No orders placed yet.</p>
                )}
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-6">Saved Addresses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-[#E8E4DC] p-4 text-xs text-[#5C5C5C] space-y-1">
                    <span className="font-semibold text-[#1A1A1A] block mb-2 text-sm">Default Shipping Address</span>
                    <p className="font-medium text-[#1A1A1A]">Ajitha Pillai</p>
                    <p>Vellayambalam</p>
                    <p>Trivandrum, Kerala 695010</p>
                    <p>Phone: +91 9895660061</p>
                    <button className="text-xs text-[#C9A84C] underline pt-2">Edit Address</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-6">Account Details</h2>
                <form className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Full Name</label>
                    <input type="text" defaultValue="Ajitha Pillai" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Email Address</label>
                    <input type="email" defaultValue="urvibyajithapillai@gmail.com" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Phone</label>
                    <input type="tel" defaultValue="9895660061" className="input-field" />
                  </div>
                  <button type="button" className="btn btn-primary text-xs py-2.5">
                    Update Details
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
