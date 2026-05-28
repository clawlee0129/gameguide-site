import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories } from '@/data/site';
import { sampleGames, getGameDisplay } from '@/data/sampleData';
import { GameImage } from '@/components/game/GameImage';

const gradientColors = [
  'from-purple-900 via-violet-800 to-indigo-900',
  'from-emerald-900 via-teal-800 to-cyan-900',
  'from-rose-900 via-pink-800 to-fuchsia-900',
  'from-amber-900 via-orange-800 to-yellow-900',
  'from-blue-900 via-cyan-800 to-sky-900',
];

const genreToCategory: Record<string, string[]> = {
  'action-adventure': ['Action-adventure', 'Metroidvania', 'Action', 'Platformer', 'Hunting'],
  'rpg': ['Action RPG', 'CRPG', 'RPG', 'Fantasy', 'Cyberpunk'],
  'fps': ['FPS'],
  'strategy': ['Strategy', 'Turn-based'],
  'soulslike': ['Souls-like', 'Soulslike'],
  'open-world': ['Open World', 'Sci-fi'],
  'indie': ['Indie'],
  'multiplayer': ['Multiplayer'],
  'horror': ['Horror', 'Survival Horror'],
  'simulation': ['Simulation', 'Survival', 'Monster-catching'],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    return { title: 'Category Not Found' };
  }
  return {
    title: `${category.name} Game Guides`,
    description: `Browse the best ${category.name.toLowerCase()} game guides, walkthroughs, and strategy tips.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const matchingGenres = genreToCategory[slug] || [];
  const games = sampleGames.filter((g) =>
    g.genres.some((genre) => matchingGenres.includes(genre))
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-gray-300">Categories</Link>
        <span>/</span>
        <span className="text-gray-400">{category.name}</span>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-800 text-3xl">
            {category.icon}
          </span>
          <div>
            <h1 className="text-3xl font-bold text-white">{category.name}</h1>
            <p className="mt-1 text-gray-400">
              {games.length} {games.length === 1 ? 'game' : 'games'} · Expert guides, walkthroughs, and strategy tips
            </p>
          </div>
        </div>
      </div>

      {games.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => {
            const display = getGameDisplay(game, lang as 'en' | 'zh');
            const gradientClass = gradientColors[display.title.length % gradientColors.length];
            return (
              <Link
                key={display.id}
                href={`/games/${display.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-all hover:border-purple-500/30"
              >
                <div className="flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  <GameImage
                    src={display.coverImage}
                    alt={display.title}
                    gradientClass={gradientClass}
                    fallbackChar={display.title[0]}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-semibold text-white transition-colors group-hover:text-purple-400">
                    {display.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">{display.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {display.genres.filter((g) => matchingGenres.includes(g)).map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full border border-purple-500/20 bg-purple-900/20 px-2 py-0.5 text-xs text-purple-400"
                      >
                        {genre}
                      </span>
                    ))}
                    <span className="ml-auto text-xs text-gray-600">
                      {display.guideCount || 0} guides
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-12 text-center">
          <p className="text-4xl">{category.icon}</p>
          <p className="mt-4 text-lg text-gray-400">
            No {category.name.toLowerCase()} games found yet.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            We&apos;re working on adding {category.name.toLowerCase()} game guides. Check back soon!
          </p>
        </div>
      )}

      <div className="mt-10">
        <Link
          href="/categories"
          className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Categories
        </Link>
      </div>
    </div>
  );
}