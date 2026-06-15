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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/98 dark:bg-[#0a0a0a]/98 backdrop-blur border-t border-gray-200 dark:border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600 dark:text-[#a0a0a0] flex-1">
          {dict.cookie?.text || "We use cookies and similar technologies to improve your browsing experience and show personalized ads. By continuing, you agree to our use of cookies."}{" "}
          <a href="/en/privacy" className="text-[#6C3FB7] hover:underline">
            {dict.cookie?.privacy || "Privacy Policy"}
          </a>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={loadAdSense}
            className="px-5 py-2 bg-[#6C3FB7] text-white text-sm font-medium rounded-lg hover:bg-[#7c4fd7] transition-colors"
          >
            {dict.cookie?.acceptAll || "Accept All"}
          </button>
          <button
            onClick={removeAdSense}
            className="px-5 py-2 border border-gray-300 dark:border-[#2a2a2a] text-gray-600 dark:text-[#a0a0a0] text-sm font-medium rounded-lg hover:border-gray-400 dark:hover:border-[#6C3FB7] hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {dict.cookie?.essential || "Essential Only"}
          </button>
        </div>
      </div>
    </div>
  );
}
