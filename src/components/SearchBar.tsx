"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { sampleGuides, sampleGames } from "@/data/sampleData";

interface SearchResult {
  type: "guide" | "game";
  title: string;
  subtitle: string;
  slug: string;
  gameSlug?: string;
}

interface SearchBarProps {
  lang: string;
  dict: Record<string, any>;
}

export default function SearchBar({ lang, dict }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileOpen && inputRef.current) inputRef.current.focus();
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    const q = value.toLowerCase();
    const matches: SearchResult[] = [];

    for (const g of sampleGuides) {
      if (
        g.title.toLowerCase().includes(q) ||
        g.titleZh.toLowerCase().includes(q) ||
        g.gameTitle.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
      ) {
        matches.push({
          type: "guide",
          title: lang === "zh" ? g.titleZh : g.title,
          subtitle: lang === "zh" ? g.gameTitleZh : g.gameTitle,
          slug: g.slug,
        });
      }
    }

    for (const g of sampleGames) {
      if (
        g.title.toLowerCase().includes(q) ||
        g.titleZh.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
      ) {
        matches.push({
          type: "game",
          title: lang === "zh" ? g.titleZh : g.title,
          subtitle: g.category,
          slug: g.slug,
        });
      }
    }

    const seen = new Set<string>();
    const unique: SearchResult[] = [];
    for (const m of matches) {
      const key = `${m.type}:${m.slug}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(m);
      }
    }
    setResults(unique.slice(0, 5));
    setOpen(unique.length > 0);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop search */}
      <div className="hidden sm:block relative">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-[#a0a0a0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={dict.search.placeholder}
            className="bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg pl-10 pr-4 py-2 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-[#a0a0a0] focus:outline-none focus:border-[#6C3FB7] w-64 transition-all"
          />
          {query && (
            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#a0a0a0] hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {open && (
          <div className="absolute top-full mt-2 right-0 w-80 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden z-50">
            {results.map((r) => (
              <Link
                key={`${r.type}:${r.slug}`}
                href={r.type === "guide" ? `/${lang}/guides/${r.slug}` : `/${lang}/games/${r.slug}`}
                onClick={() => { setOpen(false); setQuery(""); }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-colors border-b border-gray-200 dark:border-[#2a2a2a] last:border-0"
              >
                <span className={`text-[10px] px-2 py-0.5 rounded font-medium shrink-0 ${r.type === "guide" ? "text-[#6C3FB7] bg-[#6C3FB7]/10" : "text-[#22c55e] bg-[#22c55e]/10"}`}>
                  {r.type === "guide" ? dict.nav.guides : dict.nav.games}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{r.title}</div>
                  <div className="text-xs text-gray-600 dark:text-[#a0a0a0]">{r.subtitle}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Mobile search trigger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="sm:hidden p-2 text-gray-600 dark:text-[#a0a0a0] hover:text-gray-900 dark:hover:text-white"
        aria-label="Search"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Mobile search overlay */}
      {mobileOpen && (
        <div className="sm:hidden fixed inset-0 top-16 z-40 bg-white/98 dark:bg-[#0f0f0f]/98 backdrop-blur-sm">
          <div className="max-w-lg mx-auto px-4 pt-6">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-[#a0a0a0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={dict.search.placeholder}
                className="w-full bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-xl pl-12 pr-12 py-4 text-gray-900 dark:text-white text-lg placeholder:text-gray-400 dark:placeholder:text-[#a0a0a0] focus:outline-none focus:border-[#6C3FB7]"
                autoFocus
              />
              {query && (
                <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#a0a0a0] hover:text-gray-900 dark:hover:text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {results.length > 0 && (
              <div className="mt-4 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-xl overflow-hidden">
                {results.map((r) => (
                  <Link
                    key={`${r.type}:${r.slug}`}
                    href={r.type === "guide" ? `/${lang}/guides/${r.slug}` : `/${lang}/games/${r.slug}`}
                    onClick={() => { setOpen(false); setMobileOpen(false); setQuery(""); }}
                    className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-colors border-b border-gray-200 dark:border-[#2a2a2a] last:border-0"
                  >
                    <span className={`text-[10px] px-2 py-0.5 rounded font-medium shrink-0 ${r.type === "guide" ? "text-[#6C3FB7] bg-[#6C3FB7]/10" : "text-[#22c55e] bg-[#22c55e]/10"}`}>
                      {r.type === "guide" ? dict.nav.guides : dict.nav.games}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{r.title}</div>
                      <div className="text-xs text-gray-600 dark:text-[#a0a0a0]">{r.subtitle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
