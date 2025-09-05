// components/KafkaTable.jsx
// Presentational table for Kafka nodes. Handles sorting UI and row highlighting.

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import SortArrow from "./SortArrow";
import { MEMORY_THRESHOLD, THREADS_THRESHOLD } from "../constants";
import CriticalBadge from "../../shared/CriticalBadge";

export default function KafkaTable({
  rows,
  sortKey,
  sortDir,
  setSortKey,
  setSortDir,
  columns,
  onOpenRow,
}) {
  const handleHeaderClick = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const onHeaderKeyDown = (e, key) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleHeaderClick(key);
    }
  };

  const ariaFor = (key) =>
    sortKey === key ? (sortDir === "asc" ? "ascending" : "descending") : "none";

  const renderHeader = (label, key) => (
    <TableHead
      role="button"
      tabIndex={0}
      onClick={() => handleHeaderClick(key)}
      onKeyDown={(e) => onHeaderKeyDown(e, key)}
      aria-sort={ariaFor(key)}
className="cursor-pointer sticky top-0 z-10 bg-[#DADAFA]"
    >
      <span className="inline-flex items-center">
        {label}
        <SortArrow dir={sortDir} active={sortKey === key} />
      </span>
    </TableHead>
  );

  return (
    <Table wrapperClassName={rows.length > 6 ? "max-h-72 overflow-y-auto" : ""}>
<TableHeader className="sticky top-0 z-10 !bg-[#DADAFA]">
        <TableRow>
          {renderHeader(columns.name.label, "name")}
          {renderHeader(columns.host.label, "host")}
          {renderHeader(columns.cpu.label, "cpu")}
          {renderHeader(columns.memory.label, "memory")}
          {renderHeader(columns.threads.label, "threads")}
          {renderHeader(columns.connections.label, "connections")}
          {renderHeader(columns.heapMb.label, "heapMb")}
          {renderHeader(columns.health.label, "health")}
          {renderHeader(columns.status.label, "status")}
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row, idx) => {
          const exceeded =
            row?.exceededThreshold ||
            (typeof row?.memory === "number" &&
              row.memory >= MEMORY_THRESHOLD) ||
            (typeof row?.threads === "number" &&
              row.threads >= THREADS_THRESHOLD);
          const statusActive =
            String(row?.status ?? "").toLowerCase() === "active";

          return (
            <TableRow
              key={row?.name ?? idx}
              className={cn(
                "hover:bg-muted/40",
                exceeded && "bg-destructive-foreground/10 dark:bg-red-950/20"
              )}
            >
              <TableCell>
                <button
                  onClick={() => onOpenRow(idx)}
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  {row?.name ?? "-"}
                  {(row?.memory >= MEMORY_THRESHOLD ||
                    row?.threads >= THREADS_THRESHOLD) && <CriticalBadge />}
                </button>
              </TableCell>
              <TableCell>{row?.host ?? "-"}</TableCell>
              <TableCell>
                {Number.isFinite(row?.cpu) ? Number(row.cpu).toFixed(2) : "-"}
              </TableCell>
              <TableCell
                className={cn(
                  row?.memory >= MEMORY_THRESHOLD &&
                    "text-destructive-700 font-bold"
                )}
              >
                {Number.isFinite(row?.memory)
                  ? Number(row.memory).toFixed(2)
                  : "-"}
              </TableCell>
              <TableCell
                className={cn(
                  row?.threads >= THREADS_THRESHOLD &&
                    "text-destructive-700 font-bold"
                )}
              >
                {Number.isFinite(row?.threads)
                  ? row.threads.toLocaleString()
                  : "-"}
              </TableCell>
              <TableCell>
                {Number.isFinite(row?.connections)
                  ? row.connections.toLocaleString()
                  : "-"}
              </TableCell>
              <TableCell>
                {Number.isFinite(row?.heapMb ?? row?.heap)
                  ? Number(row?.heapMb ?? row?.heap).toLocaleString()
                  : "-"}
              </TableCell>
              <TableCell>{row?.topicHealth ?? "-"}</TableCell>
              <TableCell>
                <Badge color={statusActive ? "success" : "destructive"}>
                  {row?.status ?? "-"}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
