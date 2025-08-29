"use client";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useDragContext } from "@/components/draggable/DragProvider";
import OptionsDropdown from "@/components/OptionsDropdown";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";
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
import { columns as configColumns, topicBatchSize } from "./config";
import { kafkaData } from "./data";

/* ---------- thresholds ---------- */
const MEMORY_THRESHOLD = 90.6;
const THREADS_THRESHOLD = 1000;

/* ---------- fallback labels ---------- */
const FALLBACK_LABELS = {
  name: "Name",
  host: "Host",
  cpu: "CPU %",
  memory: "Memory %",
  threads: "Threads",
  connections: "Connections",
  heapMb: "Heap (MB)",
  heap: "Heap (MB)",
  topicHealth: "Topic Health",
  status: "Status",
};

/* ---------- helpers ---------- */
const getLabel = (key) =>
  (configColumns && (configColumns[key]?.label ?? configColumns[key])) ??
  FALLBACK_LABELS[key] ??
  key;

const toNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
};

/* ---------- Sort arrow (default down) ---------- */
function SortArrow({ dir = "asc", active = false }) {
  return (
    <div
      aria-hidden
      className={`ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-200 ${
        active
          ? "bg-[#DADAFA] text-primary"
          : "hover:bg-[#DADAFA] hover:text-primary"
      } ${dir === "asc" ? "rotate-0" : "rotate-180"}`}
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
}

/* ---------- Alert badge SVG ---------- */
function AlertBadge({ title }) {
  return (
    <span title={title} className="inline-flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className="ml-1"
      >
        <path
          d="M6 11C8.75 11 11 8.75 11 6C11 3.25 8.75 1 6 1C3.25 1 1 3.25 1 6C1 8.75 3.25 11 6 11Z"
          fill="#E14761"
          fillOpacity="0.3"
          stroke="#E14761"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 4V6.5"
          stroke="#B12F00"
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.99609 8H6.00058"
          stroke="#B12F00"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* ---------- Component ---------- */
export default function Kafka({ optionsMenuItems }) {
  const [sortDir, setSortDir] = useState("asc");
  const [topicSortKey, setTopicSortKey] = useState("topic");
  const [topicSortDir, setTopicSortDir] = useState("asc");
  const [openRow, setOpenRow] = useState(null);
  const [visibleCount, setVisibleCount] = useState(topicBatchSize);
  const [loadingMore, setLoadingMore] = useState(false);

  /* rows */
  const sourceRows = useMemo(() => {
    if (Array.isArray(kafkaData?.kafka)) return kafkaData.kafka;
    if (Array.isArray(kafkaData?.rows)) return kafkaData.rows;
    return [];
  }, []);

  const sortedRows = useMemo(() => {
    const rows = [...sourceRows];
    rows.sort((a, b) => {
      const aName = String(a?.name ?? "");
      const bName = String(b?.name ?? "");
      return sortDir === "asc"
        ? aName.localeCompare(bName)
        : bName.localeCompare(aName);
    });
    return rows;
  }, [sourceRows, sortDir]);

  const activeRow =
    openRow != null && sortedRows[openRow] ? sortedRows[openRow] : null;
  const topics = Array.isArray(activeRow?.topics) ? activeRow.topics : [];

  const sortedTopics = useMemo(() => {
    if (!topics.length) return [];
    const list = [...topics];
    list.sort((a, b) => {
      const aVal = a?.[topicSortKey];
      const bVal = b?.[topicSortKey];
      const aNum = toNumber(aVal);
      const bNum = toNumber(bVal);
      if (Number.isFinite(aNum) && Number.isFinite(bNum)) {
        return topicSortDir === "asc" ? aNum - bNum : bNum - aNum;
      }
      const aStr = (aVal ?? "").toString().toLowerCase();
      const bStr = (bVal ?? "").toString().toLowerCase();
      return topicSortDir === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
    return list;
  }, [topics, topicSortKey, topicSortDir]);

  const listRef = useRef(null);
  const onScroll = useCallback(() => {
    const el = listRef.current;
    if (!el || loadingMore) return;
    const threshold = 56;
    const nearBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
    if (nearBottom && visibleCount < sortedTopics.length) {
      setLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((c) =>
          Math.min(c + topicBatchSize, sortedTopics.length)
        );
        setLoadingMore(false);
      }, 400);
    }
  }, [loadingMore, visibleCount, sortedTopics.length]);

  useEffect(() => {
    setVisibleCount(topicBatchSize);
  }, [activeRow]);

  const { isGlobalDragMode } = useDragContext();

  /* --- global threshold exceeded? (for header badge) --- */
  const exceededGlobal = sortedRows.some((row) => {
    const memoryNum = toNumber(row?.memory);
    const threadsNum = toNumber(row?.threads);
    return (
      row?.exceededThreshold ||
      (Number.isFinite(memoryNum) && memoryNum >= MEMORY_THRESHOLD) ||
      (Number.isFinite(threadsNum) && threadsNum >= THREADS_THRESHOLD)
    );
  });

  if (!Array.isArray(sourceRows) || sourceRows.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Kafka</CardTitle>
          <CardDescription>
            Last updated: {kafkaData?.lastUpdated ?? "--:--:--"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-muted-foreground">
            No Kafka data available.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            Kafka {exceededGlobal && <AlertBadge title="Threshold exceeded" />}
          </CardTitle>
          <CardDescription>
            Last updated: {kafkaData?.lastUpdated ?? "--:--:--"}
          </CardDescription>
        </CardHeader>

        <div className="flex items-center gap-2">
          {isGlobalDragMode ? (
            <div className="cursor-grab flex items-center">
              <DragHandleIcon />
            </div>
          ) : (
            <OptionsDropdown items={optionsMenuItems} />
          )}
        </div>
      </div>

      <CardContent>
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    setSortDir((d) => (d === "asc" ? "desc" : "asc"))
                  }
                  aria-sort={sortDir === "asc" ? "ascending" : "descending"}
                  className="cursor-pointer flex items-center gap-1"
                >
                  {getLabel("name")} <SortArrow dir={sortDir} active />
                </TableHead>
                <TableHead>{getLabel("host")}</TableHead>
                <TableHead>{getLabel("cpu")}</TableHead>
                <TableHead>{getLabel("memory")}</TableHead>
                <TableHead>{getLabel("threads")}</TableHead>
                <TableHead>{getLabel("connections")}</TableHead>
                <TableHead>{getLabel("heapMb") ?? getLabel("heap")}</TableHead>
                <TableHead>{getLabel("topicHealth")}</TableHead>
                <TableHead className="text-right">
                  {getLabel("status")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedRows.map((row, idx) => {
                const heapVal = row?.heapMb ?? row?.heap ?? null;
                const memoryNum = toNumber(row?.memory);
                const threadsNum = toNumber(row?.threads);
                const statusStr = (row?.status ?? "").toString();
                const statusActive = statusStr.toLowerCase() === "active";

                const exceededMemory =
                  Number.isFinite(memoryNum) && memoryNum >= MEMORY_THRESHOLD;
                const exceededThreads =
                  Number.isFinite(threadsNum) &&
                  threadsNum >= THREADS_THRESHOLD;
                const exceededRow =
                  row?.exceededThreshold || exceededMemory || exceededThreads;

                return (
                  <TableRow
                    key={row?.name ?? idx}
                    className={cn(
                      "hover:bg-muted/40",
                      exceededRow &&
                        "bg-destructive-foreground/10 dark:bg-red-950/20"
                    )}
                  >
                    {/* ---- Name ---- */}
                    <TableCell>
                      <button
                        onClick={() => setOpenRow(idx)}
                        className="text-primary hover:underline outline-none flex items-center gap-1"
                      >
                        {row?.name ?? "-"}
                        {(exceededMemory || exceededThreads) && <AlertBadge />}
                      </button>
                    </TableCell>

                    {/* ---- Host ---- */}
                    <TableCell>{row?.host ?? "-"}</TableCell>

                    {/* ---- CPU ---- */}
                    <TableCell>
                      {Number.isFinite(toNumber(row?.cpu))
                        ? Number(toNumber(row?.cpu)).toFixed(2)
                        : "-"}
                    </TableCell>

                    {/* ---- Memory ---- */}
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span
                          className={
                            exceededMemory
                              ? "text-destructive font-semibold"
                              : ""
                          }
                        >
                          {Number.isFinite(memoryNum)
                            ? memoryNum.toFixed(2)
                            : "-"}
                        </span>
                        {exceededMemory && <AlertBadge />}
                      </div>
                    </TableCell>

                    {/* ---- Threads ---- */}
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span
                          className={
                            exceededThreads
                              ? "text-destructive font-semibold"
                              : ""
                          }
                        >
                          {Number.isFinite(threadsNum)
                            ? threadsNum.toLocaleString()
                            : "-"}
                        </span>
                        {exceededThreads && <AlertBadge />}
                      </div>
                    </TableCell>

                    {/* ---- Connections ---- */}
                    <TableCell>
                      {Number.isFinite(toNumber(row?.connections))
                        ? toNumber(row?.connections).toLocaleString()
                        : "-"}
                    </TableCell>

                    {/* ---- Heap ---- */}
                    <TableCell>
                      {Number.isFinite(toNumber(heapVal))
                        ? toNumber(heapVal).toLocaleString()
                        : "-"}
                    </TableCell>

                    {/* ---- Topic Health ---- */}
                    <TableCell>{row?.topicHealth ?? "-"}</TableCell>

                    {/* ---- Status ---- */}
                    <TableCell className="text-right">
                      <Badge color={statusActive ? "success" : "destructive"}>
                        {row?.status ?? "-"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* ---- Dialog ---- */}
      <Dialog open={openRow != null} onOpenChange={() => setOpenRow(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {activeRow ? `${activeRow.name} Details` : "Details"}
            </DialogTitle>
          </DialogHeader>

          {!topics || topics.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No topics available for this Kafka node.
            </div>
          ) : (
            <div
              ref={listRef}
              onScroll={onScroll}
              className="max-h-[420px] overflow-auto"
            >
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-primary/10 rounded-[3px]">
                  <TableRow>
                    <TableHead
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setTopicSortKey("topic");
                        setTopicSortDir((d) =>
                          topicSortKey === "topic" && d === "asc"
                            ? "desc"
                            : "asc"
                        );
                      }}
                      className="cursor-pointer"
                      aria-sort={
                        topicSortKey === "topic"
                          ? topicSortDir === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                    >
                      <span className="inline-flex items-center">
                        Topic{" "}
                        <SortArrow
                          dir={topicSortDir}
                          active={topicSortKey === "topic"}
                        />
                      </span>
                    </TableHead>
                    <TableHead className="text-right">
                      No. of messages
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {sortedTopics.slice(0, visibleCount).map((t) => (
                    <TableRow key={t?.topic ?? Math.random()}>
                      <TableCell className="font-normal">
                        {t?.topic ?? "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        {Number.isFinite(toNumber(t?.messages))
                          ? toNumber(t?.messages).toLocaleString()
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {loadingMore && (
                <div className="flex items-center justify-center py-4">
                  <img
                    src="/images/kafka-spinner.png"
                    width={20}
                    height={20}
                    alt="Loading more topics"
                  />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
