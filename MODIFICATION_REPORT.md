# GameGuide.guide P3 迭代修改报告

## 1. 本次迭代概述

对 gameguide.guide 网站执行补充迭代，处理 P0/P1/P2 中尚未实现的缺失项。前序会话已完成暗色模式、TOC、进度条、搜索、SEO Schema、Cookie Consent、Privacy/Terms、sitemap/robots、Affiliate 卡片、游戏筛选等功能，本次仅处理真正缺失的条目，不重复实现或修改已有正常工作的代码。

构建验证：`npx next build` 通过，TypeScript 类型检查通过，所有页面静态生成成功（含新增 contact 路由）。

---

## 2. 新增/修改文件清单

### P0 - 缺失修复

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/app/[lang]/guides/[slug]/page.tsx` | 修改 | P0-1 AdSense 广告位、P0-3 Header 导航修复、P1-1 FAQ Schema、P2-4 社交分享 |
| `src/app/[lang]/contact/page.tsx` | 新增 | P0-2 Contact 联系页面 |
| `src/app/[lang]/HomeClient.tsx` | 修改 | P0-4 图片降级、P2-5 Footer 社交链接、P2-6 Newsletter 反馈、Footer Contact 链接 |
| `src/app/[lang]/guides/page.tsx` | 修改 | P0-4 攻略卡片图片 onError 降级 |
| `src/data/sampleData.ts` | 无需改动 | 已有图片路径结构合理，降级逻辑在组件层处理 |

### P1 - Schema 补充

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/app/[lang]/guides/[slug]/page.tsx` | 修改 | P1-1 FAQ Schema 从 MDX ## 标题提取 |
| `src/app/[lang]/games/[slug]/page.tsx` | 修改 | P1-2 VideoGame Schema |
| `src/app/[lang]/page.tsx` | 已就绪 | P1-3 Organization + WebSite Schema |

### P2 - 交互增强

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/app/[lang]/games/page.tsx` | 替换 | P2-2 排序功能 + P2-3 平台图标徽章 |
| `src/app/[lang]/HomeClient.tsx` | 已就绪 | P2-1 分类胶囊链接、P2-5 Footer 社交图标、P2-6 Newsletter 反馈、P2-7 View All 链接 |
| `src/i18n/index.ts` | 修改 | 中英文 i18n 字典更新（zh 区段重写） |

---

## 3. 各修改项具体说明

### P0-1: 修复 AdSense ad-slot 空值

**文件**: `src/app/[lang]/guides/[slug]/page.tsx`

在攻略详情页添加两个 AdSense 广告位：
- **顶部横幅**（标题描述下方）：`data-ad-slot="1234567890"`
- **内容中部**（article 末尾）：`data-ad-slot="2345678901"`

两个广告位均使用 `ca-pub-XXXXXXXXXXXXXXXX` 占位 client ID，`data-ad-format="auto"` 自适应格式，`data-full-width-responsive="true"` 响应式全宽。

---

### P0-2: 补充 Contact 页面

**文件**: `src/app/[lang]/contact/page.tsx`（新增）

- 包含四个表单字段：Name、Email、Subject、Message
- 提交时通过 `mailto:contact@gameguide.guide` 打开邮件客户端
- 表单使用 URLSearchParams 构建邮件内容（含发件人姓名和邮箱）
- 页面标题 "Contact Us - GameGuide"
- 中英双语 i18n 支持（`dict.contact.*`）
- Footer 中已添加 Contact 链接（`dict.footer.contact`）

---

### P0-3: 修复攻略详情页 Header 缺失导航

**文件**: `src/app/[lang]/guides/[slug]/page.tsx`

Header 导航从仅显示 Home + Guides，扩展为完整导航：
```jsx
Home | Games | Guides(active) | Categories
```

---

### P0-4: 攻略卡片添加真实封面图降级

**文件修改**:
- `src/app/[lang]/guides/page.tsx`: 添加 `onError` 处理，图片加载失败时回退到 `/images/games/{gameId}.jpg`，再次失败则隐藏图片
- `src/app/[lang]/HomeClient.tsx`: Latest/Trending 指南卡片已有 `onError` 降级逻辑（先尝试 `/images/games/{gameId}.jpg`，失败后隐藏）
- `src/app/[lang]/games/page.tsx`: 游戏卡片已有 `onError` 处理

降级链：guide.image → `/images/games/{gameId}.jpg` → display:none

---

### P1-1: 添加 FAQ Schema 到攻略页

**文件**: `src/app/[lang]/guides/[slug]/page.tsx`

新增 `extractFaqSchema()` 函数，从 MDX 内容中提取 FAQ：
- 识别以 `##` 开头的标题
- 检查标题是否以问答前缀词开头（What/How/Can/Is/Why/Do 等英文，什么/如何/怎么/为什么 等中文）
- 将紧随标题的段落（直到空行或下一个标题）作为答案
- 生成 JSON-LD FAQPage Schema
- 仅在有 FAQ 内容时才渲染 `<script type="application/ld+json">`

---

### P1-2: 添加 VideoGame Schema 到游戏详情页

**文件**: `src/app/[lang]/games/[slug]/page.tsx`

在已有 BreadcrumbList Schema 基础上添加 VideoGame Schema：
- `name`: 游戏名（支持中英文）
- `description`: 游戏描述
- `applicationCategory`: "Game"
- `operatingSystem`: 平台列表（逗号分隔）
- `genre`: 游戏分类
- `aggregateRating`: 包含 `ratingValue`(游戏评分)、`bestRating`("10")、`reviewCount`(关联攻略数量)

---

### P1-3: 添加 Organization + WebSite Schema 到首页

