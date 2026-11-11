import {
  Beef,
  Carrot,
  Cookie,
  CupSoda,
  Fish,
  Flame,
  ShoppingBasket,
  Snowflake,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  rice: Wheat,
  spices: Flame,
  meat: Beef,
  fish: Fish,
  "frozen-foods": Snowflake,
  vegetables: Carrot,
  snacks: Cookie,
  beverages: CupSoda,
  "grocery-essentials": ShoppingBasket,
};

/** Visual icon for a category slug; falls back to a basket. */
export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = icons[slug] ?? ShoppingBasket;
  return <Icon aria-hidden className={cn("size-6", className)} strokeWidth={1.5} />;
}
