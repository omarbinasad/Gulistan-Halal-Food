import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { accountNav } from "@/config/navigation";

export default function AccountDashboardPage() {
  const shortcuts = accountNav.filter((item) => item.href !== "/account");

  return (
    <div>
      <div className="rounded-2xl border bg-card p-6 shadow-soft sm:p-8">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Welcome to your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign-in is not available yet. Your orders, addresses and loyalty points will appear here once customer
          accounts are connected.
        </p>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {shortcuts.map(({ title, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-soft transition-shadow hover:shadow-lift"
          >
            {Icon && (
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
            )}
            <span className="flex-1 font-medium">{title}</span>
            <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
