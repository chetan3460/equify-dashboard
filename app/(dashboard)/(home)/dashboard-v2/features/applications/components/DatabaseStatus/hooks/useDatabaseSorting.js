// hooks/useDatabaseSorting.js
// Sorting helper for database rows by name.

import { useMemo } from "react";

export function useDatabaseSorting(rows, sortKey, sortDir) {
  return useMemo(() => {
    const list = [...(rows ?? [])];
    const key = sortKey || "name";
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

