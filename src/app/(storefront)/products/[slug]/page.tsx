import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ShieldCheck, Snowflake, Star, ThermometerSnowflake, Truck } from "lucide-react";
import { badgeStyles } from "@/components/catalog/product-card";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { UnderlineTabs } from "@/components/common/underline-tabs";
import { Container } from "@/components/layout/container";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { countryName, formatPrice } from "@/lib/format";
import { catalogService, contentService } from "@/services";
import type { Product, StorageType } from "@/types";

type Params = Promise<{ slug: string }>;

const storageInfo: Record<StorageType, { label: string; note: string }> = {
  ambient: { label: "Ambient", note: "Store in a cool, dry place away from direct sunlight. Reseal after opening." },
  chilled: { label: "Chilled", note: "Keep refrigerated at 0–5°C and use within the date shown on the pack." },
  frozen: { label: "Frozen", note: "Keep frozen at −18°C or below. Do not refreeze once thawed." },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = await catalogService.getProduct((await params).slug);
  return { title: product?.name ?? "Product" };
}

async function relatedProducts(product: Product, count = 5): Promise<Product[]> {
  const sameCategory = (await catalogService.listProducts({ categorySlug: product.category.slug, pageSize: 24 })).items;
  const picked = sameCategory.filter((p) => p.id !== product.id);
  if (picked.length >= count) return picked.slice(0, count);
  const others = (await catalogService.listProducts({ pageSize: 48 })).items.filter(
    (p) => p.id !== product.id && !picked.some((x) => x.id === p.id),
  );
  return [...picked, ...others].slice(0, count);
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = await catalogService.getProduct((await params).slug);
  if (!product) notFound();

  const [settings, related] = await Promise.all([contentService.getStoreSettings(), relatedProducts(product)]);

  const country = countryName(product.countryCode);
  const defaultVariant = product.variants.find((v) => v.isDefault) ?? product.variants[0];
  const storage = storageInfo[product.storage];
  const firstBadge = product.badges[0];
  const rating = product.rating ?? 0;
  const description = product.description ?? `${product.name} from ${country}, carefully selected and packed for delivery across Japan.`;

  const details: [string, string][] = [
    ["Category", product.category.name],
    ...(product.subcategory ? ([["Type", product.subcategory.name]] as [string, string][]) : []),
    ["Country of origin", country],
    ...(product.brand ? ([["Brand", product.brand]] as [string, string][]) : []),
    ["Pack size", defaultVariant.label],
    ["SKU", defaultVariant.sku],
    ["Storage", storage.label],
    ["Halal", product.isHalalCertified ? "Halal certified" : "Not certified"],
  ];

  return (
    <Container className="pb-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.category.name, href: `/categories/${product.category.slug}` },
          { label: product.name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12 xl:gap-16">
        <ProductGallery
          images={product.images}
          name={product.name}
          categorySlug={product.category.slug}
          badge={firstBadge ? badgeStyles[firstBadge] : undefined}
        />

        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {product.category.name} · Product of {country}
          </p>
          <h1 className="mt-2 font-heading text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            {product.rating !== undefined && (
              <>
                <span className="flex gap-0.5" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`size-4 ${i < Math.round(rating) ? "fill-gold text-gold" : "text-border"}`} aria-hidden />
                  ))}
                </span>
                <span>
                  <strong className="font-semibold text-foreground">{rating.toFixed(1)}</strong> ({product.reviewCount} customer reviews)
                </span>
                <span aria-hidden>|</span>
              </>
            )}
            <span>SKU: {defaultVariant.sku}</span>
          </div>

          <ProductPurchase
            product={{ id: product.id, slug: product.slug, name: product.name, categorySlug: product.category.slug, inStock: product.inStock }}
            variants={product.variants.map((v) => ({ id: v.id, label: v.label, price: v.price, compareAtPrice: v.compareAtPrice }))}
            defaultVariantId={defaultVariant.id}
          >
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">{description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.isHalalCertified && (
                <li className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground/80">
                  <ShieldCheck className="size-3.5 text-primary" aria-hidden /> 100% Halal
                </li>
              )}
              <li className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground/80">
                From {country}
              </li>
              {product.storage !== "ambient" && (
                <li className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground/80">
                  {product.storage === "frozen" ? <Snowflake className="size-3.5 text-sky-700" aria-hidden /> : <ThermometerSnowflake className="size-3.5 text-sky-700" aria-hidden />}
                  {storage.label} delivery
                </li>
              )}
            </ul>
          </ProductPurchase>

          <div className="mt-6 divide-y rounded-2xl border bg-card shadow-soft">
            <div className="flex gap-4 p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <Truck className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold">Reliable delivery across Japan</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Free over {formatPrice(settings.freeShippingThreshold)}. Delivery options and fees are shown at checkout.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <ShieldCheck className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold">Carefully packed with care</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Appropriate packaging for dry, chilled or frozen items.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <UnderlineTabs
          label="Product information"
          tabs={[
            {
              id: "description",
              label: "Description",
              content: (
                <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>{description}</p>
                  <p>Product descriptions are placeholder content until the catalog is connected to the store backend.</p>
                </div>
              ),
            },
            {
              id: "details",
              label: "Product details",
              content: (
                <dl className="grid max-w-3xl gap-x-10 sm:grid-cols-2">
                  {details.map(([term, value]) => (
                    <div key={term} className="flex justify-between gap-4 border-b py-3 text-sm">
                      <dt className="text-muted-foreground">{term}</dt>
                      <dd className="text-right font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              ),
            },
            {
              id: "delivery",
              label: "Delivery & storage",
              content: (
                <div className="grid max-w-4xl gap-8 text-sm leading-relaxed sm:grid-cols-2">
                  <div>
                    <h3 className="font-semibold">Storage: {storage.label}</h3>
                    <p className="mt-2 text-muted-foreground">{storage.note}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Delivery</h3>
                    <ul className="mt-2 space-y-1 text-muted-foreground">
                      <li>Standard delivery {formatPrice(settings.standardShippingFee)}, free over {formatPrice(settings.freeShippingThreshold)}.</li>
                      {product.storage !== "ambient" && <li>Cool delivery adds {formatPrice(settings.coolShippingFee)} for chilled and frozen items.</li>}
                      <li>Order by {settings.sameDayCutoff} JST for same-day dispatch.</li>
                    </ul>
                  </div>
                </div>
              ),
            },
            {
              id: "reviews",
              label: "Customer reviews",
              content:
                product.rating !== undefined ? (
                  <div className="max-w-3xl text-sm text-muted-foreground">
                    <p>
                      <strong className="font-heading text-2xl text-foreground">{rating.toFixed(1)}</strong> / 5 from {product.reviewCount} reviews
                      (sample figures).
                    </p>
                    <p className="mt-2">Written reviews will appear here once customers can submit them.</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No reviews yet.</p>
                ),
            },
          ]}
        />
      </div>

      <section className="mt-10" aria-labelledby="related-heading">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 id="related-heading" className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            You may also like
          </h2>
          <Link href="/shop" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-emerald-deep">
            View all products
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <ProductGrid products={related} columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" />
      </section>
    </Container>
  );
}
