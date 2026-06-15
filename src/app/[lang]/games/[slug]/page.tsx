import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGames, sampleGuides } from "@/data/sampleData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SafeImage from "@/components/SafeImage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const game = sampleGames.find((g) => g.slug === slug);
  if (!game) return { title: "Not Found - GameGuide" };

  const title = lang === "zh" ? game.titleZh : game.title;
  const description = lang === "zh" ? game.descriptionZh : game.description;

  return {
    title: `${title} Guides - GameGuide`,
    description,
    openGraph: {
      title: `${title} Guides - GameGuide`,
      description,
      images: [`/images/games/${game.slug}.jpg`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} Guides - GameGuide`,
      description,
    },
  };
}

const platformColors: Record<string, string> = {
  PS5: "text-[#a855f7] bg-[#a855f7]/10",
  PS4: "text-[#a855f7] bg-[#a855f7]/10",
  Xbox: "text-[#22c55e] bg-[#22c55e]/10",
  "Xbox Series X": "text-[#22c55e] bg-[#22c55e]/10",
  "Xbox Series X|S": "text-[#22c55e] bg-[#22c55e]/10",
  PC: "text-[#3b82f6] bg-[#3b82f6]/10",
  Switch: "text-[#ef4444] bg-[#ef4444]/10",
  "Nintendo Switch": "text-[#ef4444] bg-[#ef4444]/10",
};

function getMetascoreColor(score: number): string {
  if (score >= 90) return "text-[#22c55e]";
  if (score >= 75) return "text-[#eab308]";
  return "text-[#ef4444]";
}

export default async function GameDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  const game = sampleGames.find((g) => g.slug === slug);
  if (!game) notFound();

  const gameGuides = sampleGuides.filter((g) => g.gameId === game.id);
  const metascore = Math.round(game.rating * 10);
  const scoreColor = getMetascoreColor(metascore);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gameguide.guide/" },
      { "@type": "ListItem", position: 2, name: "Games", item: `https://gameguide.guide/${lang}/games` },
      { "@type": "ListItem", position: 3, name: lang === "zh" ? game.titleZh : game.title },
    ],
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: lang === "zh" ? game.titleZh : game.title,
    description: lang === "zh" ? game.descriptionZh : game.description,
    applicationCategory: "Game",
    operatingSystem: game.platforms?.join(", ") || "",
    genre: game.category,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: game.rating,
      bestRating: "10",
      reviewCount: gameGuides.length,
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />

      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur border-b border-gray-200 dark:border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="text-[#6C3FB7]">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.guides}</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href={`/${lang}/games`} className="text-sm text-[#6C3FB7] hover:underline mb-6 inline-block">&larr; {dict.guide.backToGames}</Link>

        <div className="card overflow-hidden mb-8 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a]">
          <div className="aspect-[21/9] relative bg-gray-100 dark:bg-[#1a1a1a] overflow-hidden">
            <SafeImage
              src={`/images/games/${game.slug}.jpg`}
              alt={game.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0f0f0f] via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{lang === "zh" ? game.titleZh : game.title}</h1>
            <p className="text-gray-600 dark:text-[#a0a0a0] mb-6 leading-relaxed">{lang === "zh" ? game.descriptionZh : game.description}</p>

            <div className="flex flex-wrap gap-4 text-sm items-center">
              <span className="text-[#6C3FB7] bg-[#6C3FB7]/10 px-3 py-1 rounded">{game.category}</span>
              <span className={`px-3 py-1 rounded font-bold ${scoreColor} bg-black/5 dark:bg-white/5`}>
                {metascore} Metascore
              </span>
              {game.platforms && game.platforms.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map((p: string) => (
                    <span key={p} className={`text-xs px-2.5 py-1 rounded-full font-medium ${platformColors[p] || "text-[#a0a0a0] bg-[#1a1a1a]"}`}>{p}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{dict.game.guides} ({gameGuides.length})</h2>
          {gameGuides.length === 0 ? (
            <p className="text-gray-600 dark:text-[#a0a0a0]">{dict.game.noGuides}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameGuides.map((guide) => (
                <Link key={guide.id} href={`/${lang}/guides/${guide.slug}`} className="card p-5 group bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a]">
                  <h3 className="font-semibold group-hover:text-[#6C3FB7] transition-colors text-gray-900 dark:text-white">{lang === "zh" ? guide.titleZh : guide.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-600 dark:text-[#a0a0a0]">
                    <span>{guide.difficulty}</span>
                    <span>{guide.timeToRead}</span>
                    {guide.views > 0 ? <span>{guide.views.toLocaleString()} {dict.guide.views}</span> : <span className="text-[#a855f7] font-medium">{dict.guide.new}</span>}
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
