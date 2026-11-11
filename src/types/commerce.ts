import type { ImageAsset, Yen } from "./catalog";

export interface Address {
  id: string;
  label?: string;
  recipientName: string;
  postalCode: string;
  prefecture: string;
  city: string;
  line1: string;
  line2?: string;
  phone: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  preferredLocale: "en" | "ja";
  addresses: Address[];
  loyaltyPoints: number;
  createdAt: string;
}

export interface LineItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  variantLabel: string;
  image?: ImageAsset;
  unitPrice: Yen;
  quantity: number;
  lineTotal: Yen;
}

export interface Totals {
  subtotal: Yen;
  discount: Yen;
  shipping: Yen;
  /** Consumption tax already included in prices, shown for invoices. */
  taxIncluded: Yen;
  total: Yen;
}

export interface Cart {
  id: string;
  items: LineItem[];
  couponCode?: string;
  totals: Totals;
  currency: "JPY";
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "unpaid" | "paid" | "refunded" | "failed";

export interface Order {
  id: string;
  number: string;
  customerId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: LineItem[];
  totals: Totals;
  shippingAddress: Address;
  deliverySlot?: string;
  trackingNumber?: string;
  placedAt: string;
}
