"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Paged carousel: 4 cards per slide on large screens, 2 on tablets, 1 on phones.
 * Native scroll-snap (swipe on touch) with arrow buttons and dot pagination.
 * Card widths use the gap (1.25rem) so exactly N cards fill the viewport of the track.
 */
const slideClass =
  "min-w-0 shrink-0 snap-start basis-full sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-3.75rem)/4)]";

export function CardCarousel({ children, label, className }: { children: React.ReactNode; label: string; className?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<number[]>([0]);
  const [page, setPage] = useState(0);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = el.clientWidth + gap;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const pages = max < 2 ? 1 : Math.ceil(max / step) + 1;
    // Last page is clamped to the end so the final slide is always full.
    setPositions(Array.from({ length: pages }, (_, i) => Math.min(i * step, max)));
  }, []);

  const updatePage = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setPositions((pos) => {
      let nearest = 0;
      pos.forEach((p, i) => {
        if (Math.abs(p - el.scrollLeft) < Math.abs(pos[nearest] - el.scrollLeft)) nearest = i;
      });
      setPage(nearest);
      return pos;
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    const observer = new ResizeObserver(() => {
      measure();
      updatePage();
    });
    observer.observe(el);
    el.addEventListener("scroll", updatePage, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", updatePage);
    };
  }, [measure, updatePage]);

  const goTo = (index: number) => {
    const target = positions[Math.max(0, Math.min(index, positions.length - 1))];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.current?.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border bg-card text-foreground shadow-lift transition-[opacity,scale,background-color,color] duration-200 hover:scale-105 hover:bg-grad-primary hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:flex";
  const atStart = page === 0;
  const atEnd = page === positions.length - 1;

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="relative">
        {/* py/-my keeps hover lift and shadows from being clipped by the scroll container. */}
        <div ref={track} className="scrollbar-none -my-4 flex snap-x snap-mandatory gap-5 overflow-x-auto py-4">
          {Children.map(children, (child, i) => (
            <div className={slideClass} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${Children.count(children)}`}>
              {child}
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label={`Previous ${label}`}
          onClick={() => goTo(page - 1)}
          disabled={atStart}
          className={cn(arrow, "-left-5 2xl:-left-6", atStart && "pointer-events-none scale-90 opacity-0")}
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label={`Next ${label}`}
          onClick={() => goTo(page + 1)}
          disabled={atEnd}
          className={cn(arrow, "-right-5 2xl:-right-6", atEnd && "pointer-events-none scale-90 opacity-0")}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {positions.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2.5" role="group" aria-label={`${label} pages`}>
          {positions.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === page}
              className={cn(
                "h-2.5 rounded-full transition-[width,background-color] duration-300 ease-out focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                i === page ? "w-10 bg-grad-primary" : "w-2.5 bg-border hover:bg-muted-foreground/50",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
