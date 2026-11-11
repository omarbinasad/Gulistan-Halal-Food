import { CategoryCard } from "@/components/catalog/category-card";
import { ProductGrid } from "@/components/catalog/product-grid";
import { SectionHeading } from "@/components/common/section-heading";
import { CountrySection } from "@/components/home/country-section";
import { DeliveryInfo } from "@/components/home/delivery-info";
import { FarmBanner } from "@/components/home/farm-banner";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { ProductTabs } from "@/components/home/product-tabs";
import { PromoBanners } from "@/components/home/promo-banners";
import { Testimonials } from "@/components/home/testimonials";
import { WhyShop } from "@/components/home/why-shop";
import { Container } from "@/components/layout/container";
import { catalogService, contentService } from "@/services";

const homeColumns = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7";

export default async function HomePage() {
  const [categories, countries, featured, popular, newArrivals, banners, settings, testimonials] = await Promise.all([
    catalogService.listCategories(),
    catalogService.listCountries(),
    catalogService.listProducts({ collection: "featured", pageSize: 7 }),
    catalogService.listProducts({ collection: "popular", sort: "popular", pageSize: 7 }),
    catalogService.listProducts({ collection: "new-arrivals", pageSize: 7 }),
    contentService.listBanners(),
    contentService.getStoreSettings(),
    contentService.listTestimonials(),
  ]);

  const heroBanners = banners.filter((b) => b.placement === "hero");
  const promos = banners.filter((b) => b.placement === "promo");
  const productCount = Math.floor(categories.reduce((sum, c) => sum + (c.productCount ?? 0), 0) / 100) * 100;

  return (
    <>
      {heroBanners.length > 0 && <Hero banners={heroBanners} categories={categories} />}

      <section className="py-10 sm:py-14">
        <Container>
          <SectionHeading
            title="Shop by Category"
            action={{ label: "View All Categories", href: "/shop" }}
            className="mb-6"
          />
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </Container>
      </section>

      <CountrySection countries={countries} />

      <FarmBanner countryCount={countries.length} productCount={productCount} />

      <section className="py-10 sm:py-14">
        <Container>
          <ProductTabs
            title="Featured Products"
            tabs={[
              { id: "featured", label: "Featured", href: "/shop?collection=featured", content: <ProductGrid products={featured.items} columns={homeColumns} /> },
              { id: "popular", label: "Popular", href: "/shop?sort=popular", content: <ProductGrid products={popular.items} columns={homeColumns} /> },
              { id: "new", label: "New Arrivals", href: "/shop?collection=new-arrivals", content: <ProductGrid products={newArrivals.items} columns={homeColumns} /> },
            ]}
          />
        </Container>
      </section>

      <WhyShop />
      <PromoBanners banners={promos} />
      <DeliveryInfo settings={settings} />
      <Testimonials items={testimonials} />
      <Newsletter />
    </>
  );
}
