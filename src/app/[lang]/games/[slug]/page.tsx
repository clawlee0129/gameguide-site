import { getDictionary, getLangFromParams } from "@/i18n";
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sampleGames, sampleGuides, getGameDisplay, getGuideDisplay } from '@/data/sampleData';
import ReviewSection from '@/components/review/ReviewSection';
import { AdBanner } from '@/components/ads/AdBanner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const game = sampleGames.find((g) => g.slug === slug);
  if (!game) {
    return { title: 'Game Not Found' };
  }
  const display = getGameDisplay(game, lang as 'en' | 'zh');
  const url = `https://gameguide.guide/${lang}/games/${slug}`;
  return {
    title: `${display.title} Guides & Walkthroughs`,
    description: display.description,
    openGraph: {
      title: `${display.title} Guides & Walkthroughs`,
      description: display.description,
      url,
      siteName: "GameGuide",
      locale: lang === "zh" ? "zh_CN" : "en_US",
      images: [
        {
          url: display.coverImage,
          width: 1200,
          height: 630,
          alt: display.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${display.title} Guides & Walkthroughs`,
      description: display.description,
      images: [display.coverImage],
    },
  };
}

function generateFAQSchema(display: ReturnType<typeof getGameDisplay>) {
  const faqData = [
    {
      question: `What is ${display.title} about?`,
      answer: display.description,
    },
    {
      question: `What platforms is ${display.title} available on?`,
      answer: `${display.title} is available on ${display.platforms.join(', ')}.`,
    },
    {
      question: `Who developed ${display.title}?`,
      answer: `${display.title} was developed by ${display.developer} and published by ${display.publisher}.`,
    },
    {
      question: `When was ${display.title} released?`,
      answer: `${display.title} was released on ${new Date(display.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.`,
    },
    {
      question: `What are the best guides for ${display.title}?`,
      answer: `We have ${display.guideCount} comprehensive guides for ${display.title} covering walkthroughs, boss strategies, build recommendations, and hidden secrets.`,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export default async function GamePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const game = sampleGames.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  const dict = getDictionary(getLangFromParams({ lang }));
  const dateLocale = lang === 'zh' ? 'zh-CN' : 'en-US';
  const display = getGameDisplay(game, lang as 'en' | 'zh');
  const guides = sampleGuides.filter((g) => g.gameId === display.id);
  
  const relatedGames = sampleGames
    .filter((g) => g.id !== display.id && g.genres.some(genre => display.genres.includes(genre)))
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(display)) }}
      />
      <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div>
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-300">
          {dict.gameDetail.home}
        </Link>
        <span>/</span>
        <Link href="/games" className="hover:text-gray-300">
          {dict.gameDetail.games}
        </Link>
        <span>/</span>
        <span className="text-gray-400">{display.title}</span>
      </div>

      {/* Game Header */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row">
        <div className="flex-shrink-0">
          <div className="relative h-40 w-40 overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-700">
            <img
              src={display.coverImage}
              alt={display.title}
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center text-5xl font-black text-gray-600 opacity-30 pointer-events-none select-none">
              {display.title[0]}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">{display.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {display.metacriticScore && (
              <span className="rounded bg-green-600 px-2 py-0.5 text-xs font-bold text-white">
                {display.metacriticScore}
              </span>
            )}
            {display.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-400"
              >
                {genre}
              </span>
            ))}
            <span className="text-xs text-gray-500">·</span>
            <span className="text-xs text-gray-500">
              {display.platforms.join(' / ')}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            {display.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
            <span>{dict.gameDetail.developer}: {display.developer}</span>
            <span>{dict.gameDetail.publisher}: {display.publisher}</span>
            <span>{dict.gameDetail.releaseDate}: {new Date(display.releaseDate).toLocaleDateString(dateLocale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>
          </div>
        </div>
      </div>

      {/* Guide Sections */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">
          {dict.gameDetail.guides} ({guides.length})
        </h2>
        {guides.length > 0 ? (
          <div className="grid gap-4">
            {guides.map((guide) => {
              const guideDisplay = getGuideDisplay(guide, lang as 'en' | 'zh');
              return (
                <Link
                  key={guideDisplay.slug}
                  href={`/guides/${guideDisplay.slug}`}
                  className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 p-4 transition-all hover:border-purple-500/30"
                >
                  <div>
                    <h3 className="font-medium text-white transition-colors hover:text-purple-400">
                      {guideDisplay.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                      <span>{guideDisplay.timeToComplete} {dict.guideCard.minRead}</span>
                      <span>·</span>
                      <span className="text-purple-400 capitalize">{guideDisplay.difficulty}</span>
                      <span>·</span>
                      <span>{guideDisplay.views.toLocaleString()} {dict.gameDetail.views}</span>
                    </div>
                  </div>
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
            <p className="text-gray-500">{dict.gameDetail.noGuidesAvailable}</p>
          </div>
        )}
      </div>

      {/* Related Games */}
      {relatedGames.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-white">{dict.gameDetail.relatedGames}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedGames.map((relatedGame) => {
              const relatedDisplay = getGameDisplay(relatedGame, lang as 'en' | 'zh');
              return (
                <Link
                  key={relatedDisplay.id}
                  href={`/games/${relatedDisplay.slug}`}
                  className="rounded-lg border border-gray-800 bg-gray-900 p-4 transition-all hover:border-purple-500/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-gray-800 to-gray-700">
                      <img
                        src={relatedDisplay.coverImage}
                        alt={relatedDisplay.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{relatedDisplay.title}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-1 text-xs text-gray-500">
                        {relatedDisplay.genres.slice(0, 2).map((genre) => (
                          <span key={genre} className="rounded-full border border-gray-700 px-2 py-0.5">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Reviews */}
      <ReviewSection slug={slug} dict={dict.review as any} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="sticky top-6 space-y-6">
            <AdBanner size="sidebar" slot="game-sidebar" />

            {/* Popular Guides */}
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
              <h3 className="mb-3 text-sm font-medium text-white">{dict.gameDetail.popularGuides}</h3>
              <div className="space-y-3">
                {guides
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 3)
                  .map((guide) => {
                    const guideDisplay = getGuideDisplay(guide, lang as 'en' | 'zh');
                    return (
                      <Link
                        key={guideDisplay.slug}
                        href={`/guides/${guideDisplay.slug}`}
                        className="block rounded-lg border border-gray-800 bg-gray-800 p-3 transition-colors hover:border-purple-500/50"
                      >
                        <h4 className="text-xs font-medium text-white">{guideDisplay.title}</h4>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <span>{guideDisplay.views.toLocaleString()} {dict.gameDetail.views}</span>
                          <span>·</span>
                          <span className="capitalize">{guideDisplay.difficulty}</span>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>

            {/* Game Info Card */}
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
              <h3 className="mb-3 text-sm font-medium text-white">{dict.gameDetail.gameInfo}</h3>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>{dict.gameDetail.developer}</span>
                  <span className="text-white">{display.developer}</span>
                </div>
                <div className="flex justify-between">
                  <span>{dict.gameDetail.publisher}</span>
                  <span className="text-white">{display.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span>{dict.gameDetail.releaseDate}</span>
                  <span className="text-white">
                    {new Date(display.releaseDate).toLocaleDateString(dateLocale, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{dict.gameDetail.metacritic}</span>
                  <span className="text-green-500 font-medium">{display.metacriticScore}</span>
                </div>
                <div className="flex justify-between">
                  <span>{dict.gameDetail.guides}</span>
                  <span className="text-white">{guides.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}