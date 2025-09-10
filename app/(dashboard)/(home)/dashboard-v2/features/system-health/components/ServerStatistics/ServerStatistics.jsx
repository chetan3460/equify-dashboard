"use client";
/*
  Component: ServerStatistics
  Purpose: Sortable table of server metrics (CPU, memory, threads, disk, IO) with export.
  Notes: Sticky header, optional internal scroll, generic sorting, and threshold highlighting.
  Data: ./data (servers).
*/
import React, { useState, useMemo } from "react";
import { useTheme } from "next-themes";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useDragContext } from "@/components/draggable/DragProvider";
import OptionsDropdown from "@/app/(dashboard)/(home)/dashboard-v2/ui/OptionsDropdown";
import { exportCsv } from "@/lib/csv";
import { DragHandleDots16 as DragHandleIcon } from "@/ui/icons";
import { STICKY_HEADER_CLASS, ROW_SCROLL_THRESHOLD } from "@/lib/table";
import { useTableSorting } from "@/lib/sort";
import SortableHeaderCell from "../../../applications/components/shared/SortableHeaderCell";

import { servers as serverData } from "./data";

/* ---------- Helpers ---------- */
const columnLabels = {
  host: "Host",
  cpu: "CPU %",
  memory: "Memory %",
  threads: "Threads",
  disk: "Disk %",
  io: "IO (r/w)",
  exceededThreshold: "Threshold",
};

const getTableKeys = (data) =>
  Array.isArray(data) && data.length
    ? Object.keys(data[0]).filter((k) => k !== "timestamp")
    : ["host", "cpu", "memory", "threads", "disk", "io", "exceededThreshold"];

const sortData = (list, { key, direction }) => {
  if (!key || !list.length) return list;

  return [...list].sort((a, b) => {
    const aVal = a?.[key];
    const bVal = b?.[key];

    const aNum = parseFloat(aVal);
    const bNum = parseFloat(bVal);

    if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
      return direction === "asc" ? aNum - bNum : bNum - aNum;
    }
    return (
      (aVal ?? "").toString().localeCompare((bVal ?? "").toString()) *
      (direction === "asc" ? 1 : -1)
    );
  });
};

const formatCell = (srv, key) => {
  if (key === "exceededThreshold") return srv?.[key] ? "Exceeded" : "OK";
  if (srv?.[key] == null || srv?.[key] === "") return "-";
  if (["cpu", "memory", "disk"].includes(key)) return `${srv[key]}%`;
  return srv[key];
};

/* ---------- Component ---------- */
export default function ServerStatistics({ optionsMenuItems }) {
  const { isGlobalDragMode } = useDragContext();
  const { theme } = useTheme();

  // Kafka-like sorting state
  const [sortKey, setSortKey] = useState("host");
  const [sortDir, setSortDir] = useState("asc");

  const lastUpdated = useMemo(() => {
    const times = (serverData || [])
      .map((s) => Date.parse(s?.timestamp))
      .filter((t) => Number.isFinite(t));
    return times.length
      ? new Date(Math.max(...times)).toLocaleString("en-GB", { hour12: false })
      : "N/A";
  }, []);

  const tableKeys = useMemo(() => getTableKeys(serverData), []);

  // Accessors to align with generic table sorting
  const accessors = useMemo(
    () => ({
      io: (row) => {
        // parse "read/write" as sum for sorting
        if (!row?.io) return null;
        const [r, w] = String(row.io)
          .split("/")
          .map((v) => Number.parseFloat(v.trim()));
        if (Number.isFinite(r) && Number.isFinite(w)) return r + w;
        if (Number.isFinite(r)) return r;
        if (Number.isFinite(w)) return w;
        return null;
      },
      exceededThreshold: (row) => (row?.exceededThreshold ? 1 : 0),
    }),
    []
  );

  const sortedServers = useTableSorting(
    Array.isArray(serverData) ? serverData : [],
    sortKey,
    sortDir,
    accessors
  );

  const wrapperClassName =
    sortedServers.length > ROW_SCROLL_THRESHOLD
      ? "max-h-72 overflow-y-auto"
      : "";

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <CardHeader>
          <CardTitle>API calls by service provider today</CardTitle>
          <CardDescription>Last updated ({lastUpdated})</CardDescription>
        </CardHeader>
        {isGlobalDragMode ? (
          <div className="cursor-grab flex items-center">
            <DragHandleIcon />
          </div>
        ) : (
          <OptionsDropdown
            items={optionsMenuItems}
            onAction={(id) => {
              if (id === "export")
                exportCsv("server-statistics.csv", sortedServers);
            }}
          />
        )}
      </div>

      <div className="overflow-hidden">
        <Table wrapperClassName={wrapperClassName}>
          <TableHeader className={STICKY_HEADER_CLASS}>
            <TableRow>
              {tableKeys.map((key) => (
                <SortableHeaderCell
                  key={key}
                  label={columnLabels[key] || key}
                  columnKey={key}
                  sortKey={sortKey}
                  sortDir={sortDir}
                  setSortKey={setSortKey}
                  setSortDir={setSortDir}
                />
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedServers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={tableKeys.length}
                  className="p-4 text-center"
                >
                  No server rows to display
                </TableCell>
              </TableRow>
            ) : (
              sortedServers.map((srv, idx) => (
                <TableRow key={srv?.host ?? `srv-${idx}`}>
                  {tableKeys.map((key) => (
                    <TableCell
                      key={key}
                      className={
                        key === "exceededThreshold" && srv?.[key]
                          ? "text-destructive"
                          : ""
                      }
                    >
                      {formatCell(srv, key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
