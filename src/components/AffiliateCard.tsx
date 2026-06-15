"use client";

import SafeImage from "@/components/SafeImage";

interface AffiliateCardProps {
  title: string;
  image: string;
  url: string;
  price?: string;
  store?: string;
}

export default function AffiliateCard({ title, image, url, price, store }: AffiliateCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow sponsored noopener"
      className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#1a1a1a] hover:border-[#6C3FB7]/40 dark:hover:border-[#6C3FB7]/40 transition-all group"
    >
      <div className="w-16 h-16 shrink-0 rounded-md bg-[#252525] overflow-hidden flex items-center justify-center">
        <SafeImage
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {!image && (
          <span className="text-xs text-[#a0a0a0]">No image</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#a0a0a0] bg-gray-200 dark:bg-[#2a2a2a] px-1.5 py-0.5 rounded uppercase tracking-wider">Ad</span>
          {store && <span className="text-[10px] text-[#a0a0a0]">{store}</span>}
        </div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mt-0.5 group-hover:text-[#6C3FB7] transition-colors line-clamp-2">{title}</h4>
        {price && <p className="text-xs text-[#22c55e] mt-0.5">{price}</p>}
      </div>
      <div className="shrink-0">
        <span className="text-xs font-medium bg-[#6C3FB7] text-white px-3 py-1.5 rounded-md group-hover:bg-[#7c4fd7] transition-colors">
          Buy
        </span>
      </div>
    </a>
  );
}
