# System Health Feature

Purpose
- Server statistics table and a network time-series card
- Same drag-and-drop grid pattern

Structure
- SystemHealth.jsx — container with SortableContainer
- components/ServerStatistics/* — sortable table (sticky header, optional scroll)
- components/APICallsToday/* — network time-series (area chart)

API suggestions
- GET /api/health/servers -> ServerRow[]
- GET /api/health/network -> { lastUpdated, points: Array<{ time, value }>} 
- POST /api/health/order -> { ok: true }

Briefing points
- Tables: per-column sort, export, derive lastUpdated from timestamps
- Charts: consistent ms formatting, minimal tooltip noise

