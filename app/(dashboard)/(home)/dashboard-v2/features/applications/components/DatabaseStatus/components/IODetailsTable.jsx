// components/IODetailsTable.jsx
// Renders the I/O DB details table with header styling and warning logic.

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CriticalBadge from "../../shared/CriticalBadge";
import { cn } from "@/lib/utils";
import { OUTPUT_DB_RECORDS_CRITICAL } from "../constants";

export default function IODetailsTable({ ioDetails }) {
  const ioCritical = (ioDetails?.database ?? []).some(
    (d) =>
      d.type === "Output DB" && Number(d.records) >= OUTPUT_DB_RECORDS_CRITICAL
  );

  return (
    <div className="bg-[#DDDCF933]">
      <div className="flex flex-col gap-1 border-b px-4 py-3">
        <div className="text-xs font-medium flex items-center">
          I/O DB details
          {ioCritical && <CriticalBadge className="ml-1" />}
        </div>
        <div className="text-xs text-default-600">
          Last updated: {ioDetails?.lastUpdated}
        </div>
      </div>
      <Table>
        <TableHeader className="bg-[#F2F2FF] rounded-[3px]">
          <TableRow>
            <TableHead className="p-3">Type</TableHead>
            <TableHead className="p-3">Name</TableHead>
            <TableHead className="p-3 text-right">No. of records</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(ioDetails?.database ?? []).map((d) => {
            const isCritical =
              d.type === "Output DB" &&
              Number(d.records) >= OUTPUT_DB_RECORDS_CRITICAL;
            return (
              <TableRow
                key={`${d.type}-${d.name}`}
                className={cn(
                  isCritical &&
                    "bg-destructive-foreground/10 dark:bg-red-950/20"
                )}
              >
                <TableCell className="text-default-900">
                  <span className="inline-flex items-center">
                    {d.type}
                    {isCritical && <CriticalBadge className="ml-1" />}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{d.name}</TableCell>
                <TableCell className="text-right">
                  {Number(d.records).toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
