import Link from 'next/link';
import { Metadata } from 'next';
import { ReplySection } from '@/components/forum/ReplySection';
import { getDictionary, getLangFromParams } from '@/i18n';

const allPosts: Record<string, { id: string; title: string; content: string; author: string; category: string; createdAt: string; replies: Array<{ id: string; postId: string; content: string; author: string; createdAt: string }> }> = {
  'post-1': {
    id: 'post-1',
    title: 'What game are you most excited for in 2026?',
    content: 'So many great games announced for this year! Personally, I am most hyped for the new Monster Hunter expansion and the upcoming Zelda title on Switch 2. What about you all? Share your most anticipated games and why!',
    author: 'ShadowHunter',
    category: 'general',
    createdAt: '2026-05-26T08:00:00Z',
    replies: Array.from({ length: 23 }, (_, i) => ({
      id: `reply-1-${i}`,
      postId: 'post-1',
      content: `Reply #${i + 1}: ${['Cant wait for GTA VI!', 'Elden Ring Nightreign looks amazing', 'New Monster Hunter for me', 'Hollow Knight Silksong (if it ever releases)', 'Looking forward to Fable reboot', 'Avowed has me really excited', 'Starfield DLC for sure', 'Whatever FromSoft is cooking next', 'The new Doom game looks intense', 'Metroid Prime 4 finally!', 'Indiana Jones was great, want more', 'Dragon Age Dreadwolf hopefully', 'Civilization VII all the way', 'FF7 Rebirth part 3 please', 'Death Stranding 2 looks wild', 'New Resident Evil announcement?', 'Persona 6 would be amazing', 'Ghost of Tsushima sequel', 'Wolverine from Insomniac', 'Kingdom Hearts 4 whenever', 'Splinter Cell remake', 'Perfect Dark reboot', 'Fable! Fable! Fable!'][i]}`,
      author: ['GamerFan2026', 'RPGMaster', 'HunterX', 'SilkSongWaiter', 'FantasyFan', 'ObsidianStan', 'SpaceCowboy', 'SoulsVeteran', 'DoomSlayer99', 'MetroidHunter', 'JonesFan', 'DragonAge4Evr', 'CivPro', 'FinalFantasy7', 'KojimaFan', 'HorrorGamer', 'PersonaFan', 'SamuraiGhost', 'MarvelFan', 'KeybladeMaster', 'StealthGamer', 'Agent47', 'FableEnjoyer'][i],
      createdAt: new Date(2026, 4, 26, 8, i + 1).toISOString(),
    })),
  },
  'post-2': {
    id: 'post-2', title: 'E3 2026 rumors and predictions thread', content: "Let's discuss what we might see at E3 this year.", author: 'MageQueen', category: 'general', createdAt: '2026-05-25T16:30:00Z',
    replies: [
      { id: 'reply-2-1', postId: 'post-2', content: 'I think we will finally see Elder Scrolls 6 gameplay!', author: 'TankMaster', createdAt: '2026-05-25T17:00:00Z' },
      { id: 'reply-2-2', postId: 'post-2', content: 'Hoping for Bloodborne 2 announcement.', author: 'StealthNinja', createdAt: '2026-05-25T18:15:00Z' },
    ],
  },
  'post-3': {
    id: 'post-3', title: 'Stuck on Malenia - need build advice', content: 'I have tried 50+ times and cannot beat her. Using a strength build with Greatsword. Any tips?', author: 'Struggler99', category: 'help', createdAt: '2026-05-26T06:00:00Z',
    replies: [
      { id: 'reply-3-1', postId: 'post-3', content: 'Try using bleed weapons like Rivers of Blood. Much easier!', author: 'ProGamer42', createdAt: '2026-05-26T06:30:00Z' },
      { id: 'reply-3-2', postId: 'post-3', content: 'Summon mimic tear and use frost pots for Waterfowl Dance.', author: 'TacticianX', createdAt: '2026-05-26T07:00:00Z' },
      { id: 'reply-3-3', postId: 'post-3', content: 'Level vigor to 60 and equip Dragoncrest Greatshield talisman.', author: 'HelperBot', createdAt: '2026-05-26T07:30:00Z' },
    ],
  },
  'post-4': {
    id: 'post-4', title: 'BG3 Honour Mode - Act 2 boss tips?', content: 'About to fight Ketheric Thorm. Any strategies?', author: 'RoguePlayer', category: 'help', createdAt: '2026-05-25T20:00:00Z', replies: [],
  },
  'post-5': {
    id: 'post-5', title: 'My Elden Ring bleed build (RL150)', content: 'Dual Scavenger Curved Swords with Seppuku, White Mask, Lord of Blood\'s Exultation. Melts bosses!', author: 'BleedKing', category: 'builds', createdAt: '2026-05-26T10:00:00Z',
    replies: [
      { id: 'reply-5-1', postId: 'post-5', content: 'Nice build! Have you tried adding Rotten Winged Sword Insignia?', author: 'BuildCrafter', createdAt: '2026-05-26T10:30:00Z' },
    ],
  },
  'post-6': {
    id: 'post-6', title: 'Show your gaming setup!', content: 'Post pictures of your gaming battlestations.', author: 'TechGamer', category: 'offtopic', createdAt: '2026-05-24T12:00:00Z',
    replies: [
      { id: 'reply-6-1', postId: 'post-6', content: 'Just got a new mechanical keyboard, loving it!', author: 'KeyWarrior', createdAt: '2026-05-24T13:00:00Z' },
      { id: 'reply-6-2', postId: 'post-6', content: 'My setup is a mess but it works.', author: 'CasualPlayer', createdAt: '2026-05-24T14:00:00Z' },
    ],
  },
};

