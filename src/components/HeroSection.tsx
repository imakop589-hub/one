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
  ChevronRight,
  Headphones,
  Zap,
  Server
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
      title: "Maya's Artisan Botanicals",
      category: "Handcrafted Skincare & Organic Oils",
      domain: "mayabotanicals.com",
      revenue: "£24,850",
      orders: "1,420 orders/mo",
      uptime: "99.99%",
      rating: "4.9 / 5.0",
      recentOrder: {
        item: "Rosewater Radiance Serum (50ml)",
        price: "£48.00",
        buyer: "Sarah K. from London, UK",
        time: "Just now"
      },
      perks: ["Accepts Apple Pay, Visa & PayPal", "Automated Royal Mail & DHL Shipping", "Mobile-Optimized Checkout"]
    },
    coffee: {
      initials: 'UR',
      title: "Urban Roast Roastery",
      category: "Specialty Coffee Beans & Subscriptions",
      domain: "urbanroastco.com",
      revenue: "£38,400",
      orders: "2,190 orders/mo",
      uptime: "100%",
      rating: "5.0 / 5.0",
      recentOrder: {
        item: "Ethiopian Yirgacheffe Whole Bean (1kg)",
        price: "£34.50",
        buyer: "Marcus L. from Manchester, UK",
        time: "5 mins ago"
      },
      perks: ["Recurring Monthly Subscriptions", "Same-Day Local Roastery Orders", "Zero Platform Transaction Fees"]
    },
    agency: {
      initials: 'DP',
      title: "DevPeak Creative Studio",
      category: "Brand Design & Web Consulting",
      domain: "devpeakstudio.com",
      revenue: "£52,000",
      orders: "18 retainers/mo",
      uptime: "99.99%",
      rating: "4.95 / 5.0",
      recentOrder: {
        item: "Enterprise Brand Identity Package",
        price: "£4,500.00",
        buyer: "Apex Ventures Ltd, Edinburgh",
        time: "15 mins ago"
      },
      perks: ["Client Invoicing & Payment Portal", "Isolated NVMe Staging Environments", "Unlimited Professional Email Inboxes"]
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
      className="bg-white py-12 md:py-16 lg:py-20 border-b border-[#E2E8F0]"
      id="hero-section"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* LEFT COLUMN: Clean High-Trust Hosting Messaging (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust Kicker - Clean unboxed text */}
            <div className="flex items-center gap-2 text-xs md:text-sm text-[#006E37] font-semibold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80">
                <Server className="w-3.5 h-3.5 text-[#008744]" />
                Next-Gen NVMe Cloud Infrastructure
              </span>
              <span className="hidden sm:inline text-slate-300">·</span>
              <span className="hidden sm:inline text-[#475569] font-medium">99.99% Uptime SLA</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-heading text-[32px] md:text-[40px] lg:text-[52px] font-bold text-[#0F172A] tracking-tight leading-[1.15]">
                High-Performance Web Hosting{' '}
                <span className="text-[#008744]">Built for Real Growth.</span>
              </h1>
              <p className="text-base md:text-lg text-[#475569] leading-relaxed font-normal max-w-2xl">
                Experience ultra-fast NVMe storage, free SSL certificates, daily backups, and free domain registration with dedicated 24/7 expert technical support.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleScrollToPricing}
                className="bg-[#008744] hover:bg-[#006E37] text-white font-semibold px-6 py-3.5 rounded-lg text-base transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2 group"
                id="hero-start-free-btn"
              >
                <span>Start Web Hosting from £1.99/mo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleDomainClick}
                className="bg-white border border-[#E2E8F0] hover:border-slate-400 hover:bg-slate-50 text-[#0F172A] font-semibold px-6 py-3.5 rounded-lg text-sm transition-colors cursor-pointer shadow-2xs flex items-center justify-center gap-2"
                id="hero-find-domain-btn"
              >
                <Globe className="w-4 h-4 text-[#008744]" />
                <span>Search Domains</span>
              </button>
            </div>

            {/* Value Proof Badges */}
            <div className="pt-3 border-t border-[#E2E8F0] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-medium text-[#475569]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#008744] shrink-0" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#008744] shrink-0" />
                <span>99.99% Guaranteed Uptime</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Headphones className="w-4 h-4 text-[#008744] shrink-0" />
                <span>24/7 Human Phone & Chat Support</span>
              </div>
            </div>

            {/* Entrepreneur Story Tabs */}
            <div className="pt-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Customer Showcases Powered by Hostxeon:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStory('botanicals')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeStory === 'botanicals'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-[#475569] hover:bg-slate-100 border border-[#E2E8F0]'
                  }`}
                >
                  <Store className="w-3.5 h-3.5 text-amber-500" />
                  <span>Maya's Botanicals (E-Commerce)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStory('coffee')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeStory === 'coffee'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-[#475569] hover:bg-slate-100 border border-[#E2E8F0]'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                  <span>Urban Roast Co. (Subscriptions)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStory('agency')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeStory === 'agency'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-[#475569] hover:bg-slate-100 border border-[#E2E8F0]'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                  <span>DevPeak Studio (Digital Agency)</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Showcase Card & Live Metrics (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E2E8F0] shadow-md space-y-5">
              
              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-[#E2E8F0]">
                <div className="w-12 h-12 rounded-lg bg-[#008744] text-white font-bold text-lg flex items-center justify-center shrink-0">
                  {current.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-[#0F172A] text-base truncate">
                      {current.title}
                    </h4>
                    <span className="bg-emerald-50 text-[#008744] border border-emerald-200 text-xs font-semibold px-2 py-0.5 rounded-full uppercase shrink-0">
                      Active Client
                    </span>
                  </div>
                  <p className="text-xs text-[#475569] font-normal truncate mt-0.5">
                    {current.category}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[#008744] mt-1 font-medium">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{current.domain}</span>
                  </div>
                </div>
              </div>

              {/* Metric Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <div className="text-[#475569] font-medium text-xs flex items-center justify-between">
                    <span>Monthly Volume</span>
                    <TrendingUp className="w-3.5 h-3.5 text-[#008744]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1 tabular-nums">
                    {current.revenue}
                  </div>
                  <div className="text-xs text-[#475569] mt-0.5">
                    {current.orders}
                  </div>
                </div>

                <div className="p-3.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <div className="text-[#475569] font-medium text-xs flex items-center justify-between">
                    <span>Server Uptime</span>
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1 tabular-nums">
                    {current.uptime}
                  </div>
                  <div className="text-xs text-[#475569] mt-0.5 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{current.rating} Verified Rating</span>
                  </div>
                </div>
              </div>

              {/* Verified Order Card */}
              <div className="p-3.5 bg-[#061913] text-white rounded-lg border border-[#061913] text-xs space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    RECENT STORE ACTIVITY
                  </span>
                  <span>{current.recentOrder.time}</span>
                </div>
                <div className="font-semibold text-white text-sm truncate">
                  {current.recentOrder.item}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 pt-0.5">
                  <span className="text-slate-400">{current.recentOrder.buyer}</span>
                  <span className="text-emerald-400 font-bold tabular-nums">{current.recentOrder.price}</span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] text-xs space-y-2">
                {current.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#475569]">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#008744] flex items-center justify-center shrink-0">
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
                className="w-full py-3 px-4 bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Deploy Hosting Infrastructure on Hostxeon</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
