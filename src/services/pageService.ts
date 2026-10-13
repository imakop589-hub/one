import { CmsPage } from '../types/cms';
import { resolveStorageAdapter, CmsStorageAdapter } from './storageAdapter';

const adapter: CmsStorageAdapter = resolveStorageAdapter();

export const pageService = {
  async listPages(): Promise<CmsPage[]> {
    return adapter.getPages();
  },

  async getPage(id: string): Promise<CmsPage | null> {
    return adapter.getPageById(id);
  },

  async getPageBySlug(slug: string): Promise<CmsPage | null> {
    return adapter.getPageBySlug(slug);
  },

  async createPage(pageData: Partial<CmsPage> & { title: string; slug: string }): Promise<CmsPage> {
    return adapter.savePage(pageData);
  },

  async updatePage(id: string, updates: Partial<CmsPage> & { title?: string; slug?: string }): Promise<CmsPage> {
    const existing = await adapter.getPageById(id);
    if (!existing) {
      throw new Error(`Page with ID ${id} not found.`);
    }
    return adapter.savePage({
      ...existing,
      ...updates,
      id,
      title: updates.title ?? existing.title,
      slug: updates.slug ?? existing.slug,
    });
  },

  async deletePage(id: string): Promise<boolean> {
    return adapter.deletePage(id);
  },

  async publishPage(id: string): Promise<CmsPage | null> {
    const page = await adapter.getPageById(id);
    if (!page) return null;
    if (page.status === 'published') return page;
    return adapter.togglePageStatus(id);
  },

  async unpublishPage(id: string): Promise<CmsPage | null> {
    const page = await adapter.getPageById(id);
    if (!page) return null;
    if (page.status === 'draft') return page;
    return adapter.togglePageStatus(id);
  },

  async togglePageStatus(id: string): Promise<CmsPage | null> {
    return adapter.togglePageStatus(id);
  },
};
