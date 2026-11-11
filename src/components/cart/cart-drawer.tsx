"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { CategoryIcon } from "@/components/catalog/category-icon";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatPrice } from "@/lib/format";
import { useCart } from "./cart-context";

const stepper =
  "flex size-7 items-center justify-center rounded-full text-foreground/70 transition-colors duration-150 hover:bg-accent hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-40";

export function CartDrawer() {
  const { lines, count, subtotal, freeShippingThreshold, open, setOpen, setQty, remove } = useCart();
  const close = () => setOpen(false);
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = freeShippingThreshold > 0 ? Math.min(100, (subtotal / freeShippingThreshold) * 100) : 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="gap-0 p-0 data-[side=right]:w-[92%] data-[side=right]:sm:max-w-md"
      >
        <SheetHeader className="border-b p-5 pr-14">
          <SheetTitle className="font-heading text-xl font-semibold">
            Your cart {count > 0 && <span className="text-base font-normal text-muted-foreground">({count})</span>}
          </SheetTitle>
          <SheetDescription className="sr-only">Items you have added to your cart</SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-accent text-primary">
              <ShoppingBag className="size-7" strokeWidth={1.5} />
            </span>
            <p className="font-heading text-lg font-semibold">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add some halal groceries and they will appear here.</p>
            <Button asChild variant="outline" size="xl" className="mt-2" onClick={close}>
              <Link href="/shop">Start shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {freeShippingThreshold > 0 && (
              <div className="border-b bg-secondary/50 px-5 py-3">
                <p className="flex items-center gap-2 text-xs font-medium">
                  <Truck className="size-4 text-primary" aria-hidden />
                  {remaining > 0 ? (
                    <span>
                      Add <strong className="text-foreground">{formatPrice(remaining)}</strong> more for free delivery
                    </span>
                  ) : (
                    <span className="text-primary">You have free delivery!</span>
                  )}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border" role="presentation">
                  <div
                    className="h-full rounded-full bg-grad-saffron transition-[width] duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <ul className="flex-1 divide-y overflow-y-auto px-5">
              {lines.map((line) => (
                <li key={line.id} className="animate-in fade-in slide-in-from-right-2 flex gap-3 py-4 duration-300">
                  {/* TODO: replace icon tile with the product photo once image assets exist. */}
                  <Link
                    href={`/products/${line.slug}`}
                    onClick={close}
                    className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sand to-accent text-primary/60"
                    aria-label={line.name}
                  >
                    <CategoryIcon slug={line.categorySlug} className="size-8" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${line.slug}`}
                        onClick={close}
                        className="line-clamp-2 text-sm leading-snug font-semibold hover:text-primary"
                      >
                        {line.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(line.id)}
                        aria-label={`Remove ${line.name} from cart`}
                        className="-mt-1 -mr-1 flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{line.unitLabel}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full border bg-card px-0.5">
                        <button type="button" className={stepper} aria-label={`Decrease quantity of ${line.name}`} onClick={() => setQty(line.id, line.qty - 1)}>
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                          {line.qty}
                        </span>
                        <button type="button" className={stepper} aria-label={`Increase quantity of ${line.name}`} disabled={line.qty >= 99} onClick={() => setQty(line.id, line.qty + 1)}>
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-bold tabular-nums">{formatPrice(line.price * line.qty)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="border-t bg-card p-5">
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-heading text-xl font-semibold tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          <p className="mb-4 text-xs text-muted-foreground">Tax included. Delivery calculated at checkout.</p>
          <div className="grid grid-cols-2 gap-3">
            <Button asChild variant="outline" size="xl" onClick={close}>
              <Link href="/cart">View cart</Link>
            </Button>
            <Button asChild size="xl" onClick={close}>
              <Link href="/checkout">Checkout</Link>
            </Button>
          </div>
          {/* TODO: remove once the real cart service persists items. */}
          <p className="mt-3 text-center text-[0.6875rem] text-muted-foreground">Demo cart: items are kept for this visit only.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
