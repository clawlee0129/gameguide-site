import { getDictionary, getLangFromParams } from "@/i18n";
import Link from "next/link";
import { sampleGuides } from "@/data/sampleData";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function getMdxContent(gameId: string, slug: string): { frontmatter: Record<string, unknown>; content: string } | null {
  // slug format: "{gameId}-{guideSlug}"
  // Strip gameId- prefix to get the MDX filename (without .mdx extension)
  const prefix = gameId + "-";
  if (!slug.startsWith(prefix)) return null;
  const guideSlug = slug.slice(prefix.length);
  const mdxPath = path.join(process.cwd(), "content", "guides", gameId, `${guideSlug}.mdx`);
  try {
    const raw = fs.readFileSync(mdxPath, "utf-8");
    const { data, content } = matter(raw);
    return { frontmatter: data, content };
  } catch {
    return null;
  }
}

export default async function GuideDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  const guide = sampleGuides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const mdx = getMdxContent(guide.gameId, slug);

  // Use MDX frontmatter for metadata when available, falling back to sampleData
  const meta = {
    title: (mdx?.frontmatter?.title as string) || guide.title,
    gameTitle: (mdx?.frontmatter?.game as string) || guide.gameTitle,
    category: (mdx?.frontmatter?.category as string) || guide.category,
    difficulty: (mdx?.frontmatter?.difficulty as string) || guide.difficulty,
    readingTime: (mdx?.frontmatter?.readingTime as string) || guide.timeToRead,
    description: lang === "zh" ? guide.descriptionZh : guide.description,
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold text-gradient">GameGuide</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href={`/${lang}`} className="hover:text-[#6C3FB7]">{dict.nav.home}</Link>
            <Link href={`/${lang}/guides`} className="text-[#6C3FB7]">{dict.nav.guides}</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href={`/${lang}/guides`} className="text-sm text-[#6C3FB7] hover:underline mb-6 inline-block">&larr; {dict.guide.backToGuides}</Link>

        <article>
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-xs text-[#6C3FB7] bg-[#6C3FB7]/10 px-3 py-1 rounded">{meta.category}</span>
              <span className="text-xs text-[#a0a0a0] bg-[#1a1a1a] px-3 py-1 rounded">{meta.difficulty}</span>
              <span className="text-xs text-[#a0a0a0] bg-[#1a1a1a] px-3 py-1 rounded">{meta.readingTime}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{lang === "zh" ? guide.titleZh : meta.title}</h1>
            <p className="text-[#a0a0a0]">{lang === "zh" ? guide.gameTitleZh : meta.gameTitle}</p>
          </div>

          <p className="text-[#a0a0a0] mb-8 text-lg">{meta.description}</p>

          {mdx ? (
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-[#c0c0c0] prose-p:leading-relaxed
              prose-strong:text-white prose-strong:font-semibold
              prose-a:text-[#6C3FB7] prose-a:no-underline hover:prose-a:underline
              prose-li:text-[#c0c0c0] prose-li:marker:text-[#6C3FB7]
              prose-table:text-[#c0c0c0] prose-th:text-white prose-td:text-[#c0c0c0]
              prose-thead:border-[#2a2a2a] prose-tr:border-[#2a2a2a]
              prose-code:text-[#6C3FB7] prose-code:bg-[#1a1a1a] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-[#2a2a2a]
              prose-blockquote:border-[#6C3FB7] prose-blockquote:text-[#a0a0a0]
              prose-hr:border-[#2a2a2a]
              [&_img]:rounded-lg [&_img]:my-6"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {mdx.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="space-y-6">
              {guide.sections.map((section, idx) => (
                <div key={idx} className="card p-6">
                  <h2 className="text-xl font-bold mb-4">{lang === "zh" ? section.titleZh : section.title}</h2>
                  <p className="text-[#a0a0a0] leading-relaxed">{lang === "zh" ? section.contentZh : section.content}</p>
                </div>
              ))}
            </div>
          )}
        </article>

        <div className="mt-12 pt-8 border-t border-[#2a2a2a] text-center">
          <Link href={`/${lang}/guides`} className="btn-primary">&larr; {dict.guide.backToGuides}</Link>
        </div>
      </main>
    </div>
  );
}
