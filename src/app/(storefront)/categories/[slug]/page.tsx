import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopView } from "@/components/shop/shop-view";
import { catalogService } from "@/services";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: SearchParams }): Promise<Metadata> {
  const category = await catalogService.getCategory((await params).slug);
  if (!category) return { title: "Category" };
  const sub = (await searchParams).sub;
  const subSlug = Array.isArray(sub) ? sub[0] : sub;
  const subcategory = category.subcategories?.find((s) => s.slug === subSlug);
  return { title: subcategory ? `${subcategory.name} · ${category.name}` : category.name };
}

export default async function CategoryPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const category = await catalogService.getCategory((await params).slug);
  if (!category) notFound();
  const query = await searchParams;
  const sub = Array.isArray(query.sub) ? query.sub[0] : query.sub;
  const subcategory = category.subcategories?.find((s) => s.slug === sub);
  const title = subcategory?.name ?? category.name;

  return (
    <ShopView
      basePath={`/categories/${category.slug}`}
      params={query}
      fixed={{ category: category.slug }}
      listTitle={title}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        ...(subcategory ? [{ label: category.name, href: `/categories/${category.slug}` }, { label: subcategory.name }] : [{ label: category.name }]),
      ]}
      hero={{ eyebrow: subcategory ? category.name : "Category", title, description: subcategory ? undefined : category.description }}
    />
  );
}
