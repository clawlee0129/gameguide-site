import { getDictionary, getLangFromParams } from "@/i18n";
import HomeClient from "./HomeClient";
import { sampleGuides } from "@/data/sampleData";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "GameGuide - Expert Game Walkthroughs, Builds & Strategy Guides",
    description:
      "Expert game walkthroughs, character builds, boss strategies, and collectible guides for Elden Ring, Baldur's Gate 3, Zelda: TotK, Hogwarts Legacy, and more.",
    alternates: {
      canonical: `https://gameguide.guide/${lang}`,
      languages: {
        en: "https://gameguide.guide/en",
        zh: "https://gameguide.guide/zh",
      },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = getLangFromParams({ lang }) as 'en' | 'zh';
  const dict = getDictionary(validLang);
  const otherLang = validLang === 'en' ? 'zh' : 'en';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GameGuide",
    url: "https://gameguide.guide",
    logo: "https://gameguide.guide/images/og-image.jpg",
    sameAs: [
      "https://twitter.com/gameguide",
      "https://discord.gg/gameguide",
      "https://youtube.com/@gameguide",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GameGuide",
    url: "https://gameguide.guide",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://gameguide.guide/en/guides?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const latestGuides = sampleGuides.slice(0, 6);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: lang === "zh" ? "最新攻略" : "Latest Guides",
    numberOfItems: latestGuides.length,
    itemListElement: latestGuides.map((g, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Article",
        url: `https://gameguide.guide/${lang}/guides/${g.slug}`,
        name: lang === "zh" ? g.titleZh : g.title,
        description: lang === "zh" ? g.descriptionZh : g.description,
        datePublished: g.publishedDate
          ? `${g.publishedDate}T00:00:00Z`
          : "2026-01-01T00:00:00Z",
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <HomeClient dict={dict} lang={validLang} otherLang={otherLang} />
    </>
  );
}
