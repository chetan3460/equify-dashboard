This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## Folder conventions and aliases

- providers/: application-wide providers
  - providers/providers.jsx: ThemeProvider + app toasters
  - providers/providers.client.jsx: React Query (TanStack) provider
- components/: shared UI and building blocks
  - components/draggable/: reusable drag-and-drop system (dnd-kit)
- app/(dashboard)/(home)/dashboard-v2/: dashboard UI for in-app screens
  - ui/: icons and primitives are imported via the alias `@/ui/*`
  - features/: domain modules (analytics, service-providers, guides, etc.)
- lib/: shared utilities and runtime helpers
  - lib/suppress-warnings.js: runtime suppression for noisy React 19 warnings

Path aliases (see jsconfig.json):
- @/* -> project root
- @/ui/* -> app/(dashboard)/(home)/dashboard-v2/ui/*
- contentlayer/generated -> ./.contentlayer/generated
