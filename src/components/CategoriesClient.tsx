"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

interface Game {
  id: string;
  slug: string;
  title: string;
  titleZh: string;
  category: string;
  rating: number;
  image: string;
}

interface Guide {
  id: string;
  slug: string;
  title: string;
  titleZh: string;
  gameTitle: string;
  gameTitleZh: string;
  category: string;
  difficulty: string;
}

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "rating-desc", label: "Rating (High-Low)" },
  { value: "rating-asc", label: "Rating (Low-High)" },
];

export default function CategoriesClient({
  games,
  guides,
  lang,
  dict,
  activeCat,
  categories,
}: {
  games: Game[];
  guides: Guide[];
  lang: string;
  dict: Record<string, any>;
  activeCat: string | null;
  categories: string[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  const filteredGames = useMemo(() => {
    let result = searchQuery
      ? games.filter((g) => {
          const title = (lang === "zh" ? g.titleZh : g.title).toLowerCase();
          return title.includes(searchQuery.toLowerCase());
        })
      : [...games];

    result.sort((a, b) => {
      switch (sortBy) {
        case "name-asc": return (lang === "zh" ? a.titleZh : a.title).localeCompare(lang === "zh" ? b.titleZh : b.title);
        case "name-desc": return (lang === "zh" ? b.titleZh : b.title).localeCompare(lang === "zh" ? a.titleZh : a.title);
        case "rating-desc": return b.rating - a.rating;
        case "rating-asc": return a.rating - b.rating;
        default: return 0;
      }
    });
    return result;
  }, [games, searchQuery, sortBy, lang]);

  const filteredGuides = useMemo(() => {
    let result = searchQuery
      ? guides.filter((g) => {
          const title = (lang === "zh" ? g.titleZh : g.title).toLowerCase();
          return title.includes(searchQuery.toLowerCase());
        })
      : [...guides];

    result.sort((a, b) => {
      const titleA = lang === "zh" ? a.titleZh : a.title;
      const titleB = lang === "zh" ? b.titleZh : b.title;
      switch (sortBy) {
        case "name-asc": return titleA.localeCompare(titleB);
        case "name-desc": return titleB.localeCompare(titleA);
        default: return 0;
      }
    });
    return result;
  }, [guides, searchQuery, sortBy, lang]);

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <Link key={cat} href={`/${lang}/categories?cat=${cat}`}
            className={`text-sm px-4 py-2 rounded-lg transition-colors ${activeCat === cat ? "bg-gradient-to-r from-[#c9a050] to-[#8b5a20] text-black font-semibold" : "border border-[rgba(201,160,80,0.25)] text-[#c9a050] hover:bg-[rgba(201,160,80,0.05)]"}`}>
            {dict.categoryNames?.[cat] || cat}
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a8a70]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={dict.search.placeholder}
                className="w-full bg-[#141020] border border-[rgba(201,160,80,0.15)] rounded-lg pl-10 pr-4 py-2 text-[#e2d0b0] text-sm placeholder:text-[#9a8a70] focus:outline-none focus:border-[#c9a050]"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-sm text-[#9a8a70] whitespace-nowrap">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-[rgba(201,160,80,0.15)] bg-[#141020] text-[#e2d0b0] rounded-lg px-3 py-2 focus:outline-none focus:border-[#c9a050]"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredGames.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-[#e2d0b0]">{dict.nav.games}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <Link key={game.id} href={`/${lang}/games/${game.slug}`} className="card-dark overflow-hidden group">
                    <div className="aspect-video bg-[#141020] overflow-hidden">
                      <SafeImage
                        src={game.image}
                        alt={game.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold group-hover:text-[#e2c870] text-[#e2d0b0]">{lang === "zh" ? game.titleZh : game.title}</h3>
                      <span className="text-xs text-[#9a8a70]">{game.rating}/10</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {filteredGuides.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#e2d0b0]">{dict.nav.guides}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuides.map((guide) => (
                  <Link key={guide.id} href={`/${lang}/guides/${guide.slug}`} className="card-dark p-5 group">
                    <h3 className="font-semibold group-hover:text-[#e2c870] text-[#e2d0b0]">{lang === "zh" ? guide.titleZh : guide.title}</h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[#9a8a70]">
                      <span>{lang === "zh" ? guide.gameTitleZh : guide.gameTitle}</span>
                      <span>{guide.difficulty}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {filteredGames.length === 0 && filteredGuides.length === 0 && (
            <p className="text-[#9a8a70] text-center py-12">{dict.search.noResults}</p>
          )}
    </>
  );
}
