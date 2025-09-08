# Dashboard v2 – Project Guide

This guide explains how the overall dashboard works and how to extend it safely. It covers structure, common patterns, and backend integration options.

Quick start
- Dev: npm run dev (http://localhost:3000)
- Build: npm run build; npm start
- Deploy (Vercel CLI): vercel --yes (preview), vercel --prod --yes (prod)

What you’ll find where
- app/(dashboard)/(home)/dashboard-v2
  - page.jsx: Dashboard V2 entry; tabs, title, analytic cards row
  - Tabs.jsx: tab UI used on the page
  - ui/: shared UI (TitleSection, icons)
  - guides/: docs you’re reading + per-feature guides
  - interactive/: in-app docs page (Overview + section guides)
  - features/: grouped modules
    - analytics/: Gauges and helpers
    - applications/: Application/infra tables (Kafka, Redis, DB, Webserver)
    - service-providers/: Provider metrics (API calls, TPS, latency, etc.)
    - sms-volume/: SMS analytics (overall and by breakdown)
    - system-health/: System metrics (network, servers)

Core patterns
- Component folder pattern
  - Each card lives in components/<CardName>/ with:
    - <CardName>.jsx: UI and local logic
    - config.js: theme-aware styles (axis, grid, tooltip, gradients, sizes)
    - data.js: mock data + mappers (backend → chartData)
- Theming
  - Every chart calls getChartConfig(theme) so visuals are consistent in light/dark
- Height management
  - height accepts px (e.g., 440) or "auto" (fills parent). For auto, the parent must define height.
- Axes & ticks
  - Use CustomTick for consistent size/color; add tickMargin for spacing; use tickFormatter for compact values (1k/1M)
- Gradients
  - Define once in config.js and reference via defs (fill="url(#gradId)")
- Sorting (tables)
  - Use lib/sort + SortableHeaderCell for consistent interactions and styling

Backend integration (two safe options)
- A) Client fetch via BFF route handlers (minimal refactor)
  - Add app/api/... route handlers that call upstream APIs with server-only env vars
  - Use React Query hooks in client cards to fetch from /api/...
  - Pros: smallest code change; secrets remain server-side
- B) Server-side fetch (best practice)
  - Make the top-level page.jsx a server component and fetch data there
  - Pass props into client cards; use Next fetch caching/revalidate
  - Pros: better caching, no client secrets; fewer client fetches

Migration checklist (per card)
1) Replace mock import from data.js with either:
   - a hook (Option A) or
   - server-provided props (Option B)
2) Validate response (zod) and map to chartData in data.js
3) Add loading/error UI
4) Keep config.js for visuals only

Conventions
- Prefer presentational components; lift I/O out
- Explicit props (avoid hidden globals)
- Document props briefly at the top of each component
- Reuse helpers (numbers, sort, table, tooltip)

See also
- service-providers.md – Provider cards
- sms-volume.md – SMS analytics cards
- system-health.md – System metrics
- applications.md – App/infra tables
- analytics.md – Gauges and helpers
- folder-structure.md – Deep dive into folder layout and usage
- Component folder pattern
  - Each UI card/chart lives in its own folder under the relevant feature section.
  - Typical contents:
    - Component.jsx: The React component for the card/chart
    - config.js: Visual/styling config (axis, grid, gradients, tooltip, sizes)
    - data.js: Raw data, mocks, and data transformations into chart-friendly shapes
- Styling
  - Prefer pulling visual constants (colors, gradients, axis styles, size knobs) from config.js
  - Keep business/data shaping separate in data.js
- Height management
  - Many charts now accept a height prop that supports:
    - a number (pixels): e.g., height={440}
    - "auto" to fill the parent container’s height
  - If using height="auto", ensure the parent has a defined height via layout (flex/grid) or fixed CSS height
- Axis ticks & spacing
  - Use tickMargin and/or a CustomTick component to control spacing and formatting
  - Move repeated axis/tooltip styles into config.js for consistency
- Gradients
  - Define gradients in config.js and reference by id in the component

How to add a new chart card
1) Pick the section (e.g., service-providers/components) and create a folder named after the card
2) Inside the folder, create:
   - YourCard.jsx (main component)
   - config.js (visual config: axis, grid, gradients, tooltip, sizes)
   - data.js (raw/mocked data, mapping helpers)
3) In YourCard.jsx:
   - Import chart settings from config.js and data from data.js
   - Provide a height prop: number (pixels) or "auto"
   - Render a wrapper div using the computed height for ResponsiveContainer to fill
4) Wire it into the page that renders dashboard-v2 by importing and placing your new component

Notes & best practices
- Keep JSX components presentational and stateless where possible; lift I/O or global state out
- Prefer explicit props over hidden globals
- Reuse existing helpers (e.g., axis tick formatters) when appropriate
- Document any component-specific props in a short comment block at the top of the file

