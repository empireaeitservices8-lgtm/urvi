"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 15;
      });
    }, 120);

    // Hide preloader after progress finishes
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    }, 1300);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1A1A1A] text-white transition-opacity duration-500 ease-out select-none",
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      {/* Background ambient glow */}
      <div className="absolute w-72 h-72 rounded-full bg-[#C9A84C]/10 blur-3xl animate-pulse pointer-events-none" />

      {/* Content Container */}
      <div className="relative flex flex-col items-center z-10 px-6 text-center">
        {/* Logo Icon with golden pulse ring */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 rounded-full border border-[#C9A84C]/40 animate-ping" />
          <Image
            src="/logo.png"
            alt="Urvi Designs Logo"
            width={84}
            height={84}
            className="w-18 h-18 md:w-22 md:h-22 object-contain rounded-full shadow-2xl relative z-10"
            priority
          />
        </div>

        {/* Brand Heading */}
        <h1 className="font-serif font-bold text-2xl md:text-3xl tracking-[0.25em] uppercase text-white mb-2">
          URVI DESIGNS
        </h1>

        {/* Subtitle */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C] font-light mb-8">
          Contemporary Fashion
        </p>

        {/* Progress Bar Container */}
        <div className="w-48 md:w-56 h-[2px] bg-[#333333] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#C9A84C] via-[#F3E5AB] to-[#C9A84C] transition-all duration-200 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
