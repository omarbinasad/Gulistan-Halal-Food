import { demoBanners, demoStoreSettings, demoTestimonials } from "@/mocks/content";
import type { ContentService } from "../contracts";

export const mockContentService: ContentService = {
  async listBanners(placement) {
    return placement ? demoBanners.filter((b) => b.placement === placement) : demoBanners;
  },
  async getStoreSettings() {
    return demoStoreSettings;
  },
  async listTestimonials() {
    return demoTestimonials;
  },
};
