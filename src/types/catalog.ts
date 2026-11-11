/** Integer amount in Japanese yen (tax included). */
export type Yen = number;

export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameJa?: string;
  description?: string;
  image?: ImageAsset;
  parentId?: string | null;
  /** Second-level categories shown in menus and used for filtering. */
  subcategories?: CategoryRef[];
  productCount?: number;
}

/** Lightweight reference embedded in other resources. */
export type CategoryRef = Pick<Category, "id" | "slug" | "name">;

export interface CountryCollection {
  id: string;
  slug: string;
  /** ISO 3166-1 alpha-2, e.g. "BD". */
  countryCode: string;
  name: string;
  nameJa?: string;
  tagline?: string;
  image?: ImageAsset;
  productCount?: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  /** e.g. "1 kg", "5 kg", "Pack of 6". */
  label: string;
  price: Yen;
  compareAtPrice?: Yen;
  stock: number;
  isDefault?: boolean;
}

export type ProductBadge = "new" | "sale" | "bestseller" | "limited";
export type StorageType = "ambient" | "chilled" | "frozen";

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameJa?: string;
  brand?: string;
  description?: string;
  category: CategoryRef;
  subcategory?: CategoryRef;
  countryCode: string;
  images: ImageAsset[];
  /** Price of the default variant, for listings. */
  price: Yen;
  compareAtPrice?: Yen;
  unitLabel: string;
  variants: ProductVariant[];
  badges: ProductBadge[];
  storage: StorageType;
  isHalalCertified: boolean;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
}

export type ProductSort = "featured" | "newest" | "price-asc" | "price-desc" | "popular";
export type ProductCollection = "featured" | "popular" | "new-arrivals";

export interface ProductQuery {
  q?: string;
  categorySlug?: string;
  subcategorySlug?: string;
  countrySlug?: string;
  /** Max price (JPY, inclusive). */
  maxPrice?: number;
  inStockOnly?: boolean;
  onSale?: boolean;
  newOnly?: boolean;
  collection?: ProductCollection;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
}

/** Counts and bounds for shop filters (what an API facets endpoint would return). */
export interface ProductFacets {
  /** Per-category counts for the current filters, ignoring the category filter itself. */
  categories: { slug: string; name: string; count: number }[];
  total: number;
  price: { min: number; max: number };
}
