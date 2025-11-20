# Equify Dashboard

A modern dashboard built with Next.js 15, Tailwind CSS, Radix UI, and TanStack Query. It includes drag-and-drop widgets, charts, theming, and an app router structure optimized for modular features.

## Live
- Production: https://equence-dashboard-97srm2e0y-chetan3460s-projects.vercel.app

## Tech Stack
- Next.js 15 (App Router)
- React 18
- Tailwind CSS + tailwindcss-animate
- Radix UI primitives
- TanStack Query
- MDX via @next/mdx
- Recharts, Framer Motion, dnd-kit

## Getting Started (Local)
Requirements: Node 18+ and npm.

```bash
# install dependencies
npm install

# run dev server
npm run dev
# open http://localhost:3000
```

Build and run production locally:
```bash
npm run build
npm start
```

## Project Structure
- providers/: application-wide providers
  - providers/providers.jsx: ThemeProvider + app toasters
  - providers/providers.client.jsx: TanStack Query provider
- components/: shared UI and building blocks
  - components/draggable/: reusable drag-and-drop system (dnd-kit)
- app/(dashboard)/(home)/dashboard-v2/: dashboard UI for in-app screens
  - ui/: icons and primitives imported via `@/ui/*`
  - features/: domain modules (analytics, service-providers, guides, etc.)
- lib/: shared utilities and runtime helpers
  - lib/suppress-warnings.js: runtime suppression for noisy React 19 warnings

Path aliases (see jsconfig.json):
- @/* -> project root
- @/ui/* -> app/(dashboard)/(home)/dashboard-v2/ui/*
- contentlayer/generated -> ./.contentlayer/generated

## Scripts
```bash
npm run dev     # start dev server (Turbopack)
npm run build   # production build
npm start       # run production server
npm run lint    # lint
```

## Deployment
Deployed on Vercel. Pushes to the tracked branch trigger deployments. To deploy manually from CLI:
```bash
vercel --prod
```

## Contributing
Issues and PRs are welcome.

## License
MIT
