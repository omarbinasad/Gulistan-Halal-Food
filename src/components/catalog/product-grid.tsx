import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { ProductCard } from "./product-card";

const defaultColumns = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6";

export function ProductGrid({
  products,
  columns = defaultColumns,
  className,
}: {
  products: Product[];
  /** Tailwind grid-cols classes; override for denser home rows. */
  columns?: string;
  className?: string;
}) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed bg-card px-6 py-16 text-center text-sm text-muted-foreground">
        No products found.
      </p>
    );
  }

  return (
    <div className={cn("grid gap-3 sm:gap-4", columns, className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
