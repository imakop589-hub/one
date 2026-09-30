import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Star, 
  CheckCircle2, 
  Server, 
  Mail, 
  Lock, 
  TrendingUp, 
  Sparkles, 
  Check, 
  Copy, 
  PhoneCall, 
  ShoppingBag, 
  CreditCard, 
  Laptop, 
  Shield, 
  Clock, 
  ArrowUpRight, 
  MessageSquare, 
  Headphones, 
  Users, 
  DollarSign, 
  Award, 
  Timer, 
  RefreshCw,
  Palette,
  Briefcase,
  Layers,
  ChevronRight
} from 'lucide-react';

interface GoDaddyBatchProps {
  onNavigate: (view: any) => void;
  onOpenPricing?: () => void;
  onSearchDomain?: (query: string) => void;
  copiedSample: string | null;
  onCopyFeedback: (sampleNum: number, sampleTitle: string) => void;
  selectedSample: string;
}

export const GoDaddyHeroBatch: React.FC<GoDaddyBatchProps> = ({
  onNavigate,
  onOpenPricing,
  onSearchDomain,
  copiedSample,
  onCopyFeedback,
  selectedSample
}) => {
  // Sample 16 State (Mega Domain Search)
  const [s16Query, setS16Query] = useState('');
  const [s16Tld, setS16Tld] = useState('.com');

  // Sample 17 State (GoDaddy Airo AI prompt)
  const [s17Prompt, setS17Prompt] = useState('Organic specialty coffee roaster in Lahore');
  const [s17Generating, setS17Generating] = useState(false);
  const [s17Result, setS17Result] = useState<string | null>(null);

  // Sample 22 State (Commerce POS Calculator)
  const [monthlySales, setMonthlySales] = useState(15000);

  // Sample 25 State (Domain Appraisal)
  const [appraiseDomain, setAppraiseDomain] = useState('cloudtech.com');
  const [appraisalValue, setAppraisalValue] = useState<string>('$3,850');

  // Sample 28 State (Brand Logo Preview)
  const [brandName, setBrandName] = useState('Apex Digital');
  const [brandColor, setBrandColor] = useState('#008a45');

  const handleS17Generate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!s17Prompt.trim()) return;
    setS17Generating(true);
    setTimeout(() => {
      setS17Generating(false);
      setS17Result(`${s17Prompt.split(' ')[0].toLowerCase()}roasters.com`);
    }, 800);
  };

  const handleAppraise = (e: React.FormEvent) => {
    e.preventDefault();
    const len = appraiseDomain.length;
    const est = (len < 10 ? 2500 + len * 350 : 850 + len * 95);
    setAppraisalValue(`$${est.toLocaleString()}`);
  };

  return (
    <>
      {/* =========================================================================
          SAMPLE 16: GODADDY CLASSIC MEGA DOMAIN SEARCH & $0.99 POPULAR TLD BAR
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample16') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-16-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#008a45] text-white font-black flex items-center justify-center text-sm shadow-xs">
                16
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 16: GoDaddy Classic Mega Domain Search</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    GoDaddy Iconic
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy's signature hero: Massive domain search engine, live extension pills ($0.99 .store, $4.99 .com), and instant 60s setup badge.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(16, "GoDaddy Classic Mega Domain Search")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 16' ? 'Copied Prompt!' : 'Select Sample 16'}</span>
            </button>
          </div>

          <div className="relative bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-200">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              
              <div className="inline-flex items-center gap-2 bg-[#fed000] text-slate-950 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider shadow-xs">
                <span>🔥 GoDaddy Mega Promo • .COM Only $4.99 1st Year</span>
              </div>

              <div className="space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                  It all starts with the perfect domain name.
                </h1>
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  Search millions of domains, lock down your brand name, and launch your business with award-winning 24/7 human guidance.
                </p>
              </div>

              {/* Big GoDaddy Style Search Box */}
              <div className="max-w-3xl mx-auto bg-white p-2.5 rounded-2xl sm:rounded-full border-2 border-slate-900 shadow-xl flex flex-col sm:flex-row items-center gap-2">
                <div className="flex items-center gap-3 pl-4 w-full sm:w-auto flex-1">
                  <Search className="w-6 h-6 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={s16Query}
                    onChange={(e) => setS16Query(e.target.value)}
                    placeholder="Type the domain you want (e.g. mynewbrand.com)..."
                    className="w-full text-base sm:text-lg font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none bg-transparent"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <select
                    value={s16Tld}
                    onChange={(e) => setS16Tld(e.target.value)}
                    className="bg-slate-100 font-bold text-sm text-slate-800 rounded-xl sm:rounded-full px-3 py-3 border border-slate-300 focus:outline-none cursor-pointer"
                  >
                    <option value=".com">.com ($4.99)</option>
                    <option value=".store">.store ($0.99)</option>
                    <option value=".online">.online ($0.99)</option>
                    <option value=".pk">.pk ($8.99)</option>
                    <option value=".ai">.ai ($69.99)</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      if (onSearchDomain) onSearchDomain(s16Query || 'mybrand' + s16Tld);
                      else onNavigate('domains');
                    }}
                    className="bg-[#008a45] hover:bg-[#007038] text-white font-black px-8 py-3.5 rounded-xl sm:rounded-full text-base transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* TLD Pricing Chips */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs pt-2">
                <span className="font-bold text-slate-500 uppercase">Popular Extensions:</span>
                <span className="bg-white border border-slate-300 px-3 py-1 rounded-full font-bold text-slate-900 shadow-xs">
                  .COM <span className="text-[#008a45]">$4.99</span>
                </span>
                <span className="bg-white border border-slate-300 px-3 py-1 rounded-full font-bold text-slate-900 shadow-xs">
                  .STORE <span className="text-[#008a45]">$0.99</span>
                </span>
                <span className="bg-white border border-slate-300 px-3 py-1 rounded-full font-bold text-slate-900 shadow-xs">
                  .ONLINE <span className="text-[#008a45]">$0.99</span>
                </span>
                <span className="bg-white border border-slate-300 px-3 py-1 rounded-full font-bold text-slate-900 shadow-xs">
                  .AI <span className="text-[#008a45]">$69.99</span>
                </span>
                <span className="bg-white border border-slate-300 px-3 py-1 rounded-full font-bold text-slate-900 shadow-xs">
                  .PK <span className="text-[#008a45]">$8.99</span>
                </span>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-8 pt-4 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#008a45]" />
                  <span>Free Privacy Protection Forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>4.7/5 Stars on Trustpilot (85,000+ Reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-blue-600" />
                  <span>24/7 Human Phone & Chat Support</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 17: GODADDY AIRO™ - AI BUSINESS LAUNCHER HERO
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample17') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-17-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                17
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 17: GoDaddy Airo™ AI Business Launchpad</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                    GoDaddy Airo™
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy Airo style: Type your business idea in natural language, watch AI instantly generate your domain, logo, website, and branded email.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(17, "GoDaddy Airo AI Business Launchpad")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 17' ? 'Copied Prompt!' : 'Select Sample 17'}</span>
            </button>
          </div>

          <div className="relative bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 text-white py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-800">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3.5 py-1 rounded-full text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Powered by Hostxeon Airo™ AI Technology</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12]">
                    Bring your idea online in seconds with GoDaddy AI.
                  </h1>
                  <p className="text-base text-slate-300 font-medium leading-relaxed max-w-xl">
                    Just describe your business. Our AI instantly drafts your custom website, finds matching domain names, designs your logo, and writes your marketing emails.
                  </p>
                </div>

                {/* Interactive AI Prompt Generator */}
                <form onSubmit={handleS17Generate} className="bg-slate-900/90 p-2 rounded-2xl border border-purple-500/40 shadow-2xl flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={s17Prompt}
                    onChange={(e) => setS17Prompt(e.target.value)}
                    placeholder="e.g. Handmade ceramic pottery studio in Dallas"
                    className="flex-1 bg-transparent px-4 py-3 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={s17Generating}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-purple-600/30"
                  >
                    {s17Generating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Launch with AI</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400" /> No coding required</span>
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400" /> Free logo generator</span>
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400" /> 100% Mobile Ready</span>
                </div>
              </div>

              {/* Right: AI Output Mockup Card */}
              <div className="lg:col-span-5">
                <div className="bg-slate-900 rounded-3xl p-6 border border-purple-500/30 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="text-purple-300 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      GoDaddy Airo™ Live Pack
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono text-[10px]">
                      READY IN 28s
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="text-slate-400 text-[10px]">AI Suggested Domain</div>
                        <div className="font-bold text-white font-mono mt-0.5">{s17Result || 'lahorecoffeeroasters.com'}</div>
                      </div>
                      <span className="text-emerald-400 font-bold">$4.99/yr</span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="text-slate-400 text-[10px]">Auto-Generated Storefront</div>
                        <div className="font-bold text-white mt-0.5">3-Page Responsive Website</div>
                      </div>
                      <span className="text-purple-400 font-bold">Included</span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="text-slate-400 text-[10px]">Professional Email</div>
                        <div className="font-bold text-white font-mono mt-0.5">hello@{s17Result || 'lahorecoffee.com'}</div>
                      </div>
                      <span className="text-purple-400 font-bold">Free Trial</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenPricing}
                    className="w-full bg-[#008a45] hover:bg-[#007038] text-white font-black py-3 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Claim Your AI Business Kit ($1.99/mo)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 18: GODADDY $1.99 ALL-IN-ONE STARTER BUNDLE HERO
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample18') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-18-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
                18
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 18: GoDaddy $1.99 All-In-One Starter Bundle</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                    High Conversion
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy's best-selling bundle offer: Domain + Fast NVMe Hosting + Free Professional Email + SSL for just $1.99/month.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(18, "GoDaddy $1.99 All-In-One Starter Bundle")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 18' ? 'Copied Prompt!' : 'Select Sample 18'}</span>
            </button>
          </div>

          <div className="relative bg-white py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-200">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-[#fed000] text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase">
                  <span>⚡ GoDaddy Starter Pack • Save 75%</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
                    Everything you need to get online for just $1.99/mo.
                  </h1>
                  <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    Get a custom domain, fast NVMe web hosting, branded professional email, and unlimited SSL security all in one simple plan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-slate-800">
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#008a45]" />
                    <span>Free .COM Domain Included</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#008a45]" />
                    <span>Professional Business Email</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#008a45]" />
                    <span>Free Wildcard SSL Security</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#008a45]" />
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={onOpenPricing}
                    className="bg-[#008a45] hover:bg-[#007038] text-white font-black px-8 py-4 rounded-xl text-base transition-all cursor-pointer shadow-lg shadow-emerald-700/20 flex items-center gap-2"
                  >
                    <span>Get Started for $1.99/mo</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('webhosting')}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-6 py-4 rounded-xl text-sm transition-all cursor-pointer"
                  >
                    Compare All Plans
                  </button>
                </div>
              </div>

              {/* Bundle Pricing Card */}
              <div className="lg:col-span-5">
                <div className="bg-slate-950 text-white rounded-3xl p-7 border border-slate-800 shadow-2xl space-y-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#fed000] text-slate-950 font-black text-[10px] px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                    BEST SELLER
                  </div>

                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Web Hosting Starter Bundle</div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-4xl sm:text-5xl font-black text-white">$1.99</span>
                      <span className="text-slate-400 text-sm font-normal">/month</span>
                      <span className="line-through text-slate-500 text-sm">$8.99/mo</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
                    <div className="flex items-center justify-between">
                      <span>Standard 1 Website</span>
                      <span className="font-bold text-white">Included</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>NVMe SSD Storage</span>
                      <span className="font-bold text-emerald-400">25 GB Ultra-Fast</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bandwidth</span>
                      <span className="font-bold text-white">Unmetered</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>1-Click WordPress Install</span>
                      <span className="font-bold text-emerald-400">Ready in 60s</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 text-center">
                    🔒 Risk-free 30-day money-back guarantee. No questions asked.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 19: GODADDY ENTREPRENEUR & SMALL BUSINESS STORY HERO
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample19') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-19-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                19
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 19: GoDaddy Entrepreneur & Small Business Story</span>
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30">
                    Real Creators
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy human-first style: Inspiring artisan entrepreneur split card, live customer revenue counter, and Trustpilot verified seller badge.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(19, "GoDaddy Entrepreneur & Small Business Story")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 19' ? 'Copied Prompt!' : 'Select Sample 19'}</span>
            </button>
          </div>

          <div className="relative bg-gradient-to-br from-teal-50/40 via-white to-slate-50 py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-200">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-900 px-3.5 py-1 rounded-full text-xs font-bold">
                  <Briefcase className="w-3.5 h-3.5 text-teal-700" />
                  <span>Trusted by Over 21 Million Small Businesses Worldwide</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                    Build your dream. Sell everywhere. Grow your business.
                  </h1>
                  <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    Whether you're opening a local bakery, launching an online clothing boutique, or offering consultancy services, GoDaddy gives you the tools to get paid and get noticed.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={onOpenPricing}
                    className="bg-[#008a45] hover:bg-[#007038] text-white font-black px-8 py-4 rounded-xl text-base transition-all cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <span>Start Your Store Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('domains')}
                    className="bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-900 font-bold px-6 py-4 rounded-xl text-sm transition-all cursor-pointer"
                  >
                    Find a Brand Name
                  </button>
                </div>
              </div>

              {/* Entrepreneur Showcase Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4 relative">
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                      MB
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Maya's Artisan Botanicals</h4>
                      <p className="text-xs text-slate-500">Online store launched on Hostxeon</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <div className="text-emerald-700 font-medium">Monthly Revenue</div>
                      <div className="text-lg font-black text-emerald-900 mt-0.5">$24,850</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                      <div className="text-blue-700 font-medium">Store Uptime</div>
                      <div className="text-lg font-black text-blue-900 mt-0.5">99.99%</div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Check className="w-4 h-4 text-[#008a45]" />
                      <span>Accepts Credit Cards & Apple Pay</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Check className="w-4 h-4 text-[#008a45]" />
                      <span>Automated Shipping & Tax Tracking</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 20: GODADDY SUPER BOWL / MEGA PROMO COUNTDOWN SALE HERO
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample20') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-20-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#fed000] text-slate-950 font-black flex items-center justify-center text-sm shadow-xs border border-slate-900">
                20
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 20: GoDaddy Mega Promo & Countdown Sale</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                    Mega Promo
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy high-energy sale style: Big bold yellow badges, 75% OFF flash discount, live countdown timer, and 1-click coupon code activation.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(20, "GoDaddy Mega Promo & Countdown Sale")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 20' ? 'Copied Prompt!' : 'Select Sample 20'}</span>
            </button>
          </div>

          <div className="relative bg-slate-950 text-white py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-800 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
              
              <div className="inline-flex items-center gap-3 bg-[#fed000] text-slate-950 px-5 py-2 rounded-full font-black text-xs uppercase tracking-wider shadow-lg">
                <Timer className="w-4 h-4 text-slate-950" />
                <span>LIMITED TIME FLASH SALE • CODE: FLASH75 APPLIED</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Launch your website for only <span className="text-[#fed000]">$1.49/mo</span>.
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl mx-auto font-medium">
                Save 75% on our premium cloud hosting with free .com domain, free SSL certificate, and unmetered bandwidth.
              </p>

              {/* Countdown Clock Display */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl w-20 text-center">
                  <div className="text-2xl font-black text-[#fed000]">08</div>
                  <div className="text-[10px] text-slate-400 uppercase">Hours</div>
                </div>
                <span className="text-2xl font-black text-slate-600">:</span>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl w-20 text-center">
                  <div className="text-2xl font-black text-[#fed000]">42</div>
                  <div className="text-[10px] text-slate-400 uppercase">Mins</div>
                </div>
                <span className="text-2xl font-black text-slate-600">:</span>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl w-20 text-center">
                  <div className="text-2xl font-black text-[#fed000]">19</div>
                  <div className="text-[10px] text-slate-400 uppercase">Secs</div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={onOpenPricing}
                  className="bg-[#008a45] hover:bg-[#007038] text-white font-black px-10 py-4 rounded-full text-base transition-all cursor-pointer shadow-xl flex items-center gap-2 hover:scale-105"
                >
                  <span>Claim 75% Discount Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs text-slate-400 pt-2">
                ✓ 30-Day Money Back • Free Domain Name • 24/7 Human Phone Support
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 21: GODADDY MANAGED WORDPRESS PRO WITH 1-CLICK STAGING
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample21') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-21-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-700 text-white font-black flex items-center justify-center text-sm shadow-xs">
                21
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 21: GoDaddy Managed WordPress Pro</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                    WordPress
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy Managed WordPress style: Automatic plugin updates, 1-click staging sandboxes, daily cloud backups, and LiteSpeed performance caching.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(21, "GoDaddy Managed WordPress Pro")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 21' ? 'Copied Prompt!' : 'Select Sample 21'}</span>
            </button>
          </div>

          <div className="relative bg-gradient-to-b from-blue-50/50 via-white to-slate-50 py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-200">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1 rounded-full text-xs font-bold">
                  <Globe className="w-3.5 h-3.5 text-blue-700" />
                  <span>GoDaddy Optimized Managed WordPress</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                    Managed WordPress that takes care of everything for you.
                  </h1>
                  <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    We handle daily backups, software & security patches, and server caching so you can focus 100% on growing your content and sales.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('wordpress')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-xl text-base transition-all cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <span>Start WordPress ($2.49/mo)</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={onOpenPricing}
                    className="bg-white border border-slate-300 text-slate-800 font-bold px-6 py-4 rounded-xl text-sm transition-all cursor-pointer"
                  >
                    Explore Features
                  </button>
                </div>
              </div>

              {/* Managed WP Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                    <span className="font-bold text-slate-900">WordPress Health & Security</span>
                    <span className="text-[#008a45] font-bold">100% Fully Managed</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                      <span className="font-medium text-slate-700">Auto WordPress Core Updates</span>
                      <span className="text-[#008a45] font-bold">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                      <span className="font-medium text-slate-700">Daily Cloud Backups (90 Days)</span>
                      <span className="text-[#008a45] font-bold">1-Click Restore</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                      <span className="font-medium text-slate-700">1-Click Staging Environment</span>
                      <span className="text-blue-600 font-bold">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                      <span className="font-medium text-slate-700">LiteSpeed Object Caching</span>
                      <span className="text-[#008a45] font-bold">3.2x Boost</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 22: GODADDY COMMERCE & POINT OF SALE (POS) HERO
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample22') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-22-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                22
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 22: GoDaddy Commerce & Point of Sale (POS)</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    E-Commerce POS
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy Commerce style: Sell in person and online with unified inventory, lowest 2.3% flat card fees, and instant payouts.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(22, "GoDaddy Commerce & Point of Sale")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 22' ? 'Copied Prompt!' : 'Select Sample 22'}</span>
            </button>
          </div>

          <div className="relative bg-white py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-200">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-bold">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                  <span>GoDaddy Commerce • Industry-Lowest 2.3% Card Fees</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                    Sell anywhere: in person, online, and on social media.
                  </h1>
                  <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    Accept payments everywhere with one unified dashboard. Keep more of what you earn with transparent 2.3% transaction fees and zero monthly hardware rental.
                  </p>
                </div>

                {/* Interactive Fee Slider */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 max-w-lg">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Monthly Sales Volume:</span>
                    <span className="text-[#008a45] font-mono text-sm">${monthlySales.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={monthlySales}
                    onChange={(e) => setMonthlySales(Number(e.target.value))}
                    className="w-full accent-[#008a45] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>Hostxeon Fee: 2.3%</span>
                    <span className="text-[#008a45] font-bold">You Keep: ${(monthlySales * 0.977).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenPricing}
                    className="bg-[#008a45] hover:bg-[#007038] text-white font-black px-8 py-4 rounded-xl text-base transition-all cursor-pointer shadow-md"
                  >
                    Start Selling with GoDaddy POS
                  </button>
                </div>
              </div>

              {/* POS Hardware Mockup Card */}
              <div className="lg:col-span-5">
                <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="font-bold text-slate-300">Live POS Terminal</span>
                    <span className="text-emerald-400 font-mono text-[10px] uppercase">Synced Everywhere</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="text-xs text-slate-400">Recent Customer Transaction</div>
                    <div className="text-2xl font-black text-white">$142.50</div>
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Tap to Pay on iPhone Approved
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Online Store</div>
                      <div className="font-bold text-white mt-0.5">84 Orders Today</div>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Retail Counter</div>
                      <div className="font-bold text-white mt-0.5">38 Walk-in Taps</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 23: GODADDY PROFESSIONAL BUSINESS EMAIL & MICROSOFT 365 HERO
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample23') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-23-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-500 text-white font-black flex items-center justify-center text-sm shadow-xs">
                23
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 23: GoDaddy Professional Business Email</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                    Business Email
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy Email style: Build instant trust with matching domain email (you@yourcompany.com), Microsoft 365 sync, and 99.9% spam defense.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(23, "GoDaddy Professional Business Email")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 23' ? 'Copied Prompt!' : 'Select Sample 23'}</span>
            </button>
          </div>

          <div className="relative bg-gradient-to-br from-blue-50/40 via-white to-slate-50 py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-200">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1 rounded-full text-xs font-bold">
                  <Mail className="w-3.5 h-3.5 text-blue-700" />
                  <span>Branded Email by GoDaddy & Microsoft 365</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                    Customers are 9x more likely to choose a business with branded email.
                  </h1>
                  <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    Replace your generic @gmail.com with your professional <strong className="text-slate-900">you@yourcompany.com</strong>. Complete with 50GB storage, calendar sync, and advanced spam filtering.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('domains')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-xl text-base transition-all cursor-pointer shadow-md"
                  >
                    Get Business Email ($1.99/mo)
                  </button>
                </div>
              </div>

              {/* Email Inbox Preview Mockup */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-3">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-xs">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="font-bold text-slate-800 ml-2 font-mono">ceo@yourbusiness.com</span>
                  </div>

                  <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs space-y-1">
                    <div className="font-bold text-slate-900 flex justify-between">
                      <span>Enterprise Contract Signed</span>
                      <span className="text-[10px] text-slate-500">10:42 AM</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      "Hi Sarah, we just confirmed the $15,000 project proposal sent from your company email."
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-semibold">
                    <span>✓ 99.9% Spam & Virus Filter</span>
                    <span>✓ 50 GB Cloud Mailbox</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 24: GODADDY WEB SECURITY & TRUST SEAL HERO
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample24') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-24-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-black flex items-center justify-center text-sm shadow-xs">
                24
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 24: GoDaddy Web Security & Trust Seal</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Security
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy Security style: Automated malware scanner, continuous DDoS protection, 256-bit wildcard SSL, and verified trust seal.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(24, "GoDaddy Web Security & Trust Seal")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 24' ? 'Copied Prompt!' : 'Select Sample 24'}</span>
            </button>
          </div>

          <div className="relative bg-slate-950 text-white py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-800">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-bold">
                  <Shield className="w-3.5 h-3.5" />
                  <span>GoDaddy Ultimate Web Security Suite</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                    Protect your site and keep your visitors safe.
                  </h1>
                  <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                    Guard your site against hackers, malware, and data breaches. Includes automatic daily scans, guaranteed malware cleanup, and free 256-bit SSL encryption.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenPricing}
                    className="bg-[#008a45] hover:bg-[#007038] text-white font-black px-8 py-4 rounded-xl text-base transition-all cursor-pointer shadow-lg shadow-emerald-700/20"
                  >
                    Secure Your Site ($4.99/mo)
                  </button>
                </div>
              </div>

              {/* Security Shield Card */}
              <div className="lg:col-span-5">
                <div className="bg-slate-900 rounded-3xl p-6 border border-emerald-500/30 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      GoDaddy Verified Trust Seal
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
                      CLEAN & SAFE
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                      <span className="text-slate-300">Daily Malware Scanner</span>
                      <span className="text-emerald-400 font-bold">0 Threats Found</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                      <span className="text-slate-300">Firewall (WAF)</span>
                      <span className="text-emerald-400 font-bold">Blocking 1,420 attacks/hr</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                      <span className="text-slate-300">SSL Certificate Status</span>
                      <span className="text-emerald-400 font-bold">Active 256-bit Wildcard</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 25: GODADDY DOMAIN BROKER & APPRAISAL VALUE ENGINE HERO
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample25') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-25-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                25
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 25: GoDaddy Domain Broker & Appraisal Engine</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                    Appraisal
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy Appraisal & Broker style: Instant domain valuation algorithm, acquisition brokers for already-taken domains, and live auction bids.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(25, "GoDaddy Domain Broker & Appraisal Engine")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 25' ? 'Copied Prompt!' : 'Select Sample 25'}</span>
            </button>
          </div>

          <div className="relative bg-gradient-to-b from-amber-50/40 via-white to-slate-50 py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-200">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold">
                  <DollarSign className="w-3.5 h-3.5 text-amber-700" />
                  <span>Free GoDaddy Domain Appraisal Tool</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                    Find out what your domain name is worth.
                  </h1>
                  <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    Get an instant, data-backed valuation calculated from over 20 years of historical sales records and machine learning market metrics.
                  </p>
                </div>

                {/* Interactive Appraisal Search Form */}
                <form onSubmit={handleAppraise} className="flex gap-2 max-w-lg">
                  <input
                    type="text"
                    value={appraiseDomain}
                    onChange={(e) => setAppraiseDomain(e.target.value)}
                    placeholder="Enter any domain (e.g. startup.com)"
                    className="flex-1 bg-white px-4 py-3.5 rounded-xl border border-slate-300 font-bold text-sm focus:outline-none focus:border-slate-900 shadow-xs"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 py-3.5 rounded-xl text-sm transition-all cursor-pointer shadow-md"
                  >
                    Value Domain
                  </button>
                </form>
              </div>

              {/* Appraisal Result Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                    <span className="font-bold text-slate-800">Estimated Market Value</span>
                    <span className="text-amber-600 font-bold">GoDaddy Verified</span>
                  </div>

                  <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 text-center space-y-1">
                    <div className="text-xs text-amber-800 font-mono font-bold">{appraiseDomain}</div>
                    <div className="text-3xl sm:text-4xl font-black text-slate-900">{appraisalValue}</div>
                    <div className="text-[11px] text-slate-500">Comparable sales average in this category</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('domains')}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Hire a GoDaddy Domain Broker to Buy It
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 26: GODADDY 24/7 HUMAN PHONE & LIVE CHAT SUPPORT HERO
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample26') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-26-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#008a45] text-white font-black flex items-center justify-center text-sm shadow-xs">
                26
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 26: GoDaddy 24/7 Human Phone & Live Chat</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Human Support
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy Guides style: "Call or chat with a real human in under 2 minutes." Award-winning customer care backing your online journey.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(26, "GoDaddy 24/7 Human Phone & Live Chat")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 26' ? 'Copied Prompt!' : 'Select Sample 26'}</span>
            </button>
          </div>

          <div className="relative bg-slate-900 text-white py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-800">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-[#008a45]/20 text-emerald-400 border border-[#008a45]/30 px-3.5 py-1 rounded-full text-xs font-bold">
                  <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Award-Winning GoDaddy Guides By Your Side</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                    We're here for you with real humans 24/7.
                  </h1>
                  <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                    Got a question about pointing DNS, configuring email, or speeding up your website? Pick up the phone or open live chat—we answer in under 2 minutes.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="tel:+18005550199"
                    className="bg-[#008a45] hover:bg-[#007038] text-white font-black px-7 py-4 rounded-xl text-sm transition-all cursor-pointer shadow-lg flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call a Guide: +1 (800) 555-0199</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-4 rounded-xl text-sm transition-all cursor-pointer flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Start Live Chat</span>
                  </button>
                </div>
              </div>

              {/* Support Metric Card */}
              <div className="lg:col-span-5">
                <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="text-white font-bold">Guide Queue Status</span>
                    <span className="text-emerald-400 font-mono flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      ONLINE NOW
                    </span>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                    <div className="text-xs text-slate-400">Average Phone Wait Time</div>
                    <div className="text-3xl font-black text-emerald-400">1 min 42 sec</div>
                    <div className="text-[11px] text-slate-400">100% in-house hosting & domain experts</div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>✓ Urdu & English Support</span>
                    <span>✓ Free Website Migration Help</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 27: GODADDY DIGITAL MARKETING & SEO ACCELERATOR HERO
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample27') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-27-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                27
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 27: GoDaddy Digital Marketing & SEO</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    Marketing Suite
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy Digital Marketing style: Automated Google SEO ranking booster, social media scheduler, and high-converting email newsletter creator.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(27, "GoDaddy Digital Marketing & SEO")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 27' ? 'Copied Prompt!' : 'Select Sample 27'}</span>
            </button>
          </div>

          <div className="relative bg-gradient-to-br from-indigo-50/40 via-white to-slate-50 py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-200">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-900 px-3.5 py-1 rounded-full text-xs font-bold">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-700" />
                  <span>GoDaddy Digital Marketing Suite</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                    Get found on Google and turn visitors into buyers.
                  </h1>
                  <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    Our all-in-one marketing dashboard optimizes your search engine ranking, posts to Facebook & Instagram simultaneously, and sends automated customer newsletters.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenPricing}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 py-4 rounded-xl text-base transition-all cursor-pointer shadow-md"
                  >
                    Boost Your Traffic ($3.99/mo)
                  </button>
                </div>
              </div>

              {/* Marketing Dashboard Mockup Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                    <span className="font-bold text-slate-900">Traffic & Google Ranking</span>
                    <span className="text-emerald-600 font-bold">+184% This Month</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-slate-900">Google SEO Health Score</div>
                        <div className="text-[10px] text-slate-500">Keywords on Page 1: 14</div>
                      </div>
                      <span className="text-lg font-black text-emerald-600">96/100</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-slate-900">Email Campaign Open Rate</div>
                        <div className="text-[10px] text-slate-500">Industry avg: 18%</div>
                      </div>
                      <span className="text-lg font-black text-indigo-600">38.4%</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 28: GODADDY FREE AI LOGO & BRAND KIT STUDIO HERO
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample28') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-28-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-pink-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                28
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 28: GoDaddy Free AI Logo & Brand Kit</span>
                  <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full border border-pink-500/30">
                    Logo Maker
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy Logo Studio style: Type brand name, choose color palette, preview instant vector logo variations and business card mockups.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(28, "GoDaddy Free AI Logo & Brand Kit")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 28' ? 'Copied Prompt!' : 'Select Sample 28'}</span>
            </button>
          </div>

          <div className="relative bg-white py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-200">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-900 px-3.5 py-1 rounded-full text-xs font-bold">
                  <Palette className="w-3.5 h-3.5 text-pink-700" />
                  <span>100% Free Custom Logo Generator</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                    Design a professional brand logo in 60 seconds.
                  </h1>
                  <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    No design skills needed. Our AI brand studio creates hundreds of sharp vector logo concepts customized with your company colors and typography.
                  </p>
                </div>

                {/* Brand Name Input Field */}
                <div className="flex gap-2 max-w-md">
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Enter your brand name"
                    className="flex-1 bg-slate-50 px-4 py-3 rounded-xl border border-slate-300 font-bold text-sm focus:outline-none focus:border-slate-900"
                  />
                  <button
                    type="button"
                    onClick={onOpenPricing}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-black px-6 py-3 rounded-xl text-sm transition-all cursor-pointer shadow-md"
                  >
                    Make My Logo
                  </button>
                </div>
              </div>

              {/* Logo Preview Card */}
              <div className="lg:col-span-5">
                <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4 text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-3xl font-black shadow-lg">
                    {brandName.charAt(0) || 'A'}
                  </div>

                  <div>
                    <h4 className="text-xl font-black tracking-tight text-white">{brandName || 'Your Brand'}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">High-Resolution Vector SVG Ready</p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center justify-center gap-4">
                    <span>✓ Free Download</span>
                    <span>✓ Commercial License</span>
                    <span>✓ Social Media Icons</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 29: GODADDY PRO & RESELLER AGENCY HUB HERO
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample29') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-29-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-slate-800 text-white font-black flex items-center justify-center text-sm shadow-xs border border-slate-700">
                29
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 29: GoDaddy Pro & Reseller Agency Hub</span>
                  <span className="text-[10px] bg-slate-500/20 text-slate-300 px-2 py-0.5 rounded-full border border-slate-500/30">
                    GoDaddy Pro
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy Pro style: Built for web designers & digital agencies. Manage 50+ client websites, white-label client billing, and bulk discounts.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(29, "GoDaddy Pro & Reseller Agency Hub")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 29' ? 'Copied Prompt!' : 'Select Sample 29'}</span>
            </button>
          </div>

          <div className="relative bg-slate-900 text-white py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-800">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-slate-800 text-emerald-400 border border-slate-700 px-3.5 py-1 rounded-full text-xs font-bold">
                  <Users className="w-3.5 h-3.5" />
                  <span>GoDaddy Pro for Web Designers & Agencies</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                    Manage all your client websites from one single dashboard.
                  </h1>
                  <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                    Perform bulk plugin updates in 1 click, monitor uptime alerts, and send white-label client invoices under your own agency brand name.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('reseller')}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-4 rounded-xl text-base transition-all cursor-pointer shadow-lg"
                  >
                    Join GoDaddy Pro Free
                  </button>
                </div>
              </div>

              {/* Agency Multi-Client Card */}
              <div className="lg:col-span-5">
                <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="font-bold text-white">Agency Central Portal</span>
                    <span className="text-emerald-400 font-mono">42 Client Sites Healthy</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white">ApexLawFirm.com</div>
                        <div className="text-[10px] text-slate-400">All plugins updated</div>
                      </div>
                      <span className="text-emerald-400 font-bold">99.99%</span>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white">BoutiqueBakery.pk</div>
                        <div className="text-[10px] text-slate-400">Automated backup verified</div>
                      </div>
                      <span className="text-emerald-400 font-bold">99.98%</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 30: GODADDY HIGH-PERFORMANCE NVME CLOUD VPS HERO
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample30') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-30-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                30
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 30: GoDaddy High-Performance NVMe Cloud VPS</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                    Cloud VPS
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  GoDaddy VPS style: Dedicated NVMe storage slices, full root access, Plesk/cPanel 1-click licenses, and high-memory CPU for resource-heavy workloads.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCopyFeedback(30, "GoDaddy High-Performance NVMe Cloud VPS")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSample === 'Sample 30' ? 'Copied Prompt!' : 'Select Sample 30'}</span>
            </button>
          </div>

          <div className="relative bg-slate-950 text-white py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-800">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-bold">
                  <Server className="w-3.5 h-3.5" />
                  <span>Dedicated KVM Cloud VPS Hosting</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                    High-power cloud VPS with dedicated resources.
                  </h1>
                  <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                    Total control with full root access, SSD NVMe storage, optional cPanel or Plesk control panels, and automated snapshot backups.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('vps')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-xl text-base transition-all cursor-pointer shadow-lg shadow-blue-600/20"
                  >
                    Configure Cloud VPS ($4.99/mo)
                  </button>
                </div>
              </div>

              {/* VPS Hardware Card */}
              <div className="lg:col-span-5">
                <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="font-bold text-white">GoDaddy Cloud Standard VPS</span>
                    <span className="text-emerald-400 font-mono">$4.99/mo</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">CPU Cores</div>
                      <div className="text-base font-bold text-white mt-1">2 vCPU Dedicated</div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">RAM Memory</div>
                      <div className="text-base font-bold text-white mt-1">4 GB DDR5</div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">NVMe Storage</div>
                      <div className="text-base font-bold text-white mt-1">80 GB SSD</div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">OS Choice</div>
                      <div className="text-base font-bold text-white mt-1">Ubuntu / Alma</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
