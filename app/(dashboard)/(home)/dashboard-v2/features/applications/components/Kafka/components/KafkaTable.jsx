// components/KafkaTable.jsx
// Presentational table for Kafka nodes. Handles sorting UI and row highlighting.

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { STICKY_HEADER_CLASS, ROW_SCROLL_THRESHOLD } from "@/lib/table";
import SortableHeaderCell from "../../shared/SortableHeaderCell";
import { formatFixed, formatInteger } from "@/lib/format";
import { getStatusColor } from "@/lib/status";
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
  return (
    <Table wrapperClassName={rows.length > ROW_SCROLL_THRESHOLD ? "max-h-72 overflow-y-auto" : ""}>
      <TableHeader className={STICKY_HEADER_CLASS}>
        <TableRow>
          <SortableHeaderCell label={columns.name.label} columnKey={"name"} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.host.label} columnKey={"host"} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.cpu.label} columnKey={"cpu"} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.memory.label} columnKey={"memory"} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.threads.label} columnKey={"threads"} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.connections.label} columnKey={"connections"} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.heapMb.label} columnKey={"heapMb"} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.health.label} columnKey={"health"} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
          <SortableHeaderCell label={columns.status.label} columnKey={"status"} sortKey={sortKey} sortDir={sortDir} setSortKey={setSortKey} setSortDir={setSortDir} />
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
                {formatFixed(row?.cpu, 2)}
              </TableCell>
              <TableCell
                className={cn(
                  row?.memory >= MEMORY_THRESHOLD &&
                    "text-destructive-700 font-bold"
                )}
              >
                {formatFixed(row?.memory, 2)}
              </TableCell>
              <TableCell
                className={cn(
                  row?.threads >= THREADS_THRESHOLD &&
                    "text-destructive-700 font-bold"
                )}
              >
                {formatInteger(row?.threads)}
              </TableCell>
              <TableCell>
                {formatInteger(row?.connections)}
              </TableCell>
              <TableCell>
                {formatInteger(row?.heapMb ?? row?.heap)}
              </TableCell>
              <TableCell>{row?.topicHealth ?? "-"}</TableCell>
              <TableCell>
                <Badge color={getStatusColor(row?.status)}>
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
