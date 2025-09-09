/**
 * Webserver Status Component
 *
 * This component displays web server health and request metrics
 * Chart Type: Status card with small line chart showing request rate
 * Dummy Data: Webserver status, request rate, and response times
 */
"use client";
import { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useDragContext } from "@/components/draggable/DragProvider";
import OptionsDropdown from "@/components/OptionsDropdown";
import { exportCsv } from "@/lib/csv";
import { DragHandleDots16 as DragHandleIcon } from "@/ui/icons";
import { columns } from "./config";
import { webservers } from "./data";
import { useWebserverSorting } from "./hooks/useWebserverSorting";
import WebserverTable from "./components/WebserverTable";

export default function Webserver() {
  const [sortDir, setSortDir] = useState("asc");
  const [sortKey, setSortKey] = useState("service");
  const { isGlobalDragMode } = useDragContext();
  const rows = useWebserverSorting(webservers.rows, sortKey, sortDir);

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Webserver</CardTitle>
          <CardDescription>
            Last updated ({webservers.lastUpdated})
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
                if (id === "export") exportCsv("webserver-status.csv", rows);
              }}
            />
          )}
        </div>
      </div>
      <CardContent>
        <div className="overflow-hidden">
          <WebserverTable
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
