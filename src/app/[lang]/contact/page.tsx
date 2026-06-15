import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - GameGuide",
  description: "Get in touch with the GameGuide team.",
};

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
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
            <Link href={`/${lang}/categories`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.categories}</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{dict.contact.title}</h1>
        <p className="text-gray-600 dark:text-[#a0a0a0] mb-8">{dict.contact.subtitle}</p>

        <form className="space-y-5" onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const fields = Object.fromEntries(new FormData(form));
          window.location.href = `mailto:contact@gameguide.guide?subject=${encodeURIComponent(String(fields.subject || ""))}&body=${encodeURIComponent(String(fields.message || "") + "\n\n---\nFrom: " + String(fields.name || "") + " (" + String(fields.email || "") + ")")}`;
        }}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-[#a0a0a0] mb-1">{dict.contact.name}</label>
            <input
              type="text" id="name" name="name" required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6C3FB7] focus:border-transparent outline-none transition-colors"
              placeholder={dict.contact.namePlaceholder}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-[#a0a0a0] mb-1">{dict.contact.email}</label>
            <input
              type="email" id="email" name="email" required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6C3FB7] focus:border-transparent outline-none transition-colors"
              placeholder={dict.contact.emailPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-[#a0a0a0] mb-1">{dict.contact.subject}</label>
            <input
              type="text" id="subject" name="subject" required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6C3FB7] focus:border-transparent outline-none transition-colors"
              placeholder={dict.contact.subjectPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-[#a0a0a0] mb-1">{dict.contact.message}</label>
            <textarea
              id="message" name="message" required rows={5}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6C3FB7] focus:border-transparent outline-none transition-colors resize-y"
              placeholder={dict.contact.messagePlaceholder}
            />
          </div>
          <button type="submit" className="btn-primary w-full py-3 text-base">
            {dict.contact.send}
          </button>
        </form>
      </main>
    </div>
  );
}
