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
  ChevronUp, 
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
  Flame,
  Search,
  CheckCircle,
  Database,
  Layers,
  X
} from 'lucide-react';
import { CartItem } from '../types';

interface WordPressHostingPageProps {
  onAddToCart: (item: CartItem) => void;
  onOpenLiveChat: () => void;
  onOpenBuilder: () => void;
  onOpenPricing?: () => void;
  onGoToWebHosting?: () => void;
}

export const WordPressHostingPage: React.FC<WordPressHostingPageProps> = ({
  onAddToCart,
  onOpenLiveChat,
  onOpenBuilder,
  onGoToWebHosting,
}) => {
  // Target audience tab state
  const [activeAudienceTab, setActiveAudienceTab] = useState<'beginner' | 'entrepreneurs' | 'small-business'>('beginner');

  // Pricing feature comparison toggle
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);

  // Accordion states
  const [activeUpdateAccordion, setActiveUpdateAccordion] = useState<number | null>(0);
  const [activeSecurityAccordion, setActiveSecurityAccordion] = useState<number | null>(0);
  const [activeMarketplaceAccordion, setActiveMarketplaceAccordion] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Video modal state for Bokföringskompaniet
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const scrollToPricing = () => {
    const el = document.getElementById('wp-pricing-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddStarter = () => {
    onAddToCart({
      id: 'wp-starter-plan',
      type: 'hosting',
      title: 'WordPress Hosting Starter',
      subtitle: '1-year subscription (Pay £44.16 now, then £167.76/yr)',
      price: 44.16,
      period: '1 year',
    });
  };

  const handleAddPro = () => {
    onAddToCart({
      id: 'wp-pro-plan',
      type: 'hosting',
      title: 'WordPress Hosting Professional',
      subtitle: 'Most Popular - 1-year subscription (Pay £44.16 now, then £215.76/yr)',
      price: 44.16,
      period: '1 year',
    });
  };

  // FAQs data matching the user's image
  const faqList = [
    {
      q: "What is WordPress?",
      a: "WordPress is the world's most popular open-source content management system (CMS), powering over 40% of all websites globally. It gives you complete creative freedom to build blogs, business sites, portfolio showcases, and full-featured e-commerce stores with thousands of customizable themes and plugins."
    },
    {
      q: "What is managed hosting for WordPress?",
      a: "Managed WordPress hosting is an optimized hosting solution where our expert systems manage all technical complexities for you: automatic security patches, automated core and plugin updates with visual regression checks, cloud staging environments, daily offsite backups, and server-level caching so your site stays fast and bulletproof."
    },
    {
      q: "What's the difference between Managed WP and your other WordPress hosting?",
      a: "Standard WordPress hosting gives you server space and a 1-click installer. Managed WordPress hosting goes significantly further with automated visual regression testing for updates, prioritized CPU & RAM performance, daily cloud backups with 1-click restore, malware scanner, vulnerability auto-patching, and dedicated WordPress specialist support."
    },
    {
      q: "Do I need managed hosting for WordPress, or is regular hosting enough?",
      a: "If you want complete peace of mind without worrying about plugin conflicts breaking your site, hacking vulnerabilities, or slow database queries, managed hosting is the premier choice. It frees you to focus 100% on creating content and growing your business while we handle performance and maintenance."
    },
    {
      q: "What's included in managed hosting for WordPress?",
      a: "Every managed plan includes NVMe high-speed storage, free custom domain for the first year, free wildcard SSL certificates, business email accounts, automatic core/plugin updates with visual verification, staging environment sandbox, daily automated backups, 1-click restore, and 24/7 priority support."
    },
    {
      q: "Can I try changes before they go live?",
      a: "Yes! Every Managed WordPress plan includes a dedicated 1-click Staging Environment. You can clone your production website into a private sandbox, test new plugins, major updates, or redesigns safely, and push changes live with a single click once you're satisfied."
    },
    {
      q: "How does Hostxeon keep my site secure?",
      a: "We deploy multiple layers of defense: an enterprise Web Application Firewall (WAF), hardware DDoS mitigation, DNSSEC tamper-proofing, automated vulnerability scanning, SSL encryption, and automated isolated patches for vulnerable plugins before exploits can spread."
    },
    {
      q: "Is managed hosting for WordPress secure?",
      a: "Extremely secure. All our servers reside in ISO-27001 certified European data centres complying with stringent GDPR regulations. We perform 24/7 threat monitoring and continuous malware scanning."
    },
    {
      q: "How do I move my existing site over to you?",
      a: "We offer both an automated 1-click WordPress migration tool and free white-glove migration by our engineering specialists. Simply enter your credentials and we migrate your database, files, and email accounts with zero downtime."
    },
    {
      q: "I'm a small business owner. Is managed hosting for me?",
      a: "Absolutely. Small business owners love our managed service because it eliminates the cost of hiring an expensive web developer just to run updates and backups. Your site remains fast, operational, and secure automatically."
    },
    {
      q: "I manage websites for clients. Is managed hosting a good fit for me?",
      a: "Yes. With staging environments, automatic visual regression tests, multi-domain support on the Professional tier, and unified dashboard controls, managing client websites becomes effortless and highly profitable."
    }
  ];

  return (
    <div className="w-full bg-white text-[#111827]" id="wordpress-hosting-page">

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

      {/* 1. HERO SECTION (Dark Green Background with Floral Mockup & Badges) */}
      <section 
        className="relative overflow-hidden bg-[#0a291f] text-white py-14 sm:py-20 lg:py-24"
        style={{
          backgroundImage: `radial-gradient(rgba(52, 211, 153, 0.12) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading & Key Points */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-6 text-left">
              
              {/* Category Pill */}
              <div className="inline-flex items-center gap-1.5 text-emerald-300 text-sm sm:text-base font-medium tracking-wide">
                <span>Hosting for WordPress</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12]">
                All you need for a <br />
                <span className="text-white">WordPress site</span>
              </h1>

              {/* Bullet Points */}
              <ul className="space-y-3 text-base sm:text-lg text-emerald-50/90 font-normal">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  <span>Fast, secure website performance</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  <span>Automatic updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  <span>Hosted on European servers</span>
                </li>
              </ul>

              {/* Yellow Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToPricing}
                  className="bg-[#fed000] hover:bg-[#eabf00] active:scale-98 text-slate-950 font-bold px-7 py-3.5 rounded-md text-base sm:text-lg transition-all shadow-md cursor-pointer"
                  id="wp-hero-see-plans-btn"
                >
                  See plans and pricing
                </button>
              </div>

            </div>

            {/* Right Column: Yards&Flowers Showcase & Badges */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* Browser Window Mockup */}
              <div className="w-full max-w-lg lg:max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/40 bg-[#16382c] relative">
                
                {/* Browser bar */}
                <div className="bg-[#1a4234] px-4 py-2.5 border-b border-emerald-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                  </div>
                  <div className="text-[11px] text-emerald-200/80 font-mono">
                    yardsandflowers.com
                  </div>
                  <div className="w-6" />
                </div>

                {/* Florist Site Preview */}
                <div className="relative h-[320px] sm:h-[380px] w-full overflow-hidden bg-slate-950">
                  <img 
                    src="https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop" 
                    alt="Handpicked flowers locally sourced florist arranging bouquet"
                    className="w-full h-full object-cover object-center opacity-85 brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Top nav inside mockup */}
                  <div className="absolute top-4 left-6 right-6 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1.5 font-bold tracking-wide">
                      <span className="text-emerald-400">❀</span> Yards&Flowers
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <span>Shop</span>
                      <span>Story</span>
                      <span>Cart (2)</span>
                    </div>
                  </div>

                  {/* Headline inside mockup */}
                  <div className="absolute left-6 bottom-8 max-w-xs text-left">
                    <h2 className="text-2xl sm:text-3xl text-white font-serif leading-tight">
                      Handpicked flowers <br />
                      locally sourced
                    </h2>
                  </div>

                  {/* AI Badge inside preview */}
                  <div className="absolute bottom-6 right-6 bg-[#008a45] text-white text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-[#fed000]" />
                    <span>AI +</span>
                  </div>
                </div>

              </div>

              {/* Floating Badge 1: Plugins (Top-Right Green) */}
              <div className="absolute -top-3 right-6 sm:right-10 bg-[#008a45] text-white font-bold text-sm sm:text-base px-5 py-2.5 rounded-xl shadow-xl z-20 transform rotate-1">
                Plugins
              </div>

              {/* Floating Badge 2: Themes (Middle-Right Yellow) */}
              <div className="absolute top-12 -right-3 sm:right-2 bg-[#fed000] text-slate-950 font-bold text-sm sm:text-base px-6 py-2.5 rounded-xl shadow-xl z-20 transform -rotate-2">
                Themes
              </div>

              {/* Floating Badge 3: AI Builder (Top-Right-Center Dark) */}
              <div className="absolute top-28 right-4 sm:right-8 bg-slate-950 text-white font-bold text-sm sm:text-base px-6 py-2.5 rounded-xl shadow-xl z-20 border border-slate-700">
                AI Builder
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. GUARANTEE STRIP (Green Checkmarks) */}
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
            <span>Free SSL certificate</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#008a45] stroke-[3]" />
            <span>Email included</span>
          </div>
        </div>
      </div>

      {/* 3. PRICING SECTION (Starter vs. Professional) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-10 max-w-screen-2xl mx-auto" id="wp-pricing-section">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#008a45] text-xs font-bold tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Managed WordPress</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-4">
            Choose the WordPress hosting plan <br className="hidden sm:inline" />
            that works for you
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Focus on your business while WordPress is maintained for you with automated updates, enhanced security and priority support.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Plan 1: Starter */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between hover:border-gray-300 transition-all text-left">
            <div>
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-slate-900">Starter</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 min-h-[40px]">
                  Everything you need to get your first website online.
                </p>
              </div>

              {/* Price block */}
              <div className="pt-2 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="line-through text-xs text-gray-400">£13.98/mo.</div>
                  <span className="bg-[#fff9db] text-[#b28900] text-[11px] font-bold px-2 py-0.5 rounded">
                    You save 74%
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">£3.68</span>
                  <span className="text-sm font-semibold text-gray-500">/mo.</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1 font-medium">
                  <strong>1-year subscription</strong> <br />
                  Pay £44.16 now, then £167.76 on renewal.
                </p>
              </div>

              {/* Primary Action Button */}
              <div className="py-5">
                <button
                  type="button"
                  onClick={handleAddStarter}
                  className="w-full bg-[#07251c] hover:bg-[#0c382b] active:scale-98 text-white font-bold py-3.5 rounded-lg text-sm sm:text-base transition-all shadow-md cursor-pointer text-center"
                  id="wp-plan-starter-btn"
                >
                  Get started
                </button>
              </div>

              {/* Core Spec List */}
              <div className="space-y-2.5 text-xs sm:text-sm text-gray-700 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>Free domain for first year</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Managed hosting for 1 WordPress website</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>1 GB RAM & 1 CPU -prio</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>1 free email account</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>25 GB SSD Storage</span>
                </div>
              </div>

              {/* Starter benefits list */}
              <div className="pt-4">
                <div className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                  Starter benefits
                </div>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>SSL certificate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>1 self-managed website</span>
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
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>WP migration tool</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Staging environment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Plugin, theme, core auto-update with visual testing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Vulnerability monitor with security auto-patches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Uptime monitor in app</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Plan 2: Professional (Most Popular Ribbon) */}
          <div className="bg-[#f7fbf8] rounded-2xl border-2 border-emerald-600 shadow-lg p-6 sm:p-8 flex flex-col justify-between relative hover:shadow-xl transition-all text-left">
            
            {/* Top Most Popular Ribbon */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#008a45] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Most popular
            </div>

            <div>
              {/* Header */}
              <div className="mb-4 pt-1">
                <h3 className="text-2xl font-bold text-slate-900">Professional</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 min-h-[40px]">
                  Room to grow as your business and traffic build
                </p>
              </div>

              {/* Price block */}
              <div className="pt-2 pb-4 border-b border-emerald-200/60">
                <div className="flex items-center justify-between">
                  <div className="line-through text-xs text-gray-400">£17.98/mo.</div>
                  <span className="bg-[#fff9db] text-[#b28900] text-[11px] font-bold px-2 py-0.5 rounded">
                    You save 80%
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">£3.68</span>
                  <span className="text-sm font-semibold text-gray-500">/mo.</span>
                </div>
                <p className="text-[11px] text-gray-600 mt-1 font-medium">
                  <strong>1-year subscription</strong> <br />
                  Pay £44.16 now, then £215.76 on renewal.
                </p>
              </div>

              {/* Primary Action Button (Yellow) */}
              <div className="py-5">
                <button
                  type="button"
                  onClick={handleAddPro}
                  className="w-full bg-[#fed000] hover:bg-[#eabf00] active:scale-98 text-slate-950 font-bold py-3.5 rounded-lg text-sm sm:text-base transition-all shadow-md cursor-pointer text-center"
                  id="wp-plan-pro-btn"
                >
                  Get started
                </button>
              </div>

              {/* Core Spec List */}
              <div className="space-y-2.5 text-xs sm:text-sm text-gray-800 py-3 border-b border-emerald-200/60">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Free domain for first year</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Managed hosting for 1 WordPress website</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">2 GB RAM & 2 CPU -prio</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>5 free email accounts</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">50 GB SSD Storage</span>
                </div>
              </div>

              {/* Professional Benefits */}
              <div className="pt-4">
                <div className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                  Everything in Starter, plus:
                </div>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                    <span className="font-semibold">Daily backup & restore</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                    <span className="font-semibold">3 self-managed websites</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Double RAM & CPU performance priority</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Priority telephone & live chat queue</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>

        {/* Show More Features Dropdown Toggle */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowMoreFeatures(!showMoreFeatures)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-emerald-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-full transition-all cursor-pointer"
            id="show-more-features-btn"
          >
            <span>{showMoreFeatures ? 'Hide features' : 'Show more features'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showMoreFeatures ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expanded Feature Comparison Matrix */}
        {showMoreFeatures && (
          <div className="mt-8 overflow-x-auto border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm animate-in fade-in duration-300">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-900 font-bold">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4">Starter</th>
                  <th className="py-3 px-4 text-emerald-700">Professional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">WordPress Sites Supported</td>
                  <td className="py-3 px-4">1 Managed + 1 Self-Managed</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">1 Managed + 3 Self-Managed</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">SSD Storage</td>
                  <td className="py-3 px-4">25 GB NVMe</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">50 GB NVMe</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">RAM Allocation</td>
                  <td className="py-3 px-4">1 GB Dedicated</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">2 GB Dedicated</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Visual Regression Testing</td>
                  <td className="py-3 px-4 text-emerald-600">Included</td>
                  <td className="py-3 px-4 text-emerald-600">Included</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Staging Environment</td>
                  <td className="py-3 px-4 text-emerald-600">1-Click Sandbox</td>
                  <td className="py-3 px-4 text-emerald-600">1-Click Sandbox</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Support Level</td>
                  <td className="py-3 px-4">24/7 Standard</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">24/7 Priority Queue</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </section>

      {/* 4. BUILT FOR ANYONE RUNNING A WORDPRESS SITE (Audience Tabs) */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight leading-tight mb-6">
              Built for anyone running a WordPress <br />
              site
            </h2>

            {/* Audience Switcher Tabs */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1 bg-gray-100 rounded-full">
              <button
                type="button"
                onClick={() => setActiveAudienceTab('beginner')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeAudienceTab === 'beginner' 
                    ? 'bg-slate-950 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                id="tab-beginner-btn"
              >
                Beginner WordPress users
              </button>
              <button
                type="button"
                onClick={() => setActiveAudienceTab('entrepreneurs')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeAudienceTab === 'entrepreneurs' 
                    ? 'bg-slate-950 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                id="tab-entrepreneurs-btn"
              >
                Entrepreneurs
              </button>
              <button
                type="button"
                onClick={() => setActiveAudienceTab('small-business')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeAudienceTab === 'small-business' 
                    ? 'bg-slate-950 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                id="tab-small-business-btn"
              >
                Small businesses
              </button>
            </div>
          </div>

          {/* Dynamic Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-screen-2xl mx-auto">
            
            {/* Left Column: Copy */}
            <div className="lg:col-span-6 text-left space-y-4">
              {activeAudienceTab === 'beginner' && (
                <>
                  <h3 className="text-2xl sm:text-3xl font-normal text-slate-900 leading-tight">
                    For beginner WordPress <br />
                    users
                  </h3>
                  <p className="text-base text-gray-600">
                    New to websites? We keep WordPress simple, start to finish.
                  </p>
                  <ul className="space-y-3 pt-2 text-sm sm:text-base text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
                      <span>One login for your domain, email and site — no juggling dashboards.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
                      <span>Stuck? Ask a WordPress specialist anytime.</span>
                    </li>
                  </ul>
                </>
              )}

              {activeAudienceTab === 'entrepreneurs' && (
                <>
                  <h3 className="text-2xl sm:text-3xl font-normal text-slate-900 leading-tight">
                    For fast-moving <br />
                    entrepreneurs
                  </h3>
                  <p className="text-base text-gray-600">
                    Launch in minutes, test MVPs, and scale traffic without technical roadblocks.
                  </p>
                  <ul className="space-y-3 pt-2 text-sm sm:text-base text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
                      <span>Automated e-commerce & WooCommerce integration ready in 1 click.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
                      <span>Scalable NVMe SSD memory spikes automatically during traffic surges.</span>
                    </li>
                  </ul>
                </>
              )}

              {activeAudienceTab === 'small-business' && (
                <>
                  <h3 className="text-2xl sm:text-3xl font-normal text-slate-900 leading-tight">
                    For growing <br />
                    small businesses
                  </h3>
                  <p className="text-base text-gray-600">
                    Protect your brand reputation with enterprise uptime and bulletproof security.
                  </p>
                  <ul className="space-y-3 pt-2 text-sm sm:text-base text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
                      <span>Professional matching email (you@yourbusiness.com) included.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
                      <span>Daily backups and automated restore ensure zero data loss.</span>
                    </li>
                  </ul>
                </>
              )}
            </div>

            {/* Right Column: Person Image */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Entrepreneur working focused at computer desk" 
                  className="w-full h-[320px] sm:h-[380px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. GET YOUR WEBSITE UP AND RUNNING (Speed 100 Graphic) */}
      <section className="py-16 sm:py-20 bg-[#fafcfb] border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Speed Graphic in Browser */}
            <div className="lg:col-span-6">
              <div className="bg-[#0b2920] rounded-2xl p-6 sm:p-8 shadow-xl text-left relative overflow-hidden border border-emerald-900">
                {/* Browser bar */}
                <div className="flex items-center gap-1.5 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                </div>

                {/* Score Card overlay */}
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-xl p-5 max-w-xs">
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-400 bg-emerald-950/80 flex items-center justify-center text-emerald-400 font-extrabold text-lg mb-3">
                    100
                  </div>
                  <div className="font-bold text-white text-base">
                    High Performance
                  </div>
                  <p className="text-xs text-gray-300 mt-1 mb-4 leading-relaxed">
                    Your website has an ideal stability and speed
                  </p>
                  <button
                    type="button"
                    onClick={scrollToPricing}
                    className="bg-slate-700/70 hover:bg-slate-600 text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer"
                  >
                    Speed up
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Copy & Bullet Points */}
            <div className="lg:col-span-6 text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Get your website up <br />
                and running
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Starting up your website? We handle the technical side — setup, updates, backups, and security — so you can focus on your content.
              </p>

              <div className="space-y-3 pt-2 text-sm sm:text-base text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-slate-900 mt-2 shrink-0" />
                  <div>
                    <strong className="text-slate-900">Fast hosting</strong> — Fast storage and smart caching keep your site speedy, without manual tuning.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-slate-900 mt-2 shrink-0" />
                  <div>
                    <strong className="text-slate-900">Easy setup wizard</strong> — answer a few simple questions and we set everything up for you. No technical knowledge required.
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={scrollToPricing}
                  className="bg-[#fed000] hover:bg-[#eabf00] active:scale-98 text-slate-950 font-bold px-7 py-3.5 rounded-md text-sm sm:text-base transition-all shadow-md cursor-pointer"
                  id="wp-speed-get-started-btn"
                >
                  Get started
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. UPDATE STRESS-FREE (Accordion & WordPress Dashboard Graphic) */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Accordion */}
            <div className="lg:col-span-6 text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Update stress-free
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Worried an update will break your WordPress site? Our hosting is designed to prevent that.
              </p>

              {/* Accordion list */}
              <div className="space-y-2 pt-2">
                {[
                  {
                    title: 'Automatic updates',
                    desc: 'WordPress core, themes, and plugins update automatically with smart scheduling so you never fall behind on security.'
                  },
                  {
                    title: 'Checked before it goes live',
                    desc: 'Our visual regression AI captures before-and-after snapshots. If anything breaks visually, the update is rolled back automatically.'
                  },
                  {
                    title: 'A safe space to try changes',
                    desc: 'Spin up a private 1-click staging copy anytime to test radical theme changes or custom code before publishing.'
                  },
                  {
                    title: 'Backups with one-click recovery',
                    desc: 'Daily automated cloud snapshots with instant rollback so you can restore your site with a single button press.'
                  },
                  {
                    title: 'Priority support',
                    desc: 'Dedicated WordPress technical engineers standing by 24/7 via live chat and phone to assist with any plugin conflict.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-gray-200 py-3">
                    <button
                      type="button"
                      onClick={() => setActiveUpdateAccordion(activeUpdateAccordion === idx ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      <span>{item.title}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${activeUpdateAccordion === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {activeUpdateAccordion === idx && (
                      <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed animate-in fade-in duration-200">
                        {item.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: WordPress Updates UI Mockup in Mint Green Box */}
            <div className="lg:col-span-6">
              <div className="bg-[#e4f7eb] rounded-3xl p-6 sm:p-10 flex items-center justify-center relative">
                
                {/* WordPress Dashboard Card */}
                <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-5 w-full max-w-sm border border-slate-700 text-left relative">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-[10px]">
                        W
                      </div>
                      <span className="font-semibold text-slate-200">Updates</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">Auto-update: ON</span>
                  </div>

                  {/* Updates list mockup */}
                  <div className="space-y-2 py-3 text-[11px] text-slate-300">
                    <div className="flex items-center justify-between p-1.5 rounded bg-slate-800/60">
                      <span>WordPress 6.7</span>
                      <span className="text-emerald-400">Verified ✓</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded bg-slate-800/60">
                      <span>WooCommerce</span>
                      <span className="text-emerald-400">Verified ✓</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded bg-slate-800/60">
                      <span>RankMath SEO</span>
                      <span className="text-emerald-400">Verified ✓</span>
                    </div>
                  </div>

                  {/* Floating Modal Card overlay: Update complete */}
                  <div className="bg-white text-slate-900 rounded-xl p-4 shadow-xl border border-gray-100 mt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-[#008a45]" />
                      <span className="font-bold text-sm">Update complete</span>
                    </div>
                    <div className="space-y-1 text-[11px] text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Backup created</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>All updates installed</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Site running smoothly</span>
                      </div>
                    </div>
                  </div>

                  {/* WordPress logo in corner */}
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-md">
                    W
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. SECURITY FULLY HANDLED FOR YOU */}
      <section className="py-16 sm:py-20 bg-[#fafcfb] border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Security Badges Container */}
            <div className="lg:col-span-6">
              <div className="bg-[#0b2920] rounded-2xl p-6 sm:p-8 shadow-xl text-left space-y-4 border border-emerald-900">
                
                {/* Badge 1: DDoS */}
                <div className="bg-emerald-950/80 border border-emerald-800/80 rounded-xl p-4 flex items-center gap-4 text-white">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">DDoS Protection</div>
                    <div className="text-xs text-emerald-200/80">Stops attacks and keeps you online</div>
                  </div>
                </div>

                {/* Badge 2: WAF */}
                <div className="bg-emerald-950/80 border border-emerald-800/80 rounded-xl p-4 flex items-center gap-4 text-white">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">WAF</div>
                    <div className="text-xs text-emerald-200/80">Web Application Firewall</div>
                  </div>
                </div>

                {/* Badge 3: DNSSEC */}
                <div className="bg-emerald-950/80 border border-emerald-800/80 rounded-xl p-4 flex items-center gap-4 text-white">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">DNSSEC</div>
                    <div className="text-xs text-emerald-200/80">Protects your DNS from tampering</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Copy, Button & Accordion */}
            <div className="lg:col-span-6 text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Security fully handled <br />
                for you
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                You shouldn't have to think about whether your site is safe. We monitor it around the clock, so you don't have to.
              </p>

              <div>
                <button
                  type="button"
                  onClick={scrollToPricing}
                  className="bg-[#fed000] hover:bg-[#eabf00] active:scale-98 text-slate-950 font-bold px-7 py-3.5 rounded-md text-sm sm:text-base transition-all shadow-md cursor-pointer"
                  id="wp-security-see-plans-btn"
                >
                  See plans and pricing
                </button>
              </div>

              {/* Accordion */}
              <div className="space-y-2 pt-4">
                {[
                  {
                    title: 'Automatic security fixes',
                    desc: 'Known vulnerabilities are automatically patched at the server and application level before attackers can probe them.'
                  },
                  {
                    title: 'Built-in protection',
                    desc: 'Continuous real-time scanning against brute-force login attacks, spam bots, and malicious script uploads.'
                  },
                  {
                    title: 'Hosted in Europe, protected by design',
                    desc: 'Operated under strict EU privacy regulations with zero third-party telemetry and full GDPR compliance.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-gray-200 py-3">
                    <button
                      type="button"
                      onClick={() => setActiveSecurityAccordion(activeSecurityAccordion === idx ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      <span>{item.title}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${activeSecurityAccordion === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {activeSecurityAccordion === idx && (
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

      {/* 8. GROW YOUR SITE WHENEVER YOU'RE READY (WP Marketplace) */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Copy & Marketplace list */}
            <div className="lg:col-span-6 text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Grow your site <br />
                whenever you're ready
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                As your site grows, add extra tools whenever you need them. No developer required, all available in our WP Marketplace.
              </p>

              {/* Accordion tools */}
              <div className="space-y-1.5 pt-2">
                {[
                  { name: 'WP Rocket', desc: 'Industry-leading caching plugin to supercharge page load times instantly.' },
                  { name: 'Rank Math', desc: 'All-in-one SEO optimization to help you rank #1 on Google search.' },
                  { name: 'Imagify', desc: 'Automatic next-gen WebP image compression with zero visual quality loss.' },
                  { name: 'Termly', desc: 'Compliant privacy policies, cookie banners, and terms generated automatically.' },
                  { name: 'Shore', desc: 'Online appointment booking, calendar sync, and client management for services.' },
                  { name: 'Social Pilot', desc: 'Schedule and automate social media marketing across all channels from WordPress.' }
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-gray-200 py-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveMarketplaceAccordion(activeMarketplaceAccordion === idx ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${activeMarketplaceAccordion === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {activeMarketplaceAccordion === idx && (
                      <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed animate-in fade-in duration-200">
                        {item.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Dark Managed Hosting UI Mockup */}
            <div className="lg:col-span-6">
              <div className="bg-slate-950 text-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-800 text-left">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white text-slate-950 flex items-center justify-center font-bold text-xs">
                      W
                    </div>
                    <span className="font-bold text-sm">Managed Hosting for WordPress</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    All systems operational
                  </span>
                </div>

                {/* Dashboard grid features */}
                <div className="grid grid-cols-2 gap-3.5 my-4">
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                    <RefreshCw className="w-4 h-4 text-emerald-400 mb-1.5" />
                    <div className="font-bold text-xs text-white">Automatic updates</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Core & plugins protected</div>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-[#fed000] mb-1.5" />
                    <div className="font-bold text-xs text-white">Daily backups</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">Active</div>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                    <Zap className="w-4 h-4 text-[#fed000] mb-1.5" />
                    <div className="font-bold text-xs text-white">NVMe SSD</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">High performance</div>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1.5" />
                    <div className="font-bold text-xs text-white">EU servers</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">GDPR-native</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. MOVING YOUR SITE TO US IS EASY (Dark Forest Green 3-Column Banner) */}
      <section className="bg-[#051f17] text-white py-14 sm:py-18 border-y border-emerald-950">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 text-center">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
            Moving your site to us is easy
          </h2>
          <p className="text-sm sm:text-base text-emerald-200/90 mb-12">
            Get faster and more secure hosting today.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-screen-2xl mx-auto">
            
            {/* Column 1 */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">
                Move your site in one click
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Use our 1-click migration tool to transfer your WordPress site quickly and easily.
              </p>
            </div>

            {/* Column 2 */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">
                Free WordPress migration
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Our experts will move one WordPress site free, so you can avoid the technical hassle.
              </p>
            </div>

            {/* Column 3 */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">
                Move your domain with ease
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Transfer your domain to Hostxeon and manage your domain and site in one place.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 10. CUSTOMER STORY: Bokföringskompaniet */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 text-left">
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                The story of <br />
                Bokföringskompaniet
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Swedish accounting firm Bokföringskompaniet needed a website that reflected their customer-centric approach. Discover how a website at Hostxeon has been key to the company's success!
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={scrollToPricing}
                  className="bg-[#fed000] hover:bg-[#eabf00] active:scale-98 text-slate-950 font-bold px-6 py-3 rounded-md text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                >
                  See plans and pricing
                </button>
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="bg-white hover:bg-gray-50 border border-gray-300 text-slate-900 font-semibold px-6 py-3 rounded-md text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Get inspired
                </button>
              </div>
            </div>
          </div>

          {/* Large Video Box */}
          <div 
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full h-[280px] sm:h-[420px] rounded-3xl overflow-hidden bg-slate-950 relative shadow-2xl group cursor-pointer border border-gray-200"
          >
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop" 
              alt="Bokföringskompaniet Swedish team meeting"
              className="w-full h-full object-cover object-center opacity-75 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 group-hover:bg-white text-slate-950 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-[#008a45] fill-[#008a45] ml-1" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 text-white text-left">
              <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">Customer Showcase</div>
              <div className="text-lg sm:text-xl font-bold">Watch: How Bokföringskompaniet scaled online</div>
            </div>
          </div>

        </div>
      </section>

      {/* 11. HAVE QUESTIONS? GET IN TOUCH (Support Callout) */}
      <section className="py-14 sm:py-18 bg-[#fafcfb] border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Specialist Photo with Chat Bubble */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
                  alt="Customer support specialist smiling"
                  className="w-full h-[280px] sm:h-[320px] object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Chat Bubble */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-gray-100 flex items-center gap-2.5 text-left text-xs font-semibold text-slate-900">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>"We have fixed the issue with your website"</span>
                </div>
              </div>
            </div>

            {/* Right: Heading, Text & Button */}
            <div className="lg:col-span-7 text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Have questions? Get in <br />
                touch.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg">
                Our WordPress specialists can help you choose the right plan and get set up — fully managed, totally transparent, no surprises.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenLiveChat}
                  className="bg-[#fed000] hover:bg-[#eabf00] active:scale-98 text-slate-950 font-bold px-7 py-3.5 rounded-md text-sm sm:text-base transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                  id="wp-start-chat-experts-btn"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start a chat with our experts</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. NOT SURE WORDPRESS IS RIGHT FOR YOU? (2 Alternative Options) */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Not sure <br />
                WordPress is right <br />
                for you?
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-0 font-medium">
              Explore other options for your website!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            
            {/* Card 1: Web Hosting */}
            <div 
              onClick={() => {
                if (onGoToWebHosting) {
                  onGoToWebHosting();
                } else {
                  scrollToPricing();
                }
              }}
              className="group bg-[#0c2b21] rounded-3xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Web hosting
                  </h3>
                  <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs sm:text-sm text-emerald-100/80 mb-6">
                  Reliable European hosting that keeps your business online, if you don't need WordPress specifically.
                </p>
              </div>

              {/* Graphic Mockup Preview */}
              <div className="rounded-xl overflow-hidden border border-emerald-700/50 bg-slate-900 shadow-lg mt-4 h-48 sm:h-56">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" 
                  alt="Web hosting dashboard overview"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Card 2: AIDA AI Website Builder */}
            <div 
              onClick={onOpenBuilder}
              className="group bg-[#0c2b21] rounded-3xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    AIDA AI Website Builder
                  </h3>
                  <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs sm:text-sm text-emerald-100/80 mb-6">
                  Build your own site with AI-assisted tools and drag-and-drop design, no coding knowledge needed.
                </p>
              </div>

              {/* Graphic Mockup Preview (Stories from Elsewhere) */}
              <div className="rounded-xl overflow-hidden border border-emerald-700/50 bg-slate-900 shadow-lg mt-4 h-48 sm:h-56 relative">
                <img 
                  src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=800&auto=format&fit=crop" 
                  alt="Stories from Elsewhere vintage bus website preview"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                  <div className="text-white">
                    <div className="text-xl sm:text-2xl font-serif">Stories from <br />Elsewhere</div>
                    <div className="text-[10px] text-amber-300 mt-1 uppercase tracking-wider font-bold">Built with AI Builder</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 13. NEED HELP? WE ARE HERE FOR YOU (4 Support Cards) */}
      <section className="py-16 sm:py-20 bg-[#fafcfb] border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 text-center">
          
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mb-12">
            Need help? We are here for you!
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Card 1: Help center */}
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

            {/* Card 2: Chat support */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Chat support</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed min-h-[60px]">
                  We are always here to help you. 24/7 – 365 days a year.
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

            {/* Card 3: Academy */}
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

            {/* Card 4: Email support */}
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

      {/* 14. FREQUENTLY ASKED QUESTIONS (Complete 11 FAQs from Image) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-10 bg-white border-t border-gray-100 max-w-screen-2xl mx-auto text-left">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mb-8">
          Frequently asked questions
        </h2>

        <div className="divide-y divide-gray-200">
          {faqList.map((item, idx) => (
            <div key={idx} className="py-4 sm:py-5">
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-semibold text-sm sm:text-base text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                id={`wp-faq-btn-${idx}`}
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

      {/* Video Modal for Bokföringskompaniet */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-700 relative">
            <div className="p-4 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
              <span className="font-bold text-sm">Bokföringskompaniet Success Story</span>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video 
                className="w-full h-full object-cover"
                controls 
                autoPlay 
                poster="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop"
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
