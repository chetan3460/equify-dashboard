// components/ApplicationsTable.jsx
// Presentational table for Application nodes with Name/Memory sorting and status badge.

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { STICKY_HEADER_CLASS } from "@/lib/table";
import { formatFixed, formatInteger } from "@/lib/format";
import { getStatusColor } from "@/lib/status";
import SortableHeaderCell from "../../shared/SortableHeaderCell";
import CriticalBadge from "../../shared/CriticalBadge";

export default function ApplicationsTable({
  rows,
  columns,
  sortKey,
  sortDir,
  setSortKey,
  setSortDir,
  disableInternalScroll = false,
}) {
  return (
    <Table wrapperClassName={!disableInternalScroll && rows.length > 6 ? "max-h-72 overflow-y-auto" : ""}>
      <TableHeader className={STICKY_HEADER_CLASS}>
        <TableRow>
          <SortableHeaderCell
            label={columns.name.label}
            columnKey={columns.name.key}
            sortKey={sortKey}
            sortDir={sortDir}
            setSortKey={setSortKey}
            setSortDir={setSortDir}
          />
          <SortableHeaderCell
            label={columns.host.label}
            columnKey={columns.host.key}
            sortKey={sortKey}
            sortDir={sortDir}
            setSortKey={setSortKey}
            setSortDir={setSortDir}
          />
          <SortableHeaderCell
            label={columns.cpu.label}
            columnKey={columns.cpu.key}
            sortKey={sortKey}
            sortDir={sortDir}
            setSortKey={setSortKey}
            setSortDir={setSortDir}
          />
          <SortableHeaderCell
            label={columns.memory.label}
            columnKey={columns.memory.key}
            sortKey={sortKey}
            sortDir={sortDir}
            setSortKey={setSortKey}
            setSortDir={setSortDir}
          />
          <SortableHeaderCell
            label={columns.threads.label}
            columnKey={columns.threads.key}
            sortKey={sortKey}
            sortDir={sortDir}
            setSortKey={setSortKey}
            setSortDir={setSortDir}
          />
          <SortableHeaderCell
            label={columns.heap.label}
            columnKey={columns.heap.key}
            sortKey={sortKey}
            sortDir={sortDir}
            setSortKey={setSortKey}
            setSortDir={setSortDir}
          />
          <SortableHeaderCell
            label={columns.status.label}
            columnKey={columns.status.key}
            sortKey={sortKey}
            sortDir={sortDir}
            setSortKey={setSortKey}
            setSortDir={setSortDir}
          />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, idx) => (
          <TableRow key={r.name ?? idx}>
            <TableCell>
              <span className="inline-flex items-center gap-1">
                {r.name}
                {r.exceededThreshold && <CriticalBadge />}
              </span>
            </TableCell>
            <TableCell>{r.host}</TableCell>
            <TableCell>{formatFixed(r.cpu, 1)}</TableCell>
            <TableCell>{formatFixed(r.memory, 1)}</TableCell>
            <TableCell>{formatInteger(r.threads)}</TableCell>
            <TableCell>{formatFixed(r.heap, 2)}</TableCell>
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
