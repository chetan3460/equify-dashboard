// components/KafkaTable.jsx
// Presentational table for Kafka nodes. Handles sorting UI and row highlighting.

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import SortArrow from "./SortArrow";
import { MEMORY_THRESHOLD, THREADS_THRESHOLD } from "../constants";

function CriticalBadge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline-block ml-1">
      <path d="M6 11C8.75 11 11 8.75 11 6C11 3.25 8.75 1 6 1C3.25 1 1 3.25 1 6C1 8.75 3.25 11 6 11Z" fill="#E14761" fillOpacity="0.3" stroke="#E14761" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 4V6.5" stroke="#B12F00" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.99609 8H6.00058" stroke="#B12F00" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function KafkaTable({ rows, sortDir, setSortDir, columns, onOpenRow }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            role="button"
            tabIndex={0}
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
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
          <TableHead className="text-right">{columns.status.label}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row, idx) => {
          const exceeded =
            row?.exceededThreshold ||
            (typeof row?.memory === "number" && row.memory >= MEMORY_THRESHOLD) ||
            (typeof row?.threads === "number" && row.threads >= THREADS_THRESHOLD);
          const statusActive = String(row?.status ?? "").toLowerCase() === "active";

          return (
            <TableRow key={row?.name ?? idx} className={cn("hover:bg-muted/40", exceeded && "bg-destructive-foreground/10 dark:bg-red-950/20")}> 
              <TableCell>
                <button onClick={() => onOpenRow(idx)} className="text-primary hover:underline flex items-center gap-1">
                  {row?.name ?? "-"}
                  {(row?.memory >= MEMORY_THRESHOLD || row?.threads >= THREADS_THRESHOLD) && <CriticalBadge />}
                </button>
              </TableCell>
              <TableCell>{row?.host ?? "-"}</TableCell>
              <TableCell>{Number.isFinite(row?.cpu) ? Number(row.cpu).toFixed(2) : "-"}</TableCell>
              <TableCell className={cn(row?.memory >= MEMORY_THRESHOLD && "text-red-600 font-bold")}>
                {Number.isFinite(row?.memory) ? Number(row.memory).toFixed(2) : "-"}
              </TableCell>
              <TableCell className={cn(row?.threads >= THREADS_THRESHOLD && "text-red-600 font-bold")}>
                {Number.isFinite(row?.threads) ? row.threads.toLocaleString() : "-"}
              </TableCell>
              <TableCell>{Number.isFinite(row?.connections) ? row.connections.toLocaleString() : "-"}</TableCell>
              <TableCell>
                {Number.isFinite(row?.heapMb ?? row?.heap) ? Number(row?.heapMb ?? row?.heap).toLocaleString() : "-"}
              </TableCell>
              <TableCell>{row?.topicHealth ?? "-"}</TableCell>
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
  );
}

