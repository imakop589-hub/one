import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  Server, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  Cpu, 
  Mail, 
  Lock, 
  Clock, 
  Headphones, 
  ChevronDown, 
  Layers, 
  RefreshCw,
  ExternalLink,
  Activity,
  HardDrive,
  FileText,
  Database,
  MessageSquare,
  Flower2
} from 'lucide-react';
import { AppView } from './Navbar';
import { CartItem } from '../types';
import { DomainSearchStrip } from './DomainSearchStrip';
import { HeroSection } from './HeroSection';
import { TrustpilotProofBar } from './TrustpilotProofBar';
import { CustomerSuccessStories } from './CustomerSuccessStories';

interface HomePageProps {
  onAddToCart: (item: CartItem) => void;
  onOpenLiveChat: () => void;
  onOpenBuilder?: () => void;
  onNavigate: (view: AppView) => void;
  onSearchDomain: (domain: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onAddToCart,
  onOpenLiveChat,
  onOpenBuilder,
  onNavigate,
  onSearchDomain,
}) => {
  const [domainInput, setDomainInput] = useState('');
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [addedPlanId, setAddedPlanId] = useState<string | null>(null);

  const handleDomainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domainInput.trim()) {
      onSearchDomain(domainInput.trim());
    }
  };

  const handleAddPlan = (id: string, name: string, storage: string, monthlyPrice: number, annualPrice: number) => {
    const isAnnual = billingCycle === 'annual';
    const price = isAnnual ? annualPrice * 12 : monthlyPrice;

    onAddToCart({
      id: `${id}-${billingCycle}`,
      type: 'hosting',
      title: name,
      subtitle: `${storage} - High Performance NVMe`,
      price: Number(price.toFixed(2)),
      period: isAnnual ? '1 year' : '1 month',
    });

    setAddedPlanId(id);
    setTimeout(() => setAddedPlanId(null), 2500);
  };

  const faqs = [
    {
      q: 'How fast is Hostxeon compared to standard shared hosting?',
      a: 'Hostxeon is built on 100% pure NVMe Gen4 enterprise solid-state drives and LiteSpeed web servers. Real-world benchmarks show up to 4x faster database queries and page load speeds under 300ms compared to traditional shared hosts.',
    },
    {
      q: 'Do you provide free website and email migration from other hosts?',
      a: 'Yes! Our migration experts will transfer your existing cPanel, WordPress, databases, and emails from GoDaddy, Bluehost, Namecheap, Hostinger, or any other provider with 100% zero downtime at no extra cost.',
    },
    {
      q: 'Is a free domain name included with hosting plans?',
      a: 'Yes, all 1-year and 2-year Web Hosting, WordPress, and Cloud plans include a free 1-year domain registration voucher for popular extensions including .com, .net, .co.uk, and .org.',
    },
    {
      q: 'What is your 30-Day Money-Back Guarantee policy?',
      a: 'If you are not completely satisfied with our performance or support within the first 30 days of signing up, simply contact us for a 100% unconditional full refund of your hosting fees.',
    },
    {
      q: 'How does your 24/7 technical support work?',
      a: 'Our technical engineering team is available 24/7/365 via instant Live Chat and ticket system. Average response time is under 90 seconds with real human hosting specialists.',
    },
  ];

  return (
    <div className="bg-[#fcfdfd] text-[#111827] min-h-screen">
      {/* Hostxeon Signature Domain Search Bar (Placed directly under header) */}
      <DomainSearchStrip
        onSearchDomain={onSearchDomain}
        onAddToCart={onAddToCart}
      />

      {/* 1. Hostxeon Signature Hero Section */}
      <HeroSection
        onOpenPricing={() => {
          const pricingSection = document.getElementById('pricing-section') || document.getElementById('home-pricing-cards');
          if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            onNavigate('webhosting');
          }
        }}
        onNavigate={onNavigate}
      />

      {/* Official Trustpilot & Guarantee Proof Bar */}
      <TrustpilotProofBar />

      {/* 2. Core 4-Service Gateway Cards */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 mt-12 relative z-20 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Web Hosting */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:border-[#008a45] transition-all hover:shadow-2xl flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#008a45] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Server className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-black text-[#008a45] uppercase tracking-wider">Fast & Reliable</div>
              <h3 className="text-xl font-black text-slate-950 mt-0.5">Web Hosting</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                NVMe Gen4 storage, 1-click cPanel tools, free SSL certificate & daily automatic backups.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-400 font-medium">Starting from</span>
                <div className="text-2xl font-black text-slate-950">£1.99<span className="text-xs text-gray-500 font-semibold">/mo</span></div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('webhosting')}
              className="mt-5 w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-[#008a45] text-[#008a45] hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Web Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: WordPress Hosting */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:border-[#008a45] transition-all hover:shadow-2xl flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-black text-blue-700 uppercase tracking-wider">Optimized for WP</div>
              <h3 className="text-xl font-black text-slate-950 mt-0.5">WordPress</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Redis Object Cache, automatic core/plugin updates, staging site & WP-CLI pre-installed.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-400 font-medium">Starting from</span>
                <div className="text-2xl font-black text-slate-950">£2.99<span className="text-xs text-gray-500 font-semibold">/mo</span></div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('wordpress')}
              className="mt-5 w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View WordPress</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: VPS Servers */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:border-[#008a45] transition-all hover:shadow-2xl flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-black text-amber-800 uppercase tracking-wider">Root Access</div>
              <h3 className="text-xl font-black text-slate-950 mt-0.5">KVM VPS Server</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Dedicated vCPU & RAM, choice of OS (Ubuntu/Debian), full root SSH & DDoS scrubbing.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-400 font-medium">Starting from</span>
                <div className="text-2xl font-black text-slate-950">£4.99<span className="text-xs text-gray-500 font-semibold">/mo</span></div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('vps')}
              className="mt-5 w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-600 text-amber-800 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Configure VPS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Business Email */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:border-[#008a45] transition-all hover:shadow-2xl flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#008a45] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-black text-[#008a45] uppercase tracking-wider">Custom Domain</div>
              <h3 className="text-xl font-black text-slate-950 mt-0.5">Business Email</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Ad-free mailboxes (you@brand.com), SPF/DKIM security, iOS/Android sync & Microsoft 365.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-400 font-medium">Starting from</span>
                <div className="text-2xl font-black text-slate-950">£0.99<span className="text-xs text-gray-500 font-semibold">/mo</span></div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('email')}
              className="mt-5 w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-[#008a45] text-[#008a45] hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get Email Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Web Hosting Pricing Plans (Matching WebHostingPage 4-Tier Structure & Data) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 xl:px-10 max-w-screen-2xl mx-auto" id="pricing-section">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#008a45] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Web Hosting Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-3">
            Find the perfect plan for your <br className="hidden sm:inline" />
            business
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Clear pricing and no surprises — with 15-day money-back guarantee and instant activation.
          </p>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="relative max-w-screen-2xl mx-auto pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            
            {/* Plan 1: Starter */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6 flex flex-col justify-between hover:border-gray-300 hover:shadow-md transition-all text-left relative">
              {/* Top Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs whitespace-nowrap inline-flex items-center justify-center">
                Starter Plan
              </div>

              <div>
                {/* Header */}
                <div className="mb-4 pt-1">
                  <h3 className="text-xl font-black text-slate-950">Starter</h3>
                  <p className="text-xs text-gray-500 mt-1 h-9 flex items-center leading-snug">
                    Everything you need to get your first website online.
                  </p>
                </div>

                {/* Price block */}
                <div className="pt-2 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="line-through text-xs text-gray-400">£7.99/mo.</div>
                    <span className="bg-[#fff9db] text-[#b28900] text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
                      You save 75%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold text-slate-900">£1.99</span>
                    <span className="text-xs font-semibold text-gray-500">/mo.</span>
                  </div>
                  <div className="h-9 text-[11px] text-gray-500 mt-1 font-medium leading-tight flex flex-col justify-center">
                    <span><strong>1-year subscription</strong></span>
                    <span>Pay £23.88 now, then £95.88 on renewal.</span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart({
                        id: 'web-starter-plan',
                        type: 'hosting',
                        title: 'Web Hosting Starter',
                        subtitle: '1-year subscription (Pay £23.88 now, then £95.88/yr)',
                        price: 23.88,
                        period: '1 year',
                      });
                      setAddedPlanId('web-starter-plan');
                      setTimeout(() => setAddedPlanId(null), 2500);
                    }}
                    className="w-full bg-[#07251c] hover:bg-[#0c382b] active:scale-98 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md cursor-pointer text-center"
                    id="home-plan-starter-btn"
                  >
                    {addedPlanId === 'web-starter-plan' ? 'Added to Cart!' : 'Get started'}
                  </button>
                </div>

                {/* Core Specs with icons */}
                <div className="space-y-2.5 text-xs text-gray-700 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>Free domain for 1st year</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>1 website</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>1 GB RAM & 1 CPU -prio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>1 free email account</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>25 GB SSD Storage</span>
                  </div>
                </div>

                {/* Starter benefits list */}
                <div className="pt-4">
                  <div className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2.5 h-4 flex items-center">
                    Starter benefits
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Free SSL certificate</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Unlimited data traffic</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>1-click WordPress install</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Daily backup</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Plan 2: Professional (Most Popular) */}
            <div className="bg-[#f7fbf8] rounded-2xl border-2 border-emerald-600 shadow-lg p-5 sm:p-6 flex flex-col justify-between relative hover:shadow-xl transition-all text-left">
              {/* Top Most Popular Ribbon */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#008a45] text-white text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap inline-flex items-center justify-center">
                Most popular
              </div>

              <div>
                {/* Header */}
                <div className="mb-4 pt-1">
                  <h3 className="text-xl font-black text-slate-950">Professional</h3>
                  <p className="text-xs text-gray-600 mt-1 h-9 flex items-center leading-snug">
                    Room to grow as your business and traffic build.
                  </p>
                </div>

                {/* Price block */}
                <div className="pt-2 pb-4 border-b border-emerald-200/60">
                  <div className="flex items-center justify-between">
                    <div className="line-through text-xs text-gray-400">£11.99/mo.</div>
                    <span className="bg-[#fff9db] text-[#b28900] text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
                      You save 83%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold text-slate-900">£1.99</span>
                    <span className="text-xs font-semibold text-gray-500">/mo.</span>
                  </div>
                  <div className="h-9 text-[11px] text-gray-600 mt-1 font-medium leading-tight flex flex-col justify-center">
                    <span><strong>1-year subscription</strong></span>
                    <span>Pay £23.88 now, then £143.88 on renewal.</span>
                  </div>
                </div>

                {/* Yellow Primary Action Button */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart({
                        id: 'web-pro-plan',
                        type: 'hosting',
                        title: 'Web Hosting Professional',
                        subtitle: 'Most Popular - 1-year subscription (Pay £23.88 now, then £143.88/yr)',
                        price: 23.88,
                        period: '1 year',
                      });
                      setAddedPlanId('web-pro-plan');
                      setTimeout(() => setAddedPlanId(null), 2500);
                    }}
                    className="w-full bg-[#fed000] hover:bg-[#eabf00] active:scale-98 text-slate-950 font-bold py-3 rounded-lg text-sm transition-all shadow-md cursor-pointer text-center"
                    id="home-plan-pro-btn"
                  >
                    {addedPlanId === 'web-pro-plan' ? 'Added to Cart!' : 'Get started'}
                  </button>
                </div>

                {/* Core Specs */}
                <div className="space-y-2.5 text-xs text-gray-800 py-3 border-b border-emerald-200/60">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span>Free domain for 1st year</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-emerald-700 font-semibold shrink-0" />
                    <span className="font-semibold">3 websites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold">2 GB RAM & 2 CPU -prio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>5 free email accounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold">50 GB SSD Storage</span>
                  </div>
                </div>

                {/* Professional Benefits */}
                <div className="pt-4">
                  <div className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2.5 h-4 flex items-center">
                    Everything in Starter, plus:
                  </div>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                      <span className="font-semibold">Daily backup & 1-click restore</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                      <span>3 websites on 1 account</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                      <span>Double CPU performance priority</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                      <span>DNSSEC domain security</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Plan 3: Business (Best Value) */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all text-left relative">
              {/* Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0c382b] text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap inline-flex items-center justify-center">
                Best for E-Commerce
              </div>

              <div>
                {/* Header */}
                <div className="mb-4 pt-1">
                  <h3 className="text-xl font-black text-slate-950">Business</h3>
                  <p className="text-xs text-gray-500 mt-1 h-9 flex items-center leading-snug">
                    Optimised power and speed for shops & growing traffic.
                  </p>
                </div>

                {/* Price block */}
                <div className="pt-2 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="line-through text-xs text-gray-400">£15.99/mo.</div>
                    <span className="bg-[#fff9db] text-[#b28900] text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
                      You save 75%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold text-slate-900">£3.99</span>
                    <span className="text-xs font-semibold text-gray-500">/mo.</span>
                  </div>
                  <div className="h-9 text-[11px] text-gray-500 mt-1 font-medium leading-tight flex flex-col justify-center">
                    <span><strong>1-year subscription</strong></span>
                    <span>Pay £47.88 now, then £191.88 on renewal.</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart({
                        id: 'web-business-plan',
                        type: 'hosting',
                        title: 'Web Hosting Business',
                        subtitle: 'Best Value - 1-year subscription (Pay £47.88 now, then £191.88/yr)',
                        price: 47.88,
                        period: '1 year',
                      });
                      setAddedPlanId('web-business-plan');
                      setTimeout(() => setAddedPlanId(null), 2500);
                    }}
                    className="w-full bg-[#07251c] hover:bg-[#0c382b] active:scale-98 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md cursor-pointer text-center"
                    id="home-plan-business-btn"
                  >
                    {addedPlanId === 'web-business-plan' ? 'Added to Cart!' : 'Get started'}
                  </button>
                </div>

                {/* Core Specs */}
                <div className="space-y-2.5 text-xs text-gray-700 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>Free domain for 1st year</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-slate-900 font-semibold shrink-0" />
                    <span className="font-semibold">10 websites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold">4 GB RAM & 4 CPU -prio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-900 font-semibold shrink-0" />
                    <span>10 free email accounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-slate-900 font-semibold shrink-0" />
                    <span className="font-semibold">100 GB NVMe Storage</span>
                  </div>
                </div>

                {/* Business Benefits */}
                <div className="pt-4">
                  <div className="text-[11px] font-black text-slate-900 uppercase tracking-wider mb-2.5 h-4 flex items-center">
                    Everything in Pro, plus:
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Built-in CDN & Caching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>1-Click Staging environment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>WooCommerce optimised</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Malware auto-quarantine</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Plan 4: Guru (Maximum Power) */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all text-left relative">
              {/* Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-900 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap inline-flex items-center justify-center">
                Maximum Power
              </div>

              <div>
                {/* Header */}
                <div className="mb-4 pt-1">
                  <h3 className="text-xl font-black text-slate-950">Guru</h3>
                  <p className="text-xs text-gray-500 mt-1 h-9 flex items-center leading-snug">
                    Dedicated power, developer toolsets & VIP priority support.
                  </p>
                </div>

                {/* Price block */}
                <div className="pt-2 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="line-through text-xs text-gray-400">£23.99/mo.</div>
                    <span className="bg-[#fff9db] text-[#b28900] text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
                      You save 70%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold text-slate-900">£6.99</span>
                    <span className="text-xs font-semibold text-gray-500">/mo.</span>
                  </div>
                  <div className="h-9 text-[11px] text-gray-500 mt-1 font-medium leading-tight flex flex-col justify-center">
                    <span><strong>1-year subscription</strong></span>
                    <span>Pay £83.88 now, then £287.88 on renewal.</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart({
                        id: 'web-guru-plan',
                        type: 'hosting',
                        title: 'Web Hosting Guru',
                        subtitle: 'Maximum Power - 1-year subscription (Pay £83.88 now, then £287.88/yr)',
                        price: 83.88,
                        period: '1 year',
                      });
                      setAddedPlanId('web-guru-plan');
                      setTimeout(() => setAddedPlanId(null), 2500);
                    }}
                    className="w-full bg-[#07251c] hover:bg-[#0c382b] active:scale-98 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md cursor-pointer text-center"
                    id="home-plan-guru-btn"
                  >
                    {addedPlanId === 'web-guru-plan' ? 'Added to Cart!' : 'Get started'}
                  </button>
                </div>

                {/* Core Specs */}
                <div className="space-y-2.5 text-xs text-gray-700 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>Free domain for 1st year</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-slate-900 font-semibold shrink-0" />
                    <span className="font-semibold">Unlimited websites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold">8 GB RAM & 8 CPU -prio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-900 font-semibold shrink-0" />
                    <span>Unlimited email accounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-slate-900 font-semibold shrink-0" />
                    <span className="font-semibold">200 GB NVMe Storage</span>
                  </div>
                </div>

                {/* Guru Benefits */}
                <div className="pt-4">
                  <div className="text-[11px] font-black text-slate-900 uppercase tracking-wider mb-2.5 h-4 flex items-center">
                    Everything in Business, plus:
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>VIP 24/7 priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Staging & Git deployment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Redis caching & LiteSpeed</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Continuous automated backups</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Quick link to Web Hosting or VPS */}
          <div className="mt-10 text-center flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-600">
            <span>Looking for dedicated cloud resources?</span>
            <button
              onClick={() => onNavigate('vps')}
              className="text-[#008a45] hover:text-[#007338] font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Explore High Performance Cloud VPS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION (Grid-Based Cards Highlighting 99.9% Uptime, 24/7 Support, NVMe Storage) */}
      <section className="py-20 bg-gradient-to-b from-[#f9fbf9] via-white to-[#f9fbf9] border-t border-b border-gray-100" id="why-choose-us">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#008a45] text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Built for High Performance & Peace of Mind</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Why Choose Hostxeon?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
              We engineer our entire infrastructure around ultra-fast load speeds, bulletproof reliability, and dedicated human support to ensure your business stays ahead.
            </p>
          </div>

          {/* 6 Grid-Based Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: 99.9% Uptime SLA */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200/80 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-[#008a45] flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#008a45] group-hover:text-white transition-all shadow-2xs">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-2">
                  99.9% Uptime SLA
                </div>
                <h3 className="text-xl font-black text-slate-950 mb-2">
                  Rock-Solid 99.9% Guaranteed Uptime
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Dual power grids, Anycast DNS clustering, and redundant Tier-3 European data centres guarantee your site never misses a visitor or sale.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Hardware Failover</span>
                <span className="text-[#008a45] font-black">24/7 Monitored</span>
              </div>
            </div>

            {/* Card 2: 24/7 Expert Support */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200/80 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-[#008a45] flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#008a45] group-hover:text-white transition-all shadow-2xs">
                  <Headphones className="w-6 h-6" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-2">
                  24/7/365 Human Help
                </div>
                <h3 className="text-xl font-black text-slate-950 mb-2">
                  24/7 Expert Live Human Support
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  No bots, no endless ticket queues. Connect with senior hosting and WordPress engineers in under 60 seconds via Live Chat or email anytime.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Average Chat Response</span>
                <span className="text-[#008a45] font-black">&lt; 60 Seconds</span>
              </div>
            </div>

            {/* Card 3: Fast NVMe Storage */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200/80 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-13 h-13 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#fed000] group-hover:text-slate-950 transition-all shadow-2xs">
                  <HardDrive className="w-6 h-6" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-2">
                  PCIe Gen4 Performance
                </div>
                <h3 className="text-xl font-black text-slate-950 mb-2">
                  Pure NVMe SSD Storage Speed
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Enterprise PCIe 4.0 NVMe drives deliver up to 4x faster read/write speeds than regular SATA SSDs, boosting your SEO and conversions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Read/Write Throughput</span>
                <span className="text-[#008a45] font-black">Up to 7,000 MB/s</span>
              </div>
            </div>

            {/* Card 4: Free Website Migration */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200/80 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-[#008a45] flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#008a45] group-hover:text-white transition-all shadow-2xs">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-2">
                  Zero Downtime
                </div>
                <h3 className="text-xl font-black text-slate-950 mb-2">
                  100% Free Migration Concierge
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Switching from another host? Our migration specialists safely transfer your WordPress files, databases, and emails with zero downtime.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Migration Cost</span>
                <span className="text-[#008a45] font-black">£0.00 Included</span>
              </div>
            </div>

            {/* Card 5: Automated Daily Backups */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200/80 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-[#008a45] flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#008a45] group-hover:text-white transition-all shadow-2xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-2">
                  Data Protection
                </div>
                <h3 className="text-xl font-black text-slate-950 mb-2">
                  Automated Daily Backups & Restore
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Your files, databases, and mailboxes are backed up automatically every day. Restore single files or entire sites with 1 simple click.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Restore Method</span>
                <span className="text-[#008a45] font-black">1-Click Instant</span>
              </div>
            </div>

            {/* Card 6: Enterprise Anti-DDoS & Free SSL */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200/80 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-[#008a45] flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#008a45] group-hover:text-white transition-all shadow-2xs">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-2">
                  Carrier-Grade Shield
                </div>
                <h3 className="text-xl font-black text-slate-950 mb-2">
                  3.2 Tbps Anti-DDoS & Free SSL
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Automatic protection against volumetric traffic attacks, DNSSEC security, free automated SSL renewals, and automated malware quarantine.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Security Suite</span>
                <span className="text-[#008a45] font-black">Always Active</span>
              </div>
            </div>

          </div>

          {/* Bottom Trust CTA Strip */}
          <div className="mt-12 p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#008a45] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Try Hostxeon completely risk-free</div>
                <div className="text-xs text-gray-500">Every plan is backed by our unconditional 15-day money-back guarantee.</div>
              </div>
            </div>
            <button
              onClick={onOpenLiveChat}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Talk with a Hosting Specialist</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Free 0-Downtime Migration Banner */}
      <section className="bg-emerald-50/80 border-y border-emerald-100 py-16">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#008a45] uppercase tracking-wider">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Hassle-Free Transition</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Moving from another hosting provider?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl leading-relaxed">
              Our technical engineers will migrate all your website files, MySQL databases, and emails from GoDaddy, Bluehost, Namecheap, or cPanel with <strong>100% zero downtime</strong> for free.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenLiveChat}
              className="bg-[#008a45] hover:bg-[#007338] text-white font-black px-6 py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Request Free Migration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Customer Success Stories & Trustpilot Social Proof */}
      <CustomerSuccessStories
        onNavigateToHosting={() => onNavigate('webhosting')}
        onNavigateToDomains={() => onNavigate('domains')}
        onOpenLiveChat={onOpenLiveChat}
      />

      {/* 7. FAQs */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm mt-2">Everything you need to know about getting started with Hostxeon</p>
        </div>

        <div className="space-y-3 max-w-5xl mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-2xl bg-white overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#008a45] cursor-pointer"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${activeFaq === idx ? 'rotate-180 text-[#008a45]' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. Bottom Ready-to-Launch CTA */}
      <section className="bg-[#041d16] text-white py-16 border-t border-emerald-950">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Ready to Experience Next-Gen Cloud Hosting?
            </h2>
            <p className="text-emerald-200/80 text-sm sm:text-base mt-3 max-w-xl mx-auto">
              Get started today with our 30-day money-back guarantee. Instant server setup in under 60 seconds.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('webhosting')}
                className="bg-[#008a45] hover:bg-[#007338] text-white font-black px-8 py-4 rounded-xl text-sm transition-all shadow-lg cursor-pointer flex items-center gap-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenLiveChat}
                className="border border-white/20 hover:border-white text-white font-bold px-6 py-4 rounded-xl text-sm transition-colors cursor-pointer"
              >
                Chat with an Expert
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
