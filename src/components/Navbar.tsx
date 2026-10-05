import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  User, 
  ShoppingCart, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles,
  Server,
  Mail,
  Shield,
  Layers,
  ArrowRight,
  Headphones,
  Zap,
  Check,
  Cpu,
  Layout,
  Store,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export type AppView = 'domains' | 'webhosting' | 'wordpress' | 'cloud' | 'vps' | 'email' | 'home' | 'checkout' | 'hero-samples' | 'admin';

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenCart: () => void;
  onOpenLiveChat: () => void;
  onOpenBuilder?: () => void;
  onOpenDomainTransfer?: () => void;
  onOpenDomainSearch?: () => void;
  onOpenWhoisLookup?: () => void;
  onOpenEmailCategory?: (cat: 'webmail' | 'm365' | 'security') => void;
  cartCount: number;
  currentView?: AppView;
  onChangeView?: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  onOpenCart,
  onOpenLiveChat,
  onOpenBuilder,
  onOpenDomainTransfer,
  onOpenDomainSearch,
  onOpenWhoisLookup,
  onOpenEmailCategory,
  cartCount,
  currentView = 'webhosting',
  onChangeView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  interface NavItem {
    title: string;
    desc: string;
    href?: string;
    view?: AppView;
    onAction?: () => void;
    badge?: string;
    badgeColor?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }

  interface NavSection {
    label: string;
    badge?: string;
    isActive?: boolean;
    onClickDirect?: () => void;
    items: NavItem[];
  }

  const navLinks: NavSection[] = [
    {
      label: 'Domains',
      isActive: currentView === 'domains',
      onClickDirect: () => {
        onOpenDomainSearch?.();
        onChangeView?.('domains');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      items: [
        {
          title: 'Search & Register Domains',
          desc: 'Claim .com, .net, .org, .ai and 350+ global domain extensions',
          view: 'domains',
          onAction: onOpenDomainSearch,
          badge: 'From £0.99',
          badgeColor: 'bg-emerald-100 text-[#008a45]',
          icon: Globe,
        },
        {
          title: 'Instant Domain Transfer',
          desc: 'Transfer your existing domains with zero downtime & 1-year renewal included',
          view: 'domains',
          onAction: onOpenDomainTransfer,
          badge: 'Free Transfer',
          badgeColor: 'bg-emerald-50 text-emerald-800',
          icon: ExternalLink,
        },
        {
          title: 'WHOIS Domain Lookup',
          desc: 'Check ICANN domain ownership, registrar details, nameservers & expiry dates',
          view: 'domains',
          onAction: onOpenWhoisLookup,
          badge: 'Free Tool',
          badgeColor: 'bg-amber-100 text-amber-900',
          icon: Search,
        },
      ],
    },
    {
      label: 'Hosting',
      badge: currentView === 'webhosting' ? 'Web' : currentView === 'wordpress' ? 'WordPress' : currentView === 'cloud' ? 'Cloud' : undefined,
      isActive: currentView === 'webhosting' || currentView === 'wordpress' || currentView === 'cloud',
      items: [
        {
          title: 'Web Hosting',
          desc: 'High-speed NVMe storage, 4 scalable plans, free domain & daily backups',
          view: 'webhosting',
          badge: '4 Plans',
          badgeColor: 'bg-emerald-100 text-[#008a45]',
          icon: Globe,
        },
        {
          title: 'WordPress Hosting',
          desc: 'Managed WordPress, 1-click install, auto-updates & speed caching',
          view: 'wordpress',
          badge: 'Popular',
          badgeColor: 'bg-[#fed000] text-slate-950',
          icon: Zap,
        },
        {
          title: 'Cloud Hosting',
          desc: 'Isolated cloud containers, multi-region failover & 99.99% uptime guarantee',
          view: 'cloud',
          badge: 'Ultra-Fast',
          badgeColor: 'bg-emerald-50 text-emerald-700',
          icon: Server,
        },
      ],
    },
    {
      label: 'VPS Server',
      isActive: currentView === 'vps',
      onClickDirect: () => {
        onChangeView?.('vps');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      items: [
        {
          title: 'Linux KVM VPS Server',
          desc: 'Dedicated vCPU & NVMe SSD storage with full root SSH administrator control',
          view: 'vps',
          badge: 'Root SSH',
          badgeColor: 'bg-slate-100 text-slate-800',
          icon: Server,
        },
        {
          title: 'Managed Cloud VPS',
          desc: 'Fully managed operating system, 24/7 server monitoring & automatic security patching',
          view: 'vps',
          badge: 'Managed',
          badgeColor: 'bg-emerald-100 text-emerald-800',
          icon: Shield,
        },
        {
          title: 'High-Storage VPS',
          desc: 'Scalable block storage up to 4 TB for high-load media, backups & databases',
          view: 'vps',
          badge: 'Up to 4TB',
          badgeColor: 'bg-amber-100 text-amber-900',
          icon: Cpu,
        },
      ],
    },
    {
      label: 'Business Email',
      isActive: currentView === 'email',
      onClickDirect: () => {
        onChangeView?.('email');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      items: [
        {
          title: 'Custom Domain Webmail',
          desc: 'Clean, ad-free professional email matching your domain (you@brand.com)',
          view: 'email',
          onAction: () => onOpenEmailCategory?.('webmail'),
          badge: '25 GB Storage',
          badgeColor: 'bg-emerald-100 text-[#008a45]',
          icon: Mail,
        },
        {
          title: 'Microsoft 365 & Office',
          desc: 'Word, Excel, Outlook, Teams & 1 TB OneDrive cloud storage included',
          view: 'email',
          onAction: () => onOpenEmailCategory?.('m365'),
          badge: 'Office Apps',
          badgeColor: 'bg-blue-100 text-blue-800',
          icon: Layers,
        },
        {
          title: 'Anti-Spam & Encryption',
          desc: 'Enterprise SPF, DKIM, and TLS 1.3 encrypted routing with virus filter',
          view: 'email',
          onAction: () => onOpenEmailCategory?.('security'),
          badge: 'SSL/TLS',
          badgeColor: 'bg-slate-100 text-slate-800',
          icon: Shield,
        },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-2xs">
      
      {/* Top Notification Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-[#041d16] text-emerald-300 text-xs py-1.5 px-4 text-center font-medium border-b border-emerald-950 flex items-center justify-between gap-2 relative">
          <div className="flex-1 flex items-center justify-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
            <span className="bg-emerald-500/20 text-[#4ade80] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-500/30 shrink-0">
              Spring 2026 Release
            </span>
            <span className="text-gray-200 truncate">
              Aida 2.5 Multi-Language & Auto-Stripe Shop Generation is live.
            </span>
            <button
              type="button"
              onClick={() => onOpenBuilder?.()}
              className="text-[#fed000] font-bold hover:underline inline-flex items-center gap-1 shrink-0 ml-1 cursor-pointer"
            >
              Try 14 Days Free <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Dismiss / Close Button */}
          <button
            type="button"
            onClick={() => setShowAnnouncement(false)}
            className="text-emerald-400/80 hover:text-white hover:bg-emerald-900/50 p-1 rounded-md transition-colors cursor-pointer shrink-0 ml-2"
            title="Dismiss announcement"
            aria-label="Close notification"
            id="dismiss-announcement-bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-16 md:h-18 gap-2">
                    {/* Brand Logo */}
          <div className="flex items-center gap-3 xl:gap-5 shrink-0">
            <button 
              type="button" 
              onClick={() => {
                onChangeView?.('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 focus:outline-hidden shrink-0 text-left cursor-pointer" 
              id="nav-logo"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#008a45] to-[#041d16] flex items-center justify-center text-white font-black shadow-md relative shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#fed000]" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
              </div>
              <div className="flex items-center">
                <span className="text-lg sm:text-xl font-black tracking-tight text-[#111827] whitespace-nowrap">
                  Host<span className="text-[#008a45]">xeon</span>
                </span>
                <span className="ml-1 text-[9px] font-extrabold bg-emerald-100 text-[#008a45] px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                  AI
                </span>
              </div>
            </button>

            {/* Desktop Navigation (lg and above) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navLinks.map((link) => (
                <div 
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => {
                      if (link.onClickDirect) {
                        link.onClickDirect();
                        setActiveDropdown(null);
                      } else {
                        setActiveDropdown(activeDropdown === link.label ? null : link.label);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 text-[14px] rounded-xl transition-all focus:outline-hidden cursor-pointer whitespace-nowrap ${
                      link.isActive
                        ? 'text-[#008a45] font-bold bg-emerald-50/80 hover:bg-emerald-100/60'
                        : 'text-gray-700 font-semibold hover:text-black hover:bg-gray-50'
                    }`}
                    id={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase shrink-0 ${
                        link.isActive ? 'bg-[#008a45] text-white' : 'bg-emerald-100 text-[#008a45]'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 transition-transform group-hover:rotate-180 shrink-0" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === link.label && link.items && (
                    <div className="absolute top-full left-0 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="space-y-1">
                        {link.items.map((subItem) => {
                          const isItemActive = subItem.view && currentView === subItem.view;
                          const SubIcon = subItem.icon;
                          
                          return (
                            <a
                              key={subItem.title}
                              href={subItem.href || '#'}
                              onClick={(e) => {
                                if (subItem.onAction) {
                                  subItem.onAction();
                                }
                                if (subItem.view && onChangeView) {
                                  e.preventDefault();
                                  onChangeView(subItem.view);
                                  setActiveDropdown(null);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                } else {
                                  setActiveDropdown(null);
                                }
                              }}
                              className={`block p-2.5 rounded-xl transition-colors group/item ${
                                isItemActive 
                                  ? 'bg-emerald-50/90 border border-emerald-200/80 shadow-2xs' 
                                  : 'hover:bg-emerald-50/60 border border-transparent'
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                {SubIcon && (
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                    isItemActive
                                      ? 'bg-[#008a45] text-white'
                                      : 'bg-emerald-100/60 text-[#008a45] group-hover/item:bg-[#008a45] group-hover/item:text-white'
                                  }`}>
                                    <SubIcon className="w-4 h-4" />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs sm:text-sm font-bold text-gray-900 group-hover/item:text-[#008a45] flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                      <span>{subItem.title}</span>
                                      {subItem.badge && (
                                        <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                                          subItem.badgeColor || 'bg-emerald-100 text-emerald-800'
                                        }`}>
                                          {subItem.badge}
                                        </span>
                                      )}
                                    </span>
                                    {isItemActive ? (
                                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Active</span>
                                    ) : (
                                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity text-[#008a45] shrink-0" />
                                    )}
                                  </div>
                                  <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                                    {subItem.desc}
                                  </div>
                                </div>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right Action Bar (Desktop - lg and above) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <button
              onClick={onOpenLiveChat}
              className="hidden xl:flex items-center gap-1.5 text-xs xl:text-sm font-bold text-gray-700 hover:text-black px-2.5 xl:px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              id="nav-247-support"
            >
              <Headphones className="w-4 h-4 text-[#008a45] shrink-0" />
              <span>24/7 Expert Help</span>
            </button>

            {/* Login Button */}
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 border border-gray-200 hover:border-gray-900 text-gray-800 hover:text-black px-3.5 xl:px-4 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer whitespace-nowrap shrink-0"
              id="nav-login-btn"
            >
              <User className="w-3.5 h-3.5 text-gray-600 shrink-0" />
              <span>Sign In</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:p-2.5 text-gray-700 hover:text-black hover:bg-gray-100 rounded-xl transition-colors focus:outline-hidden cursor-pointer shrink-0"
              id="nav-cart-btn"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 shrink-0" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 right-0.5 min-w-[18px] h-[18px] bg-[#008a45] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile & Tablet Action Bar (below lg: 0px to 1023px) */}
          <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
            {/* Quick Sign In button */}
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1 border border-gray-200 hover:border-gray-900 text-gray-800 hover:text-black px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer shrink-0"
              id="mobile-nav-login-btn"
            >
              <User className="w-3.5 h-3.5 text-gray-600 shrink-0" />
              <span className="hidden sm:inline">Sign In</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-xl transition-colors cursor-pointer shrink-0"
              id="mobile-cart-btn"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 shrink-0" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 right-0.5 min-w-4 h-4 bg-[#008a45] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-xl focus:outline-hidden cursor-pointer shrink-0"
              id="mobile-menu-toggle"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 sm:px-6 pt-3 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {onChangeView && (
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-gray-100 p-1 text-center">
              <button
                type="button"
                onClick={() => {
                  onChangeView('domains');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  currentView === 'domains' ? 'bg-[#008a45] text-white shadow-xs' : 'text-gray-700'
                }`}
              >
                Domains
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeView('webhosting');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  currentView === 'webhosting' ? 'bg-[#008a45] text-white shadow-xs' : 'text-gray-700'
                }`}
              >
                Web Hosting
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeView('wordpress');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  currentView === 'wordpress' ? 'bg-[#008a45] text-white shadow-xs' : 'text-gray-700'
                }`}
              >
                WordPress
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeView('cloud');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  currentView === 'cloud' ? 'bg-[#008a45] text-white shadow-xs' : 'text-gray-700'
                }`}
              >
                Cloud Hosting
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeView('vps');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  currentView === 'vps' ? 'bg-[#008a45] text-white shadow-xs' : 'text-gray-700'
                }`}
              >
                VPS Server
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeView('email');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  currentView === 'email' ? 'bg-[#008a45] text-white shadow-xs' : 'text-gray-700'
                }`}
              >
                Business Email
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl font-bold text-sm whitespace-nowrap"
            >
              <User className="w-4 h-4" />
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLiveChat();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#062c21] text-white rounded-xl font-bold text-sm whitespace-nowrap"
            >
              <Headphones className="w-4 h-4" />
              24/7 Support
            </button>
          </div>

          <div className="space-y-1 divide-y divide-gray-100">
            {navLinks.map((link) => (
              <div key={link.label} className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2 py-1 flex items-center justify-between">
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      link.isActive ? 'bg-[#008a45] text-white' : 'bg-emerald-100 text-[#008a45]'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </div>
                <div className="space-y-0.5 mt-1">
                  {link.items?.map((item) => {
                    const isItemActive = item.view && currentView === item.view;
                    const SubIcon = item.icon;

                    return (
                      <a
                        key={item.title}
                        href={item.href || '#'}
                        onClick={(e) => {
                          if (item.onAction) {
                            item.onAction();
                          }
                          if (item.view && onChangeView) {
                            e.preventDefault();
                            onChangeView(item.view);
                            setMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          } else {
                            setMobileMenuOpen(false);
                          }
                        }}
                        className={`block px-3 py-2 text-sm rounded-xl transition-colors ${
                          isItemActive ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-gray-800 hover:bg-emerald-50/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {SubIcon && <SubIcon className="w-4 h-4 text-[#008a45]" />}
                            <span className="font-bold text-gray-900">{item.title}</span>
                            {item.badge && (
                              <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase ${
                                item.badgeColor || 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {isItemActive && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Active</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 pl-6">{item.desc}</div>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

