// components/ApplicationsTable.jsx
// Presentational table for Application nodes with Name/Memory sorting and status badge.

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

export default function ApplicationsTable({
  rows,
  columns,
  sortKey,
  sortDir,
  setSortKey,
  setSortDir,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            role="button"
            tabIndex={0}
            onClick={() => {
              setSortKey("name");
              setSortDir((d) =>
                sortKey === "name" && d === "asc" ? "desc" : "asc"
              );
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSortKey("name");
                setSortDir((d) =>
                  sortKey === "name" && d === "asc" ? "desc" : "asc"
                );
              }
            }}
            aria-sort={
              sortKey === "name"
                ? sortDir === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
            }
            className="cursor-pointer"
          >
            <span className="inline-flex items-center group">
              {columns.name.label}
              <SortArrow
                dir={sortDir}
                active={sortKey === "name"}
                className={sortKey === "name" ? "" : ""}
              />
            </span>
          </TableHead>
          <TableHead>{columns.host.label}</TableHead>
          <TableHead>{columns.cpu.label}</TableHead>
          <TableHead>
            <span className="inline-flex items-center group">
              {columns.memory.label}
            </span>
          </TableHead>
          <TableHead>{columns.threads.label}</TableHead>
          <TableHead>{columns.heap.label}</TableHead>
          <TableHead>{columns.status.label}</TableHead>
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
            <TableCell>{Number(r.cpu).toFixed(1)}</TableCell>
            <TableCell>{Number(r.memory).toFixed(1)}</TableCell>
            <TableCell>{Number(r.threads).toLocaleString()}</TableCell>
            <TableCell>{Number(r.heap).toFixed(2)}</TableCell>
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
