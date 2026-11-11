"use client";

import { createContext, useContext } from "react";

/**
 * UI-only cart state (no CartService / backend yet): lines live in memory for the current page
 * visit and are not persisted. TODO: replace with the real cart service when it exists.
 */
export interface CartProduct {
  id: string;
  slug: string;
  name: string;
  unitLabel: string;
  /** Integer JPY, tax included. */
  price: number;
  categorySlug: string;
}

export interface CartLine extends CartProduct {
  qty: number;
}

export interface CartState {
  lines: CartLine[];
  count: number;
  subtotal: number;
  freeShippingThreshold: number;
  /** Increments each time items land in the cart; used to replay the bump animation. */
  bump: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Flies a copy of `source` to the header cart icon (if possible), then adds the items. */
  addToCart: (product: CartProduct, qty: number, source: Element | null) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
}

const noop = () => {};

export const CartContext = createContext<CartState>({
  lines: [],
  count: 0,
  subtotal: 0,
  freeShippingThreshold: 0,
  bump: 0,
  open: false,
  setOpen: noop,
  addToCart: noop,
  setQty: noop,
  remove: noop,
});

export const useCart = () => useContext(CartContext);
