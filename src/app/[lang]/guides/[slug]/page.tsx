import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sampleGuides, getGuideDisplay } from '@/data/sampleData';
import ReviewSection from '@/components/review/ReviewSection';
import { AdBanner } from '@/components/ads/AdBanner';
import { getDictionary, getLangFromParams } from '@/i18n';

function generateArticleSchema(display: ReturnType<typeof getGuideDisplay>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: display.title,
    description: display.metaDescription,
    image: display.coverImage,
    datePublished: display.publishedAt,
    dateModified: display.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'GameGuide Pro',
      url: 'https://gameguidepro.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GameGuide Pro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gameguidepro.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://gameguidepro.com/guides/${display.slug}`,
    },
    keywords: display.tags.join(', '),
    articleSection: 'Gaming Guides',
    timeRequired: `PT${display.timeToComplete}M`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const guide = sampleGuides.find((g) => g.slug === slug);
  if (!guide) {
    return { title: 'Guide Not Found' };
  }
  const display = getGuideDisplay(guide, lang as 'en' | 'zh');
  return {
    title: display.title,
    description: display.metaDescription,
  };
}

export default async function GuidePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  const guide = sampleGuides.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const display = getGuideDisplay(guide, lang as 'en' | 'zh');

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-600',
    intermediate: 'bg-yellow-600',
    advanced: 'bg-orange-600',
    expert: 'bg-red-600',
  };

  const content = { sections: display.sections };

  return (
    <>
      {/* Article JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateArticleSchema(display)) }}
      />
      <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-300">
          {dict.common.home}
        </Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-gray-300">
          {dict.common.guides}
        </Link>
        <span>/</span>
        <span className="text-gray-400 line-clamp-1">{display.title}</span>
      </div>

      {/* Guide Header */}
      <div className="mb-8">
        <Link
          href={`/games/${display.gameSlug}`}
          className="mb-3 inline-block rounded bg-gray-800 px-3 py-1 text-xs text-purple-400 transition-colors hover:bg-gray-700"
        >
          {display.gameTitle}
        </Link>
        <h1 className="text-3xl font-bold text-white md:text-4xl">{display.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-400">{display.excerpt}</p>
      </div>

      {/* Meta Info */}
      <div className="mb-10 flex flex-wrap items-center gap-4 rounded-xl border border-gray-800 bg-gray-900 p-4">
        <span className={`rounded px-3 py-1 text-xs font-bold text-white ${difficultyColors[display.difficulty] || 'bg-gray-600'}`}>
          {display.difficulty.toUpperCase()}
        </span>
        <span className="text-sm text-gray-400">
          {display.timeToComplete} {dict.common.minutesRead || 'min read'}
        </span>
        <span className="text-sm text-gray-400">·</span>
        <span className="text-sm text-gray-400">
          {display.views.toLocaleString()} {dict.gameDetail.views || 'views'}
        </span>
        <span className="text-sm text-gray-400">·</span>
        <span className="text-sm text-gray-400">
          {display.likes} {dict.review.likes || 'likes'}
        </span>
        <div className="ml-auto flex gap-2">
          {display.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-700 px-2.5 py-0.5 text-xs text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Cover Image with fallback */}
      <div className="mb-10 overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="relative h-64 w-full">
          <img
            src={display.coverImage}
            alt={display.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Guide Content */}
      <div className="space-y-8">
        {content.sections.map((section, index) => {
          const sectionEl = (
            <div key={index} className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">{section.title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-line leading-relaxed text-gray-300">{section.content}</p>
              </div>
              {section.images && section.images.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {section.images.map((img, imgIdx) => (
                    <div key={imgIdx} className="overflow-hidden rounded-lg">
                      <img
                        src={img}
                        alt={`${section.title} illustration ${imgIdx + 1}`}
                        className="h-48 w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

          // Insert in-content ad after 2nd section (index 1)
          if (index === 1) {
            return (
              <div key={`${index}-with-ad`}>
                {sectionEl}
                <div className="mt-6">
                  <AdBanner size="in-content" slot="guide-mid" className="mx-auto w-full max-w-full" />
                </div>
              </div>
            );
          }

          return sectionEl;
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 rounded-lg border border-purple-500/20 bg-purple-900/10 p-4">
        <p className="text-sm text-purple-300">
          {dict.guides?.backToHome ? dict.guides.backToHome.split('← ')[1] || 'This guide' : 'This guide'} {dict.guides?.backToHome ? dict.guides.backToHome.split('← ')[0]?.replace('← ', '') || 'published on' : 'was published on'} {display.publishedAt instanceof Date ? display.publishedAt.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US') : String(display.publishedAt)} {dict.guides?.backToHome ? 'and last updated on' : 'and last updated on'} {display.updatedAt instanceof Date ? display.updatedAt.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US') : String(display.updatedAt)}.
          {dict.guides?.backToHome ? '查看更新，我们会持续扩展内容覆盖。' : ' Check back for updates as we expand our content coverage.'}
        </p>
      </div>

      {/* Review Section */}
      <div className="mt-10">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-white">{dict.review?.userReviews || 'Community Reviews'}</h2>
          <p className="mb-6 text-sm text-gray-400">
            {dict.review?.beFirst ? dict.review.beFirst.replace('Be the first to share your thoughts!', 'Share your thoughts on this guide or read what other players have to say.') : 'Share your thoughts on this guide or read what other players have to say.'}
          </p>
          <ReviewSection slug={display.slug} lang={lang as 'en' | 'zh'} dict={dict.review as any} />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        <Link
          href={`/games/${display.gameSlug}`}
          className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {dict.guides?.backToHome ? dict.guides.backToHome.split('← ')[1] || 'Back to' : 'Back to'} {display.gameTitle}
        </Link>
        <Link
          href="/guides"
          className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          {dict.guides?.latestGuides || 'All Guides'}
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
    </>
  );
}

// Updated: 2026-05-26 - Phase 3