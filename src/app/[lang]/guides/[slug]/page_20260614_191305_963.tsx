import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGuides, sampleGames } from "@/data/sampleData";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import GuideContent from "./GuideContent";
import AffiliateSection from "./AffiliateSection";

function getMdxContent(gameId: string, slug: string, lang?: string): { frontmatter: Record<string, unknown>; content: string } | null {
  const prefix = gameId + "-";
  if (!slug.startsWith(prefix)) return null;
  const guideSlug = slug.slice(prefix.length);
  const baseDir = path.join(process.cwd(), "content", "guides", gameId);

  const candidates = lang === "zh"
    ? [`${guideSlug}.zh.mdx`, `${guideSlug}.mdx`]
    : [`${guideSlug}.mdx`];

  for (const fname of candidates) {
    try {
      const raw = fs.readFileSync(path.join(baseDir, fname), "utf-8");
      const { data, content } = matter(raw);
      return { frontmatter: data, content };
    } catch { /* try next */ }
  }
  return null;
}

function extractTocHeadings(mdxContent: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fff-]/g, "")
      .replace(/\s+/g, "-");
    items.push({ id, text, level });
  }
  return items;
}

function extractFAQItems(mdxContent: string): { question: string; answer: string }[] {
  const faqPatterns = /^(what|how|can|is|why|do|什么|如何|怎么)/i;
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: { heading: string; text: string }[] = [];
  let match;
  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const text = match[2].trim();
    const start = match.index + match[0].length;
    const nextMatch = headingRegex.exec(mdxContent);
    const end = nextMatch ? nextMatch.index : mdxContent.length;
    headingRegex.lastIndex = nextMatch ? nextMatch.index : mdxContent.length;
    const body = mdxContent.slice(start, end).trim();
    items.push({ heading: text, text: body });
  }

  const faqItems: { question: string; answer: string }[] = [];
  for (const item of items) {
    if (faqPatterns.test(item.heading) && item.text.length > 0) {
      const answer = item.text
        .replace(/^[\s\S]*?\n\s*\n/, "") // strip first paragraph separator
        .split(/\n\s*\n/)[0] || ""; // first paragraph only
      const cleanAnswer = answer
        .replace(/[#*`~>\[\]|]/g, "")
        .replace(/\n/g, " ")
        .trim()
        .slice(0, 300);
      faqItems.push({ question: item.heading, answer: cleanAnswer });
    }
  }
  return faqItems.slice(0, 10);
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const guide = sampleGuides.find((g) => g.slug === slug);
  if (!guide) return { title: "Not Found - GameGuide" };

  const title = lang === "zh" ? guide.titleZh : guide.title;
  const description = lang === "zh" ? guide.descriptionZh : guide.description;

  return {
    title: `${title} - GameGuide`,
    description,
    openGraph: {
      title: `${title} - GameGuide`,
      description,
      type: "article",
      url: `https://gameguide.guide/${lang}/guides/${slug}`,
      images: [{ url: guide.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - GameGuide`,
      description,
      images: [guide.image],
    },
    other: {
      "article:author": "GameGuide Team",
      "article:published_time": "2026-01-01T00:00:00Z",
      "article:modified_time": "2026-06-14T00:00:00Z",
    },
  };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  const guide = sampleGuides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const mdx = getMdxContent(guide.gameId, slug, lang);
  const game = sampleGames.find((g) => g.id === guide.gameId);
  const tocItems = mdx ? extractTocHeadings(mdx.content) : [];
  const faqItems = mdx ? extractFAQItems(mdx.content) : [];

  const meta = {
    title: (mdx?.frontmatter?.title as string) || guide.title,
    gameTitle: (mdx?.frontmatter?.game as string) || guide.gameTitle,
    category: (mdx?.frontmatter?.category as string) || guide.category,
    difficulty: (mdx?.frontmatter?.difficulty as string) || guide.difficulty,
    readingTime: (mdx?.frontmatter?.readingTime as string) || guide.timeToRead,
    description: lang === "zh" ? guide.descriptionZh : guide.description,
  };

  const sameGameGuides = sampleGuides.filter((g) => g.gameId === guide.gameId);
  const currentIdx = sameGameGuides.findIndex((g) => g.id === guide.id);
  const prevGuide = currentIdx > 0 ? { slug: sameGameGuides[currentIdx - 1].slug, title: lang === "zh" ? sameGameGuides[currentIdx - 1].titleZh : sameGameGuides[currentIdx - 1].title } : null;
  const nextGuide = currentIdx < sameGameGuides.length - 1 ? { slug: sameGameGuides[currentIdx + 1].slug, title: lang === "zh" ? sameGameGuides[currentIdx + 1].titleZh : sameGameGuides[currentIdx + 1].title } : null;

  const pageUrl = `https://gameguide.guide/${lang}/guides/${slug}`;
  const shareText = encodeURIComponent(lang === "zh" ? guide.titleZh : guide.title);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: lang === "zh" ? guide.titleZh : guide.title,
    description: lang === "zh" ? guide.descriptionZh : guide.description,
    author: { "@type": "Organization", name: "GameGuide Team" },
    datePublished: "2026-01-01T00:00:00Z",
    dateModified: "2026-06-14T00:00:00Z",
    image: guide.image,
    publisher: {
      "@type": "Organization",
      name: "GameGuide",
      logo: { "@type": "ImageObject", url: "https://gameguide.guide/images/og-image.jpg" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gameguide.guide/" },
      { "@type": "ListItem", position: 2, name: "Games", item: `https://gameguide.guide/${lang}/games` },
      ...(game ? [{ "@type": "ListItem", position: 3, name: lang === "zh" ? game.titleZh : game.title, item: `https://gameguide.guide/${lang}/games/${game.slug}` }] : []),
      { "@type": "ListItem", position: game ? 4 : 3, name: lang === "zh" ? guide.titleZh : guide.title },
    ],
  };

  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur border-b border-gray-200 dark:border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.home}</Link>
            <Link href={`/${lang}/games`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.games}</Link>
            <Link href={`/${lang}/guides`} className="text-[#6C3FB7]">{dict.nav.guides}</Link>
            <Link href={`/${lang}/categories`} className="hover:text-[#6C3FB7] text-gray-900 dark:text-white">{dict.nav.categories}</Link>
          </nav>
        </div>
      </header>

      <main className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#a0a0a0] flex-wrap" aria-label="Breadcrumb">
            <Link href={`/${lang}`} className="hover:text-[#6C3FB7]">Home</Link>
            <span>/</span>
            <Link href={`/${lang}/games`} className="hover:text-[#6C3FB7]">{dict.nav.games}</Link>
            {game && (
              <>
                <span>/</span>
                <Link href={`/${lang}/games/${game.slug}`} className="hover:text-[#6C3FB7]">
                  {lang === "zh" ? game.titleZh : game.title}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-gray-900 dark:text-white truncate max-w-[200px]">{lang === "zh" ? guide.titleZh : meta.title}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="max-w-[820px]">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-xs text-[#6C3FB7] bg-[#6C3FB7]/10 px-3 py-1 rounded">{meta.category}</span>
              <span className="text-xs text-gray-600 dark:text-[#a0a0a0] bg-gray-100 dark:bg-[#1a1a1a] px-3 py-1 rounded">{meta.difficulty}</span>
              <span className="text-xs text-gray-600 dark:text-[#a0a0a0] bg-gray-100 dark:bg-[#1a1a1a] px-3 py-1 rounded">{meta.readingTime}</span>
              {guide.views > 0 ? (
                <span className="text-xs text-gray-600 dark:text-[#a0a0a0] bg-gray-100 dark:bg-[#1a1a1a] px-3 py-1 rounded">
                  {guide.views.toLocaleString()} {dict.guide.views}
                </span>
              ) : (
                <span className="text-xs text-[#a855f7] bg-[#a855f7]/10 px-3 py-1 rounded font-medium">
                  {dict.guide.new}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{lang === "zh" ? guide.titleZh : meta.title}</h1>
            <p className="text-gray-600 dark:text-[#a0a0a0]">{lang === "zh" ? guide.gameTitleZh : meta.gameTitle}</p>
            <p className="text-gray-600 dark:text-[#a0a0a0] mt-4 text-lg leading-relaxed">{meta.description}</p>

            {/* AdSense - below title */}
            <div className="mt-6">
              <ins className="adsbygoogle"
                style={{ display: "block", textAlign: "center" }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="1234567890"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
          </div>
        </div>

        <GuideContent
          tocItems={tocItems}
          lang={lang}
          dict={dict}
          prevGuide={prevGuide}
          nextGuide={nextGuide}
        >
          <article>
            {mdx ? (
              <div className="prose dark:prose-invert prose-lg max-w-none
                prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:scroll-mt-20
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-20
                prose-p:leading-relaxed
                prose-strong:font-semibold
                prose-a:text-[#6C3FB7] prose-a:no-underline hover:prose-a:underline
                prose-li:marker:text-[#6C3FB7]
                prose-thead:border-gray-200 dark:prose-thead:border-[#2a2a2a]
                prose-tr:border-gray-200 dark:prose-tr:border-[#2a2a2a]
                prose-code:text-[#6C3FB7] prose-code:bg-gray-100 dark:prose-code:bg-[#1a1a1a] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-100 dark:prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-[#2a2a2a]
                prose-blockquote:border-[#6C3FB7]
                prose-hr:border-gray-200 dark:prose-hr:border-[#2a2a2a]
                [&_img]:rounded-lg [&_img]:my-6"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children, ...props }) => {
                      const text = String(children);
                      const id = text.toLowerCase().replace(/[^\w\s\u4e00-\u9fff-]/g, "").replace(/\s+/g, "-");
                      return <h2 id={id} {...props}>{children}</h2>;
                    },
                    h3: ({ children, ...props }) => {
                      const text = String(children);
                      const id = text.toLowerCase().replace(/[^\w\s\u4e00-\u9fff-]/g, "").replace(/\s+/g, "-");
                      return <h3 id={id} {...props}>{children}</h3>;
                    },
                  }}
                >
                  {mdx.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="space-y-6">
                {guide.sections.map((section, idx) => (
                  <div key={idx} className="card p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a]">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{lang === "zh" ? section.titleZh : section.title}</h2>
                    <p className="text-gray-600 dark:text-[#a0a0a0] leading-relaxed">{lang === "zh" ? section.contentZh : section.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* AdSense - in-content */}
            {mdx && (
              <div className="my-8">
                <ins className="adsbygoogle"
                  style={{ display: "block", textAlign: "center" }}
                  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                  data-ad-slot="2345678901"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </div>
            )}
          </article>
        </GuideContent>

        {/* Social Share Buttons */}
        <div className="max-w-7xl mx-auto px-6 mt-8">
          <div className="max-w-[820px]">
            <p className="text-sm text-gray-600 dark:text-[#a0a0a0] mb-3">{lang === "zh" ? "分享这篇攻略" : "Share this guide"}</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Twitter
              </a>
              <a
                href={`https://www.reddit.com/submit?url=${encodeURIComponent(pageUrl)}&title=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#FF4500]/10 text-[#FF4500] hover:bg-[#FF4500]/20 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 12.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm6 3c-1.66 0-3-1.34-3-3h6c0 1.66-1.34 3-3 3z"/></svg>
                Reddit
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
            </div>
          </div>
        </div>

        {game && <AffiliateSection game={game} lang={lang} />}

        {(() => {
          const sameGameGuidesAll = sampleGuides.filter((g) => g.gameId === guide.gameId && g.id !== guide.id);
          let related = sameGameGuidesAll.slice(0, 3);
          if (related.length < 3) {
            const otherGuides = sampleGuides.filter(
              (g) => g.gameId !== guide.gameId && g.category === guide.category
            );
            const extra = otherGuides.slice(0, 3 - related.length);
            related = [...related, ...extra];
          }
          if (related.length === 0) return null;

          return (
            <section className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-200 dark:border-[#2a2a2a]">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{dict.guide.related}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((relGuide) => (
                  <Link key={relGuide.id} href={`/${lang}/guides/${relGuide.slug}`} className="card overflow-hidden group bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a]">
                    <div className="aspect-[16/9] bg-gray-100 dark:bg-[#1a1a1a] overflow-hidden">
                      <img
                        src={relGuide.image}
                        alt={relGuide.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = `/images/games/${relGuide.gameId}.jpg`;
                          img.onerror = () => { img.style.display = "none"; };
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#6C3FB7] transition-colors line-clamp-2">
                        {lang === "zh" ? relGuide.titleZh : relGuide.title}
                      </h3>
                      <span className="text-xs text-gray-600 dark:text-[#a0a0a0] mt-1 block">{relGuide.timeToRead}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}
      </main>
    </div>
  );
}
