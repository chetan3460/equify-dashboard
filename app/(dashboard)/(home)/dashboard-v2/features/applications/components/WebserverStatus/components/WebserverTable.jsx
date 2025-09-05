// components/WebserverTable.jsx
// Presentational table for Webserver nodes. Sorts by Service and Status code.

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { STICKY_HEADER_CLASS, ROW_SCROLL_THRESHOLD } from "@/lib/table";
import SortableHeaderCell from "../../shared/SortableHeaderCell";
import { getStatusColor } from "@/lib/status";

export default function WebserverTable({
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
          <SortableHeaderCell label={columns.service.label} columnKey={columns.service.key} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.host.label} columnKey={columns.host.key} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.statusCode.label} columnKey={columns.statusCode.key} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.status.label} columnKey={columns.status.key} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.service}>
            <TableCell>{r.service}</TableCell>
            <TableCell>{r.host}</TableCell>
            <TableCell>{Number.isFinite(r.statusCode) ? r.statusCode : "-"}</TableCell>
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
