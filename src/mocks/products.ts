/**
 * DEMO DATA — sample products and placeholder prices (JPY, tax incl.).
 * Not real inventory. Consumed exclusively through src/services/mock.
 */
import type { Product, ProductBadge, ProductCollection, StorageType } from "@/types";
import { demoCategories } from "./categories";

export interface DemoProductEntry {
  product: Product;
  collections: ProductCollection[];
}

interface Seed {
  slug: string;
  name: string;
  brand?: string;
  category: string;
  country: string;
  price: number;
  compareAt?: number;
  unit: string;
  badges?: ProductBadge[];
  storage?: StorageType;
  rating?: number;
  reviews?: number;
  collections: ProductCollection[];
}

/** Demo mapping: product slug → subcategory slug (must exist in demoCategories). */
const subcategoryBySlug: Record<string, string> = {
  "chinigura-aromatic-rice-5kg": "chinigura-aromatic",
  "extra-long-basmati-rice-5kg": "basmati-rice",
  "halal-chicken-leg-boneless-2kg": "chicken",
  "hilsa-fish-whole-1kg": "freshwater-fish",
  "garam-masala-100g": "masala-blends",
  "chicken-momo-20pcs": "momos-dumplings",
  "thai-hom-mali-jasmine-rice-5kg": "jasmine-rice",
  "pure-cow-ghee-500g": "oils-ghee",
  "mustard-oil-1l": "oils-ghee",
  "masoor-dal-red-lentils-1kg": "lentils-dal",
  "biryani-masala-50g": "masala-blends",
  "chanachur-hot-mix-350g": "chanachur-mixes",
  "frozen-roti-paratha-20pcs": "parathas-rotis",
  "halal-beef-cubes-1kg": "beef",
  "rui-fish-steaks-1kg": "freshwater-fish",
  "teh-tarik-3in1-15": "milk-tea-mixes",
  "nepali-timur-pepper-50g": "whole-spices",
  "tom-yum-paste-227g": "pastes-sauces",
  "kecap-manis-sweet-soy-600ml": "sauces-pantry",
  "mi-goreng-instant-noodles-5": "noodles",
  "vietnamese-rice-paper-400g": "sauces-pantry",
  "robusta-ground-coffee-500g": "tea-coffee",
  "guarana-soda-350ml-6": "soft-drinks",
  "fresh-bitter-gourd-500g": "gourds-greens",
};

/** Demo pack sizes: slug → [label, price, compareAt?]. Must include the seed's own unit label. */
const packSizes: Record<string, [string, number, number?][]> = {
  "chinigura-aromatic-rice-5kg": [["1 kg", 680], ["5 kg", 2980], ["10 kg", 5780]],
  "extra-long-basmati-rice-5kg": [["1 kg", 780], ["5 kg", 3480, 3980], ["10 kg", 6680]],
  "thai-hom-mali-jasmine-rice-5kg": [["1 kg", 560], ["5 kg", 2580], ["10 kg", 4980]],
};

function build(seed: Seed, index: number): DemoProductEntry {
  const category = demoCategories.find((c) => c.slug === seed.category)!;
  const id = `demo-prod-${index + 1}`;
  return {
    collections: seed.collections,
    product: {
      id,
      slug: seed.slug,
      name: seed.name,
      brand: seed.brand,
      category: { id: category.id, slug: category.slug, name: category.name },
      subcategory: category.subcategories?.find((s) => s.slug === subcategoryBySlug[seed.slug]),
      countryCode: seed.country,
      images: [],
      price: seed.price,
      compareAtPrice: seed.compareAt,
      unitLabel: seed.unit,
      variants: (packSizes[seed.slug] ?? [[seed.unit, seed.price, seed.compareAt]]).map(([label, price, compareAtPrice], v) => ({
        id: `${id}-v${v + 1}`,
        sku: `DEMO-${String(index + 1).padStart(4, "0")}-${v + 1}`,
        label,
        price,
        compareAtPrice,
        stock: 50,
        isDefault: label === seed.unit,
      })),
      badges: seed.badges ?? [],
      storage: seed.storage ?? "ambient",
      isHalalCertified: true,
      inStock: true,
      rating: seed.rating,
      reviewCount: seed.reviews,
    },
  };
}

