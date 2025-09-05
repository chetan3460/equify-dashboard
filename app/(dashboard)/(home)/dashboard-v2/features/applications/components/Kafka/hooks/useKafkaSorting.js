// hooks/useKafkaSorting.js
// Sorting helpers for Kafka nodes and topics.

import { useMemo } from "react";

export function useKafkaRowSorting(rows, sortKey, sortDir) {
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

export function useTopicSorting(topics, key, dir) {
  return useMemo(() => {
    if (!topics?.length) return [];
    const list = [...topics];
    list.sort((a, b) => {
      let av = a[key];
      let bv = b[key];
      if (typeof av === "number" && typeof bv === "number") {
        return dir === "asc" ? av - bv : bv - av;
      }
      av = (av ?? "").toString().toLowerCase();
      bv = (bv ?? "").toString().toLowerCase();
      if (av < bv) return dir === "asc" ? -1 : 1;
      if (av > bv) return dir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [topics, key, dir]);
}

