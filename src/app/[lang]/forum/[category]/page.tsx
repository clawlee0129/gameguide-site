import Link from 'next/link';
import { Metadata } from 'next';
import { PostFormWrapper } from '@/components/forum/PostFormWrapper';
import { AdBanner } from '@/components/ads/AdBanner';
import { getDictionary, getLangFromParams } from '@/i18n';

const validCategories = ['general', 'help', 'builds', 'offtopic'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}): Promise<Metadata> {
  const { lang, category } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  const isValid = validCategories.includes(category);
  const name = isValid ? (dict.forum?.[category] || category) : category;
  return {
    title: isValid ? `${name} - GameGuide Forum` : 'Forum Category - GameGuide',
    description: isValid ? (dict.forum?.[category + 'Desc'] || '') : '',
  };
}

const basePosts = {
  general: [
    {
      id: 'post-1',
      title: 'What game are you most excited for in 2026?',
      content: 'So many great games announced for this year! What are you looking forward to the most?',
      author: 'ShadowHunter',
      category: 'general',
      createdAt: '2026-05-26T08:00:00Z',
      replies: Array.from({ length: 23 }, (_, i) => ({
        id: `reply-1-${i}`,
        postId: 'post-1',
        content: `Excited for the new Zelda game too! Can't wait.`,
        author: `Player${i + 1}`,
        createdAt: new Date(2026, 4, 26, 8, i + 1).toISOString(),
      })),
    },
    {
      id: 'post-2',
      title: 'E3 2026 rumors and predictions thread',
      content: 'Let\'s discuss what we might see at E3 this year. Share your predictions!',
      author: 'MageQueen',
      category: 'general',
      createdAt: '2026-05-25T16:30:00Z',
      replies: [
        { id: 'reply-2-1', postId: 'post-2', content: 'I think we will finally see Elder Scrolls 6 gameplay!', author: 'TankMaster', createdAt: '2026-05-25T17:00:00Z' },
        { id: 'reply-2-2', postId: 'post-2', content: 'Hoping for Bloodborne 2 announcement.', author: 'StealthNinja', createdAt: '2026-05-25T18:15:00Z' },
      ],
    },
  ],
  help: [
    {
      id: 'post-3',
      title: 'Stuck on Malenia - need build advice',
      content: 'I have tried 50+ times and cannot beat her. Using a strength build with Greatsword. Any tips?',
      author: 'Struggler99',
      category: 'help',
      createdAt: '2026-05-26T06:00:00Z',
      replies: [
        { id: 'reply-3-1', postId: 'post-3', content: 'Try using bleed weapons like Rivers of Blood. Much easier!', author: 'ProGamer42', createdAt: '2026-05-26T06:30:00Z' },
        { id: 'reply-3-2', postId: 'post-3', content: 'Summon mimic tear and use frost pots for Waterfowl Dance.', author: 'TacticianX', createdAt: '2026-05-26T07:00:00Z' },
        { id: 'reply-3-3', postId: 'post-3', content: 'Level vigor to 60 and equip Dragoncrest Greatshield talisman.', author: 'HelperBot', createdAt: '2026-05-26T07:30:00Z' },
      ],
    },
    {
      id: 'post-4',
      title: 'BG3 Honour Mode - Act 2 boss tips?',
      content: 'About to fight Ketheric Thorm in Honour Mode. Any strategies to avoid party wipe?',
      author: 'RoguePlayer',
      category: 'help',
      createdAt: '2026-05-25T20:00:00Z',
      replies: [],
    },
  ],
  builds: [
    {
      id: 'post-5',
      title: 'My Elden Ring bleed build (RL150)',
      content: 'Dual Scavenger Curved Swords with Seppuku, White Mask, Lord of Blood\'s Exultation. Melts bosses!',
      author: 'BleedKing',
      category: 'builds',
      createdAt: '2026-05-26T10:00:00Z',
      replies: [
        { id: 'reply-5-1', postId: 'post-5', content: 'Nice build! Have you tried adding Rotten Winged Sword Insignia?', author: 'BuildCrafter', createdAt: '2026-05-26T10:30:00Z' },
      ],
    },
  ],
  offtopic: [
    {
      id: 'post-6',
      title: 'Show your gaming setup!',
      content: 'Post pictures of your gaming battlestations. I just upgraded to a 4K OLED monitor!',
      author: 'TechGamer',
      category: 'offtopic',
      createdAt: '2026-05-24T12:00:00Z',
      replies: [
        { id: 'reply-6-1', postId: 'post-6', content: 'Just got a new mechanical keyboard, loving it!', author: 'KeyWarrior', createdAt: '2026-05-24T13:00:00Z' },
        { id: 'reply-6-2', postId: 'post-6', content: 'My setup is a mess but it works. 😂', author: 'CasualPlayer', createdAt: '2026-05-24T14:00:00Z' },
      ],
    },
  ],
};

