import React, { useState } from 'react';
import { 
  Briefcase, 
  ArrowRight, 
  Check, 
  Star, 
  ShieldCheck, 
  TrendingUp, 
  ShoppingBag, 
  Store, 
  Globe, 
  Sparkles, 
  Clock, 
  CreditCard, 
  ExternalLink,
  ChevronRight,
  Headphones,
  Zap,
  DollarSign
} from 'lucide-react';

interface HeroSectionProps {
  onGenerateWebsite?: (promptData: { career: string; company: string; city: string; mode: string }) => void;
  onOpenPricing?: () => void;
  onNavigate?: (view: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onGenerateWebsite,
  onOpenPricing,
  onNavigate
}) => {
  // Interactive entrepreneur story tabs
  const [activeStory, setActiveStory] = useState<'botanicals' | 'coffee' | 'agency'>('botanicals');

  const stories = {
    botanicals: {
      initials: 'MB',
      gradient: 'from-amber-500 to-rose-500',
      title: "Maya's Artisan Botanicals",
      category: "Handcrafted Skincare & Organic Oils",
      domain: "mayabotanicals.com",
      revenue: "$24,850",
      orders: "1,420 orders/mo",
      uptime: "99.99%",
      rating: "4.9 / 5.0",
      recentOrder: {
        item: "Rosewater Radiance Serum (50ml)",
        price: "$48.00",
        buyer: "Sarah K. from Austin, TX",
        time: "Just now"
      },
      perks: ["Accepts Apple Pay, Visa & PayPal", "Automated DHL & FedEx Shipping", "Mobile-Optimized Checkout"]
    },
    coffee: {
      initials: 'UR',
      gradient: 'from-amber-700 to-yellow-600',
      title: "Urban Roast Roastery",
      category: "Specialty Coffee Beans & Subscriptions",
      domain: "urbanroastco.com",
      revenue: "$38,400",
      orders: "2,190 orders/mo",
      uptime: "100%",
      rating: "5.0 / 5.0",
      recentOrder: {
        item: "Ethiopian Yirgacheffe Whole Bean (1kg)",
        price: "$34.50",
        buyer: "Marcus L. from Seattle, WA",
        time: "1 min ago"
      },
      perks: ["Recurring Monthly Subscriptions", "Same-Day Local Pickup Orders", "Zero Transaction Platform Fees"]
    },
    agency: {
      initials: 'DP',
      gradient: 'from-blue-600 to-teal-500',
      title: "DevPeak Creative Studio",
      category: "Brand Design & Web Consulting",
      domain: "devpeakstudio.com",
      revenue: "$52,000",
      orders: "18 retainers/mo",
      uptime: "99.99%",
      rating: "4.95 / 5.0",
      recentOrder: {
        item: "Enterprise Brand Identity Package",
        price: "$4,500.00",
        buyer: "Nordic Ventures AB, Stockholm",
        time: "12 mins ago"
      },
      perks: ["Client Invoicing & Stripe Portal", "Private Staging Environments", "Unlimited Business Email Inboxes"]
    }
  };

  const current = stories[activeStory];

  const handleScrollToPricing = () => {
    if (onOpenPricing) {
      onOpenPricing();
    } else {
      const pricingSection = document.getElementById('pricing-section') || document.getElementById('home-pricing-cards') || document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      } else if (onNavigate) {
        onNavigate('webhosting');
      }
    }
  };

  const handleDomainClick = () => {
    const searchInput = document.getElementById('domain-search-input');
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      searchInput.focus();
    } else if (onNavigate) {
      onNavigate('domains');
    }
  };

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-br from-teal-50/50 via-white to-slate-50 py-12 sm:py-16 lg:py-20 xl:py-24 border-b border-slate-200"
      id="hero-section"
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-gradient-to-bl from-emerald-100/40 via-teal-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-blue-50/60 via-slate-100/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: HIGH-CONVERTING GODADDY SMALL BUSINESS MESSAGING (7 Cols)
              ========================================================================= */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 bg-teal-100/90 text-teal-900 border border-teal-200/80 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-2xs">
              <Briefcase className="w-4 h-4 text-teal-700 shrink-0" />
              <span>Trusted by Over 21 Million Small Businesses Worldwide</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Build your dream.{' '}
                <span className="text-[#008a45]">Grow your business.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl">
                Whether you're opening a local bakery, launching an online clothing boutique, or scaling freelance consultancy, Hostxeon gives you ultra-fast NVMe hosting, free domain, branded email, and easy tools to get paid and get noticed.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={handleScrollToPricing}
                className="bg-[#008a45] hover:bg-[#007038] text-white font-black px-7 sm:px-8 py-4 rounded-xl text-base transition-all cursor-pointer shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/30 flex items-center justify-center gap-2 group"
                id="hero-start-free-btn"
              >
                <span>Start Your Store for $1.99/mo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleDomainClick}
                className="bg-white border-2 border-slate-300 hover:border-slate-800 text-slate-900 font-bold px-6 py-4 rounded-xl text-sm transition-all cursor-pointer shadow-xs hover:bg-slate-50 flex items-center justify-center gap-2"
                id="hero-find-domain-btn"
              >
                <Globe className="w-4 h-4 text-[#008a45]" />
                <span>Find Your Brand Domain</span>
              </button>
            </div>

            {/* Value Proof Badges */}
            <div className="pt-2 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#008a45] shrink-0" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#008a45] shrink-0" />
                <span>99.99% Guaranteed Uptime</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Headphones className="w-4 h-4 text-[#008a45] shrink-0" />
                <span>24/7 Human Phone & Chat Support</span>
              </div>
            </div>

            {/* Entrepreneur Story Picker Tabs */}
            <div className="pt-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Explore real businesses powered by Hostxeon:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStory('botanicals')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeStory === 'botanicals'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Store className="w-3.5 h-3.5 text-amber-400" />
                  <span>Maya's Botanicals (Store)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStory('coffee')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeStory === 'coffee'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
                  <span>Urban Roast Co. (Food & Subscriptions)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStory('agency')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeStory === 'agency'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  <span>DevPeak Studio (Agency & SaaS)</span>
                </button>
              </div>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: ENTREPRENEUR STORY SHOWCASE CARD & LIVE METRICS (5 Cols)
              ========================================================================= */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5 relative">
              
              {/* Creator Profile Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${current.gradient} text-white font-black text-xl flex items-center justify-center shadow-md shrink-0`}>
                  {current.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-base sm:text-lg truncate">
                      {current.title}
                    </h4>
                    <span className="bg-emerald-100 text-[#008a45] text-[10px] font-black px-2 py-0.5 rounded-full uppercase shrink-0">
                      Live Store
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                    {current.category}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-[#008a45] font-mono mt-1 font-semibold">
                    <Globe className="w-3 h-3" />
                    <span>{current.domain}</span>
                  </div>
                </div>
              </div>

              {/* High-Impact Metric Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-emerald-50/90 rounded-2xl border border-emerald-100">
                  <div className="text-emerald-700 font-semibold text-[11px] flex items-center justify-between">
                    <span>Monthly Revenue</span>
                    <TrendingUp className="w-3.5 h-3.5 text-[#008a45]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">
                    {current.revenue}
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-0.5 font-medium">
                    {current.orders}
                  </div>
                </div>

                <div className="p-3.5 bg-blue-50/90 rounded-2xl border border-blue-100">
                  <div className="text-blue-700 font-semibold text-[11px] flex items-center justify-between">
                    <span>Store Uptime</span>
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-blue-950 mt-1">
                    {current.uptime}
                  </div>
                  <div className="text-[10px] text-blue-700 mt-0.5 font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{current.rating} Verified Rating</span>
                  </div>
                </div>
              </div>

              {/* Real-Time Live Order Ticker */}
              <div className="p-3.5 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-inner text-xs space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    LIVE STORE TICKER
                  </span>
                  <span>{current.recentOrder.time}</span>
                </div>
                <div className="font-bold text-white text-xs sm:text-sm truncate">
                  {current.recentOrder.item}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-300 pt-0.5">
                  <span className="text-slate-400">{current.recentOrder.buyer}</span>
                  <span className="text-emerald-400 font-black font-mono">{current.recentOrder.price}</span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                {current.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#008a45] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Action Button inside card */}
              <button
                type="button"
                onClick={handleScrollToPricing}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Launch a Store Like This on Hostxeon</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
