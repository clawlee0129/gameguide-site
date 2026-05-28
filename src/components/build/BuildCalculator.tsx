"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

/* ── types ──────────────────────────────────────────── */

type Attributes = {
  vigor: number;
  mind: number;
  endurance: number;
  strength: number;
  dexterity: number;
  intelligence: number;
};

interface WeaponData {
  id: string;
  baseDamage: number;
  scaling: Partial<Record<keyof Attributes, number>>;
}

interface TalismanData {
  id: string;
  damageBonus: number;
}

interface BuildConfig {
  attributes: Attributes;
  weaponId: string;
  talismanIds: string[];
}

/* ── attribute key order ─────────────────────────────── */

const ATTRIBUTE_KEYS: (keyof Attributes)[] = [
  "vigor",
  "mind",
  "endurance",
  "strength",
  "dexterity",
  "intelligence",
];

/* ── i18n key mappings (weapon/talisman id → dict key) ── */

const WEAPON_NAME_KEY: Record<string, string> = {
  "rivers-of-blood": "riversOfBloodName",
  moonveil: "moonveilName",
  "giant-crusher": "giantCrusherName",
};

const WEAPON_DESC_KEY: Record<string, string> = {
  "rivers-of-blood": "riversOfBloodDesc",
  moonveil: "moonveilDesc",
  "giant-crusher": "giantCrusherDesc",
};

const TALISMAN_NAME_KEY: Record<string, string> = {
  "rotten-winged-sword": "rottenWingedSwordName",
  "lord-of-blood": "lordOfBloodName",
  "dragoncrest-greatshield": "dragoncrestGreatshieldName",
  "radagon-soreseal": "radagonSoresealName",
};

const TALISMAN_DESC_KEY: Record<string, string> = {
  "rotten-winged-sword": "rottenWingedSwordDesc",
  "lord-of-blood": "lordOfBloodDesc",
  "dragoncrest-greatshield": "dragoncrestGreatshieldDesc",
  "radagon-soreseal": "radagonSoresealDesc",
};

const TALISMAN_EFFECT_KEY: Record<string, string> = {
  "rotten-winged-sword": "rottenWingedSwordEffect",
  "lord-of-blood": "lordOfBloodEffect",
  "dragoncrest-greatshield": "dragoncrestGreatshieldEffect",
  "radagon-soreseal": "radagonSoresealEffect",
};

/* ── static data (display strings come from dict) ──── */

const DEFAULT_ATTRIBUTES: Attributes = {
  vigor: 40,
  mind: 20,
  endurance: 30,
  strength: 35,
  dexterity: 30,
  intelligence: 10,
};

const WEAPONS: WeaponData[] = [
  {
    id: "rivers-of-blood",
    baseDamage: 186,
    scaling: { strength: 0.3, dexterity: 0.5, intelligence: 0.4 },
  },
  {
    id: "moonveil",
    baseDamage: 178,
    scaling: { strength: 0.25, dexterity: 0.45, intelligence: 0.6 },
  },
  {
    id: "giant-crusher",
    baseDamage: 330,
    scaling: { strength: 0.8, dexterity: 0.1 },
  },
];

const TALISMANS: TalismanData[] = [
  { id: "rotten-winged-sword", damageBonus: 1.09 },
  { id: "lord-of-blood", damageBonus: 1.05 },
  { id: "dragoncrest-greatshield", damageBonus: 0 },
  { id: "radagon-soreseal", damageBonus: 1.08 },
];

const MAX_TALISMAN_SLOTS = 4;
const TOTAL_POINTS_CAP = 200;

/* ── helpers ─────────────────────────────────────────── */

function encodeConfig(config: BuildConfig): string {
  const { attributes, weaponId, talismanIds } = config;
  const attrStr = ATTRIBUTE_KEYS.map((k) => attributes[k]).join(",");
  const taliStr = talismanIds.join(",");
  return `${weaponId}|${attrStr}|${taliStr}`;
}

function decodeConfig(raw: string): BuildConfig | null {
  const parts = raw.split("|");
  if (parts.length !== 3) return null;
  const [weaponId, attrRaw, taliRaw] = parts;
  const vals = attrRaw.split(",").map(Number);
  if (vals.length !== 6 || vals.some(isNaN)) return null;
  const attributes: Attributes = {
    vigor: vals[0],
    mind: vals[1],
    endurance: vals[2],
    strength: vals[3],
    dexterity: vals[4],
    intelligence: vals[5],
  };
  const talismanIds = taliRaw ? taliRaw.split(",").filter(Boolean) : [];
  return { attributes, weaponId, talismanIds };
}

