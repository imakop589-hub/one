import React, { useState } from 'react';
import { 
  Search, 
  Check, 
  Plus, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Lock, 
  Globe, 
  RefreshCw, 
  Sparkles, 
  ShoppingBag, 
  X,
  Headphones,
  CheckCircle2,
  ExternalLink,
  Info,
  Layers,
  AlertTriangle,
  Flame
} from 'lucide-react';
import { EXTENSIONS_CATALOG, TldSearchItem } from './types';
import { CartItem } from '../../types';

interface DomainResultsViewProps {
  searchedQuery: string;
  isSearching: boolean;
  exactAvailable: boolean | null;
  onSearchAgain: (query: string) => void;
  onBackToLanding: () => void;
  onAddToCart: (item: CartItem) => void;
  onOpenCart?: () => void;
  onOpenLiveChat: () => void;
  onSwitchToTransferWithDomain: (domain: string) => void;
}

export const DomainResultsView: React.FC<DomainResultsViewProps> = ({
  searchedQuery,
  isSearching,
  exactAvailable,
  onSearchAgain,
  onBackToLanding,
  onAddToCart,
  onOpenCart,
  onOpenLiveChat,
  onSwitchToTransferWithDomain,
}) => {
  const [inputQuery, setInputQuery] = useState(searchedQuery);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Popular' | 'Tech' | 'Business' | 'Deals'>('All');
  const [addedDomains, setAddedDomains] = useState<Record<string, boolean>>({});
  const [isBundleAdded, setIsBundleAdded] = useState(false);

  // Clean the searched query
  const cleanInput = (searchedQuery || '').trim().toLowerCase().replace(/https?:\/\//, '').replace(/\/.*$/, '');
  const baseName = cleanInput.includes('.') ? cleanInput.split('.')[0] : cleanInput;
  const specifiedExt = cleanInput.includes('.') ? cleanInput.substring(cleanInput.indexOf('.')) : '.com';
  const cleanBase = baseName || 'yourbrand';
  const exactDomainFullName = `${cleanBase}${specifiedExt}`;

  // Find price info for the exact extension searched
  const exactTldData = EXTENSIONS_CATALOG.find(t => t.tld === specifiedExt) || {
    tld: specifiedExt,
    price: 6.99,
    regularPrice: 15.99,
    transferPrice: 8.49,
    discountPct: 56,
    category: 'Popular' as const,
  };

  // Alternative suggestions
  const alternatives = EXTENSIONS_CATALOG
    .filter(t => t.tld !== specifiedExt)
    .filter(t => selectedCategory === 'All' ? true : t.category === selectedCategory);

  // Brand protection package extensions
  const bundleItems = exactAvailable === false
    ? ['.co.uk', '.store', '.online', '.net'].filter(ext => ext !== specifiedExt).slice(0, 3)
    : ['.com', '.co.uk', '.store'].filter(ext => ext !== specifiedExt).slice(0, 2);

  const bundleFullNames = exactAvailable === false
    ? bundleItems.map(ext => `${cleanBase}${ext}`)
    : [exactDomainFullName, ...bundleItems.map(ext => `${cleanBase}${ext}`)];

  const bundleTotalPrice = bundleFullNames.reduce((acc, name) => {
    const ext = name.substring(name.lastIndexOf('.'));
    const tld = EXTENSIONS_CATALOG.find(t => t.tld === ext);
    return acc + (tld ? tld.price : 6.99);
  }, 0);
  const discountedBundlePrice = bundleTotalPrice * 0.85;

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    onSearchAgain(inputQuery.trim());
  };

  const handleAddDomain = (domain: string, price: number, regularPrice: number) => {
    onAddToCart({
      id: `domain-${domain}`,
      type: 'domain',
      title: domain,
      subtitle: 'Domain Registration • Includes Free Lifetime WHOIS Privacy Shield',
      price: price,
      period: '1 year',
      badge: 'ICANN Accredited',
    });
    setAddedDomains(prev => ({ ...prev, [domain]: true }));
  };

  const handleAddTransfer = (domain: string, price: number) => {
    onAddToCart({
      id: `transfer-${domain}`,
      type: 'domain',
      title: `Transfer: ${domain}`,
      subtitle: 'Domain Transfer with 1-Yr Extension • Zero Downtime • Free Privacy Shield',
      price: price,
      period: '1 year extension',
      badge: 'Zero Downtime Transfer',
    });
    setAddedDomains(prev => ({ ...prev, [`transfer-${domain}`]: true }));
  };

  const handleAddBundle = () => {
    bundleFullNames.forEach((domain) => {
      const ext = domain.substring(domain.lastIndexOf('.'));
      const tld = EXTENSIONS_CATALOG.find(t => t.tld === ext);
      const price = tld ? tld.price * 0.85 : 5.99;

      onAddToCart({
        id: `domain-${domain}`,
        type: 'domain',
        title: domain,
        subtitle: 'Brand Protection Bundle • 15% Off Special Rate • Free Privacy Shield',
        price: Number(price.toFixed(2)),
        period: '1 year',
        badge: 'Brand Protection',
      });
      setAddedDomains(prev => ({ ...prev, [domain]: true }));
    });
    setIsBundleAdded(true);
  };

  const totalAddedCount = Object.values(addedDomains).filter(Boolean).length;

  return (
    <div className="bg-[#fcfdfd] text-[#111827] min-h-screen pb-24">
      {/* 1. Header Search Bar & Navigation Banner */}
      <section className="bg-gradient-to-b from-[#021812] via-[#04281e] to-[#031d16] text-white pt-8 pb-12 border-b border-emerald-900/50 shadow-md">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-4">
          
          {/* Breadcrumbs & Back Button */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={onBackToLanding}
              className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white font-bold bg-white/10 hover:bg-white/20 active:scale-95 px-3.5 py-1.5 rounded-xl border border-white/10 transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to Domain Overview</span>
            </button>

            <div className="flex items-center gap-2 text-emerald-200/80 font-semibold text-xs">
              <span>Domains</span>
              <span>/</span>
              <span className="text-white font-extrabold truncate max-w-xs">Results for "{searchedQuery}"</span>
            </div>
          </div>

          {/* Refine Search Bar */}
          <div className="max-w-4xl pt-2">
            <form onSubmit={handleRefineSubmit} className="relative flex items-center shadow-2xl rounded-2xl sm:rounded-3xl bg-white p-1.5 sm:p-2 border border-emerald-900/40 focus-within:ring-4 focus-within:ring-emerald-500/20 transition-all">
              <div className="pl-3 sm:pl-4 pr-2 text-gray-400 shrink-0">
                <Search className="w-5 h-5 text-[#008a45]" />
              </div>
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Search another domain (e.g. brand.com or store.co.uk)..."
                className="w-full py-3 sm:py-3.5 px-2 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-hidden font-semibold"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="bg-[#fed000] hover:bg-[#ebbe00] active:scale-95 text-slate-950 px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-2"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Checking DNS...</span>
                  </>
                ) : (
                  <>
                    <span>Search Again</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Verification Status Banner */}
          <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold pt-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Connected to ICANN Registry & Global Anycast DNS for real-time live availability</span>
          </div>

        </div>
      </section>

      {/* 2. Main Search Results Container */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-6 relative z-20 space-y-8">
        
        {/* ========================================================================= */}
        {/* EXACT MATCH HERO CARD                                                     */}
        {/* ========================================================================= */}
        <div className={`bg-white rounded-3xl shadow-xl p-6 sm:p-8 relative overflow-hidden transition-all ${
          isSearching 
            ? 'border-2 border-emerald-300 animate-pulse' 
            : exactAvailable 
            ? 'border-2 border-emerald-500 ring-4 ring-emerald-500/10' 
            : 'border-2 border-amber-400 bg-amber-50/15'
        }`}>
          {/* Header Status Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              {isSearching ? (
                <span className="bg-slate-800 text-white text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>VERIFYING REGISTRY STATUS...</span>
                </span>
              ) : exactAvailable ? (
                <span className="bg-[#008a45] text-white text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>EXACT MATCH AVAILABLE!</span>
                </span>
              ) : (
                <span className="bg-amber-600 text-white text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5 stroke-[3]" />
                  <span>ALREADY REGISTERED / TAKEN</span>
                </span>
              )}

              <span className="text-xs text-gray-500 font-semibold hidden sm:inline">
                {isSearching ? 'Querying global DNS SOA records...' : exactAvailable ? 'Ready for immediate registration & instant DNS launch' : 'Active registration detected in global ICANN registry'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/70">
              <Lock className="w-3.5 h-3.5 text-[#008a45]" />
              <span>Free Lifetime WHOIS Privacy Shield Included</span>
            </div>
          </div>

          {/* Main Card Content */}
          <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="text-2xl sm:text-4xl font-black text-slate-950 flex flex-wrap items-baseline gap-3">
                <span className="break-all">{exactDomainFullName}</span>
                {exactAvailable ? (
                  <span className="text-xs font-black text-[#008a45] bg-emerald-100 px-3 py-1 rounded-full">
                    {exactTldData.discountPct}% OFF FIRST YEAR
                  </span>
                ) : (
                  <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Unavailable for New Registration</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                {isSearching ? (
                  'Checking live global DNS records to confirm real-time availability for this domain name...'
                ) : exactAvailable ? (
                  `Great choice! ${exactDomainFullName} is available to register right now. Secure it today to build your website, set up professional email (hello@${exactDomainFullName}), and lock down your digital identity.`
                ) : (
                  `The domain ${exactDomainFullName} is currently registered by an active owner. If you are the owner, you can transfer it to Hostxeon with 0 downtime and receive a 1-year registration extension. Otherwise, choose one of the available extensions below.`
                )}
              </p>

              {/* Perks Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-gray-700 pt-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#008a45] shrink-0 stroke-[2.5]" />
                  <span>Free Lifetime WHOIS Privacy (Save £9.99/yr)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#008a45] shrink-0 stroke-[2.5]" />
                  <span>Anycast Global DNS with DDoS Defense</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#008a45] shrink-0 stroke-[2.5]" />
                  <span>DNSSEC Cryptographic Theft Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#008a45] shrink-0 stroke-[2.5]" />
                  <span>1-Click Email & Website DNS Setup</span>
                </div>
              </div>
            </div>

            {/* Actions & Pricing Area */}
            <div className="flex flex-col sm:items-end justify-center bg-slate-50/90 p-5 sm:p-6 rounded-2xl border border-gray-200/80 shrink-0 min-w-[280px]">
              {exactAvailable ? (
                <>
                  <div className="sm:text-right mb-4">
                    <div className="flex items-baseline gap-2 sm:justify-end">
                      <span className="text-xs text-gray-400 line-through">£{exactTldData.regularPrice.toFixed(2)}</span>
                      <span className="text-3xl sm:text-4xl font-black text-slate-950">£{exactTldData.price.toFixed(2)}</span>
                      <span className="text-xs text-gray-500 font-bold">/ 1st yr</span>
                    </div>
                    <span className="text-[11px] text-gray-400 block mt-0.5">
                      Renews at transparent £{exactTldData.regularPrice.toFixed(2)}/yr • Cancel anytime
                    </span>
                  </div>

                  <div className="w-full space-y-2">
                    <button
                      type="button"
                      onClick={() => handleAddDomain(exactDomainFullName, exactTldData.price, exactTldData.regularPrice)}
                      className={`w-full py-3.5 px-6 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95 ${
                        addedDomains[exactDomainFullName]
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#008a45] hover:bg-[#007338] text-white hover:shadow-lg'
                      }`}
                    >
                      {addedDomains[exactDomainFullName] ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Added to Basket!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 stroke-[3]" />
                          <span>Add to Basket</span>
                        </>
                      )}
                    </button>

                    {addedDomains[exactDomainFullName] && (
                      <button
                        type="button"
                        onClick={onOpenCart}
                        className="w-full py-2 text-center text-xs font-bold text-[#008a45] hover:underline cursor-pointer flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>View in Basket & Checkout</span>
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="sm:text-right mb-4">
                    <div className="flex items-center gap-1.5 sm:justify-end text-xs text-amber-700 font-bold mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Registered Domain • Eligible for Transfer</span>
                    </div>
                    <div className="flex items-baseline gap-2 sm:justify-end">
                      <span className="text-3xl sm:text-4xl font-black text-slate-950">£{exactTldData.transferPrice.toFixed(2)}</span>
                      <span className="text-xs text-gray-500 font-bold">/ transfer</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
                      ✓ Includes +1 Year Extension • 0 Downtime • Free Privacy
                    </span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      Standard renewal £{exactTldData.regularPrice.toFixed(2)}/yr
                    </span>
                  </div>

                  <div className="w-full space-y-2">
                    <button
                      type="button"
                      onClick={() => handleAddTransfer(exactDomainFullName, exactTldData.transferPrice)}
                      className={`w-full py-3.5 px-5 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95 ${
                        addedDomains[`transfer-${exactDomainFullName}`]
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#fed000] hover:bg-[#ebbe00] text-slate-950 hover:shadow-lg'
                      }`}
                    >
                      {addedDomains[`transfer-${exactDomainFullName}`] ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Transfer Added to Basket!</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4" />
                          <span>Add Transfer to Basket (£{exactTldData.transferPrice.toFixed(2)})</span>
                        </>
                      )}
                    </button>

                    {addedDomains[`transfer-${exactDomainFullName}`] && (
                      <button
                        type="button"
                        onClick={onOpenCart}
                        className="w-full py-1.5 text-center text-xs font-bold text-[#008a45] hover:underline cursor-pointer flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>View in Basket & Checkout</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onSwitchToTransferWithDomain(exactDomainFullName)}
                      className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Transfer Wizard (Enter EPP Code)</span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenLiveChat}
                      className="w-full py-2 px-3 text-center text-xs font-semibold text-gray-500 hover:text-gray-800 transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Headphones className="w-3.5 h-3.5 text-[#008a45]" />
                      <span>Want to acquire from owner? Ask Support</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BRAND PROTECTION BUNDLE RECOMMENDATION                                    */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-[#031d16] via-[#052e22] to-[#031d16] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 border border-emerald-900/50">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#fed000] tracking-wider">
              <Sparkles className="w-4 h-4 text-[#fed000]" />
              <span>{exactAvailable === false ? 'RECOMMENDED BRAND DEFENSE PACKAGE' : 'RECOMMENDED BRAND PROTECTION PACKAGE'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              {exactAvailable === false 
                ? `Secure Available Alternate Extensions for "${cleanBase}"`
                : `Protect "${cleanBase}" Across Top Extensions`
              }
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              {exactAvailable === false
                ? `Because ${exactDomainFullName} is already registered, secure these alternate extensions to stop copycats and lock down your digital identity across key namespaces.`
                : `Stop competitors and copycats from acquiring your brand name. Bundle your primary domain with key top-level extensions and save an extra 15%.`
              }
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {bundleFullNames.map((fullName) => (
                <span key={fullName} className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold border border-white/15">
                  {fullName}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:items-end shrink-0 bg-white/5 p-5 rounded-2xl border border-white/10 w-full lg:w-auto">
            <div className="text-right mb-3">
              <div className="text-xs text-gray-300 line-through">£{bundleTotalPrice.toFixed(2)}</div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                £{discountedBundlePrice.toFixed(2)}
                <span className="text-xs text-emerald-300 font-normal"> /1st yr</span>
              </div>
              <span className="text-[10px] text-emerald-300 font-bold block mt-0.5">
                Includes {bundleFullNames.length} domains + Free Lifetime WHOIS Privacy
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddBundle}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95 ${
                isBundleAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#fed000] hover:bg-[#ebbe00] text-slate-950'
              }`}
            >
              {isBundleAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Bundle Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>{exactAvailable === false ? 'Add Alternate Brand Defense Bundle' : 'Add Brand Protection Bundle'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RECOMMENDED ALTERNATIVES LIST                                              */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Recommended Alternative Extensions for "{cleanBase}"
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-medium">
                Popular, industry-specific, and budget extensions available for registration right now
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(['All', 'Popular', 'Tech', 'Business', 'Deals'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#008a45] text-white shadow-xs'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Alternatives Table/Grid */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
            {alternatives.map((item) => {
              const fullAltName = `${cleanBase}${item.tld}`;
              const isAdded = addedDomains[fullAltName];

              return (
                <div
                  key={item.tld}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-emerald-50/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center font-black text-[#008a45] text-xs shrink-0">
                      {item.tld}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-base sm:text-lg">{fullAltName}</span>
                        <span className="bg-emerald-100 text-[#008a45] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                          Available
                        </span>
                        {item.badge && (
                          <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full hidden sm:inline">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2 font-medium">
                        <span>{item.category} Extension</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold">Free Lifetime Privacy Included</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5">
                    <div className="sm:text-right">
                      <div className="flex items-baseline gap-1.5 sm:justify-end">
                        <span className="text-xs text-gray-400 line-through">£{item.regularPrice.toFixed(2)}</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-950">£{item.price.toFixed(2)}</span>
                        <span className="text-xs text-gray-500 font-medium">/1st yr</span>
                      </div>
                      <span className="text-[10px] text-gray-400 block">
                        Renews at £{item.regularPrice.toFixed(2)}/yr
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddDomain(fullAltName, item.price, item.regularPrice)}
                      className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#fed000] hover:bg-[#ebbe00] text-slate-950'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Add to Basket</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NEED ASSISTANCE HELPER CARD                                               */}
        {/* ========================================================================= */}
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-emerald-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#008a45] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold block text-slate-900">Need help choosing or registering a domain?</span>
              <span className="text-gray-600">Our certified domain support specialists are online 24/7/365 to assist you.</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenLiveChat}
            className="px-5 py-2.5 rounded-xl bg-[#008a45] hover:bg-[#007338] text-white font-black transition-all shadow-xs cursor-pointer shrink-0"
          >
            Chat with Domain Expert
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* FLOATING QUICK BASKET NOTIFIER                                            */}
      {/* ========================================================================= */}
      {totalAddedCount > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">{totalAddedCount} domain(s) in basket</span>
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            className="px-4 py-2 rounded-xl bg-[#fed000] hover:bg-[#ebbe00] text-slate-950 font-black text-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>View Basket & Checkout</span>
          </button>
        </div>
      )}
    </div>
  );
};
