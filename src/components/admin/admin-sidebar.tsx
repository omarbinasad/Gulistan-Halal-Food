"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Menu } from "lucide-react";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { adminNav } from "@/config/navigation";

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b px-5">
        <Link href="/admin" onClick={onNavigate} className="leading-none">
          <span className="font-heading text-lg font-semibold text-primary">Gulistan</span>
          <span className="ml-2 rounded bg-accent px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-wider text-accent-foreground uppercase">
            Admin
          </span>
        </Link>
      </div>
      <nav aria-label="Admin" className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {adminNav.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-1.5 text-[0.6875rem] font-semibold tracking-wider text-muted-foreground uppercase">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ href, title, icon: Icon }) => (
                <NavLink
                  key={href}
                  href={href}
                  title={title}
                  icon={Icon && <Icon strokeWidth={1.75} />}
                  exact={href === "/admin"}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ExternalLink className="size-4" />
          View storefront
        </Link>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-sidebar lg:block">
      <SidebarContent />
    </aside>
  );
}

export function AdminMobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="lg:hidden" aria-label="Open admin menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-sidebar p-0" showCloseButton={false}>
        <SheetTitle className="sr-only">Admin navigation</SheetTitle>
        <SidebarContent onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
