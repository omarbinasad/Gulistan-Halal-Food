"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";
import { CategoryMenu } from "./category-menu";

/** The hero's category box (components/home/hero.tsx). While it is mostly visible the dropdown would duplicate it. */
const HERO_BOX = 'nav[aria-label="Browse categories"]';
const SHARED_VISIBILITY = 0.5;

/** Height of the sticky header, so the part of the box hidden beneath it doesn't count as visible. */
function stickyHeaderOffset(): number {
  return document.querySelector("header")?.getBoundingClientRect().height ?? 0;
}

export function AllCategoriesMenu({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const [heroBoxVisible, setHeroBoxVisible] = useState(false);

  useEffect(() => {
    const box = document.querySelector(HERO_BOX);
    if (!box) {
      setHeroBoxVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setHeroBoxVisible(entry.intersectionRatio >= SHARED_VISIBILITY),
      { rootMargin: `-${Math.round(stickyHeaderOffset())}px 0px 0px 0px`, threshold: [0, 0.25, SHARED_VISIBILITY, 0.75, 1] },
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, [pathname]);

  const open = !heroBoxVisible;

  return (
    <div className="group relative py-1.5">
      <button
        type="button"
        className="flex h-10 w-full items-center gap-2.5 rounded-lg bg-grad-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:brightness-90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        aria-haspopup={open ? "true" : undefined}
      >
        <Menu className="size-4.5" aria-hidden />
        All Categories
        <ChevronDown
          className={cn(
            "ml-auto size-4 transition-transform duration-200",
            open && "group-focus-within:rotate-180 group-hover:rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open && (
        <div className="invisible absolute top-full left-0 z-50 w-full translate-y-1 rounded-2xl border bg-card p-2 opacity-0 shadow-lift transition-[opacity,translate,visibility] duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          <CategoryMenu categories={categories} />
        </div>
      )}
    </div>
  );
}
