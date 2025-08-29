/**
 * Redis Status Component
 *
 * This component displays Redis cache health and performance metrics
 * Chart Type: Status card with small line chart showing cache hit rate
 * Dummy Data: Redis status, memory usage, and cache performance
 */
"use client";
import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./config";
import { redisData } from "./data";

function SortArrow({ dir }) {
  return (
    <span aria-hidden className="ml-1 inline-block select-none">
      {dir === "asc" ? "↑" : "↓"}
    </span>
  );
}

export default function Redis() {
  const [sortDir, setSortDir] = useState("asc");
  const rows = useMemo(() => {
    const list = [...redisData.redis];
    list.sort((a, b) =>
      sortDir === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    return list;
  }, [sortDir]);

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-lg">Redis</CardTitle>
        <div className="text-xs text-muted-foreground">
          Last updated: {redisData.lastUpdated}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    setSortDir((d) => (d === "asc" ? "desc" : "asc"))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
                    }
                  }}
                  aria-sort={sortDir === "asc" ? "ascending" : "descending"}
                  className="cursor-pointer"
                >
                  {columns.name.label} <SortArrow dir={sortDir} />
                </TableHead>
                <TableHead>{columns.host.label}</TableHead>
                <TableHead>{columns.cpu.label}</TableHead>
                <TableHead>{columns.memory.label}</TableHead>
                <TableHead className="text-right">
                  {columns.status.label}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.name}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {r.host}
                  </TableCell>
                  <TableCell>{r.cpu}</TableCell>
                  <TableCell>{r.memory}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={r.status === "active" ? "default" : "secondary"}
                    >
                      {r.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
