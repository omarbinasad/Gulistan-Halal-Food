import type { Metadata } from "next";
import { ComingSoon } from "@/components/common/coming-soon";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = { title: "Blog & recipes" };

export default function BlogPage() {
  return (
    <Container className="py-12">
      <ComingSoon title="Blog & recipes" />
    </Container>
  );
}
