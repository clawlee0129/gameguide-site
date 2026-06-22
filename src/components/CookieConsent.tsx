"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState({ necessary: true, analytics: false, advertising: false });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const saveConsent = (type: string) => {
    const data = type === "all"
      ? { necessary: true, analytics: true, advertising: true }
      : type === "reject"
        ? { necessary: true, analytics: false, advertising: false }
        : prefs;
    localStorage.setItem("cookie-consent", JSON.stringify(data));
    window.dispatchEvent(new Event("cookie-consent-updated"));
    setVisible(false);
    setShowCustomize(false);
  };

  const acceptAll = () => saveConsent("all");
  const rejectAll = () => saveConsent("reject");
  const saveCustom = () => saveConsent("custom");

  if (!visible) return null;

  if (showCustomize) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[9999] card-dark border-t border-[rgba(201,160,80,0.15)] shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h3 className="text-lg font-bold text-[#e2d0b0] mb-4">Cookie Preferences</h3>
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between py-2 border-b border-[rgba(201,160,80,0.08)]">
              <div>
                <p className="text-sm font-medium text-[#e2d0b0]">Necessary Cookies</p>
                <p className="text-xs text-[#9a8a70]">Required for the website to function properly. Cannot be disabled.</p>
              </div>
              <span className="text-xs text-[#c9a050] bg-[rgba(201,160,80,0.1)] px-2 py-1 rounded">Always On</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[rgba(201,160,80,0.08)]">
              <div>
                <p className="text-sm font-medium text-[#e2d0b0]">Analytics Cookies</p>
                <p className="text-xs text-[#9a8a70]">Help us understand how visitors interact with the site to improve content.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={prefs.analytics} onChange={() => setPrefs({ ...prefs, analytics: !prefs.analytics })} />
                <div className="w-9 h-5 bg-[#2a1f0a] peer-focus:ring-2 peer-focus:ring-[#c9a050] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#9a8a70] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c9a050] peer-checked:after:bg-black" />
              </label>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[rgba(201,160,80,0.08)]">
              <div>
                <p className="text-sm font-medium text-[#e2d0b0]">Advertising Cookies</p>
                <p className="text-xs text-[#9a8a70]">Used to deliver personalized ads through Google AdSense and partners.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={prefs.advertising} onChange={() => setPrefs({ ...prefs, advertising: !prefs.advertising })} />
                <div className="w-9 h-5 bg-[#2a1f0a] peer-focus:ring-2 peer-focus:ring-[#c9a050] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#9a8a70] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c9a050] peer-checked:after:bg-black" />
              </label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={saveCustom} className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#c9a050] to-[#8b5a20] text-black font-semibold hover:from-[#e2c870] hover:to-[#c9a050] transition-colors">Save Preferences</button>
            <button onClick={() => setShowCustomize(false)} className="px-4 py-2 text-sm rounded-lg border border-[rgba(201,160,80,0.25)] text-[#e2d0b0] hover:bg-[rgba(201,160,80,0.05)] transition-colors">Back</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] card-dark border-t border-[rgba(201,160,80,0.15)] shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-[#e2d0b0] flex-1 leading-relaxed">
          We use cookies to personalise content and ads, provide social media features, and analyse traffic.
          By clicking &ldquo;Accept All&rdquo; you consent to our use of cookies.
          <a
            href="/en/privacy"
            className="ml-1 text-[#c9a050] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          {" &middot; "}
          <a
            href="/en/cookie-policy"
            className="text-[#c9a050] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowCustomize(true)}
            className="px-4 py-2 text-sm rounded-lg border border-[rgba(201,160,80,0.25)] text-[#e2d0b0] hover:bg-[rgba(201,160,80,0.05)] transition-colors"
          >
            Customize
          </button>
          <button
            onClick={rejectAll}
            className="px-4 py-2 text-sm rounded-lg border border-[rgba(201,160,80,0.25)] text-[#e2d0b0] hover:bg-[rgba(201,160,80,0.05)] transition-colors"
          >
            Reject All
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#c9a050] to-[#8b5a20] text-black font-semibold hover:from-[#e2c870] hover:to-[#c9a050] transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
