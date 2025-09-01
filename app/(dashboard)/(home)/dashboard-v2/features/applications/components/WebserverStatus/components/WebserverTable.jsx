// components/WebserverTable.jsx
// Presentational table for Webserver nodes. Sorts by Service and Status code.

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

export default function WebserverTable({ rows, columns, sortKey, sortDir, setSortKey, setSortDir }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            role="button"
            tabIndex={0}
            onClick={() => {
              setSortKey("service");
              setSortDir((d) => (sortKey === "service" && d === "asc" ? "desc" : "asc"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSortKey("service");
                setSortDir((d) => (sortKey === "service" && d === "asc" ? "desc" : "asc"));
              }
            }}
            aria-sort={sortKey === "service" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
            className="cursor-pointer"
          >
            <span className="inline-flex items-center group">
              {columns.service.label}
              <SortArrow
                dir={sortDir}
                active={sortKey === "service"}
                className={sortKey === "service" ? "" : "opacity-50 group-hover:opacity-100 transition-opacity"}
              />
            </span>
          </TableHead>
          <TableHead>{columns.host.label}</TableHead>
          <TableHead
            role="button"
            tabIndex={0}
            onClick={() => {
              setSortKey("statusCode");
              setSortDir((d) => (sortKey === "statusCode" && d === "asc" ? "desc" : "asc"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSortKey("statusCode");
                setSortDir((d) => (sortKey === "statusCode" && d === "asc" ? "desc" : "asc"));
              }
            }}
            aria-sort={sortKey === "statusCode" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
            className="cursor-pointer"
          >
            <span className="inline-flex items-center group">
              {columns.statusCode.label}
              <SortArrow
                dir={sortDir}
                active={sortKey === "statusCode"}
                className={sortKey === "statusCode" ? "" : "opacity-50 group-hover:opacity-100 transition-opacity"}
              />
            </span>
          </TableHead>
          <TableHead className="text-right">{columns.status.label}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.service}>
            <TableCell className="font-medium">{r.service}</TableCell>
            <TableCell className="text-muted-foreground">{r.host}</TableCell>
            <TableCell>{r.statusCode}</TableCell>
            <TableCell className="text-right">
              <Badge color={String(r.status).toLowerCase() === "active" ? "success" : "destructive"}>{r.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

