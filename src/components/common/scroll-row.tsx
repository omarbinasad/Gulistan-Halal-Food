"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Horizontally scrolling row (carousel) with arrow buttons that appear only when there is more to see. */
export function ScrollRow({ children, label, className }: { children: React.ReactNode; label: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    // Bring the active item (aria-current) into view on load.
    el.querySelector<HTMLElement>("[aria-current=true]")?.scrollIntoView({ inline: "center", block: "nearest" });
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  const arrow =
    "absolute top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border bg-card text-foreground shadow-soft transition-[opacity,scale,background-color] duration-200 hover:scale-105 hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

  return (
    <div className={cn("relative min-w-0", className)} role="group" aria-label={label}>
      <div ref={ref} className="scrollbar-none flex snap-x gap-2.5 overflow-x-auto py-1">
        {children}
      </div>
      <button
        type="button"
        aria-label={`Scroll ${label} left`}
        tabIndex={canLeft ? 0 : -1}
        onClick={() => scrollBy(-1)}
        className={cn(arrow, "left-0", canLeft ? "opacity-100" : "pointer-events-none scale-90 opacity-0")}
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        type="button"
        aria-label={`Scroll ${label} right`}
        tabIndex={canRight ? 0 : -1}
        onClick={() => scrollBy(1)}
        className={cn(arrow, "right-0", canRight ? "opacity-100" : "pointer-events-none scale-90 opacity-0")}
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
