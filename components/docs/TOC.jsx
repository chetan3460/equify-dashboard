"use client";
import React, { useEffect, useRef, useState } from "react";

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function TOC({ containerRef, levels = ["H2", "H3", "H4"] }) {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const observerRef = useRef(null);
  const headingsRef = useRef([]);
  const moRef = useRef(null);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const selector = levels.map((l) => l.toLowerCase()).join(",");

    const build = () => {
      // Disconnect old observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      const headings = Array.from(el.querySelectorAll(selector));
      headingsRef.current = headings;

      const mapped = headings.map((h) => {
        let id = h.getAttribute("id");
        if (!id) {
          id = slugify(h.textContent || "");
          h.setAttribute("id", id);
        }
        return { id, text: h.textContent || "", level: h.tagName };
      });
      setItems(mapped);

      if (!headings.length) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible.length) {
            setActiveId(visible[0].target.id);
          } else if (headings.length) {
            // Fallback: choose the last heading above the viewport
            let current = headings[0];
            for (const h of headings) {
              const rect = h.getBoundingClientRect();
              if (rect.top <= 80) current = h; else break;
            }
            setActiveId(current.id);
          }
        },
        { rootMargin: "0px 0px -70% 0px", threshold: [0, 0.25, 0.5, 1.0] }
      );

      headings.forEach((h) => observerRef.current.observe(h));
    };

    build();

    // Rebuild TOC when MDX content changes (route changes, async content, etc.)
    moRef.current = new MutationObserver(() => build());
    moRef.current.observe(el, { childList: true, subtree: true, characterData: true });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      if (moRef.current) moRef.current.disconnect();
    };
  }, [containerRef, levels]);

  if (!items.length) return null;

  return (
    <nav aria-label="Table of contents" className="border rounded-md p-3 bg-card max-h-[70vh] overflow-auto">
      <div className="text-xs font-semibold mb-2">On this page</div>
      <ul className="space-y-1">
        {items.map((it) => {
          const indent = it.level === "H3" ? "pl-3" : it.level === "H4" ? "pl-6" : "";
          const size = it.level === "H4" ? "text-xs" : "text-sm";
          return (
            <li key={it.id} className={indent}>
              <a
                href={`#${it.id}`}
                className={`block ${size} rounded px-2 py-1 hover:bg-default-100 ${
                  activeId === it.id ? "bg-primary/10 text-primary" : ""
                }`}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

