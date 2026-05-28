'use client';

import { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  size: 'banner' | 'sidebar' | 'in-content';
  slot?: string;
  className?: string;
  lazy?: boolean;
}

export function AdBanner({ size, slot = 'demo', className = '', lazy = true }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(!lazy);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [lazy]);

  const dimensions = {
    banner: { width: 728, height: 90, label: 'Leaderboard' },
    sidebar: { width: 300, height: 250, label: 'Medium Rectangle' },
    'in-content': { width: '100%', height: 'auto', label: 'Responsive' } as const,
  };

  const { width, height, label } = dimensions[size];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        minHeight: typeof height === 'number' ? `${height}px` : 'auto',
      }}
    >
      {/* Ad Label */}
      <div className="absolute left-0 top-0 z-10 flex items-center justify-center rounded-br-lg bg-gray-900 px-2 py-1">
        <span className="text-xs font-medium text-gray-500">Advertisement</span>
      </div>

      {/* Ad Content */}
      {isVisible ? (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mb-2 text-4xl text-gray-700">📢</div>
            <div className="text-sm text-gray-600">
              <div className="font-medium">Google AdSense</div>
              <div className="text-xs">{label} - {slot}</div>
            </div>
            <div className="mt-2 text-xs text-gray-700">
              {width}x{height}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="text-sm text-gray-700">Loading ad...</div>
          </div>
        </div>
      )}

      {/* Simulated Ad Content */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-0.5 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-gray-600" />
      </div>
    </div>
  );
}

// Updated: 2026-05-26 - Phase 3