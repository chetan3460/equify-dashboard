# Applications Feature

Purpose
- Kafka, Database, Redis, Webserver, and Applications tables
- Dialogs, toasts, sorting hooks; all under a sortable grid

Structure
- Applications.jsx — container with SortableContainer
- components/Kafka/* — table, dialog, toasts, hooks, constants
- components/DatabaseStatus/* — table + I/O details
- components/RedisStatus/* — table
- components/WebserverStatus/* — table
- components/Applications/* — applications table
- components/shared/* — reusable table/UX bits

API suggestions
- GET /api/apps/kafka -> { lastUpdated, rows: KafkaNode[] }
- GET /api/apps/database -> DatabaseRow[]
- GET /api/apps/redis -> RedisRow[]
- GET /api/apps/webserver -> WebserverRow[]
- GET /api/apps/applications -> ApplicationRow[]
- POST /api/apps/order -> { ok: true }

Briefing points
- Performance: virtualize topic lists; debounce sorting
- A11y: dialog focus management; toast aria-describedby
- Export: normalize rows before CSV export

