"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useShop } from "./shop-shell";

export interface FilterCategory {
  slug: string | null;
  name: string;
  count: number;
  href: string;
  active: boolean;
}

interface ShopFiltersProps {
  categories: FilterCategory[];
  price: { min: number; max: number; value: number };
  inStockOnly: boolean;
  onSale: boolean;
  newOnly: boolean;
  /** Null when no filter is active. */
  clearHref: string | null;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t py-5 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function PriceRange({ min, max, value }: { min: number; max: number; value: number }) {
  const { navigate } = useShop();
  const [draft, setDraft] = useState(value);
  const id = useId();

  // Debounce so dragging the slider doesn't trigger a request per step.
  useEffect(() => {
    if (draft === value) return;
    const t = setTimeout(() => navigate({ max: draft >= max ? null : String(draft) }), 350);
    return () => clearTimeout(t);
  }, [draft, value, max, navigate]);

  const pct = ((draft - min) / (max - min)) * 100;
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        Maximum price
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={50}
        value={draft}
        onChange={(e) => setDraft(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full accent-primary outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        style={{ background: `linear-gradient(to right, var(--primary) ${pct}%, var(--border) ${pct}%)` }}
      />
      <div className="mt-2 flex justify-between text-xs text-muted-foreground tabular-nums">
        <span>{formatPrice(min)}</span>
        <span className="font-semibold text-foreground">Up to {formatPrice(draft)}</span>
      </div>
    </div>
  );
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="group flex cursor-pointer items-center gap-2.5 py-1.5 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 cursor-pointer rounded accent-primary"
      />
      <span className="text-foreground/80 transition-colors duration-200 group-hover:text-primary">{label}</span>
    </label>
  );
}

export function ShopFilters({ categories, price, inStockOnly, onSale, newOnly, clearHref }: ShopFiltersProps) {
  const { go, navigate } = useShop();

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-card p-5 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">Filter products</h2>
          {clearHref && (
            <Link
              href={clearHref}
              scroll={false}
              onClick={(e) => {
                e.preventDefault();
                go(clearHref);
              }}
              className="text-xs font-semibold text-primary hover:text-emerald-deep"
            >
              Clear all
            </Link>
          )}
        </div>

        <Section title="Categories">
          <ul className="space-y-0.5">
            {categories.map((c) => (
              <li key={c.slug ?? "all"}>
                <Link
                  href={c.href}
                  scroll={false}
                  aria-current={c.active ? "true" : undefined}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                    e.preventDefault();
                    go(c.href);
                  }}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-lg px-1 py-1.5 text-sm transition-colors duration-200 hover:text-primary",
                    c.active ? "font-semibold text-primary" : "text-foreground/80",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200",
                      c.active ? "border-primary" : "border-border group-hover:border-primary/60",
                    )}
                  >
                    <span
                      className={cn(
                        "size-2 rounded-full bg-grad-primary transition-[scale,opacity] duration-200",
                        c.active ? "scale-100 opacity-100" : "scale-0 opacity-0",
                      )}
                    />
                  </span>
                  <span className="flex-1">{c.name}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">{c.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Price range">
          <PriceRange key={price.value} {...price} />
        </Section>

        <Section title="Availability">
          <CheckRow label="In stock only" checked={inStockOnly} onChange={(v) => navigate({ stock: v ? "1" : null })} />
        </Section>

        <Section title="Shopping notes">
          <CheckRow label="Special offers" checked={onSale} onChange={(v) => navigate({ offers: v ? "1" : null })} />
          <CheckRow label="New arrivals" checked={newOnly} onChange={(v) => navigate({ new: v ? "1" : null })} />
        </Section>
      </div>

      <div className="rounded-2xl bg-accent p-5">
        <MessageCircle className="size-6 text-primary" strokeWidth={1.5} aria-hidden />
        <p className="mt-3 text-sm font-semibold">Need help choosing?</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Our friendly team is here to help you find your favorites.</p>
        <Link
          href="/pages/contact"
          className="mt-3 inline-flex h-8 items-center rounded-lg bg-card px-3 text-xs font-semibold text-primary shadow-soft hover:bg-white"
        >
          Contact support
        </Link>
      </div>
    </div>
  );
}
