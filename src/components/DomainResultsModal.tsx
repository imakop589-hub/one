import React, { useState } from 'react';
import { X, Search, Check, Globe, ShoppingBag, ShieldCheck, Sparkles, ArrowRight, Lock, Plus } from 'lucide-react';
import { DOMAIN_PRICES } from '../data/siteData';

interface DomainResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onAddToCart: (item: any) => void;
  onNavigateToDomains?: (query: string) => void;
}

export const DomainResultsModal: React.FC<DomainResultsModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onAddToCart,
  onNavigateToDomains,
}) => {
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const rawBase = searchQuery.includes('.') ? searchQuery.split('.')[0] : searchQuery || 'yourbrand';
  const cleanBase = rawBase.trim().toLowerCase().replace(/https?:\/\//, '').replace(/\/.*$/, '');
  const primaryDomain = `${cleanBase}.com`;

  const handleAddDomain = (domain: string, priceNum: number) => {
    onAddToCart({
      id: `domain-${domain}`,
      type: 'domain',
      title: domain,
      subtitle: 'Domain Registration • Includes Free Lifetime WHOIS Privacy Shield',
      price: priceNum,
      period: '1 year',
      badge: 'ICANN Accredited',
    });
    setAddedMap(prev => ({ ...prev, [domain]: true }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        
        {/* Header - Hostxeon Forest Green Theme */}
        <div className="bg-gradient-to-r from-[#031913] via-[#05271d] to-[#041d16] text-white p-6 flex items-center justify-between border-b border-emerald-900/50">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-black uppercase tracking-wider mb-1">
              <Globe className="w-3.5 h-3.5 text-[#fed000]" />
              <span>HOSTXEON INSTANT DOMAIN AVAILABILITY</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Results for: <span className="text-[#fed000]">{cleanBase}</span>
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            id="close-domain-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-[#fafdfb]">
          
          {/* EXACT MATCH SPOTLIGHT (Hostxeon Signature Top Card) */}
          <div className="bg-white rounded-2xl p-5 border-2 border-[#008a45] shadow-md space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="bg-[#008a45] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>EXACT MATCH AVAILABLE</span>
                </span>
                <span className="text-xs text-gray-500 font-medium">Ready for instant activation</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#008a45]" />
                <span>Free Privacy Shield</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950">
                  {primaryDomain}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                  <span>Includes Anycast DNS</span>
                  <span>•</span>
                  <span>DNSSEC Protection</span>
                  <span>•</span>
                  <span>15-Day Money-Back</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="sm:text-right">
                  <div className="flex items-baseline gap-1.5 sm:justify-end">
                    <span className="text-xs text-gray-400 line-through">£15.99</span>
                    <span className="text-2xl font-black text-[#008a45]">£6.99</span>
                    <span className="text-xs text-gray-500">/ 1st yr</span>
                  </div>
                  <span className="text-[10px] text-gray-400 block">Renews at £15.99/yr</span>
                </div>

                <button
                  onClick={() => handleAddDomain(primaryDomain, 6.99)}
                  className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all shadow-sm cursor-pointer flex items-center gap-1.5 ${
                    addedMap[primaryDomain]
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#fed000] hover:bg-[#ebbe00] text-slate-950'
                  }`}
                >
                  {addedMap[primaryDomain] ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Basket</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Alternate Extensions List (Hostxeon style) */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-xs font-black uppercase tracking-wider text-gray-500">
                RECOMMENDED ALTERNATIVES
              </span>
              <span className="text-xs text-[#008a45] font-bold">
                Special Introductory Rates
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {DOMAIN_PRICES.map((dp) => {
                const fullDomain = `${cleanBase}${dp.extension}`;
                const priceVal = parseFloat(dp.price.replace('£', ''));
                const isAdded = addedMap[fullDomain] || false;

                return (
                  <div
                    key={dp.extension}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/80 px-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#008a45] font-black text-xs shrink-0">
                        {dp.extension}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-slate-900 text-sm">{fullDomain}</span>
                          {dp.badge && (
                            <span className="bg-[#e6f4ea] text-[#008a45] text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {dp.badge}
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-[#008a45]">✓ Available</span>
                        </div>
                        <span className="text-[11px] text-gray-400">
                          Renews at {dp.regularPrice}/year • Free WHOIS Privacy
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 pt-1 sm:pt-0">
                      <div className="text-right">
                        <div className="flex items-baseline gap-1 justify-end">
                          <span className="text-base font-black text-slate-900">{dp.price}</span>
                          <span className="text-[11px] text-gray-500">/ 1st yr</span>
                        </div>
                        <div className="text-[10px] text-gray-400 line-through">
                          Renews {dp.regularPrice}
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddDomain(fullDomain, priceVal)}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                          isAdded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-emerald-50 hover:bg-[#008a45] text-[#008a45] hover:text-white border border-emerald-200'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer with Link to Full Hostxeon Page */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#008a45]" />
            <span>Nominet & ICANN Certified • 20% VAT Included • Zero Hidden ICANN Fees</span>
          </div>

          {onNavigateToDomains && (
            <button
              onClick={() => {
                onNavigateToDomains(cleanBase);
                onClose();
              }}
              className="text-[#008a45] font-black hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Explore all 350+ Extensions on Dedicated Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
