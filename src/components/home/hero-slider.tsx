"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Leaf, ShieldCheck, Truck } from "lucide-react";
import { CategoryIcon } from "@/components/catalog/category-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Banner, CategoryRef } from "@/types";

const AUTOPLAY_MS = 6000;

const trust = [
  { icon: ShieldCheck, line1: "100% Halal", line2: "Certified" },
  { icon: Leaf, line1: "Fresh &", line2: "High Quality" },
  { icon: Truck, line1: "Fast", line2: "Delivery" },
];

/** Concave "shoulder" that blends the pagination tab into the hero edge. */
const shoulder = "pointer-events-none absolute bottom-0 size-4 content-['']";

export function HeroSlider({ banners, categories }: { banners: Banner[]; categories: CategoryRef[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const count = banners.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused || reduceMotion) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count, paused, reduceMotion, next]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      className="pattern-geo group/hero relative isolate overflow-hidden rounded-2xl bg-emerald-deep text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute -top-32 -right-20 -z-10 size-[28rem] rounded-full bg-primary/60 blur-3xl" aria-hidden />

      {/* All slides share one grid cell so the height never jumps between slides. */}
      <div className="grid" aria-live={paused ? "polite" : "off"}>
        {banners.map((banner, i) => {
          const active = i === index;
          const Heading = i === 0 ? "h1" : "h2"; // one h1 per page
          return (
            <div
              key={banner.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={cn(
                "col-start-1 row-start-1 grid items-center gap-8 px-6 max-[360px]:px-4 pt-6 pb-14 transition-[opacity,translate] duration-500 ease-out sm:px-10 sm:pt-10 sm:pb-16 lg:px-14 min-[1500px]:grid-cols-[1.1fr_1fr]",
                active ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-3 opacity-0",
              )}
            >
              <div className="max-w-2xl">
                {banner.eyebrow && (
                  <p className="inline-flex items-center rounded-md bg-grad-saffron px-2 py-0.5 text-[0.6875rem] font-bold sm:px-2.5 sm:py-1 sm:text-xs text-saffron-foreground">
                    {banner.eyebrow}
                  </p>
                )}
                <Heading className="mt-3 font-heading text-[1.75rem] leading-[1.1] sm:mt-4 font-bold tracking-tight text-balance sm:text-[2.75rem] 2xl:text-5xl">
                  {banner.title}
                </Heading>
                {banner.subtitle && <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-relaxed text-white/80 sm:mt-4 sm:line-clamp-none sm:text-base">{banner.subtitle}</p>}
                {banner.cta && (
                  <Button asChild size="xl" className="mt-4 h-10 bg-grad-saffron px-6 sm:mt-6 sm:h-11 sm:px-7 text-saffron-foreground hover:brightness-105">
                    <Link href={banner.cta.href}>
                      {banner.cta.label}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                )}
                <ul className="mt-5 flex flex-nowrap sm:mt-7 gap-x-2.5 max-[360px]:gap-x-1 sm:gap-x-7">
                  {trust.map(({ icon: Icon, line1, line2 }) => (
                    <li key={line1} className="flex items-center gap-1.5 sm:gap-3">
                      <span className="flex size-7 max-[360px]:size-6 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 sm:size-12">
                        <Icon className="size-3.5 text-saffron sm:size-5" strokeWidth={1.75} />
                      </span>
                      <span className="text-[0.625rem] leading-tight font-semibold whitespace-nowrap sm:text-xs">
                        {line1}
                        <br />
                        {line2}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TODO: replace with hero photography when image assets are supplied. */}
              <div aria-hidden className="relative hidden h-full min-h-60 min-[1500px]:block">
                <div className="absolute inset-0 m-auto size-60 rounded-full bg-white/10" />
                <div className="absolute inset-0 grid grid-cols-3 mx-auto max-w-[18rem] content-center gap-3 px-2">
                  {categories.slice(0, 9).map((c, j) => (
                    <span
                      key={c.id}
                      className={cn(
                        "flex aspect-square items-center justify-center rounded-2xl border border-white/10 backdrop-blur-sm",
                        (j + i) % 2 === 0 ? "bg-white/15 text-saffron" : "bg-white/5 text-white/85",
                      )}
                    >
                      <CategoryIcon slug={c.slug} className="size-7" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 bottom-3 z-10 flex size-9 items-center sm:top-1/2 sm:right-4 sm:bottom-auto sm:size-10 sm:-translate-y-1/2 justify-center rounded-full bg-white text-foreground shadow-lift transition-[scale,background-color] duration-200 hover:scale-110 hover:bg-accent focus-visible:ring-3 focus-visible:ring-saffron/60 focus-visible:outline-none active:scale-95"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Pagination notch: page-coloured tab with curved shoulders, as in the approved reference. */}
          <div
            role="group"
            aria-label="Choose slide"
            className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 rounded-t-[1.25rem] bg-background px-7 pt-3.5 pb-2.5"
          >
            <span
              aria-hidden
              className={cn(shoulder, "right-full bg-[radial-gradient(circle_at_0_0,transparent_1rem,var(--background)_1rem)]")}
            />
            <span
              aria-hidden
              className={cn(shoulder, "left-full bg-[radial-gradient(circle_at_100%_0,transparent_1rem,var(--background)_1rem)]")}
            />
            {banners.map((banner, i) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2.5 rounded-full transition-[width,background-color] duration-300 ease-out focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                  i === index ? "w-10 bg-grad-deep" : "w-2.5 bg-border hover:bg-muted-foreground/50",
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
