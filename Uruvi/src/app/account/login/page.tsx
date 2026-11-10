"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate WP JWT Auth
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Logged in successfully!");
    router.push("/account");
    setLoading(false);
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="container-urvi max-w-md">
        <div className="bg-white p-8 border border-[#E8E4DC] shadow-soft text-center">
          <span className="section-label">Welcome Back</span>
          <h1 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-2">Sign In</h1>
          <p className="text-xs text-[#5C5C5C] mb-8">Access your orders, wishlist, and account preferences.</p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="urvibyajithapillai@gmail.com"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-[#1A1A1A]">Password</label>
                <Link href="#" className="text-xs text-[#C9A84C] hover:underline">Forgot?</Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5 justify-center mt-2">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E8E4DC] text-xs text-[#5C5C5C]">
            Don&apos;t have an account?{" "}
            <Link href="/account/register" className="font-semibold text-[#1A1A1A] hover:text-[#C9A84C]">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
