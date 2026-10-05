import {
  CmsPage,
  CmsMenuItem,
  CmsSiteSettings,
  CmsMediaItem,
  CmsFaq,
  CmsWhmcsConfig,
} from '../types/cms';

import { resolveStorageAdapter, CmsStorageAdapter, StorageMode } from './storageAdapter';

// Resolve current adapter (Production REST API vs Isolated Local Development Fallback)
const adapter: CmsStorageAdapter = resolveStorageAdapter();

export const cmsService = {
  getStorageMode(): StorageMode {
    return adapter.getMode();
  },

  // ================= PAGES =================
  async getPages(): Promise<CmsPage[]> {
    return adapter.getPages();
  },

  async getPageById(id: string): Promise<CmsPage | null> {
    return adapter.getPageById(id);
  },

  async getPageBySlug(slug: string): Promise<CmsPage | null> {
    return adapter.getPageBySlug(slug);
  },

  async savePage(pageData: Partial<CmsPage> & { title: string; slug: string }): Promise<CmsPage> {
    return adapter.savePage(pageData);
  },

  async togglePageStatus(id: string): Promise<CmsPage | null> {
    return adapter.togglePageStatus(id);
  },

  async deletePage(id: string): Promise<boolean> {
    return adapter.deletePage(id);
  },

  // ================= SITE SETTINGS =================
  async getSettings(): Promise<CmsSiteSettings> {
    return adapter.getSettings();
  },

  async updateSettings(updates: Partial<CmsSiteSettings>): Promise<CmsSiteSettings> {
    return adapter.updateSettings(updates);
  },

  // ================= NAVIGATION MENUS =================
  async getMenuItems(location?: string): Promise<CmsMenuItem[]> {
    return adapter.getMenuItems(location);
  },

  async saveMenuItem(itemData: Partial<CmsMenuItem> & { label: string; url: string }): Promise<CmsMenuItem> {
    return adapter.saveMenuItem(itemData);
  },

  async deleteMenuItem(id: string): Promise<boolean> {
    return adapter.deleteMenuItem(id);
  },

  async reorderMenuItems(orderedItems: CmsMenuItem[]): Promise<void> {
    return adapter.reorderMenuItems(orderedItems);
  },

  // ================= MEDIA LIBRARY =================
  async getMediaItems(): Promise<CmsMediaItem[]> {
    return adapter.getMedia();
  },

  async uploadMedia(payload: {
    filename: string;
    mimeType: string;
    dataUrl: string;
    size: number;
    altText?: string;
    title?: string;
  }): Promise<{ success: boolean; item?: CmsMediaItem; error?: string }> {
    return adapter.uploadMedia(payload);
  },

  async updateMedia(id: string, updates: Partial<CmsMediaItem>): Promise<CmsMediaItem | null> {
    return adapter.updateMedia(id, updates);
  },

  async deleteMedia(id: string): Promise<boolean> {
    return adapter.deleteMedia(id);
  },

  // ================= FAQS =================
  async getFaqs(category?: string): Promise<CmsFaq[]> {
    return adapter.getFaqs(category);
  },

  async saveFaq(faqData: Partial<CmsFaq> & { question: string; answer: string }): Promise<CmsFaq> {
    return adapter.saveFaq(faqData);
  },

  async deleteFaq(id: string): Promise<boolean> {
    return adapter.deleteFaq(id);
  },

  // ================= WHMCS CONFIGURATION =================
  async getWhmcsConfig(): Promise<CmsWhmcsConfig> {
    return adapter.getWhmcs();
  },

  async updateWhmcsConfig(updates: Partial<CmsWhmcsConfig>): Promise<CmsWhmcsConfig> {
    return adapter.updateWhmcs(updates);
  },

  // Factory reset for dev / testing
  resetAllToDefaults(): void {
    adapter.resetToDefaults();
  },
};
