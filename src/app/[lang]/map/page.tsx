import { getDictionary } from "@/i18n";
import { getLangFromParams } from "@/i18n";
import { Metadata } from "next";
import { GameMap } from "@/components/map/GameMap";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));

  return {
    title: dict.metadata.mapTitle,
    description: dict.metadata.mapDescription,
  };
}

export default async function MapPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <a href="/" className="hover:text-gray-300">
          {dict.common.home}
        </a>
        <span>/</span>
        <span className="text-gray-400">{dict.nav.map}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          {dict.map.interactiveGameMap}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-gray-400">
          {dict.map.navigateWorld}
        </p>
      </div>

      {/* Game selector */}
      <div className="mb-6 flex items-center gap-4">
        <label className="text-sm font-medium text-gray-300">{dict.map.selectGame}</label>
        <select
          className="rounded border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-white focus:border-purple-500 focus:outline-none"
          defaultValue="elden-ring-limgrave"
        >
          <option value="elden-ring-limgrave">Elden Ring - Limgrave</option>
          <option value="elden-ring-liurnia" disabled>
            Elden Ring - Liurnia (coming soon)
          </option>
          <option value="elden-ring-caelid" disabled>
            Elden Ring - Caelid (coming soon)
          </option>
          <option value="hollow-knight-greenpath" disabled>
            Hollow Knight - Greenpath (coming soon)
          </option>
        </select>
        <span className="text-xs text-gray-500">
          {dict.map.moreMapsComing}
        </span>
      </div>

      {/* Map component */}
      <GameMap />

      {/* Legend & Controls */}
      <div className="mt-8 grid gap-6 rounded-xl border border-gray-800 bg-gray-900 p-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-bold text-white">{dict.map.mapLegend}</h3>
          <div className="mt-3 space-y-2 text-sm">
            {[
              { type: "boss", label: dict.map.bossLabel, color: "#ef4444" },
              { type: "item", label: dict.map.itemLabel, color: "#eab308" },
              { type: "teleport", label: dict.map.teleportLabel, color: "#3b82f6" },
              { type: "npc", label: dict.map.npcLabel, color: "#22c55e" },
            ].map(({ type, label, color }) => (
              <div key={type} className="flex items-center gap-2 text-gray-400">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {label}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{dict.map.controls}</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li>• <strong>{dict.map.clickMarker}</strong></li>
            <li>• <strong>{dict.map.dragMap}</strong></li>
            <li>• <strong>{dict.map.scrollZoom}</strong></li>
            <li>• <strong>{dict.map.filterButtons}</strong></li>
            <li>• <strong>{dict.map.zoomButtons}</strong></li>
            <li>• <strong>{dict.map.resetView}</strong></li>
          </ul>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-8 rounded-lg border border-purple-500/20 bg-purple-900/10 p-4">
        <p className="text-sm text-purple-300">
          {dict.map.mapNote}
        </p>
      </div>
    </div>
  );
}

// Updated: 2026-05-25 - Phase 2
// Updated: 2026-05-26 - Phase 3 i18n
// Updated: 2026-05-28 - i18n fix