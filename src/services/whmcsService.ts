import { CmsWhmcsConfig } from '../types/cms';
import { resolveStorageAdapter, CmsStorageAdapter } from './storageAdapter';

const adapter: CmsStorageAdapter = resolveStorageAdapter();

export const whmcsService = {
  async getWhmcsConfig(): Promise<CmsWhmcsConfig> {
    return adapter.getWhmcs();
  },

  async updateWhmcsConfig(updates: Partial<CmsWhmcsConfig>): Promise<CmsWhmcsConfig> {
    return adapter.updateWhmcs(updates);
  },
};
