import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Globe, 
  Server, 
  Check, 
  RefreshCw, 
  ShoppingBag, 
  Headphones, 
  Sparkles,
  Info,
  Building,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { EXTENSIONS_CATALOG, checkLiveDnsAvailability } from './types';
import { CartItem } from '../../types';

interface DomainWhoisViewProps {
  initialDomain?: string;
  onAddToCart: (item: CartItem) => void;
  onOpenCart?: () => void;
  onSwitchToRegister?: (domain?: string) => void;
  onSwitchToTransfer?: (domain?: string) => void;
  onOpenLiveChat: () => void;
}

interface DnsZoneRecord {
  domainName: string;
  isRegistered: boolean;
  nameServers: string[];
  ipAddress?: string;
  transferPrice: number;
  registerPrice: number;
  regularPrice: number;
}

export const DomainWhoisView: React.FC<DomainWhoisViewProps> = ({
  initialDomain = '',
  onAddToCart,
  onOpenCart,
  onOpenLiveChat,
}) => {
  const [query, setQuery] = useState(initialDomain || '');
  const [isSearching, setIsSearching] = useState(false);
  const [dnsData, setDnsData] = useState<DnsZoneRecord | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isItemAdded, setIsItemAdded] = useState(false);

  const executeDnsLookup = async (targetDomain: string) => {
    if (!targetDomain.trim()) return;

    const cleaned = targetDomain.trim().toLowerCase().replace(/https?:\/\//, '').replace(/\/.*$/, '');
    const domainWithExt = cleaned.includes('.') ? cleaned : `${cleaned}.com`;
    const ext = domainWithExt.substring(domainWithExt.lastIndexOf('.'));
    const tldMatch = EXTENSIONS_CATALOG.find(t => t.tld === ext);

    const regPrice = tldMatch ? tldMatch.price : 6.99;
    const transPrice = tldMatch ? tldMatch.transferPrice : 8.49;
    const regularPrice = tldMatch ? tldMatch.regularPrice : 15.99;

    setIsSearching(true);
    setIsItemAdded(false);

    let isAvailable = false;
    let nameServers: string[] = [];
    let resolvedIp = '';

    try {
      isAvailable = await checkLiveDnsAvailability(domainWithExt);

      try {
        const nsRes = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domainWithExt)}&type=NS`);
        if (nsRes.ok) {
          const nsData = await nsRes.json();
          if (nsData.Answer && Array.isArray(nsData.Answer)) {
            nameServers = nsData.Answer.map((a: { data: string }) => a.data.replace(/\.$/, '').toLowerCase());
          }
        }
      } catch {
        // Fallback
      }

      try {
        const aRes = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domainWithExt)}&type=A`);
        if (aRes.ok) {
          const aData = await aRes.json();
          if (aData.Answer && aData.Answer.length > 0) {
            resolvedIp = aData.Answer[0].data;
          }
        }
      } catch {
        // Fallback
      }
    } catch {
      isAvailable = false;
    } finally {
      setIsSearching(false);
    }

    setDnsData({
      domainName: domainWithExt,
      isRegistered: !isAvailable,
      nameServers,
      ipAddress: resolvedIp,
      transferPrice: transPrice,
      registerPrice: regPrice,
      regularPrice: regularPrice,
    });
  };

  useEffect(() => {
    if (initialDomain && initialDomain.trim()) {
      setQuery(initialDomain.trim());
      executeDnsLookup(initialDomain.trim());
    }
  }, [initialDomain]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      executeDnsLookup(query.trim());
    }
  };

  const handleAction = () => {
    if (!dnsData) return;

    if (dnsData.isRegistered) {
      onAddToCart({
        id: `transfer-${dnsData.domainName}`,
        type: 'domain',
        title: `Transfer: ${dnsData.domainName}`,
        subtitle: 'Domain Transfer with 1-Yr Extension • Zero Downtime • Free Privacy Shield',
        price: dnsData.transferPrice,
        period: '1 year extension',
        badge: 'Zero Downtime Transfer',
      });
    } else {
      onAddToCart({
        id: `domain-${dnsData.domainName}`,
        type: 'domain',
        title: `Domain: ${dnsData.domainName}`,
        subtitle: '1-Year Registration • Free DNSSEC • Free Lifetime WHOIS Privacy',
        price: dnsData.registerPrice,
        period: '1st year',
        badge: 'Exact Match',
      });
    }
    setIsItemAdded(true);
  };

  const faqs = [
    {
      q: 'What is the difference between DNS records and WHOIS/RDAP data?',
      a: 'DNS (Domain Name System) translates domain names to IP addresses and routes internet traffic (A records, NS records). WHOIS/RDAP (Registration Data Access Protocol) contains the official legal ownership, administrative contact, and registration date records held by the domain registry. This tool provides live DNS records, while official RDAP registry records require a certified registrar API connection.',
    },
    {
      q: 'Why are WHOIS registration details sometimes unavailable?',
      a: 'In accordance with ICANN regulations and global data privacy laws (GDPR), personal ownership records of domain registrants are legally required to be redacted behind privacy proxy services unless explicit registrar API access is authenticated.',
    },
  ];

  return (
    <div className="bg-[#fcfdfd] min-h-screen text-slate-900 pb-20">
      
      {/* 1. Header & Search Hero */}
      <div className="bg-gradient-to-b from-[#03241b] via-[#043324] to-[#03241b] text-white pt-14 pb-20 border-b border-emerald-900/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#00b67a_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-[#fed000] text-xs font-black uppercase tracking-wider border border-emerald-500/30">
              <Search className="w-3.5 h-3.5" />
              <span>LIVE DNS ZONE & RECORD INSPECTOR</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Domain DNS & WHOIS Record Lookup
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/85 max-w-2xl mx-auto leading-relaxed">
              Inspect live DNS zone records, authoritative nameservers, Anycast IP routing, and domain registration status in real time.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSubmit} className="pt-4 max-w-2xl mx-auto">
              <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-white/20">
                <div className="flex items-center gap-2.5 w-full px-3 py-1">
                  <Globe className="w-5 h-5 text-[#008a45] shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter any domain (e.g. yourbrand.com or google.com)"
                    className="w-full bg-transparent text-slate-950 font-bold text-sm sm:text-base focus:outline-none placeholder:text-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSearching || !query.trim()}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl sm:rounded-2xl bg-[#fed000] hover:bg-[#ebbe00] text-slate-950 font-black text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                >
                  {isSearching ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Inspecting DNS...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 stroke-[3]" />
                      <span>Inspect Domain</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 2. Main Content / Results Area */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-8 relative z-20">
        
        {dnsData ? (
          <div className="space-y-6">
            
            {/* Informational Transparency Badge */}
            <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl px-4 py-3 flex items-center gap-3 text-xs text-emerald-900">
              <Info className="w-4 h-4 text-[#008a45] shrink-0" />
              <span>
                <strong>Technical Disclosure:</strong> DNS records are available via live resolution, but registration information could not be retrieved from an RDAP service. Official ICANN registry owner records require an authenticated registrar API integration.
              </span>
            </div>

            {/* Status Header Banner */}
            <div className={`p-6 sm:p-7 rounded-3xl border shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all ${
              dnsData.isRegistered
                ? 'bg-white border-amber-200'
                : 'bg-emerald-950 text-white border-emerald-800'
            }`}>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    dnsData.isRegistered 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-[#fed000] text-slate-950 shadow-xs'
                  }`}>
                    {dnsData.isRegistered ? 'Registered Domain (Taken)' : 'Domain is Available!'}
                  </span>
                </div>

                <h2 className={`text-2xl sm:text-3xl font-black ${
                  dnsData.isRegistered ? 'text-slate-950' : 'text-white'
                }`}>
                  {dnsData.domainName}
                </h2>

                <p className={`text-xs sm:text-sm ${
                  dnsData.isRegistered ? 'text-gray-600' : 'text-emerald-100/90'
                }`}>
                  {dnsData.isRegistered 
                    ? `This domain is currently active on the DNS network and can be transferred to Hostxeon.` 
                    : `Great news! "${dnsData.domainName}" is available to register with free lifetime WHOIS privacy.`}
                </p>
              </div>

              {/* Action Button */}
              <div className="shrink-0 w-full sm:w-auto text-right space-y-2">
                <div className="flex items-baseline gap-2 sm:justify-end">
                  <span className={`text-2xl sm:text-3xl font-black ${
                    dnsData.isRegistered ? 'text-slate-950' : 'text-white'
                  }`}>
                    £{(dnsData.isRegistered ? dnsData.transferPrice : dnsData.registerPrice).toFixed(2)}
                  </span>
                  <span className={`text-xs ${dnsData.isRegistered ? 'text-gray-500 font-bold' : 'text-emerald-200'}`}>
                    {dnsData.isRegistered ? '/ transfer (+1 yr renewal)' : '/ 1st year'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAction}
                    className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                      isItemAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#fed000] hover:bg-[#ebbe00] text-slate-950'
                    }`}
                  >
                    {isItemAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Basket!</span>
                      </>
                    ) : dnsData.isRegistered ? (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>Transfer to Hostxeon</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Register Domain Now</span>
                      </>
                    )}
                  </button>

                  {isItemAdded && (
                    <button
                      type="button"
                      onClick={onOpenCart}
                      className="px-4 py-3 text-xs font-bold text-[#008a45] bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors cursor-pointer"
                    >
                      View Basket →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-6">
              
              {/* 1. Registration Data Unavailable Notice */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-700 tracking-wider">
                  <Building className="w-4 h-4" />
                  <span>Domain Registration (RDAP / WHOIS) Information</span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed space-y-2">
                  <p className="font-bold">
                    RDAP registration lookup unavailable.
                  </p>
                  <p>
                    DNS records are available, but official registration records (such as exact creation date, registry expiration timestamp, and legal registrant owner identity) could not be retrieved from an authenticated RDAP service.
                  </p>
                </div>
              </div>

              {/* 2. Live DNS Records */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-[#008a45] tracking-wider">
                    <Server className="w-4 h-4" />
                    <span>Live DNS Zone Records</span>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    Verified via Google DNS-over-HTTPS for <strong>{dnsData.domainName}</strong>
                  </div>
                </div>

                {dnsData.nameServers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {dnsData.nameServers.map((ns, idx) => (
                      <div key={idx} className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
                        <Server className="w-4 h-4 text-[#008a45] shrink-0" />
                        <div className="font-mono text-xs font-bold text-slate-800 truncate">{ns}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-gray-50 text-xs text-gray-500">
                    No active nameserver records resolved for this domain query.
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="w-4 h-4 text-[#008a45]" />
                    <span>Resolved IP Address: <strong className="font-mono text-slate-900">{dnsData.ipAddress || 'Not resolved'}</strong></span>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenLiveChat}
                    className="text-[#008a45] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    <span>Need Custom DNS Configuration? Ask Support</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* Empty / Prompt State */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#008a45] mx-auto border border-emerald-200">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-950">Inspect Live DNS Records</h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              Enter any domain name above to retrieve its live nameservers, Anycast IP routing, and registration availability status.
            </p>
          </div>
        )}

      </div>

      {/* 3. FAQs */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black text-slate-950">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#008a45] cursor-pointer"
              >
                <span className="text-sm">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${activeFaq === idx ? 'rotate-180 text-[#008a45]' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
