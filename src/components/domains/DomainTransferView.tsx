import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Globe, 
  Info, 
  CheckCircle2, 
  ShoppingBag, 
  Headphones, 
  ExternalLink,
  ChevronDown,
  Server,
  Zap
} from 'lucide-react';
import { EXTENSIONS_CATALOG, checkLiveDnsAvailability } from './types';
import { CartItem } from '../../types';

interface DomainTransferViewProps {
  initialDomain?: string;
  onAddToCart: (item: CartItem) => void;
  onOpenCart?: () => void;
  onSwitchToRegister: () => void;
  onOpenLiveChat: () => void;
  onGoToHosting?: () => void;
}

export const DomainTransferView: React.FC<DomainTransferViewProps> = ({
  initialDomain = '',
  onAddToCart,
  onOpenCart,
  onSwitchToRegister,
  onOpenLiveChat,
  onGoToHosting,
}) => {
  const [transferQuery, setTransferQuery] = useState(initialDomain);
  const [eppCode, setEppCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkedDomain, setCheckedDomain] = useState<string | null>(initialDomain || null);
  const [isTransferAdded, setIsTransferAdded] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeGuideTab, setActiveGuideTab] = useState<'godaddy' | 'namecheap' | 'google' | 'bluehost'>('godaddy');

  // Helper to extract extension & lookup dynamic transfer price
  const getDomainTldDetails = (domain: string) => {
    const clean = domain.trim().toLowerCase();
    const ext = clean.includes('.') ? clean.substring(clean.lastIndexOf('.')) : '.com';
    const found = EXTENSIONS_CATALOG.find(t => t.tld === ext);
    return {
      tld: ext,
      transferPrice: found ? found.transferPrice : 8.49,
      regularPrice: found ? found.regularPrice : 15.99,
      badge: found?.badge,
    };
  };

  // Synchronize when initialDomain prop updates (e.g. from Results view)
  useEffect(() => {
    if (initialDomain && initialDomain.trim()) {
      const cleaned = initialDomain.trim().toLowerCase().replace(/https?:\/\//, '').replace(/\/.*$/, '');
      setTransferQuery(cleaned);
      setCheckedDomain(cleaned);
      setIsTransferAdded(false);
    }
  }, [initialDomain]);

  const handleTransferCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferQuery.trim()) return;

    const cleaned = transferQuery.trim().toLowerCase().replace(/https?:\/\//, '').replace(/\/.*$/, '');
    const domainWithExt = cleaned.includes('.') ? cleaned : `${cleaned}.com`;
    setIsChecking(true);
    setCheckedDomain(domainWithExt);
    setIsTransferAdded(false);

    // Short simulated verification check
    setTimeout(() => {
      setIsChecking(false);
    }, 500);
  };

  const currentDetails = checkedDomain 
    ? getDomainTldDetails(checkedDomain)
    : { tld: '.com', transferPrice: 8.49, regularPrice: 15.99, badge: undefined };

  const handleAddTransferToCart = () => {
    if (!checkedDomain) return;
    const { transferPrice } = getDomainTldDetails(checkedDomain);
    onAddToCart({
      id: `transfer-${checkedDomain}`,
      type: 'domain',
      title: `Transfer: ${checkedDomain}`,
      subtitle: `Domain Transfer with 1-Yr Extension • EPP: ${eppCode ? 'Provided (' + eppCode + ')' : 'Will provide later'}`,
      price: transferPrice,
      period: '1 year extension',
      badge: 'Zero Downtime Transfer',
    });
    setIsTransferAdded(true);
  };

  return (
    <div className="bg-[#fcfdfd] text-[#111827]">
      {/* 1. Transfer Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#031913] via-[#05271d] to-[#041d16] text-white pt-14 pb-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-6">
            <RefreshCw className="w-3.5 h-3.5 text-[#fed000]" />
            <span>Zero Downtime Migration • 1 Additional Year Renewal Included</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Transfer Your Existing Domain to <span className="text-[#fed000]">Hostxeon</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto font-medium">
            Save on high annual renewals, get free lifetime WHOIS privacy, and manage everything in one unified dashboard.
          </p>

          {/* Mode Switcher */}
          <div className="inline-flex p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 mt-8 mb-4 shadow-lg">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="px-5 py-2 rounded-xl font-black text-xs sm:text-sm text-emerald-100 hover:text-white transition-all cursor-pointer"
            >
              Search & Register New
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-xl font-black text-xs sm:text-sm bg-white text-slate-950 shadow-md cursor-default flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#008a45]" />
              <span>Transfer Domain</span>
            </button>
          </div>

          {/* Transfer Input Form */}
          <div className="max-w-3xl mx-auto mt-2">
            <form onSubmit={handleTransferCheck} className="relative flex items-center shadow-2xl rounded-2xl bg-white p-2">
              <div className="pl-3 pr-2 text-gray-400">
                <Globe className="w-6 h-6 text-[#008a45]" />
              </div>
              <input
                type="text"
                value={transferQuery}
                onChange={(e) => setTransferQuery(e.target.value)}
                placeholder="Enter domain to transfer (e.g. mycompany.com)"
                className="w-full py-3.5 px-2 text-base sm:text-lg text-gray-900 placeholder-gray-400 bg-transparent focus:outline-hidden font-medium"
              />
              <button
                type="submit"
                disabled={isChecking}
                className="bg-[#fed000] hover:bg-[#ebbe00] text-slate-950 px-6 sm:px-8 py-3.5 rounded-xl font-black text-sm sm:text-base transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-2"
              >
                {isChecking ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify Domain</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 2. Main Transfer Container */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-8 relative z-20 pb-20 space-y-12">
        
        {/* Real-Time Transfer Card (When Domain is Checked) */}
        {checkedDomain && (
          <div className="bg-white rounded-3xl shadow-xl border-2 border-emerald-500 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Transfer: <span className="text-[#008a45]">{checkedDomain}</span>
                  </h3>
                  <span className="bg-emerald-100 text-[#008a45] text-[11px] font-black px-2.5 py-0.5 rounded-full">
                    READY FOR TRANSFER
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Includes a full 1-year registration extension added to your current expiration date with 0 downtime.
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">
                  £{currentDetails.transferPrice.toFixed(2)}
                </div>
                <div className="text-[11px] text-gray-500 font-medium">Includes 1-Year Extension + WHOIS Privacy</div>
                <span className="text-[10px] text-gray-400 block mt-0.5">Renews at standard £{currentDetails.regularPrice.toFixed(2)}/yr</span>
              </div>
            </div>

            {/* EPP Code Input */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-900 block">
                  EPP / Authorization Code (Optional now, can be entered after checkout)
                </label>
                <input
                  type="text"
                  value={eppCode}
                  onChange={(e) => setEppCode(e.target.value)}
                  placeholder="e.g. 8xK#99_qP2"
                  className="w-full py-2.5 px-3 bg-white border border-gray-300 rounded-xl text-xs font-mono"
                />
                <span className="text-[10px] text-gray-400 block">
                  Obtain this code from your current registrar's control panel (GoDaddy, Namecheap, etc.).
                </span>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleAddTransferToCart}
                  className={`w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 ${
                    isTransferAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#fed000] hover:bg-[#ebbe00] text-slate-950'
                  }`}
                >
                  {isTransferAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Transfer Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Transfer to Basket (£{currentDetails.transferPrice.toFixed(2)})</span>
                    </>
                  )}
                </button>

                {isTransferAdded && (
                  <button
                    type="button"
                    onClick={onOpenCart}
                    className="w-full text-center text-xs font-bold text-[#008a45] hover:underline cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>Proceed to Basket & Checkout →</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Popular Extensions Transfer Pricing Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Transparent Domain Transfer Pricing
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Every transfer includes a full 1-year registration extension, zero downtime, and lifetime WHOIS privacy shield.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
              <Zap className="w-3.5 h-3.5 text-[#008a45]" />
              <span>0 Downtime Guarantee</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Extension (TLD)</th>
                  <th className="py-3 px-4">Transfer Price</th>
                  <th className="py-3 px-4">Included Extension</th>
                  <th className="py-3 px-4">WHOIS Privacy</th>
                  <th className="py-3 px-4 text-right">Standard Renewal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {EXTENSIONS_CATALOG.slice(0, 10).map((item) => (
                  <tr key={item.tld} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="py-3 px-4 font-black text-slate-900 text-sm">
                      <span className="bg-gray-100 px-2.5 py-1 rounded-lg text-slate-800 font-mono text-xs">{item.tld}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-black text-slate-950 text-sm">£{item.transferPrice.toFixed(2)}</span>
                    </td>
                    <td className="py-3 px-4 text-emerald-700 font-bold">
                      ✓ +1 Year Added
                    </td>
                    <td className="py-3 px-4 text-emerald-700 font-bold">
                      ✓ Free Lifetime
                    </td>
                    <td className="py-3 px-4 text-right text-gray-500 font-semibold">
                      £{item.regularPrice.toFixed(2)}/yr
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4-Step Visual Process */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-[#008a45] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              SMOOTH MIGRATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Transfer in 4 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#fafdfb] border border-emerald-100 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#008a45] text-white flex items-center justify-center font-black text-xs">
                1
              </div>
              <h4 className="font-bold text-sm text-slate-900">Enter Domain Name</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Provide your current domain name to verify its transfer eligibility with the ICANN registry.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fafdfb] border border-emerald-100 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#008a45] text-white flex items-center justify-center font-black text-xs">
                2
              </div>
              <h4 className="font-bold text-sm text-slate-900">Unlock at Current Registrar</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Log in to GoDaddy, Namecheap, or current provider, turn off Registrar Lock, and request your EPP code.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fafdfb] border border-emerald-100 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#008a45] text-white flex items-center justify-center font-black text-xs">
                3
              </div>
              <h4 className="font-bold text-sm text-slate-900">Confirm & Authorize</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Enter your EPP code. Hostxeon automatically initiates the registry transfer sequence.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fafdfb] border border-emerald-100 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#008a45] text-white flex items-center justify-center font-black text-xs">
                4
              </div>
              <h4 className="font-bold text-sm text-slate-900">Zero Downtime Finalization</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Transfer completes smoothly within 5 to 7 days while your website and emails remain 100% active.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Registrar Unlock Guides */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              How to Unlock & Get EPP Auth Code from Common Registrars
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Select your current provider below for concise step-by-step instructions.
            </p>
          </div>

          <div className="flex items-center gap-2 border-b border-gray-200 pb-3 overflow-x-auto">
            {[
              { id: 'godaddy', label: 'GoDaddy' },
              { id: 'namecheap', label: 'Namecheap' },
              { id: 'google', label: 'Google Domains / Squarespace' },
              { id: 'bluehost', label: 'Bluehost' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveGuideTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeGuideTab === tab.id
                    ? 'bg-[#008a45] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-gray-200 text-xs text-gray-700 space-y-3">
            {activeGuideTab === 'godaddy' && (
              <>
                <div className="font-bold text-slate-900 text-sm">Unlocking Domain at GoDaddy:</div>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>Log in to your <strong>GoDaddy Domain Portfolio</strong>.</li>
                  <li>Select the domain you want to transfer.</li>
                  <li>Under <strong>Additional Settings</strong>, toggle <strong>Domain Lock</strong> to <strong>Off</strong>.</li>
                  <li>Click <strong>Transfer to another registrar</strong> and select <strong>Continue with transfer</strong>.</li>
                  <li>Click <strong>Get Authorization Code</strong> (it will also be emailed to your administrative email).</li>
                </ol>
              </>
            )}

            {activeGuideTab === 'namecheap' && (
              <>
                <div className="font-bold text-slate-900 text-sm">Unlocking Domain at Namecheap:</div>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>Sign in to your <strong>Namecheap Dashboard</strong>.</li>
                  <li>Go to <strong>Domain List</strong> and click <strong>Manage</strong> next to your domain.</li>
                  <li>Under the <strong>Sharing & Transfer</strong> tab, find <strong>Domain Lock</strong> and set it to <strong>Unlocked</strong>.</li>
                  <li>Scroll to the <strong>AUTH CODE</strong> section and click <strong>Get Auth Code</strong>.</li>
                </ol>
              </>
            )}

            {activeGuideTab === 'google' && (
              <>
                <div className="font-bold text-slate-900 text-sm">Unlocking Domain at Squarespace / Google Domains:</div>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>Go to your <strong>Domains Dashboard</strong>.</li>
                  <li>Click on the domain you want to transfer.</li>
                  <li>Toggle the <strong>Domain Lock</strong> switch to unlocked.</li>
                  <li>Under <strong>Transfer</strong>, click <strong>Get Transfer Auth Code</strong> and copy the code.</li>
                </ol>
              </>
            )}

            {activeGuideTab === 'bluehost' && (
              <>
                <div className="font-bold text-slate-900 text-sm">Unlocking Domain at Bluehost:</div>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>Log into your <strong>Bluehost control panel</strong>.</li>
                  <li>Click <strong>Domains</strong> in the left sidebar.</li>
                  <li>Click <strong>Security</strong>, turn off <strong>Transfer Lock</strong>.</li>
                  <li>Scroll to <strong>Transfer Authorization / EPP Code</strong> and request your code.</li>
                </ol>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
