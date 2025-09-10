/*
  Module: Config
  Purpose: Theme-aware chart/table configuration and constants for this component.
*/
/**
 * ProviderStatus configuration
 */

export const PROVIDER_STATUS_CONFIG = {
  // Max height of the scrollable provider list (in px)
  scrollMaxHeight: 260,
  // Tailwind class fragments for status visuals
  dot: {
    active: "bg-success-700",
    inactive: "bg-destructive-700",
  },
  badge: {
    active: "bg-success-700/20 text-success-700",
    inactive: "bg-destructive-700/20 text-destructive-700",
  },
  statusLabels: {
    active: "Active",
    inactive: "Inactive",
  },
};

