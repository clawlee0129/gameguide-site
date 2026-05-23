import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Latest Guides',
  description:
    'Latest game walkthroughs, boss guides, build tutorials, and strategy tips. Updated daily.',
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-white">Latest Guides</h1>
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-12 text-center">
        <p className="text-gray-400">
          Guide listing page. Content dynamically loaded from the database.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-medium text-purple-400 hover:text-purple-300"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}