import { getDictionary } from "@/i18n";
import { getLangFromParams } from "@/i18n";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Game Guides',
  description: 'Search our database of game walkthroughs, boss guides, and strategy tips.',
};

export default async function SearchPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-white">{dict.search.searchButton}s</h1>

      <form className="mb-8">
        <div className="relative">
          <input
            type="text"
            name="q"
            placeholder='Search by game, boss, quest, or keyword... e.g. "Elden Ring Malenia"'
            className="w-full rounded-xl border border-gray-700 bg-gray-900 py-4 pl-5 pr-32 text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-purple-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
          >
            Search
          </button>
        </div>
      </form>

      <div className="space-y-1">
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
          Trending Searches
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Elden Ring DLC',
            'GTA 6',
            'BG3 Honour Mode',
            'Hollow Knight Silksong',
            'Monster Hunter Wilds',
            'Starfield ship builds',
            'Valorant agent tier list',
            'Elden Ring best builds',
          ].map((term) => (
            <a
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="rounded-full border border-gray-700 px-4 py-1.5 text-sm text-gray-400 transition-colors hover:border-purple-500 hover:text-purple-400"
            >
              {term}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
// Updated: 2026-05-26 - Phase 3 i18n