import React, { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { CmsMediaItem } from '../../types/cms';

export const AdminMedia: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<CmsMediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const items = await cmsService.getMediaItems();
      setMediaItems(items);
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyUrl = (item: CmsMediaItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.url);
      setCopiedId(item.id);
      showToast('Media URL copied to clipboard.');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this media asset from library?')) return;
    try {
      const ok = await cmsService.deleteMedia(id);
      if (ok) {
        setMediaItems(prev => prev.filter(m => m.id !== id));
        showToast('Media item deleted.');
      }
    } catch {
      showToast('Failed to delete media item.');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setIsUploading(true);

    // Validate size (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setErrorMessage('File size exceeds the 5MB upload limit.');
      setIsUploading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = async event => {
      const dataUrl = event.target?.result as string;
      const res = await cmsService.uploadMedia({
        filename: file.name,
        mimeType: file.type,
        dataUrl,
        size: file.size,
        title: file.name.replace(/\.[^/.]+$/, ''),
        altText: file.name.replace(/\.[^/.]+$/, ''),
      });

      if (res.success && res.item) {
        setMediaItems(prev => [res.item!, ...prev]);
        showToast(`Asset "${file.name}" uploaded successfully.`);
      } else {
        setErrorMessage(res.error || 'Failed to upload media asset.');
      }
      setIsUploading(false);
    };

    reader.onerror = () => {
      setErrorMessage('Error reading local file.');
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const filteredItems = mediaItems.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-purple-400" />
            <span>Media Library</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Store and manage images, illustrations, and logos. Supports PNG, JPEG, SVG, WEBP up to 5MB.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
            className="hidden"
            id="media-upload-input"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
          </button>
        </div>
      </div>

      {/* Toast & Error */}
      {toastMessage && (
        <div role="status" className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div role="alert" className="p-3 bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Search Toolbar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Filter media assets by name..."
          className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-purple-500"
        />
      </div>

      {/* Media Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-slate-400">Loading media library...</div>
      ) : filteredItems.length === 0 ? (
        <div className="py-20 text-center bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-2">
          <ImageIcon className="w-12 h-12 mx-auto text-slate-600" />
          <p className="text-sm font-semibold text-slate-300">No media assets found</p>
          <p className="text-xs text-slate-500">Upload high-resolution logos, banners, or icons.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition-all flex flex-col"
            >
              {/* Image Preview Box */}
              <div className="h-40 bg-slate-900/90 relative flex items-center justify-center p-2 overflow-hidden border-b border-slate-850">
                <img
                  src={item.url}
                  alt={item.altText}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                  onError={e => {
                    // Fallback visual
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Asset Details */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-xs font-bold text-white truncate" title={item.title}>
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-500 truncate mt-0.5">
                    {item.filename}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {(item.fileSize / 1024).toFixed(1)} KB • {item.mimeType.split('/')[1]?.toUpperCase()}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(item)}
                    className="inline-flex items-center gap-1 text-slate-300 hover:text-purple-400 text-[11px] font-semibold cursor-pointer"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-rose-950/30 transition-colors cursor-pointer"
                    title="Delete asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
