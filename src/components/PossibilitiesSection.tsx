import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ExternalLink, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/siteData';
import { PortfolioWebsite } from '../types';

interface PossibilitiesSectionProps {
  onStartTrial: () => void;
  onSelectPortfolio: (item: PortfolioWebsite) => void;
}

export const PossibilitiesSection: React.FC<PossibilitiesSectionProps> = ({
  onStartTrial,
  onSelectPortfolio,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'Restaurant', 'Boutique Retail', 'Creative Studio', 'Architecture', 'Fitness'];

  const filteredItems = selectedFilter === 'All' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category.toLowerCase().includes(selectedFilter.toLowerCase()) || item.title.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <section className="bg-[#f8faf9] py-24 border-b border-gray-200" id="possibilities">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Header with Title and Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#008a45]" />
              <span>Real Founder Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Crafted in minutes with <br className="hidden sm:inline" />
              Aida AI Web Intelligence.
            </h2>
          </div>

          <div className="space-y-4 max-w-md">
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Explore production websites launched by entrepreneurs, studios, and retailers across the world. Click any site to remix with Aida.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onStartTrial}
                className="bg-[#008a45] hover:bg-[#007339] text-white font-extrabold px-6 py-3 rounded-xl text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                id="possibilities-start-trial-btn"
              >
                <span>Remix a Template Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                selectedFilter === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-slate-600 hover:border-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.slice(0, 4).map((site) => (
            <div
              key={site.id}
              onClick={() => onSelectPortfolio(site)}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1.5"
            >
              {/* Image Container */}
              <div className="relative aspect-4/5 overflow-hidden bg-slate-100">
                <img
                  src={site.image}
                  alt={site.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Category Tag */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full border border-white/20">
                  {site.category}
                </div>

                {/* Performance Pill */}
                <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow-md">
                  100 Speed
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="bg-[#fed000] text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Sparkles className="w-3.5 h-3.5" />
                    Customize with Aida AI
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-base text-slate-900 group-hover:text-[#008a45] transition-colors">
                    {site.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">{site.tagline}</p>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-gray-100">
                  {site.features.map((feat) => (
                    <span key={feat} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