const seeds: Seed[] = [
  // Featured
  { slug: "chinigura-aromatic-rice-5kg", name: "Chinigura Aromatic Rice", category: "rice", country: "BD", price: 2980, unit: "5 kg", badges: ["bestseller"], rating: 4.8, reviews: 412, collections: ["featured", "popular"] },
  { slug: "extra-long-basmati-rice-5kg", name: "Extra Long Grain Basmati Rice", category: "rice", country: "PK", price: 3480, compareAt: 3980, unit: "5 kg", badges: ["sale"], rating: 4.7, reviews: 389, collections: ["featured"] },
  { slug: "halal-chicken-leg-boneless-2kg", name: "Halal Chicken Leg, Boneless", category: "meat", country: "BR", price: 1980, unit: "2 kg", storage: "frozen", badges: ["bestseller"], rating: 4.6, reviews: 531, collections: ["featured", "popular"] },
  { slug: "hilsa-fish-whole-1kg", name: "Padma Hilsa Fish (Ilish), Whole", category: "fish", country: "BD", price: 3680, unit: "approx. 1 kg", storage: "frozen", badges: ["limited"], rating: 4.9, reviews: 204, collections: ["featured"] },
  { slug: "garam-masala-100g", name: "Royal Garam Masala", category: "spices", country: "IN", price: 380, unit: "100 g", rating: 4.7, reviews: 266, collections: ["featured"] },
  { slug: "chicken-momo-20pcs", name: "Chicken Momo Dumplings", category: "frozen-foods", country: "NP", price: 980, unit: "20 pcs", storage: "frozen", badges: ["new"], rating: 4.8, reviews: 97, collections: ["featured", "new-arrivals"] },
  { slug: "thai-hom-mali-jasmine-rice-5kg", name: "Hom Mali Jasmine Rice", category: "rice", country: "TH", price: 2580, unit: "5 kg", rating: 4.6, reviews: 175, collections: ["featured"] },
  { slug: "pure-cow-ghee-500g", name: "Pure Cow Ghee", category: "grocery-essentials", country: "IN", price: 1480, compareAt: 1680, unit: "500 g", badges: ["sale"], rating: 4.8, reviews: 322, collections: ["featured"] },

  // Popular
  { slug: "mustard-oil-1l", name: "Cold-Pressed Mustard Oil", category: "grocery-essentials", country: "BD", price: 680, unit: "1 L", rating: 4.7, reviews: 458, collections: ["popular"] },
  { slug: "masoor-dal-red-lentils-1kg", name: "Masoor Dal Red Lentils", category: "grocery-essentials", country: "IN", price: 580, unit: "1 kg", rating: 4.6, reviews: 377, collections: ["popular"] },
  { slug: "biryani-masala-50g", name: "Bombay Biryani Masala", category: "spices", country: "PK", price: 298, unit: "50 g", badges: ["bestseller"], rating: 4.8, reviews: 601, collections: ["popular"] },
  { slug: "chanachur-hot-mix-350g", name: "Chanachur Hot Mix", category: "snacks", country: "BD", price: 398, unit: "350 g", rating: 4.5, reviews: 289, collections: ["popular"] },
  { slug: "frozen-roti-paratha-20pcs", name: "Flaky Roti Paratha", category: "frozen-foods", country: "MY", price: 880, unit: "20 pcs", storage: "frozen", rating: 4.7, reviews: 344, collections: ["popular"] },
  { slug: "halal-beef-cubes-1kg", name: "Halal Beef Curry Cut", category: "meat", country: "BR", price: 2680, unit: "1 kg", storage: "frozen", rating: 4.5, reviews: 198, collections: ["popular"] },
  { slug: "rui-fish-steaks-1kg", name: "Rui Fish Steaks", category: "fish", country: "BD", price: 1680, unit: "1 kg", storage: "frozen", rating: 4.4, reviews: 156, collections: ["popular"] },
  { slug: "teh-tarik-3in1-15", name: "Teh Tarik 3-in-1 Milk Tea", category: "beverages", country: "MY", price: 680, unit: "15 sachets", rating: 4.6, reviews: 213, collections: ["popular"] },

  // New arrivals
  { slug: "nepali-timur-pepper-50g", name: "Himalayan Timur Pepper", category: "spices", country: "NP", price: 450, unit: "50 g", badges: ["new"], collections: ["new-arrivals"] },
  { slug: "tom-yum-paste-227g", name: "Tom Yum Paste", category: "spices", country: "TH", price: 420, unit: "227 g", badges: ["new"], collections: ["new-arrivals"] },
  { slug: "kecap-manis-sweet-soy-600ml", name: "Kecap Manis Sweet Soy Sauce", category: "grocery-essentials", country: "ID", price: 480, unit: "600 ml", badges: ["new"], collections: ["new-arrivals"] },
  { slug: "mi-goreng-instant-noodles-5", name: "Mi Goreng Fried Noodles", category: "snacks", country: "ID", price: 498, unit: "5 pack", badges: ["new"], collections: ["new-arrivals"] },
  { slug: "vietnamese-rice-paper-400g", name: "Vietnamese Rice Paper", category: "grocery-essentials", country: "VN", price: 350, unit: "400 g", badges: ["new"], collections: ["new-arrivals"] },
  { slug: "robusta-ground-coffee-500g", name: "Dalat Robusta Ground Coffee", category: "beverages", country: "VN", price: 1280, unit: "500 g", badges: ["new"], collections: ["new-arrivals"] },
  { slug: "guarana-soda-350ml-6", name: "Guaraná Sparkling Soda", category: "beverages", country: "BR", price: 780, unit: "350 ml × 6", badges: ["new"], collections: ["new-arrivals"] },
  { slug: "fresh-bitter-gourd-500g", name: "Fresh Bitter Gourd (Karela)", category: "vegetables", country: "TH", price: 480, unit: "500 g", storage: "chilled", badges: ["new"], collections: ["new-arrivals"] },
];

export const demoProducts: DemoProductEntry[] = seeds.map(build);
