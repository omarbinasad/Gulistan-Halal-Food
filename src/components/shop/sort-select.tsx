"use client";

import { ChevronDown } from "lucide-react";
import type { ProductSort } from "@/types";
import { useShop } from "./shop-shell";

const options: { value: ProductSort; label: string }[] = [
  { value: "featured", label: "Featured products" },
  { value: "newest", label: "Newest first" },
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export function SortSelect({ value }: { value: ProductSort }) {
  const { navigate } = useShop();
  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="hidden sm:inline">Sort by</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => navigate({ sort: e.target.value === "featured" ? null : e.target.value })}
          className="h-10 cursor-pointer appearance-none rounded-lg border bg-card py-0 pr-9 pl-3 text-sm font-medium text-foreground outline-none transition-[border-color,box-shadow] duration-200 hover:border-primary/40 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/25"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      </span>
    </label>
  );
}
