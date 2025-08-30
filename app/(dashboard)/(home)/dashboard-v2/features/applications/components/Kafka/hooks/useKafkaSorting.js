// hooks/useKafkaSorting.js
// Sorting helpers for Kafka nodes and topics.

import { useMemo } from "react";

export function useKafkaRowSorting(rows, sortDir) {
  return useMemo(() => {
    const list = [...(rows ?? [])];
    list.sort((a, b) => (sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    return list;
  }, [rows, sortDir]);
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

