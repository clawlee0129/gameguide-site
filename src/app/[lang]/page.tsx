import { getDictionary } from "@/i18n";
import { getLangFromParams } from "@/i18n";
import Link from 'next/link';
import { GameCard } from '@/components/game/GameCard';
import { GuideCard } from '@/components/guide/GuideCard';
import { AdBanner } from '@/components/ads/AdBanner';
import { categories } from '@/data/site';
import { sampleGuides, sampleGames, getGameDisplay, getGuideDisplay } from '@/data/sampleData';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));

  // Featured games (top 4 from sample)
  const featuredGames = sampleGames.slice(0, 4).map(g => getGameDisplay(g, lang as 'en' | 'zh'));

  // Latest guides (last 6 from sample)
  const latestGuides = sampleGuides.slice(-6).reverse().map(g => {
    const display = getGuideDisplay(g, lang as 'en' | 'zh');
    return {
      slug: display.slug,
      title: display.title,
      excerpt: display.excerpt,
      gameTitle: display.gameTitle,
      gameSlug: display.gameSlug,
      difficulty: display.difficulty as 'beginner' | 'intermediate' | 'advanced' | 'expert',
      readingTime: display.timeToComplete,
      publishedAt: new Date(display.publishedAt),
      coverImage: display.coverImage,
    };
  });

  // Get top 6 most viewed guides
  const popularGuides = sampleGuides
    .sort((a, b) => b.views - a.views)
    .slice(0, 6)
    .map(g => {
      const display = getGuideDisplay(g, lang as 'en' | 'zh');
      return {
        slug: display.slug,
        title: display.title,
        excerpt: display.excerpt,
        gameTitle: display.gameTitle,
        gameSlug: display.gameSlug,
        difficulty: display.difficulty as 'beginner' | 'intermediate' | 'advanced' | 'expert',
        readingTime: display.timeToComplete,
        publishedAt: new Date(display.publishedAt),
        coverImage: display.coverImage,
      };
    });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-br from-gray-900 via-purple-950/30 to-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {dict.home.masterEveryGame}
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {dict.home.noSpoilersJustWins}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            {dict.home.expertWalkthroughs}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/games"
              className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
            >
              {dict.home.browseGames}
            </Link>
            <Link
              href="/guides"
              className="rounded-lg border border-gray-600 px-6 py-3 text-sm font-semibold text-gray-200 transition-colors hover:border-gray-400 hover:text-white"
            >
              {dict.home.latestGuides}
            </Link>
            <Link
              href="/builds"
              className="rounded-lg border border-purple-500/40 bg-purple-950/30 px-6 py-3 text-sm font-semibold text-purple-300 transition-colors hover:border-purple-400 hover:bg-purple-900/40"
            >
              {dict.home.buildCalculator}
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Banner after Hero */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <AdBanner size="banner" slot="home-hero" />
      </div>

      {/* {dict.home.browseGames} */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{dict.home.browseGames}</h2>
          <Link
            href="/games"
            className="text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
          >
            {dict.home.viewAllGames}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredGames.map((game) => (
            <GameCard key={game.slug} {...game} guideLabel={dict.gameCard.guides} guideCount={game.guideCount || 0} />
          ))}
        </div>
      </section>

      {/* {dict.home.popularGuides} */}
      <section className="border-y border-gray-800 bg-gray-900/50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{dict.home.popularGuides}</h2>
              <p className="mt-2 text-sm text-gray-400">
                {dict.home.mostViewed}
              </p>
            </div>
            <Link
              href="/guides"
              className="text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
            >
              {dict.home.viewAllGuides}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularGuides.map((guide) => (
              <GuideCard key={guide.slug} {...guide} dict={dict as any} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-gray-800 bg-gray-900/50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-white">
            {dict.home.browseByCategory}
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

      {/* {dict.home.latestGuides} */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{dict.home.latestGuides}</h2>
          <Link
            href="/guides"
            className="text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
          >
            {dict.home.viewAllGuides}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestGuides.map((guide) => (
            <GuideCard key={guide.slug} {...guide} dict={dict as any} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 bg-gradient-to-r from-purple-950/40 to-gray-900 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {dict.home.stuckOnBoss}
          </h2>
          <p className="mt-4 text-gray-300">
            {dict.home.joinThousands}
          </p>
          <div className="mt-8">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
            >
              {dict.home.searchForGuide}
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

      {/* Ad Banner before footer */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <AdBanner size="banner" slot="home-footer" />
      </div>
    </div>
  );
}

// Updated: 2026-05-26 - Phase 3
// Updated: 2026-05-26 - Phase 3 i18n