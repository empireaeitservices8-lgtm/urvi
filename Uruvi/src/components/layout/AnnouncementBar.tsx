"use client";
import { useState, useEffect } from "react";

const MESSAGES = [
  "✦  CRAFTED FOR YOUR EVERYDAY ELEGANCE  ✦",
  "✦  FREE SHIPPING ON ORDERS ABOVE ₹1999  ✦",
  "✦  HANDCRAFTED IN KERALA, INDIA  ✦",
  "✦  EASY 15-DAY RETURNS  ✦",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-[#1A1A1A] text-[#C9A84C] py-2.5 text-center overflow-hidden">
      <p
        key={index}
        className="text-[0.6875rem] font-medium tracking-[0.14em] uppercase animate-fade-in"
      >
        {MESSAGES[index]}
      </p>
    </div>
  );
}
