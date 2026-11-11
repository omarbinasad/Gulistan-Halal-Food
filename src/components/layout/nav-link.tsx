"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  title: string;
  /** Rendered icon element (components can't cross the server→client boundary). */
  icon?: React.ReactNode;
  /** Match only the exact path, for index routes like /admin. */
  exact?: boolean;
  onNavigate?: () => void;
  className?: string;
}

export function NavLink({ href, title, icon, exact = false, onNavigate, className }: NavLinkProps) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-accent hover:text-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0",
        active && "bg-accent text-accent-foreground",
        className,
      )}
    >
      {icon}
      <span className="truncate">{title}</span>
    </Link>
  );
}
