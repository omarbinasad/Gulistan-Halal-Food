import { CategoryIcon } from "@/components/catalog/category-icon";

interface ShopHeroProps {
  eyebrow: string;
  title: string;
  /** Second, accent-coloured line of the heading. */
  accent?: string;
  description?: string;
}

export function ShopHero({ eyebrow, title, accent, description }: ShopHeroProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-accent via-accent to-sand px-6 py-9 sm:px-12 sm:py-12">
      <div className="max-w-xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">✦ {eyebrow}</p>
        <h1 className="mt-3 font-heading text-3xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl">
          {title}
          {accent && (
            <>
              <br />
              <span className="text-primary">{accent}</span>
            </>
          )}
        </h1>
        {description && <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>}
      </div>

      {/* TODO: replace with illustration/photography when image assets are supplied. */}
      <div aria-hidden className="pointer-events-none absolute top-1/2 right-6 -z-10 hidden -translate-y-1/2 md:block lg:right-16">
        <div className="relative size-64 lg:size-72">
          <div className="absolute inset-0 rounded-full bg-white/50" />
          {(["rice", "spices", "grocery-essentials"] as const).map((slug, i) => (
            <span
              key={slug}
              className="absolute flex size-24 items-center justify-center rounded-3xl bg-card text-primary shadow-soft lg:size-28"
              style={{ top: ["8%", "38%", "6%"][i], left: ["-12%", "30%", "58%"][i] }}
            >
              <CategoryIcon slug={slug} className="size-11" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
