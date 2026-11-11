export interface Banner {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  placement: "hero" | "promo";
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
}

export interface StoreSettings {
  freeShippingThreshold: number;
  standardShippingFee: number;
  coolShippingFee: number;
  sameDayCutoff: string;
  deliverySlots: string[];
  supportEmail: string;
  supportHours: string;
}
