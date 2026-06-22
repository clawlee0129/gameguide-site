"use client";

import { useState } from "react";

interface CookieConsentProps {
  dict: Record<string, any>;
}

export default function CookieConsent({ dict }: CookieConsentProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const loadAdSense = () => {
    setDismissed(true);
    try {
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.setAttribute("data-ad-client", "ca-pub-XXXXXXXXXXXXXXXX");
      document.head.appendChild(script);
    } catch { /* ignore */ }
  };

  const removeAdSense = () => {
    setDismissed(true);
    try {
      document.querySelectorAll('script[src*="pagead2.googlesyndication.com"]').forEach((s) => s.remove());
    } catch { /* ignore */ }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 card-dark border-t border-[rgba(201,160,80,0.15)]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-[#e2d0b0] flex-1">
          {dict.cookie?.message || "We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic."}{" "}
          <a href={`/${dict.cookie?.lang || "en"}/privacy`} className="text-[#c9a050] hover:underline">
            {dict.cookie?.privacy || "Privacy Policy"}
          </a>
          {" "}&middot;{" "}
          <a href={`/${dict.cookie?.lang || "en"}/cookie-policy`} className="text-[#c9a050] hover:underline">
            {dict.cookie?.learnMore || "Learn more"}
          </a>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={loadAdSense}
            className="px-5 py-2 bg-gradient-to-r from-[#c9a050] to-[#8b5a20] text-black text-sm font-semibold rounded-lg hover:from-[#e2c870] hover:to-[#c9a050] transition-colors"
          >
            {dict.cookie?.acceptAll || "Accept All"}
          </button>
          <button
            onClick={removeAdSense}
            className="px-5 py-2 border border-[rgba(201,160,80,0.25)] text-[#e2d0b0] text-sm font-medium rounded-lg hover:border-[#c9a050] hover:text-[#e2c870] transition-colors"
          >
            {dict.cookie?.essentialOnly || "Essential Only"}
          </button>
        </div>
      </div>
    </div>
  );
}
