"use client";
import React from "react";

export default function Callout({ type = "note", children }) {
  const styles = {
    note: "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-700 dark:bg-blue-950/30 dark:text-blue-100",
    tip: "border-green-300 bg-green-50 text-green-900 dark:border-green-700 dark:bg-green-950/30 dark:text-green-100",
    warn: "border-yellow-300 bg-yellow-50 text-yellow-900 dark:border-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-100",
  };
  return (
    <div className={`rounded-md border p-3 text-sm ${styles[type] || styles.note}`}>
      {children}
    </div>
  );
}

