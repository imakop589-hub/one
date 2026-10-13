import { CmsMenuItem } from '../types/cms';
import { resolveStorageAdapter, CmsStorageAdapter } from './storageAdapter';

const adapter: CmsStorageAdapter = resolveStorageAdapter();

export const menuService = {
  async getMenus(location?: string): Promise<CmsMenuItem[]> {
    return adapter.getMenuItems(location);
  },

  async createMenuItem(itemData: Partial<CmsMenuItem> & { label: string; url: string }): Promise<CmsMenuItem> {
    return adapter.saveMenuItem(itemData);
  },

  async updateMenuItem(id: string, updates: Partial<CmsMenuItem>): Promise<CmsMenuItem> {
    return adapter.saveMenuItem({
      ...updates,
      id,
      label: updates.label ?? 'Menu Link',
      url: updates.url ?? '#',
    });
  },

  async deleteMenuItem(id: string): Promise<boolean> {
    return adapter.deleteMenuItem(id);
  },

  async reorderMenuItems(items: CmsMenuItem[]): Promise<void> {
    return adapter.reorderMenuItems(items);
  },
};
