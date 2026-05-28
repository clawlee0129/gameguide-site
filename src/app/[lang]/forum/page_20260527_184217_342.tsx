import { getDictionary } from "@/i18n";
import { getLangFromParams } from "@/i18n";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  
  return {
    title: dict.metadata.forumTitle,
    description: dict.metadata.forumDescription,
  };
}

function formatTimeAgo(date: Date, dict: any): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 5) return dict.forum?.justNow || "just now";
  if (diffMin < 60) return `${diffMin} ${dict.forum?.minutes || "m"} ${dict.forum?.ago || "ago"}`;
  if (diffHour < 24) return `${diffHour} ${dict.forum?.hours || "h"} ${dict.forum?.ago || "ago"}`;
  if (diffDay < 7) return `${diffDay} ${dict.forum?.days || "d"} ${dict.forum?.ago || "ago"}`;
  return date.toLocaleDateString();
}

const demoTopic = {
  id: 1,
  title: "Elden Ring: Best Strength Build for Patch 1.12",
  author: "TarnishedGuide",
  category: "Builds & Theorycrafting",
  replies: 42,
  views: 3200,
  lastActivity: new Date(Date.now() - 1000 * 60 * 35), // 35 min ago
  pinned: true,
};

const recentActivity = [
  {
    id: 1,
    username: "EldenLord99",
    action: "replied to",
    topic: "Malenia no-hit strategy discussion",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: 2,
    username: "BossHunter",
    action: "created a new topic",
    topic: "Shadow of the Erdtree: Final Boss Guide",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 3,
    username: "PaladinPro",
    action: "replied to",
    topic: "Faith/Strength hybrid build questions",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: 4,
    username: "ArcaneMage",
    action: "liked",
    topic: "River of Blood vs Moonveil comparison",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
];

const forumCategories = [
  {
    name: "General Discussion",
    description: "Chat about anything game-related",
    topics: 1847,
    posts: 52100,
    color: "border-blue-500/50",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
  },
  {
    name: "Builds & Theorycrafting",
    description: "Share and discuss optimal builds",
    topics: 934,
    posts: 28300,
    color: "border-purple-500/50",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-400",
  },
  {
    name: "Boss Strategies",
    description: "Overcome the toughest bosses together",
    topics: 562,
    posts: 15400,
    color: "border-red-500/50",
    bgColor: "bg-red-500/10",
    textColor: "text-red-400",
  },
  {
    name: "Lore & Story",
    description: "Deep dive into game narratives",
    topics: 428,
    posts: 11200,
    color: "border-amber-500/50",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-400",
  },
  {
    name: "Tips & Tricks",
    description: "Share helpful gameplay tips",
    topics: 721,
    posts: 19800,
    color: "border-emerald-500/50",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-400",
  },
  {
    name: "Off-Topic",
    description: "Everything else",
    topics: 389,
    posts: 9200,
    color: "border-gray-500/50",
    bgColor: "bg-gray-500/10",
    textColor: "text-gray-400",
  },
];

export default async function ForumPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <a href="/" className="hover:text-gray-300">
          {dict.common.home}
        </a>
        <span>/</span>
        <span className="text-gray-400">{dict.forum.communityForum}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          {dict.forum.communityForum}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-gray-400">
          {dict.forum.joinDiscussion}
        </p>
      </div>

      {/* Stats Banner */}
      <div className="mb-8 grid grid-cols-3 gap-4 rounded-xl border border-gray-800 bg-gray-900 p-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">48.3k</div>
          <div className="mt-1 text-xs text-gray-500">{dict.forum.totalPosts}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-400">892</div>
          <div className="mt-1 text-xs text-gray-500">{dict.forum.activeToday}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">127</div>
          <div className="mt-1 text-xs text-gray-500">{dict.forum.onlineNow}</div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Categories - takes 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Categories Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{dict.forum.forumCategories}</h2>
            <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors">
              {dict.forum.newTopic}
            </button>
          </div>

          {/* Category Cards */}
          <div className="space-y-3">
            {forumCategories.map((cat) => (
              <div
                key={cat.name}
                className={`rounded-xl border ${cat.color} bg-gray-900 p-4 transition-colors hover:border-gray-500`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium ${cat.textColor}`}>{cat.name}</h3>
                    <p className="mt-1 text-xs text-gray-500">{cat.description}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{cat.topics.toLocaleString()} {dict.forum.totalPosts.toLowerCase()}</span>
                    <span>{cat.posts.toLocaleString()} posts</span>
                    <span className="text-gray-400">{dict.forum.lastActivity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pinned Topic */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">{dict.forum.recentActivity}</h2>
            </div>
            <div className="rounded-xl border border-purple-500/30 bg-gray-900 p-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded bg-purple-600/20 px-1.5 py-0.5 text-purple-400">PINNED</span>
                <span className="text-gray-500">{demoTopic.category}</span>
              </div>
              <h3 className="mt-2 text-lg font-medium text-white">{demoTopic.title}</h3>
              <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                <span>{demoTopic.author}</span>
                <span>{demoTopic.replies} replies</span>
                <span>{demoTopic.views.toLocaleString()} views</span>
                <span>{formatTimeAgo(demoTopic.lastActivity, dict)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Sidebar - takes 1/3 */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
            <h3 className="mb-3 text-sm font-medium text-white">{dict.forum.recentActivity}</h3>
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                  <p className="text-xs text-gray-300">
                    <span className="font-medium text-purple-400">{item.username}</span>{" "}
                    <span className="text-gray-500">{item.action}</span>{" "}
                    <span className="text-white">{item.topic}</span>
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    {formatTimeAgo(item.timestamp, dict)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Forum Rules */}
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
            <h3 className="mb-3 text-sm font-medium text-white">{dict.forum.forumRules}</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>• {dict.forum.beRespectful}</li>
              <li>• {dict.forum.noSpoilers}</li>
              <li>• {dict.forum.keepOnTopic}</li>
              <li>• {dict.forum.noPiracy}</li>
              <li>• {dict.forum.haveFun}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}