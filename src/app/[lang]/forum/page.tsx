import { getDictionary, getLangFromParams } from "@/i18n";
import Link from 'next/link';
import { Metadata } from 'next';
import { AdBanner } from '@/components/ads/AdBanner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  return {
    title: dict.metadata.forumTitle || 'Community Forum - GameGuide',
    description: dict.metadata.forumDescription || 'Join the discussion! Get help, share builds, and connect with other gamers in our community forum.',
  };
}

const forumCategories = [
  {
    id: 'general',
    slug: 'general',
    icon: '💬',
    postCount: 1247,
    lastActivity: '2026-05-25T14:30:00Z',
  },
  {
    id: 'help',
    slug: 'help',
    icon: '❓',
    postCount: 892,
    lastActivity: '2026-05-26T09:15:00Z',
  },
  {
    id: 'builds',
    slug: 'builds',
    icon: '⚙️',
    postCount: 543,
    lastActivity: '2026-05-25T18:45:00Z',
  },
  {
    id: 'offtopic',
    slug: 'offtopic',
    icon: '🎮',
    postCount: 321,
    lastActivity: '2026-05-24T22:10:00Z',
  },
];

function formatTimeAgo(dateString: string, lang: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (lang === 'zh') {
    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  }
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default async function ForumPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">{dict.forum?.title || 'Community Forum'}</h1>
        <p className="mt-2 text-gray-400">
          {dict.forum?.description || 'Join thousands of gamers discussing strategies, sharing builds, and helping each other.'}
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
          <div className="text-2xl font-bold text-white">3,003</div>
          <div className="text-sm text-gray-400">{dict.forum?.totalPosts || 'Total Posts'}</div>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
          <div className="text-2xl font-bold text-white">892</div>
          <div className="text-sm text-gray-400">{dict.forum?.activeToday || 'Active Today'}</div>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
          <div className="text-2xl font-bold text-white">124</div>
          <div className="text-sm text-gray-400">{dict.forum?.onlineNow || 'Online Now'}</div>
        </div>
      </div>

      {/* Ad Banner before categories */}
      <div className="mb-6 flex justify-center">
        <AdBanner size="banner" slot="forum-top" />
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{dict.forum?.categories || 'Forum Categories'}</h2>
          <Link
            href={`/${lang}/forum/new`}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
          >
            {dict.forum?.newTopic || 'New Topic'}
          </Link>
        </div>

        {forumCategories.map((category) => (
          <Link
            key={category.id}
            href={`/${lang}/forum/${category.slug}`}
            className="block transition-all hover:scale-[1.01]"
          >
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 transition-all hover:border-purple-500/30">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-900/50 to-gray-800 text-2xl">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{dict.forum?.[category.id] || category.id}</h3>
                    <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300">
                      {category.postCount} {dict.forum?.posts || 'posts'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">{dict.forum?.[category.id + 'Desc'] || ''}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                    <span>{dict.forum?.lastActivity || 'Last activity'}: {formatTimeAgo(category.lastActivity, lang)}</span>
                  </div>
                </div>
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <h2 className="mb-4 text-xl font-bold text-white">{dict.forum?.recentActivity || 'Recent Activity'}</h2>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
          <div className="space-y-3">
            {[
              { user: 'ShadowHunter', action: 'replied to', actionZh: '回复了', topic: 'Elden Ring DLC speculation', topicZh: '艾尔登法环DLC猜测', time: '2m ago', timeZh: '2分钟前' },
              { user: 'MageQueen', action: 'started a new topic', actionZh: '发起了新话题', topic: 'Best BG3 mods for Honour Mode', topicZh: 'Honour模式最佳博德之门3模组', time: '15m ago', timeZh: '15分钟前' },
              { user: 'TankMaster', action: 'liked', actionZh: '点赞了', topic: 'Hollow Knight speedrun tips', topicZh: '空洞骑士速通技巧', time: '1h ago', timeZh: '1小时前' },
              { user: 'StealthNinja', action: 'replied to', actionZh: '回复了', topic: 'Cyberpunk 2.1 build discussion', topicZh: '赛博朋克2.1配装讨论', time: '3h ago', timeZh: '3小时前' },
              { user: 'LootGoblin', action: 'started a new topic', actionZh: '发起了新话题', topic: 'Starfield ship building contest', topicZh: '星空飞船建造比赛', time: '5h ago', timeZh: '5小时前' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 border-b border-gray-800 pb-3 last:border-0">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-white">{activity.user}</span> {lang === 'zh' ? activity.actionZh : activity.action}{' '}
                    <span className="text-purple-400">{lang === 'zh' ? activity.topicZh : activity.topic}</span>
                  </p>
                </div>
                <span className="text-xs text-gray-500">{lang === 'zh' ? activity.timeZh : activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forum Rules */}
      <div className="mt-12 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-purple-900/20 p-6">
        <h3 className="mb-3 text-lg font-bold text-white">{dict.forum?.rules || 'Forum Rules'}</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-purple-400">✓</span>
            <span>{dict.forum?.rule1 || 'Be respectful to other members. No harassment, hate speech, or personal attacks.'}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-purple-400">✓</span>
            <span>{dict.forum?.rule2 || 'No spoilers without warning. Use spoiler tags for story content.'}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-purple-400">✓</span>
            <span>{dict.forum?.rule3 || 'Keep discussions on-topic. Use the appropriate category for your posts.'}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-purple-400">✓</span>
            <span>{dict.forum?.rule4 || 'No piracy discussion or links to illegal content.'}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-purple-400">✓</span>
            <span>{dict.forum?.rule5 || 'Have fun and help build a positive gaming community!'}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Updated: 2026-05-26 - Phase 3
// Updated: 2026-05-26 - Phase 3 i18n