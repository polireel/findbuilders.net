# FindBuilders.net

Construction lead generation platform connecting homeowners with qualified contractors.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Drizzle ORM + PostgreSQL
- React Query

## Getting Started

```bash
npm install
cp .env.example .env.local
# Edit .env.local and add your DATABASE_URL
npm run dev
```

App runs at http://localhost:3000

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import that repo
3. Framework will be auto-detected as **Next.js**
4. Add environment variable: `DATABASE_URL` = your PostgreSQL connection string
5. Click **Deploy**

## Database Setup

The app uses PostgreSQL with Drizzle ORM. To push the schema to your database:

```bash
npm install -g drizzle-kit
drizzle-kit push
```

## API Routes

- `GET /api/leads` — List leads (with filters)
- `GET /api/leads/[id]` — Single lead
- `POST /api/leads/[id]/contact` — Unlock contact info
- `GET /api/categories` — Construction categories
- `GET /api/stats` — Platform statistics
