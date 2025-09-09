// components/DatabaseTable.jsx
// Presentational table for Database nodes, including inline I/O details section.

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { STICKY_HEADER_CLASS, ROW_SCROLL_THRESHOLD } from "@/lib/table";
import SortableHeaderCell from "../../shared/SortableHeaderCell";
import CriticalBadge from "../../shared/CriticalBadge";
import { formatFixed, formatInteger } from "@/lib/format";
import { getStatusColor } from "@/lib/status";
import { cn } from "@/lib/utils";
import IODetailsTable from "./IODetailsTable";

export default function DatabaseTable({
  rows,
  sortKey,
  sortDir,
  setSortKey,
  setSortDir,
  columns,
  openKey,
  onToggleRow,
  ioDetails,
}) {

  return (
    <Table wrapperClassName={rows.length > ROW_SCROLL_THRESHOLD ? "max-h-72 overflow-y-auto" : ""}>
      <TableHeader className={STICKY_HEADER_CLASS}>
        <TableRow>
<SortableHeaderCell label={columns.name.label} columnKey={columns.name.key} preferredFirstDir={columns.name.preferredFirstDir} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
<SortableHeaderCell label={columns.host.label} columnKey={columns.host.key} preferredFirstDir={columns.host.preferredFirstDir} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
<SortableHeaderCell label={columns.cpu.label} columnKey={columns.cpu.key} preferredFirstDir={columns.cpu.preferredFirstDir} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
<SortableHeaderCell label={columns.memory.label} columnKey={columns.memory.key} preferredFirstDir={columns.memory.preferredFirstDir} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
<SortableHeaderCell label={columns.connections.label} columnKey={columns.connections.key} preferredFirstDir={columns.connections.preferredFirstDir} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
<SortableHeaderCell label={columns.status.label} columnKey={columns.status.key} preferredFirstDir={columns.status.preferredFirstDir} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <React.Fragment key={row.name}>
            <TableRow
              className={cn(
                "hover:bg-muted/40",
                row.exceededThreshold &&
                  "bg-destructive-foreground/10 dark:bg-red-950/20"
              )}
            >
              <TableCell>
                <button
                  onClick={() => onToggleRow(row.name)}
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  {row.name}
                  {row.exceededThreshold && <CriticalBadge />}
                </button>
              </TableCell>
              <TableCell className="text-default-900">{row.host}</TableCell>
              <TableCell>{formatFixed(row.cpu, 2)}</TableCell>
              <TableCell>{formatFixed(row.memory, 2)}</TableCell>
              <TableCell>{formatInteger(row.connections)}</TableCell>
              <TableCell>
                <Badge className="capitalize" color={getStatusColor(row.status)}>
                  {row.status}
                </Badge>
              </TableCell>
            </TableRow>

            {openKey === row.name && (
              <TableRow>
                <TableCell colSpan={6} className="p-0">
                  <IODetailsTable ioDetails={ioDetails} />
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
