/**
 * Kafka Status Component
 *
 * This component displays Kafka service health and metrics
 * Chart Type: Status card with small line chart showing message throughput
 * Dummy Data: Kafka status, throughput, and partition information
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
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-200 ${
        dir === "asc" ? "rotate-180" : "rotate-0"
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
}

export default function Kafka({ optionsMenuItems }) {
  const [sortDir, setSortDir] = useState("asc");
  const [openRow, setOpenRow] = useState(null); // row index
  const [visibleCount, setVisibleCount] = useState(topicBatchSize);
  const [loadingMore, setLoadingMore] = useState(false);

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

  // infinite scroll in dialog
  const listRef = useRef(null);
  const onScroll = useCallback(() => {
    const el = listRef.current;
    if (!el || loadingMore) return;
    const threshold = 56; // px from bottom
    const nearBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
    if (nearBottom && visibleCount < topics.length) {
      setLoadingMore(true);
      // simulate async load; replace with fetch if needed
      setTimeout(() => {
        setVisibleCount((c) => Math.min(c + topicBatchSize, topics.length));
        setLoadingMore(false);
      }, 600);
    }
  }, [loadingMore, visibleCount, topics.length]);

  useEffect(() => {
    // reset visible when switching rows
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
                  className="cursor-pointer"
                >
                  {columns.name.label} <SortArrow dir={sortDir} />
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
                  <TableCell className="">{row.host}</TableCell>
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
          <div
            ref={listRef}
            onScroll={onScroll}
            className="max-h-[420px] overflow-auto"
          >
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-primary/10 rounded-[3px]">
                <TableRow className="rounded-[3px] tex">
                  <TableHead>Topic</TableHead>
                  <TableHead className="text-right">No. of messages</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(topics || []).slice(0, visibleCount).map((t) => (
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
        </DialogContent>
      </Dialog>
    </Card>
  );
}
