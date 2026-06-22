import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGames, sampleGuides } from "@/data/sampleData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SafeImage from "@/components/SafeImage";
import AdBanner from "@/components/AdBanner";

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const game = sampleGames.find((g) => g.slug === slug);
  if (!game) return { title: "Not Found - GameGuide" };

  const title = lang === "zh" ? game.titleZh : game.title;
  const description = lang === "zh" ? game.descriptionZh : game.description;

  return {
    title: `${title} Guides - GameGuide`,
    description,
    alternates: {
      canonical: `https://gameguide.guide/${lang}/games/${slug}`,
      languages: {
        en: `https://gameguide.guide/en/games/${slug}`,
        zh: `https://gameguide.guide/zh/games/${slug}`,
      },
    },
    openGraph: {
      title: `${title} Guides & Walkthroughs - GameGuide`,
      description: lang === "zh" ? `${game.descriptionZh} 在 GameGuide 浏览完整攻略与Build指南。` : `${game.description} Browse guides, builds, and walkthroughs on GameGuide.`,
      url: `https://gameguide.guide/${lang}/games/${slug}`,
      siteName: "GameGuide",
      locale: lang === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [{ url: `/images/games/${game.slug}.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} Guides & Walkthroughs - GameGuide`,
      description: lang === "zh" ? `${game.descriptionZh} 在 GameGuide 浏览完整攻略与Build指南。` : `${game.description} Browse guides, builds, and walkthroughs on GameGuide.`,
      images: [`/images/games/${game.slug}.jpg`],
    },
    other: {
      "article:author": "GameGuide Team",
      "article:published_time": "2026-01-01T00:00:00Z",
      "article:modified_time": "2026-06-14T00:00:00Z",
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
    <div className="min-h-screen bg-[#0a0a14]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />

      <header className="sticky top-0 z-50 bg-[#0a0a14]/95 backdrop-blur border-b border-[rgba(201,160,80,0.15)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#e2c870] text-[#e2d0b0] hidden sm:inline">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="text-[#c9a050]">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.guides}</Link>
            <Link href={`/${lang}/categories`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.categories}</Link>
            <Link href={lang === "en" ? "/zh" : "/en"} className="text-xs px-2 py-1 border border-[rgba(201,160,80,0.3)] rounded hover:border-[#c9a050] transition-colors">{dict.nav.lang}</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href={`/${lang}/games`} className="text-sm text-[#c9a050] hover:underline mb-6 inline-block">&larr; {dict.guide.backToGames}</Link>

        <div className="card-dark overflow-hidden mb-8">
          <div className="aspect-[21/9] relative bg-[#141020] overflow-hidden">
            <SafeImage
              src={`/images/games/${game.slug}.jpg`}
              alt={`${game.title} game guide and walkthrough - GameGuide`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-[#e2d0b0]">{lang === "zh" ? game.titleZh : game.title}</h1>
            <p className="text-[#9a8a70] mb-6 leading-relaxed">{lang === "zh" ? game.descriptionZh : game.description}</p>

            <div className="flex flex-wrap gap-4 text-sm items-center">
              <span className="text-[#c9a050] bg-[rgba(201,160,80,0.1)] px-3 py-1 rounded">{game.category}</span>
              <span className={`px-3 py-1 rounded font-bold ${scoreColor} bg-black/5 dark:bg-white/5`}>
                {metascore} Metascore
              </span>
              {game.platforms && game.platforms.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map((p: string) => (
                    <span key={p} className={`text-xs px-2.5 py-1 rounded-full font-medium ${platformColors[p] || "text-[#9a8a70] bg-[#141020]"}`}>{p}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AdSense 广告位 */}
        <AdBanner slot="9708347512" format="auto" className="py-4" />

        <section>
          <h2 className="text-2xl font-bold mb-6 text-[#e2d0b0]">{dict.game.guides} ({gameGuides.length})</h2>
          {gameGuides.length === 0 ? (
            <p className="text-[#9a8a70]">{dict.game.noGuides}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameGuides.map((guide) => (
                <Link key={guide.id} href={`/${lang}/guides/${guide.slug}`} className="card-dark p-5 group">
                  <h3 className="font-semibold group-hover:text-[#e2c870] transition-colors text-[#e2d0b0]">{lang === "zh" ? guide.titleZh : guide.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-[#9a8a70]">
                    <span>{guide.difficulty}</span>
                    <span>{guide.timeToRead}</span>
                    {guide.views > 0 ? <span>{guide.views.toLocaleString()} {dict.guide.views}</span> : <span className="text-[#c9a050] font-medium">{dict.guide.new}</span>}
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
