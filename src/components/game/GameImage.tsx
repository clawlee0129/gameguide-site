'use client';

import { useState } from 'react';

interface GameImageProps {
  src: string;
  alt: string;
  gradientClass: string;
  fallbackChar: string;
}

export function GameImage({ src, alt, gradientClass, fallbackChar }: GameImageProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradientClass}`}>
        <span className="text-6xl font-black text-white/10">{fallbackChar}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
}