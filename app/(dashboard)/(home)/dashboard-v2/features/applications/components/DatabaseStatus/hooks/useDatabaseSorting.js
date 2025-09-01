// hooks/useDatabaseSorting.js
// Sorting helper for database rows by name.

import { useMemo } from "react";

export function useDatabaseSorting(rows, sortDir) {
  return useMemo(() => {
    const list = [...(rows ?? [])];
    list.sort((a, b) =>
      sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    return list;
  }, [rows, sortDir]);
}

