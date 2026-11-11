"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Heart, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart, type CartProduct } from "@/components/cart/cart-context";

/**
 * UI feedback only: no cart/wishlist service exists yet, so nothing is persisted.
 * TODO: wire to CartService / WishlistService when available.
 */
export function WishlistButton({ productName, className }: { productName: string; className?: string }) {
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`${active ? "Remove" : "Add"} ${productName} ${active ? "from" : "to"} wishlist`}
      onClick={() => setActive((v) => !v)}
      className={cn(
        "flex size-8 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur transition-all duration-200 hover:scale-110 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none active:scale-95",
        active ? "text-sale" : "text-foreground/60 hover:text-sale",
        className,
      )}
    >
      <Heart className={cn("size-4 transition-transform duration-200", active && "scale-110 fill-current")} />
    </button>
  );
}

export function AddToCart({ product, disabled }: { product: CartProduct; disabled?: boolean }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { addToCart } = useCart();
  const productName = product.name;

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    const source = e.currentTarget.closest("article")?.querySelector("[data-fly-source]") ?? null;
    addToCart(product, qty, source);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  }

  const stepper =
    "flex size-6 items-center justify-center rounded-full text-foreground/70 transition-colors duration-150 hover:bg-accent hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-40";

  return (
    <div className="relative z-10 flex items-center justify-between gap-1.5">
      <div className="flex items-center rounded-full border bg-card px-0.5 text-sm">
        <button type="button" className={stepper} aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty((q) => q - 1)}>
          <Minus className="size-3" />
        </button>
        <span className="min-w-5 text-center text-xs font-semibold tabular-nums" aria-live="polite">
          {qty}
        </span>
        <button type="button" className={stepper} aria-label="Increase quantity" disabled={qty >= 20} onClick={() => setQty((q) => q + 1)}>
          <Plus className="size-3" />
        </button>
      </div>
      <button
        type="button"
        aria-label={`Add ${qty} × ${productName} to cart`}
        disabled={disabled}
        onClick={handleAdd}
        className={cn(
          "flex size-9 items-center justify-center rounded-full text-primary-foreground shadow-sm transition-all duration-200 hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none active:scale-95 disabled:opacity-50",
          added ? "bg-grad-saffron" : "bg-grad-primary hover:brightness-90",
        )}
      >
        {added ? <Check className="size-4" /> : <Plus className="size-4" />}
      </button>
      <span role="status" className="sr-only">
        {added ? `${productName} added (demo)` : ""}
      </span>
    </div>
  );
}
