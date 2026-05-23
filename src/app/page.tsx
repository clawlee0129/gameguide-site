import Link from 'next/link';
import { GameCard } from '@/components/game/GameCard';
import { GuideCard } from '@/components/guide/GuideCard';
import { categories } from '@/data/site';

const featuredGames = [
  {
    slug: 'elden-ring',
    title: 'Elden Ring',
    description: 'Complete walkthrough, boss guides, and build recommendations for the Lands Between.',
    coverImage: '/images/games/elden-ring.jpg',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    genres: ['Action RPG', 'Soulslike'],
    metacriticScore: 96,
    guideCount: 47,
  },
  {
    slug: 'baldurs-gate-3',
    title: "Baldur's Gate 3",
    description: 'Comprehensive quest guides, companion walkthroughs, and class builds.',
    coverImage: '/images/games/baldurs-gate-3.jpg',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    genres: ['RPG', 'Strategy'],
    metacriticScore: 96,
    guideCount: 38,
  },
  {
    slug: 'hollow-knight',
    title: 'Hollow Knight',
    description: 'Map guides, boss strategies, and charm combinations for Hallownest.',
    coverImage: '/images/games/hollow-knight.jpg',
    platforms: ['PC', 'Switch', 'PS4', 'Xbox One'],
    genres: ['Metroidvania', 'Indie'],
    metacriticScore: 87,
    guideCount: 25,
  },
  {
    slug: 'starfield',
    title: 'Starfield',
    description: 'Faction quests, ship building, and exploration guides for the Settled Systems.',
    coverImage: '/images/games/starfield.jpg',
    platforms: ['PC', 'Xbox Series X'],
    genres: ['RPG', 'Open World'],
    metacriticScore: 83,
    guideCount: 32,
  },
];

const latestGuides = [
  {
    slug: 'elden-ring-malenia-guide',
    title: 'Elden Ring: How to Defeat Malenia, Blade of Miquella - Complete Boss Guide',
    excerpt: 'Master the hardest boss in Elden Ring with our step-by-step strategy guide covering all phases, recommended builds, and cheese methods.',
    gameTitle: 'Elden Ring',
    gameSlug: 'elden-ring',
    difficulty: 'expert' as const,
    readingTime: 12,
    publishedAt: new Date('2026-05-22'),
    coverImage: '/images/guides/malenia.jpg',
  },
  {
    slug: 'bg3-honour-mode-guide',
    title: "Baldur's Gate 3 Honour Mode: Ultimate Survival Guide & Best Party Comps",
    excerpt: 'Everything you need to know to beat Honour Mode in BG3, including optimal party composition, legendary action counters, and boss-specific tactics.',
    gameTitle: "Baldur's Gate 3",
    gameSlug: 'baldurs-gate-3',
    difficulty: 'expert' as const,
    readingTime: 18,
    publishedAt: new Date('2026-05-21'),
    coverImage: '/images/guides/bg3-honour.jpg',
  },
  {
    slug: 'hollow-knight-pantheon-guide',
    title: 'Hollow Knight: Pantheon of Hallownest - All Bosses Guide & Charm Builds',
    excerpt: 'Conquer the ultimate challenge in Hollow Knight with detailed strategies for every boss in the Pantheon of Hallownest.',
    gameTitle: 'Hollow Knight',
    gameSlug: 'hollow-knight',
    difficulty: 'advanced' as const,
    readingTime: 15,
    publishedAt: new Date('2026-05-20'),
    coverImage: '/images/guides/pantheon.jpg',
  },
  {
    slug: 'starfield-best-ships',
    title: 'Starfield: Top 10 Best Ships & How to Get Them - Ultimate Ship Guide',
    excerpt: 'Discover the best ships in Starfield, from the Razorleaf to the Starborn Guardian, with detailed stats and acquisition methods.',
    gameTitle: 'Starfield',
    gameSlug: 'starfield',
    difficulty: 'beginner' as const,
    readingTime: 10,
    publishedAt: new Date('2026-05-19'),
    coverImage: '/images/guides/starfield-ships.jpg',
  },
  {
    slug: 'elden-ring-best-builds',
    title: 'Elden Ring: Top 15 Best Builds for 2026 - PvE & PvP Meta Guide',
    excerpt: 'Updated for the latest patch. Discover the most powerful builds in Elden Ring, from Bleed builds to Sorcery nukes.',
    gameTitle: 'Elden Ring',
    gameSlug: 'elden-ring',
    difficulty: 'intermediate' as const,
    readingTime: 14,
    publishedAt: new Date('2026-05-18'),
    coverImage: '/images/guides/elden-builds.jpg',
  },
  {
    slug: 'bg3-romance-guide',
    title: "Baldur's Gate 3: Complete Romance Guide - All Companions & Approval Tips",
    excerpt: 'Unlock every romance option in BG3 with our comprehensive guide covering all companions, approval thresholds, and key dialogue choices.',
    gameTitle: "Baldur's Gate 3",
    gameSlug: 'baldurs-gate-3',
    difficulty: 'beginner' as const,
    readingTime: 8,
    publishedAt: new Date('2026-05-17'),
    coverImage: '/images/guides/bg3-romance.jpg',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-br from-gray-900 via-purple-950/30 to-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Master Every Game.
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              No Spoilers, Just Wins.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            Expert walkthroughs, boss strategies, and build guides for the
            world&apos;s most challenging games. Written by gamers, for gamers.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/games"
              className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
            >
              Browse Games
            </Link>
            <Link
              href="/guides"
              className="rounded-lg border border-gray-600 px-6 py-3 text-sm font-semibold text-gray-200 transition-colors hover:border-gray-400 hover:text-white"
            >
              Latest Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Featured Games</h2>
          <Link
            href="/games"
            className="text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
          >
            View All Games →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredGames.map((game) => (
            <GameCard key={game.slug} {...game} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-gray-800 bg-gray-900/50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-white">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-sm font-medium text-gray-300 transition-all hover:border-purple-500/50 hover:bg-gray-800 hover:text-white"
              >
                <span className="text-lg">{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Guides */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Latest Guides</h2>
          <Link
            href="/guides"
            className="text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
          >
            View All Guides →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestGuides.map((guide) => (
            <GuideCard key={guide.slug} {...guide} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 bg-gradient-to-r from-purple-950/40 to-gray-900 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Stuck on a boss? We&apos;ve got you covered.
          </h2>
          <p className="mt-4 text-gray-300">
            Join thousands of gamers who use GameGuide Pro to conquer the
            toughest challenges. New guides added daily.
          </p>
          <div className="mt-8">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
            >
              Search for a Guide
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}