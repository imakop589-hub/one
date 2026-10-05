import {
  CmsPage,
  CmsMenuItem,
  CmsSiteSettings,
  CmsMediaItem,
  CmsFaq,
  CmsWhmcsConfig,
} from '../types/cms';

import {
  DEFAULT_CMS_PAGES,
  DEFAULT_CMS_MENUS,
  DEFAULT_CMS_SETTINGS,
  DEFAULT_CMS_MEDIA,
  DEFAULT_CMS_FAQS,
  DEFAULT_CMS_WHMCS_CONFIG,
} from '../data/defaultCmsData';

// Storage keys
const STORAGE_KEYS = {
  PAGES: 'hx_cms_pages_v1',
  MENUS: 'hx_cms_menus_v1',
  SETTINGS: 'hx_cms_settings_v1',
  MEDIA: 'hx_cms_media_v1',
  FAQS: 'hx_cms_faqs_v1',
  WHMCS: 'hx_cms_whmcs_v1',
};

// Safe localStorage helper
function safeGetItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSetItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[CmsService] Unable to save key ${key}:`, err);
  }
}

export const cmsService = {
  // ================= PAGES =================
  async getPages(): Promise<CmsPage[]> {
    return safeGetItem<CmsPage[]>(STORAGE_KEYS.PAGES, DEFAULT_CMS_PAGES);
  },

  async getPageById(id: string): Promise<CmsPage | null> {
    const pages = await this.getPages();
    return pages.find(p => p.id === id) || null;
  },

  async getPageBySlug(slug: string): Promise<CmsPage | null> {
    const pages = await this.getPages();
    return pages.find(p => p.slug === slug) || null;
  },

  async savePage(pageData: Partial<CmsPage> & { title: string; slug: string }): Promise<CmsPage> {
    const pages = await this.getPages();
    const now = new Date().toISOString();

    if (pageData.id) {
      // Update existing
      const index = pages.findIndex(p => p.id === pageData.id);
      if (index !== -1) {
        const existing = pages[index];
        const updated: CmsPage = {
          ...existing,
          ...pageData,
          updatedAt: now,
          publishedAt: pageData.status === 'published' ? (existing.publishedAt || now) : existing.publishedAt,
        };
        pages[index] = updated;
        safeSetItem(STORAGE_KEYS.PAGES, pages);
        return updated;
      }
    }

    // Create new page
    const newPage: CmsPage = {
      id: 'page-' + Math.random().toString(36).substring(2, 9),
      title: pageData.title.trim(),
      slug: pageData.slug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
      status: pageData.status || 'draft',
      content: pageData.content || '',
      category: pageData.category || 'general',
      seoTitle: pageData.seoTitle || pageData.title,
      metaDescription: pageData.metaDescription || '',
      canonicalUrl: pageData.canonicalUrl || `https://hostxeon.com/#${pageData.slug}`,
      ogTitle: pageData.ogTitle || pageData.title,
      ogDescription: pageData.ogDescription || pageData.metaDescription || '',
      ogImage: pageData.ogImage || '',
      createdAt: now,
      updatedAt: now,
      publishedAt: pageData.status === 'published' ? now : undefined,
    };

    pages.unshift(newPage);
    safeSetItem(STORAGE_KEYS.PAGES, pages);
    return newPage;
  },

  async togglePageStatus(id: string): Promise<CmsPage | null> {
    const pages = await this.getPages();
    const index = pages.findIndex(p => p.id === id);
    if (index === -1) return null;

    const page = pages[index];
    const newStatus = page.status === 'published' ? 'draft' : 'published';
    const now = new Date().toISOString();

    const updated: CmsPage = {
      ...page,
      status: newStatus,
      updatedAt: now,
      publishedAt: newStatus === 'published' ? now : page.publishedAt,
    };

    pages[index] = updated;
    safeSetItem(STORAGE_KEYS.PAGES, pages);
    return updated;
  },

  async deletePage(id: string): Promise<boolean> {
    const pages = await this.getPages();
    const filtered = pages.filter(p => p.id !== id);
    if (filtered.length === pages.length) return false;

    safeSetItem(STORAGE_KEYS.PAGES, filtered);
    return true;
  },

  // ================= SITE SETTINGS =================
  async getSettings(): Promise<CmsSiteSettings> {
    return safeGetItem<CmsSiteSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_CMS_SETTINGS);
  },

  async updateSettings(updates: Partial<CmsSiteSettings>): Promise<CmsSiteSettings> {
    const current = await this.getSettings();
    const merged: CmsSiteSettings = {
      ...current,
      ...updates,
      socialLinks: {
        ...current.socialLinks,
        ...(updates.socialLinks || {}),
      },
    };
    safeSetItem(STORAGE_KEYS.SETTINGS, merged);
    return merged;
  },

  // ================= NAVIGATION MENUS =================
  async getMenuItems(location?: string): Promise<CmsMenuItem[]> {
    const items = safeGetItem<CmsMenuItem[]>(STORAGE_KEYS.MENUS, DEFAULT_CMS_MENUS);
    if (!location) return items.sort((a, b) => a.order - b.order);
    return items.filter(i => i.menuLocation === location).sort((a, b) => a.order - b.order);
  },

  async saveMenuItem(itemData: Partial<CmsMenuItem> & { label: string; url: string }): Promise<CmsMenuItem> {
    const items = await this.getMenuItems();

    if (itemData.id) {
      const index = items.findIndex(i => i.id === itemData.id);
      if (index !== -1) {
        const updated: CmsMenuItem = {
          ...items[index],
          ...itemData,
        };
        items[index] = updated;
        safeSetItem(STORAGE_KEYS.MENUS, items);
        return updated;
      }
    }

    const newItem: CmsMenuItem = {
      id: 'menu-' + Math.random().toString(36).substring(2, 9),
      label: itemData.label.trim(),
      url: itemData.url.trim(),
      menuLocation: itemData.menuLocation || 'header',
      order: itemData.order ?? items.length + 1,
      isActive: itemData.isActive ?? true,
      isExternal: itemData.isExternal ?? false,
      badge: itemData.badge,
      badgeColor: itemData.badgeColor,
      targetView: itemData.targetView,
    };

    items.push(newItem);
    safeSetItem(STORAGE_KEYS.MENUS, items);
    return newItem;
  },

  async deleteMenuItem(id: string): Promise<boolean> {
    const items = await this.getMenuItems();
    const filtered = items.filter(i => i.id !== id);
    if (filtered.length === items.length) return false;

    safeSetItem(STORAGE_KEYS.MENUS, filtered);
    return true;
  },

  async reorderMenuItems(orderedItems: CmsMenuItem[]): Promise<void> {
    safeSetItem(STORAGE_KEYS.MENUS, orderedItems);
  },

  // ================= MEDIA LIBRARY =================
  async getMediaItems(): Promise<CmsMediaItem[]> {
    return safeGetItem<CmsMediaItem[]>(STORAGE_KEYS.MEDIA, DEFAULT_CMS_MEDIA);
  },

  async uploadMedia(payload: {
    filename: string;
    mimeType: string;
    dataUrl: string;
    size: number;
    altText?: string;
    title?: string;
  }): Promise<{ success: boolean; item?: CmsMediaItem; error?: string }> {
    // Security validations
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
    if (!allowedMimeTypes.includes(payload.mimeType)) {
      return { success: false, error: 'Unsupported file type. Only JPEG, PNG, WEBP, GIF and SVG are allowed.' };
    }

    // Size limit: 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (payload.size > MAX_SIZE) {
      return { success: false, error: 'File size exceeds maximum 5MB limit.' };
    }

    // Sanitized filename
    const cleanFilename = payload.filename.replace(/[^a-zA-Z0-9._-]/g, '_');

    const items = await this.getMediaItems();
    const newItem: CmsMediaItem = {
      id: 'media-' + Math.random().toString(36).substring(2, 9),
      title: payload.title || cleanFilename,
      altText: payload.altText || cleanFilename,
      filename: cleanFilename,
      url: payload.dataUrl,
      fileSize: payload.size,
      mimeType: payload.mimeType,
      uploadedAt: new Date().toISOString(),
    };

    items.unshift(newItem);
    safeSetItem(STORAGE_KEYS.MEDIA, items);
    return { success: true, item: newItem };
  },

  async updateMedia(id: string, updates: Partial<CmsMediaItem>): Promise<CmsMediaItem | null> {
    const items = await this.getMediaItems();
    const index = items.findIndex(m => m.id === id);
    if (index === -1) return null;

    const updated: CmsMediaItem = {
      ...items[index],
      ...updates,
    };
    items[index] = updated;
    safeSetItem(STORAGE_KEYS.MEDIA, items);
    return updated;
  },

  async deleteMedia(id: string): Promise<boolean> {
    const items = await this.getMediaItems();
    const filtered = items.filter(m => m.id !== id);
    if (filtered.length === items.length) return false;

    safeSetItem(STORAGE_KEYS.MEDIA, filtered);
    return true;
  },

  // ================= FAQS =================
  async getFaqs(category?: string): Promise<CmsFaq[]> {
    const faqs = safeGetItem<CmsFaq[]>(STORAGE_KEYS.FAQS, DEFAULT_CMS_FAQS);
    if (!category) return faqs.sort((a, b) => a.order - b.order);
    return faqs.filter(f => f.category === category).sort((a, b) => a.order - b.order);
  },

  async saveFaq(faqData: Partial<CmsFaq> & { question: string; answer: string }): Promise<CmsFaq> {
    const faqs = await this.getFaqs();

    if (faqData.id) {
      const index = faqs.findIndex(f => f.id === faqData.id);
      if (index !== -1) {
        const updated: CmsFaq = {
          ...faqs[index],
          ...faqData,
        };
        faqs[index] = updated;
        safeSetItem(STORAGE_KEYS.FAQS, faqs);
        return updated;
      }
    }

    const newFaq: CmsFaq = {
      id: 'faq-' + Math.random().toString(36).substring(2, 9),
      question: faqData.question.trim(),
      answer: faqData.answer.trim(),
      category: faqData.category || 'general',
      order: faqData.order ?? faqs.length + 1,
      isPublished: faqData.isPublished ?? true,
    };

    faqs.push(newFaq);
    safeSetItem(STORAGE_KEYS.FAQS, faqs);
    return newFaq;
  },

  async deleteFaq(id: string): Promise<boolean> {
    const faqs = await this.getFaqs();
    const filtered = faqs.filter(f => f.id !== id);
    if (filtered.length === faqs.length) return false;

    safeSetItem(STORAGE_KEYS.FAQS, filtered);
    return true;
  },

  // ================= WHMCS CONFIGURATION =================
  async getWhmcsConfig(): Promise<CmsWhmcsConfig> {
    return safeGetItem<CmsWhmcsConfig>(STORAGE_KEYS.WHMCS, DEFAULT_CMS_WHMCS_CONFIG);
  },

  async updateWhmcsConfig(updates: Partial<CmsWhmcsConfig>): Promise<CmsWhmcsConfig> {
    const current = await this.getWhmcsConfig();
    const merged: CmsWhmcsConfig = {
      ...current,
      ...updates,
    };
    safeSetItem(STORAGE_KEYS.WHMCS, merged);
    return merged;
  },

  // Reset to factory defaults
  resetAllToDefaults(): void {
    safeSetItem(STORAGE_KEYS.PAGES, DEFAULT_CMS_PAGES);
    safeSetItem(STORAGE_KEYS.MENUS, DEFAULT_CMS_MENUS);
    safeSetItem(STORAGE_KEYS.SETTINGS, DEFAULT_CMS_SETTINGS);
    safeSetItem(STORAGE_KEYS.MEDIA, DEFAULT_CMS_MEDIA);
    safeSetItem(STORAGE_KEYS.FAQS, DEFAULT_CMS_FAQS);
    safeSetItem(STORAGE_KEYS.WHMCS, DEFAULT_CMS_WHMCS_CONFIG);
  },
};
