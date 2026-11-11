import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const kpis = ["Revenue today", "Orders today", "Pending shipments", "Low-stock items"];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Analytics will populate once the backend is connected.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((label) => (
          <Card key={label}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-2xl text-muted-foreground">—</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="flex h-72 items-center justify-center rounded-xl border border-dashed bg-card text-sm text-muted-foreground lg:col-span-2">
          Sales chart placeholder
        </div>
        <div className="flex h-72 items-center justify-center rounded-xl border border-dashed bg-card text-sm text-muted-foreground">
          Recent orders placeholder
        </div>
      </div>
    </div>
  );
}
