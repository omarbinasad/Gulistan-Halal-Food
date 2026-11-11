import Link from "next/link";
import { ArrowRight, Moon, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Banner } from "@/types";

const styles = [
  { card: "pattern-geo bg-emerald-deep text-white", sub: "text-white/75", icon: Moon, iconClass: "text-gold/80", btn: "bg-grad-saffron text-saffron-foreground hover:brightness-105" },
  { card: "bg-sand text-emerald-deep", sub: "text-emerald-deep/70", icon: Users, iconClass: "text-primary/30", btn: "bg-grad-primary text-primary-foreground hover:brightness-90" },
];

export function PromoBanners({ banners }: { banners: Banner[] }) {
  return (
    <section className="py-6 sm:py-10">
      <Container className="grid gap-5 md:grid-cols-2">
        {banners.slice(0, 2).map((banner, i) => {
          const s = styles[i % styles.length];
          const Icon = s.icon;
          return (
            <div key={banner.id} className={cn("relative isolate flex min-h-44 items-center overflow-hidden rounded-2xl p-7 sm:p-9", s.card)}>
              <Icon aria-hidden className={cn("absolute top-1/2 right-6 -z-10 size-32 -translate-y-1/2 transition-transform duration-500 sm:right-10 sm:size-40", s.iconClass)} strokeWidth={1} />
              <div>
                <h2 className="font-heading text-3xl font-bold tracking-tight">{banner.title}</h2>
                {banner.eyebrow && <p className={cn("mt-1.5 text-sm", s.sub)}>{banner.eyebrow}</p>}
                {banner.cta && (
                  <Button asChild size="lg" className={cn("mt-5 h-9 rounded-lg px-4 font-semibold", s.btn)}>
                    <Link href={banner.cta.href}>
                      {banner.cta.label}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
