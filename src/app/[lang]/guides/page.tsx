import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGuides } from "@/data/sampleData";
import type { Metadata } from "next";
import SearchBar from "@/components/SearchBar";
import SafeImage from "@/components/SafeImage";

const CATEGORIES = ["All","RPG","Action","Adventure","Horror","Platformer","Strategy","Simulation","Puzzle","Fighting","Racing","Sports"];

export const metadata: Metadata = {
  title: "All Guides - GameGuide",
  description: "Browse all game guides, walkthroughs, builds, and tips.",
};

export default async function GuidesPage({ params, searchParams }: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const { lang } = await params;
  const sp = await searchParams;
  const dict = getDictionary(getLangFromParams({ lang }));

  let guides = sampleGuides;
  if (sp.cat && sp.cat !== "All") guides = guides.filter((g) => g.category === sp.cat);
  if (sp.q) {
    const q = sp.q.toLowerCase();
    guides = guides.filter((g) =>
      g.title.toLowerCase().includes(q) || g.titleZh.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) || g.gameTitle.toLowerCase().includes(q)
    );
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gameguide.guide/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: `https://gameguide.guide/${lang}/guides` },
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur border-b border-gray-200 dark:border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="text-[#6C3FB7]">{dict.nav.guides}</Link>
            <Link href={`/${lang}/categories`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.categories}</Link>
            <SearchBar lang={lang} dict={dict} />
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{dict.nav.guides}</h1>

        <form className="flex flex-wrap gap-3 mb-8" method="get">
          <input type="text" name="q" defaultValue={sp.q || ""} placeholder={dict.search.placeholder}
            className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg px-4 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#a0a0a0] focus:outline-none focus:border-[#6C3FB7] w-full sm:w-64" />
          <select name="cat" defaultValue={sp.cat || "All"}
            className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#6C3FB7]">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="submit" className="btn-primary text-sm">{dict.nav.search}</button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link key={guide.id} href={`/${lang}/guides/${guide.slug}`} className="card overflow-hidden group bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a]">
              <div className="aspect-[16/9] relative overflow-hidden">
                <SafeImage src={guide.image} alt={guide.title} loading="lazy" className="w-full h-full object-cover"
                  fallbackSrc={`/images/games/${guide.gameId}.jpg`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-[#08080c]/80 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-[#6C3FB7] bg-[#6C3FB7]/10 px-2 py-0.5 rounded">{guide.category}</span>
                  {guide.views > 0 ? (
                    <span className="text-xs text-gray-600 dark:text-[#a0a0a0]">{guide.views.toLocaleString()} {dict.guide.views}</span>
                  ) : (
                    <span className="text-xs text-[#a855f7] font-medium">{dict.guide.new}</span>
                  )}
                </div>
                <h3 className="font-semibold mt-1 group-hover:text-[#6C3FB7] transition-colors text-gray-900 dark:text-white">{lang === "zh" ? guide.titleZh : guide.title}</h3>
                <p className="text-sm text-gray-600 dark:text-[#a0a0a0] mt-2 line-clamp-2">{lang === "zh" ? guide.descriptionZh : guide.description}</p>
                <div className="flex items-center gap-3 mt-4 text-xs text-gray-600 dark:text-[#a0a0a0]">
                  <span>{lang === "zh" ? guide.gameTitleZh : guide.gameTitle}</span>
                  <span>{guide.difficulty}</span>
                  <span>{guide.timeToRead}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {guides.length === 0 && <p className="text-gray-600 dark:text-[#a0a0a0] text-center py-12">{dict.search.noResults}</p>}
      </main>
    </div>
  );
}
