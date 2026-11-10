import { wpFetch } from "@/lib/woocommerce/client";

export interface ACFHomePage {
  hero_label?: string;
  hero_headline_1?: string;
  hero_headline_2?: string;
  hero_headline_3?: string;
  hero_subtext?: string;
  hero_image?: string | false;
  hero_image_mobile?: string | false;
  // Allow dynamic fields from ACF
  [key: string]: any;
}

export interface WPPage {
  id: number;
  title: { rendered: string };
  acf?: ACFHomePage;
}

export async function getHomePageData(): Promise<ACFHomePage | null> {
  try {
    // Fetch the page with slug "home"
    const pages = await wpFetch<WPPage[]>("pages", { slug: "home", _fields: "id,title,acf" });
    
    if (pages && pages.length > 0) {
      return pages[0].acf || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching homepage ACF data:", error);
    return null;
  }
}
