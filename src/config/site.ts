export const siteConfig = {
  name: "Gulistan Halal Food",
  shortName: "Gulistan",
  description:
    "Premium halal groceries from Bangladesh, India, Nepal, Pakistan, Thailand, Indonesia, Malaysia, Vietnam and Brazil — delivered across Japan.",
  currency: "JPY",
  locale: "en-JP",
  timeZone: "Asia/Tokyo",
  defaultLocale: "en",
  locales: ["en", "ja"],
} as const;

export type AppLocale = (typeof siteConfig.locales)[number];
