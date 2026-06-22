import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGuides } from "@/data/sampleData";
import type { Metadata } from "next";
import SearchBar from "@/components/SearchBar";
import SafeImage from "@/components/SafeImage";

const CATEGORIES = ["All","RPG","Action","Adventure","Horror","Platformer","Strategy","Simulation","Puzzle","Fighting","Racing","Sports"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "All Guides - GameGuide",
    description: lang === "zh"
      ? "浏览 50+ 篇专业游戏攻略，涵盖 Monster Hunter Wilds、Baldur's Gate 3、Elden Ring、Genshin Impact 等热门游戏。详细流程、Build 构建、Boss 策略与技巧指南。"
      : "Browse 50+ expert game guides for Monster Hunter Wilds, Baldur's Gate 3, Elden Ring, Genshin Impact, and more. Walkthroughs, builds, boss strategies, and tips.",
    alternates: {
      canonical: `https://gameguide.guide/${lang}/guides`,
      languages: {
        en: "https://gameguide.guide/en/guides",
        zh: "https://gameguide.guide/zh/guides",
      },
    },
    openGraph: {
      title: "All Guides - GameGuide",
      description: lang === "zh"
        ? "浏览 50+ 篇专业游戏攻略，涵盖 Monster Hunter Wilds、Baldur's Gate 3、Elden Ring、Genshin Impact 等热门游戏。详细流程、Build 构建、Boss 策略与技巧指南。"
        : "Browse 50+ expert game guides for Monster Hunter Wilds, Baldur's Gate 3, Elden Ring, Genshin Impact, and more. Walkthroughs, builds, boss strategies, and tips.",
      url: `https://gameguide.guide/${lang}/guides`,
      siteName: "GameGuide",
      locale: lang === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "All Guides - GameGuide",
      description: lang === "zh"
        ? "浏览 50+ 篇专业游戏攻略，涵盖 Monster Hunter Wilds、Baldur's Gate 3、Elden Ring、Genshin Impact 等热门游戏。详细流程、Build 构建、Boss 策略与技巧指南。"
        : "Browse 50+ expert game guides for Monster Hunter Wilds, Baldur's Gate 3, Elden Ring, Genshin Impact, and more. Walkthroughs, builds, boss strategies, and tips.",
    },
  };
}

export default async function GuidesPage({ params, searchParams }: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const { lang } = await params;
  const sp = await searchParams;
  const dict = getDictionary(getLangFromParams({ lang }));

  let guides = sampleGuides;
  if (sp.cat && sp.cat !== "All") guides = guides.filter((g) => g.category === sp.cat);
  if (sp.q) {
    const q = sp.q.toLowerCase();
    guides = guides.filter((g) =>
      g.title.toLowerCase().includes(q) || g.titleZh.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) || g.gameTitle.toLowerCase().includes(q)
    );
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gameguide.guide/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: `https://gameguide.guide/${lang}/guides` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: guides.map((guide, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Article",
        name: lang === "zh" ? guide.titleZh : guide.title,
        url: `https://gameguide.guide/${lang}/guides/${guide.slug}`,
        description: lang === "zh" ? guide.descriptionZh : guide.description,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <header className="sticky top-0 z-50 bg-[#0a0a14]/95 backdrop-blur border-b border-[rgba(201,160,80,0.15)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="text-[#c9a050]">{dict.nav.guides}</Link>
            <Link href={`/${lang}/categories`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.categories}</Link>
            <SearchBar lang={lang} dict={dict} />
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-[#e2d0b0]">{dict.nav.guides}</h1>

        <form className="flex flex-wrap gap-3 mb-8" method="get">
          <input type="text" name="q" defaultValue={sp.q || ""} placeholder={dict.search.placeholder}
            className="bg-[#141020] border border-[rgba(201,160,80,0.15)] rounded-lg px-4 py-2 text-[#e2d0b0] placeholder:text-[#9a8a70] focus:outline-none focus:border-[#c9a050] w-full sm:w-64" />
          <select name="cat" defaultValue={sp.cat || "All"}
            className="bg-[#141020] border border-[rgba(201,160,80,0.15)] rounded-lg px-4 py-2 text-[#e2d0b0] focus:outline-none focus:border-[#c9a050]">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="submit" className="bg-gradient-to-r from-[#c9a050] to-[#8b5a20] text-black font-semibold text-sm px-4 py-2 rounded-lg">{dict.nav.search}</button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link key={guide.id} href={`/${lang}/guides/${guide.slug}`} className="card-dark overflow-hidden group">
              <div className="aspect-[16/9] relative overflow-hidden">
                <SafeImage src={guide.image} alt={`${guide.title} - ${guide.gameTitle} guide - GameGuide`} loading="lazy" className="w-full h-full object-cover"
                  fallbackSrc={`/images/games/${guide.gameId}.jpg`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14]/80 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-[#c9a050] bg-[rgba(201,160,80,0.1)] px-2 py-0.5 rounded">{guide.category}</span>
                  {guide.views > 0 ? (
                    <span className="text-xs text-[#9a8a70]">{guide.views.toLocaleString()} {dict.guide.views}</span>
                  ) : (
                    <span className="text-xs text-[#c9a050] font-medium">{dict.guide.new}</span>
                  )}
                </div>
                <h3 className="font-semibold mt-1 group-hover:text-[#e2c870] transition-colors text-[#e2d0b0]">{lang === "zh" ? guide.titleZh : guide.title}</h3>
                <p className="text-sm text-[#9a8a70] mt-2 line-clamp-2">{lang === "zh" ? guide.descriptionZh : guide.description}</p>
                <div className="flex items-center gap-3 mt-4 text-xs text-[#9a8a70]">
                  <span>{lang === "zh" ? guide.gameTitleZh : guide.gameTitle}</span>
                  <span>{guide.difficulty}</span>
                  <span>{guide.timeToRead}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {guides.length === 0 && <p className="text-[#9a8a70] text-center py-12">{dict.search.noResults}</p>}
      </main>
    </div>
  );
}
