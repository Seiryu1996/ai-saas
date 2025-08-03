# AI SaaS

A modern SaaS platform powered by Next.js, Prisma, and Docker.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Docker Commands](#docker-commands)
- [Ngrok (Local Tunneling)](#ngrok-local-tunneling)
- [Prisma](#prisma)
- [Deployment](#deployment)
- [UI Design](#ui-design)
- [Notes](#notes)

---

## Getting Started

1. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

2. **Set up environment variables**

    Copy `.env.example` to `.env` and fill in the required values (database, Clerk, etc.).

3. **Run database migrations**

    ```bash
    npx prisma migrate dev --name init
    ```

4. **Start the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

---

## Docker Commands

- **Build and start containers**

    ```bash
    docker compose build --no-cache
    docker compose up -d
    ```

- **Stop containers**

    ```bash
    docker compose down
    ```

---

## Ngrok (Local Tunneling)

- **Setup**

    ```bash
    npx ngrok config add-authtoken <your-token-key>
    ```

- **Start tunnel**

    ```bash
    npx ngrok http 3000
    ```

---

## Prisma

- **Run migrations**

    ```bash
    npx prisma migrate dev --name init
    ```

- **Open Prisma Studio**

    ```bash
    npx prisma studio
    ```

---

## Deployment

- Recommended: [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/)
- See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## UI Design

- Uses [shadcn/ui](https://ui.shadcn.com/docs/installation/next)

    ```bash
    npx shadcn@latest add --all
    ```

---

## Notes

- Make sure to configure your `.env` file before starting the app.
- For database connection, ensure SSL is enabled if using TiDB Cloud or similar services.

---

Feel free to contribute or open issues!