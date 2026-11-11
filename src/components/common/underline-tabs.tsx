"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface UnderlineTab {
  id: string;
  label: string;
  /** Server-rendered content, passed through as a node. */
  content: React.ReactNode;
}

export function UnderlineTabs({ tabs, label }: { tabs: UnderlineTab[]; label: string }) {
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
      <div role="tablist" aria-label={label} className="scrollbar-none flex gap-7 overflow-x-auto border-b">
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
                "-mb-px shrink-0 border-b-2 py-3.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary",
                selected ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        key={active.id}
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className="animate-in fade-in slide-in-from-bottom-1 py-8 duration-300"
      >
        {active.content}
      </div>
    </div>
  );
}
