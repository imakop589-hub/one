import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  Smartphone, 
  Monitor, 
  RefreshCw, 
  ArrowRight, 
  ShoppingBag, 
  Calendar, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sliders
} from 'lucide-react';

interface AidaGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptData: {
    career: string;
    company: string;
    city: string;
    mode: string;
  };
  onAddToCart: (item: any) => void;
}

export const AidaGeneratorModal: React.FC<AidaGeneratorModalProps> = ({
  isOpen,
  onClose,
  promptData,
  onAddToCart,
}) => {
  const [step, setStep] = useState(0);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const [published, setPublished] = useState(false);

  const steps = [
    'Analyzing business concept and target audience...',
    'Curating visual brand identity & color harmony...',
    'Generating high-converting copywriting & headlines...',
    'Building responsive e-commerce & booking architecture...',
    'Finalizing SEO meta tags and SSL security rules...',
  ];

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setPublished(false);
      const timer1 = setTimeout(() => setStep(1), 600);
      const timer2 = setTimeout(() => setStep(2), 1200);
      const timer3 = setTimeout(() => setStep(3), 1800);
      const timer4 = setTimeout(() => setStep(4), 2400);
      const timer5 = setTimeout(() => setStep(5), 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
      };
    }
  }, [isOpen, promptData]);

  if (!isOpen) return null;

  const handlePublish = () => {
    setPublished(true);
    onAddToCart({
      id: `site-${Date.now()}`,
      type: 'builder',
      title: `Aida AI Website Builder (${promptData.company})`,
      subtitle: `Domain ready • 14-day free trial`,
      price: 0,
      period: '14 days trial',
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f1713] text-white rounded-3xl w-full max-w-5xl h-[90vh] max-h-[850px] flex flex-col border border-emerald-900/60 shadow-2xl overflow-hidden">
        
        {/* Top Modal Header */}
        <div className="px-6 py-4 border-b border-emerald-900/60 bg-[#071d15] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#008a45] flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4 text-[#fed000]" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-white flex items-center gap-2">
                <span>Aida AI Studio</span>
                <span className="text-[10px] bg-[#008a45] px-2 py-0.5 rounded-full font-semibold">Live Builder</span>
              </div>
              <div className="text-xs text-emerald-200/70 font-mono">
                {promptData.company}.com • {promptData.career} in {promptData.city}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex bg-emerald-950/80 border border-emerald-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-[#008a45] text-white' : 'text-emerald-300 hover:text-white'}`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-[#008a45] text-white' : 'text-emerald-300 hover:text-white'}`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              id="close-aida-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {step < 5 ? (
            /* Loading Generation Progress State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-full border-4 border-emerald-800 border-t-[#fed000] animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-[#4ade80] animate-pulse" />
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2">
                Aida is designing your website...
              </h3>
              <p className="text-emerald-200/80 text-sm max-w-md mx-auto mb-6">
                Tailoring layout, photography, and copy for <strong className="text-white">{promptData.company}</strong> in <strong className="text-white">{promptData.city}</strong>.
              </p>

              {/* Step Checklist */}
              <div className="w-full max-w-md bg-[#071d15] border border-emerald-900/60 rounded-2xl p-4 text-left space-y-2.5">
                {steps.map((s, idx) => (
                  <div
                    key={s}
                    className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${
                      idx <= step ? 'text-emerald-100 opacity-100' : 'text-emerald-500/40 opacity-40'
                    }`}
                  >
                    {idx < step ? (
                      <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0" />
                    ) : idx === step ? (
                      <div className="w-4 h-4 rounded-full border-2 border-[#fed000] border-t-transparent animate-spin shrink-0"></div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-emerald-800 shrink-0"></div>
                    )}
                    <span className={idx === step ? 'font-bold text-[#fed000]' : ''}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Generated Website Preview Workspace */
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              
              {/* Left Settings Sidebar */}
              <div className="w-full lg:w-72 bg-[#071d15] border-r border-emerald-900/60 p-4 space-y-5 overflow-y-auto shrink-0">
                <div>
                  <label className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block mb-2">
                    Aida AI Assistant
                  </label>
                  <div className="bg-[#0b2b20] border border-emerald-700/50 rounded-xl p-3 text-xs text-emerald-100">
                    "I created a bespoke website for <strong>{promptData.company}</strong>. You can edit any element or publish in one click."
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block mb-2">
                    Visual Aesthetic
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['modern', 'minimal', 'warm', 'bold'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTheme(t)}
                        className={`text-xs capitalize py-2 px-3 rounded-lg font-semibold border transition-all ${
                          selectedTheme === t 
                            ? 'bg-[#008a45] border-emerald-400 text-white' 
                            : 'bg-emerald-950/60 border-emerald-800 text-emerald-300 hover:bg-emerald-900/60'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block mb-2">
                    Included Features
                  </label>
                  <ul className="text-xs space-y-1.5 text-emerald-200">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#4ade80]" /> Mobile Responsive</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#4ade80]" /> Online Bookings / Shop</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#4ade80]" /> Free SSL & CDN Hosting</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#4ade80]" /> Domain Matching</li>
                  </ul>
                </div>

                {/* Publish Button */}
                <div className="pt-4 border-t border-emerald-900/60">
                  {published ? (
                    <div className="bg-[#008a45] text-white p-3 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Added to your plan!
                    </div>
                  ) : (
                    <button
                      onClick={handlePublish}
                      className="w-full bg-[#fed000] hover:bg-[#ebbe00] text-gray-950 font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                      id="aida-modal-publish-btn"
                    >
                      <span>Claim & Publish Website</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  <span className="block text-center text-[10px] text-emerald-400 mt-2">
                    14 days free trial • £0.00 today
                  </span>
                </div>
              </div>

              {/* Main Website Canvas Live Preview */}
              <div className="flex-1 bg-stone-900 p-3 sm:p-6 overflow-y-auto flex items-start justify-center">
                <div 
                  className={`bg-white text-gray-900 rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden ${
                    viewMode === 'mobile' ? 'w-[360px] min-h-[600px] border-4 border-stone-800' : 'w-full max-w-3xl min-h-[600px]'
                  }`}
                >
                  {/* Browser Bar */}
                  <div className="bg-stone-100 px-4 py-2 border-b border-stone-200 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                      <span className="ml-2 font-mono text-[11px] text-stone-700 font-medium">
                        https://{promptData.company.toLowerCase().replace(/\s+/g, '')}.one
                      </span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-[#008a45] font-bold px-2 py-0.5 rounded-full">
                      SSL Secure
                    </span>
                  </div>

                  {/* Rendered Live Website Content */}
                  <div className="font-sans">
                    {/* Hero Header */}
                    <div className="relative bg-stone-900 text-white p-8 sm:p-12 text-center overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-40"
                        style={{
                          backgroundImage: `url(${
                            promptData.career.toLowerCase().includes('restaurant') || promptData.career.toLowerCase().includes('food')
                              ? 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1200'
                              : promptData.career.toLowerCase().includes('yoga')
                              ? 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200'
                              : promptData.career.toLowerCase().includes('fashion') || promptData.career.toLowerCase().includes('eyewear')
                              ? 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200'
                              : promptData.career.toLowerCase().includes('plumb')
                              ? 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1200'
                              : 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200'
                          })`
                        }}
                      ></div>
                      
                      <div className="relative z-10 max-w-xl mx-auto space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#fed000] bg-black/40 px-3 py-1 rounded-full">
                          {promptData.city}'s Premier {promptData.career}
                        </span>
                        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif text-white">
                          {promptData.company}
                        </h1>
                        <p className="text-xs sm:text-sm text-stone-200 max-w-md mx-auto leading-relaxed">
                          Crafted with passion and excellence in {promptData.city}. Discover our bespoke offerings, book appointments, or shop our signature collections online.
                        </p>
                        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                          <button className="bg-[#fed000] text-gray-950 text-xs font-bold px-4 py-2 rounded-full shadow-md">
                            Explore Services
                          </button>
                          <button className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full">
                            Contact Us
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Features / Products Section */}
                    <div className="p-6 sm:p-8 bg-stone-50">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">What We Offer</h3>
                        <p className="text-xs text-gray-500">Quality, integrity and satisfaction guaranteed</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#008a45] flex items-center justify-center mb-2 font-bold">
                            01
                          </div>
                          <h4 className="font-bold text-gray-900 text-sm">Bespoke Experience</h4>
                          <p className="text-gray-500 mt-1">Tailored specifically to your distinct taste and requirements in {promptData.city}.</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2 font-bold">
                            02
                          </div>
                          <h4 className="font-bold text-gray-900 text-sm">Online Booking</h4>
                          <p className="text-gray-500 mt-1">Seamless instant reservations and appointments 24/7 with real-time calendar syncing.</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2 font-bold">
                            03
                          </div>
                          <h4 className="font-bold text-gray-900 text-sm">Secure Checkout</h4>
                          <p className="text-gray-500 mt-1">Accept cards, Apple Pay, and Klarna with 0% additional commission.</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact & Map Footer */}
                    <div className="p-6 bg-white border-t border-gray-200 text-xs text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <strong className="text-gray-900">{promptData.company}</strong> — {promptData.city}
                        <div className="text-[11px] text-gray-400">hello@{promptData.company.toLowerCase().replace(/\s+/g, '')}.com</div>
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Powered by Hostxeon Aida AI
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
