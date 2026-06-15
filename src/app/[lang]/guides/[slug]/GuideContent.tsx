"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface PrevNextGuide {
  slug: string;
  title: string;
}

export default function GuideContent({
  children,
  tocItems,
  lang,
  dict,
  prevGuide,
  nextGuide,
}: {
  children: React.ReactNode;
  tocItems: TocItem[];
  lang: string;
  dict: Record<string, any>;
  prevGuide: PrevNextGuide | null;
  nextGuide: PrevNextGuide | null;
}) {
  const [activeId, setActiveId] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    const elements = tocItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      setTocOpen(false);
    }
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-[60] h-[2px] bg-[#a855f7] transition-all duration-150 shadow-[0_0_8px_rgba(168,85,247,0.5)]" style={{ width: `${progress}%` }} />

      <div className="max-w-7xl mx-auto px-6 flex gap-8 relative">
        <div className="flex-1 min-w-0 max-w-[820px]">
          {tocItems.length > 0 && (
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#a0a0a0] hover:text-[#6C3FB7] dark:hover:text-[#6C3FB7] bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg px-4 py-2 w-full justify-between"
              >
                <span>Table of Contents</span>
                <svg className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {tocOpen && (
                <nav className="mt-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-4">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToHeading(item.id)}
                      className={`block w-full text-left text-sm py-1.5 transition-colors ${
                        item.level === 3 ? "pl-4" : ""
                      } ${
                        activeId === item.id
                          ? "text-[#a855f7] font-medium"
                          : "text-gray-600 dark:text-[#a0a0a0] hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              )}
            </div>
          )}

          <div ref={contentRef}>
            {children}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-[#2a2a2a] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevGuide ? (
              <Link
                href={`/${lang}/guides/${prevGuide.slug}`}
                className="card p-4 group text-left hover:border-[#6C3FB7]/30 transition-colors bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a]"
              >
                <span className="text-xs text-gray-600 dark:text-[#a0a0a0]">&larr; Previous</span>
                <h4 className="text-sm font-semibold mt-1 group-hover:text-[#6C3FB7] transition-colors line-clamp-1 text-gray-900 dark:text-white">
                  {prevGuide.title}
                </h4>
              </Link>
            ) : (
              <div />
            )}
            {nextGuide ? (
              <Link
                href={`/${lang}/guides/${nextGuide.slug}`}
                className="card p-4 group text-right hover:border-[#6C3FB7]/30 transition-colors bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a]"
              >
                <span className="text-xs text-gray-600 dark:text-[#a0a0a0]">Next &rarr;</span>
                <h4 className="text-sm font-semibold mt-1 group-hover:text-[#6C3FB7] transition-colors line-clamp-1 text-gray-900 dark:text-white">
                  {nextGuide.title}
                </h4>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="mt-8 text-center">
            <Link href={`/${lang}/guides`} className="btn-primary">&larr; {dict.guide.backToGuides}</Link>
          </div>
        </div>

        {tocItems.length > 0 && (
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <h4 className="text-xs font-semibold text-gray-600 dark:text-[#a0a0a0] uppercase tracking-wider mb-4">On This Page</h4>
              <nav className="space-y-1 border-l border-gray-200 dark:border-[#2a2a2a] pl-4">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className={`block w-full text-left text-sm py-1.5 transition-colors ${
                      item.level === 3 ? "pl-3" : ""
                    } ${
                      activeId === item.id
                        ? "text-[#a855f7] font-medium border-l-2 border-[#a855f7] -ml-[17px] pl-[17px]"
                        : "text-gray-600 dark:text-[#a0a0a0] hover:text-gray-900 dark:hover:text-white border-l-2 border-transparent -ml-[17px] pl-[17px]"
                    }`}
                  >
                    {item.text}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}
