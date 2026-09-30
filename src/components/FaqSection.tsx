import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/siteData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="bg-white py-20" id="faq">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight mb-8">
          FAQ
        </h2>

        {/* Accordion List */}
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {FAQ_ITEMS.map((item) => {
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
                  <div className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed font-normal animate-in fade-in duration-200">
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
