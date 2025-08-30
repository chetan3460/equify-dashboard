// constants.js
// Small, shared configuration for KafkaStatus. Keep app-specific constants here.

export const MEMORY_THRESHOLD = 90; // percent
export const THREADS_THRESHOLD = 300; // count

// Batch size for lazy-loading topics inside the dialog
export const topicBatchSize = 20;

// Central place for asset paths used by this feature
export const ASSETS = {
  systemCriticalIcon: "/icons/system-critical.svg",
};

