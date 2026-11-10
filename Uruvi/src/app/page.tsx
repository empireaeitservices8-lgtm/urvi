import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import NewArrivals from "@/components/home/NewArrivals";
import MensSection from "@/components/home/MensSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import EditorialSection from "@/components/home/EditorialSection";
import BestSellers from "@/components/home/BestSellers";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";
import TrustSection from "@/components/home/TrustSection";
import { getHomePageData } from "@/lib/wordpress/pages";

export default async function HomePage() {
  const acfData = await getHomePageData();

  return (
    <>
      <Hero acf={acfData} />
      <FeaturedCollections acf={acfData} />
      <MensSection acf={acfData} />
      <NewArrivals acf={acfData} />
      <CategoryGrid acf={acfData} />
      <EditorialSection />
      <BestSellers acf={acfData} />
      <PromoBanner />
      <Testimonials />
      <TrustSection />
    </>
  );
}
