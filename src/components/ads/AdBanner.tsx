'use client';

import { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  size: 'banner' | 'sidebar' | 'in-content';
  slot?: string;
  className?: string;
  lazy?: boolean;
}

export function AdBanner({ size, slot = 'auto', className = '', lazy = true }: AdBannerProps) {
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

  useEffect(() => {
    if (!isVisible) return;
    // Trigger AdSense ad load when visible
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      // AdSense not loaded yet, will retry on next visibility change
    }
  }, [isVisible]);

  if (!isVisible) {
    return (
      <div
        ref={containerRef}
        style={{ minHeight: typeof height === 'number' ? `${height}px` : '90px' }}
      />
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-800/50 bg-gray-900/50 ${className}`}
    >
      <div className="flex items-center justify-center px-1 py-0.5">
        <span className="text-[10px] text-gray-600">Advertisement</span>
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: typeof height === 'number' ? `${height}px` : '90px' }}
        data-ad-client="ca-pub-4051053911004228"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Updated: 2026-05-26 - Phase 3