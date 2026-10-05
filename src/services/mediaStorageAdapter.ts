import { CmsMediaItem } from '../types/cms';

export type MediaStorageMode = 's3_cloud_storage' | 'development_local';

export interface MediaStorageService {
  getMode(): MediaStorageMode;
  listMedia(): Promise<CmsMediaItem[]>;
  getMedia(id: string): Promise<CmsMediaItem | null>;
  uploadMedia(payload: {
    filename: string;
    mimeType: string;
    dataUrl: string;
    size: number;
    altText?: string;
    title?: string;
  }): Promise<{ success: boolean; item?: CmsMediaItem; error?: string }>;
  deleteMedia(id: string): Promise<boolean>;
}

// ============================================================================
// 1. S3-COMPATIBLE CLOUD STORAGE ADAPTER (AWS S3 / Cloudflare R2 / MinIO)
// ============================================================================
export class S3CloudMediaAdapter implements MediaStorageService {
  private apiEndpoint: string;

  constructor(endpoint: string) {
    this.apiEndpoint = endpoint.replace(/\/$/, '');
  }

  getMode(): MediaStorageMode {
    return 's3_cloud_storage';
  }

  async listMedia(): Promise<CmsMediaItem[]> {
    const res = await fetch(`${this.apiEndpoint}/api/media`, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to retrieve cloud media list.');
    return res.json();
  }

  async getMedia(id: string): Promise<CmsMediaItem | null> {
    const res = await fetch(`${this.apiEndpoint}/api/media/${id}`, { credentials: 'include' });
    if (!res.ok) return null;
    return res.json();
  }

  async uploadMedia(payload: {
    filename: string;
    mimeType: string;
    dataUrl: string;
    size: number;
    altText?: string;
    title?: string;
  }): Promise<{ success: boolean; item?: CmsMediaItem; error?: string }> {
    // Standard S3 upload flow: Request presigned URL, PUT to bucket, register asset in DB
    try {
      const res = await fetch(`${this.apiEndpoint}/api/media/upload`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Cloud upload failed.' }));
        return { success: false, error: err.message };
      }

      const item: CmsMediaItem = await res.json();
      return { success: true, item };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during cloud media upload.' };
    }
  }

  async deleteMedia(id: string): Promise<boolean> {
    const res = await fetch(`${this.apiEndpoint}/api/media/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return res.ok;
  }
}
