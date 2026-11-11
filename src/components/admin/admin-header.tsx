import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminMobileSidebar } from "./admin-sidebar";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur sm:px-6">
      <AdminMobileSidebar />
      <div className="relative max-w-md flex-1">
        <label htmlFor="admin-search" className="sr-only">
          Search admin
        </label>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input id="admin-search" type="search" placeholder="Search orders, products, customers…" className="h-9 pl-9" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon-lg" aria-label="Notifications">
          <Bell className="size-4.5" />
        </Button>
        {/* Placeholder identity until admin auth exists. */}
        <span className="flex size-8 items-center justify-center rounded-full bg-grad-primary text-xs font-semibold text-primary-foreground">
          A
        </span>
      </div>
    </header>
  );
}
