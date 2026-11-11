import { demoCategories } from "@/mocks/categories";
import { demoCountries } from "@/mocks/countries";
import { demoProducts, type DemoProductEntry } from "@/mocks/products";
import type { Paginated, Product, ProductFacets, ProductQuery } from "@/types";
import type { CatalogService } from "../contracts";

function paginate<T>(items: T[], page = 1, pageSize = 24): Paginated<T> {
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page,
    pageSize,
    total: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
  };
}

const orderOf = (p: Product) => Number(p.id.split("-").pop());

function sortProducts(items: Product[], sort: ProductQuery["sort"]): Product[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "popular":
      return sorted.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    case "newest":
      return sorted.sort((a, b) => orderOf(b) - orderOf(a));
    default:
      return sorted;
  }
}

function filterEntries(query: ProductQuery, ignoreCategory = false): DemoProductEntry[] {
  const { q, categorySlug, subcategorySlug, countrySlug, collection, maxPrice, inStockOnly, onSale, newOnly } = query;
  const countryCode = countrySlug ? demoCountries.find((c) => c.slug === countrySlug)?.countryCode : undefined;
  const term = q?.trim().toLowerCase();

  return demoProducts.filter(({ product, collections }) => {
    if (!ignoreCategory && categorySlug && product.category.slug !== categorySlug) return false;
    if (!ignoreCategory && subcategorySlug && product.subcategory?.slug !== subcategorySlug) return false;
    if (countrySlug && product.countryCode !== countryCode) return false;
    if (collection && !collections.includes(collection)) return false;
    if (maxPrice !== undefined && product.price > maxPrice) return false;
    if (inStockOnly && !product.inStock) return false;
    if (onSale && !(product.compareAtPrice && product.compareAtPrice > product.price)) return false;
    if (newOnly && !(product.badges.includes("new") || collections.includes("new-arrivals"))) return false;
    if (term && !`${product.name} ${product.brand ?? ""}`.toLowerCase().includes(term)) return false;
    return true;
  });
}

export const mockCatalogService: CatalogService = {
  async listCategories() {
    return demoCategories;
  },
  async getCategory(slug) {
    return demoCategories.find((c) => c.slug === slug) ?? null;
  },
  async listCountries() {
    return demoCountries;
  },
  async getCountry(slug) {
    return demoCountries.find((c) => c.slug === slug) ?? null;
  },
  async listProducts(query = {}) {
    const products = filterEntries(query).map((entry) => entry.product);
    return paginate(sortProducts(products, query.sort), query.page, query.pageSize);
  },
  async getProduct(slug) {
    return demoProducts.find((entry) => entry.product.slug === slug)?.product ?? null;
  },
  async getProductFacets(query = {}): Promise<ProductFacets> {
    const base = filterEntries(query, true).map((entry) => entry.product);
    const prices = demoProducts.map((entry) => entry.product.price);
    return {
      categories: demoCategories.map((c) => ({
        slug: c.slug,
        name: c.name,
        count: base.filter((p) => p.category.slug === c.slug).length,
      })),
      total: base.length,
      price: { min: Math.floor(Math.min(...prices) / 100) * 100, max: Math.ceil(Math.max(...prices) / 100) * 100 },
    };
  },
};
