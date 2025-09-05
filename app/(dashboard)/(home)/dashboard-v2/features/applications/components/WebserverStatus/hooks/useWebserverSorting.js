// hooks/useWebserverSorting.js
// Sorting helper for webserver rows by service or statusCode.

import { useTableSorting } from "@/lib/sort";

export function useWebserverSorting(rows, sortKey, sortDir) {
  return useTableSorting(rows, sortKey, sortDir);
}

