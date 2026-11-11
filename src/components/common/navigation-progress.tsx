"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Phase = "idle" | "loading" | "done";

const SLOW_AFTER_MS = 500; // show the "Loading" pill only if a page is slow
const GIVE_UP_MS = 12000;

/**
 * Route-change preloader: a top progress bar that starts when an internal link is clicked and
 * completes when the new route renders, plus a small "Loading" pill for slower navigations.
 * Covers <Link>/<a> clicks (menus, cards, footer); no external dependency.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [slow, setSlow] = useState(false);
  const phaseRef = useRef<Phase>("idle");
  const timers = useRef<{ trickle?: ReturnType<typeof setInterval>; slow?: ReturnType<typeof setTimeout>; safety?: ReturnType<typeof setTimeout>; hide?: ReturnType<typeof setTimeout> }>({});

  const update = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const clearTimers = useCallback(() => {
    const t = timers.current;
    clearInterval(t.trickle);
    clearTimeout(t.slow);
    clearTimeout(t.safety);
    clearTimeout(t.hide);
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    setProgress(100);
    update("done");
    setSlow(false);
    timers.current.hide = setTimeout(() => {
      update("idle");
      setProgress(0);
    }, 400);
  }, [clearTimers, update]);

  const start = useCallback(() => {
    clearTimers();
    update("loading");
    setProgress(12);
    setSlow(false);
    timers.current.trickle = setInterval(() => setProgress((p) => p + (90 - p) * 0.08), 200);
    timers.current.slow = setTimeout(() => setSlow(true), SLOW_AFTER_MS);
    timers.current.safety = setTimeout(finish, GIVE_UP_MS);
  }, [clearTimers, finish, update]);

  // The URL commits before data when a loading.tsx skeleton is shown, so wait until the skeleton
  // (marked data-route-loading) has been replaced by the real page before completing the bar.
  useEffect(() => {
    if (phaseRef.current !== "loading") return;
    const id = setInterval(() => {
      if (!document.querySelector("[data-route-loading]")) {
        clearInterval(id);
        finish();
      }
    }, 80);
    return () => clearInterval(id);
  }, [pathname, searchParams, finish]);

  // Start on internal navigation clicks.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // same page / hash only
      start();
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [start]);

  useEffect(() => clearTimers, [clearTimers]);

  const loading = phase === "loading";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
      <div
        aria-hidden
        className="h-[3px] bg-gradient-to-r from-primary via-saffron to-primary shadow-[0_0_10px_var(--saffron)]"
        style={{
          width: `${progress}%`,
          opacity: phase === "idle" ? 0 : 1,
          transition: `width ${phase === "done" ? 200 : 400}ms ease-out, opacity 300ms ease-out`,
        }}
      />
      <div
        role="status"
        className={cn(
          "fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-grad-deep px-4 py-2 text-xs font-semibold text-white shadow-lift transition-[opacity,translate] duration-300",
          loading && slow ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        <Loader2 className="size-3.5 animate-spin text-saffron" aria-hidden />
        {loading && slow ? "Loading…" : null}
      </div>
    </div>
  );
}
