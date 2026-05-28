'use client';
import Link from 'next/link';
import { useState } from 'react';

interface GameCardProps {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  platforms: string[];
  genres: string[];
  metacriticScore?: number;
  guideCount: number;
  guideLabel?: string;
}

const gradientColors = [
  'from-purple-900 via-violet-800 to-indigo-900',
  'from-emerald-900 via-teal-800 to-cyan-900',
  'from-rose-900 via-pink-800 to-fuchsia-900',
  'from-amber-900 via-orange-800 to-yellow-900',
  'from-blue-900 via-cyan-800 to-sky-900',
  'from-red-900 via-rose-800 to-orange-900',
  'from-green-900 via-lime-800 to-teal-900',
  'from-indigo-900 via-blue-800 to-violet-900',
];

export function GameCard({
  slug,
  title,
  description,
  coverImage,
  platforms,
  genres,
  metacriticScore,
  guideCount,
  guideLabel,
}: GameCardProps) {
  const [imgError, setImgError] = useState(false);
  const gradientClass = gradientColors[title.length % gradientColors.length];

  return (
    <Link
      href={`/games/${slug}`}
      className="group block overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
    >
      <div className={`relative aspect-video overflow-hidden ${imgError ? `bg-gradient-to-br ${gradientClass}` : 'bg-gray-800'}`}>
        {!imgError && (
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
        {imgError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-black text-white/10">
              {title.charAt(0)}
            </span>
          </div>
        )}
        {metacriticScore && (
          <div className="absolute right-2 top-2 rounded-md bg-green-600 px-2 py-0.5 text-xs font-bold text-white shadow-lg">
            {metacriticScore}
          </div>
        )}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {platforms.slice(0, 3).map((p) => (
            <span
              key={p}
              className="rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-gray-200 backdrop-blur-sm"
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
            {guideCount} {guideLabel || 'guides'}
          </span>
        </div>
      </div>
    </Link>
  );
}