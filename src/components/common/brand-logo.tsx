import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Text wordmark placeholder until an official logo is supplied. */
export function BrandLogo({ tone = "default", className }: { tone?: "default" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("group inline-flex flex-col leading-none", className)}
    >
      <span
        className={cn(
          "font-heading text-2xl font-semibold tracking-tight",
          tone === "light" ? "text-white" : "text-primary",
        )}
      >
        Gulistan
      </span>
      <span
        className={cn(
          "mt-1 text-[0.625rem] font-semibold tracking-[0.32em] uppercase",
          tone === "light" ? "text-white/70" : "text-muted-foreground",
        )}
      >
        Halal Food
      </span>
    </Link>
  );
}
