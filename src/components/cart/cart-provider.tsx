"use client";

import { useCallback, useMemo, useState } from "react";
import { CartContext, type CartLine, type CartProduct } from "./cart-context";
import { CartDrawer } from "./cart-drawer";

const FLIGHT_MS = 800;
const MAX_QTY = 99;

export function CartProvider({
  freeShippingThreshold,
  children,
}: {
  freeShippingThreshold: number;
  children: React.ReactNode;
}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [bump, setBump] = useState(0);
  const [open, setOpen] = useState(false);

  const land = useCallback((product: CartProduct, qty: number) => {
    setLines((current) => {
      const existing = current.find((l) => l.id === product.id);
      if (!existing) return [...current, { ...product, qty: Math.min(qty, MAX_QTY) }];
      return current.map((l) => (l.id === product.id ? { ...l, qty: Math.min(l.qty + qty, MAX_QTY) } : l));
    });
    setBump((b) => b + 1);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((current) =>
      qty <= 0 ? current.filter((l) => l.id !== id) : current.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, MAX_QTY) } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => setLines((current) => current.filter((l) => l.id !== id)), []);

  const addToCart = useCallback(
    (product: CartProduct, qty: number, source: Element | null) => {
      const target = document.querySelector<HTMLElement>("[data-cart-target]");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const from = source?.getBoundingClientRect();

      if (!source || !target || !from || from.width === 0 || reduceMotion || !("animate" in Element.prototype)) {
        land(product, qty);
        return;
      }

      const to = target.getBoundingClientRect();
      const flyer = document.createElement("div");
      Object.assign(flyer.style, {
        position: "fixed",
        left: `${from.left}px`,
        top: `${from.top}px`,
        width: `${from.width}px`,
        height: `${from.height}px`,
        margin: "0",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: "60",
        borderRadius: "12px",
        boxShadow: "0 12px 32px -8px rgba(0, 0, 0, 0.35)",
        willChange: "transform, opacity",
      });
      flyer.setAttribute("aria-hidden", "true");
      const clone = source.cloneNode(true) as HTMLElement;
      clone.removeAttribute("id");
      flyer.appendChild(clone);
      document.body.appendChild(flyer);

      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      const endScale = Math.max(0.1, 24 / Math.max(from.width, from.height));
      const lift = Math.min(120, Math.abs(dy) * 0.3 + 40); // arc: swings up past the straight line

      const animation = flyer.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1, borderRadius: "12px" },
          {
            transform: `translate(${dx * 0.55}px, ${dy * 0.45 - lift}px) scale(${(1 + endScale) / 2})`,
            opacity: 1,
            borderRadius: "40%",
            offset: 0.55,
          },
          { transform: `translate(${dx}px, ${dy}px) scale(${endScale})`, opacity: 0.35, borderRadius: "50%" },
        ],
        { duration: FLIGHT_MS, easing: "cubic-bezier(0.45, 0, 0.2, 1)" },
      );
      animation.onfinish = animation.oncancel = () => {
        flyer.remove();
        land(product, qty);
      };
    },
    [land],
  );

  const value = useMemo(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((sum, l) => sum + l.price * l.qty, 0),
      freeShippingThreshold,
      bump,
      open,
      setOpen,
      addToCart,
      setQty,
      remove,
    }),
    [lines, freeShippingThreshold, bump, open, addToCart, setQty, remove],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}
