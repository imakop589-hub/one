import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  Sliders, 
  Wand2, 
  Compass, 
  Zap, 
  Layers, 
  Cpu, 
  Eye, 
  Check
} from 'lucide-react';

interface MeetAidaSectionProps {
  onStartBuilding: () => void;
  onOpenChat: () => void;
}

export const MeetAidaSection: React.FC<MeetAidaSectionProps> = ({
  onStartBuilding,
  onOpenChat,
}) => {
  const [activeIndustry, setActiveIndustry] = useState<'eyewear' | 'ceramics' | 'dining' | 'fitness'>('eyewear');
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: '1. Intelligent Prompting', desc: 'Tell Aida your business goals, target audience, and preferred aesthetic.' },
    { title: '2. Layout & Wireframing', desc: 'AI generates conversion-optimized grid blocks, CTAs, and mobile layouts.' },
    { title: '3. Brand Voice & Assets', desc: 'Auto-crafts compelling copywriting, metadata, and custom typography.' },
    { title: '4. Commerce & Edge Deploy', desc: 'Connects Stripe checkout, table reservations, and 1-click publishing.' },
  ];

  const industryData = {
    eyewear: {
      brand: 'SHUTTERS EYEWEAR',
      tagline: 'Handcrafted in Milan',
      headline: 'Understated. Timeless.',
      desc: 'Designed for everyday elegance. Ultra-light titanium and Italian Mazzucchelli acetate frames.',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop',
      price: 'Shop Collection — £145',
      accent: 'bg-stone-900',
      bg: 'bg-[#f5f2eb]',
      aidaNote: "Configured multi-currency Stripe checkout, dynamic lens customizer, and integrated Instagram shop feed.",
    },
    ceramics: {
      brand: 'KILN & CLAY',
      tagline: 'Artisanal Studio Bristol',
      headline: 'Organic Forms for Mindful Living',
      desc: 'Small-batch stoneware, tableware, and weekend throwing masterclasses.',
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800&auto=format&fit=crop',
      price: 'Book Workshop — £65',
      accent: 'bg-amber-900',
      bg: 'bg-[#fcf8f2]',
      aidaNote: "Enabled online workshop booking calendar with instant attendee confirmation and reminder emails.",
    },
    dining: {
      brand: 'KAYSUKI',
      tagline: 'Amsterdam Omakase',
      headline: 'Seasonal Japanese Gastronomy',
      desc: 'Exquisite multi-course tasting menus paired with rare artisanal sakes.',
      image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800&auto=format&fit=crop',
      price: 'Reserve Omakase Counter',
      accent: 'bg-emerald-900',
      bg: 'bg-[#f0f7f3]',
      aidaNote: "Activated live seating zone booking with deposit capture and dietary requirement intake forms.",
    },
    fitness: {
      brand: 'AURA PILATES',
      tagline: 'Holistic Movement London',
      headline: 'Transform Body & Mind',
      desc: 'Reformer pilates sessions, private postural coaching, and wellness memberships.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
      price: 'Intro Pass — £29',
      accent: 'bg-teal-900',
      bg: 'bg-[#f0f9f8]',
      aidaNote: "Integrated membership recurring billing and class schedule with automated waitlists.",
    },
  };

  const current = industryData[activeIndustry];

  return (
    <section className="bg-gradient-to-b from-[#062c21] via-[#08382b] to-[#041d16] text-white py-24 relative overflow-hidden" id="aida">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#fed000]" />
            <span>Autonomous Web Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Meet Aida: Your 24/7 AI <br />
            Architect & Business Partner
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/80 font-normal leading-relaxed">
            Unlike traditional site builders that trap you in rigid templates, Aida understands context, writes persuasive marketing copy, connects payment systems, and adapts through conversation.
          </p>
        </div>

        {/* 2-Column Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive Workflow Steps & Action */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    activeStep === idx
                      ? 'bg-emerald-950/90 border-emerald-400/80 shadow-lg'
                      : 'bg-emerald-950/30 border-emerald-900/40 hover:bg-emerald-950/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        activeStep === idx ? 'bg-[#fed000] text-slate-950' : 'bg-emerald-800 text-emerald-300'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className="font-extrabold text-sm sm:text-base text-white">{step.title}</span>
                    </div>
                    {activeStep === idx && <Sparkles className="w-4 h-4 text-[#fed000]" />}
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-200/80 mt-1.5 pl-9 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onStartBuilding}
                className="bg-[#fed000] hover:bg-[#eab308] active:scale-98 text-slate-950 font-black px-7 py-3.5 rounded-2xl text-sm sm:text-base flex items-center gap-2 shadow-xl cursor-pointer transition-all"
                id="aida-try-now-btn"
              >
                <span>Build with Aida Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenChat}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-2xl text-sm sm:text-base transition-all cursor-pointer flex items-center gap-2"
                id="aida-ask-chat-btn"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat with Specialist</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Device with Multiple Industries */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Industry selector pills */}
            <div className="flex items-center gap-2 bg-emerald-950/80 p-1.5 rounded-2xl border border-emerald-800/60 mb-6 shadow-md">
              {(['eyewear', 'ceramics', 'dining', 'fitness'] as const).map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setActiveIndustry(ind)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                    activeIndustry === ind
                      ? 'bg-emerald-500 text-slate-950 shadow-xs'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>

            {/* Simulated Live Device */}
            <div className="w-full max-w-sm sm:max-w-md bg-[#121815] rounded-[36px] p-4 shadow-2xl border-4 border-[#253930] relative">
              {/* Notch */}
              <div className="w-24 h-3.5 bg-[#253930] rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-700 mr-2"></div>
              </div>

              {/* Screen */}
              <div className={`${current.bg} text-slate-900 rounded-[24px] overflow-hidden shadow-inner`}>
                
                {/* Mini Top Bar */}
                <div className="px-4 py-2 bg-white border-b border-stone-200 flex items-center justify-between text-xs">
                  <span className="font-black tracking-wider uppercase font-serif text-xs">{current.brand}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                    Live Preview
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-4 text-center">
                  <span className="text-[9px] uppercase tracking-widest text-stone-500 font-bold block mb-1">
                    {current.tagline}
                  </span>
                  <h4 className="text-lg font-serif font-black text-stone-900 tracking-tight leading-snug">
                    {current.headline}
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-1 max-w-[240px] mx-auto leading-relaxed">
                    {current.desc}
                  </p>

                  <div className="my-3 rounded-xl overflow-hidden shadow-md aspect-16/10 bg-stone-200 relative">
                    <img
                      src={current.image}
                      alt={current.brand}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <button className={`${current.accent} text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm`}>
                    {current.price}
                  </button>
                </div>

                {/* AI Assistant Live Inspector Bubble */}
                <div className="p-3 bg-white border-t border-stone-200">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#008a45]">
                      <Sparkles className="w-3.5 h-3.5 text-[#008a45]" />
                      <span>Aida Intelligence Insight</span>
                    </div>
                    <p className="text-[11px] text-stone-700 mt-1 leading-snug">
                      "{current.aidaNote}"
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
