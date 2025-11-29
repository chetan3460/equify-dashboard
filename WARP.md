# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands and scripts

This is a Next.js 15 App Router project using npm.

### Install dependencies
- `npm install`

### Run the dev server
- `npm run dev`
  - Uses `next dev --turbo` (Turbopack) on port 3000.

### Build and run production
- `npm run build`
- `npm start`

### Lint
- `npm run lint`

### Running a single route/page during development
Next.js does not support running a single test file via npm scripts in this project (no test framework configured). To focus on a specific page or feature:
- Navigate directly to its route in the browser while the dev server is running.
  - Root redirects to `/dashboard-v2` (see `app/page.jsx`).
  - Feature-specific routes under the dashboard include:
    - `/dashboard-v2` — main dashboard
    - `/dashboard-v2/guides` and nested guide routes (see `app/(dashboard)/(home)/dashboard-v2/guides/*`).

If you add a testing framework, prefer npm scripts such as `npm test` and document them here.

## High-level architecture

### Framework and routing
- Next.js 15 with the App Router (see `app/`):
  - `app/layout.jsx` defines the root HTML shell, global CSS, font (Poppins), and application-wide providers.
  - `app/page.jsx` is a server component that immediately redirects `/` to `/dashboard-v2`.
  - `app/not-found.js` renders a custom 404 via `ErrorBlock`.
  - Under `app/(dashboard)/`:
    - `app/(dashboard)/layout.jsx` wraps all dashboard routes in `MainLayout`.
    - `app/(dashboard)/main-layout.jsx` is the main authenticated-like shell: header, sidebar, footer, animated page transitions, mobile sidebar, global drag-and-drop context, and a global drag confirmation popup.

### Global providers
- `providers/providers.jsx` (client component):
  - Wraps the app in `next-themes` `ThemeProvider` with `class`-based dark mode.
  - Attaches UI toasters: `ReactToaster`, `react-hot-toast` `Toaster`, and `SonnToaster` from `@/components/ui/sonner`.
  - Uses `usePathname()` to slightly specialize behavior for the root route, but in practice everything redirects to `/dashboard-v2`.
- `providers/providers.client.jsx`:
  - Configures a `QueryClient` and wraps the tree in `@tanstack/react-query`'s `QueryClientProvider`.
- Both providers are composed in `app/layout.jsx` via `TanstackProvider` and `Providers`.

### Dashboard V2 feature layout
- Primary dashboard UI is under `app/(dashboard)/(home)/dashboard-v2/`:
  - `page.jsx` (client component):
    - Renders a `TitleSection`, the analytics cards row, and a tabbed content area.
    - Tabs are managed via local state (`activeTab`), switching between four domains: **SMS volume**, **Service providers**, **System health**, and **Applications**.
  - `Tabs.jsx`: responsive tab navigation (select dropdown on small screens, pill-style tabs on larger screens).
  - `ui/`:
    - Icon components, `TitleSection`, `dashboard-select`, and a small set of shadcn-inspired primitives (`badge`, `button`, `card`, `dialog`, `plain-dropdown-menu`, `table`) used across features.

### Drag-and-drop layout system
- Global drag-and-drop context lives in `components/draggable/` (see its `README.md` for full details):
  - `DragProvider` exposes global drag state ("customize" mode) and coordinates multiple draggable sections.
  - `DragModeHeader` provides the header + "Customize" affordance and a `DragConfirmationPopup` for save/cancel across all sections.
  - `SortableContainer` wraps any grid/list and:
    - Wires up `@dnd-kit` for drag-and-drop.
    - Accepts an array of items shaped like `{ id, component }`.
    - Optionally persists ordering to `localStorage` via a `storageKey`.
    - Supports layout strategies (`grid`, `vertical`, `horizontal`).
- The dashboard shell (`app/(dashboard)/main-layout.jsx`) wraps the entire content in `DragProvider` and includes a global `DragConfirmationPopup`, allowing multiple independent draggable feature sections to share one global "drag mode" and confirmation UX.

### Feature modules under `dashboard-v2/features`
Each major dashboard tab is implemented as an isolated feature module that follows a consistent pattern: a top-level container component, a `components/` subfolder for presentational pieces, optional `data/` and `utils/` folders, and a `README.md` with feature-specific notes.

#### Analytics (`features/analytics`)
- Purpose: draggable cards showing metrics and gauges for SMS/traffic analytics.
- Structure:
  - `AnalyticCards.jsx` — maps analytics data into `{ id, component }` items and renders them inside `SortableContainer` with a grid layout.
  - `components/` — `Card`, `GaugeCard`, `MetricCard`, and helper modules.
  - `data/` and `utils/` — static seed data, gauge config, and number-format helpers.
