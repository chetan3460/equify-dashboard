"use client";
import React, { useState } from "react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={`text-xs px-2 py-1 rounded border ${copied ? 'bg-green-500 text-white' : 'hover:bg-default-100'}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text || "");
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {}
      }}
      title="Copy"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function CodeTabs({ tabs, codes, showCopy = true }) {
  const entries = Object.entries(tabs || {});
  const [active, setActive] = useState(entries[0]?.[0] || "");
  const activeCode = codes?.[active];

  return (
    <div className="rounded-md border border-default-200">
      <div className="flex items-center justify-between gap-2 p-2 border-b border-default-200 bg-default-50">
        <div className="flex gap-2">
          {entries.map(([key]) => (
            <button
              key={key}
              className={`text-xs px-2 py-1 rounded ${
                active === key ? "bg-primary text-primary-foreground" : "hover:bg-default-100"
              }`}
              onClick={() => setActive(key)}
            >
              {key}
            </button>
          ))}
        </div>
        {showCopy && activeCode ? <CopyButton text={activeCode} /> : null}
      </div>
      <div className="p-3 text-xs overflow-auto">
        {entries.map(([key, content]) => (
          <div key={key} style={{ display: active === key ? "block" : "none" }}>
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}

