// components/shared/SortableHeaderCell.jsx
// Reusable sortable header cell with accessible keyboard handling,
// sticky styling, and unified SortArrow indicator.
//
// Usage:
// <SortableHeaderCell
//   label={columns.name.label}
//   columnKey={columns.name.key}
//   sortKey={sortKey}
//   sortDir={sortDir}
//   setSortKey={setSortKey}
//   setSortDir={setSortDir}
// />

import React from "react";
import { STICKY_HEADER_CELL_CLASS } from "@/lib/table";
// We reuse the existing SortArrow (centralized design)
import SortArrow from "../../applications/components/Kafka/components/SortArrow";

export default function SortableHeaderCell({
  label,
  columnKey,
  sortKey,
  sortDir,
  setSortKey,
  setSortDir,
  sticky = true,
  className = "",
}) {
  const handleClick = () => {
    if (sortKey === columnKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(columnKey);
      setSortDir("asc");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const ariaSort =
    sortKey === columnKey
      ? sortDir === "asc"
        ? "ascending"
        : "descending"
      : "none";

  return (
    <th
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      aria-sort={ariaSort}
      className={`${sticky ? STICKY_HEADER_CELL_CLASS : "cursor-pointer"} ${className}`}
    >
      <span className="inline-flex items-center group">
        {label}
        <SortArrow dir={sortDir} active={sortKey === columnKey} />
      </span>
    </th>
  );
}

