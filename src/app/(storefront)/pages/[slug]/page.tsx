import type { Metadata } from "next";
import { ComingSoon } from "@/components/common/coming-soon";
import { Container } from "@/components/layout/container";

type Params = Promise<{ slug: string }>;

// CMS-managed information pages (page builder). Content source TBD.
function titleFromSlug(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return { title: titleFromSlug((await params).slug) };
}

export default async function InfoPage({ params }: { params: Params }) {
  const { slug } = await params;
  return (
    <Container className="py-12">
      <ComingSoon title={titleFromSlug(slug)} />
    </Container>
  );
}
