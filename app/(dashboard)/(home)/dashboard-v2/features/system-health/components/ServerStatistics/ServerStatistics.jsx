"use client";
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
import OptionsDropdown from "@/components/OptionsDropdown";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const SortIcon = ({ active, direction }) => (
  <div
    aria-hidden
    className={`inline-flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-200 ${
      direction === "asc" ? "rotate-180" : "rotate-0"
    } ${
      active
        ? "bg-[#DADAFA] text-primary"
        : "hover:bg-[#DADAFA] hover:text-primary"
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="w-3 h-3"
    >
      <path
        d="M6 1.875V10.125M2.625 6.75L6 10.125L9.375 6.75"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

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

  const [sortConfig, setSortConfig] = useState({
    key: "host",
    direction: "asc",
  });

  const lastUpdated = useMemo(() => {
    const times = (serverData || [])
      .map((s) => Date.parse(s?.timestamp))
      .filter((t) => Number.isFinite(t));
    return times.length
      ? new Date(Math.max(...times)).toLocaleString("en-GB", { hour12: false })
      : "N/A";
  }, []);

  const tableKeys = useMemo(() => getTableKeys(serverData), []);
  const sortedServers = useMemo(
    () => sortData(Array.isArray(serverData) ? serverData : [], sortConfig),
    [sortConfig]
  );

  if (!Array.isArray(serverData)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Server Statistics</CardTitle>
          <CardDescription>Last updated: N/A</CardDescription>
        </CardHeader>
        <div className="p-4 text-sm text-muted-foreground">
          Error: `serverData` is not an array. Check your import path and
          data.js export.
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <CardHeader>
          <CardTitle>API calls by service provider today</CardTitle>
          <CardDescription>Last updated: {lastUpdated}</CardDescription>
        </CardHeader>
        {isGlobalDragMode ? (
          <div className="cursor-grab flex items-center">
            <DragHandleIcon />
          </div>
        ) : (
          <OptionsDropdown items={optionsMenuItems} />
        )}
      </div>

      <div className="h-[200px]">
        <ScrollArea className="h-full">
          <Table>
            <TableHeader>
              <TableRow>
                {tableKeys.map((key) => {
                  const isSortable = ["host", "memory", "cpu"].includes(key);
                  return (
                    <TableHead key={key} className="sticky top-0 z-10 ">
                      {isSortable ? (
                        <button
                          type="button"
                          onClick={() =>
                            setSortConfig((prev) => ({
                              key,
                              direction:
                                prev.key === key && prev.direction === "asc"
                                  ? "desc"
                                  : "asc",
                            }))
                          }
                          className="inline-flex items-center gap-1"
                        >
                          <span>{columnLabels[key] || key}</span>
                          <SortIcon
                            active={sortConfig.key === key}
                            direction={
                              sortConfig.key === key
                                ? sortConfig.direction
                                : "desc"
                            }
                          />
                        </button>
                      ) : (
                        <span>{columnLabels[key] || key}</span>
                      )}
                    </TableHead>
                  );
                })}
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
        </ScrollArea>
      </div>
    </Card>
  );
}
