export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  screenshots: string[];
  releaseDate: Date;
  platforms: string[];
  genres: string[];
  developer: string;
  publisher: string;
  metacriticScore?: number;
  rawgId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  gameId: string;
  gameSlug: string;
  gameTitle: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  timeToComplete: number; // in minutes
  sections: GuideSection[];
  tags: string[];
  metaDescription: string;
  metaKeywords: string[];
  author: string;
  published: boolean;
  publishedAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
  readingTime: number;
}

export interface GuideSection {
  id: string;
  title: string;
  content: string;
  order: number;
  images?: string[];
  videos?: string[];
  tips?: string[];
  warnings?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  gameCount: number;
  guideCount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'editor' | 'admin';
  bookmarks: string[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  guideId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  parentId?: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchResult {
  type: 'game' | 'guide';
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  slug: string;
  relevance: number;
}

export interface AdUnit {
  id: string;
  name: string;
  type: 'banner' | 'native' | 'video' | 'sidebar';
  position: string;
  size: string;
  provider: 'adsense' | 'mediavine' | 'custom';
  enabled: boolean;
  priority: number;
}

export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultImage: string;
  twitterHandle: string;
  facebookAppId?: string;
}