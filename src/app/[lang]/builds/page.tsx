import { getDictionary } from "@/i18n";
import { getLangFromParams } from "@/i18n";
import { Metadata } from "next";
import { BuildCalculator } from "@/components/build/BuildCalculator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  
  return {
    title: dict.metadata.buildsTitle,
    description: dict.metadata.buildsDescription,
  };
}

export default async function BuildsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  const dateLocale = lang === 'zh' ? 'zh-CN' : 'en-US';
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <a href="/" className="hover:text-gray-300">
          {dict.common.home}
        </a>
        <span>/</span>
        <span className="text-gray-400">{dict.nav.builds}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          {dict.builds.buildCalculator}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-gray-400">
          {dict.builds.optimizeCharacter}
        </p>
      </div>

      {/* Calculator */}
      <BuildCalculator dict={dict.buildCalculator} />

      {/* Info section */}
      <div className="mt-10 grid gap-6 rounded-xl border border-gray-800 bg-gray-900 p-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-bold text-white">{dict.builds.howItWorks}</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li>• {dict.builds.allocatePoints}</li>
            <li>• {dict.builds.chooseWeapons}</li>
            <li>• {dict.builds.equipTalismans}</li>
            <li>• {dict.builds.attackRatingUpdates}</li>
            <li>• {dict.builds.copyShareableUrl}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{dict.builds.tips}</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li>• {dict.builds.focusOnStats}</li>
            <li>• {dict.builds.talismansIncrease}</li>
            <li>• {dict.builds.keepEyeOnPoints}</li>
            <li>• {dict.builds.useShareLink}</li>
            <li>• {dict.builds.tryDifferentCombos}</li>
          </ul>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-8 text-center text-xs text-gray-600">
        <p>{dict.builds.demoNote}</p>
      </div>
    </div>
  );
}

// Updated: 2026-05-25 - Phase 2
// Updated: 2026-05-26 - Phase 3 i18n