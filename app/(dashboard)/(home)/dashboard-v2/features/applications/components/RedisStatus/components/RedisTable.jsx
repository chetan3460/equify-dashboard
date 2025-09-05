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
                className={
                  sortKey === "name"
                    ? ""
                    : "opacity-50 group-hover:opacity-100 transition-opacity"
                }
              />
            </span>
          </TableHead>
          <TableHead
            role="button"
            tabIndex={0}
            onClick={() => {
              setSortKey("host");
              setSortDir((d) => (sortKey === "host" && d === "asc" ? "desc" : "asc"));
            }}
            aria-sort={sortKey === "host" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
            className="cursor-pointer"
          >
            <span className="inline-flex items-center group">
              {columns.host.label}
              <SortArrow dir={sortDir} active={sortKey === "host"} />
            </span>
          </TableHead>
          <TableHead
            role="button"
            tabIndex={0}
            onClick={() => {
              setSortKey("cpu");
              setSortDir((d) => (sortKey === "cpu" && d === "asc" ? "desc" : "asc"));
            }}
            aria-sort={sortKey === "cpu" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
            className="cursor-pointer"
          >
            <span className="inline-flex items-center group">
              {columns.cpu.label}
              <SortArrow dir={sortDir} active={sortKey === "cpu"} />
            </span>
          </TableHead>
          <TableHead
            role="button"
            tabIndex={0}
            onClick={() => {
              setSortKey("memory");
              setSortDir((d) =>
                sortKey === "memory" && d === "asc" ? "desc" : "asc"
              );
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSortKey("memory");
                setSortDir((d) =>
                  sortKey === "memory" && d === "asc" ? "desc" : "asc"
                );
              }
            }}
            aria-sort={
              sortKey === "memory"
                ? sortDir === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
            }
            className="cursor-pointer"
          >
            <span className="inline-flex items-center group">
              {columns.memory.label}
              <SortArrow
                dir={sortDir}
                active={sortKey === "memory"}
                className={
                  sortKey === "memory"
                    ? ""
                    : "opacity-50 group-hover:opacity-100 transition-opacity"
                }
              />
            </span>
          </TableHead>
          <TableHead
            role="button"
            tabIndex={0}
            onClick={() => {
              setSortKey("status");
              setSortDir((d) => (sortKey === "status" && d === "asc" ? "desc" : "asc"));
            }}
            aria-sort={sortKey === "status" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
            className="cursor-pointer"
          >
            <span className="inline-flex items-center group">
              {columns.status.label}
              <SortArrow dir={sortDir} active={sortKey === "status"} />
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.name}>
            <TableCell>{r.name}</TableCell>
            <TableCell>{r.host}</TableCell>
            <TableCell>{r.cpu}</TableCell>
            <TableCell>{r.memory}</TableCell>
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
