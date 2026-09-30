import React, { useState } from 'react';
import { 
  Globe, 
  ShoppingBag, 
  CalendarCheck, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  Check, 
  CreditCard,
  Clock,
  Send,
  BellRing,
  Heart,
  TrendingUp,
  Search,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface PlatformGrowthSectionProps {
  onStartTrial: () => void;
}

export const PlatformGrowthSection: React.FC<PlatformGrowthSectionProps> = ({
  onStartTrial,
}) => {
  const [activeTab, setActiveTab] = useState<'shop' | 'bookings' | 'seo' | 'email'>('shop');

  return (
    <section className="bg-slate-900 text-white py-24 relative overflow-hidden" id="platform-growth">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scale Without Code</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              An all-in-one platform <br className="hidden sm:inline" />
              engineered to drive revenue.
            </h2>
          </div>

          <div className="space-y-4 max-w-md">
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Activate built-in commerce, scheduling, automated SEO indexing, and customer messaging in minutes.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onStartTrial}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-sm transition-all shadow-lg cursor-pointer"
                id="growth-start-trial-btn"
              >
                Launch Free Trial
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Feature Tabs Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 bg-slate-800/80 p-2 rounded-2xl border border-slate-700/80 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('shop')}
            className={`p-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'shop'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>AI Online Store</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`p-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <CalendarCheck className="w-4 h-4 shrink-0" />
            <span>Smart Bookings</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`p-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'seo'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Search className="w-4 h-4 shrink-0" />
            <span>Autonomous SEO</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('email')}
            className={`p-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'email'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span>Brand Email & CRM</span>
          </button>
        </div>

        {/* Tab Content Canvas */}
        <div className="bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          {activeTab === 'shop' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider">Zero-Friction Checkout</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Sell physical products, digital downloads & subscriptions
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Accept Apple Pay, Google Pay, Klarna, and credit cards with 0% transaction platform fees. Aida automatically writes product descriptions and manages stock levels.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-currency global checkout with automatic tax & VAT calculation
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automated order confirmation and tracking emails sent from your domain
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Abandoned cart recovery triggers to boost conversions by up to 28%
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/90 rounded-xl p-3 text-white">
                    <div className="aspect-square rounded-lg overflow-hidden bg-slate-700 mb-2.5">
                      <img 
                        src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop" 
                        alt="Handmade Ceramic Vase" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="font-bold text-xs">Nordic Stoneware Vase</div>
                    <div className="text-emerald-400 font-extrabold text-xs mt-0.5">£49.00</div>
                    <button className="w-full mt-2 bg-emerald-500 text-slate-950 font-black text-[10px] py-1.5 rounded-lg">
                      1-Click Stripe Pay
                    </button>
                  </div>

                  <div className="bg-slate-800/90 rounded-xl p-4 flex flex-col justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Live Sales Feed</span>
                      <div className="mt-3 space-y-2">
                        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-700/60">
                          <div className="font-bold text-white text-[11px]">London, UK</div>
                          <div className="text-emerald-400 text-[10px] font-semibold">+£148.00 (Apple Pay)</div>
                        </div>
                        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-700/60">
                          <div className="font-bold text-white text-[11px]">Berlin, DE</div>
                          <div className="text-emerald-400 text-[10px] font-semibold">+€89.00 (Klarna)</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-emerald-300 font-semibold pt-2 border-t border-slate-700">
                      0% Platform Commission
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider">Automated Scheduling</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  24/7 Appointment & Table Booking Engine
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Eliminate back-and-forth messaging. Let clients book 1-on-1 consultations, studio workshops, or restaurant tables directly from your site with Google Calendar sync.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automatic calendar sync with Google, Apple, and Outlook
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automated SMS & email reminders to eliminate no-shows
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Upfront deposit capture via Stripe
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
                <div className="bg-slate-800 rounded-xl p-3.5 border border-slate-700">
                  <div className="font-bold text-xs text-white mb-2">Available Consultation Slots</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-emerald-500/10 border border-emerald-500/40 p-2.5 rounded-lg text-emerald-300 font-bold">
                      <div>Strategy Masterclass</div>
                      <div className="text-[10px] text-slate-400 font-normal">Tomorrow • 10:00 AM</div>
                    </div>
                    <div className="bg-slate-700/50 p-2.5 rounded-lg text-slate-200 font-bold">
                      <div>Studio Workshop</div>
                      <div className="text-[10px] text-slate-400 font-normal">Thursday • 2:30 PM</div>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950/60 border border-emerald-800/60 p-3 rounded-xl flex items-center gap-3">
                  <BellRing className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-white">Automated SMS Trigger Active</div>
                    <p className="text-[10px] text-emerald-200">Confirmation + Calendar invite dispatched instantly.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider">Search Engine Dominance</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Autonomous AI SEO & Google Search Indexing
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Aida automatically generates structured schema data, optimized sitemaps, open-graph tags, and keyword-rich headlines to help your business rank at the top of Google.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automatic JSON-LD Schema generation for local businesses
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Auto-generated XML sitemaps submitted to Google Search Console
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI content optimizer with real-time keyword density score
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">google.com/search</span>
                    <span className="text-emerald-400 font-bold">#1 Ranking</span>
                  </div>
                  <div className="font-bold text-sm text-blue-400 hover:underline">
                    Kaysuki Omakase Amsterdam | Artisanal Japanese Tasting Menu
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Experience seasonal omakase dining in central Amsterdam. Book online for intimate counter seating and private sake pairings.
                  </p>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-300">Google Core Web Vitals:</span>
                  <span className="bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded text-[11px]">
                    100 / 100 Grade
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider">Enterprise Communication</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Branded Domain Webmail & AI Email Copilot
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Send emails that look professional and build trust. Includes AI message drafting, DKIM/SPF anti-spoofing, and multi-device sync across iPhone, Mac, and Windows.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited aliases (hello@, sales@, billing@yourdomain.com)
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI email summarizer and one-click smart replies
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 99.99% Spam & Phishing filter with TLS 1.3 encryption
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-white">hello@yourbrand.com</span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      Verified DKIM
                    </span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg text-xs text-slate-300 font-mono">
                    "Thank you for contacting us! Your booking is confirmed for tomorrow evening. Looking forward to hosting you."
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
