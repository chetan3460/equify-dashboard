/**
 * Database Status Component
 *
 * This component displays database health and connection metrics
 * Chart Type: Status card with small bar chart showing connection pool usage
 * Dummy Data: Database status, connections, and query performance
 */
"use client";

// Uses ./data for table rows and ./config for labels. Includes a single I/O details panel.

import React from "react";
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
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";
import { columns } from "./config";
import { databaseData, ioDetails } from "./Data";
import { useDatabaseSorting } from "./hooks/useDatabaseSorting";
import DatabaseTable from "./components/DatabaseTable";

export default function Database() {
  const [sortDir, setSortDir] = useState("asc");
  const [sortKey, setSortKey] = useState("name");
  const [openKey, setOpenKey] = useState(null); // "mysql" | "clickhouse" | null
  const { isGlobalDragMode } = useDragContext();

  const sorted = useDatabaseSorting(databaseData.database, sortKey, sortDir);

  const toggle = (key) => setOpenKey((k) => (k === key ? null : key));

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Database</CardTitle>
          <CardDescription>
            Last updated ({databaseData.lastUpdated})
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
                if (id === "export") exportCsv("database-status.csv", sorted);
              }}
            />
          )}
        </div>
      </div>
      <CardContent>
        <div className="overflow-hidden ">
          <DatabaseTable
            rows={sorted}
            sortKey={sortKey}
            sortDir={sortDir}
            setSortKey={setSortKey}
            setSortDir={setSortDir}
            columns={columns}
            openKey={openKey}
            onToggleRow={toggle}
            ioDetails={ioDetails}
          />
        </div>
      </CardContent>
    </Card>
  );
}
