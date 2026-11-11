"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { CategoryIcon } from "@/components/catalog/category-icon";
import { BrandLogo } from "@/components/common/brand-logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { CategoryRef } from "@/types";

const quickLinks = [
  { title: "All products", href: "/shop" },
  { title: "New arrivals", href: "/shop?collection=new-arrivals" },
  { title: "Blog & recipes", href: "/blog" },
  { title: "My account", href: "/account" },
];

export function MobileNav({ categories }: { categories: CategoryRef[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] gap-0 overflow-y-auto p-0">
        <SheetHeader className="border-b p-5">
          <SheetTitle asChild>
            <div>
              <BrandLogo />
            </div>
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="p-3">
          <p className="px-3 pt-2 pb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Categories
          </p>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              onClick={close}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent"
            >
              <CategoryIcon slug={c.slug} className="size-4.5 text-primary" />
              {c.name}
            </Link>
          ))}
          <div className="my-3 border-t" />
          {quickLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent"
            >
              {l.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
