# AI SaaS Platform

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Overview

AI SaaS is a modern web application platform that leverages Next.js, Prisma, and MySQL to provide scalable AI-powered services.  
It includes authentication, a dashboard, and various AI tools.

## Features

- Next.js 14 (App Router)
- Prisma ORM with MySQL (TiDB Cloud compatible)
- Authentication (Clerk)
- AI tools (image generation, background removal, etc.)
- Responsive dashboard UI

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in the required values (database, Clerk, etc.).

### 3. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 4. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Development

- Edit pages in `src/app/`
- Edit components in `src/components/`
- Edit Prisma schema in `prisma/schema.prisma`

The app supports hot-reloading for rapid development.

## Deployment

The easiest way to deploy your Next.js app is with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Clerk Documentation](https://clerk.com/docs)
- [TiDB Cloud Documentation](https://docs.pingcap.com/tidbcloud/)

---

Feel free to contribute or open issues!
