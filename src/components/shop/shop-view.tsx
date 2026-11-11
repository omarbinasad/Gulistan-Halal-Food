import Link from "next/link";
import { Globe2, LayoutGrid } from "lucide-react";
import { CategoryIcon } from "@/components/catalog/category-icon";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Breadcrumbs, type Crumb } from "@/components/common/breadcrumbs";
import { ScrollRow } from "@/components/common/scroll-row";
import { Container } from "@/components/layout/container";
import { flagBackground } from "@/lib/flags";
import { cn } from "@/lib/utils";
import { catalogService } from "@/services";
import type { ProductCollection, ProductQuery, ProductSort } from "@/types";
import { ShopFilters, type FilterCategory } from "./shop-filters";
import { ShopHero } from "./shop-hero";
import { ShopShell } from "./shop-shell";
import { SortSelect } from "./sort-select";

type Params = Record<string, string | string[] | undefined>;

const SORTS: ProductSort[] = ["featured", "newest", "price-asc", "price-desc", "popular"];
export const COLLECTION_TITLES: Record<ProductCollection, string> = {
  featured: "Featured products",
  popular: "Popular products",
  "new-arrivals": "New arrivals",
};

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

const pill =
  "inline-flex shrink-0 snap-start items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-soft transition-[background-color,color,border-color,box-shadow] duration-200 hover:border-primary/40 hover:text-primary hover:shadow-lift focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";
const pillActive = "border-primary bg-accent text-primary";

interface ShopViewProps {
  /** Path of the current page; filter links are built from it. */
  basePath: string;
  params: Params;
  /** Filters fixed by the route (category / country pages). */
  fixed?: { category?: string; country?: string };
  hero: { eyebrow: string; title: string; accent?: string; description?: string };
  /** Heading above the grid. */
  listTitle: string;
  breadcrumbs: Crumb[];
}

