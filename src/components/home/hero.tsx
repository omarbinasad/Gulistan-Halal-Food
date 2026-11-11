import { Container } from "@/components/layout/container";
import { CategoryMenu } from "@/components/layout/category-menu";
import type { Banner, Category } from "@/types";
import { HeroSlider } from "./hero-slider";

export function Hero({ banners, categories }: { banners: Banner[]; categories: Category[] }) {
  return (
    <Container className="pt-5 sm:pt-6">
      <div className="grid gap-5 lg:grid-cols-[17rem_1fr] 2xl:grid-cols-[19rem_1fr]">
        <nav aria-label="Browse categories" className="hidden rounded-2xl border bg-card p-2 shadow-soft lg:block">
          <CategoryMenu categories={categories} />
        </nav>

        <HeroSlider banners={banners} categories={categories} />
      </div>
    </Container>
  );
}
