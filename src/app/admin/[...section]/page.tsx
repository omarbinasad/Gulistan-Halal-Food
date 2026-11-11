import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/common/coming-soon";
import { adminNav, findNavItem } from "@/config/navigation";

// Temporary catch-all for planned admin modules. Replace with dedicated routes as each is built.
type Params = Promise<{ section: string[] }>;

const allItems = adminNav.flatMap((group) => group.items);

async function resolve(params: Params) {
  const { section } = await params;
  return findNavItem(allItems, `/admin/${section.join("/")}`);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return { title: (await resolve(params))?.title };
}

export default async function AdminSectionPage({ params }: { params: Params }) {
  const item = await resolve(params);
  if (!item) notFound();
  return (
    <ComingSoon
      title={item.title}
      description="This admin module will be built in a dedicated task."
      backHref="/admin"
      backLabel="Back to dashboard"
    />
  );
}
