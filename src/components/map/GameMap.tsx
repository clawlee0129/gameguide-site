"use client";

import { useState, useRef, useCallback, useEffect } from "react";

/* ── types ──────────────────────────────────────────── */

type MarkerType = "boss" | "item" | "teleport" | "npc";

interface MarkerData {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  type: MarkerType;
  name: string;
  description: string;
}

/* ── data ───────────────────────────────────────────── */

const LIMGRAVE_MARKERS: MarkerData[] = [
  { id: "m1", x: 42, y: 28, type: "boss", name: "Margit, the Fell Omen", description: "First major boss guarding Stormveil Castle." },
  { id: "m2", x: 55, y: 22, type: "boss", name: "Godrick the Grafted", description: "Shardbearer boss of Stormveil Castle." },
  { id: "m3", x: 18, y: 60, type: "boss", name: "Tree Sentinel", description: "Mounted boss patrolling the starting area." },
  { id: "m4", x: 35, y: 72, type: "boss", name: "Flying Dragon Agheel", description: "Dragon boss in the lake near the starting area." },
  { id: "m5", x: 72, y: 48, type: "boss", name: "Leonine Misbegotten", description: "Boss of Castle Morne in the Weeping Peninsula." },
  { id: "m6", x: 20, y: 35, type: "item", name: "Golden Seed", description: "Near the Stormhill shack — flask upgrade material." },
  { id: "m7", x: 62, y: 65, type: "item", name: "Flask of Wondrous Physick", description: "Found at the Third Church of Marika." },
  { id: "m8", x: 12, y: 42, type: "item", name: "Limgrave Map Fragment", description: "At the Gatefront Ruins stele." },
  { id: "m9", x: 78, y: 72, type: "item", name: "Smithing Stone (3)", description: "In the mine northeast of Castle Morne." },
  { id: "m10", x: 8, y: 18, type: "item", name: "Golden Rune (5)", description: "Hidden chest at the Church of Elleh ruins." },
  { id: "m11", x: 50, y: 52, type: "teleport", name: "Third Church of Marika", description: "Site of Grace with a teleporter to Bestial Sanctum." },
  { id: "m12", x: 25, y: 55, type: "teleport", name: "Church of Elleh", description: "First major Site of Grace. Merchant and anvil." },
  { id: "m13", x: 40, y: 42, type: "teleport", name: "Gatefront Ruins", description: "Key Site of Grace with map fragment and whetstone knife." },
  { id: "m14", x: 65, y: 15, type: "teleport", name: "Stormveil Main Gate", description: "Main entrance to Stormveil Castle." },
  { id: "m15", x: 68, y: 38, type: "teleport", name: "Castle Morne Lift", description: "Site of Grace at the lift to Castle Morne." },
  { id: "m16", x: 30, y: 18, type: "npc", name: "Boc the Seamster", description: "Demi-human tailor — can alter your garments for free." },
  { id: "m17", x: 85, y: 28, type: "npc", name: "Irina", description: "Blind woman seeking her father at Castle Morne." },
  { id: "m18", x: 48, y: 78, type: "npc", name: "Kenneth Haight", description: "Noble seeking to reclaim Fort Haight." },
  { id: "m19", x: 15, y: 48, type: "npc", name: "Roderika", description: "Spirit tuner found at the Stormhill shack." },
  { id: "m20", x: 60, y: 55, type: "npc", name: "Patches", description: "Unscrupulous merchant in Murkwater Cave." },
];

const MARKER_COLORS: Record<MarkerType, string> = {
  boss: "#ef4444",
  item: "#eab308",
  teleport: "#3b82f6",
  npc: "#22c55e",
};

const MARKER_LABELS: Record<MarkerType, string> = {
  boss: "Boss",
  item: "Item / Chest",
  teleport: "Site of Grace",
  npc: "NPC",
};

/* ── component ──────────────────────────────────────── */

