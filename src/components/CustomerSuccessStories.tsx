import React, { useState } from 'react';
import { 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  MessageSquare, 
  ArrowRight, 
  Check 
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
    tagline: 'SCALED TO 10,000+ ONLINE ORDERS',
    headline: '“Hostxeon made launching our online shop so simple. Our site loads in under half a second, even during holiday peak traffic.”',
    storyQuote: 'I had zero technical background and was nervous about moving away from expensive marketplace fees. Hostxeon’s team helped me set up my domain, connected WooCommerce, and activated free SSL in one afternoon. Now our online store runs flawlessly.',
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
      className="py-16 md:py-20 bg-[#F8FAFC] text-[#0F172A] border-t border-b border-[#E2E8F0]"
      id="customer-success-stories"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-2xs">
            <div className="flex items-center gap-0.5" aria-label="5 stars rating">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="w-3.5 h-3.5 bg-[#00b67a] flex items-center justify-center text-white text-xs font-bold rounded-xs">
                  ★
                </div>
              ))}
            </div>
            <span className="text-xs font-semibold text-[#0F172A]">
              Rated 5.0 on Trustpilot
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-[#475569] font-medium hidden sm:inline">
              Verified Hosting Reviews
            </span>
          </div>

          <h2 className="font-heading text-[26px] md:text-[30px] lg:text-[36px] font-bold text-[#0F172A] tracking-tight leading-[1.2]">
            Trusted by Entrepreneurs and{' '}
            <span className="text-[#008744]">Growing Businesses</span>
          </h2>

          <p className="text-sm md:text-base text-[#475569] max-w-2xl mx-auto leading-relaxed font-normal">
            From local makers launching their first online shop to digital agencies managing high-traffic websites, discover why businesses trust Hostxeon.
          </p>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Photo */}
            <div className="lg:col-span-6 relative bg-slate-900 min-h-[300px] sm:min-h-[400px] flex items-end overflow-hidden">
              <img 
                src={currentHero.image} 
                alt={currentHero.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Live Domain Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                <div className="inline-flex items-center gap-1.5 bg-white/95 px-3 py-1 rounded-full text-xs font-semibold text-[#0F172A] shadow-xs">
                  <Globe className="w-3.5 h-3.5 text-[#008744]" />
                  <span>{currentHero.domain}</span>
                </div>

                <span className="bg-[#008744] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase">
                  Active Client
                </span>
              </div>

              {/* Photo Caption */}
              <div className="relative z-10 p-6 text-white w-full">
                <div className="text-xl font-bold">{currentHero.name}</div>
                <div className="text-xs text-emerald-300 font-medium mt-0.5">
                  {currentHero.role}, {currentHero.company}
                </div>
                <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                  <span>{currentHero.location}</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-medium">Verified Customer</span>
                </div>
              </div>
            </div>

            {/* Right Column: Quote & Metrics */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#008744] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {currentHero.tagline}
                  </span>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-3.5 h-3.5 bg-[#00b67a] flex items-center justify-center text-white text-xs font-bold rounded-xs">
                        ★
                      </div>
                    ))}
                    <span className="text-xs font-medium text-[#475569] ml-1">5.0 Star Experience</span>
                  </div>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
                  {currentHero.headline}
                </h3>

                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                  "{currentHero.storyQuote}"
                </p>

                {/* Metrics Highlight Strip */}
                <div className="grid grid-cols-3 gap-3 p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] mt-4">
                  {currentHero.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-lg sm:text-xl font-bold text-[#008744] tabular-nums">{m.value}</div>
                      <div className="text-xs font-semibold text-[#0F172A] mt-0.5">{m.label}</div>
                      <div className="text-xs text-[#475569] hidden sm:block">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Controls */}
              <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#475569] font-normal">
                  Plan used: <strong className="text-[#0F172A] font-semibold">{currentHero.planUsed}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#475569] mr-2">
                    Story {activeStoryIdx + 1} of {FEATURED_ENTREPRENEURS.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveStoryIdx((prev) => (prev - 1 + FEATURED_ENTREPRENEURS.length) % FEATURED_ENTREPRENEURS.length)}
                    aria-label="Previous story"
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#008744] hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-[#E2E8F0]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStoryIdx((prev) => (prev + 1) % FEATURED_ENTREPRENEURS.length)}
                    aria-label="Next story"
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#008744] hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-[#E2E8F0]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Conversion & Trust Guarantee Banner */}
        <div className="bg-[#061913] text-white rounded-xl p-6 sm:p-10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6 text-left border border-[#133025]">
          
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              High Performance Hosting Guarantee
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              Ready to power your website on Hostxeon?
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Deploy your website today with confidence. Every plan includes our 30-day money-back guarantee, free 0-downtime website migration, and 24/7 human technical support.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Free 0-Downtime Migration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Free SSL & Daily Backups</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <button
              type="button"
              onClick={onNavigateToHosting}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#008744] hover:bg-[#006E37] text-white font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Explore Hosting Plans</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenLiveChat}
              className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/20 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>Chat with Support</span>
            </button>
          </div>

        </div>

        {/* Real Trustpilot External Verification Link */}
        <div className="mt-8 text-center">
          <a
            href="https://www.trustpilot.com/review/hostxeon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#475569] hover:text-[#008744] transition-colors py-2 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <span>Read authentic customer reviews on</span>
            <span className="font-semibold text-[#0F172A] inline-flex items-center gap-1">
              <span className="text-[#00b67a]">★</span> Trustpilot
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