- Ordering and persistence logic (container IDs, storage keys, localStorage access) are centralized in `analytic-cards-helpers.js`.

#### SMS Volume (`features/sms-volume`)
- Purpose: charts for SMS volume over time, by department, and by provider.
- Structure:
  - `SMSVolume.jsx` — top-level container using `SortableContainer` for three primary cards.
  - `components/OverallSMSVolume`, `SMSByDepartment`, `SMSByProvider` — each encapsulates its own Recharts configuration and static demo data.
  - `utils/` — shared chart constants and helpers (tick formatting, colors, etc.).

#### Service Providers (`features/service-providers`)
- Purpose: provider-centric monitoring — status, traffic, TPS, latency, API calls, and delivery reports.
- Structure:
  - `ServiceProviders.jsx` — container that arranges provider tiles/cards in a draggable grid.
  - `components/<CardName>/` — each folder contains the card component, local config, and demo data for a particular provider metric.
- Most service-provider cards are focused on Recharts-based visualizations and share a similar config/data split to SMS volume.

#### System Health (`features/system-health`)
- Purpose: system/server health overview.
- Structure:
  - `SystemHealth.jsx` — container with `SortableContainer` wrapping system health cards.
  - `components/ServerStatistics` — sortable table of server metrics.
  - `components/APICallsToday` — network/traffic area chart.

#### Applications (`features/applications`)
- Purpose: operational tables for Kafka, database, Redis, webservers, and applications.
- Structure:
  - `Applications.jsx` — master container for the "Applications" tab, wiring up multiple tables inside a draggable grid.
  - `components/Applications`, `DatabaseStatus`, `RedisStatus`, `WebserverStatus`, `Kafka`, and `shared/` — each submodule owns its own table component(s), config, data, and hooks (e.g., `useKafkaSorting`, `useKafkaToasts`).
- Shared concerns like critical badges, sortable table headers, and toasts are factored into `shared/` or feature-specific hooks.

### Documentation and guides
- Root `README.md`:
  - Summarizes the tech stack and provides quickstart commands and a high-level project structure.
- `app/(dashboard)/(home)/dashboard-v2/guides/`:
  - MDX-based guides for each feature area (`analytics`, `applications`, `service-providers`, `sms-volume`, `system-health`) plus an overall project guide and topic-specific docs.
  - `layout.jsx` provides a sidebar navigation for guide topics and a right-hand table of contents via `@/components/docs/TOC` and a `MutationObserver`-backed heading enhancer.

### Shared libraries and utilities (`lib/`)
- `lib/suppress-warnings.js`:
  - Imported globally in `app/layout.jsx` to monkey-patch `console.error`, `console.warn`, `console.log`, and `window.onerror` on the client to ignore noisy React 19 `ref`-related warnings while the app runs on React 18.
- Other `lib/*.js` modules (e.g., `number`, `format`, `table`, `status`, `utils`) provide cross-cutting data formatting, table helpers, or status mapping used throughout dashboard features.

### Configuration
- `next.config.js`:
  - Wraps the Next config with `@next/mdx` to support `.md`/`.mdx` page extensions.
  - Enables experimental MDX support (`mdxRs`) and configures Turbopack extensions.
  - Custom webpack rules for importing SVGs both as files (`?url`) and as React components via `@svgr/webpack`.
  - Limits remote image domains to `api.lorem.space`.
- `tailwind.config.js`:
  - Sets up `darkMode: "class"` and a design-system-driven color palette based on CSS variables (`--primary-*`, `--default-*`, etc.).
  - Configures container widths, radii, box shadows, and keyframe animations (accordion + Radix-like slide transitions).
  - Includes the `tailwindcss-animate` plugin.
- `jsconfig.json`:
  - Declares base URL `.` and path aliases:
    - `@/*` → project root.
    - `@/ui/*` → `app/(dashboard)/(home)/dashboard-v2/ui/*`.
    - `contentlayer/generated` → `./.contentlayer/generated` (not required at runtime for the sample data).

## Guidelines for future changes

- When adding new dashboard functionality, prefer creating a new feature module under `app/(dashboard)/(home)/dashboard-v2/features/<feature-name>/` with:
  - A top-level container component that wires data and drag-and-drop into `SortableContainer`.
  - A `components/` subfolder for presentational pieces.
  - Optional `data/` and `utils/` for mock/demo data and shared helpers.
  - A `README.md` describing the feature’s purpose and structure, similar to the existing feature READMEs.
- Reuse the global drag-and-drop primitives from `components/draggable/` and the shared UI components from `app/(dashboard)/(home)/dashboard-v2/ui/` wherever possible to keep UX consistent.
