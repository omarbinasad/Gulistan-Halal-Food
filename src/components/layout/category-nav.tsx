import Link from "next/link";
import { CategoryIcon } from "@/components/catalog/category-icon";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";
import { AllCategoriesMenu } from "./all-categories-menu";
import { Container } from "./container";

const linkClass =
  "group/link inline-flex h-12 shrink-0 items-center gap-2 border-b-2 border-transparent text-sm font-medium text-foreground/80 transition-colors duration-200 hover:border-primary hover:text-primary";

/**
 * Uses the same column template as the home hero (category box | content) so the
 * "All Categories" button is exactly as wide as the box beneath it. Keep in sync with Hero.
 */
export function CategoryNav({ categories }: { categories: Category[] }) {
  return (
    <nav aria-label="Categories" className="hidden border-t lg:block">
      <Container className="grid grid-cols-[17rem_1fr] items-center gap-5 2xl:grid-cols-[19rem_1fr]">
        <AllCategoriesMenu categories={categories} />

        {/* Centred; the first/last auto margins keep it safe when the row overflows. */}
        <ul className="scrollbar-none flex items-center gap-5 overflow-x-auto 2xl:gap-8 [&>li:first-child]:ml-auto [&>li:last-child]:mr-auto">
          {categories.map((c) => (
            <li key={c.id}>
              <Link href={`/categories/${c.slug}`} className={linkClass}>
                <CategoryIcon slug={c.slug} className="hidden size-4 text-primary 2xl:block" />
                {c.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/shop?collection=featured"
              className={cn(linkClass, "font-semibold text-sale hover:border-sale hover:text-sale")}
            >
              Offers
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}