export function GameMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [activeMarker, setActiveMarker] = useState<MarkerData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [filter, setFilter] = useState<MarkerType[]>(
    ["boss", "item", "teleport", "npc"],
  );
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const filteredMarkers = LIMGRAVE_MARKERS.filter((m) =>
    filter.includes(m.type),
  );

  /* ── drawing ── */

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    /* background */
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, "#1a3a1a");
    bgGrad.addColorStop(0.4, "#1a2f1a");
    bgGrad.addColorStop(0.6, "#142814");
    bgGrad.addColorStop(1, "#0f1f0f");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    /* terrain features */
    ctx.fillStyle = "#1f4020";
    ctx.beginPath();
    ctx.ellipse(w * 0.35, h * 0.25, w * 0.15, h * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1c381c";
    ctx.beginPath();
    ctx.ellipse(w * 0.6, h * 0.35, w * 0.2, h * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    /* rivers / roads */
    ctx.strokeStyle = "#2a5a2a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w * 0.15, h * 0.5);
    ctx.quadraticCurveTo(w * 0.3, h * 0.65, w * 0.5, h * 0.7);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w * 0.55, h * 0.6);
    ctx.quadraticCurveTo(w * 0.75, h * 0.55, w * 0.9, h * 0.65);
    ctx.stroke();

    /* lake */
    ctx.fillStyle = "rgba(40,80,120,0.25)";
    ctx.beginPath();
    ctx.ellipse(w * 0.3, h * 0.7, w * 0.12, h * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();

    /* grid */
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 0.5;
    const gridSize = 50;
    for (let gx = 0; gx < w; gx += gridSize) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, h);
      ctx.stroke();
    }
    for (let gy = 0; gy < h; gy += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();
    }

    /* markers */
    for (const marker of filteredMarkers) {
      const mx = offset.x + (marker.x / 100) * w * scale;
      const my = offset.y + (marker.y / 100) * h * scale;

      if (mx < -20 || mx > w + 20 || my < -20 || my > h + 20) continue;

      const color = MARKER_COLORS[marker.type];
      const isActive = activeMarker?.id === marker.id;

      /* glow */
      if (isActive) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
      }

      /* pin body */
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(mx, my, isActive ? 7 : 5, 0, Math.PI * 2);
      ctx.fill();

      /* pin border */
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.stroke();

      ctx.shadowBlur = 0;

      /* label */
      ctx.fillStyle = "#fff";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(marker.name.slice(0, 12), mx, my - 12);
    }

    /* compass */
    const compX = w - 40;
    const compY = 40;
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.beginPath();
    ctx.arc(compX, compY, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("N", compX, compY - 10);

    /* scale bar */
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(10, h - 30, 80, 18);
    ctx.fillStyle = "#aaa";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${Math.round(100 / scale)} m`, 50, h - 18);
  }, [scale, offset, filteredMarkers, activeMarker]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  /* ── interaction ── */

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;

      // check markers
      let found: MarkerData | null = null;
      for (const marker of filteredMarkers) {
        const mx = offset.x + (marker.x / 100) * w * scale;
        const my = offset.y + (marker.y / 100) * h * scale;
        const dist = Math.hypot(cx - mx, cy - my);
        if (dist < 16) {
          found = marker;
          break;
        }
      }

      if (found) {
        setActiveMarker(found);
        setTooltipPos({ x: e.clientX, y: e.clientY });
      } else {
        setActiveMarker(null);
      }
    },
    [filteredMarkers, scale, offset],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (e.button === 0) {
        setDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      }
    },
    [offset],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (dragging) {
        setOffset({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [dragging, dragStart],
  );

  const handleMouseUp = useCallback(() => setDragging(false), []);

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const newScale = Math.max(0.4, Math.min(3, scale - e.deltaY * 0.002));
      setScale(newScale);
    },
    [scale],
  );

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(3, prev + 0.2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(0.4, prev - 0.2));
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const toggleFilter = useCallback((type: MarkerType) => {
    setFilter((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }, []);

  /* ── render ── */

  return (
    <div className="relative" ref={containerRef}>
      {/* filter bar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {(["boss", "item", "teleport", "npc"] as MarkerType[]).map((type) => {
          const active = filter.includes(type);
          return (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all"
              style={{
                borderColor: active ? MARKER_COLORS[type] : "#374151",
                color: active ? MARKER_COLORS[type] : "#9ca3af",
                backgroundColor: active ? `${MARKER_COLORS[type]}15` : "transparent",
              }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: MARKER_COLORS[type] }}
              />
              {MARKER_LABELS[type]}
            </button>
          );
        })}
      </div>

      {/* map canvas */}
      <div className="relative overflow-hidden rounded-xl border border-gray-800">
        <canvas
          ref={canvasRef}
          className="h-[500px] w-full cursor-grab active:cursor-grabbing"
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        />

        {/* zoom controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1">
          <button
            onClick={handleZoomIn}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-sm text-white transition-colors hover:bg-gray-700"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-sm text-white transition-colors hover:bg-gray-700"
          >
            −
          </button>
          <button
            onClick={handleReset}
            className="mt-1 rounded-lg bg-gray-800 px-2 py-1 text-[10px] text-gray-400 transition-colors hover:bg-gray-700"
          >
            Reset
          </button>
        </div>

        {/* scale indicator */}
        <div className="absolute bottom-4 left-4 rounded bg-black/50 px-2 py-1 text-[10px] text-gray-400">
          Zoom: {Math.round(scale * 100)}%
        </div>
      </div>

      {/* tooltip */}
      {activeMarker && (
        <div
          className="fixed z-50 w-56 rounded-lg border border-gray-700 bg-gray-900 p-3 shadow-lg"
          style={{
            left: Math.min(tooltipPos.x + 12, window.innerWidth - 240),
            top: tooltipPos.y + 12,
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: MARKER_COLORS[activeMarker.type] }}
            />
            <h4 className="text-sm font-bold text-white">
              {activeMarker.name}
            </h4>
          </div>
          <p className="mt-1 text-xs text-gray-400">
            {activeMarker.description}
          </p>
          <span className="mt-1 inline-block rounded bg-gray-800 px-2 py-0.5 text-[10px] text-gray-500">
            {MARKER_LABELS[activeMarker.type]}
          </span>
          <button
            onClick={() => setActiveMarker(null)}
            className="absolute right-2 top-2 text-gray-500 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

// Updated: 2026-05-25 - Phase 2