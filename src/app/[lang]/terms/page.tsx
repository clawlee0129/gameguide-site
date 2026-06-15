import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - GameGuide",
  description: "GameGuide Terms of Service",
};

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur border-b border-gray-200 dark:border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.guides}</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{dict.terms.title}</h1>
        <p className="text-gray-600 dark:text-[#a0a0a0] mb-8">{dict.terms.lastUpdated}</p>

        <div className="space-y-8 text-gray-700 dark:text-[#c0c0c0] leading-relaxed">
          {dict.terms.sections.map((section: { heading: string; content: string }, idx: number) => (
            <section key={idx}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{section.heading}</h2>
              <p className="whitespace-pre-line">{section.content}</p>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-[#2a2a2a] py-8 text-center text-gray-500 dark:text-[#666] text-sm bg-gray-100 dark:bg-[#08080c]">
        <p>&copy; {new Date().getFullYear()} GameGuide. {dict.footer.rights}</p>
      </footer>
    </div>
  );
}
