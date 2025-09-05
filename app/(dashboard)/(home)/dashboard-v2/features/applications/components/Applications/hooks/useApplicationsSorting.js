// hooks/useApplicationsSorting.js
// Sorting helper for application rows by name or memory.

import { useTableSorting } from "@/lib/sort";

// useApplicationsSorting
// Thin wrapper around the generic sorting hook so existing imports continue to work.
export function useApplicationsSorting(rows, sortKey, sortDir) {
  return useTableSorting(rows, sortKey, sortDir);
}

