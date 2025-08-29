/**
 * Kafka Status Component
 */
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
import { columns, topicBatchSize } from "./config";
import { kafkaData } from "./data";

function SortArrow({ dir, active }) {
  return (
    <div
      aria-hidden
      className={`hover:bg-[#DADAFA] hover:text-primary inline-flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-200
        ${active ? "text-primary" : "hover:bg-[#DADAFA] hover:text-primary"}
        ${dir === "asc" ? "rotate-0" : "rotate-180"}
      `}
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

export default function Kafka({ optionsMenuItems }) {
  const [sortDir, setSortDir] = useState("asc");
  const [openRow, setOpenRow] = useState(null); // row index
  const [visibleCount, setVisibleCount] = useState(topicBatchSize);
  const [loadingMore, setLoadingMore] = useState(false);

  // topic sorting state
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

  // infinite scroll in dialog
  const listRef = useRef(null);
  const onScroll = useCallback(() => {
    const el = listRef.current;
    if (!el || loadingMore) return;
    const threshold = 56; // px from bottom
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

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Kafka</CardTitle>
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
                  className="cursor-pointer flex items-center gap-1"
                >
                  {columns.name.label} <SortArrow dir={sortDir} active />
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
              {sortedRows.map((row, idx) => (
                <TableRow
                  key={row.name}
                  className={cn(
                    "hover:bg-muted/40",
                    row.exceededThreshold && "bg-red-50/60 dark:bg-red-950/20"
                  )}
                >
                  <TableCell>
                    <button
                      onClick={() => setOpenRow(idx)}
                      className="text-primary hover:underline focus:underline outline-none"
                    >
                      {row.name}
                    </button>
                  </TableCell>
                  <TableCell>{row.host}</TableCell>
                  <TableCell>{row.cpu.toFixed(2)}</TableCell>
                  <TableCell>{row.memory.toFixed(2)}</TableCell>
                  <TableCell>{row.threads.toLocaleString()}</TableCell>
                  <TableCell>{row.connections.toLocaleString()}</TableCell>
                  <TableCell>{row.heapMb.toLocaleString()}</TableCell>
                  <TableCell>{row.topicHealth}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      color={
                        row.status === "Active" ? "success" : "destructive"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

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
                    >
                      Topic{" "}
                      {topicSortKey === "topic" && (
                        <SortArrow dir={topicSortDir} active />
                      )}
                    </TableHead>
                    <TableHead className="text-right">
                      No. of messages
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {sortedTopics.slice(0, visibleCount).map((t) => (
                    <TableRow key={t.topic}>
                      <TableCell className="font-normal">{t.topic}</TableCell>
                      <TableCell className="text-right">
                        {t.messages.toLocaleString()}
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
