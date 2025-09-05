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
  sortKey,
  sortDir,
  setSortKey,
  setSortDir,
  columns,
  openKey,
  onToggleRow,
  ioDetails,
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
      <span className="inline-flex items-center">
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
          {renderHeader(columns.connections.label, columns.connections.key)}
          {renderHeader(columns.status.label, columns.status.key)}
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
