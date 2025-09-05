// components/RedisTable.jsx
// Presentational table for Redis nodes with Name/Memory sorting and status badge.

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SortArrow from "../../Kafka/components/SortArrow";

export default function RedisTable({
  rows,
  columns,
  sortKey,
  sortDir,
  setSortKey,
  setSortDir,
}) {
  const handleHeaderClick = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const onHeaderKeyDown = (e, key) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleHeaderClick(key);
    }
  };

  const ariaFor = (key) =>
    sortKey === key ? (sortDir === "asc" ? "ascending" : "descending") : "none";

  const renderHeader = (label, key) => (
    <TableHead
      role="button"
      tabIndex={0}
      onClick={() => handleHeaderClick(key)}
      onKeyDown={(e) => onHeaderKeyDown(e, key)}
      aria-sort={ariaFor(key)}
className="cursor-pointer sticky top-0 z-10 bg-[#DADAFA]"
    >
      <span className="inline-flex items-center group">
        {label}
        <SortArrow dir={sortDir} active={sortKey === key} />
      </span>
    </TableHead>
  );

  return (
    <Table wrapperClassName={rows.length > 6 ? "max-h-72 overflow-y-auto" : ""}>
<TableHeader className="sticky top-0 z-10 !bg-[#DADAFA]">
        <TableRow>
          {renderHeader(columns.name.label, columns.name.key)}
          {renderHeader(columns.host.label, columns.host.key)}
          {renderHeader(columns.cpu.label, columns.cpu.key)}
          {renderHeader(columns.memory.label, columns.memory.key)}
          {renderHeader(columns.status.label, columns.status.key)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.name}>
            <TableCell>{r.name}</TableCell>
            <TableCell>{r.host}</TableCell>
            <TableCell>{Number.isFinite(r.cpu) ? Number(r.cpu).toFixed(2) : "-"}</TableCell>
            <TableCell>{Number.isFinite(r.memory) ? Number(r.memory).toFixed(2) : "-"}</TableCell>
            <TableCell>
              <Badge
                color={
                  String(r.status).toLowerCase() === "active"
                    ? "success"
                    : "destructive"
                }
              >
                {r.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