const validCategories = ['general', 'help', 'builds', 'offtopic'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; category: string; postId: string }>;
}): Promise<Metadata> {
  const { lang, category, postId } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  const post = allPosts[postId];
  const catName = (validCategories.includes(category) ? dict.forum?.[category] : null) || category;
  return {
    title: post ? `${post.title} - GameGuide Pro Forum` : 'Post Not Found',
    description: post?.content?.slice(0, 160),
  };
}

function formatDate(dateString: string, lang: string): string {
  return new Date(dateString).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: string; category: string; postId: string }>;
}) {
  const { lang, category, postId } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  const post = allPosts[postId];

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-white">{dict.common.notFound || 'Post Not Found'}</h1>
        <Link href={`/${lang}/forum`} className="mt-4 inline-block text-purple-400 hover:text-purple-300">
          ← {dict.forum?.backToForum || 'Back to Forum'}
        </Link>
      </div>
    );
  }

  const catName = (validCategories.includes(category) ? dict.forum?.[category] : null) || category;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href={`/${lang}`} className="hover:text-gray-300">{dict.common.home}</Link>
        <span>/</span>
        <Link href={`/${lang}/forum`} className="hover:text-gray-300">{dict.nav.forum}</Link>
        <span>/</span>
        <Link href={`/${lang}/forum/${category}`} className="hover:text-gray-300">{catName}</Link>
        <span>/</span>
        <span className="text-gray-400 line-clamp-1">{post.title}</span>
      </div>

      {/* Post Content */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{post.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="font-medium text-purple-400">{post.author}</span>
              <span>·</span>
              <span>{formatDate(post.createdAt, lang)}</span>
            </div>
          </div>
          <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
            {catName}
          </span>
        </div>

        <div className="mt-4 border-t border-gray-800 pt-4">
          <p className="whitespace-pre-line leading-relaxed text-gray-300">{post.content}</p>
        </div>
      </div>

      {/* Replies */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-white">
          {dict.forum?.replies || 'Replies'} ({post.replies.length})
        </h2>

        {post.replies.length > 0 ? (
          <div className="space-y-3">
            {post.replies.map((reply) => (
              <div key={reply.id} className="rounded-lg border border-gray-800 bg-gray-900 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-600 to-blue-600" />
                  <span className="text-sm font-medium text-purple-400">{reply.author}</span>
                  <span className="text-xs text-gray-600">{formatDate(reply.createdAt, lang)}</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-300">{reply.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
            <p className="text-gray-500">{dict.forum?.noReplies || 'No replies yet. Be the first to respond!'}</p>
          </div>
        )}
      </div>

      {/* Reply Form */}
      <div className="mt-6">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
          <h3 className="mb-3 text-sm font-medium text-gray-300">{dict.forum?.leaveReply || 'Leave a Reply'}</h3>
          <ReplySection postId={postId} category={category} />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <Link
          href={`/${lang}/forum/${category}`}
          className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {dict.forum?.backTo || 'Back to'} {catName}
        </Link>
        <Link
          href={`/${lang}/forum`}
          className="text-sm text-purple-400 transition-colors hover:text-purple-300"
        >
          {dict.forum?.allCategories || 'All Categories'} →
        </Link>
      </div>
    </div>
  );
}

// Updated: 2026-05-26 - Phase 3