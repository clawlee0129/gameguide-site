"use client";

import Link from "next/link";

export default function Footer({ lang, dict }: { lang: string; dict: Record<string, any> }) {
  return (
    <footer className="border-t border-[rgba(201,160,80,0.15)] bg-[#0a0a14]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gradient mb-3">GameGuide</h3>
            <p className="text-sm text-[#9a8a70] leading-relaxed">{dict.footer.about}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 font-[family-name:var(--font-cinzel)] text-[#e2d0b0]">{dict.footer.quickLinks}</h4>
            <div className="space-y-2 text-sm">
              <Link href={`/${lang}/games`} className="block text-[#9a8a70] hover:text-[#e2c870]">{dict.nav.games}</Link>
              <Link href={`/${lang}/guides`} className="block text-[#9a8a70] hover:text-[#e2c870]">{dict.nav.guides}</Link>
              <Link href={`/${lang}/categories`} className="block text-[#9a8a70] hover:text-[#e2c870]">{dict.nav.categories}</Link>
              <Link href={`/${lang}/privacy`} className="block text-[#9a8a70] hover:text-[#e2c870]">{dict.footer.privacy}</Link>
              <Link href={`/${lang}/terms`} className="block text-[#9a8a70] hover:text-[#e2c870]">{dict.footer.terms}</Link>
              <Link href={`/${lang}/contact`} className="block text-[#9a8a70] hover:text-[#e2c870]">{dict.footer.contact}</Link>
              <Link href={`/${lang}/cookie-policy`} className="block text-[#9a8a70] hover:text-[#e2c870]">Cookie Policy</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 font-[family-name:var(--font-cinzel)] text-[#e2d0b0]">{dict.footer.followUs}</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <a href="https://twitter.com/gameguide" target="_blank" rel="noopener noreferrer" className="text-[#9a8a70] hover:text-[#1DA1F2] inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Twitter
              </a>
              <a href="https://discord.gg/gameguide" target="_blank" rel="noopener noreferrer" className="text-[#9a8a70] hover:text-[#5865F2] inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                Discord
              </a>
              <a href="https://www.reddit.com/r/gameguide" target="_blank" rel="noopener noreferrer" className="text-[#9a8a70] hover:text-[#FF4500] inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547.8-3.747c1.086.303 1.74 1.29 1.74 2.49 0 .688-.562 1.249-1.25 1.249-.688 0-1.25-.561-1.25-1.249 0-.688.562-1.249 1.25-1.249.164 0 .322.031.47.087l-.66 3.09c-.096.444-.634.726-1.04.538a11.977 11.977 0 0 0-8.112 0c-.406.188-.944-.094-1.04-.538l-.66-3.09c.148-.056.306-.087.47-.087.688 0 1.25.561 1.25 1.249 0 .688-.562 1.249-1.25 1.249-.688 0-1.25-.561-1.25-1.249 0-1.2.654-2.187 1.74-2.49l.8 3.747-2.597.547a1.249 1.249 0 0 0-1.223-.936c-.689 0-1.249.561-1.249 1.249 0 .688.56 1.249 1.249 1.249.323 0 .615-.124.838-.328 3.052 1.969 6.133 1.995 8.88.009A1.248 1.248 0 0 0 16.76 17.3a1.248 1.248 0 0 0 .8-.284zm-8.49 5.022c-.689 0-1.249-.561-1.249-1.249 0-.688.56-1.249 1.249-1.249.689 0 1.249.561 1.249 1.249 0 .688-.56 1.249-1.249 1.249zm5.56.633a.72.72 0 0 1-.506.253.717.717 0 0 1-.506-.253.717.717 0 0 1 .506-1.016.72.72 0 0 1 .506 1.016zm1.39.217a1.249 1.249 0 0 1-1.249-1.249c0-.688.56-1.249 1.249-1.249.689 0 1.249.561 1.249 1.249 0 .688-.56 1.249-1.249 1.249z"/></svg>
                Reddit
              </a>
              <a href="https://youtube.com/@gameguide" target="_blank" rel="noopener noreferrer" className="text-[#9a8a70] hover:text-[#FF0000] inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[rgba(201,160,80,0.15)] text-center text-[#9a8a70] text-sm">
          <p>&copy; {new Date().getFullYear()} GameGuide. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
