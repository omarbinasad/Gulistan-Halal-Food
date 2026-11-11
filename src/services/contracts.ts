import type {
  Banner,
  Category,
  CountryCollection,
  Paginated,
  Product,
  ProductFacets,
  ProductQuery,
  StoreSettings,
  Testimonial,
} from "@/types";

/**
 * Backend-independent service contracts. UI depends only on these.
 * Mock implementations live in ./mock; REST (Django/Laravel) implementations
 * will be added in ./http and swapped in ./index.ts.
 */
export interface CatalogService {
  listCategories(): Promise<Category[]>;
  getCategory(slug: string): Promise<Category | null>;
  listCountries(): Promise<CountryCollection[]>;
  getCountry(slug: string): Promise<CountryCollection | null>;
  listProducts(query?: ProductQuery): Promise<Paginated<Product>>;
  getProduct(slug: string): Promise<Product | null>;
  getProductFacets(query?: ProductQuery): Promise<ProductFacets>;
}

export interface ContentService {
  listBanners(placement?: Banner["placement"]): Promise<Banner[]>;
  getStoreSettings(): Promise<StoreSettings>;
  listTestimonials(): Promise<Testimonial[]>;
}
