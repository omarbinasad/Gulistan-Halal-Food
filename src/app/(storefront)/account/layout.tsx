import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { NavLink } from "@/components/layout/nav-link";
import { accountNav } from "@/config/navigation";

export const metadata: Metadata = {
  title: { default: "My account", template: "%s | My account" },
  robots: { index: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-8 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside>
          <h2 className="mb-4 hidden font-heading text-xl font-semibold lg:block">My account</h2>
          <nav
            aria-label="Account"
            className="scrollbar-none -mx-4 flex gap-1 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0"
          >
            {accountNav.map(({ href, title, icon: Icon }) => (
              <NavLink
                key={href}
                href={href}
                title={title}
                icon={Icon && <Icon strokeWidth={1.75} />}
                exact={href === "/account"}
                className="shrink-0"
              />
            ))}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </Container>
  );
}
