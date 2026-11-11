import type { Metadata } from "next";
import { COLLECTION_TITLES, ShopView } from "@/components/shop/shop-view";
import type { ProductCollection } from "@/types";

export const metadata: Metadata = { title: "Shop" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = (Array.isArray(params.q) ? params.q[0] : params.q)?.trim();
  const collectionParam = Array.isArray(params.collection) ? params.collection[0] : params.collection;
  const collectionTitle = collectionParam && collectionParam in COLLECTION_TITLES ? COLLECTION_TITLES[collectionParam as ProductCollection] : undefined;

  const listTitle = q ? `Results for “${q}”` : (collectionTitle ?? "Shop All Products");

  return (
    <ShopView
      basePath="/shop"
      params={params}
      listTitle={listTitle}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: q ? "Search" : (collectionTitle ?? "Shop All Products") }]}
      hero={
        q || collectionTitle
          ? { eyebrow: "Shop", title: listTitle, description: "Fresh, authentic and carefully selected." }
          : {
              eyebrow: "The everyday good stuff",
              title: "Good food.",
              accent: "Great beginnings.",
              description: "Discover the flavors you love, from home to your doorstep in Japan. Fresh, authentic and carefully selected.",
            }
      }
    />
  );
}
