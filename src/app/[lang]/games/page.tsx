import { getDictionary, getLangFromParams } from "@/i18n";
import { Metadata } from "next";
import Link from "next/link";
import { GameCard } from "@/components/game/GameCard";
import { sampleGames, getGameDisplay } from "@/data/sampleData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));

  return {
    title: dict.metadata.gamesTitle,
    description: dict.metadata.gamesDescription,
  };
}

export default async function GamesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-300">
          {dict.common.home}
        </Link>
        <span>/</span>
        <span className="text-gray-400">{dict.nav.games}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{dict.metadata.gamesTitle}</h1>
        <p className="mt-2 text-gray-400">
          Browse our complete collection of game guides and walkthroughs for the most popular titles.
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sampleGames.map((game) => {
          const display = getGameDisplay(game, lang as "en" | "zh");
          return (
            <GameCard
              key={display.slug}
              slug={display.slug}
              title={display.title}
              description={display.description}
              coverImage={display.coverImage}
              platforms={display.platforms}
              genres={display.genres}
              metacriticScore={display.metacriticScore}
              guideCount={display.guideCount || 0}
              guideLabel={dict.gameCard?.guides || "guides"}
            />
          );
        })}
      </div>

      {/* Back link */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-6 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
        >
          ← {dict.common.home}
        </Link>
      </div>
    </div>
  );
}
