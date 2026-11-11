import { Leaf, Sprout } from "lucide-react";
import { CountryCard } from "@/components/catalog/country-card";
import { CardCarousel } from "@/components/common/card-carousel";
import { Container } from "@/components/layout/container";
import type { CountryCollection } from "@/types";

export function CountrySection({ countries }: { countries: CountryCollection[] }) {
  return (
    <section
      id="shop-by-country"
      className="relative isolate scroll-mt-40 overflow-hidden bg-gradient-to-b from-secondary/70 via-background to-secondary/50 py-14 sm:py-20"
    >
      {/* Decorative leaves (purely visual). */}
      <Sprout aria-hidden strokeWidth={0.75} className="absolute -top-4 -left-6 -z-10 size-40 -rotate-12 text-primary/15 sm:size-56" />
      <Leaf aria-hidden strokeWidth={0.75} className="absolute -right-8 -bottom-6 -z-10 size-40 rotate-12 text-primary/15 sm:size-56" />

      <Container>
        <div className="mb-10 text-center sm:mb-14">
          <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">Global flavors — Halal always</p>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-5xl">Shop by Country of Origin</h2>
          <div aria-hidden className="mt-5 flex items-center justify-center gap-3 text-primary/70">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
            <Leaf className="size-5" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </div>

        <CardCarousel label="countries">
          {countries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </CardCarousel>
      </Container>
    </section>
  );
}
