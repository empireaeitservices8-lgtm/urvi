import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen flex items-center justify-center py-20">
      <div className="container-urvi max-w-md text-center">
        <span className="font-serif text-7xl font-bold text-[#C9A84C] block mb-2">404</span>
        <span className="section-label">Page Not Found</span>
        <h1 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-4">
          Looking for Something Beautiful?
        </h1>
        <p className="text-sm text-[#5C5C5C] mb-8 leading-relaxed">
          The page you are looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back to exploring our collections.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-primary">
            Return to Homepage
          </Link>
          <Link href="/shop" className="btn btn-outline">
            Browse All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
