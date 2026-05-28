import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { getLangFromParams, Language } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type LangParams = {
  lang: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));

  return {
    title: {
      default: dict.metadata.siteTitle,
      template: `%s | GameGuide Pro`,
    },
    description: dict.metadata.siteDescription,
    keywords: [
      "game guide",
      "walkthrough",
      "boss guide",
      "strategy guide",
      "game tips",
      "PC game guide",
      "游戏攻略",
      "游戏指南",
    ],
    openGraph: {
      type: "website",
      siteName: "GameGuide Pro",
      locale: lang === "zh" ? "zh_CN" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<LangParams>;
}>) {
  const { lang } = await params;
  const currentLang = getLangFromParams({ lang });
  const dict = getDictionary(currentLang);

  return (
    <>
      <Header lang={currentLang} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer lang={currentLang} dict={dict} />
    </>
  );
}

// Updated: 2026-05-26 - Phase 3 i18n