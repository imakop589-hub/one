import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DomainSearchStripProps {
  onSearchDomain: (query: string) => void;
  onAddToCart?: (item: any) => void;
}

interface TldItem {
  tld: string;
  price: string;
  period: string;
  note: string;
}

export const DomainSearchStrip: React.FC<DomainSearchStripProps> = ({
  onSearchDomain,
}) => {
  const [domainInput, setDomainInput] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  // Pool of rotating TLD options for Card 1
  const slot1Tlds: TldItem[] = [
    { tld: '.uk', price: '£0.99', period: '/1st yr', note: 'Free with Hosting' },
    { tld: '.co.uk', price: '£1.49', period: '/1st yr', note: 'Free with Hosting' },
    { tld: '.co', price: '£4.99', period: '/1st yr', note: 'Save 80%' },
    { tld: '.io', price: '£19.99', period: '/1st yr', note: 'Tech Favorite' },
  ];

  // Pool of rotating TLD options for Card 2 (.com, .ai, .org, .store, .net)
  const slot2Tlds: TldItem[] = [
    { tld: '.com', price: '£7.99', period: '/1st yr', note: 'Free with Hosting' },
    { tld: '.ai', price: '£29.99', period: '/1st yr', note: 'Popular for AI' },
    { tld: '.store', price: '£1.99', period: '/1st yr', note: 'Ecommerce' },
    { tld: '.org', price: '£8.99', period: '/1st yr', note: 'Free with Hosting' },
    { tld: '.net', price: '£9.99', period: '/1st yr', note: 'Global Reach' },
  ];

  const [slot1Index, setSlot1Index] = useState(0);
  const [slot2Index, setSlot2Index] = useState(0);

  // Timer to cycle TLDs
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSlot1Index((prev) => (prev + 1) % slot1Tlds.length);
      setSlot2Index((prev) => (prev + 1) % slot2Tlds.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, slot1Tlds.length, slot2Tlds.length]);

  const currentSlot1 = slot1Tlds[slot1Index];
  const currentSlot2 = slot2Tlds[slot2Index];

  const handleCardClick = (tld: string) => {
    if (domainInput.trim()) {
      const base = domainInput.trim().replace(/\..+$/, '');
      onSearchDomain(`${base}${tld}`);
    } else {
      setDomainInput(tld);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (domainInput.trim()) {
      onSearchDomain(domainInput.trim());
    } else {
      const el = document.getElementById('strip-domain-input');
      if (el) el.focus();
    }
  };

  return (
    <div className="bg-white border-b border-[#E2E8F0] py-3 shadow-2xs" id="domain-search-strip">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Unified Responsive Container */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* TLD Cards: 2 Columns on Mobile, Horizontal Fixed on Tablet/Desktop */}
          <div 
            className="grid grid-cols-2 md:flex items-center gap-2.5 shrink-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* TLD Card 1 */}
            <button
              type="button"
              onClick={() => handleCardClick(currentSlot1.tld)}
              className="h-12 w-full md:w-[180px] bg-white border border-[#E2E8F0] hover:border-slate-400 rounded-lg px-3 py-1.5 flex items-center gap-2.5 transition-colors cursor-pointer text-left shadow-2xs overflow-hidden relative group"
              id="tld-card-slot-1"
              title={`Check domain with ${currentSlot1.tld}`}
            >
              <div className="text-sm font-bold text-[#0F172A] border-r border-[#E2E8F0] pr-2 min-w-[42px] shrink-0">
                {currentSlot1.tld}
              </div>
              <div className="flex-1 min-w-0 relative h-9 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlot1.tld + currentSlot1.price}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="text-xs font-bold text-[#0F172A] whitespace-nowrap leading-tight tabular-nums">
                      {currentSlot1.price} <span className="font-normal text-slate-500">{currentSlot1.period}</span>
                    </div>
                    <div className="text-xs text-[#475569] font-normal whitespace-nowrap truncate leading-tight">
                      {currentSlot1.note}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </button>

            {/* TLD Card 2 */}
            <button
              type="button"
              onClick={() => handleCardClick(currentSlot2.tld)}
              className="h-12 w-full md:w-[180px] bg-white border border-[#E2E8F0] hover:border-slate-400 rounded-lg px-3 py-1.5 flex items-center gap-2.5 transition-colors cursor-pointer text-left shadow-2xs overflow-hidden relative group"
              id="tld-card-slot-2"
              title={`Check domain with ${currentSlot2.tld}`}
            >
              <div className="text-sm font-bold text-[#0F172A] border-r border-[#E2E8F0] pr-2 min-w-[42px] shrink-0">
                {currentSlot2.tld}
              </div>
              <div className="flex-1 min-w-0 relative h-9 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlot2.tld + currentSlot2.price}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="text-xs font-bold text-[#0F172A] whitespace-nowrap leading-tight tabular-nums">
                      {currentSlot2.price} <span className="font-normal text-slate-500">{currentSlot2.period}</span>
                    </div>
                    <div className="text-xs text-[#475569] font-normal whitespace-nowrap truncate leading-tight">
                      {currentSlot2.note}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </button>
          </div>

          {/* Main Domain Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="flex-1 flex items-center bg-white border border-[#E2E8F0] hover:border-slate-400 rounded-lg p-1 focus-within:border-[#008744] focus-within:ring-2 focus-within:ring-emerald-500/20 transition-colors shadow-2xs h-12"
          >
            <div className="pl-3 pr-1 text-slate-400 shrink-0 flex items-center">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Find your perfect domain name..."
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              className="flex-1 min-w-0 px-2 py-1.5 text-sm font-medium text-[#0F172A] placeholder:text-slate-400 bg-transparent focus:outline-hidden"
              id="strip-domain-input"
              autoComplete="off"
            />
            <button
              type="submit"
              className="h-full bg-[#008744] hover:bg-[#006E37] text-white font-semibold px-5 sm:px-6 rounded-md text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
              id="strip-domain-search-btn"
            >
              <span>Search</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
