import { Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import type { Testimonial } from "@/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">What our customers say</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Sample feedback shown for layout preview only.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col rounded-2xl border bg-card p-6 shadow-soft transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }, (_, i) => (
                  <Star key={i} className="size-4 fill-gold text-gold" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary" aria-hidden>
                  {t.name.slice(-1)}
                </span>
                <span className="text-sm leading-tight">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="text-xs text-muted-foreground">{t.location}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
