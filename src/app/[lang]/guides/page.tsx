import { getDictionary } from "@/i18n";
import { getLangFromParams } from "@/i18n";
import { Metadata } from 'next';
import Link from 'next/link';
import { GuideCard } from '@/components/guide/GuideCard';
import { sampleGuides, getGuideDisplay } from '@/data/sampleData';

export const metadata: Metadata = {
  title: 'Latest Guides',
  description:
    'Latest game walkthroughs, boss guides, build tutorials, and strategy tips. Updated daily.',
};

export default async function GuidesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Latest Guides</h1>
        <p className="mt-2 text-gray-400">
          Expert walkthroughs, boss strategies, and build guides for your favorite games.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sampleGuides.map((guide) => {
          const display = getGuideDisplay(guide, lang as 'en' | 'zh');
          return (
            <GuideCard
              key={display.slug}
              slug={display.slug}
              title={display.title}
              excerpt={display.excerpt}
              gameTitle={display.gameTitle}
              gameSlug={display.gameSlug}
              difficulty={display.difficulty}
              readingTime={display.timeToComplete}
              publishedAt={new Date(display.publishedAt)}
              coverImage={display.coverImage}
            />
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-6 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
// Updated: 2026-05-26 - Phase 3 i18n