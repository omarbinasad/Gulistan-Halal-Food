import type { Metadata } from "next";
import { ComingSoon } from "@/components/common/coming-soon";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <Container className="py-12">
      <ComingSoon title="Checkout" description="Checkout and payments will be added once the backend is ready." />
    </Container>
  );
}
