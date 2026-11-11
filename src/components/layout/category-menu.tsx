import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CategoryIcon } from "@/components/catalog/category-icon";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

const rowClass =
  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-accent hover:text-accent-foreground";

/**
 * The global category list: every category with a subcategory flyout (CSS-only, works on hover
 * and keyboard focus), then "Offers & Deals" last. Shared by the header dropdown and hero box.
 */
export function CategoryMenu({ categories, className }: { categories: Category[]; className?: string }) {
  return (
    <ul className={className}>
      {categories.map((c) => {
        const subs = c.subcategories ?? [];
        return (
          <li key={c.id} className="group/item relative">
            <Link href={`/categories/${c.slug}`} className={cn(rowClass, "group-focus-within/item:bg-accent")}>
              <CategoryIcon slug={c.slug} className="size-5 text-primary" />
              <span className="flex-1">{c.name}</span>
              {subs.length > 0 && (
                <ChevronRight
                  className="size-4 text-muted-foreground transition-[translate,color] duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-primary"
                  aria-hidden
                />
              )}
            </Link>
            {subs.length > 0 && (
              // pl-2 bridges the gap so the pointer can travel from the row into the flyout.
              <div className="invisible absolute top-0 left-full z-30 -translate-x-1 pl-2 opacity-0 transition-[opacity,translate,visibility] duration-200 group-focus-within/item:visible group-focus-within/item:translate-x-0 group-focus-within/item:opacity-100 group-hover/item:visible group-hover/item:translate-x-0 group-hover/item:opacity-100">
                <div className="w-64 rounded-2xl border bg-card p-2 shadow-lift">
                  {subs.map((s) => (
                    <Link key={s.id} href={`/categories/${c.slug}?sub=${s.slug}`} className={cn(rowClass, "py-2 font-normal")}>
                      {s.name}
                    </Link>
                  ))}
                  <Link
                    href={`/categories/${c.slug}`}
                    className="mt-1 block rounded-lg border-t px-3 pt-2.5 pb-1.5 text-sm font-semibold text-primary transition-colors duration-150 hover:text-emerald-deep"
                  >
                    View all {c.name}
                  </Link>
                </div>
              </div>
            )}
          </li>
        );
      })}
      <li>
        <Link href="/shop?collection=featured" className={cn(rowClass, "font-semibold text-sale hover:text-sale")}>
          <span className="flex size-5 items-center justify-center text-base" aria-hidden>
            %
          </span>
          <span className="flex-1">Offers &amp; Deals</span>
          <ChevronRight className="size-4" aria-hidden />
        </Link>
      </li>
    </ul>
  );
}
