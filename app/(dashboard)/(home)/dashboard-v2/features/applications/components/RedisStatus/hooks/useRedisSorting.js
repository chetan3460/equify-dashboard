// hooks/useRedisSorting.js
// Sorting helper for Redis rows by name or memory.

import { useTableSorting } from "@/lib/sort";

export function useRedisSorting(rows, sortKey, sortDir) {
  return useTableSorting(rows, sortKey, sortDir);
}

