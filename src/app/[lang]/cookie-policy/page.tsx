import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "zh" ? "Cookie 政策 - GameGuide" : "Cookie Policy - GameGuide",
    description: lang === "zh"
      ? "了解 GameGuide 如何使用 Cookie，以及如何管理您的 Cookie 偏好设置。"
      : "Learn how GameGuide uses cookies and how you can manage your cookie preferences.",
    alternates: {
      canonical: `https://gameguide.guide/${lang}/cookie-policy`,
      languages: {
        en: "https://gameguide.guide/en/cookie-policy",
        zh: "https://gameguide.guide/zh/cookie-policy",
      },
    },
  };
}

export default async function CookiePolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  const cp = dict.cookiePolicy;

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <header className="sticky top-0 z-50 bg-[#0a0a14]/95 backdrop-blur border-b border-[rgba(201,160,80,0.15)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.guides}</Link>
            <Link href={`/${lang}/categories`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.categories}</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2 text-[#e2d0b0]">{cp.title}</h1>
        <p className="text-sm text-[#9a8a70] mb-8">{cp.lastUpdated}</p>

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-[#e2d0b0]
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-[#9a8a70] prose-p:leading-relaxed
          prose-strong:text-[#e2d0b0]
          prose-a:text-[#c9a050] prose-a:no-underline hover:prose-a:underline
          prose-li:text-[#9a8a70] prose-li:marker:text-[#c9a050]
          prose-hr:border-[rgba(201,160,80,0.15)]
        ">
          <p className="lead text-[#c9a050]">{cp.intro}</p>

          <section>
            <h2>{cp.whatAre.heading}</h2>
            <p>{cp.whatAre.content}</p>
          </section>

          <section>
            <h2>{cp.types.heading}</h2>

            <h3>{cp.types.essential.heading}</h3>
            <p>{cp.types.essential.content}</p>

            <h3>{cp.types.analytics.heading}</h3>
            <p>{cp.types.analytics.content}</p>

            <h3>{cp.types.advertising.heading}</h3>
            <p>{cp.types.advertising.content}</p>
          </section>

          <section>
            <h2>{cp.thirdParty.heading}</h2>
            <p>{cp.thirdParty.content}</p>
            <ul>
              <li><strong>Google AdSense:</strong> {cp.thirdParty.googleAds}</li>
              <li><strong>Google Analytics:</strong> {cp.thirdParty.googleAnalytics}</li>
            </ul>
            <p>{cp.thirdParty.optOut}</p>
          </section>

          <section>
            <h2>{cp.manage.heading}</h2>
            <p>{cp.manage.content}</p>
            <ul>
              {cp.manage.steps.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
            <p>{cp.manage.resources}</p>
          </section>

          <section>
            <h2>{cp.changes.heading}</h2>
            <p>{cp.changes.content}</p>
          </section>

          <section>
            <h2>{cp.contact.heading}</h2>
            <p>{cp.contact.content}</p>
            <p>
              <strong>{cp.contact.email}</strong>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-[rgba(201,160,80,0.15)] bg-[#0a0a14]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center text-[#9a8a70] text-sm">
            <p>&copy; {new Date().getFullYear()} GameGuide. {dict.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
