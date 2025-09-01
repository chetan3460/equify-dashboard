"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useDragContext } from "@/components/draggable/DragProvider";
import OptionsDropdown from "@/components/OptionsDropdown";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";
import { columns } from "./config";
import { applicationsData } from "./data";
import { useApplicationsSorting } from "./hooks/useApplicationsSorting";
import ApplicationsTable from "./components/ApplicationsTable";

export default function ApplicationsComponent() {
  const [sortDir, setSortDir] = useState("asc");
  const [sortKey, setSortKey] = useState("name");
  const { isGlobalDragMode } = useDragContext();

  const rows = useApplicationsSorting(applicationsData.applications, sortKey, sortDir);

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>Last updated: {applicationsData.lastUpdated}</CardDescription>
        </CardHeader>
        <div className="flex items-center gap-2">
          {isGlobalDragMode ? (
            <div className="cursor-grab flex items-center">
              <DragHandleIcon />
            </div>
          ) : (
            <OptionsDropdown />
          )}
        </div>
      </div>
      <CardContent>
        <div className="overflow-hidden border">
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
