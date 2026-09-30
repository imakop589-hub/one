import React, { useState } from 'react';
import { Sparkles, ArrowRight, Shield, Globe, RefreshCw, UserCheck, Palette, Code2 } from 'lucide-react';
import { EXAMPLE_PROMPTS } from '../data/siteData';

interface BottomCtaSectionProps {
  onGenerateWebsite: (promptData: { career: string; company: string; city: string; mode: string }) => void;
}

export const BottomCtaSection: React.FC<BottomCtaSectionProps> = ({ onGenerateWebsite }) => {
  const [activeTab, setActiveTab] = useState<'example' | 'describe' | 'modernise'>('example');
  
  const [career, setCareer] = useState(EXAMPLE_PROMPTS[1].career);
  const [company, setCompany] = useState(EXAMPLE_PROMPTS[1].company);
  const [city, setCity] = useState(EXAMPLE_PROMPTS[1].city);
  const [customIdea, setCustomIdea] = useState('An eco-friendly artisan bakery and coffee house with daily pastry drops and seasonal baking classes.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateWebsite({
      career: career || 'Specialty Business',
      company: company || 'My Venture',
      city: city || 'London',
      mode: activeTab,
    });
  };

  return (
    <section className="bg-[#062c21] text-white py-20 relative overflow-hidden" id="cta-builder">
      {/* Background radial highlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#008a45]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fed000]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        <div className="max-w-screen-2xl mx-auto text-center">
        {/* Sub-label */}
        <div className="inline-flex items-center gap-1.5 text-[#4ade80] text-xs sm:text-sm font-bold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#fed000]" />
          <span>AI Website Builder</span>
        </div>

        {/* Big Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
          Ready to build your <br className="hidden sm:inline" />
          website?
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          Describe your idea and watch your website come to life, no technical skills or credit cards required! Start building for free.
        </p>

        {/* Tab Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('example')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'example'
                ? 'bg-[#fed000] text-gray-950 font-bold shadow-md'
                : 'bg-[#0a3d2e] text-emerald-100 hover:bg-[#0e4d3b]'
            }`}
          >
            Start with an example
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('describe')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'describe'
                ? 'bg-[#fed000] text-gray-950 font-bold shadow-md'
                : 'bg-[#0a3d2e] text-emerald-100 hover:bg-[#0e4d3b]'
            }`}
          >
            Describe your idea
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('modernise')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'modernise'
                ? 'bg-[#fed000] text-gray-950 font-bold shadow-md'
                : 'bg-[#0a3d2e] text-emerald-100 hover:bg-[#0e4d3b]'
            }`}
          >
            Modernise your website
          </button>
        </div>

        {/* Builder Interactive Form Box */}
        <div className="bg-white text-gray-900 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl border border-emerald-900/30 text-left relative max-w-5xl mx-auto mb-16">
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'example' && (
              <div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-base sm:text-lg md:text-xl font-normal text-gray-700 leading-relaxed">
                  <span className="text-gray-500 font-light">Make me a website for</span>
                  
                  {/* Select */}
                  <select
                    value={career}
                    onChange={(e) => {
                      const newCareer = e.target.value;
                      setCareer(newCareer);
                      const match = EXAMPLE_PROMPTS.find(p => p.career === newCareer);
                      if (match) {
                        setCompany(match.company);
                        setCity(match.city);
                      }
                    }}
                    className="bg-[#eaf4ee] hover:bg-[#d8ecde] text-[#008a45] font-bold px-3 py-1.5 rounded-lg border border-[#c2e4cc] focus:outline-hidden focus:ring-2 focus:ring-[#008a45] text-sm sm:text-base md:text-lg cursor-pointer"
                  >
                    {EXAMPLE_PROMPTS.map((p) => (
                      <option key={p.career} value={p.career}>{p.career}</option>
                    ))}
                  </select>

                  <span className="text-gray-500 font-light">called</span>

                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="My company"
                    className="bg-[#eaf4ee] hover:bg-[#d8ecde] text-[#008a45] font-bold px-3 py-1.5 rounded-lg border border-[#c2e4cc] focus:outline-hidden focus:ring-2 focus:ring-[#008a45] w-36 sm:w-44 text-sm sm:text-base md:text-lg"
                  />

                  <span className="text-gray-500 font-light">in</span>

                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="London"
                    className="bg-[#eaf4ee] hover:bg-[#d8ecde] text-[#008a45] font-bold px-3 py-1.5 rounded-lg border border-[#c2e4cc] focus:outline-hidden focus:ring-2 focus:ring-[#008a45] w-32 sm:w-36 text-sm sm:text-base md:text-lg"
                  />
                </div>
              </div>
            )}

            {activeTab === 'describe' && (
              <div>
                <textarea
                  rows={3}
                  value={customIdea}
                  onChange={(e) => setCustomIdea(e.target.value)}
                  placeholder="Describe your vision..."
                  className="w-full bg-[#f8faf9] text-gray-900 font-medium p-3.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-[#008a45] text-sm sm:text-base"
                />
              </div>
            )}

            {activeTab === 'modernise' && (
              <div>
                <input
                  type="text"
                  placeholder="https://yourwebsite.co.uk"
                  className="w-full bg-[#f8faf9] text-gray-900 font-medium p-3.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-[#008a45] text-sm sm:text-base"
                />
              </div>
            )}

            {/* Action Bottom Row */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-4 h-4 text-[#008a45] shrink-0" />
                <span>14-day free trial • No credit card needed • Cancel anytime</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#fed000] hover:bg-[#f5c600] active:scale-[0.98] text-gray-950 font-extrabold px-6 py-3.5 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                id="bottom-cta-start-btn"
              >
                <span>Start free trial</span>
                <ArrowRight className="w-4 h-4 text-gray-950 font-bold" />
              </button>
            </div>
          </form>

          <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-400 leading-normal text-center sm:text-left">
            This tool uses AI to generate content. Accuracy and legal compliance are not guaranteed. By using Aida AI Website Builder you agree to Terms of Use and acknowledge Privacy Policy.
          </div>
        </div>

        {/* 3 Bottom Product Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* 1. Aida AI Website Builder */}
          <div 
            onClick={() => onGenerateWebsite({ career: 'Japanese restaurant', company: 'Kaysuki', city: 'Amsterdam', mode: 'example' })}
            className="group bg-[#093d2e] rounded-2xl p-5 border border-emerald-700/40 hover:border-[#fed000]/60 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between text-lg font-bold text-white group-hover:text-[#fed000] transition-colors mb-2">
                <h4>Aida AI Website Builder</h4>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-emerald-200/80 leading-relaxed mb-4">
                Create a complete website in minutes with AI on an all-in-one platform built to help you launch and grow online.
              </p>
            </div>

            {/* Chat Mockup */}
            <div className="bg-[#052018] rounded-xl p-3 border border-emerald-800/60 text-[11px] space-y-2">
              <div className="bg-emerald-900/60 p-2 rounded-lg text-emerald-200">
                "Create a website for my Japanese restaurant called 'Kaysuki' located in Amsterdam."
              </div>
              <div className="bg-[#008a45] text-white p-2 rounded-lg font-medium">
                "I'd love to help you build the Kaysuki website! Before I start, just a couple of quick questions."
              </div>
            </div>
          </div>

          {/* 2. Aida WP Website Builder */}
          <div 
            onClick={() => onGenerateWebsite({ career: 'luxury eyewear boutique', company: 'Shutters', city: 'London', mode: 'example' })}
            className="group bg-[#093d2e] rounded-2xl p-5 border border-emerald-700/40 hover:border-[#fed000]/60 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between text-lg font-bold text-white group-hover:text-[#fed000] transition-colors mb-2">
                <h4>Aida WP Website Builder</h4>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-emerald-200/80 leading-relaxed mb-4">
                Use AI to build and customise your WordPress site faster, combining power and flexibility with time-saving tools.
              </p>
            </div>

            {/* WP Mockup */}
            <div className="bg-[#052018] rounded-xl p-3 border border-emerald-800/60 text-[11px] space-y-2">
              <div className="text-[#4ade80] font-mono text-[10px] flex items-center gap-1">
                <Code2 className="w-3 h-3" /> Building your website in WordPress...
              </div>
              <div className="bg-stone-800 p-2 rounded-lg text-stone-200">
                "Create a modern website and online shop for my sunglasses store called 'Shutters' located in Copenhagen."
              </div>
            </div>
          </div>

          {/* 3. Website design services */}
          <div 
            onClick={() => onGenerateWebsite({ career: 'pottery workshop', company: 'Clay Collective', city: 'Bristol', mode: 'example' })}
            className="group bg-[#093d2e] rounded-2xl p-5 border border-emerald-700/40 hover:border-[#fed000]/60 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between text-lg font-bold text-white group-hover:text-[#fed000] transition-colors mb-2">
                <h4>Website design services</h4>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-emerald-200/80 leading-relaxed mb-4">
                Let professional designers build and manage a website tailored to your specific needs and style.
              </p>
            </div>

            {/* Designer Consultation Mockup */}
            <div className="bg-[#052018] rounded-xl p-3 border border-emerald-800/60 text-[11px] space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold text-white">
                  C
                </div>
                <div className="text-white font-semibold">Customer: "I need a stunning website for my pottery workshop."</div>
              </div>
              <div className="bg-emerald-900/60 p-2 rounded-lg text-emerald-200">
                <strong className="text-white">Hostxeon designer:</strong> "Of course, we'd be happy to help bring that to life with you! Could you share a bit more about your workshop?"
              </div>
            </div>
          </div>

        </div>

        </div>

      </div>
    </section>
  );
};
