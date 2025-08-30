"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { columns, topicBatchSize } from "./config";
import { kafkaData } from "./data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { createPortal } from "react-dom";

/* ---------- thresholds ---------- */
const MEMORY_THRESHOLD = 90;
const THREADS_THRESHOLD = 300;

/* ---------- red badge svg ---------- */
function CriticalBadge() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="inline-block ml-1"
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
  );
}

/* ---------- Toast Component ---------- */
function CriticalToast({ node, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(node.name), 5000); // auto-close
    return () => clearTimeout(timer);
  }, [node.name, onClose]);

  return (
    <div className="pointer-events-auto bg-[#FDF6F7] border border-destructive-700 px-3 py-4 rounded-[6px] shadow-md flex flex-col gap-1 w-[360px] max-w-[min(90vw,360px)]">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-base text-default-900 inline-flex items-center gap-1">
          <Image
            src="/icons/system-critical.svg"
            alt=""
            width={32}
            height={32}
            className="shrink-0"
            priority
          />
          System Critical
        </span>
        <button
          onClick={() => onClose(node.name)}
          className="ml-auto  hover:text-red-600 w-3 h-3 flex items-center justify-center"
          aria-label="Dismiss system critical notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <g clip-path="url(#clip0_376_5106)">
              <path
                d="M9.375 2.625L2.625 9.375"
                stroke="black"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.375 9.375L2.625 2.625"
                stroke="black"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_376_5106">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      <div className="text-default-600 text-xs font-normal">
        {node.name}’s memory is at{" "}
        <span className="memory font-medium">{node.memory}% </span>
        with <span className="threads font-medium"> {node.threads} </span>{" "}
        threads
      </div>
      <a
        href="#"
        className="text-primary font-medium  text-xs flex items-center gap-1"
      >
        Take action{" "}
        <span className="flex items-center justify-center w-3 h-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5"
            height="10"
            viewBox="0 0 5 10"
            fill="none"
          >
            <path
              d="M0.5 1.25L4.25 5L0.5 8.75"
              stroke="#4E47E1"
              stroke-width="0.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
  );
}

/* ---------- Toast Container ---------- */
function ToastContainer({ toasts, removeToast }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <div className="fixed top-4 right-6 flex flex-col gap-2 z-[999999] pointer-events-none">
      {toasts.map((node) => (
        <CriticalToast key={node.name} node={node} onClose={removeToast} />
      ))}
    </div>,
    document.body
  );
}

