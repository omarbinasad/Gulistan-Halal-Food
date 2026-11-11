import type { CatalogService, ContentService } from "./contracts";
import { mockCatalogService } from "./mock/catalog";
import { mockContentService } from "./mock/content";

// Single switch point: replace with HTTP implementations once the backend exists.
export const catalogService: CatalogService = mockCatalogService;
export const contentService: ContentService = mockContentService;

export type { CatalogService, ContentService } from "./contracts";
