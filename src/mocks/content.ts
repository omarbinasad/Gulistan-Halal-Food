/**
 * DEMO DATA — placeholder marketing content, sample feedback and store settings.
 * Will be managed via the admin page builder / settings APIs.
 */
import type { Banner, StoreSettings, Testimonial } from "@/types";

export const demoBanners: Banner[] = [
  {
    id: "demo-banner-hero",
    placement: "hero",
    eyebrow: "Exclusive offer · Free delivery over ¥8,000",
    title: "Fresh Halal Groceries Delivered to Your Home",
    subtitle:
      "Rice, spices, halal meat and everyday essentials from nine countries — carefully sourced, cool-packed and shipped across Japan.",
    cta: { label: "Shop now", href: "/shop" },
  },
  {
    id: "demo-banner-hero-2",
    placement: "hero",
    eyebrow: "Spice season · Whole & ground",
    title: "Authentic Spices from Across Asia",
    subtitle: "Garam masala, biryani blends, timur pepper and more — the flavours your kitchen has been missing.",
    cta: { label: "Shop spices", href: "/categories/spices" },
  },
  {
    id: "demo-banner-hero-3",
    placement: "hero",
    eyebrow: "Pantry staples · Family-size packs",
    title: "Premium Rice & Everyday Essentials",
    subtitle: "Chinigura, basmati and jasmine rice with ghee, lentils and oils at fair prices.",
    cta: { label: "Shop rice", href: "/categories/rice" },
  },
  {
    id: "demo-banner-promo-1",
    placement: "promo",
    eyebrow: "Exclusive deals for a blessed month",
    title: "Ramadan Specials",
    cta: { label: "Shop Ramadan", href: "/shop?collection=featured" },
  },
  {
    id: "demo-banner-promo-2",
    placement: "promo",
    eyebrow: "Nutritious choices for stronger families",
    title: "Family Meal Bundles",
    cta: { label: "Shop bundles", href: "/shop?collection=popular" },
  },
];

export const demoTestimonials: Testimonial[] = [
  {
    id: "demo-review-1",
    name: "Sample Customer A",
    location: "Tokyo",
    rating: 5,
    quote: "Sample feedback: amazing quality and super fresh products. Easy to find the spices I grew up with.",
  },
  {
    id: "demo-review-2",
    name: "Sample Customer B",
    location: "Osaka",
    rating: 5,
    quote: "Sample feedback: fast delivery and great service. The halal meat arrived perfectly frozen.",
  },
  {
    id: "demo-review-3",
    name: "Sample Customer C",
    location: "Nagoya",
    rating: 5,
    quote: "Sample feedback: a huge variety all in one place. It has become our go-to grocery store.",
  },
];

export const demoStoreSettings: StoreSettings = {
  freeShippingThreshold: 8000,
  standardShippingFee: 800,
  coolShippingFee: 300,
  sameDayCutoff: "14:00",
  deliverySlots: ["Morning", "12:00–14:00", "14:00–16:00", "16:00–18:00", "18:00–21:00"],
  supportEmail: "support@example.com",
  supportHours: "10:00–19:00 JST, daily",
};
