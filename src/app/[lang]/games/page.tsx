import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGames } from "@/data/sampleData";

export default async function GamesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#6C3FB7]">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="text-[#6C3FB7]">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#6C3FB7]">{dict.nav.guides}</Link>
            <Link href={`/${lang}/categories`} className="hover:text-[#6C3FB7]">{dict.nav.categories}</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">{dict.nav.games}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleGames.map((game) => (
            <Link key={game.id} href={`/${lang}/games/${game.slug}`} className="card overflow-hidden group">
              <div className="aspect-video bg-[#252525] flex items-center justify-center text-[#6C3FB7] text-lg font-bold">{game.title}</div>
              <div className="p-4">
                <h3 className="font-semibold group-hover:text-[#6C3FB7] transition-colors">{lang === "zh" ? game.titleZh : game.title}</h3>
                <p className="text-sm text-[#a0a0a0] mt-1 line-clamp-2">{lang === "zh" ? game.descriptionZh : game.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-[#6C3FB7] bg-[#6C3FB7]/10 px-2 py-0.5 rounded">{game.category}</span>
                  <span className="text-xs text-[#a0a0a0]">{game.rating}/10</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
