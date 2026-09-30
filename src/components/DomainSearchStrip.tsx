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
    { tld: '.uk', price: '£ 0.99', period: '/1st yr', note: '*Free with Hosting' },
    { tld: '.co.uk', price: '£ 1.49', period: '/1st yr', note: '*Free with Hosting' },
    { tld: '.co', price: '£ 4.99', period: '/1st yr', note: '*Save 80%' },
    { tld: '.io', price: '£ 19.99', period: '/1st yr', note: '*Tech Favorite' },
  ];

  // Pool of rotating TLD options for Card 2 (.com, .ai, .org, .store, .net)
  const slot2Tlds: TldItem[] = [
    { tld: '.com', price: '£ 7.99', period: '/1st yr', note: '*Free with Hosting' },
    { tld: '.ai', price: '£ 29.99', period: '/1st yr', note: '*Popular for AI' },
    { tld: '.store', price: '£ 1.99', period: '/1st yr', note: '*Ecommerce' },
    { tld: '.org', price: '£ 8.99', period: '/1st yr', note: '*Free with Hosting' },
    { tld: '.net', price: '£ 9.99', period: '/1st yr', note: '*Global Reach' },
  ];

  const [slot1Index, setSlot1Index] = useState(0);
  const [slot2Index, setSlot2Index] = useState(0);

  // Smooth timer to cycle TLDs
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSlot1Index((prev) => (prev + 1) % slot1Tlds.length);
      setSlot2Index((prev) => (prev + 1) % slot2Tlds.length);
    }, 3000);

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
      // Focus input if empty
      const el = document.getElementById('main-domain-input');
      if (el) el.focus();
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 py-3 shadow-xs" id="domain-search-strip">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Unified Responsive Container */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 sm:gap-3">
          
          {/* TLD Cards: 2 Columns on Mobile, Horizontal Fixed on Tablet/Desktop */}
          <div 
            className="grid grid-cols-2 md:flex items-center gap-2 sm:gap-3 shrink-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* TLD Card 1 */}
            <button
              type="button"
              onClick={() => handleCardClick(currentSlot1.tld)}
              className="h-[52px] sm:h-[56px] w-full md:w-[175px] lg:w-[190px] bg-white border border-gray-200 hover:border-gray-900 rounded-xl sm:rounded-2xl px-3 sm:px-3.5 py-2 flex items-center gap-2.5 transition-all cursor-pointer text-left shadow-2xs hover:shadow-xs overflow-hidden relative group"
              id="tld-card-slot-1"
              title={`Click to check domain with ${currentSlot1.tld}`}
            >
              <div className="text-xs sm:text-sm font-black text-slate-950 border-r border-gray-200 pr-2 min-w-[38px] sm:min-w-[42px] shrink-0">
                {currentSlot1.tld}
              </div>
              <div className="flex-1 min-w-0 relative h-[36px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlot1.tld + currentSlot1.price}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="text-xs sm:text-[13px] font-extrabold text-slate-900 whitespace-nowrap leading-tight">
                      {currentSlot1.price} <span className="font-normal text-[10px] text-slate-500">{currentSlot1.period}</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium whitespace-nowrap truncate leading-tight">
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
              className="h-[52px] sm:h-[56px] w-full md:w-[175px] lg:w-[190px] bg-white border border-gray-200 hover:border-gray-900 rounded-xl sm:rounded-2xl px-3 sm:px-3.5 py-2 flex items-center gap-2.5 transition-all cursor-pointer text-left shadow-2xs hover:shadow-xs overflow-hidden relative group"
              id="tld-card-slot-2"
              title={`Click to check domain with ${currentSlot2.tld}`}
            >
              <div className="text-xs sm:text-sm font-black text-slate-950 border-r border-gray-200 pr-2 min-w-[38px] sm:min-w-[42px] shrink-0">
                {currentSlot2.tld}
              </div>
              <div className="flex-1 min-w-0 relative h-[36px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlot2.tld + currentSlot2.price}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="text-xs sm:text-[13px] font-extrabold text-slate-900 whitespace-nowrap leading-tight">
                      {currentSlot2.price} <span className="font-normal text-[10px] text-slate-500">{currentSlot2.period}</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium whitespace-nowrap truncate leading-tight">
                      {currentSlot2.note}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </button>
          </div>

          {/* Main Domain Search Bar (Fills all remaining width on desktop) */}
          <form 
            onSubmit={handleSearch}
            className="flex-1 flex items-center bg-white border-2 border-gray-200 hover:border-gray-300 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 focus-within:border-[#008a45] focus-within:ring-4 focus-within:ring-emerald-500/15 transition-all shadow-xs h-[52px] sm:h-[56px] group"
          >
            <div className="pl-3 sm:pl-4 pr-1 text-slate-400 group-focus-within:text-[#008a45] transition-colors shrink-0 flex items-center">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
            <input
              type="text"
              placeholder="Find your domain name..."
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              className="flex-1 min-w-0 px-2 sm:px-3 py-1.5 text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal bg-transparent focus:outline-hidden"
              id="strip-domain-input"
              autoComplete="off"
            />
            <button
              type="submit"
              className="h-full bg-[#fed000] hover:bg-[#eabf00] active:scale-[0.98] text-slate-950 font-black px-5 sm:px-8 rounded-lg sm:rounded-xl text-xs sm:text-sm tracking-tight flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer shrink-0 shadow-xs hover:shadow-sm"
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