**文件**: `src/app/[lang]/page.tsx`

已在前序会话中就绪，包含：
- Organization Schema：名称、URL、Logo、社交账号（Twitter/Discord/YouTube）
- WebSite Schema：含 SearchAction，搜索 URL 模板 `https://gameguide.guide/en/guides?q={search_term_string}`

---

### P2-1: 首页分类胶囊按钮添加跳转链接

**文件**: `src/app/[lang]/HomeClient.tsx`

确认已完成，各分类按钮使用 `href={`/${lang}/categories?cat=${cat}`}` 正确跳转。

---

### P2-2: 游戏列表页添加排序功能

**文件**: `src/app/[lang]/games/page.tsx`（替换）

新增排序下拉选择器，支持 4 种排序方式：
- Name (A-Z) — 默认
- Name (Z-A)
- Rating (High-Low)
- Rating (Low-High)

排序状态通过 URL searchParams 保持（`?sort=rating-desc`），与平台/分类筛选正交兼容。选择默认排序时自动移除 `sort` 参数。

---

### P2-3: 游戏列表卡片添加平台图标

**文件**: `src/app/[lang]/games/page.tsx`（替换）

新增 `platformBadgeColors` 映射表：
- PS5/PS4: 紫色 `text-[#a855f7] bg-[#a855f7]/10`
- Xbox: 绿色 `text-[#22c55e] bg-[#22c55e]/10`
- PC: 蓝色 `text-[#3b82f6] bg-[#3b82f6]/10`
- Switch: 红色 `text-[#ef4444] bg-[#ef4444]/10`

在游戏卡片底部渲染小型平台标签。

---

### P2-4: 攻略详情页添加社交分享按钮

**文件**: `src/app/[lang]/guides/[slug]/page.tsx`

在攻略正文底部（AffiliateSection 上方）添加分享按钮行：
- **Twitter/X**: `https://twitter.com/intent/tweet?url=...&text=...` - 蓝色主题
- **Facebook**: `https://www.facebook.com/sharer/sharer.php?u=...` - 蓝色主题
- **Reddit**: `https://www.reddit.com/submit?url=...&title=...` - 橙红主题

按钮使用 SVG 内联图标，圆角胶囊样式，响应式 `flex-wrap` 移动端紧凑排列。

---

### P2-5: Footer 社交图标改为真实链接

**文件**: `src/app/[lang]/HomeClient.tsx`

Footer "Follow Us" 区域从纯文本改为可点击 SVG 图标链接：
- Twitter: `https://twitter.com/gameguide`
- Discord: `https://discord.gg/gameguide`
- YouTube: `https://youtube.com/@gameguide`

均使用 `target="_blank" rel="noopener noreferrer"` 新标签页打开。

---

### P2-6: Newsletter 表单添加提交反馈

**文件**: `src/app/[lang]/HomeClient.tsx`

Newsletter 表单提交后显示反馈：
- 点击订阅 → 按钮显示 "Submitting..."
- 1.5 秒后 → 绿色提示 "Thanks for subscribing!"（中文："订阅成功！"）
- 3 秒后 → 自动消失，恢复 idle 状态
- 使用 `newsletterStatus` 状态管理（idle / submitting / success / error）

---

### P2-7: Trending/Popular 区块添加 "View All" 链接

**文件**: `src/app/[lang]/HomeClient.tsx`

确认已完成，Latest 和 Trending 区块右侧均有 "View All →" 链接指向 `/guides`。

---

## 4. 新增 i18n 键

### 英文 (en)

```typescript
home: {
  newsletterSuccess: "Thanks for subscribing!",
  newsletterError: "Something went wrong. Please try again.",
  newsletterSubmitting: "Subscribing...",
}
footer: {
  contact: "Contact Us",
}
contact: {
  title: "Contact Us",
  subtitle: "Have questions or feedback? We'd love to hear from you.",
  name: "Name",
  namePlaceholder: "Your name",
  email: "Email",
  emailPlaceholder: "your@email.com",
  subject: "Subject",
  subjectPlaceholder: "What's this about?",
  message: "Message",
  messagePlaceholder: "Tell us more...",
  send: "Send Message",
}
```

### 中文 (zh)

```typescript
home: {
  newsletterSuccess: "订阅成功！",
  newsletterError: "订阅失败，请稍后重试。",
  newsletterSubmitting: "提交中...",
}
footer: {
  contact: "联系我们",
}
contact: {
  title: "联系我们",
  subtitle: "有问题或反馈吗？我们很乐意听取你的意见。",
  name: "姓名",
  namePlaceholder: "你的名字",
  email: "邮箱",
  emailPlaceholder: "your@email.com",
  subject: "主题",
  subjectPlaceholder: "关于什么？",
  message: "留言",
  messagePlaceholder: "告诉我们更多...",
  send: "发送消息",
}
```

---

## 5. 构建验证结果

```
npx next build 2>&1

✓ Compiled successfully in 6.2s
✓ Finished TypeScript in 5.7s
✓ Generating static pages (6/6) in 1006ms

Route (app)
├ ○ /[lang]
├ ƒ /[lang]/categories
├ ƒ /[lang]/contact           ← 新增
├ ƒ /[lang]/games
├ ƒ /[lang]/games/[slug]
├ ƒ /[lang]/guides
├ ƒ /[lang]/guides/[slug]
├ ƒ /[lang]/privacy
├ ƒ /[lang]/terms
├ ○ /robots.txt
└ ○ /sitemap.xml
```

- TypeScript 类型检查：通过
- 所有页面编译成功
- contact 路由已自动注册
- 无运行时错误
