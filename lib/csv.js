export function toCsv(rows) {
  if (!rows || rows.length === 0) return "";
  // Collect ordered columns by union of keys in insertion order
  const cols = [];
  const seen = new Set();
  for (const r of rows) {
    if (!r || typeof r !== "object") continue;
    for (const k of Object.keys(r)) {
      if (!seen.has(k)) {
        seen.add(k);
        cols.push(k);
      }
    }
  }
  const escape = (v) => {
    if (v == null) return "";
    const s = String(v);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  const header = cols.map(escape).join(",");
  const lines = rows.map((r) => cols.map((c) => escape(r?.[c])).join(","));
  return [header, ...lines].join("\n");
}

export function exportCsv(filename, rows) {
  const csv = toCsv(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "export.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

