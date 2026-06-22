"use client";

import { useEffect, useRef, useState } from "react";

interface GiscusCommentsProps {
  lang: string;
}

/**
 * Giscus-powered comments section.
 * Uses the GitHub Discussions backend via giscus.app.
 * Maps repo: clawlee0129/gameguide-site with category "General".
 * Falls back to a static prompt if Giscus fails to load.
 */
export default function GiscusComments({ lang }: GiscusCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "clawlee0129/gameguide-site");
    script.setAttribute("data-repo-id", "R_kgDOOHQUZg");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOOHQUZs4CpV_P");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", lang === "zh" ? "zh-CN" : "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    script.onerror = () => setFailed(true);
    containerRef.current.appendChild(script);

    return () => {
      // Giscus cleans up its own script on unmount
    };
  }, [lang]);

  if (failed) {
    return (
      <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-8 text-center">
        <p className="text-gray-600 dark:text-[#a0a0a0] text-sm">
          {lang === "zh"
            ? "评论系统暂不可用，请稍后再试。"
            : "Comments are temporarily unavailable. Please try again later."}
        </p>
      </div>
    );
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-[#2a2a2a]">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        {lang === "zh" ? "评论区" : "Comments"}
      </h2>
      <div ref={containerRef} className="giscus" />
    </section>
  );
}
