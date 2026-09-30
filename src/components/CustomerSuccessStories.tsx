import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  Quote, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Globe, 
  Server, 
  MessageSquare, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Award,
  Lock,
  Building2,
  Laptop,
  ShoppingBag,
  Users,
  Check,
  RefreshCw,
  ThumbsUp
} from 'lucide-react';

interface FeaturedStory {
  id: string;
  name: string;
  role: string;
  company: string;
  domain: string;
  industry: string;
  location: string;
  image: string;
  tagline: string;
  headline: string;
  storyQuote: string;
  fullDetails: string;
  metrics: { label: string; value: string; desc: string }[];
  planUsed: string;
  videoLength?: string;
}

const FEATURED_ENTREPRENEURS: FeaturedStory[] = [
  {
    id: 'sarah-bakery',
    name: 'Sarah Jenkins',
    role: 'Founder & Head Baker',
    company: 'The Artisan Flour Co.',
    domain: 'theartisanflour.co.uk',
    industry: 'E-Commerce & Food Retail',
    location: 'Bristol, United Kingdom',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80',
    tagline: 'FROM KITCHEN TO 10,000+ ORDERS',
    headline: '“Hostxeon made launching my online shop so simple. My site loads in under half a second, even during holiday rushes.”',
    storyQuote: 'I had zero technical background and was nervous about moving away from expensive marketplace fees. Hostxeon’s team helped me set up my domain, connected WooCommerce, and activated free SSL in one afternoon. Now my online bakery generates over 60% of our total revenue.',
    fullDetails: 'Sarah scaled her artisan bakery from a local stall to a nationwide delivery service on Hostxeon WordPress Hosting.',
    metrics: [
      { label: 'Page Load Speed', value: '0.24s', desc: 'LiteSpeed NVMe Cache' },
      { label: 'Online Sales Growth', value: '+310%', desc: 'Year-over-year revenue' },
      { label: 'Uptime Reliability', value: '100%', desc: 'Zero holiday downtime' }
    ],
    planUsed: 'Managed WordPress Hosting Plan',
  },
  {
    id: 'andrew-agency',
    name: 'Andrew Pickering',
    role: 'Creative Director',
    company: 'Pickering Digital Media',
    domain: 'pickeringmedia.co.uk',
    industry: 'Web Design & Digital Agency',
    location: 'Manchester, United Kingdom',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    tagline: '25+ CLIENT SITES RUNNING FLAWLESSLY',
    headline: '“Our previous host crashed during a client launch. Hostxeon migrated 14 websites in hours with zero data loss.”',
    storyQuote: 'Finding a host that truly understands speed and agency reliability is rare. Hostxeon’s AMD EPYC servers cut our client page TTFB by 70%. When we need help, real human support responds on live chat in less than 90 seconds.',
    fullDetails: 'Andrew manages websites for high-profile retail and corporate brands across the UK.',
    metrics: [
      { label: 'Server TTFB', value: '210ms', desc: 'AMD EPYC Gen4 CPU' },
      { label: 'Websites Hosted', value: '25+', desc: '1-Click cPanel Management' },
      { label: 'Support Response', value: '< 90s', desc: '24/7/365 Live Engineers' }
    ],
    planUsed: 'Business Cloud NVMe Hosting',
  },
  {
    id: 'marcus-tech',
    name: 'Marcus Vance',
    role: 'Co-Founder & CTO',
    company: 'Vance Logic Software',
    domain: 'vancelogic.io',
    industry: 'SaaS & Web Applications',
    location: 'London, United Kingdom',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    tagline: 'GLOBAL DOMAIN PORTFOLIO',
    headline: '“We consolidated 18 domains into Hostxeon. The DNS propagation is instantaneous and we saved 45% on renewals.”',
    storyQuote: 'Managing domains across multiple registrars with hidden renewal fees was exhausting. Hostxeon gave us free lifetime WHOIS privacy, Anycast DNSSEC protection, and transparent renewal pricing with no surprises.',
    fullDetails: 'Marcus protects brand identity across multiple global TLDs including .io, .com, and .co.uk.',
    metrics: [
      { label: 'DNS Propagation', value: '< 3 min', desc: 'Cloudflare Anycast DNS' },
      { label: 'Renewal Savings', value: '45%', desc: 'No hidden markup' },
      { label: 'WHOIS Privacy', value: 'Free', desc: 'Lifetime identity shield' }
    ],
    planUsed: 'Domain Portfolio & Anycast DNS',
  }
];

interface CustomerSuccessStoriesProps {
  onNavigateToHosting?: () => void;
  onNavigateToDomains?: () => void;
  onOpenLiveChat?: () => void;
}

