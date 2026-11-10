import { getRootCategories } from "@/lib/woocommerce/categories";
import Header from "./Header";

export default async function HeaderWrapper() {
  let categories: { name: string; slug: string }[] = [];
  try {
    const cats = await getRootCategories();
    categories = cats.map(c => ({ name: c.name, slug: c.slug }));
  } catch {}

  return <Header categories={categories} />;
}
