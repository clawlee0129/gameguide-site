# GameGuide Pro

Expert game walkthroughs, boss guides, and strategy tips for PC, PlayStation, Xbox, and Nintendo Switch. Master every game with our in-depth guides.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB (via Mongoose)
- **Auth**: Custom JWT-based authentication
- **i18n**: Multi-language support
- **SEO**: next-seo, next-sitemap

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/            # Next.js App Router pages
├── components/     # React components
│   ├── ads/        # Ad integration
│   ├── auth/       # Authentication
│   ├── build/      # Game build guides
│   ├── forum/      # Community forum
│   ├── game/       # Game cards & displays
│   ├── guide/      # Guide content
│   ├── layout/     # Header, Footer, Layout
│   ├── map/        # Game maps
│   └── review/     # Game reviews
├── contexts/       # React contexts (Auth, etc.)
├── data/           # Static data & configs
├── i18n/           # Internationalization
├── middleware.ts   # Middleware (i18n routing, auth)
└── types/          # TypeScript type definitions
```

## License

All rights reserved.
