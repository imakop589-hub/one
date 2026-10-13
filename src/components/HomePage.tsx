import React, { useState } from 'react';
import { 
  Globe, 
  Server, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  Cpu, 
  Mail, 
  Lock, 
  Headphones, 
  ChevronDown, 
  Layers, 
  RefreshCw,
  Activity,
  HardDrive,
  FileText,
  Database,
  MessageSquare,
  Sparkles
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
  onNavigate,
  onSearchDomain,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [addedPlanId, setAddedPlanId] = useState<string | null>(null);

  const faqs = [
    {
      q: 'How fast is Hostxeon compared to standard shared hosting?',
      a: 'Hostxeon is built on 100% pure NVMe Gen4 enterprise solid-state drives and high-performance web servers. Real-world benchmarks show up to 4x faster database queries and page load speeds under 300ms compared to traditional shared hosting.',
    },
    {
      q: 'Do you provide free website and email migration from other hosts?',
      a: 'Yes! Our migration team will transfer your existing cPanel, WordPress, databases, and mailboxes from any previous host with 100% zero downtime at no extra charge.',
    },
    {
      q: 'Is a free domain name included with hosting plans?',
      a: 'Yes, all 1-year and 2-year Web Hosting, WordPress, and Cloud plans include a free 1-year domain registration voucher for popular extensions including .com, .net, .co.uk, and .org.',
    },
    {
      q: 'What is your 30-Day Money-Back Guarantee policy?',
      a: 'If you are not completely satisfied with our performance or support within the first 30 days of signing up, contact us for an unconditional full refund of your hosting fees.',
    },
    {
      q: 'How does your 24/7 technical support work?',
      a: 'Our technical engineering team is available 24/7/365 via instant Live Chat and ticket system. Average response time is under 90 seconds with real human hosting specialists.',
    },
  ];

  return (
    <div className="bg-white text-[#0F172A] min-h-screen">
      {/* Signature Domain Search Bar */}
      <DomainSearchStrip
        onSearchDomain={onSearchDomain}
        onAddToCart={onAddToCart}
      />

      {/* 1. Hero Section */}
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
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Web Hosting */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-[#E2E8F0] hover:border-[#008744] hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-lg bg-emerald-50 text-[#008744] flex items-center justify-center mb-4 transition-colors">
                <Server className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-[#008744] uppercase tracking-wider">Fast & Reliable</div>
              <h3 className="font-heading text-xl font-bold text-[#0F172A] mt-1">Web Hosting</h3>
              <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed">
                NVMe Gen4 storage, 1-click installer tools, free SSL certificate & daily automatic backups.
              </p>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                <span className="text-xs text-slate-500 font-medium">Starting from</span>
                <div className="text-2xl font-bold text-[#0F172A] tabular-nums">£1.99<span className="text-xs text-[#475569] font-normal">/mo</span></div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('webhosting')}
              className="mt-5 w-full py-2.5 rounded-lg bg-emerald-50 hover:bg-[#008744] text-[#008744] hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Web Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: WordPress Hosting */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-[#E2E8F0] hover:border-blue-600 hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4 transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Optimized for WP</div>
              <h3 className="font-heading text-xl font-bold text-[#0F172A] mt-1">WordPress</h3>
              <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed">
                Redis Object Cache, automatic core/plugin updates, staging site & WP-CLI pre-installed.
              </p>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                <span className="text-xs text-slate-500 font-medium">Starting from</span>
                <div className="text-2xl font-bold text-[#0F172A] tabular-nums">£2.99<span className="text-xs text-[#475569] font-normal">/mo</span></div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('wordpress')}
              className="mt-5 w-full py-2.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View WordPress</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: VPS Servers */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-[#E2E8F0] hover:border-amber-600 hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center mb-4 transition-colors">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Root Access</div>
              <h3 className="font-heading text-xl font-bold text-[#0F172A] mt-1">KVM VPS Server</h3>
              <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed">
                Dedicated vCPU & RAM, choice of Linux distributions, full root SSH & DDoS scrubbing.
              </p>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                <span className="text-xs text-slate-500 font-medium">Starting from</span>
                <div className="text-2xl font-bold text-[#0F172A] tabular-nums">£4.99<span className="text-xs text-[#475569] font-normal">/mo</span></div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('vps')}
              className="mt-5 w-full py-2.5 rounded-lg bg-amber-50 hover:bg-amber-600 text-amber-800 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Configure VPS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Business Email */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-[#E2E8F0] hover:border-[#008744] hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-lg bg-emerald-50 text-[#008744] flex items-center justify-center mb-4 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-[#008744] uppercase tracking-wider">Custom Domain</div>
              <h3 className="font-heading text-xl font-bold text-[#0F172A] mt-1">Business Email</h3>
              <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed">
                Ad-free custom mailboxes (you@brand.com), SPF/DKIM security, iOS/Android sync & webmail.
              </p>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                <span className="text-xs text-slate-500 font-medium">Starting from</span>
                <div className="text-2xl font-bold text-[#0F172A] tabular-nums">£0.99<span className="text-xs text-[#475569] font-normal">/mo</span></div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('email')}
              className="mt-5 w-full py-2.5 rounded-lg bg-emerald-50 hover:bg-[#008744] text-[#008744] hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get Email Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Web Hosting Pricing Plans */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 max-w-[1280px] mx-auto" id="pricing-section">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#008744] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Web Hosting Packages</span>
          </div>
          <h2 className="font-heading text-[26px] md:text-[30px] lg:text-[36px] font-bold text-[#0F172A] tracking-tight leading-[1.2] mb-3">
            Find the Perfect Plan for Your Business
          </h2>
          <p className="text-sm md:text-base text-[#475569] max-w-xl mx-auto font-normal">
            Transparent pricing with 30-day money-back guarantee and instant automated setup.
          </p>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          
          {/* Plan 1: Starter */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all text-left relative">
            <div>
              <div className="mb-4">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Entry Level</span>
                <h3 className="font-heading text-xl font-bold text-[#0F172A] mt-1">Starter</h3>
                <p className="text-xs text-[#475569] mt-1 h-9 leading-snug">
                  Everything you need to get your first website online.
                </p>
              </div>

              {/* Price block */}
              <div className="py-3 border-b border-[#E2E8F0]">
                <div className="flex items-center justify-between">
                  <span className="line-through text-xs text-slate-400">£7.99/mo</span>
                  <span className="bg-amber-50 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded border border-amber-200">
                    Save 75%
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-[#0F172A] tabular-nums">£1.99</span>
                  <span className="text-xs font-medium text-[#475569]">/mo</span>
                </div>
                <div className="text-xs text-[#475569] mt-1 font-normal">
                  Annual billing (£23.88/yr, renews at £95.88/yr)
                </div>
              </div>

              {/* Action Button */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart({
                      id: 'web-starter-plan',
                      type: 'hosting',
                      title: 'Web Hosting Starter',
                      subtitle: '1-year subscription (£23.88/yr)',
                      price: 23.88,
                      period: '1 year',
                    });
                    setAddedPlanId('web-starter-plan');
                    setTimeout(() => setAddedPlanId(null), 2500);
                  }}
                  className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer text-center shadow-xs"
                  id="home-plan-starter-btn"
                >
                  {addedPlanId === 'web-starter-plan' ? 'Added to Cart!' : 'Get Started'}
                </button>
              </div>

              {/* Core Specs */}
              <div className="space-y-2 text-xs text-[#475569] py-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Free domain for 1st year</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>1 website</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>1 GB RAM & 1 vCPU</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>1 free professional mailbox</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>25 GB NVMe SSD Storage</span>
                </div>
              </div>

              <div className="pt-3">
                <div className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-2">
                  Included Features
                </div>
                <ul className="space-y-1.5 text-xs text-[#475569]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>Free automated SSL</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>Unmetered bandwidth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>1-click WordPress install</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>Daily automated backups</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Plan 2: Professional (Most Popular) */}
          <div className="bg-white rounded-xl border-2 border-[#008744] shadow-md p-6 flex flex-col justify-between relative text-left">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#008744] text-white text-xs font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap">
              Most Popular
            </div>

            <div>
              <div className="mb-4">
                <span className="text-xs font-semibold text-[#008744] uppercase tracking-wider">Recommended</span>
                <h3 className="font-heading text-xl font-bold text-[#0F172A] mt-1">Professional</h3>
                <p className="text-xs text-[#475569] mt-1 h-9 leading-snug">
                  Room to grow as your business traffic builds.
                </p>
              </div>

              {/* Price block */}
              <div className="py-3 border-b border-emerald-100">
                <div className="flex items-center justify-between">
                  <span className="line-through text-xs text-slate-400">£11.99/mo</span>
                  <span className="bg-amber-50 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded border border-amber-200">
                    Save 83%
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-[#0F172A] tabular-nums">£1.99</span>
                  <span className="text-xs font-medium text-[#475569]">/mo</span>
                </div>
                <div className="text-xs text-[#475569] mt-1 font-normal">
                  Annual billing (£23.88/yr, renews at £143.88/yr)
                </div>
              </div>

              {/* Action Button */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart({
                      id: 'web-pro-plan',
                      type: 'hosting',
                      title: 'Web Hosting Professional',
                      subtitle: 'Most Popular - 1-year subscription (£23.88/yr)',
                      price: 23.88,
                      period: '1 year',
                    });
                    setAddedPlanId('web-pro-plan');
                    setTimeout(() => setAddedPlanId(null), 2500);
                  }}
                  className="w-full bg-[#008744] hover:bg-[#006E37] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer text-center shadow-xs"
                  id="home-plan-pro-btn"
                >
                  {addedPlanId === 'web-pro-plan' ? 'Added to Cart!' : 'Get Started'}
                </button>
              </div>

              {/* Core Specs */}
              <div className="space-y-2 text-xs text-[#475569] py-3 border-b border-emerald-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Free domain for 1st year</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#008744] font-medium shrink-0" />
                  <span className="font-semibold text-[#0F172A]">3 websites</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#008744] font-medium shrink-0" />
                  <span className="font-semibold text-[#0F172A]">2 GB RAM & 2 vCPUs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#008744] font-medium shrink-0" />
                  <span>5 free mailboxes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-[#008744] font-medium shrink-0" />
                  <span className="font-semibold text-[#0F172A]">50 GB NVMe Storage</span>
                </div>
              </div>

              <div className="pt-3">
                <div className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-2">
                  Everything in Starter, plus:
                </div>
                <ul className="space-y-1.5 text-xs text-[#475569]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>Daily backup & 1-click restore</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>3 websites on 1 account</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>Double CPU performance priority</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>DNSSEC domain security</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Plan 3: Business */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all text-left relative">
            <div>
              <div className="mb-4">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">E-Commerce Ready</span>
                <h3 className="font-heading text-xl font-bold text-[#0F172A] mt-1">Business</h3>
                <p className="text-xs text-[#475569] mt-1 h-9 leading-snug">
                  Optimized speed and resources for online stores.
                </p>
              </div>

              {/* Price block */}
              <div className="py-3 border-b border-[#E2E8F0]">
                <div className="flex items-center justify-between">
                  <span className="line-through text-xs text-slate-400">£15.99/mo</span>
                  <span className="bg-amber-50 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded border border-amber-200">
                    Save 75%
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-[#0F172A] tabular-nums">£3.99</span>
                  <span className="text-xs font-medium text-[#475569]">/mo</span>
                </div>
                <div className="text-xs text-[#475569] mt-1 font-normal">
                  Annual billing (£47.88/yr, renews at £191.88/yr)
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
                      subtitle: '1-year subscription (£47.88/yr)',
                      price: 47.88,
                      period: '1 year',
                    });
                    setAddedPlanId('web-business-plan');
                    setTimeout(() => setAddedPlanId(null), 2500);
                  }}
                  className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer text-center shadow-xs"
                  id="home-plan-business-btn"
                >
                  {addedPlanId === 'web-business-plan' ? 'Added to Cart!' : 'Get Started'}
                </button>
              </div>

              {/* Core Specs */}
              <div className="space-y-2 text-xs text-[#475569] py-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Free domain for 1st year</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-[#0F172A]">10 websites</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-[#0F172A]">4 GB RAM & 4 vCPUs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>10 mailboxes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-[#0F172A]">100 GB NVMe Storage</span>
                </div>
              </div>

              <div className="pt-3">
                <div className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-2">
                  Everything in Pro, plus:
                </div>
                <ul className="space-y-1.5 text-xs text-[#475569]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>Built-in CDN & Caching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>1-Click Staging environment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>WooCommerce optimized</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>Malware auto-quarantine</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Plan 4: Guru */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all text-left relative">
            <div>
              <div className="mb-4">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Enterprise Scale</span>
                <h3 className="font-heading text-xl font-bold text-[#0F172A] mt-1">Guru</h3>
                <p className="text-xs text-[#475569] mt-1 h-9 leading-snug">
                  Maximum power, staging tools & priority assistance.
                </p>
              </div>

              {/* Price block */}
              <div className="py-3 border-b border-[#E2E8F0]">
                <div className="flex items-center justify-between">
                  <span className="line-through text-xs text-slate-400">£23.99/mo</span>
                  <span className="bg-amber-50 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded border border-amber-200">
                    Save 70%
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-[#0F172A] tabular-nums">£6.99</span>
                  <span className="text-xs font-medium text-[#475569]">/mo</span>
                </div>
                <div className="text-xs text-[#475569] mt-1 font-normal">
                  Annual billing (£83.88/yr, renews at £287.88/yr)
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
                      subtitle: '1-year subscription (£83.88/yr)',
                      price: 83.88,
                      period: '1 year',
                    });
                    setAddedPlanId('web-guru-plan');
                    setTimeout(() => setAddedPlanId(null), 2500);
                  }}
                  className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer text-center shadow-xs"
                  id="home-plan-guru-btn"
                >
                  {addedPlanId === 'web-guru-plan' ? 'Added to Cart!' : 'Get Started'}
                </button>
              </div>

              {/* Core Specs */}
              <div className="space-y-2 text-xs text-[#475569] py-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Free domain for 1st year</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-[#0F172A]">Unlimited websites</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-[#0F172A]">8 GB RAM & 8 vCPUs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Unlimited mailboxes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-[#0F172A]">200 GB NVMe Storage</span>
                </div>
              </div>

              <div className="pt-3">
                <div className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-2">
                  Everything in Business, plus:
                </div>
                <ul className="space-y-1.5 text-xs text-[#475569]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>VIP 24/7 priority queue</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>Staging & Git deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>Redis caching & LiteSpeed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#008744] shrink-0" />
                    <span>Continuous automated backups</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Quick link to VPS */}
        <div className="mt-10 text-center flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#475569]">
          <span>Need dedicated resources?</span>
          <button
            onClick={() => onNavigate('vps')}
            className="text-[#008744] hover:text-[#006E37] font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Explore High-Performance Cloud VPS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC] border-t border-b border-[#E2E8F0]" id="why-choose-us">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#008744] text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Reliable Cloud Infrastructure</span>
            </div>
            <h2 className="font-heading text-[26px] md:text-[30px] lg:text-[36px] font-bold text-[#0F172A] tracking-tight leading-[1.2]">
              Why Choose Hostxeon?
            </h2>
            <p className="text-sm md:text-base text-[#475569] mt-3 leading-relaxed font-normal">
              Engineered for ultra-fast load speeds, bulletproof reliability, and dedicated 24/7 human technical support.
            </p>
          </div>

          {/* 6 Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-emerald-50 text-[#008744] flex items-center justify-center mb-4 shadow-2xs">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-[#008744] uppercase tracking-wider mb-1">
                  99.99% Uptime SLA
                </div>
                <h3 className="font-heading text-lg font-bold text-[#0F172A] mb-2">
                  Guaranteed 99.99% Network Uptime
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Dual power grids, Anycast DNS clustering, and redundant Tier-3 data centres guarantee your site is always online.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-medium text-[#475569]">
                <span>Hardware Failover</span>
                <span className="text-[#008744] font-semibold">24/7 Monitored</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-emerald-50 text-[#008744] flex items-center justify-center mb-4 shadow-2xs">
                  <Headphones className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-[#008744] uppercase tracking-wider mb-1">
                  24/7 Human Support
                </div>
                <h3 className="font-heading text-lg font-bold text-[#0F172A] mb-2">
                  Expert Live Support Anytime
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Connect directly with experienced hosting engineers in under 90 seconds via Live Chat or ticket support.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-medium text-[#475569]">
                <span>Chat Response</span>
                <span className="text-[#008744] font-semibold">&lt; 90 Seconds</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4 shadow-2xs">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                  PCIe Gen4 Performance
                </div>
                <h3 className="font-heading text-lg font-bold text-[#0F172A] mb-2">
                  Pure NVMe SSD Storage
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Enterprise PCIe 4.0 NVMe drives deliver up to 4x faster database and file throughput than standard SATA SSDs.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-medium text-[#475569]">
                <span>Throughput</span>
                <span className="text-[#008744] font-semibold">Up to 7,000 MB/s</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-emerald-50 text-[#008744] flex items-center justify-center mb-4 shadow-2xs">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-[#008744] uppercase tracking-wider mb-1">
                  Zero Downtime
                </div>
                <h3 className="font-heading text-lg font-bold text-[#0F172A] mb-2">
                  Free Migration Concierge
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Switching from another provider? Our specialists safely migrate your website files, databases, and emails for free.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-medium text-[#475569]">
                <span>Migration Cost</span>
                <span className="text-[#008744] font-semibold">£0.00 Included</span>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-emerald-50 text-[#008744] flex items-center justify-center mb-4 shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-[#008744] uppercase tracking-wider mb-1">
                  Data Protection
                </div>
                <h3 className="font-heading text-lg font-bold text-[#0F172A] mb-2">
                  Automated Daily Backups
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Your files, databases, and mailboxes are backed up automatically every day with 1-click instant restore.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-medium text-[#475569]">
                <span>Restore Method</span>
                <span className="text-[#008744] font-semibold">1-Click Instant</span>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-emerald-50 text-[#008744] flex items-center justify-center mb-4 shadow-2xs">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-[#008744] uppercase tracking-wider mb-1">
                  Carrier-Grade Shield
                </div>
                <h3 className="font-heading text-lg font-bold text-[#0F172A] mb-2">
                  Anti-DDoS & Free SSL
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Protection against volumetric attacks, DNSSEC security, free automated SSL renewals, and automated malware scan.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-medium text-[#475569]">
                <span>Security Suite</span>
                <span className="text-[#008744] font-semibold">Always Active</span>
              </div>
            </div>

          </div>

          {/* Bottom Trust CTA Strip */}
          <div className="mt-10 p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#008744] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0F172A]">Try Hostxeon risk-free for 30 days</div>
                <div className="text-xs text-[#475569]">Every hosting plan is backed by our unconditional 30-day money-back guarantee.</div>
              </div>
            </div>
            <button
              onClick={onOpenLiveChat}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Talk with a Hosting Specialist</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Free 0-Downtime Migration Banner */}
      <section className="bg-white border-b border-[#E2E8F0] py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#008744] uppercase tracking-wider">
              Hassle-Free Transition
            </div>
            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight leading-snug">
              Moving from another hosting provider?
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] max-w-xl leading-relaxed font-normal">
              Our technical engineers will migrate all your website files, MySQL databases, and emails with <strong>100% zero downtime</strong> at no cost.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenLiveChat}
              className="bg-[#008744] hover:bg-[#006E37] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors shadow-xs cursor-pointer flex items-center gap-2"
            >
              <span>Request Free Migration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Customer Success Stories */}
      <CustomerSuccessStories
        onNavigateToHosting={() => onNavigate('webhosting')}
        onNavigateToDomains={() => onNavigate('domains')}
        onOpenLiveChat={onOpenLiveChat}
      />

      {/* 7. FAQs */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16 lg:py-20">
        <div className="text-center mb-10">
          <h2 className="font-heading text-[26px] md:text-[30px] lg:text-[36px] font-bold text-[#0F172A] tracking-tight leading-[1.2]">
            Frequently Asked Questions
          </h2>
          <p className="text-[#475569] text-sm mt-2 font-normal">Everything you need to know about getting started with Hostxeon</p>
        </div>

        <div className="space-y-3 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#E2E8F0] rounded-xl bg-white overflow-hidden shadow-2xs"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-[#0F172A] hover:text-[#008744] cursor-pointer"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${activeFaq === idx ? 'rotate-180 text-[#008744]' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] pt-3 font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. Bottom CTA Banner */}
      <section className="bg-[#061913] text-white py-14 border-t border-[#133025]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Ready to Experience High-Performance Cloud Hosting?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-xl mx-auto font-normal">
              Get started today with our unconditional 30-day money-back guarantee. Instant automated server setup.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('webhosting')}
                className="bg-[#008744] hover:bg-[#006E37] text-white font-semibold px-6 py-3.5 rounded-lg text-sm transition-colors shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenLiveChat}
                className="border border-white/20 hover:border-white text-white font-medium px-5 py-3.5 rounded-lg text-sm transition-colors cursor-pointer"
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
