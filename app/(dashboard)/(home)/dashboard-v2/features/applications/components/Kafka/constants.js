// constants.js
// Small, shared configuration for KafkaStatus. Keep app-specific constants here.

export const MEMORY_THRESHOLD = 90; // percent
export const THREADS_THRESHOLD = 300; // count

// Batch size for lazy-loading topics inside the dialog
// Reduced to 5 to make the infinite scroll demo easier to see.
export const topicBatchSize = 5;

// Central place for asset paths used by this feature
export const ASSETS = {
  systemCriticalIcon: "/icons/system-critical.svg",
};

