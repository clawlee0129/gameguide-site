import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGames, sampleGuides } from "@/data/sampleData";
import type { Metadata } from "next";
import CategoriesClient from "@/components/CategoriesClient";

const CATEGORIES = ["RPG","Action","Adventure","Horror","Platformer","Strategy","Simulation","Puzzle","Fighting","Racing","Sports"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Categories - GameGuide",
    description: "Browse game guides by category.",
    alternates: {
      canonical: `https://gameguide.guide/${lang}/categories`,
      languages: {
        en: "https://gameguide.guide/en/categories",
        zh: "https://gameguide.guide/zh/categories",
      },
    },
    openGraph: {
      title: "Categories - GameGuide",
      description: "Browse game guides by category.",
      url: `https://gameguide.guide/${lang}/categories`,
      siteName: "GameGuide",
      locale: lang === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Categories - GameGuide",
      description: "Browse game guides by category.",
    },
  };
}

export default async function CategoriesPage({ params, searchParams }: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ cat?: string }>;
}) {
  const { lang } = await params;
  const sp = await searchParams;
  const dict = getDictionary(getLangFromParams({ lang }));
  const activeCat = sp.cat || null;

  const catGames = activeCat ? sampleGames.filter((g) => g.category === activeCat) : sampleGames;
  const catGuides = activeCat ? sampleGuides.filter((g) => g.category === activeCat) : sampleGuides;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gameguide.guide/" },
      { "@type": "ListItem", position: 2, name: activeCat ? `${activeCat} Categories` : "Categories", item: `https://gameguide.guide/${lang}/categories${activeCat ? `?cat=${activeCat}` : ""}` },
    ],
  };

  const itemListGames = activeCat ? catGames : [];
  const itemListSchema = itemListGames.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: itemListGames.map((game, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "VideoGame",
        name: lang === "zh" ? game.titleZh : game.title,
        url: `https://gameguide.guide/${lang}/games/${game.slug}`,
        description: lang === "zh" ? game.descriptionZh : game.description,
        genre: game.category,
      },
    })),
  } : null;

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {itemListSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />}
      <header className="sticky top-0 z-50 bg-[#0a0a14]/95 backdrop-blur border-b border-[rgba(201,160,80,0.15)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.guides}</Link>
            <Link href={`/${lang}/categories`} className="text-[#c9a050]">{dict.nav.categories}</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-[#e2d0b0]">{dict.categories.title}</h1>
        <CategoriesClient
          games={catGames}
          guides={catGuides}
          lang={lang}
          dict={dict}
          activeCat={activeCat}
          categories={CATEGORIES}
        />
      </main>
    </div>
  );
}
