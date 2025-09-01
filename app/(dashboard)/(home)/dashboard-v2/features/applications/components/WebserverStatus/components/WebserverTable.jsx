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

export default function WebserverTable({
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
              setSortKey("service");
              setSortDir((d) =>
                sortKey === "service" && d === "asc" ? "desc" : "asc"
              );
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSortKey("service");
                setSortDir((d) =>
                  sortKey === "service" && d === "asc" ? "desc" : "asc"
                );
              }
            }}
            aria-sort={
              sortKey === "service"
                ? sortDir === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
            }
            className="cursor-pointer"
          >
            <span className="inline-flex items-center group">
              {columns.service.label}
              <SortArrow
                dir={sortDir}
                active={sortKey === "service"}
                className={sortKey === "service" ? "" : ""}
              />
            </span>
          </TableHead>
          <TableHead>{columns.host.label}</TableHead>
          <TableHead>
            <span className="inline-flex items-center group">
              {columns.statusCode.label}
            </span>
          </TableHead>
          <TableHead>{columns.status.label}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.service}>
            <TableCell>{r.service}</TableCell>
            <TableCell>{r.host}</TableCell>
            <TableCell>{r.statusCode}</TableCell>
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
