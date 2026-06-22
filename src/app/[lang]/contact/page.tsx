import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  return {
    title: `${dict.contact.title} - GameGuide`,
    description: dict.contact.subtitle,
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));

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

      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2 text-[#e2d0b0]">{dict.contact.title}</h1>
        <p className="text-[#9a8a70] mb-8">{dict.contact.subtitle}</p>
        <ContactForm dict={dict} />
      </main>
    </div>
  );
}
