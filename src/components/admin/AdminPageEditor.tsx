import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Save,
  Globe,
  Share2,
  FileText,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { CmsPage, ContentStatus } from '../../types/cms';

interface AdminPageEditorProps {
  pageId?: string | null;
  onBack: () => void;
  onSaved: (savedPage: CmsPage) => void;
}

export const AdminPageEditor: React.FC<AdminPageEditorProps> = ({
  pageId,
  onBack,
  onSaved,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState<ContentStatus>('draft');
  const [category, setCategory] = useState<'hosting' | 'domains' | 'company' | 'legal' | 'general'>('general');
  const [content, setContent] = useState('');

  // SEO fields
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');

  useEffect(() => {
    async function loadPage() {
      if (!pageId) {
        // New Page mode
        setTitle('');
        setSlug('');
        setStatus('draft');
        setCategory('general');
        setContent('');
        setSeoTitle('');
        setMetaDescription('');
        setCanonicalUrl('');
        setOgTitle('');
        setOgDescription('');
        setOgImage('');
        return;
      }

      try {
        const p = await cmsService.getPageById(pageId);
        if (p) {
          setTitle(p.title);
          setSlug(p.slug);
          setStatus(p.status);
          setCategory(p.category || 'general');
          setContent(p.content);
          setSeoTitle(p.seoTitle || '');
          setMetaDescription(p.metaDescription || '');
          setCanonicalUrl(p.canonicalUrl || '');
          setOgTitle(p.ogTitle || '');
          setOgDescription(p.ogDescription || '');
          setOgImage(p.ogImage || '');
        }
      } catch (err) {
        console.error('Failed to load page for edit:', err);
      }
    }
    loadPage();
  }, [pageId]);

  // Auto-slug generator when title changes (if slug empty or new)
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!pageId && !slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent, overrideStatus?: ContentStatus) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!title.trim()) {
      setErrorMessage('Page title is required.');
      return;
    }
    if (!slug.trim()) {
      setErrorMessage('Page slug is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const finalStatus = overrideStatus || status;
      const saved = await cmsService.savePage({
        id: pageId || undefined,
        title: title.trim(),
        slug: slug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
        status: finalStatus,
        category,
        content,
        seoTitle: seoTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim(),
        canonicalUrl: canonicalUrl.trim() || `https://hostxeon.com/#${slug.trim()}`,
        ogTitle: ogTitle.trim() || seoTitle.trim() || title.trim(),
        ogDescription: ogDescription.trim() || metaDescription.trim(),
        ogImage: ogImage.trim(),
      });

      setSuccessMessage(`Page "${saved.title}" successfully saved!`);
      setStatus(saved.status);
      setTimeout(() => {
        onSaved(saved);
      }, 700);
    } catch {
      setErrorMessage('An unexpected error occurred while saving the page.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto">
      {/* Top Bar with Back and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850 rounded-xl transition-colors cursor-pointer border border-slate-800"
            title="Back to Pages list"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {pageId ? `Edit Page: ${title || 'Untitled'}` : 'Create New Page'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Hostxeon CMS content and SEO metadata specification.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={e => handleSubmit(e, 'draft')}
            disabled={isSubmitting}
            className="px-3.5 py-2 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/40 hover:bg-amber-950/70 border border-amber-900/60 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            Save as Draft
          </button>

          <button
            type="button"
            onClick={e => handleSubmit(e, 'published')}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>Publish Page</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      {errorMessage && (
        <div role="alert" className="p-3.5 bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-medium rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div role="status" className="p-3.5 bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Editor Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'content'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>Content & Details</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'seo'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Globe className="w-4 h-4 text-blue-400" />
          <span>SEO & Social Cards</span>
        </button>
      </div>

      {/* Tab 1: Content & Details */}
      {activeTab === 'content' && (
        <div className="space-y-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-7">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/* Title */}
            <div className="sm:col-span-8 space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300" htmlFor="page-title">
                Page Title <span className="text-rose-400">*</span>
              </label>
              <input
                id="page-title"
                type="text"
                required
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="e.g. NVMe Web Hosting"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            {/* Status */}
            <div className="sm:col-span-4 space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Publish Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as ContentStatus)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
              >
                <option value="draft">Draft (Private)</option>
                <option value="published">Published (Public)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/* Slug */}
            <div className="sm:col-span-8 space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300" htmlFor="page-slug">
                URL Slug <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center">
                <span className="bg-slate-900 text-slate-500 px-3 py-2.5 border border-r-0 border-slate-800 rounded-l-xl text-xs font-mono">
                  hostxeon.com/#
                </span>
                <input
                  id="page-slug"
                  type="text"
                  required
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  placeholder="webhosting"
                  className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-r-xl text-sm font-mono text-emerald-400 placeholder-slate-600 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Category */}
            <div className="sm:col-span-4 space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
              >
                <option value="hosting">Hosting</option>
                <option value="domains">Domains</option>
                <option value="company">Company</option>
                <option value="legal">Legal</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>

          {/* Content Body */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-semibold text-slate-300" htmlFor="page-content">
              Page Content & Description
            </label>
            <textarea
              id="page-content"
              rows={8}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Enter page body text, feature summaries, or marketing content..."
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs leading-relaxed text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-emerald-500 font-mono"
            />
          </div>
        </div>
      )}

      {/* Tab 2: SEO & Social Metadata */}
      {activeTab === 'seo' && (
        <div className="space-y-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-7">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Search Engine Optimization (SEO)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Customize title tags, meta descriptions, and canonical URLs for Google and Bing.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="seo-title">
                SEO Title Tag (Title Element)
              </label>
              <input
                id="seo-title"
                type="text"
                value={seoTitle}
                onChange={e => setSeoTitle(e.target.value)}
                placeholder="High-Speed NVMe Web Hosting from £1.99 | Hostxeon"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-hidden focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Recommended length: 50-60 characters ({seoTitle.length} chars)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="meta-desc">
                Meta Description
              </label>
              <textarea
                id="meta-desc"
                rows={3}
                value={metaDescription}
                onChange={e => setMetaDescription(e.target.value)}
                placeholder="Brief summary of the page for search engine result snippets..."
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-hidden focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Recommended length: 140-160 characters ({metaDescription.length} chars)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="canonical-url">
                Canonical URL
              </label>
              <input
                id="canonical-url"
                type="url"
                value={canonicalUrl}
                onChange={e => setCanonicalUrl(e.target.value)}
                placeholder="https://hostxeon.com/#webhosting"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Social Cards / OpenGraph */}
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-blue-400" />
                <span>OpenGraph & Twitter Card Sharing</span>
              </h3>
              <p className="text-xs text-slate-400">
                Display appearance when shared on LinkedIn, Twitter/X, Discord, and Slack.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="og-title">
                  OG Title
                </label>
                <input
                  id="og-title"
                  type="text"
                  value={ogTitle}
                  onChange={e => setOgTitle(e.target.value)}
                  placeholder={title || 'Page title'}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="og-image">
                  OG Image URL
                </label>
                <input
                  id="og-image"
                  type="url"
                  value={ogImage}
                  onChange={e => setOgImage(e.target.value)}
                  placeholder="https://hostxeon.com/og-image.jpg"
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="og-desc">
                OG Description
              </label>
              <textarea
                id="og-desc"
                rows={2}
                value={ogDescription}
                onChange={e => setOgDescription(e.target.value)}
                placeholder="Share card summary description..."
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
