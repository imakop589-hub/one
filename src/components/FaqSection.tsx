import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../data/siteData';
import { cmsService } from '../services/cmsService';
import { CmsFaq } from '../types/cms';

export const FaqSection: React.FC = () => {
  const [faqs, setFaqs] = useState<{ id: string; question: string; answer: string }[]>(FAQ_ITEMS);
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [isCmsLoaded, setIsCmsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadCmsFaqs() {
      try {
        const cmsList = await cmsService.getFaqs();
        const published = cmsList.filter(f => f.isPublished);
        if (isMounted && published.length > 0) {
          setFaqs(published);
          setOpenId(published[0].id);
          setIsCmsLoaded(true);
        }
      } catch (err) {
        console.warn('Could not load CMS FAQs, using static fallback:', err);
      }
    }

    loadCmsFaqs();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFaq = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="bg-white py-20" id="faq">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          {isCmsLoaded && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <Sparkles className="w-3 h-3 text-[#008a45]" />
              <span>CMS Synchronized</span>
            </span>
          )}
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="py-4 sm:py-5">
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between text-left group focus:outline-hidden cursor-pointer"
                  id={`faq-btn-${item.id}`}
                >
                  <span className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#008a45] transition-colors pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#008a45]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed font-normal animate-in fade-in duration-200 whitespace-pre-line">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
