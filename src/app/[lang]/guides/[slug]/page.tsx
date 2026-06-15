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
      "article:published_time": guide.publishedDate
        ? `${guide.publishedDate}T00:00:00Z`
        : "2026-01-01T00:00:00Z",
      "article:modified_time": guide.updatedDate
        ? `${guide.updatedDate}T00:00:00Z`
        : "2026-06-14T00:00:00Z",
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: lang === "zh" ? guide.titleZh : guide.title,
    description: lang === "zh" ? guide.descriptionZh : guide.description,
    author: { "@type": "Organization", name: "GameGuide Team" },
    datePublished: guide.publishedDate
      ? `${guide.publishedDate}T00:00:00Z`
      : "2026-01-01T00:00:00Z",
    dateModified: guide.updatedDate
      ? `${guide.updatedDate}T00:00:00Z`
      : "2026-06-14T00:00:00Z",
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

  // P1-1: Extract FAQ Schema from MDX ## headings
  const faqQuestionPrefixes = /^(What|How|Can|Is|Why|Do|Will|Are|Should|Which|Where|When|什么|如何|怎么|为什么|是否|可以|能)/i;
  function extractFaqSchema(mdxContent: string | undefined) {
    if (!mdxContent) return null;
    const lines = mdxContent.split("\n");
    const faqEntities: { question: string; answer: string }[] = [];
    for (let i = 0; i < lines.length; i++) {
      const h2Match = lines[i].match(/^##\s+(.+)$/);
      if (h2Match && faqQuestionPrefixes.test(h2Match[1].trim())) {
        const question = h2Match[1].trim();
        const answerLines: string[] = [];
        let j = i + 1;
        while (j < lines.length && lines[j].trim() !== "" && !lines[j].startsWith("#")) {
          answerLines.push(lines[j].trim());
          j++;
        }
        const answer = answerLines.join(" ").trim();
        if (answer) {
          faqEntities.push({ question, answer });
        }
      }
    }
    if (faqEntities.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqEntities.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    };
  }
  const faqSchema = extractFaqSchema(mdx?.content);

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
            {(guide.publishedDate || guide.updatedDate) && (
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-[#666]">
                {guide.publishedDate && <span>Published: {guide.publishedDate}</span>}
                {guide.updatedDate && <span>Updated: {guide.updatedDate}</span>}
              </div>
            )}
            <p className="text-gray-600 dark:text-[#a0a0a0] mt-4 text-lg leading-relaxed">{meta.description}</p>
          </div>
        </div>

        {/* P0-1: AdSense 顶部横幅 */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="max-w-[820px] mx-auto">
            <ins className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-4051053911004228"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
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

            {/* P0-1: AdSense 内容中部 */}
            <div className="my-8">
              <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-4051053911004228"
                data-ad-slot="2345678901"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
          </article>
        </GuideContent>

        {/* P0-1: AdSense 底部 */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="max-w-[820px] mx-auto">
            <ins className="adsbygoogle"
              style={{ display: "block", textAlign: "center" }}
              data-ad-client="ca-pub-4051053911004228"
              data-ad-slot="3456789012"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>

        {/* P2-4: 社交分享按钮 */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="max-w-[820px] mx-auto flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600 dark:text-[#a0a0a0] mr-2">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://gameguide.guide/${lang}/guides/${slug}`)}&text=${encodeURIComponent(lang === "zh" ? guide.titleZh : meta.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#1d9bf0]/10 text-[#1d9bf0] hover:bg-[#1d9bf0]/20 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://gameguide.guide/${lang}/guides/${slug}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#1877f2]/10 text-[#1877f2] hover:bg-[#1877f2]/20 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a
              href={`https://www.reddit.com/submit?url=${encodeURIComponent(`https://gameguide.guide/${lang}/guides/${slug}`)}&title=${encodeURIComponent(lang === "zh" ? guide.titleZh : meta.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#ff4500]/10 text-[#ff4500] hover:bg-[#ff4500]/20 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547.8-3.747c1.086.303 1.74 1.29 1.74 2.49 0 .688-.562 1.249-1.25 1.249-.688 0-1.25-.561-1.25-1.249 0-.688.562-1.249 1.25-1.249.164 0 .322.031.47.087l-.66 3.09c-.096.444-.634.726-1.04.538a11.977 11.977 0 0 0-8.112 0c-.406.188-.944-.094-1.04-.538l-.66-3.09c.148-.056.306-.087.47-.087.688 0 1.25.561 1.25 1.249 0 .688-.562 1.249-1.25 1.249-.688 0-1.25-.561-1.25-1.249 0-1.2.654-2.187 1.74-2.49l.8 3.747-2.597.547a1.249 1.249 0 0 0-1.223-.936c-.689 0-1.249.561-1.249 1.249 0 .688.56 1.249 1.249 1.249.323 0 .615-.124.838-.328 3.052 1.969 6.133 1.995 8.88.009A1.248 1.248 0 0 0 16.76 17.3a1.248 1.248 0 0 0 .8-.284zm-8.49 5.022c-.689 0-1.249-.561-1.249-1.249 0-.688.56-1.249 1.249-1.249.689 0 1.249.561 1.249 1.249 0 .688-.56 1.249-1.249 1.249zm5.56.633a.72.72 0 0 1-.506.253.717.717 0 0 1-.506-.253.717.717 0 0 1 .506-1.016.72.72 0 0 1 .506 1.016zm1.39.217a1.249 1.249 0 0 1-1.249-1.249c0-.688.56-1.249 1.249-1.249.689 0 1.249.561 1.249 1.249 0 .688-.56 1.249-1.249 1.249z"/></svg>
              Reddit
            </a>
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
                      <img src={relGuide.image} alt={relGuide.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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

      <script dangerouslySetInnerHTML={{ __html: `try{(window.adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}` }} />
    </div>
  );
}
