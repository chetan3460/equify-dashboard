/**
 * Database Status Component
 *
 * This component displays database health and connection metrics
 * Chart Type: Status card with small bar chart showing connection pool usage
 * Dummy Data: Database status, connections, and query performance
 */
"use client";

// Uses ./data for table rows and ./config for labels. Includes a single I/O details panel.

import React from "react";
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
import { cn } from "@/lib/utils";
import { columns } from "./config";
import { databaseData, ioDetails } from "./Data";

function SortArrow({ dir }) {
  return (
    <span aria-hidden className="ml-1 inline-block select-none">
      {dir === "asc" ? "↑" : dir === "desc" ? "↓" : "↕"}
    </span>
  );
}

export default function Database() {
  const [sortDir, setSortDir] = useState("asc");
  const [openKey, setOpenKey] = useState(null); // "mysql" | "clickhouse" | null

  const sorted = useMemo(() => {
    const list = [...databaseData.rows];
    list.sort((a, b) =>
      sortDir === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    return list;
  }, [sortDir]);

  const toggle = (key) => setOpenKey((k) => (k === key ? null : key));

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-lg">Database</CardTitle>
        <div className="text-xs text-muted-foreground">
          Last updated: {databaseData.lastUpdated}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
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
                <TableHead>{columns.connections.label}</TableHead>
                <TableHead className="text-right">
                  {columns.status.label}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((row) => (
                <React.Fragment key={row.key}>
                  <TableRow
                    className={cn(
                      "hover:bg-muted/40",
                      row.exceededThreshold && "bg-red-50/60 dark:bg-red-950/20"
                    )}
                  >
                    <TableCell>
                      <button
                        onClick={() => toggle(row.key)}
                        className="text-primary hover:underline focus:underline outline-none"
                      >
                        {row.name}
                      </button>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.host}
                    </TableCell>
                    <TableCell>{row.cpu.toFixed(2)}</TableCell>
                    <TableCell>{row.memory.toFixed(2)}</TableCell>
                    <TableCell>{row.connections.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          row.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>

                  {openKey === row.key && (
                    <TableRow>
                      <TableCell colSpan={6} className="p-0">
                        <div className="m-4 rounded-md border">
                          <div className="flex items-center justify-between border-b px-4 py-2">
                            <div className="text-sm font-medium">
                              I/O DB details
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Last updated: {ioDetails.lastUpdated}
                            </div>
                          </div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">
                                  No. of records
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {ioDetails.database.map((d) => (
                                <TableRow
                                  key={`${d.type}-${d.name}`}
                                  className={cn(
                                    d.exceededThreshold &&
                                      "bg-red-50/60 dark:bg-red-950/20"
                                  )}
                                >
                                  <TableCell className="text-muted-foreground">
                                    {d.type}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {d.name}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {d.records.toLocaleString()}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
