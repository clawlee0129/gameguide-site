import { Metadata } from 'next';
import Link from 'next/link';
import { GameCard } from '@/components/game/GameCard';

export const metadata: Metadata = {
  title: 'All Games',
  description:
    'Browse our complete collection of game guides and walkthroughs. Find strategies for the most popular PC, console, and indie games.',
};

const allGames = [
  {
    slug: 'elden-ring',
    title: 'Elden Ring',
    description: 'Complete walkthrough, boss guides, and build recommendations.',
    coverImage: '/images/games/elden-ring.jpg',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    genres: ['Action RPG', 'Soulslike'],
    metacriticScore: 96,
    guideCount: 47,
  },
  {
    slug: 'baldurs-gate-3',
    title: "Baldur's Gate 3",
    description: 'Quest guides, companion walkthroughs, and class builds.',
    coverImage: '/images/games/baldurs-gate-3.jpg',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    genres: ['RPG', 'Strategy'],
    metacriticScore: 96,
    guideCount: 38,
  },
  {
    slug: 'hollow-knight',
    title: 'Hollow Knight',
    description: 'Map guides, boss strategies, and charm combinations.',
    coverImage: '/images/games/hollow-knight.jpg',
    platforms: ['PC', 'Switch', 'PS4'],
    genres: ['Metroidvania', 'Indie'],
    metacriticScore: 87,
    guideCount: 25,
  },
  {
    slug: 'starfield',
    title: 'Starfield',
    description: 'Faction quests, ship building, and exploration guides.',
    coverImage: '/images/games/starfield.jpg',
    platforms: ['PC', 'Xbox Series X'],
    genres: ['RPG', 'Open World'],
    metacriticScore: 83,
    guideCount: 32,
  },
  {
    slug: 'valorant',
    title: 'Valorant',
    description: 'Agent guides, map strategies, and aim training routines.',
    coverImage: '/images/games/valorant.jpg',
    platforms: ['PC'],
    genres: ['FPS', 'Tactical Shooter'],
    metacriticScore: 80,
    guideCount: 19,
  },
  {
    slug: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
    description: 'Complete walkthrough, build guides, and Phantom Liberty DLC.',
    coverImage: '/images/games/cyberpunk.jpg',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    genres: ['RPG', 'Open World'],
    metacriticScore: 86,
    guideCount: 28,
  },
  {
    slug: 'terraria',
    title: 'Terraria',
    description: 'Boss progression guide, crafting recipes, and class setups.',
    coverImage: '/images/games/terraria.jpg',
    platforms: ['PC', 'Switch', 'Mobile'],
    genres: ['Sandbox', 'Adventure'],
    metacriticScore: 83,
    guideCount: 22,
  },
  {
    slug: 'monster-hunter-wilds',
    title: 'Monster Hunter Wilds',
    description: 'Monster guides, weapon tutorials, and hunting strategies.',
    coverImage: '/images/games/mhw.jpg',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    genres: ['Action RPG', 'Hunting'],
    metacriticScore: 90,
    guideCount: 15,
  },
];

export default function GamesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">All Games</h1>
        <p className="mt-2 text-gray-400">
          Browse our collection of in-depth game guides and walkthroughs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {allGames.map((game) => (
          <GameCard key={game.slug} {...game} />
        ))}
      </div>

      {/* Coming Soon Banner */}
      <div className="mt-12 rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 text-center">
        <p className="text-sm text-purple-300">
          More games are being added daily. Don&apos;t see your game?{' '}
          <Link href="/contact" className="underline">
            Request it here.
          </Link>
        </p>
      </div>
    </div>
  );
}