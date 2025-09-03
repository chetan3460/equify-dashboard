# Dashboard v2 – Folder Structure and Usage Guide

This guide explains how the dashboard-v2 portion of the project is organized, how files interact, and how to add or modify features in a consistent way.

Location focus: app/(dashboard)/(home)/dashboard-v2

Overview
- Next.js App Router: Uses the app/ directory with route groups (folders in parentheses) to organize layout and routes without affecting the URL.
- dashboard-v2 is composed of:
  - page.jsx: main dashboard page with tab navigation
  - Tabs.jsx: reusable tabs UI
  - ui/: shared UI for dashboard-v2 (icons, title section, etc.)
  - features/: grouped feature modules (analytics, applications, service-providers, sms-volume, system-health)

Route groups
- (dashboard) and (home) are Next.js route groups. They help with layout organization and don’t appear in the URL.
- The user-facing routes are:
  - /dashboard-v2
  - /dashboard-v2/interactive

Sidebar menu
- The dashboard links are defined in config/menus.js
- To add a new submenu route under Dashboard, add entries to:
  - mainNav → Dashboard.child
  - sidebarNav.modern → Dashboard.child
  - sidebarNav.classic → Dashboard.child

Features directory
Path: app/(dashboard)/(home)/dashboard-v2/features
- analytics: Reusable gauge chart and helpers
- applications: App/DB/Kafka/Redis/Webserver status components
- service-providers: Provider-centric metrics (API calls, TPS, latency, delivery reports, etc.)
- sms-volume: SMS volume analytics (overall and by category)
- system-health: Network/server metrics
- guides: Developer documentation for these features (this guide plus others)

Feature module structure
Each feature section (e.g., service-providers) generally uses:
- index export(s) at features/<section>/index.js (optional, where present)
- components/ subfolder containing each card component in its own folder

Card component folder pattern
For charts or UI cards, we use a consistent 3-file pattern inside components/<CardName>/:
- <CardName>.jsx: The React component (presentation, props, light logic)
- config.js: Theme-aware visual configuration (axis, grid, tooltip, gradients, sizes)
- data.js: Data sources (mock or real) and data-mapping helpers into chart-friendly structures

Theme-aware configuration
- Components call getChartConfig(theme) from config.js
- The theme value is obtained from next-themes (useTheme()), letting you adjust colors, strokes, fonts under light/dark mode
- Typical config sections:
  - axis: colors for axis lines and tick labels
  - grid: grid line colors and dashes
  - tooltip: colors and borders
  - gradients: definitions for chart fills (linear or radial)
  - series/area/line: per-series colors and widths where needed

Height management (charts)
- Most chart cards now accept a height prop that supports:
  - number (pixels): height={440}
  - "auto": fills the parent’s height
- Pattern used inside the component:
  - Compute wrapperStyle =
    - typeof height === "number" ? { height: `${height}px` } : { height: "100%" }
  - Wrap ResponsiveContainer with a div style={wrapperStyle}
- Important: For height="auto" to render properly, ensure the parent container provides a height via layout (flex/grid) or fixed CSS height.

Axis and labels
- Use a small CustomTick component to control label color, font-size, and anchor based on the theme
- Use tickMargin on XAxis/YAxis to add spacing between tick line and label text
- Use tickFormatter to transform numeric axes (e.g., 1000 → 1K; 1_000_000 → 1M)

Tooltips
- Tooltip content typically uses styles from chartConfig.tooltip (contentStyle, labelStyle, itemStyle)
- CustomTooltip components are small and stateless; they rely on the theme-aware config

Gradients
- Define gradient specs in config.js (linearGradient or radialGradient)
- In the component, render <defs> mapping over chartConfig.gradients
- Reference via fill="url(#gradId)" on Bar/Area/Line/Cell

Data shaping
- data.js generally exports:
  - raw data object (often includes lastUpdated)
  - chartData array derived from raw data and tailored for Recharts (or other viz)
- Keep data transforms pure and reusable; keep the component focused on rendering

Adding a new chart card (step-by-step)
1) Choose the feature section
   - e.g., service-providers/components
2) Create a folder for your card: components/MyNewCard/
3) Inside it, add three files:
   - MyNewCard.jsx (component)
   - config.js (theme-aware visual config)
   - data.js (raw data + mappers to chartData)
4) In MyNewCard.jsx:
   - Accept props like height and optionsMenuItems as needed
   - Compute wrapperStyle from height
   - Render ResponsiveContainer inside a wrapping div using wrapperStyle
   - Use getChartConfig(theme) for axis/grid/tooltip/gradients
5) Add your component into the section’s parent (e.g., ServiceProviders.jsx) or to a page/tab where it should appear
6) Optional: Add a submenu link for the new page in config/menus.js (if you create a new route)

Wiring into the dashboard page
- The main dashboard (/dashboard-v2) renders tabs and section components:
  - SMS Volume, Service providers, System health, Applications
- To place your new card, open the corresponding section component and add your card component into its layout

Interactive docs page
- The project includes /dashboard-v2/interactive which hosts tabbed guidance content for the sections
- Use this page to surface documentation or playgrounds for users/developers

Naming and file conventions
- PascalCase for React components and folders under components/
- kebab-case for icons and smaller utility files where appropriate
- co-locate small subcomponents with their parent card to limit cross-feature coupling

Where to put shared UI
- Use app/(dashboard)/(home)/dashboard-v2/ui for visual elements used across dashboard-v2 (TitleSection, icons)
- Use components/ui for global, reusable UI elements across the entire project

Menu updates (example)
- To add a submenu link under Dashboard pointing to /dashboard-v2/interactive, update config/menus.js by adding an entry under mainNav, sidebarNav.modern, and sidebarNav.classic for consistency

Local development tips
- Run the dev server (e.g., npm run dev) and open /dashboard-v2
- If using height="auto", ensure the parent layout provides a defined height
- Check console warnings for missing dependencies in React hooks and fix as needed

Deploying with Vercel
- Preview deploy using the CLI from project root: vercel --yes
- Promote to production: vercel --prod --yes
- The project is already linked to Vercel via the .vercel directory

Appendix: Feature inventory (cards/components)
- service-providers/components:
  - APICallsByProvider, APICallsToday, AvgLatency, DeliveryReports, OngoingTPS, ProviderStatus, ProviderTraffic, SuccessfulTransactions
- sms-volume/components:
  - OverallSMSVolume, SMSByDepartment, SMSByProvider
- system-health/components:
  - APICallsToday, ServerStatistics
- applications/components:
  - Applications (with ApplicationsTable), DatabaseStatus (DatabaseTable, IODetailsTable), Kafka (KafkaTable, toasts), RedisStatus (RedisTable), WebserverStatus (WebserverTable)
- analytics/components:
  - GaugeChart and helpers

Questions or improvements?
- If you want the guides surfaced inside the app UI (e.g., a dedicated Docs tab or linking to markdown), we can wire that up, too.

