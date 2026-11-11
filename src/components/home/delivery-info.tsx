import Link from "next/link";
import { Clock, PackageCheck, ShoppingCart, Truck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { formatPrice } from "@/lib/format";
import type { StoreSettings } from "@/types";

const steps = [
  { icon: ShoppingCart, title: "Order online", body: "Browse thousands of halal products and check out in minutes." },
  { icon: PackageCheck, title: "Packed with care", body: "Ambient, chilled and frozen items are packed separately." },
  { icon: Truck, title: "Delivered to you", body: "Choose a delivery slot that suits you, anywhere in Japan." },
];

export function DeliveryInfo({ settings }: { settings: StoreSettings }) {
  const facts = [
    { label: "Free delivery over", value: formatPrice(settings.freeShippingThreshold) },
    { label: "Standard delivery", value: formatPrice(settings.standardShippingFee) },
    { label: "Cool delivery add-on", value: `+${formatPrice(settings.coolShippingFee)}` },
    { label: "Same-day dispatch cutoff", value: settings.sameDayCutoff },
  ];

  return (
    <section className="bg-secondary/60 py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">Delivery</p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Nationwide delivery, from Hokkaido to Okinawa
          </h2>
          <p className="mt-3 text-muted-foreground">
            Delivery fees and times may vary for remote islands.{" "}
            <Link href="/pages/delivery" className="font-medium text-primary underline decoration-transparent underline-offset-4 hover:decoration-current">
              Full delivery details
            </Link>
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl border bg-card p-4 shadow-soft">
                <dt className="text-xs text-muted-foreground">{f.label}</dt>
                <dd className="mt-1 font-heading text-xl font-semibold text-foreground tabular-nums">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Clock className="size-4 text-primary" aria-hidden />
              Delivery time slots
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {settings.deliverySlots.map((slot) => (
                <li key={slot} className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-foreground/80">
                  {slot}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ol className="relative space-y-4 self-center">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="flex gap-4 rounded-2xl border bg-card p-5 shadow-soft">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-grad-primary text-primary-foreground">
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">Step {i + 1}</p>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
