// components/DatabaseTable.jsx
// Presentational table for Database nodes, including inline I/O details section.

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
import CriticalBadge from "../../shared/CriticalBadge";
import { cn } from "@/lib/utils";
import IODetailsTable from "./IODetailsTable";

export default function DatabaseTable({
  rows,
  sortDir,
  setSortDir,
  columns,
  openKey,
  onToggleRow,
  ioDetails,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            role="button"
            tabIndex={0}
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSortDir((d) => (d === "asc" ? "desc" : "asc"));
              }
            }}
            aria-sort={sortDir === "asc" ? "ascending" : "descending"}
            className="cursor-pointer"
          >
            <span className="inline-flex items-center">
              {columns.name.label} <SortArrow dir={sortDir} active />
            </span>
          </TableHead>
          <TableHead>{columns.host.label}</TableHead>
          <TableHead>{columns.cpu.label}</TableHead>
          <TableHead>{columns.memory.label}</TableHead>
          <TableHead>{columns.connections.label}</TableHead>
          <TableHead>{columns.status.label}</TableHead>
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
              <TableCell>{Number(row.cpu).toFixed(2)}</TableCell>
              <TableCell>{Number(row.memory).toFixed(2)}</TableCell>
              <TableCell>{Number(row.connections).toLocaleString()}</TableCell>
              <TableCell>
                <Badge
                  className="capitalize"
                  color={
                    String(row.status).toLowerCase() === "active"
                      ? "success"
                      : "destructive"
                  }
                >
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
