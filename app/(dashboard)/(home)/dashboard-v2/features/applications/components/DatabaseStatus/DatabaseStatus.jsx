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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDragContext } from "@/components/draggable/DragProvider";
import OptionsDropdown from "@/components/OptionsDropdown";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";
import CriticalBadge from "../Kafka/components/CriticalBadge";
import SortArrow from "../Kafka/components/SortArrow";
import { cn } from "@/lib/utils";
import { columns } from "./config";
import { databaseData, ioDetails } from "./Data";

const OUTPUT_DB_RECORDS_CRITICAL = 300000;

export default function Database() {
  const [sortDir, setSortDir] = useState("asc");
  const [openKey, setOpenKey] = useState(null); // "mysql" | "clickhouse" | null
  const { isGlobalDragMode } = useDragContext();

  const sorted = useMemo(() => {
    const list = [...(databaseData.database ?? [])];
    list.sort((a, b) =>
      sortDir === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    return list;
  }, [sortDir]);

  const toggle = (key) => setOpenKey((k) => (k === key ? null : key));

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Database</CardTitle>
          <CardDescription>
            Last updated: {databaseData.lastUpdated}
          </CardDescription>
        </CardHeader>
        <div className="flex items-center gap-2">
          {isGlobalDragMode ? (
            <div className="cursor-grab flex items-center">
              <DragHandleIcon />
            </div>
          ) : (
            <OptionsDropdown />
          )}
        </div>
      </div>
      <CardContent>
        <div className="overflow-hidden ">
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
                  <span className="inline-flex items-center">
                    {columns.name.label} <SortArrow dir={sortDir} active />
                  </span>
                </TableHead>
                <TableHead>{columns.host.label}</TableHead>
                <TableHead>{columns.cpu.label}</TableHead>
                <TableHead>{columns.memory.label}</TableHead>
                <TableHead>{columns.connections.label}</TableHead>
                <TableHead className="text-left">
                  {columns.status.label}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((row) => (
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
                        onClick={() => toggle(row.name)}
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        {row.name}
                        {row.exceededThreshold && <CriticalBadge />}
                      </button>
                    </TableCell>
                    <TableCell className="text-default-900">
                      {row.host}
                    </TableCell>
                    <TableCell>{row.cpu.toFixed(2)}</TableCell>
                    <TableCell>{row.memory.toFixed(2)}</TableCell>
                    <TableCell>{row.connections.toLocaleString()}</TableCell>
                    <TableCell className="text-left">
                      <Badge
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
                        <div className="bg-[#DDDCF933]">
                          {(() => {
                            const ioCritical = ioDetails.database.some(
                              (d) =>
                                d.type === "Output DB" &&
                                Number(d.records) >= OUTPUT_DB_RECORDS_CRITICAL
                            );
                            return (
                              <div className="flex items-start flex-col  px-4 py-3 gap-1">
                                <div className="text-xs font-medium flex items-center">
                                  I/O DB details
                                  {ioCritical && (
                                    <CriticalBadge className="ml-1" />
                                  )}
                                </div>
                                <div className="text-xs text-default-600">
                                  Last updated: {ioDetails.lastUpdated}
                                </div>
                              </div>
                            );
                          })()}
                          <Table>
                            <TableHeader className="bg-[#F2F2FF] dark:bg-card rounded-[3px]">
                              <TableRow>
                                <TableHead className="p-3">Type</TableHead>
                                <TableHead className="p-3">Name</TableHead>
                                <TableHead className="p-3 text-right">
                                  No. of records
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {ioDetails.database.map((d) => {
                                const isCritical =
                                  d.type === "Output DB" &&
                                  Number(d.records) >=
                                    OUTPUT_DB_RECORDS_CRITICAL;
                                return (
                                  <TableRow
                                    key={`${d.type}-${d.name}`}
                                    className={cn(
                                      isCritical &&
                                        "bg-destructive-foreground/10 dark:bg-red-950/20"
                                    )}
                                  >
                                    <TableCell className="text-default-900">
                                      <span className="inline-flex items-center">
                                        {d.type}
                                        {isCritical && (
                                          <CriticalBadge className="ml-1" />
                                        )}
                                      </span>
                                    </TableCell>
                                    <TableCell className="font-normal">
                                      {d.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {d.records.toLocaleString()}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
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
