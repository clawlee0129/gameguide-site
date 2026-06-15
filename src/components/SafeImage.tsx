"use client";

import { useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  loading?: "lazy" | "eager";
}

export default function SafeImage({ src, alt, className, fallbackSrc, loading }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hidden, setHidden] = useState(false);

  return hidden ? null : (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (fallbackSrc && imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        } else {
          setHidden(true);
        }
      }}
    />
  );
}
