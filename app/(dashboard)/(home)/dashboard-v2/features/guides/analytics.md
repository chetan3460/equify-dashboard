# Analytics – Feature Guide

Location: app/(dashboard)/(home)/dashboard-v2/features/analytics

Files
- GaugeChart.jsx – reusable gauge implementation
- gauge-helpers.js – helpers for gauge math/rendering
- analytic-cards-helpers.js – helpers for analytic/summary cards

Patterns
- Keep rendering logic separate from math/helpers
- Export simple APIs from helpers (pure functions) so components remain declarative

Adding a new analytic chart
1) Build helpers first (math, data shape)
2) Create a component that consumes those helpers and accepts props for size, thresholds, and colors
3) Document usage and defaults within the component or guide

