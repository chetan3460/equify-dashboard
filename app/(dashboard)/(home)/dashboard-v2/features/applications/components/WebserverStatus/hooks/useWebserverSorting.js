// hooks/useWebserverSorting.js
// Sorting helper for webserver rows by service or statusCode.

import { useMemo } from "react";

export function useWebserverSorting(rows, sortKey, sortDir) {
  return useMemo(() => {
    const list = [...(rows ?? [])];
    list.sort((a, b) => {
      if (sortKey === "statusCode") {
        const av = Number(a?.statusCode ?? 0);
        const bv = Number(b?.statusCode ?? 0);
        return sortDir === "asc" ? av - bv : bv - av;
      }
      // default to service name
      const as = String(a?.service ?? "");
      const bs = String(b?.service ?? "");
      return sortDir === "asc" ? as.localeCompare(bs) : bs.localeCompare(as);
    });
    return list;
  }, [rows, sortKey, sortDir]);
}

