# Applications – Feature Guide

Location: app/(dashboard)/(home)/dashboard-v2/features/applications

Components
- Applications – applications table/list
- DatabaseStatus – database tables and I/O details
- Kafka – Kafka cluster status and KafkaTable
- RedisStatus – Redis health and tables
- WebserverStatus – webserver metrics

Patterns
- Heavier on tabular views; chart usage is limited
- Component folders with local subcomponents (e.g., tables) to keep concerns scoped
- Consider adding per-component config.js if a view grows visual complexity

Tips
- Keep data fetching/transforms isolated from presentational table components
- Use shared components (features/applications/components/shared) where possible
- Ensure accessibility in tables: ARIA roles and supported attributes

