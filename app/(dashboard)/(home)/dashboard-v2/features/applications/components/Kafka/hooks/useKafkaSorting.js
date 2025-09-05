// hooks/useKafkaSorting.js
// Sorting helpers for Kafka nodes and topics.

import { useMemo } from "react";

import { useTableSorting } from "@/lib/sort";

export function useKafkaRowSorting(rows, sortKey, sortDir) {
  const accessors = {
    heapMb: (r) => r?.heapMb ?? r?.heap,
    health: (r) => r?.topicHealth,
  };
  return useTableSorting(rows, sortKey, sortDir, accessors);
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

