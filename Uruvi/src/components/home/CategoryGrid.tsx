import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/woocommerce/categories";
import { ACFHomePage } from "@/lib/wordpress/pages";

interface CategoryGridProps {
  acf?: ACFHomePage | null;
}

export default async function CategoryGrid({ acf }: CategoryGridProps) {
  let fetchedCategories: any[] = [];
  try {
    // Fetch top-level categories, max 8
    fetchedCategories = await getCategories({ parent: 0, hideEmpty: true, perPage: 8 });
  } catch {}

  // If WooCommerce fails to load categories, we don't show the grid
  if (!fetchedCategories || fetchedCategories.length === 0) return null;

  const label = acf?.category_grid_label || "Browse";
  const title = acf?.category_grid_title || "Shop By Category";

  return (
    <section className="section-py bg-[#F5F3EF]">
      <div className="container-urvi">
        <div className="section-header">
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {fetchedCategories.slice(0, 8).map((cat, i) => {
            // Check if ACF overrides this specific category
            const customLabel = acf?.[`category_${i + 1}_label` as keyof ACFHomePage];
            const customSlug = acf?.[`category_${i + 1}_slug` as keyof ACFHomePage];
            const customImage = acf?.[`category_${i + 1}_image` as keyof ACFHomePage];

            const displayLabel = customLabel || cat.name;
            const displaySlug = customSlug || cat.slug;
            const displayImage = customImage || cat.image?.src;

            return (
              <Link
                key={cat.id || i}
                href={`/shop/${displaySlug}`}
                className="group relative overflow-hidden block aspect-square bg-[#EDE9E0]"
              >
                {displayImage ? (
                  <Image
                    src={displayImage as string}
                    alt={displayLabel as string}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center p-4 text-center">
                    <span className="font-serif text-white text-lg font-semibold">{displayLabel}</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="font-serif text-white text-lg font-semibold leading-tight">
                    {displayLabel}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
