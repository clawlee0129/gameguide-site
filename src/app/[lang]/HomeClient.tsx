"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { sampleGuides, sampleGames } from "@/data/sampleData";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import AdBanner from "@/components/AdBanner";

const CATEGORY_LIST = ["RPG","Action","Adventure","Horror","Platformer","Strategy","Simulation","Puzzle","Fighting","Racing","Sports"];

const MAILCHIMP_U = process.env.NEXT_PUBLIC_MAILCHIMP_U || "REPLACE_ME";
const MAILCHIMP_ID = process.env.NEXT_PUBLIC_MAILCHIMP_ID || "REPLACE_ME";

const ANCHOR_GAMES = ["elden-ring","baldurs-gate-3","zelda-totk","genshin-impact","cyberpunk-2077","hogwarts-legacy"];

export default function HomeClient({ dict, lang, otherLang }: { dict: Record<string, any>; lang: "en" | "zh"; otherLang: string }) {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const featuredGames = sampleGames.filter((g) => ANCHOR_GAMES.includes(g.slug));

  const allGuides = sampleGuides;
  const latestGuides = allGuides.slice(-6).reverse();
  const latestIds = new Set(latestGuides.map((g) => g.id));
  const remainingGuides = allGuides.filter((g) => !latestIds.has(g.id));
  const trendingGuides = [...remainingGuides].sort((a, b) => a.slug.localeCompare(b.slug)).slice(0, 6);

  useEffect(() => {
    try {
      (window as any).adsbygoogle?.push({});
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a14]/95 backdrop-blur border-b border-[rgba(201,160,80,0.15)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-4 sm:gap-6 text-sm">
            <Link href={`/${lang}`} className="text-[#c9a050]">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.guides}</Link>
            <Link href={`/${lang}/categories`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.categories}</Link>
            <div className="ml-2">
              <SearchBar lang={lang} dict={dict} />
            </div>
            <ThemeToggle dict={dict} />
            <Link href={`/${otherLang}`} className="text-xs text-[#9a8a70] hover:text-[#e2c870]">{dict.nav.lang}</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative py-20 md:py-32 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(201,160,80,0.15)] via-[#0a0a14] to-[#0a0a14] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              <span className="text-gradient">{dict.site.title}</span>
            </h1>
            <p className="text-lg md:text-xl text-[#9a8a70] mb-4">{dict.site.subtitle}</p>
            <p className="text-sm md:text-base text-[#9a8a70] max-w-2xl mx-auto mb-8">{dict.site.description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/guides`} className="bg-gradient-to-r from-[#c9a050] to-[#8b5a20] text-black font-semibold rounded-lg text-base px-8 py-3">{dict.home.viewAll} &rarr;</Link>
              <Link href={`/${lang}/games`} className="border border-[rgba(201,160,80,0.25)] text-[#c9a050] hover:bg-[rgba(201,160,80,0.05)] rounded-lg text-base px-8 py-3">{dict.nav.games}</Link>
            </div>
          </div>
        </section>

        {/* AdSense 广告位 */}
        <AdBanner slot="8973872421" format="auto" className="py-4" />

        {/* Featured Games */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#e2d0b0]">{dict.home.featured}</h2>
            <Link href={`/${lang}/games`} className="text-sm text-[#c9a050] hover:underline">{dict.home.viewAll} &rarr;</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredGames.map((game) => (
              <Link key={game.id} href={`/${lang}/games/${game.slug}`} className="card-dark overflow-hidden group">
                <div className="aspect-[4/3] relative overflow-hidden bg-[#141020]">
                  <img
                    src={`/images/games/${game.slug}.jpg`}
                    alt={`${game.title} game artwork`}
                    loading="lazy"
                    width="320"
                    height="240"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).parentElement!.classList.add("flex", "items-center", "justify-center", "text-[#c9a050]", "text-xs", "font-bold");
                      (e.target as HTMLImageElement).parentElement!.textContent = game.title;
                    }}
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold group-hover:text-[#e2c870] transition-colors line-clamp-1 text-[#e2d0b0]">
                    {lang === "zh" ? game.titleZh : game.title}
                  </h3>
                  <span className="text-xs text-[#9a8a70]">{game.platforms?.join(", ") || game.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* AdSense 广告位 */}
        <AdBanner slot="1780626731" format="auto" className="py-4" />

        {/* Latest + Trending Guides */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Latest Guides */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#e2d0b0]">{dict.home.latest}</h2>
                <Link href={`/${lang}/guides`} className="text-sm text-[#c9a050] hover:underline">{dict.home.viewAll} &rarr;</Link>
              </div>
              <div className="space-y-4">
                {latestGuides.map((guide) => (
                  <Link key={guide.id} href={`/${lang}/guides/${guide.slug}`} className="card-dark p-4 flex gap-4 group">
                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-[#141020]">
                      <img
                        src={guide.image}
                        alt={`${guide.title} game guide`}
                        loading="lazy"
                        width="80"
                        height="80"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = `/images/games/${guide.gameId}.jpg`;
                          img.onerror = () => { img.style.display = "none"; };
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold group-hover:text-[#e2c870] transition-colors line-clamp-2 text-[#e2d0b0]">
                        {lang === "zh" ? guide.titleZh : guide.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-[#9a8a70]">
                        <span className="text-[#c9a050] bg-[rgba(201,160,80,0.1)] px-2 py-0.5 rounded">{guide.category}</span>
                        <span>{guide.timeToRead}</span>
                        {guide.views > 0 ? (
                          <span>{guide.views.toLocaleString()} {dict.guide.views}</span>
                        ) : (
                          <span className="text-[#c9a050] font-medium">{dict.guide.new}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending Guides */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#e2d0b0]">{dict.home.trending}</h2>
                <Link href={`/${lang}/guides`} className="text-sm text-[#c9a050] hover:underline">{dict.home.viewAll} &rarr;</Link>
              </div>
              <div className="space-y-4">
                {trendingGuides.map((guide) => (
                  <Link key={guide.id} href={`/${lang}/guides/${guide.slug}`} className="card-dark p-4 flex gap-4 group">
                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-[#141020]">
                      <img
                        src={guide.image}
                        alt={`${guide.title} game guide`}
                        loading="lazy"
                        width="80"
                        height="80"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = `/images/games/${guide.gameId}.jpg`;
                          img.onerror = () => { img.style.display = "none"; };
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold group-hover:text-[#e2c870] transition-colors line-clamp-2 text-[#e2d0b0]">
                        {lang === "zh" ? guide.titleZh : guide.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-[#9a8a70]">
                        <span className="text-[#c9a050] bg-[rgba(201,160,80,0.1)] px-2 py-0.5 rounded">{guide.category}</span>
                        <span>{guide.timeToRead}</span>
                        {guide.views > 0 ? (
                          <span>{guide.views.toLocaleString()} {dict.guide.views}</span>
                        ) : (
                          <span className="text-[#c9a050] font-medium">{dict.guide.new}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 text-[#e2d0b0]">{dict.home.categories}</h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORY_LIST.map((cat) => (
              <Link key={cat} href={`/${lang}/categories?cat=${cat}`} className="border border-[rgba(201,160,80,0.25)] text-[#c9a050] hover:bg-[rgba(201,160,80,0.05)] rounded-lg text-sm px-5 py-2.5">
                {dict.categoryNames?.[cat] || cat}
              </Link>
            ))}
          </div>
        </section>

        {/* AdSense 广告位 */}
        <AdBanner slot="8741957612" format="auto" className="py-4" />

        {/* Newsletter */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="card-dark p-8 md:p-12 bg-gradient-to-br from-[rgba(201,160,80,0.08)] to-transparent border-[rgba(201,160,80,0.2)] text-center">
            <h2 className="text-2xl font-bold mb-3 text-[#e2d0b0]">{dict.home.newsletter}</h2>
            <p className="text-[#9a8a70] mb-6 max-w-md mx-auto">{dict.home.newsletterDesc}</p>
            <form
              action={`https://gameguide.us22.list-manage.com/subscribe/post?u=${MAILCHIMP_U}&amp;id=${MAILCHIMP_ID}`}
              method="post"
              target="_blank"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                setNewsletterStatus("submitting");
                const form = e.currentTarget;
                setTimeout(() => {
                  setNewsletterStatus("success");
                  setEmail("");
                  setTimeout(() => setNewsletterStatus("idle"), 3000);
                  form.submit();
                }, 1500);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
                <input type="text" name={`b_${MAILCHIMP_U}_${MAILCHIMP_ID}`} tabIndex={-1} defaultValue="" />
              </div>
              <input
                type="email"
                name="EMAIL"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (newsletterStatus !== "idle") setNewsletterStatus("idle"); }}
                placeholder={dict.home.emailPlaceholder}
                required
                disabled={newsletterStatus === "submitting"}
                className="flex-1 bg-[#141020] border border-[rgba(201,160,80,0.15)] rounded-lg px-4 py-3 text-[#e2d0b0] placeholder:text-[#9a8a70] focus:outline-none focus:border-[#c9a050]"
              />
              <button type="submit" className="bg-gradient-to-r from-[#c9a050] to-[#8b5a20] text-black font-semibold rounded-lg px-6 py-3 whitespace-nowrap" disabled={newsletterStatus === "submitting"}>
                {newsletterStatus === "submitting" ? (dict.home.newsletterSubmitting || "Subscribing...") : dict.home.subscribe}
              </button>
            </form>
            {newsletterStatus === "success" && (
              <p className="mt-4 text-sm text-[#22c55e]">{dict.home.newsletterSuccess}</p>
            )}
            {newsletterStatus === "error" && (
              <p className="mt-4 text-sm text-[#ef4444]">{dict.home.newsletterError}</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
