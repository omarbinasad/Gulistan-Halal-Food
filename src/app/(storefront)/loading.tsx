import { Container } from "@/components/layout/container";

export default function StorefrontLoading() {
  return (
    <Container className="py-10" aria-busy="true" aria-label="Loading" data-route-loading>
      <div className="skeleton h-9 w-64" />
      <div className="skeleton mt-3 h-4 w-96 max-w-full" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="skeleton h-64" />
        ))}
      </div>
    </Container>
  );
}
