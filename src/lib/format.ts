import { siteConfig } from "@/config/site";

const yen = new Intl.NumberFormat(siteConfig.locale, {
  style: "currency",
  currency: siteConfig.currency,
  maximumFractionDigits: 0,
});

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

/** Formats an integer yen amount, e.g. 2480 → "¥2,480". */
export function formatPrice(amount: number): string {
  return yen.format(amount);
}

/** ISO 3166-1 alpha-2 code → English country name. */
export function countryName(code: string): string {
  return regionNames.of(code.toUpperCase()) ?? code;
}

/** Formats an ISO date string in Japan time. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(siteConfig.locale, {
    dateStyle: "medium",
    timeZone: siteConfig.timeZone,
  }).format(new Date(iso));
}

export function discountPercent(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
