# Analytics Feature

Purpose
- Container with draggable/sortable cards using dnd-kit
- Cards show gauge or metric values with trends; order persisted to localStorage (or backend)

Structure
- AnalyticCards.jsx — container: maps data to { id, component } and renders grid via SortableContainer
- components/Card.jsx — decides gauge vs metric; shows drag handle in customize mode
- components/GaugeCard.jsx / MetricCard.jsx — presentational parts
- components/analytic-cards-helpers.js — STORAGE_KEY, CONTAINER_ID, saved-order helper
- utils/config.js — gauge constants
- utils/numbers.js — number parsing/formatting
- data/cards.js — initial static data

API suggestions
- GET /api/analytics/cards -> { cards: CardData[] }
- POST /api/analytics/cards/order -> { ok: true } (body: { order: string[] })

Briefing points
- Keep id values stable to restore order
- Wrap presentational components with React.memo
- A11y: keyboard drag, aria-labels, color contrast
- Testing: number utils, rendering, reorder + persistence
- SSR: guard localStorage in useEffect

