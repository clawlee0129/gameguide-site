import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  return {
    title: `${dict.privacy.title} - GameGuide`,
    description: lang === "zh"
      ? "GameGuide 隐私政策 — 了解我们如何收集、使用和保护您的个人信息。符合 GDPR 和 CCPA 标准。"
      : "GameGuide Privacy Policy — how we collect, use, and protect your personal information. GDPR and CCPA compliant.",
    alternates: {
      canonical: `https://gameguide.guide/${lang}/privacy`,
      languages: { en: "https://gameguide.guide/en/privacy", zh: "https://gameguide.guide/zh/privacy" },
    },
    openGraph: {
      title: `${dict.privacy.title} - GameGuide`,
      description: "How we collect, use, and protect your personal information.",
      url: `https://gameguide.guide/${lang}/privacy`,
      siteName: "GameGuide",
      locale: lang === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://gameguide.guide/${lang}` },
      { "@type": "ListItem", position: 2, name: dict.privacy.title, item: `https://gameguide.guide/${lang}/privacy` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="sticky top-0 z-50 bg-[#0a0a14]/95 backdrop-blur border-b border-[rgba(201,160,80,0.15)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.guides}</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#e2d0b0] mb-3">{dict.privacy.title}</h1>
          <p className="text-sm text-[#9a8a70]">{dict.privacy.lastUpdated}</p>
        </div>

        <div className="space-y-10">
          {dict.privacy.sections.map((section: { heading: string; content: string }, idx: number) => (
            <section key={idx}>
              <h2 className="text-xl font-bold text-[#c9a050] mb-3">{section.heading}</h2>
              <div className="text-[#9a8a70] leading-relaxed space-y-3 whitespace-pre-line">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[rgba(201,160,80,0.15)] text-center">
          <p className="text-sm text-[#6a5a40]">
            {lang === "zh"
              ? "如有疑问，请联系："
              : "For questions or data requests, contact:"}{" "}
            <a href="mailto:privacy@gameguide.guide" className="text-[#c9a050] hover:underline">privacy@gameguide.guide</a>
          </p>
        </div>
      </main>

      <footer className="border-t border-[rgba(201,160,80,0.15)] bg-[#0a0a14]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gradient mb-3">GameGuide</h3>
              <p className="text-sm text-[#9a8a70] leading-relaxed">{dict.footer.about}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[#e2d0b0]">{dict.footer.quickLinks}</h4>
              <div className="space-y-2 text-sm">
                <Link href={`/${lang}/games`} className="block text-[#9a8a70] hover:text-[#c9a050]">{dict.nav.games}</Link>
                <Link href={`/${lang}/guides`} className="block text-[#9a8a70] hover:text-[#c9a050]">{dict.nav.guides}</Link>
                <Link href={`/${lang}/privacy`} className="block text-[#9a8a70] hover:text-[#c9a050]">{dict.footer.privacy}</Link>
                <Link href={`/${lang}/terms`} className="block text-[#9a8a70] hover:text-[#c9a050]">{dict.footer.terms}</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[#e2d0b0]">{dict.footer.followUs}</h4>
              <div className="flex flex-col space-y-2 text-sm">
                <a href="https://twitter.com/gameguide" target="_blank" rel="noopener noreferrer" className="text-[#9a8a70] hover:text-[#1DA1F2]">Twitter</a>
                <a href="https://discord.gg/gameguide" target="_blank" rel="noopener noreferrer" className="text-[#9a8a70] hover:text-[#5865F2]">Discord</a>
                <a href="https://youtube.com/@gameguide" target="_blank" rel="noopener noreferrer" className="text-[#9a8a70] hover:text-[#FF0000]">YouTube</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[rgba(201,160,80,0.08)] text-center text-[#9a8a70] text-sm">
            <p>&copy; {new Date().getFullYear()} GameGuide. {dict.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
