import Link from 'next/link';

interface GameCardProps {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  platforms: string[];
  genres: string[];
  metacriticScore?: number;
  guideCount: number;
}

export function GameCard({
  slug,
  title,
  description,
  coverImage,
  platforms,
  genres,
  metacriticScore,
  guideCount,
}: GameCardProps) {
  return (
    <Link
      href={`/games/${slug}`}
      className="group block overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
    >
      {/* Cover Image Placeholder */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-gray-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-black text-gray-600 opacity-50">
            {title.charAt(0)}
          </span>
        </div>
        {metacriticScore && (
          <div className="absolute right-2 top-2 rounded-md bg-green-600 px-2 py-0.5 text-xs font-bold text-white">
            {metacriticScore}
          </div>
        )}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {platforms.slice(0, 3).map((p) => (
            <span
              key={p}
              className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-gray-300"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-white transition-colors group-hover:text-purple-400">
          {title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-400">
          {description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {genres.slice(0, 2).map((g) => (
              <span
                key={g}
                className="rounded-full border border-gray-700 px-2 py-0.5 text-[10px] text-gray-400"
              >
                {g}
              </span>
            ))}
          </div>
          <span className="text-xs font-medium text-purple-400">
            {guideCount} guides
          </span>
        </div>
      </div>
    </Link>
  );
}