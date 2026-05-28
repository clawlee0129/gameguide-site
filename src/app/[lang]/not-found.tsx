import { getDictionary } from "@/i18n";
import { getLangFromParams } from "@/i18n";
import Link from 'next/link';

export default async function NotFound({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-20 text-center">
      <div className="relative mb-8">
        <div className="text-[140px] font-black leading-none text-purple-600/20 select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl">🎮</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-white">Game Over — Page Not Found</h1>
      <p className="mt-4 max-w-md text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        It might be a broken link, or maybe a mimic chest got it.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
        >
          Return Home
        </Link>
        <Link
          href="/search"
          className="rounded-lg border border-gray-600 px-6 py-3 text-sm font-semibold text-gray-200 transition-colors hover:border-gray-400 hover:text-white"
        >
          Search Guides
        </Link>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-8">
        <p className="text-sm text-gray-600">
          Suggested pages: {' '}
          <Link href="/games/elden-ring" className="text-purple-400 hover:text-purple-300">Elden Ring</Link>
          {' · '}
          <Link href="/games/baldurs-gate-3" className="text-purple-400 hover:text-purple-300">Baldur&apos;s Gate 3</Link>
          {' · '}
          <Link href="/guides" className="text-purple-400 hover:text-purple-300">Latest Guides</Link>
        </p>
      </div>
    </div>
  );
}
// Updated: 2026-05-26 - Phase 3 i18n