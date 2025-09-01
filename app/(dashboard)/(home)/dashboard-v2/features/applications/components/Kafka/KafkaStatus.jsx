"use client";

// KafkaStatus.jsx
// Container component that wires together state, hooks, and presentational components.

import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useDragContext } from "@/components/draggable/DragProvider";
import OptionsDropdown from "@/components/OptionsDropdown";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";

import { kafkaData } from "./config"; // mock/demo data lives here
import { columns } from "./columns"; // table labels
import { ASSETS, topicBatchSize, MEMORY_THRESHOLD, THREADS_THRESHOLD } from "./constants"; // small shared config

import KafkaTable from "./components/KafkaTable";
import TopicDialog from "./components/TopicDialog";
import ToastContainer from "./components/ToastContainer";
import CriticalBadge from "./components/CriticalBadge";

import { useKafkaRowSorting, useTopicSorting } from "./hooks/useKafkaSorting";
import { useKafkaToasts } from "./hooks/useKafkaToasts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/* ---------- Kafka Component ---------- */
export default function Kafka({ optionsMenuItems }) {
  const [sortDir, setSortDir] = useState("asc");
  const [openRow, setOpenRow] = useState(null);
  const [visibleCount, setVisibleCount] = useState(topicBatchSize);
  const [loadingMore, setLoadingMore] = useState(false);

  const [topicSortKey, setTopicSortKey] = useState("topic");
  const [topicSortDir, setTopicSortDir] = useState("asc");

  // Sorted lists derived from state
  const sortedRows = useKafkaRowSorting(kafkaData.rows, sortDir);
  const activeRow = openRow != null ? sortedRows[openRow] : null;
  const topics = activeRow?.topics ?? [];
  const sortedTopics = useTopicSorting(topics, topicSortKey, topicSortDir);

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

  /* ---------- Toast notifications (via hook) ---------- */
  const { toasts, removeToast } = useKafkaToasts(kafkaData.rows, {
    memoryThreshold: MEMORY_THRESHOLD,
    threadsThreshold: THREADS_THRESHOLD,
  });

  // Determine if any Kafka node is in a warning/critical state
  const hasWarning = (kafkaData.rows ?? []).some(
    (r) =>
      Boolean(r?.exceededThreshold) ||
      (typeof r?.memory === "number" && r.memory >= MEMORY_THRESHOLD) ||
      (typeof r?.threads === "number" && r.threads >= THREADS_THRESHOLD) ||
      String(r?.topicHealth ?? "").toLowerCase() === "warning"
  );

  return (
    <>
      <Card className="h-full flex flex-col">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>
              <span className="inline-flex items-center">
                Kafka
                {hasWarning && (
                  <CriticalBadge size={16} className="ml-1" />
                )}
              </span>
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
            <KafkaTable
              rows={sortedRows}
              sortDir={sortDir}
              setSortDir={setSortDir}
              columns={columns}
              onOpenRow={setOpenRow}
            />
          </div>
        </CardContent>
      </Card>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} iconSrc={ASSETS.systemCriticalIcon} />

      {/* Dialog */}
      <Dialog open={openRow != null} onOpenChange={() => setOpenRow(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {activeRow ? `${activeRow.name} Details` : "Details"}
            </DialogTitle>
          </DialogHeader>

          <TopicDialog
            open={openRow != null}
            onOpenChange={() => setOpenRow(null)}
            activeRow={activeRow}
            topics={sortedTopics}
            topicSortKey={topicSortKey}
            setTopicSortKey={setTopicSortKey}
            topicSortDir={topicSortDir}
            setTopicSortDir={setTopicSortDir}
            visibleCount={visibleCount}
            onScroll={onScroll}
            listRef={listRef}
            loadingMore={loadingMore}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
