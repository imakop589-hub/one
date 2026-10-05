import React, { useState } from 'react';
import { ChevronDown, Check, Sparkles, MessageSquare, User, ShoppingCart, ShieldCheck, Headphones, Settings } from 'lucide-react';
import { AppView } from './Navbar';
import { LegalModal, PolicyType } from './LegalModal';

interface FooterProps {
  onChangeView?: (view: AppView) => void;
  onOpenLiveChat?: () => void;
  onOpenLogin?: () => void;
  onOpenCart?: () => void;
  onOpenDomainTransfer?: () => void;
  onOpenDomainSearch?: () => void;
  onOpenWhoisLookup?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onChangeView,
  onOpenLiveChat,
  onOpenLogin,
  onOpenCart,
  onOpenDomainTransfer,
  onOpenDomainSearch,
  onOpenWhoisLookup,
}) => {
  const [language, setLanguage] = useState('English (United Kingdom)');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const navigateTo = (view: AppView) => {
    if (onChangeView) {
      onChangeView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const languages = [
    { label: 'English (United Kingdom)', flag: '🇬🇧', currency: 'GBP (£)' },
    { label: 'English (United States)', flag: '🇺🇸', currency: 'USD ($)' },
    { label: 'Dansk (Danmark)', flag: '🇩🇰', currency: 'DKK (kr)' },
    { label: 'Svenska (Sverige)', flag: '🇸🇪', currency: 'SEK (kr)' },
    { label: 'Norsk (Norge)', flag: '🇳🇴', currency: 'NOK (kr)' },
    { label: 'Nederlands (Nederland)', flag: '🇳🇱', currency: 'EUR (€)' },
    { label: 'Deutsch (Deutschland)', flag: '🇩🇪', currency: 'EUR (€)' },
  ];

  return (
    <>
      <footer className="bg-slate-950 text-white border-t border-slate-800" id="footer">
        {/* VAT Compliance Banner */}
        <div className="bg-slate-900 py-2.5 px-4 text-center text-xs text-slate-400 border-b border-slate-800">
          All prices include 20% VAT. 30-day money-back guarantee on all hosting and cloud packages with instant activation.
        </div>

        {/* Main Footer Links - Matching Header Services Exactly */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            
            {/* Column 1: Logo & Brand Summary */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
              <button 
                type="button"
                onClick={() => navigateTo('home')} 
                className="flex items-center gap-2 focus:outline-hidden cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-900 flex items-center justify-center text-white font-black shadow-md">
                  <Sparkles className="w-4 h-4 text-[#fed000]" />
                </div>
                <span className="text-xl font-black tracking-tight text-white">
                  Host<span className="text-emerald-400">xeon</span>
                </span>
              </button>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-speed NVMe web hosting, managed WordPress, cloud instances, Linux VPS servers, domain registration & business email.
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>All Infrastructure Operational (99.99%)</span>
              </div>

              {/* Official Trustpilot link in footer */}
              <div className="pt-2">
                <a
                  href="https://www.trustpilot.com/review/hostxeon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white transition-all group"
                >
                  <span className="text-[#00b67a] font-black text-sm leading-none">★</span>
                  <span>Rated <strong>5.0</strong> on Trustpilot</span>
                </a>
              </div>
            </div>

            {/* Column 2: Domains (Header Service) */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Domains</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => { onOpenDomainSearch?.(); navigateTo('domains'); }} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Search & Register Domains</button></li>
                <li><button onClick={() => { onOpenDomainTransfer?.(); navigateTo('domains'); }} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Instant Domain Transfer</button></li>
                <li><button onClick={() => { onOpenWhoisLookup?.(); navigateTo('domains'); }} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">WHOIS Domain Lookup</button></li>
                <li><button onClick={() => { onOpenDomainSearch?.(); navigateTo('domains'); }} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">.COM, .CO.UK & .AI TLDs</button></li>
                <li><button onClick={() => { onOpenWhoisLookup?.(); navigateTo('domains'); }} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Free WHOIS Privacy Shield</button></li>
              </ul>
            </div>

            {/* Column 3: Web Hosting (Header Service) */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Web Hosting</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => navigateTo('webhosting')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Starter Plan (£1.99/mo)</button></li>
                <li><button onClick={() => navigateTo('webhosting')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Professional Plan (£1.99/mo)</button></li>
                <li><button onClick={() => navigateTo('webhosting')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Business Plan (£3.99/mo)</button></li>
                <li><button onClick={() => navigateTo('webhosting')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Guru Plan (£6.99/mo)</button></li>
                <li><button onClick={() => navigateTo('webhosting')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Free SSL & Daily Backups</button></li>
              </ul>
            </div>

            {/* Column 4: WordPress & Cloud (Header Service) */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">WordPress & Cloud</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => navigateTo('wordpress')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Managed WordPress Hosting</button></li>
                <li><button onClick={() => navigateTo('wordpress')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">1-Click WordPress Setup</button></li>
                <li><button onClick={() => navigateTo('wordpress')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Speed Optimization & Caching</button></li>
                <li><button onClick={() => navigateTo('cloud')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Isolated Cloud Hosting</button></li>
                <li><button onClick={() => navigateTo('cloud')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Tier-3 European Cloud Nodes</button></li>
              </ul>
            </div>

            {/* Column 5: VPS & Business Email (Header Service) */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">VPS & Email</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => navigateTo('vps')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Linux KVM VPS Server</button></li>
                <li><button onClick={() => navigateTo('vps')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Full Root SSH Administrator</button></li>
                <li><button onClick={() => navigateTo('vps')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">High-Storage VPS (up to 4TB)</button></li>
                <li><button onClick={() => navigateTo('email')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Custom Domain Webmail</button></li>
                <li><button onClick={() => navigateTo('email')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Microsoft 365 & Spam Shield</button></li>
              </ul>
            </div>

            {/* Column 6: Support, Account & Region */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Support & Account</h4>
              
              <ul className="space-y-2.5 text-xs text-slate-400 mb-6">
                <li>
                  <button 
                    onClick={onOpenLiveChat} 
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer font-semibold text-left"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#fed000]" />
                    <span>24/7 Live Chat Support</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onOpenLogin} 
                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Client Control Panel Login</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onOpenCart} 
                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-slate-400" />
                    <span>View Shopping Basket</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateTo('admin')} 
                    className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer text-left"
                    id="footer-admin-cms-link"
                  >
                    <Settings className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Hostxeon CMS Admin</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActivePolicy('security')} 
                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>3.2 Tbps Anti-DDoS Security</span>
                  </button>
                </li>
              </ul>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="w-full bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-xl px-3 py-2 text-xs text-white flex items-center justify-between transition-colors cursor-pointer"
                  id="footer-lang-btn"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span>🇬🇧</span>
                    <span className="truncate">{language}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>

                {langMenuOpen && (
                  <div className="absolute bottom-full left-0 w-64 bg-slate-900 border border-slate-700 rounded-xl p-1.5 shadow-2xl z-50 mb-2 space-y-0.5">
                    {languages.map((l) => (
                      <button
                        key={l.label}
                        onClick={() => {
                          setLanguage(l.label);
                          setLangMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-xs text-white flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span>{l.flag}</span>
                          <span>{l.label}</span>
                        </div>
                        {language === l.label && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Verified Legal Modals */}
          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Hostxeon Platform Inc. All rights reserved. Tier-3 European Cloud Infrastructure.</p>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <button 
                onClick={() => setActivePolicy('privacy')} 
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button 
                onClick={() => setActivePolicy('terms')} 
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <span>•</span>
              <button 
                onClick={() => setActivePolicy('cookies')} 
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Cookie Policy
              </button>
              <span>•</span>
              <button 
                onClick={() => setActivePolicy('security')} 
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Security & SLA
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Real Policy Modal */}
      <LegalModal
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </>
  );
};
