import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.wordpress.com",
      },
      {
        protocol: "https",
        hostname: "**.wp.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      // Add your WooCommerce domain here
      {
        protocol: "https",
        hostname: process.env.WOOCOMMERCE_HOSTNAME || "localhost",
      },
      {
        protocol: "https",
        hostname: "navajowhite-koala-660348.hostingersite.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@heroicons/react"],
  },
};

export default nextConfig;
