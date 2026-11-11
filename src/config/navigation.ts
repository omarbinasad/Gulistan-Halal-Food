import {
  BadgePercent,
  BarChart3,
  Boxes,
  CreditCard,
  FileText,
  Gift,
  Globe2,
  Heart,
  Image,
  LayoutDashboard,
  LayoutTemplate,
  MapPin,
  Package,
  PackageCheck,
  ReceiptText,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Tags,
  Truck,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const accountNav: NavItem[] = [
  { title: "Dashboard", href: "/account", icon: LayoutDashboard },
  { title: "Profile", href: "/account/profile", icon: User },
  { title: "Addresses", href: "/account/addresses", icon: MapPin },
  { title: "Orders", href: "/account/orders", icon: Package },
  { title: "Wishlist", href: "/account/wishlist", icon: Heart },
  { title: "Loyalty points", href: "/account/loyalty", icon: Gift },
];

export const adminNav: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { title: "Reports", href: "/admin/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Catalog",
    items: [
      { title: "Products", href: "/admin/products", icon: ShoppingBag },
      { title: "Categories", href: "/admin/categories", icon: Tags },
      { title: "Country collections", href: "/admin/countries", icon: Globe2 },
      { title: "Inventory", href: "/admin/inventory", icon: Boxes },
    ],
  },
  {
    title: "Sales",
    items: [
      { title: "Orders", href: "/admin/orders", icon: PackageCheck },
      { title: "Refunds", href: "/admin/refunds", icon: RotateCcw },
      { title: "Customers", href: "/admin/customers", icon: Users },
      { title: "Coupons & discounts", href: "/admin/coupons", icon: BadgePercent },
    ],
  },
  {
    title: "Content",
    items: [
      { title: "Page builder", href: "/admin/pages", icon: LayoutTemplate },
      { title: "Blog", href: "/admin/blog", icon: FileText },
      { title: "Banners & media", href: "/admin/media", icon: Image },
      { title: "SEO", href: "/admin/seo", icon: Search },
      { title: "App content", href: "/admin/app-content", icon: Smartphone },
    ],
  },
  {
    title: "Settings",
    items: [
      { title: "Shipping & delivery", href: "/admin/settings/shipping", icon: Truck },
      { title: "Payments", href: "/admin/settings/payments", icon: CreditCard },
      { title: "Tax & invoices", href: "/admin/settings/tax", icon: ReceiptText },
      { title: "Roles & permissions", href: "/admin/settings/roles", icon: ShieldCheck },
      { title: "Store settings", href: "/admin/settings/general", icon: Settings },
    ],
  },
];

export const footerHelpNav: NavItem[] = [
  { title: "Delivery information", href: "/pages/delivery" },
  { title: "Returns & refunds", href: "/pages/returns" },
  { title: "FAQ", href: "/pages/faq" },
  { title: "Contact us", href: "/pages/contact" },
];

export const footerCompanyNav: NavItem[] = [
  { title: "About us", href: "/pages/about" },
  { title: "Halal policy", href: "/pages/halal-policy" },
  { title: "Blog & recipes", href: "/blog" },
  { title: "Wholesale enquiries", href: "/pages/wholesale" },
];

export function findNavItem(items: NavItem[], href: string): NavItem | undefined {
  return items.find((item) => item.href === href);
}
