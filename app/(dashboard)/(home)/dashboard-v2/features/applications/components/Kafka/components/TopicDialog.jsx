// components/TopicDialog.jsx
// Dialog listing topics for the selected Kafka node with sortable header.

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SortArrow from "./SortArrow";

export default function TopicDialog({
  open,
  onOpenChange,
  activeRow,
  topics,
  topicSortKey,
  setTopicSortKey,
  topicSortDir,
  setTopicSortDir,
  visibleCount,
  onScroll,
  listRef,
  loadingMore,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {activeRow ? `${activeRow.name} Details` : "Details"}
          </DialogTitle>
        </DialogHeader>

        {!topics?.length ? (
          <div className="p-4 text-center text-muted-foreground">
            No topics available for this Kafka node.
          </div>
        ) : (
          <div
            ref={listRef}
            onScroll={onScroll}
            className="max-h-[240px] overflow-y-auto overscroll-contain"
          >
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-[#DADAFA] !dark:bg-[#33445B]">
                <TableRow>
                  <TableHead
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setTopicSortKey("topic");
                      setTopicSortDir((d) =>
                        topicSortKey === "topic" && d === "asc" ? "desc" : "asc"
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
                  <TableHead className="text-right">No. of messages</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topics.slice(0, visibleCount).map((t, i) => (
                  <TableRow key={t?.topic ?? i}>
                    <TableCell>{t?.topic ?? "-"}</TableCell>
                    <TableCell className="text-right">
                      {t?.messages?.toLocaleString?.() ?? "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {loadingMore && (
              <div className="flex items-center justify-center py-4">
                <span
                  className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 dark:border-gray-700 dark:border-t-gray-200"
                  aria-label="Loading more topics"
                />
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
