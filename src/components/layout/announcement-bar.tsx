import Link from "next/link";
import { Leaf, ShieldCheck, Truck } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { StoreSettings } from "@/types";
import { Container } from "./container";

const utilityLinks = [
  { title: "Track Order", href: "/account/orders" },
  { title: "Help Center", href: "/pages/faq" },
];

export function AnnouncementBar({ settings }: { settings: StoreSettings }) {
  return (
    <div className="bg-grad-deep text-xs text-white/90">
      <Container className="flex h-10 items-center justify-center gap-8 md:justify-between">
        <ul className="flex items-center gap-8">
          <li className="flex items-center gap-2">
            <Truck className="size-4 text-saffron" aria-hidden />
            <span>
              Free Delivery on Orders Over{" "}
              <strong className="font-semibold">{formatPrice(settings.freeShippingThreshold)}</strong>
            </span>
          </li>
          <li className="hidden items-center gap-2 md:flex">
            <ShieldCheck className="size-4 text-saffron" aria-hidden />
            100% Halal Certified Products
          </li>
          <li className="hidden items-center gap-2 xl:flex">
            <Leaf className="size-4 text-saffron" aria-hidden />
            Freshness Guaranteed
          </li>
        </ul>
        <ul className="hidden items-center gap-6 md:flex">
          {utilityLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors duration-200 hover:text-white">
                {l.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
