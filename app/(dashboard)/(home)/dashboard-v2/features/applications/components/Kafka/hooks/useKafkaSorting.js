// hooks/useKafkaSorting.js
// Sorting helpers for Kafka nodes and topics.

import { useMemo } from "react";

export function useKafkaRowSorting(rows, sortKey, sortDir) {
  return useMemo(() => {
    const list = [...(rows ?? [])];
    const key = sortKey || "name";
    const dir = sortDir === "desc" ? "desc" : "asc";

    const getVal = (row) => {
      switch (key) {
        case "heapMb":
          return row?.heapMb ?? row?.heap;
        case "health":
          return row?.topicHealth;
        default:
          return row?.[key];
      }
    };

    list.sort((a, b) => {
      const av = getVal(a);
      const bv = getVal(b);

      const aNull = av == null || (typeof av === "string" && av.length === 0);
      const bNull = bv == null || (typeof bv === "string" && bv.length === 0);
      if (aNull || bNull) {
        if (aNull && bNull) return 0;
        // Always push null/undefined/empty values to the bottom in both directions
        return aNull ? 1 : -1;
      }

      const aNum =
        typeof av === "number"
          ? av
          : Number.isFinite(parseFloat(av))
          ? parseFloat(av)
          : NaN;
      const bNum =
        typeof bv === "number"
          ? bv
          : Number.isFinite(parseFloat(bv))
          ? parseFloat(bv)
          : NaN;
      const bothNum = Number.isFinite(aNum) && Number.isFinite(bNum);
      if (bothNum) return dir === "asc" ? aNum - bNum : bNum - aNum;

      const as = String(av).toLowerCase();
      const bs = String(bv).toLowerCase();
      if (as === bs) return 0;
      if (dir === "asc") return as < bs ? -1 : 1;
      return as < bs ? 1 : -1;
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

