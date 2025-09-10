# SMS Volume Feature

Purpose
- Three charts: overall trend, department pie, provider bar chart
- Shared constants and helpers under utils/

Structure
- SMSVolume.jsx — container with SortableContainer
- components/OverallSMSVolume/* — line chart + legend/dots/tooltip
- components/SMSByDepartment/* — pie chart + gradients
- components/SMSByProvider/* — vertical bar chart with trimmed labels
- utils/constants.js, utils/utils.js — shared tokens and helpers

API suggestions
- GET /api/sms/overview -> { overall, byDepartment, byProvider }
- POST /api/sms/order -> { ok: true }

Briefing points
- Memoize gradients and legend payloads
- A11y: readable tooltips, label aria/title on trimmed text
- Responsiveness: guard Y-axis width; scroll long provider lists

