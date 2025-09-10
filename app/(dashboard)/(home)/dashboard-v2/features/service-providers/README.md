# Service Providers Feature

Purpose
- Provider-centric cards: status, traffic, API calls today/by provider, ongoing TPS, average latency, delivery reports
- Unified drag-and-drop grid with persisted order

Structure
- ServiceProviders.jsx — container with SortableContainer
- components/<CardName>/<CardName>.jsx — presentational card
- components/<CardName>/config.js — chart/theme constants
- components/<CardName>/data.js — demo/mapped data

API suggestions
- GET /api/providers/overview -> { status, traffic, apiCallsToday, apiCallsByProvider, tps, avgLatency, deliveryReports }
- POST /api/providers/order -> { ok: true }

Briefing points
- Use className on items to span columns for large datasets
- Memoize ticks/tooltips; avoid re-computing gradients per render
- A11y: aria-labels on drag handles; legend/bar contrast
- Export: keep mappers in data.js for consistent CSV rows

