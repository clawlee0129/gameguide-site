'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Language } from '@/i18n';
import { DictionaryStructure } from '@/i18n/dictionaries';

interface HeaderProps {
  lang: Language;
  dict: DictionaryStructure;
}

export function Header({ lang, dict }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/${lang}/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // Navigation items from dictionary with hrefs
  const navItems = [
    { href: `/${lang}/games`, label: dict.nav.games },
    { href: `/${lang}/guides`, label: dict.nav.guides },
    { href: `/${lang}/categories`, label: dict.nav.categories },
    { href: `/${lang}/builds`, label: dict.nav.builds },
    { href: `/${lang}/map`, label: dict.nav.map },
    { href: `/${lang}/forum`, label: dict.nav.forum },
  ];

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white transition-colors hover:text-purple-400"
          >
            <span className="rounded-lg bg-purple-600 px-2 py-1 text-sm font-black text-white">
              GGP
            </span>
            GameGuide
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section: Search + Auth + Language */}
          <div className="hidden items-center gap-3 md:flex">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={dict.nav.search}
                  className="w-36 rounded-lg border border-gray-700 bg-gray-900 py-1.5 pl-9 pr-3 text-sm text-gray-200 placeholder-gray-500 transition-all focus:w-56 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              </div>
            </form>

            <LanguageSwitcher currentLang={lang} />

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-200 transition-colors hover:border-gray-600 hover:bg-gray-750"
                >
                  <UserCircleIcon className="h-5 w-5 text-purple-400" />
                  <span className="max-w-[100px] truncate">{user?.username}</span>
                  <svg className="h-3 w-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-700 bg-gray-800 py-1 shadow-xl">
                    <div className="border-b border-gray-700 px-4 py-2">
                      <p className="text-sm font-medium text-white truncate">{user?.username}</p>
                      <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                    >
                      {dict.nav.signOut}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setAuthModalMode('login'); setAuthModalOpen(true); }}
                  className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-1.5 text-sm font-medium text-gray-200 transition-colors hover:border-gray-600 hover:bg-gray-750"
                >
                  {dict.nav.signIn}
                </button>
                <button
                  onClick={() => { setAuthModalMode('register'); setAuthModalOpen(true); }}
                  className="rounded-lg bg-purple-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
                >
                  {dict.nav.signUp}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-300 hover:bg-gray-800 md:hidden"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-800 bg-gray-900 px-6 py-4 md:hidden">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={dict.nav.search}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-9 pr-3 text-sm text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                />
                <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              </div>
            </form>
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-gray-800" />
              {isAuthenticated ? (
                <>
                  <div className="text-sm text-gray-400">
                    {dict.nav.signedInAs} <span className="text-white">{user?.username}</span>
                  </div>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="text-left text-sm font-medium text-red-400 transition-colors hover:text-red-300"
                  >
                    {dict.nav.signOut}
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => { setAuthModalMode('login'); setAuthModalOpen(true); setMobileMenuOpen(false); }}
                    className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200"
                  >
                    {dict.nav.signIn}
                  </button>
                  <button
                    onClick={() => { setAuthModalMode('register'); setAuthModalOpen(true); setMobileMenuOpen(false); }}
                    className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white"
                  >
                    {dict.nav.signUp}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}

// Updated: 2026-05-26 - Phase 3