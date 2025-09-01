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

export default function ApplicationsTable({ rows, columns, sortKey, sortDir, setSortKey, setSortDir }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            role="button"
            tabIndex={0}
            onClick={() => {
              setSortKey("name");
              setSortDir((d) => (sortKey === "name" && d === "asc" ? "desc" : "asc"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSortKey("name");
                setSortDir((d) => (sortKey === "name" && d === "asc" ? "desc" : "asc"));
              }
            }}
            aria-sort={sortKey === "name" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
            className="cursor-pointer"
          >
            <span className="inline-flex items-center group">
              {columns.name.label}
              <SortArrow
                dir={sortDir}
                active={sortKey === "name"}
                className={sortKey === "name" ? "" : "opacity-50 group-hover:opacity-100 transition-opacity"}
              />
            </span>
          </TableHead>
          <TableHead>{columns.host.label}</TableHead>
          <TableHead>{columns.cpu.label}</TableHead>
          <TableHead
            role="button"
            tabIndex={0}
            onClick={() => {
              setSortKey("memory");
              setSortDir((d) => (sortKey === "memory" && d === "asc" ? "desc" : "asc"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSortKey("memory");
                setSortDir((d) => (sortKey === "memory" && d === "asc" ? "desc" : "asc"));
              }
            }}
            aria-sort={sortKey === "memory" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
            className="cursor-pointer"
          >
            <span className="inline-flex items-center group">
              {columns.memory.label}
              <SortArrow
                dir={sortDir}
                active={sortKey === "memory"}
                className={sortKey === "memory" ? "" : "opacity-50 group-hover:opacity-100 transition-opacity"}
              />
            </span>
          </TableHead>
          <TableHead>{columns.threads.label}</TableHead>
          <TableHead>{columns.heap.label}</TableHead>
          <TableHead className="text-right">{columns.status.label}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, idx) => (
          <TableRow key={r.name ?? idx}>
            <TableCell className="font-medium">
              <span className="inline-flex items-center gap-1">
                {r.name}
                {r.exceededThreshold && <CriticalBadge />}
              </span>
            </TableCell>
            <TableCell className="text-muted-foreground">{r.host}</TableCell>
            <TableCell>{Number(r.cpu).toFixed(1)}</TableCell>
            <TableCell>{Number(r.memory).toFixed(1)}</TableCell>
            <TableCell>{Number(r.threads).toLocaleString()}</TableCell>
            <TableCell>{Number(r.heap).toFixed(2)}</TableCell>
            <TableCell className="text-right">
              <Badge color={String(r.status).toLowerCase() === "active" ? "success" : "destructive"}>{r.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

