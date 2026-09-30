import React, { useState } from 'react';
import { 
  Check, 
  CheckCircle2, 
  Star, 
  Shield, 
  ShieldCheck, 
  Lock, 
  Server, 
  Zap, 
  Sparkles, 
  Play, 
  ArrowRight, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Cpu, 
  HardDrive, 
  Mail, 
  Globe, 
  RefreshCw, 
  Sliders, 
  MessageSquare, 
  HelpCircle, 
  GraduationCap, 
  Headphones, 
  FileText, 
  ExternalLink,
  Database,
  Layers,
  Calendar,
  Smartphone,
  CheckCircle,
  Clock,
  Send,
  Terminal,
  Code
} from 'lucide-react';
import { CartItem } from '../types';

interface WebHostingPageProps {
  onAddToCart: (item: CartItem) => void;
  onOpenLiveChat: () => void;
  onOpenBuilder: () => void;
  onGoToWordPress: () => void;
}

export const WebHostingPage: React.FC<WebHostingPageProps> = ({
  onAddToCart,
  onOpenLiveChat,
  onOpenBuilder,
  onGoToWordPress,
}) => {
  // Pricing feature comparison toggle
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);

  // Accordion states
  const [activeEmailAccordion, setActiveEmailAccordion] = useState<number | null>(0);
  const [activeAddonAccordion, setActiveAddonAccordion] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const scrollToPricing = () => {
    const el = document.getElementById('web-pricing-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddStarter = () => {
    onAddToCart({
      id: 'web-starter-plan',
      type: 'hosting',
      title: 'Web Hosting Starter',
      subtitle: '1-year subscription (Pay £23.88 now, then £95.88/yr)',
      price: 23.88,
      period: '1 year',
    });
  };

  const handleAddPro = () => {
    onAddToCart({
      id: 'web-pro-plan',
      type: 'hosting',
      title: 'Web Hosting Professional',
      subtitle: 'Most Popular - 1-year subscription (Pay £23.88 now, then £143.88/yr)',
      price: 23.88,
      period: '1 year',
    });
  };

  const handleAddBusiness = () => {
    onAddToCart({
      id: 'web-business-plan',
      type: 'hosting',
      title: 'Web Hosting Business',
      subtitle: 'Best Value - 1-year subscription (Pay £47.88 now, then £191.88/yr)',
      price: 47.88,
      period: '1 year',
    });
  };

  const handleAddGuru = () => {
    onAddToCart({
      id: 'web-guru-plan',
      type: 'hosting',
      title: 'Web Hosting Guru',
      subtitle: 'Maximum Power - 1-year subscription (Pay £83.88 now, then £287.88/yr)',
      price: 83.88,
      period: '1 year',
    });
  };

  // 15 FAQs matching the screenshot
  const faqList = [
    {
      q: "What is web hosting and do I need it?",
      a: "Web hosting is the physical storage and server infrastructure where your website's files, databases, and assets live so they can be accessed on the internet 24/7. Anyone who wants a public website needs reliable web hosting."
    },
    {
      q: "What's included in my hosting plan?",
      a: "All our hosting plans include high-speed NVMe SSD storage, unlimited data traffic, free domain for the first year, free SSL certificate, business email accounts, 1-click WordPress install, automated daily backups, and 24/7 priority customer support."
    },
    {
      q: "Is my website hosted in Europe?",
      a: "Yes. All our high-performance data centres are located within the European Union, fully certified (ISO 27001) and 100% compliant with strict European privacy and GDPR regulations."
    },
    {
      q: "How reliable is your hosting?",
      a: "We guarantee 99.9% uptime powered by redundant Tier-3 data centres, Anycast DNS routing, dual power supplies, and automatic hardware failover."
    },
    {
      q: "How secure is my website with your hosting?",
      a: "Your site is protected by our carrier-grade Web Application Firewall (WAF), hardware DDoS mitigation, DNSSEC protection, free Wildcard SSL, and continuous automated malware scans."
    },
    {
      q: "How much does web hosting cost?",
      a: "Our introductory plans start at just £1.99/mo (pay £23.88 for the first year). Renewal prices remain completely transparent with zero hidden fees."
    },
    {
      q: "Do I need technical skills to use hosting?",
      a: "No technical experience is needed. We provide an intuitive one-click control panel, automated setup wizards, and 24/7 live assistance to guide you step-by-step."
    },
    {
      q: "Can I use my existing domain or website?",
      a: "Yes! You can transfer your existing domain to Hostxeon with zero downtime, or point your external DNS records to our servers using our DNS manager."
    },
    {
      q: "Can I buy a domain name without hosting?",
      a: "Yes, you can register domains independently. However, our hosting plans include a free domain registration for your entire first year."
    },
    {
      q: "How do I choose the right hosting plan?",
      a: "Starter is ideal for individuals and first websites (1 site, 25 GB SSD, 1 email). Professional is our most popular tier for growing businesses (3 sites, 50 GB SSD, 5 emails, and double RAM & CPU priority)."
    },
    {
      q: "How quickly can I get my website online?",
      a: "Your hosting account and domain are activated instantly upon purchase. You can deploy a WordPress site in 60 seconds with our 1-click installer or launch with Aida AI Builder."
    },
    {
      q: "Can I use WordPress, and do I need a special plan?",
      a: "Yes! WordPress runs smoothly on all our plans with 1-click installation. For automated updates, visual testing, and dedicated WP staging, you can also check out our Managed WordPress hosting."
    },
    {
      q: "Can I move my existing website to Hostxeon?",
      a: "Yes, our automated 1-click migration tool transfers your WordPress website easily, or our technical support specialists can migrate your site for free."
    },
    {
      q: "Can I upgrade my plan as my site grows?",
      a: "You can seamlessly upgrade between Starter, Professional, and higher tiers with one click in your control panel without any downtime."
    },
    {
      q: "What kind of support is available if I need help?",
      a: "We provide round-the-clock 24/7/365 support via live chat and email with average response times under 60 seconds."
    },
    {
      q: "Is there a money-back guarantee?",
      a: "Yes! We offer a risk-free 15-day money-back guarantee so you can test our high-performance hosting with complete peace of mind."
    }
  ];

  // Customer Reviews matching the screenshot
  const customerReviews = [
    {
      name: "Brian",
      date: "03/09/2026",
      stars: 5,
      comment: "Excellent chat assistance"
    },
    {
      name: "Alex Lind",
      date: "02/09/2026",
      stars: 5,
      comment: "I've always been a fan of Hostxeon and greatly appreciate their support during my five years as a customer; but today I want to give a special shoutout..."
    },
    {
      name: "Kahn Hellbop",
      date: "02/09/2026",
      stars: 5,
      comment: "Got great support from Marktwain; he was really helpful!"
    },
    {
      name: "customer",
      date: "01/09/2026",
      stars: 5,
      comment: "Marktwain was solving my issues. He was very kind with my PHP extensions that I did not understand, resolved within minutes."
    },
    {
      name: "Gabriel Rimando",
      date: "01/09/2026",
      stars: 5,
      comment: "Had a great experience with Lovely; she gave the best customer service and helped me solved problems with my website, and she even promised..."
    },
    {
      name: "Henriette Skovly",
      date: "01/09/2026",
      stars: 5,
      comment: "Very good to solve my problem. I'm not very good at web-things, but the human supporter help me very much."
    },
    {
      name: "Pascal Meulemans",
      date: "30/08/2026",
      stars: 5,
      comment: "Great support from Lesly."
    },
    {
      name: "Kevin Joseph",
      date: "30/08/2026",
      stars: 5,
      comment: "The support experience was excellent. I would like to thank Denn for the support offered."
    }
  ];

  return (
    <div className="w-full bg-white text-[#111827]" id="web-hosting-page">

      {/* Trustpilot Header Sub-Bar */}
      <div className="bg-white border-b border-gray-100 py-2.5 px-4 text-center text-xs sm:text-sm font-medium text-gray-700 flex items-center justify-center gap-2">
        <a 
          href="https://www.trustpilot.com/review/hostxeon.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="font-semibold text-gray-900">Excellent</span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="w-4 h-4 bg-[#00b67a] text-white flex items-center justify-center rounded-[2px] text-[10px]">
                ★
              </span>
            ))}
          </div>
          <span className="text-gray-500">
            Rated <strong className="text-gray-900">5.0 / 5.0</strong> on <strong className="text-gray-900 underline hover:text-[#00b67a]">Trustpilot</strong>
          </span>
        </a>
      </div>

      {/* 1. HERO SECTION (Dark Green Background with Radial Dot Pattern) */}
      <section 
        className="relative overflow-hidden bg-[#0a291f] text-white py-16 sm:py-24"
        style={{
          backgroundImage: `radial-gradient(rgba(52, 211, 153, 0.12) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-3xl text-left space-y-6">
            
            {/* Category Pill */}
            <div className="text-emerald-300 text-sm sm:text-base font-medium tracking-wide">
              Web hosting
            </div>

            {/* Main Headline (Baloo 2 font, 500 weight) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12]">
              Fast and secure <br />
              <span className="text-white">hosting</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100 font-medium">
              Everything you need for a high-performing site:
            </p>

            {/* Bullet Points */}
            <ul className="space-y-2.5 text-sm sm:text-base text-emerald-50/90 font-normal">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                <span>NVMe SSDs and high-performance caching</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                <span>Hosting, domain, and email, all-in-one</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                <span>European data centres, GDPR-ready</span>
              </li>
            </ul>

            {/* Yellow CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToPricing}
                className="bg-[#fed000] hover:bg-[#eabf00] active:scale-98 text-slate-950 font-bold px-7 py-3.5 rounded-md text-base transition-all shadow-md cursor-pointer"
                id="web-hero-see-plans-btn"
              >
                See plans & pricing
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. GUARANTEE STRIP */}
      <div className="bg-[#f4fbf7] border-b border-emerald-100 py-4">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-sm sm:text-base font-semibold text-slate-800">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#008a45] stroke-[3]" />
            <span>99.9% uptime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#008a45] stroke-[3]" />
            <span>Free domain</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#008a45] stroke-[3]" />
            <span>Free SSL</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#008a45] stroke-[3]" />
            <span>All-in-one platform</span>
          </div>
        </div>
      </div>

      {/* 3. PRICING SECTION (Starter & Professional with 15-day guarantee) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-10 max-w-screen-2xl mx-auto" id="web-pricing-section">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#008a45] text-xs font-bold tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Web Hosting Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-3">
            Find the perfect plan for your <br className="hidden sm:inline" />
            business
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Clear pricing and no surprises - with 15-day money-back guarantee.
          </p>
        </div>

        {/* Pricing Cards Container */}
        <div className="relative max-w-screen-2xl mx-auto pt-3">
          
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
                  <h3 className="text-xl font-bold text-slate-900">Starter</h3>
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
                    onClick={handleAddStarter}
                    className="w-full bg-[#07251c] hover:bg-[#0c382b] active:scale-98 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md cursor-pointer text-center"
                    id="web-plan-starter-btn"
                  >
                    Get started
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
                  <h3 className="text-xl font-bold text-slate-900">Professional</h3>
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
                    onClick={handleAddPro}
                    className="w-full bg-[#fed000] hover:bg-[#eabf00] active:scale-98 text-slate-950 font-bold py-3 rounded-lg text-sm transition-all shadow-md cursor-pointer text-center"
                    id="web-plan-pro-btn"
                  >
                    Get started
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
                  <h3 className="text-xl font-bold text-slate-900">Business</h3>
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
                    onClick={handleAddBusiness}
                    className="w-full bg-[#07251c] hover:bg-[#0c382b] active:scale-98 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md cursor-pointer text-center"
                    id="web-plan-business-btn"
                  >
                    Get started
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
                  <div className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2.5 h-4 flex items-center">
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
                  <h3 className="text-xl font-bold text-slate-900">Guru</h3>
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
                    onClick={handleAddGuru}
                    className="w-full bg-[#07251c] hover:bg-[#0c382b] active:scale-98 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md cursor-pointer text-center"
                    id="web-plan-guru-btn"
                  >
                    Get started
                  </button>
                </div>

                {/* Core Specs */}
                <div className="space-y-2.5 text-xs text-gray-700 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>Free domain for 1st year</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-emerald-700 font-bold shrink-0" />
                    <span className="font-bold text-emerald-700">Unlimited websites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold">8 GB RAM & 8 CPU -prio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-700 font-bold shrink-0" />
                    <span className="font-bold text-emerald-700">Unlimited email accounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-emerald-700 font-bold shrink-0" />
                    <span className="font-bold text-emerald-700">200 GB NVMe Storage</span>
                  </div>
                </div>

                {/* Guru Benefits */}
                <div className="pt-4">
                  <div className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2.5 h-4 flex items-center">
                    Everything in Business, plus:
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-semibold">Dedicated IP address</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Git + SSH + WP-CLI tools</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>24/7 VIP priority queue</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Enterprise WAF & DDoS Shield</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Show More Features Dropdown Toggle */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowMoreFeatures(!showMoreFeatures)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-emerald-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-5 py-2.5 rounded-full transition-all cursor-pointer"
            id="web-show-more-features-btn"
          >
            <span>{showMoreFeatures ? 'Hide comparison matrix' : 'Show all 4 plans in detail'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showMoreFeatures ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expanded Comparison Matrix for all 4 plans */}
        {showMoreFeatures && (
          <div className="mt-8 overflow-x-auto border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm animate-in fade-in duration-300">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-900 font-bold">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4">Starter</th>
                  <th className="py-3 px-4 text-emerald-700 bg-emerald-50/50 rounded-t-lg">Professional</th>
                  <th className="py-3 px-4">Business</th>
                  <th className="py-3 px-4 text-slate-900">Guru</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Websites Included</td>
                  <td className="py-3 px-4">1 website</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700 bg-emerald-50/30">3 websites</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">10 websites</td>
                  <td className="py-3 px-4 font-bold text-emerald-800">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">NVMe SSD Storage</td>
                  <td className="py-3 px-4">25 GB</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700 bg-emerald-50/30">50 GB</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">100 GB</td>
                  <td className="py-3 px-4 font-bold text-emerald-800">200 GB</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">RAM & CPU Allocation</td>
                  <td className="py-3 px-4">1 GB / 1 vCPU</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700 bg-emerald-50/30">2 GB / 2 vCPU</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">4 GB / 4 vCPU</td>
                  <td className="py-3 px-4 font-bold text-emerald-800">8 GB / 8 vCPU</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Business Email Accounts</td>
                  <td className="py-3 px-4">1 account</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700 bg-emerald-50/30">5 accounts</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">10 accounts</td>
                  <td className="py-3 px-4 font-bold text-emerald-800">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Daily Backup & Restore</td>
                  <td className="py-3 px-4">Daily backup</td>
                  <td className="py-3 px-4 text-emerald-600 bg-emerald-50/30">Daily + 1-Click Restore</td>
                  <td className="py-3 px-4 text-emerald-600">Daily + 1-Click Restore</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">Hourly + 1-Click Restore</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Staging Sandbox</td>
                  <td className="py-3 px-4 text-gray-400">—</td>
                  <td className="py-3 px-4 text-gray-400 bg-emerald-50/30">—</td>
                  <td className="py-3 px-4 text-emerald-600 font-semibold">1-Click Sandbox</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">Unlimited Sandboxes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Performance & CDN</td>
                  <td className="py-3 px-4">Standard</td>
                  <td className="py-3 px-4 bg-emerald-50/30">Enhanced Caching</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">Built-in CDN & Redis</td>
                  <td className="py-3 px-4 font-bold text-emerald-800">Enterprise CDN + Redis Pro</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Developer Access</td>
                  <td className="py-3 px-4">SFTP / phpMyAdmin</td>
                  <td className="py-3 px-4 bg-emerald-50/30">SFTP / phpMyAdmin</td>
                  <td className="py-3 px-4">SSH + WP-CLI</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">SSH + Git + Dedicated IP</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Support Level</td>
                  <td className="py-3 px-4">24/7 Standard</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700 bg-emerald-50/30">24/7 Priority</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">24/7 Priority</td>
                  <td className="py-3 px-4 font-bold text-emerald-800">24/7 VIP Dedicated Queue</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </section>

      {/* 4. FASTEST ON THE MARKET, BEST IN PRICE (Dark Green Banner) */}
      <section className="bg-[#051f17] text-white py-14 sm:py-20 border-y border-emerald-950">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 text-left space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Fastest on the market, <br />
            best in price
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
            Fast websites get more visits, and websites hosted on Hostxeon pass Google's Core Web Vitals speed test more often than on Hostinger, IONOS, or GoDaddy.*
          </p>
          <p className="text-xs text-emerald-300/70 pt-2 italic">
            *Data from httparchive.org, collected on June 18th 2024.
          </p>
        </div>
      </section>

      {/* 5. BENTO GRID / FEATURE CARDS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-10 bg-white max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch text-left">
          
          {/* Bento Card 1: Designed to be fast (Large, 8 cols on desktop) */}
          <div className="lg:col-span-8 bg-[#0a291f] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-lg border border-emerald-900">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Designed to be fast
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 mb-6 max-w-lg">
                Get more visitors with a fast website powered by NVMe SSD storage and built-in performance caching.
              </p>
            </div>

            {/* Restaurant mockup with 100 score */}
            <div className="rounded-2xl overflow-hidden border border-emerald-700/60 bg-slate-950 relative h-64 sm:h-72">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop" 
                alt="Restaurant interior with staff"
                className="w-full h-full object-cover object-center opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40" />

              {/* Browser score overlay */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl p-4 max-w-xs shadow-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-400 bg-emerald-950 flex items-center justify-center text-emerald-400 font-extrabold text-sm">
                    100
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">High Performance</div>
                    <div className="text-[10px] text-gray-300">Your website has an ideal stability and speed</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={scrollToPricing}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-semibold py-1.5 rounded-md transition-colors cursor-pointer text-center"
                >
                  Speed up
                </button>
              </div>
            </div>
          </div>

          {/* Bento Card 2: 99.9% uptime (4 cols on desktop) */}
          <div className="lg:col-span-4 bg-[#0a291f] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg border border-emerald-900">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                99.9% uptime
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Run a website you can rely on, boosted by a global network and secured with 24/7 monitoring and daily backups.
              </p>
            </div>
            <div className="pt-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Bento Card 3: Secure by default (4 cols) */}
          <div className="lg:col-span-4 bg-[#0a291f] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg border border-emerald-900">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Secure by default
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Hosting on GDPR-ready servers in the EU. Guarded by WAF, DDoS protection and DNSSEC.
              </p>
            </div>
            <div className="pt-6">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          {/* Bento Card 4: All-in-one (4 cols) */}
          <div className="lg:col-span-4 bg-[#0a291f] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg border border-emerald-900">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                All-in-one
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Get a free domain with your first year of hosting, send professional emails and manage multiple websites.
              </p>
            </div>
            <div className="pt-6">
              <Globe className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          {/* Bento Card 5: WordPress in one click (4 cols) */}
          <div className="lg:col-span-4 bg-[#0a291f] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg border border-emerald-900 overflow-hidden relative">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                WordPress in one click
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-4">
                Install WordPress with one click, migrate your existing website, and gain access to premium themes as well as exclusive discounts on leading performance and SEO plugins.
              </p>
            </div>

            {/* Phone Mockup Preview */}
            <div className="rounded-xl overflow-hidden border border-emerald-700/60 bg-slate-950 p-2 shadow-inner">
              <div className="text-[10px] text-emerald-400 font-semibold mb-1">Building your website in WordPress...</div>
              <div className="text-[11px] text-white font-serif">SHUTTERS</div>
              <div className="text-[9px] text-gray-400">Modern sunglasses boutique online shop</div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. PROFESSIONAL EMAIL – INCLUDED WITH HOSTING */}
      <section className="py-16 sm:py-24 bg-[#fafcfb] border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Email & Calendar Mockup */}
            <div className="lg:col-span-6">
              <div className="bg-[#1f4034] rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-900 text-left text-white relative">
                
                {/* Email interface mockup */}
                <div className="bg-slate-900 rounded-2xl p-4 border border-slate-700 shadow-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-slate-200">Hostxeon Webmail</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                      AI Assistant Active
                    </span>
                  </div>

                  {/* AI Writing prompt box */}
                  <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 text-xs">
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px] mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Writing Assistant</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      "Confirming your appointment for Monday at 10:00 AM. We look forward to meeting you."
                    </p>
                  </div>

                  {/* Mini Calendar */}
                  <div className="bg-slate-800/50 rounded-xl p-3 text-[11px]">
                    <div className="flex items-center justify-between font-bold text-slate-300 mb-2">
                      <span>May 2026</span>
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-400">
                      <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                      <span className="text-slate-600">28</span><span className="text-slate-600">29</span><span className="text-slate-600">30</span><span>1</span><span>2</span><span>3</span><span>4</span>
                      <span>5</span><span>6</span><span>7</span><span className="bg-emerald-500 text-white rounded-full font-bold">8</span><span>9</span><span>10</span><span>11</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Copy & Accordion */}
            <div className="lg:col-span-6 text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Professional email – <br />
                included with hosting
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Discover how a professional email can help you get more customers. Get it at no extra cost.
              </p>

              {/* Accordion */}
              <div className="space-y-2 pt-2">
                {[
                  {
                    title: 'Built-in AI writing assistant',
                    desc: 'Draft professional client proposals, customer responses, and marketing emails in seconds using integrated AI.'
                  },
                  {
                    title: 'Schedule and accept meetings',
                    desc: 'Integrated calendar syncs seamlessly with Google Calendar, Apple iCal, and Microsoft Outlook.'
                  },
                  {
                    title: 'Private and ad-free',
                    desc: 'Zero advertisements, zero third-party data tracking. Hosted strictly in Europe under EU privacy laws.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-gray-200 py-3">
                    <button
                      type="button"
                      onClick={() => setActiveEmailAccordion(activeEmailAccordion === idx ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      <span>{item.title}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${activeEmailAccordion === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {activeEmailAccordion === idx && (
                      <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed animate-in fade-in duration-200">
                        {item.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. SIMPLE YET POWERFUL (Developer & Agency Grid) */}
      <section className="py-16 sm:py-24 bg-[#0a291f] text-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 text-center">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            Simple yet powerful
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto mb-12">
            An intuitive platform anyone can use, built with the technology and depth developers and agencies need.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            
            {/* Card 1 */}
            <div className="bg-[#0e3528] rounded-2xl p-6 border border-emerald-800/80 shadow-sm hover:border-emerald-700 transition-all">
              <h3 className="font-bold text-base sm:text-lg text-white mb-2">
                Optimised for WordPress
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                1-click install or migrate easily, and enjoy top WordPress performance.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0e3528] rounded-2xl p-6 border border-emerald-800/80 shadow-sm hover:border-emerald-700 transition-all">
              <h3 className="font-bold text-base sm:text-lg text-white mb-2">
                You choose PHP version
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Use the PHP version you need for your projects and change at any time.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0e3528] rounded-2xl p-6 border border-emerald-800/80 shadow-sm hover:border-emerald-700 transition-all">
              <h3 className="font-bold text-base sm:text-lg text-white mb-2">
                MariaDB + phpMyAdmin
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Manage your databases with MariaDB and phpMyAdmin. Loved by developers.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#0e3528] rounded-2xl p-6 border border-emerald-800/80 shadow-sm hover:border-emerald-700 transition-all">
              <h3 className="font-bold text-base sm:text-lg text-white mb-2">
                SFTP and SSH access
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Access, edit, and publish securely from anywhere, the way you want.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-[#0e3528] rounded-2xl p-6 border border-emerald-800/80 shadow-sm hover:border-emerald-700 transition-all">
              <h3 className="font-bold text-base sm:text-lg text-white mb-2">
                Daily backup, easy restore
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Feel safe with backups that are ready to be restored at any moment.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-[#0e3528] rounded-2xl p-6 border border-emerald-800/80 shadow-sm hover:border-emerald-700 transition-all">
              <h3 className="font-bold text-base sm:text-lg text-white mb-2">
                Unlimited traffic
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Never worry about traffic. Your website continues to deliver, no matter what.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 8. ADD MORE SECURITY AND PERFORMANCE (Hosting Add-ons & Orbit Illustration) */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Copy, Button & Add-ons Accordion */}
            <div className="lg:col-span-6 text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Add more security and <br />
                performance
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Make your website even faster, safer, and better at reaching new customers with these hosting add-ons.
              </p>

              <div>
                <button
                  type="button"
                  onClick={scrollToPricing}
                  className="bg-[#fed000] hover:bg-[#eabf00] active:scale-98 text-slate-950 font-bold px-7 py-3.5 rounded-md text-sm sm:text-base transition-all shadow-md cursor-pointer"
                  id="web-addons-see-plans-btn"
                >
                  See plans & pricing
                </button>
              </div>

              {/* Accordion list */}
              <div className="space-y-1.5 pt-4">
                {[
                  { name: 'WP Rocket', desc: 'Caching engine to accelerate WordPress page load times.' },
                  { name: 'Domain Lock', desc: 'Prevent unauthorized domain transfers and DNS hijacking.' },
                  { name: 'SiteLock', desc: 'Continuous cloud malware scanning and automated vulnerability patching.' },
                  { name: 'Marketgoo', desc: 'Step-by-step SEO tool designed to guide beginners to top rankings.' },
                  { name: 'Termly', desc: 'Auto-updated GDPR cookie compliance banners and privacy terms.' }
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-gray-200 py-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveAddonAccordion(activeAddonAccordion === idx ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${activeAddonAccordion === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {activeAddonAccordion === idx && (
                      <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed animate-in fade-in duration-200">
                        {item.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Orbiting Ecosystem Illustration */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-emerald-200 relative flex items-center justify-center bg-[#fafdfb]">
                <div className="w-52 h-52 rounded-full border border-emerald-300 relative flex items-center justify-center">
                  
                  {/* Center User Avatar */}
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Orbiting Icons */}
                  <div className="absolute -top-4 bg-white p-2 rounded-xl shadow-md border border-gray-100 text-orange-500 font-bold text-xs">
                    W
                  </div>
                  <div className="absolute -bottom-4 bg-white p-2 rounded-xl shadow-md border border-gray-100 text-emerald-600 font-bold text-xs">
                    m
                  </div>
                  <div className="absolute -right-4 bg-white p-2 rounded-xl shadow-md border border-gray-100 text-blue-500">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="absolute -left-4 bg-white p-2 rounded-xl shadow-md border border-gray-100 text-emerald-600">
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. MOVE TO FASTER AND MORE SECURE HOSTING (Migration Diagram) */}
      <section className="py-16 sm:py-24 bg-[#fafcfb] border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Migration Flow Chart */}
            <div className="lg:col-span-6">
              <div className="bg-[#1b4334] rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900 text-white space-y-4">
                
                {/* Step 1: Current provider */}
                <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3.5 text-left text-xs">
                  <div className="flex items-center gap-2 text-slate-300 font-bold mb-1">
                    <Server className="w-4 h-4 text-gray-400" />
                    <span>Current Hosting provider</span>
                  </div>
                  <div className="text-[11px] text-gray-400">Your website is hosted with another provider</div>
                </div>

                {/* Arrow down */}
                <div className="flex justify-center text-emerald-400">
                  ↓
                </div>

                {/* Step 2: Migration Tool */}
                <div className="bg-slate-900/90 border border-emerald-500/50 rounded-xl p-3.5 text-left text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Collect Website and Data</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Website migration</span>
                  </div>
                </div>

                {/* Arrow down */}
                <div className="flex justify-center text-emerald-400">
                  ↓
                </div>

                {/* Step 3: Hostxeon migrated */}
                <div className="bg-[#008a45] rounded-xl p-3.5 text-left text-xs text-white shadow-md">
                  <div className="font-black text-sm">Hostxeon - Website migrated</div>
                  <div className="text-[11px] text-emerald-100 mt-0.5">Your website is now hosted by Hostxeon</div>
                </div>

              </div>
            </div>

            {/* Right: Copy & Migration Bullets */}
            <div className="lg:col-span-6 text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Move to faster and <br />
                more secure hosting
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Migrate your website, transfer your domain, and your digital presence to Hostxeon with easy-to-use migration tools.
              </p>

              <ul className="space-y-2.5 pt-2 text-sm sm:text-base text-gray-700">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                  <span>Transfer your domain</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                  <span>1-click WordPress migration tool</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                  <span>Our human support team is ready to help you with other migrations</span>
                </li>
              </ul>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={scrollToPricing}
                  className="bg-[#fed000] hover:bg-[#eabf00] active:scale-98 text-slate-950 font-bold px-7 py-3.5 rounded-md text-sm sm:text-base transition-all shadow-md cursor-pointer"
                  id="web-migration-choose-plan-btn"
                >
                  Choose your plan
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. LOOKING FOR SOMETHING DIFFERENT? (Managed WordPress Callout) */}
      <section className="py-16 sm:py-24 bg-[#0a291f] text-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Copy & Button */}
            <div className="lg:col-span-6 text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Looking for <br />
                something <br />
                different?
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                Try Managed Hosting for WordPress and take your WordPress experience to the next level.
              </p>

              <ul className="space-y-2 pt-2 text-xs sm:text-sm text-emerald-50">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span>Automatic core and plugin updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span>Daily backups and easy restore</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span>Enhanced monitoring and security</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span>Expert priority support</span>
                </li>
              </ul>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onGoToWordPress}
                  className="bg-[#fed000] hover:bg-[#eabf00] active:scale-98 text-slate-950 font-bold px-7 py-3.5 rounded-md text-sm sm:text-base transition-all shadow-md cursor-pointer"
                  id="web-explore-managed-wp-btn"
                >
                  Explore Managed WP
                </button>
              </div>
            </div>

            {/* Right: Plumber Co Mockup with Performance Gauges */}
            <div className="lg:col-span-6">
              <div className="bg-white text-slate-900 rounded-3xl p-5 shadow-2xl border border-gray-200 text-left overflow-hidden">
                <div className="text-[11px] text-gray-500 font-mono mb-2">thegreenplumber.co.uk</div>
                
                {/* Score Pills */}
                <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                  <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                    <div className="text-emerald-700 font-bold text-sm">97%</div>
                    <div className="text-[9px] text-gray-600">Performance</div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                    <div className="text-emerald-700 font-bold text-sm">76%</div>
                    <div className="text-[9px] text-gray-600">Accessibility</div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                    <div className="text-emerald-700 font-bold text-sm">91%</div>
                    <div className="text-[9px] text-gray-600">Best practices</div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                    <div className="text-emerald-700 font-bold text-sm">86%</div>
                    <div className="text-[9px] text-gray-600">SEO</div>
                  </div>
                </div>

                <div className="font-bold text-xl leading-tight">
                  Building better Bathrooms and Kitchens
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. READY TO BUILD WITH AI? (AIDA AI Website Builder Callout) */}
      <section className="py-16 sm:py-24 bg-[#051f17] text-white border-t border-emerald-950">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Pottery Essentials Mobile Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-64 sm:w-72 bg-slate-900 rounded-3xl p-3 border-4 border-slate-700 shadow-2xl text-left">
                <div className="bg-white rounded-2xl p-4 text-slate-900 space-y-2">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Order overview</div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div className="font-bold text-sm">Your payment was a success</div>
                  <div className="text-[11px] text-gray-500">Total paid: £39.00</div>
                  <div className="pt-2">
                    <div className="w-full bg-[#008a45] text-white text-[10px] font-bold py-1.5 rounded text-center">
                      Order processed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Copy, Bullets & Button */}
            <div className="lg:col-span-6 text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Ready to build with <br />
                AI?
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                Try Aida AI Website Builder and create a professional website in minutes by simply chatting with AI.
              </p>

              <ul className="space-y-2 pt-2 text-xs sm:text-sm text-emerald-50">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span>Get online fast</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span>Build faster with AI</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span>Upgrade as you grow</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span>Unlock multi-page websites</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span>No technical skills required</span>
                </li>
              </ul>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onOpenBuilder}
                  className="bg-[#fed000] hover:bg-[#eabf00] active:scale-98 text-slate-950 font-bold px-7 py-3.5 rounded-md text-sm sm:text-base transition-all shadow-md cursor-pointer"
                  id="web-explore-aida-btn"
                >
                  Explore AIDA AI Website Builder
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. CUSTOMER REVIEWS (Our customers like us) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-10 bg-white border-t border-gray-100 max-w-screen-2xl mx-auto text-left">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Our customers like us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {customerReviews.map((rev, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow text-xs">
              <div>
                <div className="flex items-center justify-between text-gray-400 text-[10px] mb-2">
                  <span>{rev.date}</span>
                  <div className="flex gap-0.5">
                    {[...Array(rev.stars)].map((_, i) => (
                      <span key={i} className="w-3.5 h-3.5 bg-[#00b67a] text-white flex items-center justify-center rounded-[2px] text-[8px]">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed min-h-[60px]">
                  "{rev.comment}"
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 mt-3 font-semibold text-slate-900">
                {rev.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. NEED HELP? WE ARE HERE FOR YOU! (4 Support Cards) */}
      <section className="py-16 sm:py-20 bg-[#fafcfb] border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 text-center">
          
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mb-12">
            Need help? We are here for you!
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Help center</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed min-h-[60px]">
                  Have an issue but like learning on your own? We have a dedicated team creating the best help articles for you.
                </p>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={onOpenLiveChat}
                  className="w-full bg-white hover:bg-gray-50 text-slate-900 border border-gray-300 font-semibold py-2.5 px-4 rounded-lg text-xs sm:text-sm transition-colors cursor-pointer text-center"
                >
                  Fix it yourself
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Chat support</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed min-h-[60px]">
                  We are always here to help you. 24/7 - 365 days a year.
                </p>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={onOpenLiveChat}
                  className="w-full bg-white hover:bg-gray-50 text-slate-900 border border-gray-300 font-semibold py-2.5 px-4 rounded-lg text-xs sm:text-sm transition-colors cursor-pointer text-center"
                >
                  Chat with us
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Academy</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed min-h-[60px]">
                  Learn more about ecommerce, marketing, business, and much more with in-depth guides, tips & tricks.
                </p>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={onOpenLiveChat}
                  className="w-full bg-white hover:bg-gray-50 text-slate-900 border border-gray-300 font-semibold py-2.5 px-4 rounded-lg text-xs sm:text-sm transition-colors cursor-pointer text-center"
                >
                  Become an expert
                </button>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Email support</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed min-h-[60px]">
                  Whatever your question, we will respond within 24 hours all year round.
                </p>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={onOpenLiveChat}
                  className="w-full bg-white hover:bg-gray-50 text-slate-900 border border-gray-300 font-semibold py-2.5 px-4 rounded-lg text-xs sm:text-sm transition-colors cursor-pointer text-center"
                >
                  Contact us
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 14. FREQUENTLY ASKED QUESTIONS (Complete 16 FAQs from Image) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-10 bg-white border-t border-gray-100 max-w-screen-2xl mx-auto text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Frequently asked questions
          </h2>
          <button
            type="button"
            onClick={scrollToPricing}
            className="bg-[#fed000] hover:bg-[#eabf00] text-slate-950 font-bold px-5 py-2.5 rounded-md text-xs sm:text-sm transition-all shadow-xs cursor-pointer self-start sm:self-auto"
          >
            See plans & pricing
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {faqList.map((item, idx) => (
            <div key={idx} className="py-4 sm:py-5">
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-semibold text-sm sm:text-base text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                id={`web-faq-btn-${idx}`}
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed animate-in fade-in duration-200">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
