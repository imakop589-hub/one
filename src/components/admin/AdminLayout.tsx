import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Menu as MenuIcon,
  Settings,
  Image as ImageIcon,
  HelpCircle,
  ExternalLink,
  LogOut,
  Sparkles,
  ChevronRight,
  Globe,
  X,
  ShieldCheck,
} from 'lucide-react';
import { authService } from '../../services/authService';

export type AdminSection = 'dashboard' | 'pages' | 'page-new' | 'page-edit' | 'navigation' | 'settings' | 'media' | 'faqs' | 'whmcs';

interface AdminLayoutProps {
  activeSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
  onLogout: () => void;
  onViewPublicSite: () => void;
  children: React.ReactNode;
  breadcrumbs?: { label: string; action?: () => void }[];
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeSection,
  onSelectSection,
  onLogout,
  onViewPublicSite,
  children,
  breadcrumbs = [],
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const currentUser = authService.getCurrentUser();

  const navItems = [
    { id: 'dashboard' as AdminSection, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pages' as AdminSection, label: 'Pages CMS', icon: FileText },
    { id: 'navigation' as AdminSection, label: 'Navigation Menus', icon: MenuIcon },
    { id: 'media' as AdminSection, label: 'Media Library', icon: ImageIcon },
    { id: 'faqs' as AdminSection, label: 'FAQs Manager', icon: HelpCircle },
    { id: 'settings' as AdminSection, label: 'Site Settings', icon: Settings },
    { id: 'whmcs' as AdminSection, label: 'WHMCS Bridge Config', icon: ExternalLink, badge: 'Separate' },
  ];

  const handleNavClick = (section: AdminSection) => {
    onSelectSection(section);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#008a45] to-[#041d16] flex items-center justify-center text-white shadow-md relative">
              <Sparkles className="w-4 h-4 text-[#fed000]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base text-white tracking-tight">Host<span className="text-emerald-400">xeon</span></span>
                <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded border border-emerald-500/30">CMS</span>
              </div>
              <span className="text-[10px] text-slate-400">Content Administration</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Content Architecture
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id || (item.id === 'pages' && (activeSection === 'page-new' || activeSection === 'page-edit'));
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
                id={`admin-nav-${item.id}`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                    isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Architectural Boundary Reminder Card */}
          <div className="pt-6">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>WHMCS Boundary</span>
              </div>
              <p className="leading-relaxed text-[10px]">
                Customer billing, invoices, ticket support and automated server provisioning will be handled by the separate WHMCS installation.
              </p>
            </div>
          </div>
        </div>

        {/* User Profile & Actions Footer */}
        <div className="p-3 border-t border-slate-800 shrink-0 bg-slate-950/60">
          <div className="flex items-center justify-between mb-2 px-2">
            <div className="truncate">
              <p className="text-xs font-bold text-slate-200 truncate">{currentUser?.name || 'Administrator'}</p>
              <p className="text-[10px] text-slate-500 truncate">{currentUser?.username || 'admin'}</p>
            </div>
            <span className="text-[9px] bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded border border-slate-700 uppercase font-mono">
              Root
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              type="button"
              onClick={onViewPublicSite}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
              title="Return to Public Website"
            >
              <Globe className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">Public Site</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-rose-100 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer border border-rose-900/40"
              title="Sign Out of CMS"
            >
              <LogOut className="w-3 h-3 shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
              aria-label="Open sidebar menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>

            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium overflow-x-auto whitespace-nowrap">
              <button
                type="button"
                onClick={() => onSelectSection('dashboard')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Admin
              </button>
              {breadcrumbs.map((b, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  {b.action ? (
                    <button
                      type="button"
                      onClick={b.action}
                      className="hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {b.label}
                    </button>
                  ) : (
                    <span className="text-slate-200 font-semibold">{b.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onViewPublicSite}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>View Public Site</span>
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
