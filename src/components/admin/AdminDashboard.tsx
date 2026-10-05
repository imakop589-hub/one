import React, { useState, useEffect } from 'react';
import {
  FileText,
  Menu as MenuIcon,
  Image as ImageIcon,
  HelpCircle,
  Plus,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Settings,
  Clock,
  Eye,
} from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { CmsPage, CmsMenuItem, CmsMediaItem, CmsFaq, CmsWhmcsConfig } from '../../types/cms';
import { AdminSection } from './AdminLayout';

interface AdminDashboardProps {
  onNavigateSection: (section: AdminSection) => void;
  onEditPage: (pageId: string) => void;
  onCreatePage: () => void;
  onViewPublicSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateSection,
  onEditPage,
  onCreatePage,
  onViewPublicSite,
}) => {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [menus, setMenus] = useState<CmsMenuItem[]>([]);
  const [media, setMedia] = useState<CmsMediaItem[]>([]);
  const [faqs, setFaqs] = useState<CmsFaq[]>([]);
  const [whmcs, setWhmcs] = useState<CmsWhmcsConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [pagesData, menusData, mediaData, faqsData, whmcsData] = await Promise.all([
          cmsService.getPages(),
          cmsService.getMenuItems(),
          cmsService.getMediaItems(),
          cmsService.getFaqs(),
          cmsService.getWhmcsConfig(),
        ]);
        setPages(pagesData);
        setMenus(menusData);
        setMedia(mediaData);
        setFaqs(faqsData);
        setWhmcs(whmcsData);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const publishedPagesCount = pages.filter(p => p.status === 'published').length;
  const draftPagesCount = pages.filter(p => p.status === 'draft').length;

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
        <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-xs font-semibold">Loading Hostxeon CMS content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>Hostxeon CMS Administration</span>
            <span className="text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              Foundation Active
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage public website pages, navigation menus, media library, and site SEO configurations.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onCreatePage}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
            id="dash-create-page-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Page</span>
          </button>
        </div>
      </div>

      {/* Architecture Separation Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/90 border border-slate-800 shadow-md">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 text-[#fed000]" />
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-bold text-white">
                Hostxeon Public Website & CMS Architecture
              </h2>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
                WHMCS Separated
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              This CMS controls the public branding, marketing copy, SEO tags, navigation structure, and media assets.
              Customer accounts, subscriptions, credit cards, automated cPanel/KVM provisioning, and ticket desks are intentionally separated for the external WHMCS installation.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                ✓ Public Website CMS: Ready
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                ✓ WHMCS Link Bridge: {whmcs?.isWhmcsActive ? 'Enabled' : 'Configurable'}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                • Zero duplicate billing or customer tables
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pages Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Pages CMS</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{pages.length}</span>
            <span className="text-xs text-emerald-400 font-semibold">{publishedPagesCount} published</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
            <span>{draftPagesCount} drafts</span>
            <button
              type="button"
              onClick={() => onNavigateSection('pages')}
              className="text-emerald-400 hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
            >
              Manage <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Navigation Menus Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Navigation Menus</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <MenuIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{menus.length}</span>
            <span className="text-xs text-slate-400">links configured</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
            <span>Header, Mega & Footer</span>
            <button
              type="button"
              onClick={() => onNavigateSection('navigation')}
              className="text-blue-400 hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
            >
              Manage <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Media Library Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Media Assets</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{media.length}</span>
            <span className="text-xs text-slate-400">images in library</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
            <span>Max 5MB per upload</span>
            <button
              type="button"
              onClick={() => onNavigateSection('media')}
              className="text-purple-400 hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
            >
              Open <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* WHMCS Bridge Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">WHMCS Bridge</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-white truncate">
              {whmcs?.baseUrl ? new URL(whmcs.baseUrl).hostname : 'Not Set'}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
            <span className="text-amber-400 font-medium">Ready for deployment</span>
            <button
              type="button"
              onClick={() => onNavigateSection('whmcs')}
              className="text-amber-400 hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
            >
              Config <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Pages */}
        <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">Recent CMS Pages</h2>
              <p className="text-xs text-slate-400">Pages managed by the Hostxeon content layer</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateSection('pages')}
              className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              View All ({pages.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-800/80">
            {pages.slice(0, 6).map(page => (
              <div key={page.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-200 truncate hover:text-emerald-400 cursor-pointer" onClick={() => onEditPage(page.id)}>
                      {page.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">/{page.slug}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      page.status === 'published'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {page.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5 max-w-md">
                    {page.metaDescription || page.content}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onEditPage(page.id)}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-slate-800"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Quick Actions & Management */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <button
                type="button"
                onClick={onCreatePage}
                className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                  <span>Create New Page</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateSection('navigation')}
                className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <MenuIcon className="w-3.5 h-3.5" />
                  </div>
                  <span>Manage Header & Footer Links</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateSection('media')}
                className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <ImageIcon className="w-3.5 h-3.5" />
                  </div>
                  <span>Upload Media Asset</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateSection('settings')}
                className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center">
                    <Settings className="w-3.5 h-3.5" />
                  </div>
                  <span>Edit Site Settings & SEO</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-200 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateSection('whmcs')}
                className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <span>Configure WHMCS Links</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* System Status info box */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              System Environment
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Frontend App:</span>
                <span className="text-slate-200 font-mono">React 19 + Vite</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">CMS Data Store:</span>
                <span className="text-emerald-400 font-mono">CMS Storage Layer</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Admin Auth:</span>
                <span className="text-slate-200 font-mono">Session Token Guard</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Client Portal:</span>
                <span className="text-amber-400 font-mono">WHMCS (Separated)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
