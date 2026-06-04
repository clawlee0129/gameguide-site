import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGuides, sampleGames } from "@/data/sampleData";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  const altLang = lang === "zh" ? "en" : "zh";
  const featuredGames = sampleGames.filter((g) => g.featured).slice(0, 4);
  const latestGuides = sampleGuides.slice(-6).reverse();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#6C3FB7]">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="hover:text-[#6C3FB7]">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#6C3FB7]">{dict.nav.guides}</Link>
            <Link href={`/${lang}/categories`} className="hover:text-[#6C3FB7]">{dict.nav.categories}</Link>
            <Link href={`/${altLang}`} className="btn-outline text-xs py-1 px-3">{dict.nav.lang}</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-3 w-full">
        <ins className="adsbygoogle block" data-ad-client="ca-pub-4051053911004228" data-ad-slot="header-banner" data-ad-format="auto" data-full-width-responsive="true" style={{ display: "block", height: 90, background: "#1a1a1a", borderRadius: 8 }} />
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-6 w-full">
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-8">{dict.home.featured}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGames.map((game) => (
              <Link key={game.id} href={`/${lang}/games/${game.slug}`} className="card overflow-hidden group">
                <div className="aspect-video bg-[#252525] flex items-center justify-center text-[#6C3FB7] text-lg font-bold">{game.title}</div>
                <div className="p-4">
                  <h3 className="font-semibold group-hover:text-[#6C3FB7] transition-colors">{lang === "zh" ? game.titleZh : game.title}</h3>
                  <p className="text-sm text-[#a0a0a0] mt-1 line-clamp-2">{lang === "zh" ? game.descriptionZh : game.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-[#6C3FB7] bg-[#6C3FB7]/10 px-2 py-0.5 rounded">{game.category}</span>
                    <span className="text-xs text-[#a0a0a0]">{game.rating}/10</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-12 border-t border-[#2a2a2a]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">{dict.home.latest}</h2>
            <Link href={`/${lang}/guides`} className="text-sm text-[#6C3FB7] hover:underline">{dict.home.viewAll} &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestGuides.map((guide) => (
              <Link key={guide.id} href={`/${lang}/guides/${guide.slug}`} className="card p-5 group">
                <span className="text-xs text-[#6C3FB7] bg-[#6C3FB7]/10 px-2 py-0.5 rounded">{guide.category}</span>
                <h3 className="font-semibold mt-3 group-hover:text-[#6C3FB7] transition-colors">{lang === "zh" ? guide.titleZh : guide.title}</h3>
                <p className="text-sm text-[#a0a0a0] mt-2 line-clamp-2">{lang === "zh" ? guide.descriptionZh : guide.description}</p>
                <div className="flex items-center gap-3 mt-4 text-xs text-[#a0a0a0]">
                  <span>{lang === "zh" ? guide.gameTitleZh : guide.gameTitle}</span>
                  <span>{guide.timeToRead}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-12 border-t border-[#2a2a2a]">
          <h2 className="text-2xl font-bold mb-8">{dict.home.categories}</h2>
          <div className="flex flex-wrap gap-3">
            {["RPG","Action","Adventure","Horror","Platformer","Strategy","Simulation","Puzzle","Fighting","Racing","Sports"].map((cat) => (
              <Link key={cat} href={`/${lang}/categories?cat=${cat}`} className="btn-outline text-sm">{cat}</Link>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-[#2a2a2a] text-center">
          <h2 className="text-2xl font-bold mb-4">{dict.home.newsletter}</h2>
          <p className="text-[#a0a0a0] mb-6 max-w-md mx-auto">{dict.home.newsletterDesc}</p>
          <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={dict.home.emailPlaceholder} className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-[#a0a0a0] focus:outline-none focus:border-[#6C3FB7]" />
            <button type="submit" className="btn-primary whitespace-nowrap">{dict.home.subscribe}</button>
          </form>
        </section>
      </main>

      <div className="mx-auto max-w-7xl px-6 py-3 w-full">
        <ins className="adsbygoogle block" data-ad-client="ca-pub-4051053911004228" data-ad-slot="footer-banner" data-ad-format="auto" data-full-width-responsive="true" style={{ display: "block", height: 90, background: "#1a1a1a", borderRadius: 8 }} />
      </div>

      <footer className="border-t border-[#2a2a2a] py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gradient mb-3">GameGuide</h3>
            <p className="text-sm text-[#a0a0a0]">{dict.footer.about}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{dict.footer.quickLinks}</h4>
            <div className="flex flex-col gap-2 text-sm text-[#a0a0a0]">
              <Link href={`/${lang}/games`} className="hover:text-white">{dict.nav.games}</Link>
              <Link href={`/${lang}/guides`} className="hover:text-white">{dict.nav.guides}</Link>
              <Link href={`/${lang}/categories`} className="hover:text-white">{dict.nav.categories}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{dict.footer.followUs}</h4>
            <div className="flex gap-4 text-sm text-[#a0a0a0]">
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Discord</a>
              <a href="#" className="hover:text-white">YouTube</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-[#2a2a2a] text-center text-sm text-[#a0a0a0]">
          &copy; {new Date().getFullYear()} GameGuide. {dict.footer.rights}
        </div>
      </footer>
    </div>
  );
}
