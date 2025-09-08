import React from "react";
import { XAxis, YAxis } from "recharts";

export function AxisX({ chartConfig, tickMargin = 10, children, ...rest }) {
  const stroke = chartConfig?.axis?.stroke ?? "#666";
  return (
    <XAxis
      stroke={stroke}
      axisLine={{ stroke }}
      tickLine={{ stroke }}
      tickMargin={tickMargin}
      {...rest}
    >
      {children}
    </XAxis>
  );
}

export function AxisY({ chartConfig, tickMargin = 10, children, ...rest }) {
  const stroke = chartConfig?.axis?.stroke ?? "#666";
  return (
    <YAxis
      stroke={stroke}
      axisLine={{ stroke }}
      tickLine={{ stroke }}
      tickMargin={tickMargin}
      {...rest}
    >
      {children}
    </YAxis>
  );
}
