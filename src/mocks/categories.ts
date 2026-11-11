/**
 * DEMO DATA — placeholder catalog for frontend development only.
 * Consumed exclusively through src/services/mock. Replace with API data.
 */
import type { Category, CategoryRef } from "@/types";

const subs = (_parent: string, items: [slug: string, name: string][]): CategoryRef[] =>
  items.map(([slug, name]) => ({ id: `demo-sub-${slug}`, slug, name }));

export const demoCategories: Category[] = [
  {
    id: "demo-cat-rice", slug: "rice", name: "Rice", nameJa: "お米", description: "Basmati, jasmine & aromatic grains", productCount: 48,
    subcategories: subs("rice", [["basmati-rice", "Basmati Rice"], ["jasmine-rice", "Jasmine Rice"], ["chinigura-aromatic", "Chinigura & Aromatic"], ["sella-parboiled", "Sella & Parboiled"]]),
  },
  {
    id: "demo-cat-spices", slug: "spices", name: "Spices", nameJa: "スパイス", description: "Whole, ground & masala blends", productCount: 186,
    subcategories: subs("spices", [["masala-blends", "Masala Blends"], ["whole-spices", "Whole Spices"], ["ground-spices", "Ground Spices"], ["pastes-sauces", "Pastes & Sauces"]]),
  },
  {
    id: "demo-cat-meat", slug: "meat", name: "Meat", nameJa: "ハラール肉", description: "Certified halal chicken, beef & mutton", productCount: 64,
    subcategories: subs("meat", [["chicken", "Chicken"], ["beef", "Beef"], ["mutton-goat", "Mutton & Goat"]]),
  },
  {
    id: "demo-cat-fish", slug: "fish", name: "Fish", nameJa: "魚", description: "River & sea fish, cleaned and cut", productCount: 39,
    subcategories: subs("fish", [["freshwater-fish", "Freshwater Fish"], ["sea-fish", "Sea Fish"], ["dried-fish", "Dried Fish"]]),
  },
  {
    id: "demo-cat-frozen", slug: "frozen-foods", name: "Frozen Foods", nameJa: "冷凍食品", description: "Parathas, samosas, momos & more", productCount: 92,
    subcategories: subs("frozen-foods", [["parathas-rotis", "Parathas & Rotis"], ["momos-dumplings", "Momos & Dumplings"], ["samosas-snacks", "Samosas & Snacks"]]),
  },
  {
    id: "demo-cat-vegetables", slug: "vegetables", name: "Vegetables", nameJa: "野菜", description: "Fresh Asian greens & gourds", productCount: 41,
    subcategories: subs("vegetables", [["fresh-vegetables", "Fresh Vegetables"], ["gourds-greens", "Gourds & Greens"], ["fresh-herbs", "Fresh Herbs"]]),
  },
  {
    id: "demo-cat-snacks", slug: "snacks", name: "Snacks", nameJa: "スナック", description: "Chanachur, biscuits & sweets", productCount: 128,
    subcategories: subs("snacks", [["chanachur-mixes", "Chanachur & Mixes"], ["noodles", "Noodles"], ["biscuits-sweets", "Biscuits & Sweets"]]),
  },
  {
    id: "demo-cat-beverages", slug: "beverages", name: "Beverages", nameJa: "飲料", description: "Tea, coffee, lassi & soft drinks", productCount: 73,
    subcategories: subs("beverages", [["tea-coffee", "Tea & Coffee"], ["milk-tea-mixes", "Milk Tea Mixes"], ["soft-drinks", "Soft Drinks"]]),
  },
  {
    id: "demo-cat-essentials", slug: "grocery-essentials", name: "Grocery Essentials", nameJa: "食料品", description: "Lentils, oils, flour & ghee", productCount: 154,
    subcategories: subs("grocery-essentials", [["lentils-dal", "Lentils & Dal"], ["oils-ghee", "Oils & Ghee"], ["flour-atta", "Flour & Atta"], ["sauces-pantry", "Sauces & Pantry"]]),
  },
];
