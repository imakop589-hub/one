import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { DomainLandingView } from './domains/DomainLandingView';
import { DomainResultsView } from './domains/DomainResultsView';
import { DomainTransferView } from './domains/DomainTransferView';
import { DomainWhoisView } from './domains/DomainWhoisView';
import { checkLiveDnsAvailability } from './domains/types';

interface DomainsPageProps {
  onAddToCart: (item: CartItem) => void;
  onOpenLiveChat: () => void;
  onGoToHosting?: () => void;
  initialTab?: 'register' | 'transfer' | 'whois';
  initialQuery?: string;
  onOpenCart?: () => void;
}

export const DomainsPage: React.FC<DomainsPageProps> = ({
  onAddToCart,
  onOpenLiveChat,
  onGoToHosting,
  initialTab = 'register',
  initialQuery = '',
  onOpenCart,
}) => {
  const [activeTab, setActiveTab] = useState<'register' | 'transfer' | 'whois'>(initialTab);
  const [searchQuery, setSearchQuery] = useState(initialQuery?.trim() || '');
  const [hasSearched, setHasSearched] = useState(Boolean(initialQuery && initialQuery.trim()));
  const [isSearching, setIsSearching] = useState(false);
  const [exactAvailable, setExactAvailable] = useState<boolean | null>(null);
  const [transferPreFill, setTransferPreFill] = useState('');
  const [whoisPreFill, setWhoisPreFill] = useState('');

  // Handle live DNS registry verification
  const runDnsVerification = async (domainToVerify: string) => {
    setIsSearching(true);
    setExactAvailable(null);

    // Clean input
    const cleaned = domainToVerify.trim().toLowerCase().replace(/https?:\/\//, '').replace(/\/.*$/, '');
    const fullDomain = cleaned.includes('.') ? cleaned : `${cleaned}.com`;

    try {
      const isAvailable = await checkLiveDnsAvailability(fullDomain);
      setExactAvailable(isAvailable);
    } catch {
      setExactAvailable(true);
    } finally {
      setIsSearching(false);
    }
  };

  // Synchronize when initialTab or initialQuery changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      const q = initialQuery.trim();
      setSearchQuery(q);
      setHasSearched(true);
      setActiveTab('register');
      runDnsVerification(q);
    } else if (initialTab === 'register') {
      setHasSearched(false);
      setSearchQuery('');
      setExactAvailable(null);
    }
  }, [initialQuery]);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    const q = query.trim();
    setSearchQuery(q);
    setHasSearched(true);
    setActiveTab('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    runDnsVerification(q);
  };

  const handleBackToLanding = () => {
    setHasSearched(false);
    setSearchQuery('');
    setExactAvailable(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchToTransferWithDomain = (domain: string) => {
    setTransferPreFill(domain);
    setActiveTab('transfer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchToWhoisWithDomain = (domain: string) => {
    setWhoisPreFill(domain);
    setActiveTab('whois');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd]" id="domains-page-root">
      {/* GoDaddy Style Quick Domain Sub-Nav Pill Bar */}
      <div className="bg-[#03241b] border-b border-emerald-900/40 py-2.5 sticky top-16 z-30 shadow-xs">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2">
            {[
              { id: 'register', label: 'Domain Search & Register' },
              { id: 'transfer', label: 'Domain Transfer' },
              { id: 'whois', label: 'WHOIS Lookup' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id as any);
                  if (tab.id === 'register' && !searchQuery) {
                    setHasSearched(false);
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#fed000] text-slate-950 shadow-sm'
                    : 'text-emerald-100/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs text-emerald-300 font-bold shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="text-[#fed000]">✓</span> Free Lifetime WHOIS Privacy
            </span>
            <span className="text-emerald-700">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#fed000]">✓</span> 0 Downtime Transfers
            </span>
          </div>
        </div>
      </div>

      {activeTab === 'whois' ? (
        <DomainWhoisView
          initialDomain={whoisPreFill || searchQuery}
          onAddToCart={onAddToCart}
          onOpenCart={onOpenCart}
          onSwitchToRegister={(dom) => {
            if (dom) handleSearch(dom);
            else {
              setActiveTab('register');
              setHasSearched(false);
            }
          }}
          onSwitchToTransfer={(dom) => {
            if (dom) handleSwitchToTransferWithDomain(dom);
            else setActiveTab('transfer');
          }}
          onOpenLiveChat={onOpenLiveChat}
        />
      ) : activeTab === 'transfer' ? (
        <DomainTransferView
          initialDomain={transferPreFill}
          onAddToCart={onAddToCart}
          onOpenCart={onOpenCart}
          onSwitchToRegister={() => {
            setActiveTab('register');
            setHasSearched(false);
          }}
          onOpenLiveChat={onOpenLiveChat}
          onGoToHosting={onGoToHosting}
        />
      ) : hasSearched && searchQuery ? (
        <DomainResultsView
          searchedQuery={searchQuery}
          isSearching={isSearching}
          exactAvailable={exactAvailable}
          onSearchAgain={handleSearch}
          onBackToLanding={handleBackToLanding}
          onAddToCart={onAddToCart}
          onOpenCart={onOpenCart}
          onOpenLiveChat={onOpenLiveChat}
          onSwitchToTransferWithDomain={handleSwitchToTransferWithDomain}
        />
      ) : (
        <DomainLandingView
          onSearch={handleSearch}
          onSwitchToTransfer={() => setActiveTab('transfer')}
          onOpenLiveChat={onOpenLiveChat}
          onGoToHosting={onGoToHosting}
        />
      )}
    </div>
  );
};
