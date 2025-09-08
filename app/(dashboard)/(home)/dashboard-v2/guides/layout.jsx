"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TOC from "@/components/docs/TOC";

const items = [
  { href: "/dashboard-v2/guides", label: "Project Guide" },
  { href: "/dashboard-v2/guides/service-providers", label: "Service providers" },
  { href: "/dashboard-v2/guides/sms-volume", label: "SMS volume" },
  { href: "/dashboard-v2/guides/system-health", label: "System health" },
  { href: "/dashboard-v2/guides/applications", label: "Applications" },
  { href: "/dashboard-v2/guides/analytics", label: "Analytics" },
];

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function GuideLayout({ children }) {
  const pathname = usePathname();
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const selector = "h2, h3, h4";

    const enhance = () => {
      const headings = Array.from(el.querySelectorAll(selector));
      headings.forEach((h) => {
        // Ensure id
        if (!h.id) {
          h.id = slugify(h.textContent || "");
        }
        // Skip if anchor already added
        if (h.querySelector('.heading-anchor')) return;

        h.classList.add('group', 'anchor-heading');

        const btn = document.createElement('button');
        btn.type = 'button';
btn.className = "heading-anchor ml-2 align-middle inline-flex items-center opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 transition-opacity text-default-500 hover:text-primary";
        btn.title = 'Copy link';
        btn.setAttribute('aria-label', 'Copy link to clipboard');
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 7h3a5 5 0 1 1 0 10h-3"/>
            <path d="M9 17H6a5 5 0 1 1 0-10h3"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>`;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const url = `${location.origin}${location.pathname}#${h.id}`;
          navigator.clipboard?.writeText(url).catch(() => {});
        });

        // Append at end of heading
        h.appendChild(btn);
      });
    };

    enhance();
    const mo = new MutationObserver(() => enhance());
    mo.observe(el, { childList: true, subtree: true, characterData: true });
    return () => mo.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2">
        <nav className="sticky top-20 space-y-1 border rounded-md p-3 bg-card">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`block text-sm px-2 py-1 rounded ${
                pathname === it.href ? "bg-primary text-primary-foreground" : "hover:bg-default-100"
              }`}
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="col-span-12 md:col-span-7 lg:col-span-8">
        <div ref={contentRef} className="prose dark:prose-invert max-w-none space-y-6">{children}</div>
      </main>
      <aside className="hidden md:block md:col-span-2 lg:col-span-2">
        <div className="sticky top-20">
          <TOC containerRef={contentRef} />
        </div>
      </aside>
    </div>
  );
}