/** Shared shop layout for /shop, /categories/[slug] and /countries/[slug]. Filter state lives in the URL. */
export async function ShopView({ basePath, params, fixed, hero, listTitle, breadcrumbs }: ShopViewProps) {
  const q = first(params.q)?.trim() || undefined;
  const collectionParam = first(params.collection);
  const collection = collectionParam && collectionParam in COLLECTION_TITLES ? (collectionParam as ProductCollection) : undefined;
  const sortParam = first(params.sort) as ProductSort | undefined;
  const sort = sortParam && SORTS.includes(sortParam) ? sortParam : undefined;
  const categorySlug = fixed?.category ?? first(params.category);
  const countrySlug = fixed?.country ?? first(params.country);
  const subSlug = first(params.sub);
  const maxRaw = Number(first(params.max));
  const maxPrice = Number.isFinite(maxRaw) && maxRaw > 0 ? maxRaw : undefined;
  const inStockOnly = first(params.stock) === "1";
  const onSale = first(params.offers) === "1";
  const newOnly = first(params.new) === "1";

  const query: ProductQuery = { q, collection, sort, categorySlug, subcategorySlug: subSlug, countrySlug, maxPrice, inStockOnly, onSale, newOnly, pageSize: 48 };
  const [result, facets, categories, countries] = await Promise.all([
    catalogService.listProducts(query),
    catalogService.getProductFacets(query),
    catalogService.listCategories(),
    catalogService.listCountries(),
  ]);

  const selectedCategory = categories.find((c) => c.slug === categorySlug);
  const subcategories = selectedCategory?.subcategories ?? [];

  /** Current params with some dropped / added, appended to a path. */
  const hrefWith = (path: string, drop: string[] = [], add: Record<string, string> = {}) => {
    const next = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      const v = first(value);
      if (v !== undefined && !drop.includes(key)) next.set(key, v);
    }
    for (const [key, value] of Object.entries(add)) next.set(key, value);
    const qs = next.toString();
    return qs ? `${path}?${qs}` : path;
  };

  const allCategoriesHref = fixed?.category ? hrefWith("/shop", ["category", "sub", "page"]) : hrefWith(basePath, ["category", "sub", "page"]);
  const filterCategories: FilterCategory[] = [
    { slug: null, name: "All Categories", count: facets.total, href: allCategoriesHref, active: !categorySlug },
    ...facets.categories
      .filter((c) => c.count > 0 || c.slug === categorySlug)
      .map((c) => ({
        slug: c.slug,
        name: c.name,
        count: c.count,
        active: c.slug === categorySlug,
        href: fixed?.category
          ? hrefWith(`/categories/${c.slug}`, ["category", "sub", "page"])
          : hrefWith(basePath, ["category", "sub", "page"], { category: c.slug }),
      })),
  ];

  const filterKeys = ["max", "stock", "offers", "new", "sub", "page", ...(fixed?.category ? [] : ["category"])];
  const hasActiveFilters = maxPrice !== undefined || inStockOnly || onSale || newOnly || !!subSlug || (!fixed?.category && !!first(params.category));

  const categoryPath = fixed?.category ? `/categories/${categorySlug}` : basePath;

  return (
    <Container className="pb-14">
      <Breadcrumbs items={breadcrumbs} />
      <ShopHero {...hero} />

      {/* Carousels: categories first, then country of origin. */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <p className="w-36 shrink-0 text-sm font-semibold">Shop by category</p>
          <ScrollRow label="categories" className="flex-1">
            <Link href="/shop" aria-current={!categorySlug ? "true" : undefined} className={cn(pill, !categorySlug && pillActive)}>
              <LayoutGrid className="size-4" aria-hidden />
              All categories
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/categories/${c.slug}`}
                aria-current={c.slug === categorySlug ? "true" : undefined}
                className={cn(pill, c.slug === categorySlug && pillActive)}
              >
                <CategoryIcon slug={c.slug} className="size-4 text-primary" />
                {c.name}
              </Link>
            ))}
          </ScrollRow>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <p className="w-36 shrink-0 text-sm font-semibold">Shop by origin</p>
          <ScrollRow label="countries" className="flex-1">
            <Link href="/shop" aria-current={!countrySlug ? "true" : undefined} className={cn(pill, !countrySlug && pillActive)}>
              <Globe2 className="size-4" aria-hidden />
              All countries
            </Link>
            {countries.map((c) => (
              <Link
                key={c.id}
                href={`/countries/${c.slug}`}
                aria-current={c.slug === countrySlug ? "true" : undefined}
                className={cn(pill, c.slug === countrySlug && pillActive)}
              >
                <span aria-hidden className="size-5 rounded-full ring-1 ring-border" style={{ background: flagBackground(c.countryCode) }} />
                {c.name}
              </Link>
            ))}
          </ScrollRow>
        </div>
      </div>

      <div className="mt-8">
        <ShopShell
          heading={
            <>
              <h2 className="font-heading text-2xl font-bold tracking-tight">{listTitle}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Showing {result.items.length} of {result.total} carefully selected {result.total === 1 ? "product" : "products"}
              </p>
            </>
          }
          sort={<SortSelect value={sort ?? "featured"} />}
          filters={
            <ShopFilters
              categories={filterCategories}
              price={{ min: facets.price.min, max: facets.price.max, value: Math.min(maxPrice ?? facets.price.max, facets.price.max) }}
              inStockOnly={inStockOnly}
              onSale={onSale}
              newOnly={newOnly}
              clearHref={hasActiveFilters ? hrefWith(basePath, filterKeys) : null}
            />
          }
        >
          {subcategories.length > 0 && (
            <ScrollRow label="subcategories" className="mb-5">
              <Link href={hrefWith(categoryPath, ["sub", "page"])} aria-current={!subSlug ? "true" : undefined} className={cn(pill, "py-1.5", !subSlug && pillActive)}>
                All {selectedCategory?.name}
              </Link>
              {subcategories.map((s) => (
                <Link
                  key={s.id}
                  href={hrefWith(categoryPath, ["sub", "page"], { sub: s.slug })}
                  aria-current={s.slug === subSlug ? "true" : undefined}
                  className={cn(pill, "py-1.5", s.slug === subSlug && pillActive)}
                >
                  {s.name}
                </Link>
              ))}
            </ScrollRow>
          )}
          <ProductGrid products={result.items} columns="grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" />
        </ShopShell>
      </div>
    </Container>
  );
}