/* ---------- Sort arrow (default down) ---------- */
function SortArrow({ dir = "asc", active = false }) {
  return (
    <div
      aria-hidden
      className={`hover:bg-[#DADAFA] hover:text-primary ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-200 ${
        active ? "text-default-900" : ""
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

/* ---------- Kafka Component ---------- */
export default function Kafka({ optionsMenuItems }) {
  const [sortDir, setSortDir] = useState("asc");
  const [openRow, setOpenRow] = useState(null);
  const [visibleCount, setVisibleCount] = useState(topicBatchSize);
  const [loadingMore, setLoadingMore] = useState(false);

  const [topicSortKey, setTopicSortKey] = useState("topic");
  const [topicSortDir, setTopicSortDir] = useState("asc");

  const sortedRows = useMemo(() => {
    const rows = [...kafkaData.rows];
    rows.sort((a, b) =>
      sortDir === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    return rows;
  }, [sortDir]);

  const activeRow = openRow != null ? sortedRows[openRow] : null;
  const topics = activeRow?.topics ?? [];

  const sortedTopics = useMemo(() => {
    if (!topics || topics.length === 0) return [];
    const list = [...topics];
    list.sort((a, b) => {
      let aVal = a[topicSortKey];
      let bVal = b[topicSortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return topicSortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      aVal = (aVal ?? "").toString().toLowerCase();
      bVal = (bVal ?? "").toString().toLowerCase();
      if (aVal < bVal) return topicSortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return topicSortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [topics, topicSortKey, topicSortDir]);

  /* ---------- Infinite Scroll ---------- */
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
      }, 600);
    }
  }, [loadingMore, visibleCount, sortedTopics.length]);

  useEffect(() => {
    if (openRow != null) setVisibleCount(topicBatchSize);
  }, [openRow]);

  const { isGlobalDragMode } = useDragContext();

  /* ---------- Toast notifications ---------- */
  const criticalNodes = kafkaData.rows.filter(
    (row) => row.memory >= MEMORY_THRESHOLD || row.threads >= THREADS_THRESHOLD
  );

  const [toasts, setToasts] = useState([]);
  const [dismissed, setDismissed] = useState(new Set());

  const removeToast = (name) => {
    setToasts((prev) => prev.filter((t) => t.name !== name));
    setDismissed((prev) => new Set(prev).add(name));
  };

  useEffect(() => {
    criticalNodes.forEach((node) => {
      setToasts((prev) => {
        if (
          prev.some((t) => t.name === node.name) ||
          dismissed.has(node.name)
        ) {
          return prev;
        }
        return [
          ...prev,
          { name: node.name, memory: node.memory, threads: node.threads },
        ];
      });
    });
  }, [criticalNodes, dismissed]);

  return (
    <>
      <Card className="h-full flex flex-col">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>
              Kafka <CriticalBadge />
            </CardTitle>
            <CardDescription>
              Last updated: {kafkaData.lastUpdated}
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
                  <TableHead>{columns.threads.label}</TableHead>
                  <TableHead>{columns.connections.label}</TableHead>
                  <TableHead>{columns.heapMb.label}</TableHead>
                  <TableHead>{columns.health.label}</TableHead>
                  <TableHead className="text-right">
                    {columns.status.label}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRows.map((row, idx) => {
                  const exceededRow =
                    row?.exceededThreshold ||
                    (typeof row?.memory === "number" &&
                      row.memory >= MEMORY_THRESHOLD) ||
                    (typeof row?.threads === "number" &&
                      row.threads >= THREADS_THRESHOLD);

                  return (
                    <TableRow
                      key={row?.name ?? idx}
                      className={cn(
                        "hover:bg-muted/40",
                        exceededRow &&
                          "bg-destructive-foreground/10 dark:bg-red-950/20"
                      )}
                    >
                      <TableCell>
                        <button
                          onClick={() => setOpenRow(idx)}
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          {row.name}
                          {row.memory >= MEMORY_THRESHOLD ||
                          row.threads >= THREADS_THRESHOLD ? (
                            <CriticalBadge />
                          ) : null}
                        </button>
                      </TableCell>
                      <TableCell>{row.host}</TableCell>
                      <TableCell>{row.cpu.toFixed(2)}</TableCell>
                      <TableCell
                        className={cn(
                          row.memory >= MEMORY_THRESHOLD &&
                            "text-red-600 font-bold"
                        )}
                      >
                        {row.memory.toFixed(2)}
                      </TableCell>
                      <TableCell
                        className={cn(
                          row.threads >= THREADS_THRESHOLD &&
                            "text-red-600 font-bold"
                        )}
                      >
                        {row.threads.toLocaleString()}
                      </TableCell>
                      <TableCell>{row.connections.toLocaleString()}</TableCell>
                      <TableCell>
                        {row.heapMb?.toLocaleString?.() ?? "N/A"}
                      </TableCell>
                      <TableCell>{row.topicHealth}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={cn(
                            "px-2 py-1 rounded text-xs font-medium",
                            row.status.toLowerCase() === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          )}
                        >
                          {row.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Dialog */}
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
                <TableHeader className="sticky top-0 z-10 bg-primary/10">
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
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setTopicSortKey("topic");
                          setTopicSortDir((d) =>
                            topicSortKey === "topic" && d === "asc"
                              ? "desc"
                              : "asc"
                          );
                        }
                      }}
                      className="cursor-pointer"
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
                      <TableCell>{t?.topic ?? "-"}</TableCell>
                      <TableCell className="text-right">
                        {t?.messages?.toLocaleString?.() ?? "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
