"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductTab {
  id: string;
  label: string;
  href: string;
  /** Server-rendered grid, passed through as a node. */
  content: React.ReactNode;
}

export function ProductTabs({ title, tabs }: { title: string; tabs: ProductTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const baseId = useId();
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActiveId(tabs[next].id);
    document.getElementById(`${baseId}-tab-${tabs[next].id}`)?.focus();
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <div className="flex items-center gap-4">
          <div role="tablist" aria-label={title} className="scrollbar-none flex gap-1.5 overflow-x-auto">
            {tabs.map((tab, i) => {
              const selected = tab.id === active.id;
              return (
                <button
                  key={tab.id}
                  id={`${baseId}-tab-${tab.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(tab.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "shrink-0 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    selected ? "bg-grad-primary text-primary-foreground" : "text-foreground/70 hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <Link
            href={active.href}
            className="group hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:text-emerald-deep sm:inline-flex"
          >
            View All
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      <div
        key={active.id}
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className="animate-in fade-in slide-in-from-bottom-1 duration-300"
      >
        {active.content}
      </div>
    </div>
  );
}
