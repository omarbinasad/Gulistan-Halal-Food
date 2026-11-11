import type { Metadata } from "next";
import { ComingSoon } from "@/components/common/coming-soon";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <Container className="py-12">
      <ComingSoon title="Your cart" description="Cart is coming soon." backHref="/shop" backLabel="Continue shopping" />
    </Container>
  );
}
