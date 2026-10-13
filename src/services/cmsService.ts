import {
  CmsPage,
  CmsMenuItem,
  CmsSiteSettings,
  CmsMediaItem,
  CmsFaq,
  CmsWhmcsConfig,
} from '../types/cms';

import { resolveStorageAdapter, CmsStorageAdapter, StorageMode } from './storageAdapter';
import { pageService } from './pageService';
import { menuService } from './menuService';
import { faqService } from './faqService';
import { settingsService } from './settingsService';
import { mediaService } from './mediaService';
import { whmcsService } from './whmcsService';

// Resolve current adapter (Production REST API vs Isolated Local Development Fallback)
const adapter: CmsStorageAdapter = resolveStorageAdapter();

export const cmsService = {
  getStorageMode(): StorageMode {
    return adapter.getMode();
  },

  // ================= PAGES =================
  async getPages(): Promise<CmsPage[]> {
    return pageService.listPages();
  },

  async getPageById(id: string): Promise<CmsPage | null> {
    return pageService.getPage(id);
  },

  async getPageBySlug(slug: string): Promise<CmsPage | null> {
    return pageService.getPageBySlug(slug);
  },

  async savePage(pageData: Partial<CmsPage> & { title: string; slug: string }): Promise<CmsPage> {
    return pageService.createPage(pageData);
  },

  async togglePageStatus(id: string): Promise<CmsPage | null> {
    return pageService.togglePageStatus(id);
  },

  async deletePage(id: string): Promise<boolean> {
    return pageService.deletePage(id);
  },

  // ================= SITE SETTINGS =================
  async getSettings(): Promise<CmsSiteSettings> {
    return settingsService.getSiteSettings();
  },

  async updateSettings(updates: Partial<CmsSiteSettings>): Promise<CmsSiteSettings> {
    return settingsService.updateSiteSettings(updates);
  },

  // ================= NAVIGATION MENUS =================
  async getMenuItems(location?: string): Promise<CmsMenuItem[]> {
    return menuService.getMenus(location);
  },

  async saveMenuItem(itemData: Partial<CmsMenuItem> & { label: string; url: string }): Promise<CmsMenuItem> {
    return menuService.createMenuItem(itemData);
  },

  async deleteMenuItem(id: string): Promise<boolean> {
    return menuService.deleteMenuItem(id);
  },

  async reorderMenuItems(orderedItems: CmsMenuItem[]): Promise<void> {
    return menuService.reorderMenuItems(orderedItems);
  },

  // ================= MEDIA LIBRARY =================
  async getMediaItems(): Promise<CmsMediaItem[]> {
    return mediaService.listMedia();
  },

  async uploadMedia(payload: {
    filename: string;
    mimeType: string;
    dataUrl: string;
    size: number;
    altText?: string;
    title?: string;
  }): Promise<{ success: boolean; item?: CmsMediaItem; error?: string }> {
    return mediaService.uploadMedia(payload);
  },

  async updateMedia(id: string, updates: Partial<CmsMediaItem>): Promise<CmsMediaItem | null> {
    return mediaService.updateMedia(id, updates);
  },

  async deleteMedia(id: string): Promise<boolean> {
    return mediaService.deleteMedia(id);
  },

  // ================= FAQS =================
  async getFaqs(category?: string): Promise<CmsFaq[]> {
    return faqService.listFAQs(category);
  },

  async saveFaq(faqData: Partial<CmsFaq> & { question: string; answer: string }): Promise<CmsFaq> {
    return faqService.createFAQ(faqData);
  },

  async deleteFaq(id: string): Promise<boolean> {
    return faqService.deleteFAQ(id);
  },

  // ================= WHMCS CONFIGURATION =================
  async getWhmcsConfig(): Promise<CmsWhmcsConfig> {
    return whmcsService.getWhmcsConfig();
  },

  async updateWhmcsConfig(updates: Partial<CmsWhmcsConfig>): Promise<CmsWhmcsConfig> {
    return whmcsService.updateWhmcsConfig(updates);
  },

  // Factory reset for dev / testing
  resetAllToDefaults(): void {
    adapter.resetToDefaults();
  },
};

// Re-export modular services
export { pageService } from './pageService';
export { menuService } from './menuService';
export { faqService } from './faqService';
export { settingsService } from './settingsService';
export { mediaService } from './mediaService';
export { whmcsService } from './whmcsService';
