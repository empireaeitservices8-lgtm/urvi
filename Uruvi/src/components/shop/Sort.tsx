"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Featured", value: "menu_order" },
  { label: "Newest", value: "date" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Selling", value: "popularity" },
  { label: "Customer Rating", value: "rating" },
];

export default function Sort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "menu_order";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative inline-flex items-center gap-2">
      <span className="text-xs text-[#9A9A9A] uppercase tracking-wider hidden sm:inline">
        Sort By:
      </span>
      <div className="relative">
        <select
          value={currentSort}
          onChange={handleChange}
          className="appearance-none bg-[#FAFAF8] border border-[#E8E4DC] text-xs font-medium text-[#1A1A1A] py-2 pl-3 pr-8 rounded-none cursor-pointer focus:outline-none focus:border-[#C9A84C]"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9A9A9A] pointer-events-none"
        />
      </div>
    </div>
  );
}
