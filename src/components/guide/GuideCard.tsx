'use client';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

interface GuideCardProps {
  slug: string;
  title: string;
  excerpt: string;
  gameTitle: string;
  gameSlug: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  readingTime: number;
  publishedAt: Date;
  coverImage: string;
  dict?: {
    guideCard?: {
      minRead?: string;
      beginner?: string;
      intermediate?: string;
      advanced?: string;
      expert?: string;
    };
  };
}

const difficultyColors = {
  beginner: 'bg-green-600/20 text-green-400 border-green-600/30',
  intermediate: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
  advanced: 'bg-orange-600/20 text-orange-400 border-orange-600/30',
  expert: 'bg-red-600/20 text-red-400 border-red-600/30',
};

const difficultyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

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

export function GuideCard({
  slug,
  title,
  excerpt,
  gameTitle,
  gameSlug,
  difficulty,
  readingTime,
  publishedAt,
  coverImage,
  dict,
}: GuideCardProps) {
  const [imgError, setImgError] = useState(false);
  const gradientClass = gradientColors[gameTitle.length % gradientColors.length];

  const resolvedDifficultyLabels: Record<string, string> = {
    beginner: dict?.guideCard?.beginner || 'Beginner',
    intermediate: dict?.guideCard?.intermediate || 'Intermediate',
    advanced: dict?.guideCard?.advanced || 'Advanced',
    expert: dict?.guideCard?.expert || 'Expert',
  };

  return (
    <Link
      href={`/guides/${slug}`}
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
              {gameTitle.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute left-2 top-2">
          <span
            className={`rounded border px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm ${difficultyColors[difficulty]}`}
          >
            {resolvedDifficultyLabels[difficulty]}
          </span>
        </div>
      </div>

      <div className="p-4">
        <Link
          href={`/games/${gameSlug}`}
          className="text-xs font-medium text-purple-400 transition-colors hover:text-purple-300"
        >
          {gameTitle}
        </Link>
        <h3 className="mt-1 text-base font-bold leading-snug text-white transition-colors group-hover:text-purple-400">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-400">
          {excerpt}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
          <span>{readingTime} {dict?.guideCard?.minRead || 'min read'}</span>
          <span>·</span>
          <span>{formatDistanceToNow(publishedAt, { addSuffix: true })}</span>
        </div>
      </div>
    </Link>
  );
}