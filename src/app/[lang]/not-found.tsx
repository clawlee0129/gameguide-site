import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] flex items-center justify-center">
      <div className="text-center px-6 max-w-lg">
        <h1 className="text-8xl font-extrabold text-[#6C3FB7] mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-[#a0a0a0] mb-8">
          Page not found
        </p>
        <p className="text-gray-500 dark:text-[#808080] mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/en"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#6C3FB7] text-white rounded-lg hover:bg-[#5a2fa3] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/en/guides"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-[#2a2a2a] text-gray-700 dark:text-[#e0e0e0] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
          >
            Browse Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
