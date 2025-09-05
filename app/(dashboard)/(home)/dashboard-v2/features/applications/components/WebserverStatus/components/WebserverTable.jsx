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
      <span className="inline-flex items-center group">
        {label}
        <SortArrow dir={sortDir} active={sortKey === key} />
      </span>
    </TableHead>
  );

  return (
    <Table wrapperClassName={rows.length > 6 ? "max-h-72 overflow-y-auto" : ""}>
<TableHeader className="sticky top-0 z-10 !bg-[#DADAFA]">
        <TableRow>
          {renderHeader(columns.service.label, columns.service.key)}
          {renderHeader(columns.host.label, columns.host.key)}
          {renderHeader(columns.statusCode.label, columns.statusCode.key)}
          {renderHeader(columns.status.label, columns.status.key)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.service}>
            <TableCell>{r.service}</TableCell>
            <TableCell>{r.host}</TableCell>
            <TableCell>{Number.isFinite(r.statusCode) ? r.statusCode : "-"}</TableCell>
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
