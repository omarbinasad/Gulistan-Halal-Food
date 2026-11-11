import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopView } from "@/components/shop/shop-view";
import { catalogService } from "@/services";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const country = await catalogService.getCountry((await params).slug);
  return { title: country ? `From ${country.name}` : "Country" };
}

export default async function CountryPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const country = await catalogService.getCountry((await params).slug);
  if (!country) notFound();
  const title = `From ${country.name}`;

  return (
    <ShopView
      basePath={`/countries/${country.slug}`}
      params={await searchParams}
      fixed={{ country: country.slug }}
      listTitle={title}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: country.name }]}
      hero={{ eyebrow: "Country of origin", title, description: country.tagline }}
    />
  );
}
