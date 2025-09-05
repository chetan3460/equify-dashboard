// lib/status.js
// Map status strings to badge colors in one place.

export function getStatusColor(status) {
  const s = String(status ?? "").toLowerCase();
  if (s === "active") return "success";
  if (s === "inactive") return "destructive";
  if (s === "degraded") return "destructive";
  if (s === "maintenance" || s === "activating") return "warning";
  return "default";
}

