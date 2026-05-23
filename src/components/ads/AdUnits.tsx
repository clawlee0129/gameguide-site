import { adUnits } from '@/data/site';

export function AdBanner({ adUnitId }: { adUnitId: string }) {
  const unit = adUnits.find((u) => u.id === adUnitId);
  if (!unit || !unit.enabled) return null;

  return (
    <div
      className="my-6 flex justify-center overflow-hidden rounded-lg bg-gray-900/50"
      data-ad-unit={unit.id}
      data-ad-provider={unit.provider}
    >
      <div className="flex items-center justify-center py-4 text-center">
        <span className="text-xs text-gray-600">Advertisement</span>
      </div>
    </div>
  );
}

export function AdSidebar() {
  const sidebarUnit = adUnits.find((u) => u.id === 'sidebar-sticky');
  if (!sidebarUnit?.enabled) return null;

  return (
    <div className="sticky top-24">
      <div
        className="flex min-h-[600px] items-center justify-center rounded-lg bg-gray-900/50"
        data-ad-unit="sidebar-sticky"
        data-ad-provider={sidebarUnit.provider}
      >
        <span className="text-xs text-gray-600">Sidebar Ad</span>
      </div>
    </div>
  );
}

export function AdNative({ adUnitId }: { adUnitId: string }) {
  const unit = adUnits.find((u) => u.id === adUnitId);
  if (!unit || !unit.enabled) return null;

  return (
    <div
      className="my-4 rounded-lg border border-gray-800 bg-gray-900/30 p-4"
      data-ad-unit={unit.id}
      data-ad-provider={unit.provider}
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 flex-shrink-0 rounded bg-gray-800" />
        <div className="flex-1">
          <div className="mb-1 h-3 w-3/4 rounded bg-gray-800" />
          <div className="h-2 w-1/2 rounded bg-gray-800" />
        </div>
      </div>
      <div className="mt-2 text-center">
        <span className="text-[10px] text-gray-600">Sponsored</span>
      </div>
    </div>
  );
}