import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGames, sampleGuides } from "@/data/sampleData";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Sitemap - GameGuide",
    description: "Browse all games and guides on GameGuide",
    alternates: {
      canonical: `https://gameguide.guide/${lang}/sitemap`,
    },
  };
}

export default async function SitemapPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));

  const gamesByCategory: Record<string, typeof sampleGames> = {};
  for (const game of sampleGames) {
    if (!gamesByCategory[game.category]) gamesByCategory[game.category] = [];
    gamesByCategory[game.category].push(game);
  }

  const categories = Object.keys(gamesByCategory).sort();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur border-b border-gray-200 dark:border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.guides}</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Sitemap</h1>
        <p className="text-gray-600 dark:text-[#a0a0a0] mb-10">All games and guides available on GameGuide.</p>

        {/* Games by Category */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Games ({sampleGames.length})</h2>
          {categories.map((cat) => (
            <div key={cat} className="mb-6">
              <h3 className="text-lg font-semibold text-[#6C3FB7] mb-3">{cat}</h3>
              <ul className="space-y-2">
                {gamesByCategory[cat].map((game) => (
                  <li key={game.id}>
                    <Link
                      href={`/${lang}/games/${game.slug}`}
                      className="text-sm text-gray-700 dark:text-[#c0c0c0] hover:text-[#6C3FB7] transition-colors"
                    >
                      {lang === "zh" ? game.titleZh : game.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Guides ({sampleGuides.length})</h2>
          {categories.map((cat) => {
            const catGuides = sampleGuides.filter((g) => g.category === cat);
            if (catGuides.length === 0) return null;
            return (
              <div key={cat} className="mb-6">
                <h3 className="text-lg font-semibold text-[#6C3FB7] mb-3">{cat}</h3>
                <ul className="space-y-2">
                  {catGuides.map((guide) => (
                    <li key={guide.id}>
                      <Link
                        href={`/${lang}/guides/${guide.slug}`}
                        className="text-sm text-gray-700 dark:text-[#c0c0c0] hover:text-[#6C3FB7] transition-colors"
                      >
                        {lang === "zh" ? guide.titleZh : guide.title}
                      </Link>
                      <span className="text-xs text-gray-500 dark:text-[#666] ml-2">
                        &mdash; {lang === "zh" ? guide.gameTitleZh : guide.gameTitle}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        {/* Other Pages */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Pages</h2>
          <ul className="space-y-2">
            <li><Link href={`/${lang}`} className="text-sm text-gray-700 dark:text-[#c0c0c0] hover:text-[#6C3FB7]">Home</Link></li>
            <li><Link href={`/${lang}/games`} className="text-sm text-gray-700 dark:text-[#c0c0c0] hover:text-[#6C3FB7]">Games</Link></li>
            <li><Link href={`/${lang}/guides`} className="text-sm text-gray-700 dark:text-[#c0c0c0] hover:text-[#6C3FB7]">Guides</Link></li>
            <li><Link href={`/${lang}/categories`} className="text-sm text-gray-700 dark:text-[#c0c0c0] hover:text-[#6C3FB7]">Categories</Link></li>
            <li><Link href={`/${lang}/sitemap`} className="text-sm text-gray-700 dark:text-[#c0c0c0] hover:text-[#6C3FB7]">Sitemap</Link></li>
            <li><Link href={`/${lang}/privacy`} className="text-sm text-gray-700 dark:text-[#c0c0c0] hover:text-[#6C3FB7]">Privacy Policy</Link></li>
            <li><Link href={`/${lang}/terms`} className="text-sm text-gray-700 dark:text-[#c0c0c0] hover:text-[#6C3FB7]">Terms of Service</Link></li>
            <li><Link href={`/${lang}/contact`} className="text-sm text-gray-700 dark:text-[#c0c0c0] hover:text-[#6C3FB7]">Contact</Link></li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-[#2a2a2a] bg-gray-100 dark:bg-[#08080c]">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 dark:text-[#666] text-sm">
          <p>&copy; {new Date().getFullYear()} GameGuide. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
