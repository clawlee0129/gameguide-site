import { getDictionary } from "@/i18n";
import { getLangFromParams } from "@/i18n";
import { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/data/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  
  return {
    title: dict.metadata.categoriesTitle,
    description: dict.metadata.categoriesDescription,
  };
}

export default async function CategoriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-white">{dict.categories.gameCategories}</h1>
      <p className="mb-8 text-gray-400">
        {dict.categories.findBestGuides}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="group flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-900 p-5 transition-all hover:border-purple-500/30 hover:bg-gray-850"
          >
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-800 text-2xl group-hover:bg-purple-900/50">
              {cat.icon}
            </span>
            <div>
              <h3 className="font-semibold text-white transition-colors group-hover:text-purple-400">
                {dict.categories[cat.nameKey as keyof typeof dict.categories] || cat.name}
              </h3>
              <p className="mt-0.5 text-sm text-gray-500">
                {dict.categories.masterCategory} {dict.categories[cat.nameKey as keyof typeof dict.categories]?.toLowerCase() || cat.name.toLowerCase()} {lang === 'zh' ? '游戏' : 'games'}
              </p>
            </div>
            <svg
              className="ml-auto h-4 w-4 flex-shrink-0 text-gray-600 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Updated: 2026-05-28 - Phase 3 i18n fix