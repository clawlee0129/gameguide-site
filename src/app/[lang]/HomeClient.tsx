"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { sampleGuides, sampleGames } from "@/data/sampleData";
import CookieConsent from "./CookieConsent";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";

const CATEGORY_LIST = ["RPG","Action","Adventure","Horror","Platformer","Strategy","Simulation","Puzzle","Fighting","Racing","Sports"];

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
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur border-b border-gray-200 dark:border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-4 sm:gap-6 text-sm">
            <Link href={`/${lang}`} className="text-[#6C3FB7]">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.guides}</Link>
            <Link href={`/${lang}/categories`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.categories}</Link>
            <div className="ml-2">
              <SearchBar lang={lang} dict={dict} />
            </div>
            <ThemeToggle />
            <Link href={`/${otherLang}`} className="text-xs text-gray-600 dark:text-[#a0a0a0] hover:text-[#6C3FB7]">{dict.nav.lang}</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative py-20 md:py-32 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#6C3FB7]/20 via-white dark:via-[#0f0f0f] to-white dark:to-[#0f0f0f] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              <span className="text-gradient">{dict.site.title}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-[#a0a0a0] mb-4">{dict.site.subtitle}</p>
            <p className="text-sm md:text-base text-gray-500 dark:text-[#666] max-w-2xl mx-auto mb-8">{dict.site.description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/guides`} className="btn-primary text-base px-8 py-3">{dict.home.viewAll} &rarr;</Link>
              <Link href={`/${lang}/games`} className="btn-outline text-base px-8 py-3">{dict.nav.games}</Link>
            </div>
          </div>
        </section>

        {/* Ad: Top Banner */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center">
            <ins className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-4051053911004228"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>

        {/* Featured Games */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{dict.home.featured}</h2>
            <Link href={`/${lang}/games`} className="text-sm text-[#6C3FB7] hover:underline">{dict.home.viewAll} &rarr;</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredGames.map((game) => (
              <Link key={game.id} href={`/${lang}/games/${game.slug}`} className="card overflow-hidden group bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a]">
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                  <img
                    src={`/images/games/${game.slug}.jpg`}
                    alt={game.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).parentElement!.classList.add("flex", "items-center", "justify-center", "text-[#6C3FB7]", "text-xs", "font-bold");
                      (e.target as HTMLImageElement).parentElement!.textContent = game.title;
                    }}
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold group-hover:text-[#6C3FB7] transition-colors line-clamp-1 text-gray-900 dark:text-white">
                    {lang === "zh" ? game.titleZh : game.title}
                  </h3>
                  <span className="text-xs text-gray-600 dark:text-[#a0a0a0]">{game.platforms?.join(", ") || game.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Ad: Content Mid */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center">
            <ins className="adsbygoogle"
              style={{ display: "block", textAlign: "center" }}
              data-ad-client="ca-pub-4051053911004228"
              data-ad-slot="2345678901"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>

        {/* Latest + Trending Guides */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Latest Guides */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{dict.home.latest}</h2>
                <Link href={`/${lang}/guides`} className="text-sm text-[#6C3FB7] hover:underline">{dict.home.viewAll} &rarr;</Link>
              </div>
              <div className="space-y-4">
                {latestGuides.map((guide) => (
                  <Link key={guide.id} href={`/${lang}/guides/${guide.slug}`} className="card p-4 flex gap-4 group bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a]">
                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                      <img
                        src={guide.image}
                        alt={guide.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = `/images/games/${guide.gameId}.jpg`;
                          img.onerror = () => { img.style.display = "none"; };
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold group-hover:text-[#6C3FB7] transition-colors line-clamp-2 text-gray-900 dark:text-white">
                        {lang === "zh" ? guide.titleZh : guide.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-600 dark:text-[#a0a0a0]">
                        <span className="text-[#6C3FB7] bg-[#6C3FB7]/10 px-2 py-0.5 rounded">{guide.category}</span>
                        <span>{guide.timeToRead}</span>
                        {guide.views > 0 ? (
                          <span>{guide.views.toLocaleString()} {dict.guide.views}</span>
                        ) : (
                          <span className="text-[#a855f7] font-medium">{dict.guide.new}</span>
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{dict.home.trending}</h2>
                <Link href={`/${lang}/guides`} className="text-sm text-[#6C3FB7] hover:underline">{dict.home.viewAll} &rarr;</Link>
              </div>
              <div className="space-y-4">
                {trendingGuides.map((guide) => (
                  <Link key={guide.id} href={`/${lang}/guides/${guide.slug}`} className="card p-4 flex gap-4 group bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a]">
                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                      <img
                        src={guide.image}
                        alt={guide.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = `/images/games/${guide.gameId}.jpg`;
                          img.onerror = () => { img.style.display = "none"; };
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold group-hover:text-[#6C3FB7] transition-colors line-clamp-2 text-gray-900 dark:text-white">
                        {lang === "zh" ? guide.titleZh : guide.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-600 dark:text-[#a0a0a0]">
                        <span className="text-[#6C3FB7] bg-[#6C3FB7]/10 px-2 py-0.5 rounded">{guide.category}</span>
                        <span>{guide.timeToRead}</span>
                        {guide.views > 0 ? (
                          <span>{guide.views.toLocaleString()} {dict.guide.views}</span>
                        ) : (
                          <span className="text-[#a855f7] font-medium">{dict.guide.new}</span>
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
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{dict.home.categories}</h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORY_LIST.map((cat) => (
              <Link key={cat} href={`/${lang}/categories?cat=${cat}`} className="btn-outline text-sm px-5 py-2.5">
                {cat}
              </Link>
            ))}
          </div>
        </section>

        {/* Ad: Bottom */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center">
            <ins className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-4051053911004228"
              data-ad-slot="3456789012"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>

        {/* Newsletter */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="card p-8 md:p-12 bg-gradient-to-br from-[#6C3FB7]/10 to-transparent border border-[#6C3FB7]/20 text-center">
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{dict.home.newsletter}</h2>
            <p className="text-gray-600 dark:text-[#a0a0a0] mb-6 max-w-md mx-auto">{dict.home.newsletterDesc}</p>
            <form
              action="https://gameguide.us22.list-manage.com/subscribe/post?u=REPLACE_ME&amp;id=REPLACE_ME"
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
                <input type="text" name="b_REPLACE_ME_REPLACE_ME" tabIndex={-1} defaultValue="" />
              </div>
              <input
                type="email"
                name="EMAIL"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (newsletterStatus !== "idle") setNewsletterStatus("idle"); }}
                placeholder={dict.home.emailPlaceholder}
                required
                disabled={newsletterStatus === "submitting"}
                className="flex-1 bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#a0a0a0] focus:outline-none focus:border-[#6C3FB7]"
              />
              <button type="submit" className="btn-primary px-6 py-3 whitespace-nowrap" disabled={newsletterStatus === "submitting"}>
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

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-[#2a2a2a] bg-gray-100 dark:bg-[#08080c]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gradient mb-3">GameGuide</h3>
              <p className="text-sm text-gray-600 dark:text-[#a0a0a0] leading-relaxed">{dict.footer.about}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">{dict.footer.quickLinks}</h4>
              <div className="space-y-2 text-sm">
                <Link href={`/${lang}/games`} className="block text-gray-600 dark:text-[#a0a0a0] hover:text-[#6C3FB7]">{dict.nav.games}</Link>
                <Link href={`/${lang}/guides`} className="block text-gray-600 dark:text-[#a0a0a0] hover:text-[#6C3FB7]">{dict.nav.guides}</Link>
                <Link href={`/${lang}/categories`} className="block text-gray-600 dark:text-[#a0a0a0] hover:text-[#6C3FB7]">{dict.nav.categories}</Link>
                <Link href={`/${lang}/privacy`} className="block text-gray-600 dark:text-[#a0a0a0] hover:text-[#6C3FB7]">{dict.footer.privacy}</Link>
                <Link href={`/${lang}/terms`} className="block text-gray-600 dark:text-[#a0a0a0] hover:text-[#6C3FB7]">{dict.footer.terms}</Link>
                <Link href={`/${lang}/contact`} className="block text-gray-600 dark:text-[#a0a0a0] hover:text-[#6C3FB7]">{dict.footer.contact}</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">{dict.footer.followUs}</h4>
              <div className="flex flex-col space-y-2 text-sm">
                <a href="https://twitter.com/gameguide" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-[#a0a0a0] hover:text-[#1DA1F2] inline-flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Twitter
                </a>
                <a href="https://discord.gg/gameguide" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-[#a0a0a0] hover:text-[#5865F2] inline-flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  Discord
                </a>
                <a href="https://youtube.com/@gameguide" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-[#a0a0a0] hover:text-[#FF0000] inline-flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  YouTube
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-[#1a1a1a] text-center text-gray-500 dark:text-[#666] text-sm">
            <p>&copy; {new Date().getFullYear()} GameGuide. {dict.footer.rights}</p>
          </div>
        </div>
      </footer>

      <CookieConsent dict={dict} />
    </div>
  );
}
