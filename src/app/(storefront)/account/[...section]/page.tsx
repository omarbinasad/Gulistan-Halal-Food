import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/common/coming-soon";
import { accountNav, findNavItem } from "@/config/navigation";

// Temporary catch-all for planned account screens. Replace with dedicated routes as each is built.
type Params = Promise<{ section: string[] }>;

async function resolve(params: Params) {
  const { section } = await params;
  return findNavItem(accountNav, `/account/${section.join("/")}`);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return { title: (await resolve(params))?.title };
}

export default async function AccountSectionPage({ params }: { params: Params }) {
  const item = await resolve(params);
  if (!item) notFound();
  return <ComingSoon title={item.title} backHref="/account" backLabel="Back to account" />;
}
