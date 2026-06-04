import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGames, sampleGuides } from "@/data/sampleData";
import { notFound } from "next/navigation";

export default async function GameDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  const game = sampleGames.find((g) => g.slug === slug);
  if (!game) notFound();

  const gameGuides = sampleGuides.filter((g) => g.gameId === game.id);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#6C3FB7]">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="text-[#6C3FB7]">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#6C3FB7]">{dict.nav.guides}</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href={`/${lang}/games`} className="text-sm text-[#6C3FB7] hover:underline mb-6 inline-block">&larr; {dict.guide.backToGames}</Link>

        <div className="card p-8 mb-8">
          <div className="aspect-video bg-[#252525] rounded-lg flex items-center justify-center text-[#6C3FB7] text-2xl font-bold mb-6">
            {game.title}
          </div>
          <h1 className="text-3xl font-bold mb-4">{lang === "zh" ? game.titleZh : game.title}</h1>
          <p className="text-[#a0a0a0] mb-6">{lang === "zh" ? game.descriptionZh : game.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="text-[#6C3FB7] bg-[#6C3FB7]/10 px-3 py-1 rounded">{game.category}</span>
            <span className="text-[#a0a0a0]">{dict.game.rating}: {game.rating}/10</span>
            <span className="text-[#a0a0a0]">{dict.game.platforms}: {game.platforms.join(", ")}</span>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6">{dict.game.guides} ({gameGuides.length})</h2>
          {gameGuides.length === 0 ? (
            <p className="text-[#a0a0a0]">{dict.game.noGuides}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameGuides.map((guide) => (
                <Link key={guide.id} href={`/${lang}/guides/${guide.slug}`} className="card p-5 group">
                  <h3 className="font-semibold group-hover:text-[#6C3FB7] transition-colors">{lang === "zh" ? guide.titleZh : guide.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-[#a0a0a0]">
                    <span>{guide.difficulty}</span>
                    <span>{guide.timeToRead}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
