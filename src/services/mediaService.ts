import { CmsMediaItem } from '../types/cms';
import { resolveStorageAdapter, CmsStorageAdapter } from './storageAdapter';

const adapter: CmsStorageAdapter = resolveStorageAdapter();

export const mediaService = {
  async listMedia(): Promise<CmsMediaItem[]> {
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
};
