"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useDragContext } from "@/components/draggable/DragProvider";
import OptionsDropdown from "@/components/OptionsDropdown";
import { DragHandleDots16 as DragHandleIcon } from "@/ui/icons";
import { columns } from "./config";
import { applicationsData } from "./data";
import { useApplicationsSorting } from "./hooks/useApplicationsSorting";
import ApplicationsTable from "./components/ApplicationsTable";
import { exportCsv } from "@/lib/csv";

export default function ApplicationsComponent() {
  const [sortDir, setSortDir] = useState("asc");
  const [sortKey, setSortKey] = useState("name");
  const { isGlobalDragMode } = useDragContext();

  const rows = useApplicationsSorting(
    applicationsData.applications,
    sortKey,
    sortDir
  );

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            Last updated ({applicationsData.lastUpdated})
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
                if (id === "export") exportCsv("applications.csv", rows);
              }}
            />
          )}
        </div>
      </div>
      <CardContent>
        <div className="overflow-hidden">
          <ApplicationsTable
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
