"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice, discountPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PurchaseVariant {
  id: string;
  label: string;
  price: number;
  compareAtPrice?: number;
}

interface ProductPurchaseProps {
  product: { id: string; slug: string; name: string; categorySlug: string; inStock: boolean };
  variants: PurchaseVariant[];
  defaultVariantId: string;
  /** Server-rendered description and tags, shown between price and options. */
  children?: React.ReactNode;
}

/** Price, pack size, quantity and Add to Cart. UI-only cart (see cart-context). */
export function ProductPurchase({ product, variants, defaultVariantId, children }: ProductPurchaseProps) {
  const [variantId, setVariantId] = useState(defaultVariantId);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { addToCart } = useCart();

  useEffect(() => () => clearTimeout(timer.current), []);

  const variant = variants.find((v) => v.id === variantId) ?? variants[0];
  const discount = discountPercent(variant.price, variant.compareAtPrice);
  const showSizes = variants.length > 1;

  function handleAdd() {
    const source = document.querySelector("[data-product-visual]");
    addToCart(
      {
        id: variants.length > 1 ? variant.id : product.id,
        slug: product.slug,
        name: product.name,
        unitLabel: variant.label,
        price: variant.price,
        categorySlug: product.categorySlug,
      },
      qty,
      source,
    );
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  }

  const stepper =
    "flex size-11 items-center justify-center text-foreground/70 transition-colors duration-150 hover:bg-accent hover:text-primary focus-visible:bg-accent focus-visible:outline-none disabled:opacity-40";

  return (
    <div>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="font-heading text-4xl font-bold tracking-tight tabular-nums">{formatPrice(variant.price)}</p>
        {variant.compareAtPrice && variant.compareAtPrice > variant.price && (
          <>
            <p className="text-base text-muted-foreground tabular-nums line-through">
              <span className="sr-only">Was </span>
              {formatPrice(variant.compareAtPrice)}
            </p>
            {discount && <span className="rounded-md bg-sale/10 px-2 py-0.5 text-xs font-bold text-sale">−{discount}%</span>}
          </>
        )}
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
            product.inStock ? "bg-accent text-primary" : "bg-muted text-muted-foreground",
          )}
        >
          <span className={cn("size-1.5 rounded-full", product.inStock ? "bg-primary" : "bg-muted-foreground")} aria-hidden />
          {product.inStock ? "In stock" : "Out of stock"}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Tax included. Delivery calculated at checkout.</p>

      {children}

      <div className="mt-6 border-t pt-6">
        {showSizes && (
          <div className="mb-6">
            <p id="pack-size-label" className="mb-3 text-sm font-semibold">
              Choose pack size
            </p>
            <div role="radiogroup" aria-labelledby="pack-size-label" className="flex flex-wrap gap-2.5">
              {variants.map((v) => {
                const selected = v.id === variantId;
                return (
                  <button
                    key={v.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setVariantId(v.id)}
                    className={cn(
                      "min-w-16 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
                      selected ? "border-primary bg-accent text-primary shadow-soft" : "bg-card text-foreground/80 hover:border-primary/50 hover:text-primary",
                    )}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-stretch gap-3">
          <div className="flex h-12 items-center overflow-hidden rounded-xl border bg-card">
            <button type="button" className={stepper} aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty((q) => q - 1)}>
              <Minus className="size-4" />
            </button>
            <span className="min-w-10 text-center text-sm font-bold tabular-nums" aria-live="polite">
              {qty}
            </span>
            <button type="button" className={stepper} aria-label="Increase quantity" disabled={qty >= 99} onClick={() => setQty((q) => q + 1)}>
              <Plus className="size-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock}
            className={cn(
              "flex h-12 min-w-48 flex-1 items-center justify-center gap-2.5 rounded-xl px-6 text-base font-semibold text-primary-foreground shadow-soft transition-[background-color,box-shadow,scale] duration-200 hover:shadow-lift focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none active:scale-[0.99] disabled:opacity-50",
              added ? "bg-grad-saffron" : "bg-grad-primary hover:brightness-90",
            )}
          >
            {added ? <Check className="size-5" /> : <ShoppingCart className="size-5" />}
            {added ? "Added to cart" : "Add to Cart"}
            {!added && <ArrowRight className="size-4" />}
          </button>

          {/* TODO: connect to the wishlist service once customer accounts exist. */}
          <button
            type="button"
            aria-pressed={wished}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => setWished((w) => !w)}
            className={cn(
              "flex size-12 items-center justify-center rounded-xl border bg-card transition-[color,border-color,background-color] duration-200 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
              wished ? "border-sale/40 bg-sale/5 text-sale" : "text-foreground/60 hover:border-sale/40 hover:text-sale",
            )}
          >
            <Heart className={cn("size-5 transition-transform duration-200", wished && "scale-110 fill-current")} />
          </button>
        </div>
        <span role="status" className="sr-only">
          {added ? `${qty} × ${product.name} added to cart (demo)` : ""}
        </span>
      </div>
    </div>
  );
}
