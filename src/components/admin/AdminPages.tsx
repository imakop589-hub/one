import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Trash2,
  Edit3,
  ExternalLink,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { CmsPage, ContentStatus } from '../../types/cms';

interface AdminPagesProps {
  onEditPage: (pageId: string) => void;
  onCreatePage: () => void;
  onViewPageOnSite: (slug: string) => void;
}

export const AdminPages: React.FC<AdminPagesProps> = ({
  onEditPage,
  onCreatePage,
  onViewPageOnSite,
}) => {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadPages = async () => {
    setIsLoading(true);
    try {
      const data = await cmsService.getPages();
      setPages(data);
    } catch (err) {
      console.error('Error fetching pages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleStatus = async (page: CmsPage) => {
    try {
      const updated = await cmsService.togglePageStatus(page.id);
      if (updated) {
        setPages(prev => prev.map(p => (p.id === page.id ? updated : p)));
        showToast(`Page "${page.title}" changed to ${updated.status}.`);
      }
    } catch {
      showToast('Failed to update page status.');
    }
  };

  const handleDeletePage = async (id: string) => {
    try {
      const success = await cmsService.deletePage(id);
      if (success) {
        setPages(prev => prev.filter(p => p.id !== id));
        setDeleteConfirmId(null);
        showToast('Page deleted successfully.');
      }
    } catch {
      showToast('Failed to delete page.');
    }
  };

  // Filtered pages
  const filteredPages = pages.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            <span>Pages Content Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, edit, publish, and manage SEO metadata for Hostxeon website pages.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreatePage}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer shrink-0"
          id="admin-add-new-page"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Page</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div role="status" className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search pages by title or slug..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-850 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
          />
        </div>

        {/* Category Filter */}
        <div className="sm:col-span-3">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-full py-2 px-3 bg-slate-900 border border-slate-850 rounded-xl text-xs text-slate-200 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="hosting">Hosting</option>
            <option value="domains">Domains</option>
            <option value="company">Company</option>
            <option value="legal">Legal</option>
            <option value="general">General</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full py-2 px-3 bg-slate-900 border border-slate-850 rounded-xl text-xs text-slate-200 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Pages Table / List */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
        {isLoading ? (
          <div className="py-16 text-center text-xs text-slate-400">
            <span className="w-6 h-6 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin inline-block mb-2" />
            <p>Loading pages...</p>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <FileText className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No pages found matching criteria</p>
            <p className="text-xs text-slate-500">Try adjusting your search terms or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Page Title & Slug</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold hidden md:table-cell">SEO Title</th>
                  <th className="py-3.5 px-4 font-bold hidden lg:table-cell">Updated</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {filteredPages.map(page => (
                  <tr key={page.id} className="hover:bg-slate-900/60 transition-colors">
                    {/* Title & Slug */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white hover:text-emerald-400 cursor-pointer" onClick={() => onEditPage(page.id)}>
                        {page.title}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        /{page.slug}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {page.category || 'general'}
                      </span>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(page)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                          page.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                        title="Click to toggle status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${page.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        <span className="capitalize">{page.status}</span>
                      </button>
                    </td>

                    {/* SEO Title */}
                    <td className="py-3.5 px-4 hidden md:table-cell max-w-xs truncate text-slate-400">
                      {page.seoTitle || '—'}
                    </td>

                    {/* Updated date */}
                    <td className="py-3.5 px-4 hidden lg:table-cell text-slate-500 text-[11px]">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onViewPageOnSite(page.slug)}
                          className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-850 rounded-lg transition-colors cursor-pointer"
                          title="View on site"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onEditPage(page.id)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-850 rounded-lg transition-colors cursor-pointer"
                          title="Edit page"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(page.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                          title="Delete page"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Confirm Page Deletion</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete this page from the CMS? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeletePage(deleteConfirmId)}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Delete Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
