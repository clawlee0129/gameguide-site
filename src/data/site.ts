import { SEOConfig } from '@/types';

export const seoConfig: SEOConfig = {
  siteName: 'GameGuide Pro',
  siteUrl: 'https://gameguidepro.com',
  titleTemplate: '%s | GameGuide Pro - Expert Game Walkthroughs & Guides',
  defaultDescription:
    'Expert game walkthroughs, boss guides, and strategy tips for PC, PlayStation, Xbox, and Nintendo Switch. Master every game with our in-depth guides.',
  defaultImage: '/images/og-default.jpg',
  twitterHandle: '@gameguidepro',
};

export const siteNav = [
  { label: 'Games', href: '/games' },
  { label: 'Guides', href: '/guides' },
  { label: 'Categories', href: '/categories' },
  { label: 'Search', href: '/search' },
];

export const categories = [
  { slug: 'action-adventure', name: 'Action Adventure', icon: '🗡️' },
  { slug: 'rpg', name: 'RPG', icon: '⚔️' },
  { slug: 'fps', name: 'FPS', icon: '🎯' },
  { slug: 'strategy', name: 'Strategy', icon: '♟️' },
  { slug: 'soulslike', name: 'Soulslike', icon: '💀' },
  { slug: 'open-world', name: 'Open World', icon: '🌍' },
  { slug: 'indie', name: 'Indie', icon: '🎮' },
  { slug: 'multiplayer', name: 'Multiplayer', icon: '👥' },
  { slug: 'horror', name: 'Horror', icon: '👻' },
  { slug: 'simulation', name: 'Simulation', icon: '🏗️' },
];

export const adUnits = [
  {
    id: 'header-banner',
    name: 'Header Banner',
    type: 'banner' as const,
    position: 'below-nav',
    size: '728x90',
    provider: 'adsense' as const,
    enabled: false,
    priority: 1,
  },
  {
    id: 'content-native-1',
    name: 'Content Native 1',
    type: 'native' as const,
    position: 'after-section-2',
    size: 'fluid',
    provider: 'adsense' as const,
    enabled: false,
    priority: 2,
  },
  {
    id: 'sidebar-sticky',
    name: 'Sidebar Sticky',
    type: 'sidebar' as const,
    position: 'sidebar-bottom',
    size: '300x600',
    provider: 'adsense' as const,
    enabled: false,
    priority: 3,
  },
  {
    id: 'footer-banner',
    name: 'Footer Banner',
    type: 'banner' as const,
    position: 'above-footer',
    size: '728x90',
    provider: 'adsense' as const,
    enabled: false,
    priority: 4,
  },
];
