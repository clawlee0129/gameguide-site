import { Metadata } from 'next';
import Link from 'next/link';

// In production, this would fetch from MongoDB based on slug
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Elden Ring Guide',
    description: 'Complete Elden Ring walkthrough with boss guides, build recommendations, and map locations.',
  };
}

export default function GamePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Game Header */}
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <span>/</span>
          <Link href="/games" className="hover:text-gray-300">
            Games
          </Link>
          <span>/</span>
          <span className="text-gray-400">Elden Ring</span>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-shrink-0">
            <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-700">
              <span className="text-6xl font-black text-gray-600 opacity-50">E</span>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">Elden Ring</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded bg-green-600 px-2 py-0.5 text-xs font-bold text-white">
                96
              </span>
              <span className="rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-400">
                Action RPG
              </span>
              <span className="rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-400">
                Soulslike
              </span>
              <span className="text-xs text-gray-500">·</span>
              <span className="text-xs text-gray-500">PC / PS5 / Xbox Series X</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Complete walkthrough, boss guides, and build recommendations for the Lands Between.
              Master every region, defeat every boss, and uncover every secret in FromSoftware&apos;s
              masterpiece.
            </p>
          </div>
        </div>
      </div>

      {/* Guide Sections */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Guides ({47})</h2>
        <div className="grid gap-4">
          {[
            { title: 'How to Defeat Malenia, Blade of Miquella', difficulty: 'Expert', time: 12 },
            { title: 'Top 15 Best Builds for 2026 - PvE & PvP Meta', difficulty: 'Intermediate', time: 14 },
            { title: 'Complete Map Guide - All Locations & Sites of Grace', difficulty: 'Beginner', time: 20 },
            { title: 'All Remembrance Bosses - Rankings & Strategies', difficulty: 'Advanced', time: 16 },
            { title: 'Legendary Armaments - All 9 Locations', difficulty: 'Beginner', time: 8 },
            { title: 'Ranni Questline - Complete Walkthrough', difficulty: 'Intermediate', time: 10 },
          ].map((guide, i) => (
            <Link
              key={i}
              href={`/guides/elden-ring-guide-${i}`}
              className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 p-4 transition-all hover:border-purple-500/30 hover:bg-gray-850"
            >
              <div>
                <h3 className="font-medium text-white transition-colors hover:text-purple-400">
                  {guide.title}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                  <span>{guide.time} min read</span>
                  <span>·</span>
                  <span className="text-purple-400">{guide.difficulty}</span>
                </div>
              </div>
              <svg
                className="h-4 w-4 flex-shrink-0 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}