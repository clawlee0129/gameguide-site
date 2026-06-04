import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGuides } from "@/data/sampleData";
import { notFound } from "next/navigation";

export default async function GuideDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  const guide = sampleGuides.find((g) => g.slug === slug);
  if (!guide) notFound();

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#6C3FB7]">{dict.nav.home}</Link>
            <Link href={`/${lang}/guides`} className="text-[#6C3FB7]">{dict.nav.guides}</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href={`/${lang}/guides`} className="text-sm text-[#6C3FB7] hover:underline mb-6 inline-block">&larr; {dict.guide.backToGuides}</Link>

        <article>
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-xs text-[#6C3FB7] bg-[#6C3FB7]/10 px-3 py-1 rounded">{guide.category}</span>
              <span className="text-xs text-[#a0a0a0] bg-[#1a1a1a] px-3 py-1 rounded">{guide.difficulty}</span>
              <span className="text-xs text-[#a0a0a0] bg-[#1a1a1a] px-3 py-1 rounded">{guide.timeToRead}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{lang === "zh" ? guide.titleZh : guide.title}</h1>
            <p className="text-[#a0a0a0]">{lang === "zh" ? guide.gameTitleZh : guide.gameTitle}</p>
          </div>

          <p className="text-[#a0a0a0] mb-8 text-lg">{lang === "zh" ? guide.descriptionZh : guide.description}</p>

          <div className="space-y-6">
            {guide.sections.map((section, idx) => (
              <div key={idx} className="card p-6">
                <h2 className="text-xl font-bold mb-4">{lang === "zh" ? section.titleZh : section.title}</h2>
                <p className="text-[#a0a0a0] leading-relaxed">{lang === "zh" ? section.contentZh : section.content}</p>
              </div>
            ))}
          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-[#2a2a2a] text-center">
          <Link href={`/${lang}/guides`} className="btn-primary">&larr; {dict.guide.backToGuides}</Link>
        </div>
      </main>
    </div>
  );
}
