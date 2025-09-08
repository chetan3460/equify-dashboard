"use client";
import ProjectGuide from "../features/guides/ProjectGuide.mdx";

export default function GuidesPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-xl font-bold">Dashboard Guides</h1>
        <p className="text-sm text-default-700">Project overview, patterns, and migration steps.</p>
      </header>

      <section>
        <ProjectGuide />
      </section>
    </div>
  );
}