function getInitialPosts(category: keyof typeof basePosts) {
  return basePosts[category] || [];
}

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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}) {
  const { lang, category } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));

  if (!validCategories.includes(category)) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-white">{dict.common.notFound || 'Category Not Found'}</h1>
        <Link href={`/${lang}/forum`} className="mt-4 inline-block text-purple-400 hover:text-purple-300">
          ← {dict.forum?.backToForum || 'Back to Forum'}
        </Link>
      </div>
    );
  }

  const posts = getInitialPosts(category as keyof typeof basePosts);

  // Pagination: 10 per page
  const currentPage = 1;
  const postsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const paginatedPosts = posts.slice(0, postsPerPage);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href={`/${lang}`} className="hover:text-gray-300">{dict.common.home}</Link>
        <span>/</span>
        <Link href={`/${lang}/forum`} className="hover:text-gray-300">{dict.nav.forum}</Link>
        <span>/</span>
        <span className="text-gray-400">{dict.forum?.[category] || category}</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{dict.forum?.[category] || category}</h1>
          <p className="mt-1 text-sm text-gray-400">{dict.forum?.[category + 'Desc'] || ''}</p>
        </div>
        <PostFormWrapper category={category} />
      </div>

      {/* Ad Banner before post list */}
      <div className="mb-6 flex justify-center">
        <AdBanner size="banner" slot="forum-category" />
      </div>

      {/* Post List */}
      <div className="space-y-2">
        {/* Table Header */}
        <div className="hidden rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 md:grid md:grid-cols-12">
          <div className="col-span-6 text-xs font-medium uppercase text-gray-500">{dict.forum?.topic || 'Topic'}</div>
          <div className="col-span-2 text-center text-xs font-medium uppercase text-gray-500">{dict.forum?.replies || 'Replies'}</div>
          <div className="col-span-2 text-center text-xs font-medium uppercase text-gray-500">{dict.forum?.author || 'Author'}</div>
          <div className="col-span-2 text-right text-xs font-medium uppercase text-gray-500">{dict.forum?.lastActivity || 'Last Activity'}</div>
        </div>

        {paginatedPosts.map((post: any) => (
          <Link
            key={post.id}
            href={`/${lang}/forum/${category}/${post.id}`}
            className="block transition-all hover:scale-[1.005]"
          >
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 transition-all hover:border-purple-500/30 md:grid md:grid-cols-12 md:items-center">
              <div className="col-span-6">
                <h3 className="font-medium text-white hover:text-purple-400">{post.title}</h3>
                <p className="mt-1 block text-xs text-gray-400 md:hidden">
                  {dict.forum?.by || 'by'} {post.author} · {post.replies.length} {dict.forum?.replies?.toLowerCase() || 'replies'} · {formatTimeAgo(post.createdAt, lang)}
                </p>
              </div>
              <div className="col-span-2 text-center">
                <span className="hidden text-sm text-gray-400 md:inline">{post.replies.length}</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="hidden text-sm text-gray-400 md:inline">{post.author}</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="hidden text-sm text-gray-500 md:inline">{formatTimeAgo(post.createdAt, lang)}</span>
              </div>
            </div>
          </Link>
        ))}

        {paginatedPosts.length === 0 && (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-12 text-center">
            <p className="text-gray-500">{dict.forum?.noPosts || 'No posts in this category yet. Be the first to start a discussion!'}</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            disabled={currentPage === 1}
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 transition-colors hover:border-gray-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {dict.common.previous || 'Previous'}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-purple-600 text-white'
                  : 'border border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 transition-colors hover:border-gray-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {dict.common.next || 'Next'}
          </button>
        </div>
      )}
    </div>
  );
}

// Updated: 2026-05-26 - Phase 3