export const CustomerSuccessStories: React.FC<CustomerSuccessStoriesProps> = ({
  onNavigateToHosting,
  onNavigateToDomains,
  onOpenLiveChat,
}) => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const currentHero = FEATURED_ENTREPRENEURS[activeStoryIdx];

  return (
    <section 
      className="py-20 sm:py-24 bg-[#f8faf9] text-slate-900 border-t border-b border-gray-200/80 relative"
      id="customer-success-stories"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* ========================================================================= */}
        {/* 1. GODADDY-STYLE TOP HEADER & TRUSTPILOT BAR                              */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          
          {/* Official Trustpilot Rating Banner */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-xs">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="w-4 h-4 bg-[#00b67a] flex items-center justify-center text-white text-[11px] font-black rounded-xs">
                  ★
                </div>
              ))}
            </div>
            <span className="text-xs font-black text-slate-900">
              Rated 4.9 / 5.0 on Trustpilot
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-medium hidden sm:inline">
              12,400+ Websites Hosted
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            See how real entrepreneurs <br className="hidden sm:inline" />
            <span className="text-[#008a45]">grow and succeed</span> on Hostxeon
          </h2>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From local makers launching their first online store to tech agencies scaling 25+ client portals — read how everyday business owners rely on Hostxeon.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. GODADDY SIGNATURE STORY CARD (LARGE CLEAN TWO-COLUMN SPOTLIGHT)        */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden mb-16 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Entrepreneur In Real Context Photo */}
            <div className="lg:col-span-6 relative bg-slate-950 min-h-[340px] sm:min-h-[440px] flex items-end overflow-hidden group">
              <img 
                src={currentHero.image} 
                alt={currentHero.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* GoDaddy Signature Live Website Tag Overlay */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-2 z-10">
                <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow-lg border border-white">
                  <Globe className="w-3.5 h-3.5 text-[#008a45]" />
                  <span>{currentHero.domain}</span>
                </div>

                <span className="bg-[#fed000] text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  LIVE WEBSITE
                </span>
              </div>

              {/* Photo Caption / Author Pill */}
              <div className="relative z-10 p-6 sm:p-8 text-white w-full">
                <div className="text-xl sm:text-2xl font-black">{currentHero.name}</div>
                <div className="text-xs sm:text-sm text-emerald-300 font-medium mt-0.5">
                  {currentHero.role}, {currentHero.company}
                </div>
                <div className="text-xs text-gray-300 mt-1 flex items-center gap-1.5">
                  <span>📍 {currentHero.location}</span>
                  <span>•</span>
                  <span className="text-[#00b67a] font-bold">Verified Customer</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact Quote & Story Details */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                {/* Industry Tag & 5 Green Stars */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-black uppercase tracking-wider text-[#008a45] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {currentHero.tagline}
                  </span>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-4 h-4 bg-[#00b67a] flex items-center justify-center text-white text-[10px] font-black rounded-xs">
                        ★
                      </div>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1.5">5.0 Star Experience</span>
                  </div>
                </div>

                {/* Main Headline */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 leading-snug tracking-tight">
                  {currentHero.headline}
                </h3>

                {/* Narrative Quote */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  "{currentHero.storyQuote}"
                </p>

                {/* Metrics Highlight Strip (GoDaddy Style 3-Box Bar) */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-200/80 mt-4">
                  {currentHero.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-lg sm:text-2xl font-black text-[#008a45]">{m.value}</div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">{m.label}</div>
                      <div className="text-[10px] text-gray-500 hidden sm:block">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Controller & Switcher */}
              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-500 font-medium">
                  Plan used: <strong className="text-slate-900">{currentHero.planUsed}</strong>
                </div>

                {/* Story Navigation Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 mr-2">
                    Story {activeStoryIdx + 1} of {FEATURED_ENTREPRENEURS.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveStoryIdx((prev) => (prev - 1 + FEATURED_ENTREPRENEURS.length) % FEATURED_ENTREPRENEURS.length)}
                    aria-label="Previous story"
                    className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#008a45] hover:text-white text-gray-700 flex items-center justify-center transition-colors cursor-pointer border border-gray-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStoryIdx((prev) => (prev + 1) % FEATURED_ENTREPRENEURS.length)}
                    aria-label="Next story"
                    className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#008a45] hover:text-white text-gray-700 flex items-center justify-center transition-colors cursor-pointer border border-gray-200"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. GODADDY-STYLE CONVERSION & TRUST GUARANTEE BANNER                      */}
        {/* ========================================================================= */}
        <div className="mt-8 bg-gradient-to-r from-[#03241b] via-[#053d2d] to-[#03241b] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-[#fed000] text-xs font-black uppercase tracking-wider border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>JOIN 12,000+ HAPPY CUSTOMERS</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Ready to write your own online success story?
            </h3>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Launch today with confidence. Every plan includes our 15-day money-back guarantee, free 0-downtime website migration, and 24/7 human technical support.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-emerald-200">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#fed000] stroke-[3]" />
                <span>15-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#fed000] stroke-[3]" />
                <span>Free 0-Downtime Migration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#fed000] stroke-[3]" />
                <span>Free Lifetime WHOIS Privacy</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <button
              type="button"
              onClick={onNavigateToHosting}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#fed000] hover:bg-[#ebbe00] text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>Explore Hosting Plans</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              type="button"
              onClick={onOpenLiveChat}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>Chat with Support (24/7)</span>
            </button>
          </div>

        </div>

        {/* Real Trustpilot External Verification Link */}
        <div className="mt-8 text-center">
          <a
            href="https://www.trustpilot.com/review/hostxeon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#008a45] transition-colors py-2 px-4 rounded-xl hover:bg-gray-100 cursor-pointer"
          >
            <span>Read all authentic customer reviews on</span>
            <span className="font-black text-slate-900 inline-flex items-center gap-1">
              <span className="text-[#00b67a]">★</span> Trustpilot
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
