import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

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

export function GuideCard({
  slug,
  title,
  excerpt,
  gameTitle,
  gameSlug,
  difficulty,
  readingTime,
  publishedAt,
}: GuideCardProps) {
  return (
    <Link
      href={`/guides/${slug}`}
      className="group block overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
    >
      {/* Image Placeholder */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-gray-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-black text-gray-600 opacity-30">
            {gameTitle.charAt(0)}
          </span>
        </div>
        <div className="absolute left-2 top-2">
          <span
            className={`rounded border px-2 py-0.5 text-[10px] font-medium ${difficultyColors[difficulty]}`}
          >
            {difficultyLabels[difficulty]}
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
          <span>{readingTime} min read</span>
          <span>·</span>
          <span>{formatDistanceToNow(publishedAt, { addSuffix: true })}</span>
        </div>
      </div>
    </Link>
  );
}