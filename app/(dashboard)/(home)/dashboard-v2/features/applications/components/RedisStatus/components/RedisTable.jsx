// components/RedisTable.jsx
// Presentational table for Redis nodes with Name/Memory sorting and status badge.

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { STICKY_HEADER_CLASS, ROW_SCROLL_THRESHOLD } from "@/lib/table";
import SortableHeaderCell from "../../shared/SortableHeaderCell";
import { formatFixed } from "@/lib/format";
import { getStatusColor } from "@/lib/status";

export default function RedisTable({
  rows,
  columns,
  sortKey,
  sortDir,
  setSortKey,
  setSortDir,
}) {
  return (
    <Table wrapperClassName={rows.length > ROW_SCROLL_THRESHOLD ? "max-h-72 overflow-y-auto" : ""}>
      <TableHeader className={STICKY_HEADER_CLASS}>
        <TableRow>
          <SortableHeaderCell label={columns.name.label} columnKey={columns.name.key} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.host.label} columnKey={columns.host.key} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.cpu.label} columnKey={columns.cpu.key} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.memory.label} columnKey={columns.memory.key} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.status.label} columnKey={columns.status.key} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.name}>
            <TableCell>{r.name}</TableCell>
            <TableCell>{r.host}</TableCell>
            <TableCell>{formatFixed(r.cpu, 2)}</TableCell>
            <TableCell>{formatFixed(r.memory, 2)}</TableCell>
            <TableCell>
              <Badge color={getStatusColor(r.status)}>
                {r.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
