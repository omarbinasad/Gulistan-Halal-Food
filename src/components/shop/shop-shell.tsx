"use client";

import { createContext, useCallback, useContext, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface ShopContextValue {
  pending: boolean;
  /** Client-side navigation that dims the results while the new ones load. */
  go: (href: string) => void;
  /** Merge query-param updates (null removes a param) into the current URL. */
  navigate: (updates: Record<string, string | null>) => void;
}

const ShopContext = createContext<ShopContextValue>({ pending: false, go: () => {}, navigate: () => {} });
export const useShop = () => useContext(ShopContext);

interface ShopShellProps {
  heading: React.ReactNode;
  filters: React.ReactNode;
  sort: React.ReactNode;
  children: React.ReactNode;
}

/** Sidebar + results layout. Filters live in the URL; this wires up navigation, pending state and the mobile drawer. */
export function ShopShell({ heading, filters, sort, children }: ShopShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const go = useCallback(
    (href: string) => startTransition(() => router.push(href, { scroll: false })),
    [router],
  );

  const navigate = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null) params.delete(key);
        else params.set(key, value);
      }
      params.delete("page");
      const qs = params.toString();
      go(qs ? `${pathname}?${qs}` : pathname);
    },
    [searchParams, pathname, go],
  );

  return (
    <ShopContext.Provider value={{ pending, go, navigate }}>
      <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] 2xl:grid-cols-[17.5rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">{filters}</aside>

        <section className="min-w-0">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>{heading}</div>
            <div className="flex items-center gap-2">
              <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="lg" className="h-10 gap-2 rounded-lg px-3 lg:hidden">
                    <SlidersHorizontal className="size-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="gap-0 overflow-y-auto p-4 data-[side=left]:w-[88%] data-[side=left]:sm:max-w-sm">
                  <SheetHeader className="p-0 pr-10 pb-4">
                    <SheetTitle className="font-heading text-xl">Filters</SheetTitle>
                    <SheetDescription className="sr-only">Filter the product list</SheetDescription>
                  </SheetHeader>
                  {filters}
                  <Button size="xl" className="mt-5 w-full" onClick={() => setDrawerOpen(false)}>
                    Show results
                  </Button>
                </SheetContent>
              </Sheet>
              {sort}
            </div>
          </div>

          <div aria-busy={pending} className={cn("transition-opacity duration-200", pending && "pointer-events-none opacity-50")}>
            {children}
          </div>
        </section>
      </div>
    </ShopContext.Provider>
  );
}
