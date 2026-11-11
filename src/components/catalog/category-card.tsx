import Link from "next/link";
import type { Category } from "@/types";
import { CategoryIcon } from "./category-icon";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col items-center rounded-xl border bg-card p-2.5 text-center shadow-soft transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      {/* TODO: replace icon tile with category photo once image assets exist. */}
      <span className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-sand to-accent text-primary transition-colors duration-300 group-hover:from-accent group-hover:to-sand">
        <CategoryIcon slug={category.slug} className="size-10 transition-transform duration-300 group-hover:scale-110" />
      </span>
      <span className="mt-2.5 px-1 text-[0.8125rem] leading-tight font-semibold text-foreground">{category.name}</span>
    </Link>
  );
}
