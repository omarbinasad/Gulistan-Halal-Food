export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-label="Loading" data-route-loading>
      <div className="skeleton h-8 w-48" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="skeleton h-24" />
        ))}
      </div>
    </div>
  );
}
