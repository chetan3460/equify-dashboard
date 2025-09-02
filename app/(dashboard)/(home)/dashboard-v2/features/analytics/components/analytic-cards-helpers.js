/*
  Helpers for AnalyticCards
  - Constants for storage and container IDs
  - applySavedOrder: rebuild list order from a saved localStorage payload
*/

// LocalStorage key where we persist the order of analytics cards
export const STORAGE_KEY = "dashboard-analytics-cards";

// Identifier used by DragProvider to manage this container's save/cancel
export const CONTAINER_ID = "analytics-cards";

/**
 * Given a base array of items and a serialized saved order
 * (e.g., [{ id: 'x', order: 0 }, ...]) return a reordered copy.
 */
export function applySavedOrder(baseItems, savedJson) {
  try {
    const order = JSON.parse(savedJson);
    if (!Array.isArray(order) || order.length === 0) return baseItems;
    const index = new Map(order.map((o, i) => [o.id, i]));
    return [...baseItems].sort((a, b) => {
      const ai = index.has(a.id) ? index.get(a.id) : Number.MAX_SAFE_INTEGER;
      const bi = index.has(b.id) ? index.get(b.id) : Number.MAX_SAFE_INTEGER;
      return ai - bi;
    });
  } catch {
    return baseItems;
  }
}

