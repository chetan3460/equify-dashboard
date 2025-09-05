// lib/sort.js
// Shared sorting utilities and a generic hook for table-like data.
//
// Goals:
// - Single implementation for consistent sorting across modules
// - Numeric vs string detection, case-insensitive text sort
// - Null/undefined/empty always sort to the bottom
// - Stable-ish behavior by working on a shallow-copied list

import { useMemo } from "react";

/**
 * Compare two values with common table semantics.
 * - Null/undefined/empty strings are pushed to the bottom
 * - Numbers are compared numerically
 * - Text is compared case-insensitively
 */
export function compareValues(a, b, dir = "asc") {
  const av = a;
  const bv = b;
  const direction = dir === "desc" ? -1 : 1;

  const aNull = av == null || (typeof av === "string" && av.length === 0);
  const bNull = bv == null || (typeof bv === "string" && bv.length === 0);
  if (aNull || bNull) {
    if (aNull && bNull) return 0;
    // push null/empty to bottom
    return aNull ? 1 : -1;
  }

  const aNum = typeof av === "number" ? av : Number.parseFloat(av);
  const bNum = typeof bv === "number" ? bv : Number.parseFloat(bv);
  const bothNum = Number.isFinite(aNum) && Number.isFinite(bNum);
  if (bothNum) return direction * (aNum - bNum);

  const as = String(av).toLowerCase();
  const bs = String(bv).toLowerCase();
  if (as === bs) return 0;
  return direction * (as < bs ? -1 : 1);
}

/**
 * Sort a list by a key with an optional accessor map.
 *
 * @param {Array} items - list to sort (not mutated)
 * @param {string} key - active sort key
 * @param {"asc"|"desc"} dir - direction
 * @param {Object<string,function>} accessors - map of key => (item) => value
 */
export function sortList(items, key, dir = "asc", accessors = undefined) {
  const list = [...(items ?? [])];
  const k = key || "name";
  const getter = accessors?.[k]
    ? accessors[k]
    : (row) => row?.[k];

  list.sort((a, b) => compareValues(getter(a), getter(b), dir));
  return list;
}

/**
 * Generic table sorting hook.
 * Provide optional accessors when a column's value comes from a derived field
 * (e.g., heapMb || heap, or mapping status labels).
 */
export function useTableSorting(items, key, dir = "asc", accessors = undefined) {
  return useMemo(() => sortList(items, key, dir, accessors), [items, key, dir, accessors]);
}

