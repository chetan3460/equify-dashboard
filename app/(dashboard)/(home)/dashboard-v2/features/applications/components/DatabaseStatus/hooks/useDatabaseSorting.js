// hooks/useDatabaseSorting.js
// Sorting helper for database rows by name.

import { useTableSorting } from "@/lib/sort";

export function useDatabaseSorting(rows, sortKey, sortDir) {
  return useTableSorting(rows, sortKey, sortDir);
}

