import Link from "next/link";
import { ArrowRight, Globe2, PackageCheck, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

interface FarmBannerProps {
  countryCount: number;
  productCount: number;
}

export function FarmBanner({ countryCount, productCount }: FarmBannerProps) {
  const stats = [
    { icon: Globe2, value: String(countryCount), label: "Origin countries" },
    { icon: PackageCheck, value: `${productCount.toLocaleString("en-US")}+`, label: "Products in store" },
    { icon: ShieldCheck, value: "100%", label: "Halal certified range" },
  ];

  return (
    <section className="py-6 sm:py-10">
      <Container>
        <div className="pattern-geo grid items-center gap-8 overflow-hidden rounded-2xl bg-emerald-deep px-6 py-10 text-white sm:px-10 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-10 lg:px-14">
          <div>
            <h2 className="font-heading text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
              From Source
              <br />
              To Your Home.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
              We import directly from trusted producers across South &amp; Southeast Asia and Brazil, then pack and ship
              every order across Japan.
            </p>
            <Button asChild size="xl" className="mt-6 bg-grad-saffron text-saffron-foreground hover:brightness-105">
              <Link href="/pages/about">
                Our story
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <dl className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-4 bg-emerald-deep/90 px-5 py-4">
                <span className="flex size-11 items-center justify-center rounded-full border border-saffron/40 text-saffron">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <dd className="font-heading text-2xl leading-none font-bold">{value}</dd>
                  <dt className="mt-1 text-xs text-white/65">{label}</dt>
                </div>
              </div>
            ))}
          </dl>

          {/* TODO: replace with farm / sourcing photography or video thumbnail. */}
          <div
            aria-hidden
            className="hidden aspect-[16/10] items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/70 to-emerald-deep lg:flex"
          >
            <Globe2 className="size-24 text-white/20" strokeWidth={1} />
          </div>
        </div>
      </Container>
    </section>
  );
}
