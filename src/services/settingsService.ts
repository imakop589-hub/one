import { CmsSiteSettings } from '../types/cms';
import { resolveStorageAdapter, CmsStorageAdapter } from './storageAdapter';

const adapter: CmsStorageAdapter = resolveStorageAdapter();

export const settingsService = {
  async getSiteSettings(): Promise<CmsSiteSettings> {
    return adapter.getSettings();
  },

  async updateSiteSettings(updates: Partial<CmsSiteSettings>): Promise<CmsSiteSettings> {
    return adapter.updateSettings(updates);
  },
};
