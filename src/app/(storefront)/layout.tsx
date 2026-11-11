import { CartProvider } from "@/components/cart/cart-provider";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { catalogService, contentService } from "@/services";

export default async function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const [categories, countries, settings] = await Promise.all([
    catalogService.listCategories(),
    catalogService.listCountries(),
    contentService.getStoreSettings(),
  ]);

  return (
    <CartProvider freeShippingThreshold={settings.freeShippingThreshold}>
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-grad-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <AnnouncementBar settings={settings} />
      <SiteHeader categories={categories} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter categories={categories} countries={countries} settings={settings} />
    </div>
    </CartProvider>
  );
}
