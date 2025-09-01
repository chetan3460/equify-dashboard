// hooks/useRedisSorting.js
// Sorting helper for Redis rows by name or memory.

import { useMemo } from "react";

export function useRedisSorting(rows, sortKey, sortDir) {
  return useMemo(() => {
    const list = [...(rows ?? [])];
    list.sort((a, b) => {
      if (sortKey === "memory") {
        const av = Number(a?.memory ?? 0);
        const bv = Number(b?.memory ?? 0);
        return sortDir === "asc" ? av - bv : bv - av;
      }
      // default to name
      const an = String(a?.name ?? "");
      const bn = String(b?.name ?? "");
      return sortDir === "asc" ? an.localeCompare(bn) : bn.localeCompare(an);
    });
    return list;
  }, [rows, sortKey, sortDir]);
}