function calcDamage(
  attrs: Attributes,
  weapon: WeaponData,
  talismans: TalismanData[],
): number {
  let scaledDamage = weapon.baseDamage;
  for (const [stat, factor] of Object.entries(weapon.scaling)) {
    scaledDamage += attrs[stat as keyof Attributes] * factor!;
  }
  for (const t of talismans) {
    if (t.damageBonus > 0) {
      scaledDamage *= t.damageBonus;
    }
  }
  return Math.round(scaledDamage);
}

/* ── attribute label helper ─────────────────────────── */

function getAttrLabel(
  dict: Record<string, string>,
  key: keyof Attributes,
): string {
  return dict[key] ?? key;
}

/* ── component props ────────────────────────────────── */

interface BuildCalculatorProps {
  dict: Record<string, string>;
}

/* ── component ──────────────────────────────────────── */

export function BuildCalculator({ dict }: BuildCalculatorProps) {
  const [attributes, setAttributes] = useState<Attributes>(DEFAULT_ATTRIBUTES);
  const [weaponId, setWeaponId] = useState(WEAPONS[0].id);
  const [selectedTalismans, setSelectedTalismans] = useState<string[]>([]);
  const [showShareToast, setShowShareToast] = useState(false);

  /* restore from URL params on mount */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("build");
    if (encoded) {
      const cfg = decodeConfig(encoded);
      if (cfg) {
        setAttributes(cfg.attributes);
        setWeaponId(cfg.weaponId);
        setSelectedTalismans(cfg.talismanIds);
      }
    }
  }, []);

  const weapon = useMemo(
    () => WEAPONS.find((w) => w.id === weaponId)!,
    [weaponId],
  );

  const activeTalismans = useMemo(
    () => TALISMANS.filter((t) => selectedTalismans.includes(t.id)),
    [selectedTalismans],
  );

  const totalPoints = useMemo(
    () => Object.values(attributes).reduce((s, v) => s + v, 0),
    [attributes],
  );

  const attackRating = useMemo(
    () => calcDamage(attributes, weapon, activeTalismans),
    [attributes, weapon, activeTalismans],
  );

  const remainingPoints = TOTAL_POINTS_CAP - totalPoints;

  /* ── handlers ── */

  const setAttr = useCallback(
    (key: keyof Attributes, value: number) => {
      setAttributes((prev) => {
        const diff = value - prev[key];
        const newTotal = totalPoints + diff;
        if (newTotal > TOTAL_POINTS_CAP) return prev;
        if (value < 0 || value > 99) return prev;
        return { ...prev, [key]: value };
      });
    },
    [totalPoints],
  );

  const toggleTalisman = useCallback((id: string) => {
    setSelectedTalismans((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_TALISMAN_SLOTS) return prev;
      return [...prev, id];
    });
  }, []);

  const handleShare = useCallback(() => {
    const config = decodeURIComponent(
      encodeConfig({ attributes, weaponId, talismanIds: selectedTalismans }),
    );
    const url = `${window.location.origin}/builds?build=${config}`;
    navigator.clipboard.writeText(url).then(() => {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    });
  }, [attributes, weaponId, selectedTalismans]);

  /* ── render ── */

  return (
    <div className="space-y-8">
      {/* ── share toast ── */}
      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-purple-600 px-4 py-3 text-sm font-medium text-white shadow-lg animate-slide-up">
          {dict.shareToast}
        </div>
      )}

      {/* ── Attributes ── */}
      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {dict.attributePoints}
          </h2>
          <span
            className={`rounded px-3 py-1 text-sm font-medium ${
              remainingPoints >= 0
                ? "bg-purple-900/40 text-purple-300"
                : "bg-red-900/40 text-red-400"
            }`}
          >
            {remainingPoints} / {TOTAL_POINTS_CAP} {dict.remaining}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ATTRIBUTE_KEYS.map((key) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                  {getAttrLabel(dict, key)}
                </label>
                <input
                  type="number"
                  value={attributes[key]}
                  min={0}
                  max={99}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v)) setAttr(key, v);
                  }}
                  className="w-16 rounded border border-gray-700 bg-gray-800 px-2 py-1 text-center text-sm text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
              <input
                type="range"
                min={0}
                max={99}
                value={attributes[key]}
                onChange={(e) => setAttr(key, parseInt(e.target.value, 10))}
                className="w-full accent-purple-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Weapon selection ── */}
      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-lg font-bold text-white">
          {dict.weaponSection}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {WEAPONS.map((w) => (
            <button
              key={w.id}
              onClick={() => setWeaponId(w.id)}
              className={`rounded-lg border p-4 text-left transition-all ${
                weaponId === w.id
                  ? "border-purple-500 bg-purple-900/20"
                  : "border-gray-700 bg-gray-800 hover:border-gray-600"
              }`}
            >
              <h3 className="font-semibold text-white">
                {dict[WEAPON_NAME_KEY[w.id]]}
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                {dict[WEAPON_DESC_KEY[w.id]]}
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs">
                <span className="text-purple-400">
                  {dict.dmg}: {w.baseDamage}
                </span>
                <span className="text-gray-500">
                  {Object.entries(w.scaling)
                    .map(
                      ([k, v]) =>
                        `${getAttrLabel(dict, k as keyof Attributes)[0]}:${v!.toFixed(1)}`,
                    )
                    .join(" ")}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Talisman selection ── */}
      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-lg font-bold text-white">
          {dict.talismansSection} ({selectedTalismans.length}/
          {MAX_TALISMAN_SLOTS})
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {TALISMANS.map((t) => {
            const selected = selectedTalismans.includes(t.id);
            const disabled =
              !selected && selectedTalismans.length >= MAX_TALISMAN_SLOTS;
            return (
              <button
                key={t.id}
                onClick={() => toggleTalisman(t.id)}
                disabled={disabled}
                className={`rounded-lg border p-4 text-left transition-all ${
                  selected
                    ? "border-purple-500 bg-purple-900/20"
                    : disabled
                      ? "cursor-not-allowed border-gray-800 bg-gray-800/50 opacity-40"
                      : "border-gray-700 bg-gray-800 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">
                    {dict[TALISMAN_NAME_KEY[t.id]]}
                  </h3>
                  {selected && (
                    <span className="rounded bg-purple-600 px-2 py-0.5 text-xs font-bold text-white">
                      {dict.equipped}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {dict[TALISMAN_DESC_KEY[t.id]]}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {dict[TALISMAN_EFFECT_KEY[t.id]]}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Attack Rating ── */}
      <section className="rounded-xl border-2 border-purple-600 bg-purple-950/30 p-6 text-center">
        <p className="text-sm uppercase tracking-wider text-purple-300">
          {dict.attackRating}
        </p>
        <p className="mt-1 text-5xl font-black text-purple-400">
          {attackRating}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          {dict.basedOn}{" "}
          {getAttrLabel(
            dict,
            Object.keys(weapon.scaling)[0] as keyof Attributes,
          )}{" "}
          {dict.scaling} × {dict[WEAPON_NAME_KEY[weapon.id]]}
        </p>
      </section>

      {/* ── Build Summary + Share ── */}
      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{dict.buildSummary}</h2>
          <button
            onClick={handleShare}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
          >
            {dict.copyShareLink}
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-300 md:grid-cols-2">
          <div>
            <span className="font-semibold text-gray-400">
              {dict.weaponSection}:
            </span>{" "}
            {dict[WEAPON_NAME_KEY[weapon.id]]}
          </div>
          <div>
            <span className="font-semibold text-gray-400">
              {dict.attackRating}:
            </span>{" "}
            <span className="text-purple-400 font-bold">{attackRating}</span>
          </div>
          {ATTRIBUTE_KEYS.map((key) => (
            <div key={key}>
              <span className="font-semibold text-gray-400">
                {getAttrLabel(dict, key)}:
              </span>{" "}
              {attributes[key]}
            </div>
          ))}
          <div className="md:col-span-2">
            <span className="font-semibold text-gray-400">
              {dict.talismansSection}:
            </span>{" "}
            {activeTalismans.length === 0
              ? dict.none
              : activeTalismans
                  .map((t) => dict[TALISMAN_NAME_KEY[t.id]])
                  .join(", ")}
          </div>
        </div>
      </section>
    </div>
  );
}

// Updated: 2026-05-25 - Phase2
// Updated: 2026-05-26 - Phase3 i18n (buildCalculator)