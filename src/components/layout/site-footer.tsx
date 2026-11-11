import Link from "next/link";
import { BrandLogo } from "@/components/common/brand-logo";
import { footerCompanyNav, footerHelpNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { CategoryRef, CountryCollection, StoreSettings } from "@/types";
import { Container } from "./container";

interface SiteFooterProps {
  categories: CategoryRef[];
  countries: CountryCollection[];
  settings: StoreSettings;
}

function FooterColumn({ title, links }: { title: string; links: { title: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-[0.18em] text-white uppercase">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-white/65 transition-colors hover:text-white">
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({ categories, countries, settings }: SiteFooterProps) {
  return (
    <footer className="pattern-geo border-t border-white/10 bg-emerald-deep text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:py-16">
        <div className="max-w-xs">
          <BrandLogo tone="light" />
          <p className="mt-5 text-sm leading-relaxed text-white/65">
            Halal groceries from across Asia and beyond, sourced with care and delivered throughout Japan.
          </p>
          <div className="mt-5 space-y-1 text-sm text-white/65">
            <p>{settings.supportEmail}</p>
            <p>{settings.supportHours}</p>
          </div>
        </div>
        <FooterColumn
          title="Shop"
          links={categories.slice(0, 6).map((c) => ({ title: c.name, href: `/categories/${c.slug}` }))}
        />
        <FooterColumn
          title="Countries"
          links={countries.slice(0, 6).map((c) => ({ title: c.name, href: `/countries/${c.slug}` }))}
        />
        <FooterColumn title="Help" links={footerHelpNav} />
        <FooterColumn title="Company" links={footerCompanyNav} />
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>All prices in JPY and include consumption tax.</p>
        </Container>
      </div>
    </footer>
  );
}
