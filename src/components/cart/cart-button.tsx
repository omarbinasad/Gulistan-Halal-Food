"use client";

import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "./cart-context";

/** Header cart icon with badge. `data-cart-target` is where flying product images land. */
function CartIndicator() {
  const { count, bump } = useCart();
  return (
    <span key={bump} data-cart-target className={cn("relative", bump > 0 && "animate-cart-bump")}>
      <ShoppingCart className="size-6 text-foreground/80" strokeWidth={1.5} />
      <span
        aria-hidden
        className="absolute -top-2 -right-2.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-grad-primary px-1 text-[0.625rem] font-bold text-primary-foreground"
      >
        {count > 99 ? "99+" : count}
      </span>
      <span className="sr-only">Cart, {count} items</span>
    </span>
  );
}

/** Opens the mini-cart drawer. */
export function CartButton({ className }: { className?: string }) {
  const { open, setOpen } = useCart();
  return (
    <button type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
      <CartIndicator />
      <span className="hidden text-sm font-semibold xl:block" aria-hidden>
        Cart
      </span>
    </button>
  );
}
