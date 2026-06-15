import { getDictionary, getLangFromParams } from "@/i18n";
import HomeClient from "./HomeClient";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "GameGuide - Expert Game Walkthroughs, Builds & Guides",
    description:
      "Expert game walkthroughs, character builds, boss strategies, and collectible guides for Elden Ring, Baldur's Gate 3, Zelda: TotK, Hogwarts Legacy, and more.",
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      <HomeClient dict={dict} lang={validLang} otherLang={otherLang} />
    </>
  );
}
