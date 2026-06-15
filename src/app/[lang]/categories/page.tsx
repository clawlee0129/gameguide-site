import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGames, sampleGuides } from "@/data/sampleData";
import type { Metadata } from "next";
import SearchBar from "@/components/SearchBar";

const CATEGORIES = ["RPG","Action","Adventure","Horror","Platformer","Strategy","Simulation","Puzzle","Fighting","Racing","Sports"];

export const metadata: Metadata = {
  title: "Categories - GameGuide",
  description: "Browse game guides by category.",
};

export default async function CategoriesPage({ params, searchParams }: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ cat?: string }>;
}) {
  const { lang } = await params;
  const sp = await searchParams;
  const dict = getDictionary(getLangFromParams({ lang }));

  const activeCat = sp.cat;
  const filteredGames = activeCat ? sampleGames.filter((g) => g.category === activeCat) : [];
  const filteredGuides = activeCat ? sampleGuides.filter((g) => g.category === activeCat) : [];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur border-b border-gray-200 dark:border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.guides}</Link>
            <Link href={`/${lang}/categories`} className="text-[#6C3FB7]">{dict.nav.categories}</Link>
            <SearchBar lang={lang} dict={dict} />
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{dict.categories.title}</h1>

        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <Link key={cat} href={`/${lang}/categories?cat=${cat}`}
              className={`text-sm px-4 py-2 rounded-lg transition-colors ${activeCat === cat ? "bg-[#6C3FB7] text-white" : "btn-outline"}`}>
              {cat}
            </Link>
          ))}
        </div>

        {activeCat && (
          <>
            {filteredGames.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{dict.nav.games}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredGames.map((game) => (
                    <Link key={game.id} href={`/${lang}/games/${game.slug}`} className="card overflow-hidden group bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a]">
                      <div className="aspect-video bg-gray-200 dark:bg-[#252525] flex items-center justify-center text-[#6C3FB7] font-bold">{game.title}</div>
                      <div className="p-4">
                        <h3 className="font-semibold group-hover:text-[#6C3FB7] text-gray-900 dark:text-white">{lang === "zh" ? game.titleZh : game.title}</h3>
                        <span className="text-xs text-gray-600 dark:text-[#a0a0a0]">{game.rating}/10</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {filteredGuides.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{dict.nav.guides}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGuides.map((guide) => (
                    <Link key={guide.id} href={`/${lang}/guides/${guide.slug}`} className="card p-5 group bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a]">
                      <h3 className="font-semibold group-hover:text-[#6C3FB7] text-gray-900 dark:text-white">{lang === "zh" ? guide.titleZh : guide.title}</h3>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-600 dark:text-[#a0a0a0]">
                        <span>{lang === "zh" ? guide.gameTitleZh : guide.gameTitle}</span>
                        <span>{guide.difficulty}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {filteredGames.length === 0 && filteredGuides.length === 0 && (
              <p className="text-gray-600 dark:text-[#a0a0a0] text-center py-12">{dict.search.noResults}</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
