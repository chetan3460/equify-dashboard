# Dashboard v2 Features – Developer Guide

This guide documents the structure and usage patterns for the features under app/(dashboard)/(home)/dashboard-v2/features. It explains how components are organized, how to add new ones, and how to configure charts and data flows consistently.

Sections in features/
- analytics: Reusable gauge charts and helpers
- applications: Application status views (tables and summaries)
- service-providers: Provider-centric charts (API calls, TPS, latency, etc.)
- sms-volume: SMS volume analytics (overall and by category)
- system-health: System/infra metrics views

General conventions
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

