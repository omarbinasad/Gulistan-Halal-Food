import Link from "next/link";
import { ChevronDown, Heart, MapPin, User } from "lucide-react";
import { CartButton } from "@/components/cart/cart-button";
import { BrandLogo } from "@/components/common/brand-logo";
import type { Category } from "@/types";
import { CategoryNav } from "./category-nav";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";
import { SearchForm } from "./search-form";

const iconLink =
  "group flex items-center gap-2.5 rounded-lg p-2 transition-colors duration-200 hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

export function SiteHeader({ categories }: { categories: Category[] }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <Container className="flex h-16 items-center gap-3 lg:h-[4.75rem] lg:gap-6 xl:gap-8">
        <div className="-ml-2 lg:hidden">
          <MobileNav categories={categories} />
        </div>
        <BrandLogo />

        <Link
          href="/pages/delivery"
          className="hidden shrink-0 items-center gap-2.5 rounded-lg border bg-card px-3 py-2 transition-colors duration-200 hover:border-primary/40 xl:flex"
        >
          <MapPin className="size-5 text-primary" aria-hidden />
          <span className="leading-tight">
            <span className="block text-[0.6875rem] text-muted-foreground">Deliver to</span>
            <span className="flex items-center gap-1 text-sm font-semibold">
              Japan-wide <ChevronDown className="size-3.5" aria-hidden />
            </span>
          </span>
        </Link>

        <SearchForm className="hidden flex-1 md:flex" />

        <nav aria-label="Account" className="ml-auto flex shrink-0 items-center gap-1">
          <Link href="/account" className={iconLink} aria-label="Account">
            <User className="size-6 text-foreground/80" strokeWidth={1.5} />
            <span className="hidden leading-tight xl:block">
              <span className="block text-sm font-semibold">Account</span>
              <span className="block text-xs text-muted-foreground">Sign In</span>
            </span>
          </Link>
          <Link href="/account/wishlist" className={`${iconLink} hidden sm:flex`} aria-label="Wishlist">
            <Heart className="size-6 text-foreground/80" strokeWidth={1.5} />
            <span className="hidden text-sm font-semibold xl:block">Wishlist</span>
          </Link>
          <CartButton className={iconLink} />
        </nav>
      </Container>
      <Container className="pb-3 md:hidden">
        <SearchForm id="site-search-mobile" />
      </Container>
      <CategoryNav categories={categories} />
    </header>
  );
}
