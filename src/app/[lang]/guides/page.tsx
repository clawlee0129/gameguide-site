import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGuides, sampleGames } from "@/data/sampleData";

const CATEGORIES = ["All","RPG","Action","Adventure","Horror","Platformer","Strategy","Simulation","Puzzle","Fighting","Racing","Sports"];

export default async function GuidesPage({ params, searchParams }: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const { lang } = await params;
  const sp = await searchParams;
  const dict = getDictionary(getLangFromParams({ lang }));

  let guides = sampleGuides;
  if (sp.cat && sp.cat !== "All") {
    guides = guides.filter((g) => g.category === sp.cat);
  }
  if (sp.q) {
    const q = sp.q.toLowerCase();
    guides = guides.filter((g) =>
      g.title.toLowerCase().includes(q) || g.titleZh.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) || g.gameTitle.toLowerCase().includes(q)
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#6C3FB7]">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="hover:text-[#6C3FB7]">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="text-[#6C3FB7]">{dict.nav.guides}</Link>
            <Link href={`/${lang}/categories`} className="hover:text-[#6C3FB7]">{dict.nav.categories}</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">{dict.nav.guides}</h1>

        <form className="flex flex-wrap gap-3 mb-8" method="get">
          <input type="text" name="q" defaultValue={sp.q || ""} placeholder={dict.search.placeholder}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white placeholder-[#a0a0a0] focus:outline-none focus:border-[#6C3FB7] w-full sm:w-64" />
          <select name="cat" defaultValue={sp.cat || "All"}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#6C3FB7]">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="submit" className="btn-primary text-sm">{dict.nav.search}</button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link key={guide.id} href={`/${lang}/guides/${guide.slug}`} className="card p-5 group">
              <span className="text-xs text-[#6C3FB7] bg-[#6C3FB7]/10 px-2 py-0.5 rounded">{guide.category}</span>
              <h3 className="font-semibold mt-3 group-hover:text-[#6C3FB7] transition-colors">{lang === "zh" ? guide.titleZh : guide.title}</h3>
              <p className="text-sm text-[#a0a0a0] mt-2 line-clamp-2">{lang === "zh" ? guide.descriptionZh : guide.description}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-[#a0a0a0]">
                <span>{lang === "zh" ? guide.gameTitleZh : guide.gameTitle}</span>
                <span>{guide.difficulty}</span>
                <span>{guide.timeToRead}</span>
              </div>
            </Link>
          ))}
        </div>

        {guides.length === 0 && <p className="text-[#a0a0a0] text-center py-12">{dict.search.noResults}</p>}
      </main>
    </div>
  );
}
