// hooks/useWebserverSorting.js
// Sorting helper for webserver rows by service or statusCode.

import { useMemo } from "react";

export function useWebserverSorting(rows, sortKey, sortDir) {
  return useMemo(() => {
    const list = [...(rows ?? [])];
    const key = sortKey || "service";
    list.sort((a, b) => {
      const av = a?.[key];
      const bv = b?.[key];
      const aNum = parseFloat(av);
      const bNum = parseFloat(bv);
      const bothNum = Number.isFinite(aNum) && Number.isFinite(bNum);
      if (bothNum) return sortDir === "asc" ? aNum - bNum : bNum - aNum;
      const as = (av ?? "").toString();
      const bs = (bv ?? "").toString();
      return sortDir === "asc" ? as.localeCompare(bs) : bs.localeCompare(as);
    });
    return list;
  }, [rows, sortKey, sortDir]);
}

