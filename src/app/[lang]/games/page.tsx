"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { sampleGames } from "@/data/sampleData";
import SearchBar from "@/components/SearchBar";
import SafeImage from "@/components/SafeImage";
import AdBanner from "@/components/AdBanner";

const PLATFORMS = ["All", "PS5", "Xbox", "PC", "Switch", "PS4"];
const CATEGORIES = ["All", "RPG", "Action", "Adventure", "Horror", "Platformer", "Strategy", "Simulation", "Puzzle", "Fighting", "Racing", "Sports"];

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "rating-desc", label: "Rating (High-Low)" },
  { value: "rating-asc", label: "Rating (Low-High)" },
];

const platformActiveColors: Record<string, string> = {
  PS5: "bg-[#c9a050] text-black border-[#c9a050]",
  Xbox: "bg-[#22c55e] text-white border-[#22c55e]",
  PC: "bg-[#3b82f6] text-white border-[#3b82f6]",
  Switch: "bg-[#ef4444] text-white border-[#ef4444]",
  PS4: "bg-[#c9a050] text-black border-[#c9a050]",
};

const platformBadgeColors: Record<string, string> = {
  PS5: "text-[#a855f7] bg-[#a855f7]/10",
  PS4: "text-[#a855f7] bg-[#a855f7]/10",
  Xbox: "text-[#22c55e] bg-[#22c55e]/10",
  "Xbox Series X": "text-[#22c55e] bg-[#22c55e]/10",
  "Xbox Series X|S": "text-[#22c55e] bg-[#22c55e]/10",
  PC: "text-[#3b82f6] bg-[#3b82f6]/10",
  Switch: "text-[#ef4444] bg-[#ef4444]/10",
  "Nintendo Switch": "text-[#ef4444] bg-[#ef4444]/10",
};

interface GamesPageClientProps {
  lang: string;
  dict: Record<string, any>;
}

function GamesPageClient({ lang, dict }: GamesPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activePlatform = searchParams.get("platform") || "All";
  const activeCategory = searchParams.get("cat") || "All";
  const activeSort = searchParams.get("sort") || "name-asc";

  const filtered = sampleGames.filter((g) => {
    const platformMatch = activePlatform === "All" || (g.platforms?.includes(activePlatform) ?? false);
    const categoryMatch = activeCategory === "All" || g.category === activeCategory;
    return platformMatch && categoryMatch;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (activeSort) {
      case "name-asc":
        return (lang === "zh" ? a.titleZh : a.title).localeCompare(lang === "zh" ? b.titleZh : b.title);
      case "name-desc":
        return (lang === "zh" ? b.titleZh : b.title).localeCompare(lang === "zh" ? a.titleZh : a.title);
      case "rating-desc":
        return b.rating - a.rating;
      case "rating-asc":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const updateFilter = (type: "platform" | "cat" | "sort", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "sort" && value === "name-asc") {
      params.delete("sort");
    } else if ((type === "platform" || type === "cat") && value === "All") {
      params.delete(type);
    } else {
      params.set(type, value);
    }
    router.push(`/${lang}/games?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <header className="sticky top-0 z-50 bg-[#0a0a14]/95 backdrop-blur border-b border-[rgba(201,160,80,0.15)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-4 sm:gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#e2c870] text-[#e2d0b0]">Home</Link>
            <Link href={`/${lang}/games`} className="text-[#c9a050]">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.guides}</Link>
            <Link href={`/${lang}/categories`} className="hover:text-[#e2c870] text-[#e2d0b0]">{dict.nav.categories}</Link>
            <SearchBar lang={lang} dict={dict} />
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-[#e2d0b0]">{dict.nav.games}</h1>

        {/* Platform Filter */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-[#9a8a70] uppercase tracking-wider mb-2">Platform</p>
          <div className="flex gap-2 overflow-x-auto pb-2 flex-nowrap" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {PLATFORMS.map((p) => {
              const isActive = activePlatform === p;
              const isAll = p === "All";
              const activeStyle = isAll
                ? "bg-[#c9a050] text-black border-[#c9a050]"
                : platformActiveColors[p] || "bg-[#c9a050] text-black border-[#c9a050]";
              return (
                <button
                  key={p}
                  onClick={() => updateFilter("platform", p)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    isActive ? activeStyle : "border-[rgba(201,160,80,0.15)] text-[#9a8a70] hover:border-[#c9a050] hover:text-[#e2c870]"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-[#9a8a70] uppercase tracking-wider mb-2">Category</p>
          <div className="flex gap-2 overflow-x-auto pb-2 flex-nowrap" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {CATEGORIES.map((c) => {
              const isActive = activeCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => updateFilter("cat", c)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    isActive
                      ? "bg-[#c9a050] text-black border-[#c9a050]"
                      : "border-[rgba(201,160,80,0.15)] text-[#9a8a70] hover:border-[#c9a050] hover:text-[#e2c870]"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort */}
        <div className="mb-8 flex items-center justify-between">
          <span className="text-xs text-[#9a8a70]">{sorted.length} {sorted.length === 1 ? "game" : "games"}</span>
          <div className="flex gap-2 text-xs">
            {SORT_OPTIONS.map((opt) => {
              const isActive = activeSort === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => updateFilter("sort", opt.value)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    isActive
                      ? "border-[#c9a050] text-[#c9a050] bg-[rgba(201,160,80,0.1)]"
                      : "border-[rgba(201,160,80,0.15)] text-[#9a8a70] hover:border-[#c9a050] hover:text-[#e2c870]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* AdSense 广告位 */}
        <AdBanner slot="7428875943" format="auto" className="py-4" />

        {sorted.length === 0 ? (
          <p className="text-[#9a8a70] text-center py-12">No games match the selected filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sorted.map((game) => (
              <Link key={game.id} href={`/${lang}/games/${game.slug}`} className="card-dark overflow-hidden group">
                <div className="aspect-video bg-[#252525] flex items-center justify-center text-[#c9a050] text-lg font-bold">
                  <SafeImage
                    src={`/images/games/${game.slug}.jpg`}
                    alt={game.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold group-hover:text-[#e2c870] transition-colors text-[#e2d0b0]">{lang === "zh" ? game.titleZh : game.title}</h3>
                  <p className="text-sm text-[#9a8a70] mt-1 line-clamp-2">{lang === "zh" ? game.descriptionZh : game.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-[#c9a050] bg-[rgba(201,160,80,0.1)] px-2 py-0.5 rounded">{game.category}</span>
                    <span className="text-xs text-[#9a8a70]">{game.rating}/10</span>
                  </div>
                  {/* Platform icons */}
                  {game.platforms && game.platforms.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {game.platforms.map((p: string) => (
                        <span key={p} className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${platformBadgeColors[p] || "text-[#9a8a70] bg-[#141020]"}`}>
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

import { getDictionary, getLangFromParams } from "@/i18n";

export default async function GamesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sampleGames.map((game, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "VideoGame",
        name: lang === "zh" ? game.titleZh : game.title,
        url: `https://gameguide.guide/${lang}/games/${game.slug}`,
        description: lang === "zh" ? game.descriptionZh : game.description,
        genre: game.category,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://gameguide.guide/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dict.nav.games,
        item: `https://gameguide.guide/${lang}/games`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GamesPageClient lang={lang} dict={dict} />
    </>
  );
}
