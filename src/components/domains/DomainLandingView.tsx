import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Globe, 
  RefreshCw, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles, 
  Server, 
  Headphones, 
  Check, 
  ShoppingBag,
  Info,
  Layers,
  Star,
  Flame,
  Award
} from 'lucide-react';
import { EXTENSIONS_CATALOG, TldSearchItem } from './types';

interface DomainLandingViewProps {
  onSearch: (domain: string) => void;
  onSwitchToTransfer: () => void;
  onOpenLiveChat: () => void;
  onGoToHosting?: () => void;
}

export const DomainLandingView: React.FC<DomainLandingViewProps> = ({
  onSearch,
  onSwitchToTransfer,
  onOpenLiveChat,
  onGoToHosting,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Popular' | 'Tech' | 'Business' | 'Deals'>('All');
  const [directoryFilter, setDirectoryFilter] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    } else {
      const inputEl = document.getElementById('domain-landing-search-input');
      if (inputEl) inputEl.focus();
    }
  };

  const handleChipClick = (tld: string) => {
    if (searchInput.trim()) {
      const base = searchInput.trim().replace(/\..+$/, '');
      const newQuery = `${base}${tld}`;
      setSearchInput(newQuery);
      onSearch(newQuery);
    } else {
      setSearchInput(tld);
      const inputEl = document.getElementById('domain-landing-search-input');
      if (inputEl) inputEl.focus();
    }
  };

  const filteredTlds = EXTENSIONS_CATALOG.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.tld.toLowerCase().includes(directoryFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const domainFaqs = [
    {
      q: 'Why do I need a custom domain name for my business?',
      a: 'A custom domain (like yourbrand.com) gives your brand immediate credibility, professional authority, and memorability. It allows you to create matching email addresses (e.g. hello@yourbrand.com) and gives you full ownership over your brand identity online.',
    },
    {
      q: 'Is WHOIS Privacy really 100% free with Hostxeon?',
      a: 'Yes, always. Unlike other registrars who charge £9.99/year extra, Hostxeon includes Lifetime WHOIS Privacy Shield completely free with every eligible domain registration. Your personal phone number, physical address, and personal email are shielded from public databases.',
    },
    {
      q: 'What happens immediately after I register my domain?',
      a: 'Your domain is activated instantly in global DNS. You can immediately connect it to our NVMe Web Hosting, set up professional email inboxes, configure URL forwarders, or manage custom DNS records directly inside your control panel.',
    },
    {
      q: 'Can I transfer my existing domain to Hostxeon?',
      a: 'Yes! Our automated domain transfer service takes only a few minutes to initiate, guarantees 0 website downtime, and includes a full 1-year registration renewal extension on all supported TLDs.',
    },
    {
      q: 'Do you charge hidden renewal fee hikes?',
      a: 'Never. Hostxeon operates with complete pricing transparency. Our annual renewal prices are published openly upfront in our pricing directory so you never face surprise spikes.',
    },
    {
      q: 'What is Anycast DNS and why does it matter?',
      a: 'Anycast DNS routes domain lookup queries to the geographically closest server across our global edge network, ensuring ultra-fast resolution times under 15ms worldwide with 100% SLA uptime.',
    },
  ];

  return (
    <div className="bg-[#fcfdfd] text-[#111827]">
      {/* 1. Signature Hero Search Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#021812] via-[#04281e] to-[#031d16] text-white pt-12 sm:pt-16 pb-20 sm:pb-24 border-b border-emerald-900/50">
        
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#008a45]/20 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#008a45_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 text-center">
          
          {/* Trust Badge Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-6 shadow-xs backdrop-blur-md">
            <Globe className="w-3.5 h-3.5 text-[#fed000]" />
            <span>ICANN Accredited Registrar • Free Lifetime Privacy Shield</span>
            <span className="bg-[#fed000] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">FROM £0.99/YR</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            Find the Perfect <span className="text-[#fed000]">Domain Name</span> for Your Brand
          </h1>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/85 max-w-2xl mx-auto font-medium leading-relaxed">
            Search hundreds of global & country extensions with instant DNS propagation, free lifetime WHOIS privacy, and zero hidden price hikes.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 mt-8 mb-4 shadow-lg">
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-white text-slate-950 shadow-md cursor-default flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-[#008a45]" />
              <span>Register New Domain</span>
            </button>
            <button
              type="button"
              onClick={onSwitchToTransfer}
              className="px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm text-emerald-100 hover:text-white transition-all cursor-pointer flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Transfer Existing Domain</span>
            </button>
          </div>

          {/* Main Hero Search Bar (Modern, Ultra-Sleek) */}
          <div className="max-w-4xl mx-auto mt-2">
            <form 
              onSubmit={handleFormSubmit} 
              className="relative flex items-center shadow-2xl rounded-2xl sm:rounded-3xl bg-white p-1.5 sm:p-2 border-2 border-emerald-900/40 focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/20 transition-all group"
            >
              <div className="pl-3 sm:pl-4 pr-2 text-gray-400 group-focus-within:text-[#008a45] transition-colors shrink-0">
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <input
                id="domain-landing-search-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Type the domain you want (e.g. mybrand.com or store.co.uk)"
                className="w-full py-3.5 sm:py-4 px-2 text-base sm:text-lg text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-hidden font-semibold"
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-[#fed000] hover:bg-[#ebbe00] active:scale-[0.98] text-slate-950 px-6 sm:px-9 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-2 hover:shadow-lg"
                id="domain-landing-search-button"
              >
                <span>Search Domain</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>

            {/* Trending Quick-Select TLD Chips */}
            <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mt-5 text-xs font-semibold text-emerald-100">
              <span className="text-emerald-300 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#fed000]" /> Trending:
              </span>
              {[
                { ext: '.com', price: '£6.99' },
                { ext: '.co.uk', price: '£0.99' },
                { ext: '.one', price: '£1.49' },
                { ext: '.ai', price: '£29.99' },
                { ext: '.store', price: '£1.99' },
                { ext: '.online', price: '£1.49' },
                { ext: '.io', price: '£19.99' },
              ].map(chip => (
                <button
                  key={chip.ext}
                  type="button"
                  onClick={() => handleChipClick(chip.ext)}
                  className="bg-white/10 hover:bg-white/20 active:scale-95 px-3.5 py-1.5 rounded-xl border border-white/15 transition-all text-white flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span className="font-extrabold">{chip.ext}</span>
                  <span className="text-[#fed000] font-black">{chip.price}</span>
                </button>
              ))}
            </div>

            {/* Trust Highlights Strip */}
            <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8 mt-8 text-xs font-bold text-emerald-100/90 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#fed000]" />
                <span>Free Lifetime WHOIS Privacy</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#fed000]" />
                <span>Anycast Global DNS (100% SLA)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#fed000]" />
                <span>DNSSEC Cryptographic Shield</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#fed000]" />
                <span>Transparent Renewal Rates</span>
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Popular TLD Highlights Grid (Elevated Bento) */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-10 relative z-20 mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {EXTENSIONS_CATALOG.slice(0, 6).map((item) => (
            <div
              key={item.tld}
              onClick={() => handleChipClick(item.tld)}
              className="bg-white rounded-2xl p-5 shadow-xl border border-gray-200/80 hover:border-[#008a45] hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#008a45] transition-colors">
                    {item.tld}
                  </span>
                  {item.badge && (
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-[#008a45]">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-1 line-through font-semibold">
                  £{item.regularPrice.toFixed(2)}/yr
                </div>
                <div className="text-xl font-black text-slate-950 mt-0.5">
                  £{item.price.toFixed(2)}
                  <span className="text-xs text-gray-500 font-normal"> /1st yr</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#008a45] font-black">
                <span>Check availability</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Comprehensive TLD Pricing & Directory */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10" id="domain-directory">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-[#008a45] bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            TRANSPARENT DIRECTORY
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Explore All Domain Extensions & Transparent Rates
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
            No surprise price jumps. All first-year promos, annual renewals, and transfer fees are published openly.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            {(['All', 'Popular', 'Tech', 'Business', 'Deals'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#008a45] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={directoryFilter}
              onChange={(e) => setDirectoryFilter(e.target.value)}
              placeholder="Search extension (e.g. .com, .ai, .store)..."
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 rounded-xl text-xs sm:text-sm border border-gray-200 focus:outline-hidden focus:border-[#008a45] font-semibold"
            />
          </div>
        </div>

        {/* Directory Table */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-gray-700 font-black border-b border-gray-200 text-xs">
                <tr>
                  <th className="p-4 sm:p-5">Extension</th>
                  <th className="p-4 sm:p-5">Category</th>
                  <th className="p-4 sm:p-5">1st Year Price</th>
                  <th className="p-4 sm:p-5">Annual Renewal</th>
                  <th className="p-4 sm:p-5">Transfer Price</th>
                  <th className="p-4 sm:p-5">WHOIS Privacy</th>
                  <th className="p-4 sm:p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTlds.map((item) => (
                  <tr key={item.tld} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="p-4 sm:p-5">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-base">{item.tld}</span>
                        {item.badge && (
                          <span className="bg-emerald-100 text-[#008a45] text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-gray-600 font-semibold">
                      {item.category}
                    </td>
                    <td className="p-4 sm:p-5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-black text-slate-900 text-base">£{item.price.toFixed(2)}</span>
                        <span className="text-gray-400 line-through text-xs font-medium">£{item.regularPrice.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-gray-600 font-semibold">
                      £{item.regularPrice.toFixed(2)}/yr
                    </td>
                    <td className="p-4 sm:p-5 text-gray-600 font-semibold">
                      £{item.transferPrice.toFixed(2)}
                    </td>
                    <td className="p-4 sm:p-5">
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full text-xs font-bold">
                        <Check className="w-3.5 h-3.5" /> Free Forever
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          handleChipClick(item.tld);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="px-4 py-2 rounded-xl bg-[#fed000] hover:bg-[#ebbe00] active:scale-95 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                      >
                        <span>Select</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Hostxeon Feature Bento Grid */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-gray-200/80">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-[#008a45] bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              VALUE GUARANTEED
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
              Included 100% Free with Every Domain
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
              Everything you need to launch, secure, and protect your domain name without sneaky upsells.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-2xs space-y-3 hover:border-emerald-500/50 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-[#008a45] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 text-base">Free Lifetime WHOIS Privacy</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                We hide your personal phone number, home address, and personal email from public ICANN registry records to eliminate spam and identity theft.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-2xs space-y-3 hover:border-emerald-500/50 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-[#008a45] flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 text-base">Anycast Global Cloud DNS</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                Ultra-fast worldwide DNS resolution routed through our global edge points of presence with 100% SLA uptime and DDoS protection.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-2xs space-y-3 hover:border-emerald-500/50 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-[#008a45] flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 text-base">DNSSEC & Anti-Theft Lock</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                Cryptographic DNSSEC signatures protect your visitors from DNS spoofing, while registrar locks stop unauthorized domain transfers.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-2xs space-y-3 hover:border-emerald-500/50 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-[#008a45] flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 text-base">Free URL & Email Forwarding</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                Easily redirect your domain name to an existing site or forward inbound emails to your personal inbox with zero server config.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-2xs space-y-3 hover:border-emerald-500/50 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-[#008a45] flex items-center justify-center">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 text-base">Advanced DNS Zone Editor</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                Full visual management of A, AAAA, CNAME, MX, TXT, and SRV records with instant propagation directly inside your control panel.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-2xs space-y-3 hover:border-emerald-500/50 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-[#008a45] flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 text-base">24/7 ICANN Certified Support</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                Our certified domain engineering specialists are available 24/7/365 via live chat to help you with DNS setup and domain questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 3-Step Guide */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-[#008a45]">QUICK ONBOARDING</span>
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 mt-1">
              How to Register a Domain in 3 Easy Steps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#008a45] text-white flex items-center justify-center font-black text-base shadow-xs">
                1
              </div>
              <h4 className="font-black text-slate-900 text-base sm:text-lg">Search Your Domain</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                Enter your desired brand or project name in our search box above to check real-time registry availability across 100+ TLDs.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#008a45] text-white flex items-center justify-center font-black text-base shadow-xs">
                2
              </div>
              <h4 className="font-black text-slate-900 text-base sm:text-lg">Choose Extensions & Add-ons</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                Select your primary extension and protect your brand with key secondary extensions. Free WHOIS privacy is auto-enabled.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#008a45] text-white flex items-center justify-center font-black text-base shadow-xs">
                3
              </div>
              <h4 className="font-black text-slate-900 text-base sm:text-lg">Checkout & Instant Launch</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                Complete checkout securely. Your domain goes live immediately on Anycast DNS ready for web hosting, WordPress, or custom email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Domain Transfer Banner */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pb-16">
        <div className="bg-gradient-to-r from-[#031d16] via-[#052e22] to-[#031d16] text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-[#fed000] tracking-wider">
              ALREADY OWN A DOMAIN?
            </span>
            <h3 className="text-xl sm:text-3xl font-black">
              Transfer Your Domain to Hostxeon with 0 Downtime
            </h3>
            <p className="text-xs sm:text-base text-emerald-100/80 max-w-xl">
              Consolidate your domains, save on renewals, and get a full 1-year registration extension plus free lifetime WHOIS privacy.
            </p>
          </div>
          <button
            type="button"
            onClick={onSwitchToTransfer}
            className="px-7 py-3.5 rounded-xl bg-[#fed000] hover:bg-[#ebbe00] active:scale-95 text-slate-950 font-black text-sm transition-all cursor-pointer shrink-0 shadow-md flex items-center gap-2 hover:shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Transfer Domain Now</span>
          </button>
        </div>
      </section>

      {/* 7. Domain FAQ Accordion */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-[#008a45] bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            GOT QUESTIONS?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Frequently Asked Questions About Domains
          </h2>
        </div>

        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {domainFaqs.map((faq, idx) => (
            <div key={idx} className="py-5">
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 text-left font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#008a45] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180 text-[#008a45]' : 'text-gray-400'}`} />
              </button>
              {activeFaq === idx && (
                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Live Chat Migration Strip */}
        <div className="mt-10 p-5 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-emerald-950">
          <div className="flex items-center gap-3">
            <Headphones className="w-5 h-5 text-[#008a45] shrink-0" />
            <span className="font-bold">Need advice on choosing the best domain name or extension for your business?</span>
          </div>
          <button
            type="button"
            onClick={onOpenLiveChat}
            className="bg-[#008a45] hover:bg-[#007338] text-white font-black px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
          >
            Chat with Domain Expert
          </button>
        </div>
      </section>
    </div>
  );
};
