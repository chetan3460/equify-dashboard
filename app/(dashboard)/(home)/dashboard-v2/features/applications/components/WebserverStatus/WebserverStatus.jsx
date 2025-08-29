/**
 * Webserver Status Component
 *
 * This component displays web server health and request metrics
 * Chart Type: Status card with small line chart showing request rate
 * Dummy Data: Webserver status, request rate, and response times
 */
"use client";
import { useMemo, useState } from "react";
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
import { webservers } from "./data";

export default function Webserver() {
  const [sortDir, setSortDir] = useState("asc");
  const rows = useMemo(() => {
    const list = [...webservers.rows];
    list.sort((a, b) =>
      sortDir === "asc"
        ? a.service.localeCompare(b.service)
        : b.service.localeCompare(a.service)
    );
    return list;
  }, [sortDir]);

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-lg">Webserver</CardTitle>
        <div className="text-xs text-muted-foreground">
          Last updated: {webservers.lastUpdated}
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
                  {columns.service.label}{" "}
                  <span aria-hidden className="ml-1">
                    {sortDir === "asc" ? "↑" : "↓"}
                  </span>
                </TableHead>
                <TableHead>{columns.host.label}</TableHead>
                <TableHead>{columns.statusCode.label}</TableHead>
                <TableHead className="text-right">
                  {columns.status.label}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.service}>
                  <TableCell className="font-medium">{r.service}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {r.host}
                  </TableCell>
                  <TableCell>{r.statusCode}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={r.status === "Active" ? "default" : "secondary"}
                    >
                      {r.status}
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
