"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ChartCard({
  title,
  description,
  height = 440,
  rightActions = null,
  children,
  className = "",
}) {
  const wrapperStyle =
    typeof height === "number" ? { height: `${height}px` } : { height: "100%" };

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </CardHeader>
        <div className="flex items-center gap-2">{rightActions}</div>
      </div>
      <CardContent className="flex-1 flex flex-col">
        <div style={wrapperStyle}>{children}</div>
      </CardContent>
    </Card>
  );
}
