"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate WP Customer Registration
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Account created successfully!");
    router.push("/account");
    setLoading(false);
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="container-urvi max-w-md">
        <div className="bg-white p-8 border border-[#E8E4DC] shadow-soft text-center">
          <span className="section-label">Join Urvi</span>
          <h1 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-2">Create Account</h1>
          <p className="text-xs text-[#5C5C5C] mb-8">Sign up to enjoy seamless checkout and exclusive edits.</p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
                placeholder="urvibyajithapillai@gmail.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field"
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5 justify-center mt-2">
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E8E4DC] text-xs text-[#5C5C5C]">
            Already have an account?{" "}
            <Link href="/account/login" className="font-semibold text-[#1A1A1A] hover:text-[#C9A84C]">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
