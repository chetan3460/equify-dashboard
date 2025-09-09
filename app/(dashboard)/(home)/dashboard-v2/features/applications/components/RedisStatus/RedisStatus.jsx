/**
 * Redis Status Component
 *
 * This component displays Redis cache health and performance metrics
 * Chart Type: Status card with small line chart showing cache hit rate
 * Dummy Data: Redis status, memory usage, and cache performance
 */
"use client";
import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./config";
import { redisData } from "./data";
import { useDragContext } from "@/components/draggable/DragProvider";
import OptionsDropdown from "@/components/OptionsDropdown";
import { exportCsv } from "@/lib/csv";
import { DragHandleDots16 as DragHandleIcon } from "@/ui/icons";
import { useRedisSorting } from "./hooks/useRedisSorting";
import RedisTable from "./components/RedisTable";

export default function Redis() {
  const [sortDir, setSortDir] = useState("asc");
  const [sortKey, setSortKey] = useState("name");
  const { isGlobalDragMode } = useDragContext();
  const rows = useRedisSorting(redisData.redis, sortKey, sortDir);

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Redis</CardTitle>
          <CardDescription>
            Last updated ({redisData.lastUpdated})
          </CardDescription>
        </CardHeader>
        <div className="flex items-center gap-2">
          {isGlobalDragMode ? (
            <div className="cursor-grab flex items-center">
              <DragHandleIcon />
            </div>
          ) : (
            <OptionsDropdown
              onAction={(id) => {
                if (id === "export") exportCsv("redis-status.csv", rows);
              }}
            />
          )}
        </div>
      </div>
      <CardContent>
        <div className="overflow-hidden ">
          <RedisTable
            rows={rows}
            columns={columns}
            sortKey={sortKey}
            sortDir={sortDir}
            setSortKey={setSortKey}
            setSortDir={setSortDir}
          />
        </div>
      </CardContent>
    </Card>
  );
}
