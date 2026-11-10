import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import Preloader from "@/components/ui/Preloader";
import { Toaster } from "react-hot-toast";
import { getRootCategories } from "@/lib/woocommerce/categories";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Urvi Designs — Contemporary Indian Fashion",
    template: "%s | Urvi Designs",
  },
  description:
    "Discover contemporary Indian fashion at Urvi Designs — thoughtfully crafted kurtas, sarees, dresses, and more. Premium quality clothing from Trivandrum, Kerala.",
  keywords: [
    "Indian fashion",
    "contemporary kurta",
    "sarees",
    "ethnic wear",
    "women clothing",
    "Urvi Designs",
    "Trivandrum fashion",
    "Kerala boutique",
  ],
  authors: [{ name: "Urvi Designs" }],
  creator: "Urvi Designs",
  publisher: "Urvi Designs",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://urvi.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXTAUTH_URL || "https://urvi.com",
    siteName: "Urvi Designs",
    title: "Urvi Designs — Contemporary Indian Fashion",
    description:
      "Contemporary silhouettes rooted in timeless Indian style. Shop kurtas, sarees, dresses, and more from Urvi Designs, Trivandrum.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Urvi Designs — Contemporary Indian Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Urvi Designs — Contemporary Indian Fashion",
    description:
      "Contemporary silhouettes rooted in timeless Indian style. Shop from Urvi Designs.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.png" }, { url: "/favicon.ico" }],
    apple: [{ url: "/logo.png" }],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch categories from WooCommerce on the server
  let categories: { name: string; slug: string }[] = [];
  try {
    const cats = await getRootCategories();
    categories = cats.map(c => ({ name: c.name, slug: c.slug }));
    console.log("[LAYOUT] Fetched categories:", JSON.stringify(categories));
  } catch (err) {
    console.error("[LAYOUT] Failed to fetch categories:", err);
  }

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAFAF8]">
        <Preloader />
        <CartProvider>
          <WishlistProvider>
            <Header categories={categories} />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
                  borderRadius: "0",
                  background: "#1A1A1A",
                  color: "#FAFAF8",
                },
                duration: 3000,
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
