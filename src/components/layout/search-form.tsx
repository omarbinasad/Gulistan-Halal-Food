import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

/** Plain GET form to /shop — works without client JavaScript. */
export function SearchForm({ className, id = "site-search" }: { className?: string; id?: string }) {
  return (
    <form
      action="/shop"
      method="get"
      role="search"
      className={cn(
        "flex h-11 w-full overflow-hidden rounded-xl border border-input bg-card transition-[border-color,box-shadow] duration-200 focus-within:border-primary focus-within:ring-3 focus-within:ring-ring/25",
        className,
      )}
    >
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <input
        id={id}
        name="q"
        type="search"
        placeholder="Search for halal meat, groceries, spices and more..."
        className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex w-14 items-center justify-center bg-grad-primary text-primary-foreground transition-colors duration-200 hover:brightness-90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-white/60"
      >
        <Search className="size-5" />
      </button>
    </form>
  );
}
