import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Zap, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ChevronDown, 
  Star, 
  Sparkles, 
  RefreshCw, 
  Layers, 
  Clock, 
  Lock, 
  Globe, 
  Headphones, 
  Gauge, 
  Database,
  CheckCircle2
} from 'lucide-react';
import { CartItem } from '../types';

interface CloudHostingPageProps {
  onAddToCart: (item: CartItem) => void;
  onOpenLiveChat: () => void;
  onGoToWebHosting: () => void;
}

interface CloudPlan {
  id: string;
  name: string;
  tagline: string;
  priceAnnual: number;
  priceMonthly: number;
  originalPrice: number;
  popular?: boolean;
  badge?: string;
  ram: string;
  cores: string;
  storage: string;
  bandwidth: string;
  freeDedicatedIp: boolean;
  features: string[];
}

const CLOUD_PLANS: CloudPlan[] = [
  {
    id: 'cloud-startup',
    name: 'Cloud Startup',
    tagline: 'Ideal for rapidly growing eCommerce stores & traffic surges',
    priceAnnual: 7.99,
    priceMonthly: 11.99,
    originalPrice: 19.99,
    ram: '3 GB RAM',
    cores: '2 CPU Cores',
    storage: '100 GB NVMe Storage',
    bandwidth: 'Unmetered Bandwidth',
    freeDedicatedIp: false,
    features: [
      'Host up to 100 Websites',
      'Dedicated IP address (£2/mo addon)',
      'Free Domain for 1st Year',
      'Free Unlimited SSL Certificates',
      'Daily Automated Snapshots & Backups',
      'Redis & Memcached Object Caching',
      'Isolated Cloud Container (LVE)',
      'Cloudflare CDN Enterprise routing',
      '24/7 Priority Cloud Support',
    ],
  },
  {
    id: 'cloud-professional',
    name: 'Cloud Professional',
    tagline: 'Engineered for high-volume stores, busy portals & agency clusters',
    priceAnnual: 14.99,
    priceMonthly: 21.99,
    originalPrice: 34.99,
    popular: true,
    badge: 'Most Popular',
    ram: '6 GB RAM',
    cores: '4 CPU Cores',
    storage: '200 GB NVMe Storage',
    bandwidth: 'Unmetered Bandwidth',
    freeDedicatedIp: true,
    features: [
      'Host up to 300 Websites',
      'Free Dedicated IP Included',
      'Free Domain for 1st Year',
      'Free Unlimited SSL Certificates',
      'Hourly + Daily Automated Backups',
      'Redis Cache + NVMe High IOPS',
      'Instant Auto-Scaling on Traffic Spikes',
      'Staging Environments & Git Deploy',
      'Dedicated Account Manager & VIP SLA',
    ],
  },
  {
    id: 'cloud-enterprise',
    name: 'Cloud Enterprise',
    tagline: 'Massive compute capacity for large organizations and enterprise workloads',
    priceAnnual: 29.99,
    priceMonthly: 39.99,
    originalPrice: 69.99,
    badge: 'Maximum Power',
    ram: '12 GB RAM',
    cores: '6 CPU Cores',
    storage: '350 GB NVMe Storage',
    bandwidth: 'Unmetered Bandwidth',
    freeDedicatedIp: true,
    features: [
      'Host Unlimited Websites',
      'Free Dedicated IP Included',
      'Free Domain for 1st Year',
      'Multi-Region Anycast Network',
      'Real-Time Continuous Replication',
      'Guaranteed 99.99% Uptime SLA',
      'White-Glove 0-Downtime Migration',
      'Custom PHP/Node.js/Python Runtimes',
      'Direct Phone & VIP Slack Support',
    ],
  },
];

export const CloudHostingPage: React.FC<CloudHostingPageProps> = ({
  onAddToCart,
  onOpenLiveChat,
  onGoToWebHosting,
}) => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [addedPlanId, setAddedPlanId] = useState<string | null>(null);

  const handleSelectPlan = (plan: CloudPlan) => {
    const isAnnual = billingCycle === 'annual';
    const price = isAnnual ? plan.priceAnnual * 12 : plan.priceMonthly;
    
    onAddToCart({
      id: `${plan.id}-${billingCycle}`,
      type: 'hosting',
      title: `${plan.name} (${isAnnual ? 'Annual' : 'Monthly'})`,
      subtitle: `${plan.ram}, ${plan.cores}, ${plan.storage} with 99.99% SLA`,
      price: Number(price.toFixed(2)),
      period: isAnnual ? '1 year' : '1 month',
    });

    setAddedPlanId(plan.id);
    setTimeout(() => setAddedPlanId(null), 2500);
  };

  const cloudFaqs = [
    {
      q: 'What is the difference between Web Hosting and Cloud Hosting?',
      a: 'While traditional web hosting shares server hardware among multiple accounts, Cloud Hosting provides your account with dedicated virtual resources (RAM, CPU cores, IOPS) encapsulated in an isolated container. You get the simplicity of cPanel with the raw power and stability of a dedicated server.',
    },
    {
      q: 'What happens if my website experiences a sudden traffic spike?',
      a: 'Our Cloud infrastructure features automated burst compute. If your campaign goes viral or traffic surges during Black Friday, your cloud container dynamically scales up to 2x its CPU and RAM capacity automatically without throttling or downtime.',
    },
    {
      q: 'Is a free domain and SSL certificate included?',
      a: 'Yes! All annual Cloud Hosting plans include a free .com, .net, or .org domain registration for the first year, plus free automated Let’s Encrypt SSL certificates for all your domains and subdomains.',
    },
    {
      q: 'Will Hostxeon migrate my existing website to the Cloud for free?',
      a: 'Absolutely. Our migration specialists handle the complete transfer of your websites, databases, emails, and DNS records with 0 downtime at no extra cost.',
    },
  ];

  return (
    <div className="bg-[#fcfdfd] text-[#111827] min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#041d16] via-[#062c21] to-[#041d16] text-white pt-14 pb-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#008a45]/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-6">
            <Zap className="w-3.5 h-3.5 text-[#fed000]" />
            <span>Dedicated Isolated Resources with 99.99% Uptime SLA</span>
            <span className="bg-[#fed000] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">UP TO 60% OFF</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            Ultra-Fast Cloud Hosting with Guaranteed Dedicated Power
          </h1>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto font-medium">
            The simplicity of managed hosting combined with the isolated horsepower of a dedicated cloud instance. 4x faster load speeds and instant auto-scaling.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mt-10 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div>
              <div className="text-2xl font-black text-[#fed000]">4x Faster</div>
              <div className="text-xs text-emerald-200 mt-0.5">Than Shared Hosting</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">99.99%</div>
              <div className="text-xs text-emerald-200 mt-0.5">High-Availability SLA</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">&lt; 85ms</div>
              <div className="text-xs text-emerald-200 mt-0.5">Global TTFB Latency</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">100% NVMe</div>
              <div className="text-xs text-emerald-200 mt-0.5">Enterprise SSD Storage</div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* 2. Interactive Pricing Section */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-8 relative z-20 mb-16">
        {/* Billing cycle toggle */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Choose Your Cloud Plan</h2>
            <p className="text-xs text-gray-500">All plans include 30-day money back guarantee & free website migration</p>
          </div>

          <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-[#008a45] text-white shadow-xs' : 'text-gray-700 hover:text-black'
              }`}
            >
              <span>Pay Yearly</span>
              <span className="bg-[#fed000] text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded">Save 40%</span>
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-gray-700 hover:text-black'
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CLOUD_PLANS.map((plan) => {
            const currentPrice = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            const isAdded = addedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 transition-all flex flex-col justify-between relative ${
                  plan.popular
                    ? 'border-2 border-[#008a45] shadow-xl ring-4 ring-emerald-50'
                    : 'border border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#008a45] text-white text-[11px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-black text-slate-950">{plan.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 min-h-[32px]">{plan.tagline}</p>

                  <div className="mt-5 pb-6 border-b border-gray-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-gray-400 line-through">£{plan.originalPrice}</span>
                      <span className="text-4xl font-black text-slate-950">£{currentPrice}</span>
                      <span className="text-xs text-gray-500 font-semibold">/ month</span>
                    </div>
                    <div className="text-[11px] text-emerald-700 font-bold mt-1">
                      {billingCycle === 'annual' ? 'Billed annually (£' + (plan.priceAnnual * 12).toFixed(2) + '/yr) + Free Domain' : 'Renews monthly, cancel anytime'}
                    </div>
                  </div>

                  {/* Hardware Highlights */}
                  <div className="py-4 space-y-2 bg-gray-50/70 -mx-4 px-4 my-4 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-[#008a45]" /> Dedicated CPU:</span>
                      <span>{plan.cores}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-[#008a45]" /> Isolated RAM:</span>
                      <span>{plan.ram}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span className="flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5 text-[#008a45]" /> NVMe Storage:</span>
                      <span>{plan.storage}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mt-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Included Features:</div>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#008a45] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-3.5 rounded-xl font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isAdded 
                        ? 'bg-emerald-700 text-white' 
                        : plan.popular 
                          ? 'bg-[#008a45] hover:bg-[#007338] text-white shadow-md' 
                          : 'bg-slate-900 hover:bg-black text-white'
                    }`}
                  >
                    <span>{isAdded ? 'Added to Cart!' : 'Configure Cloud Plan'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Cloud Architecture Features Grid */}
      <section className="bg-slate-50 border-y border-gray-200 py-16">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              High-Availability Cloud Architecture
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Built on enterprise AMD EPYC processors and pure NVMe Ceph distributed storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008a45] flex items-center justify-center mb-4">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Zero Resource Contention</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your dedicated RAM and CPU cores are locked exclusively to your cloud instance. Other accounts on the cluster cannot slow down your site.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008a45] flex items-center justify-center mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Redis & Memcached In-Memory</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Store frequent database queries in ultra-fast memory caches for lightning response times on heavy WooCommerce, Magento, or custom web apps.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008a45] flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Multi-Node Failover</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                If an underlying compute node requires maintenance, your container seamlessly live-migrates to a standby node with zero interruption or dropped connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQs */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Frequently Asked Questions About Cloud Hosting
          </h2>
          <p className="text-gray-500 text-sm mt-1">Everything you need to know about our cloud infrastructure</p>
        </div>

        <div className="space-y-3">
          {cloudFaqs.map((faq, idx) => (
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

      {/* 5. Bottom Conversion Banner */}
      <section className="bg-[#041d16] text-white py-14 border-t border-emerald-950">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black">
              Ready to Upgrade to High-Performance Cloud?
            </h3>
            <p className="text-sm text-emerald-200/80 mt-1 max-w-xl">
              Get started with our Cloud Startup plan or talk to our cloud infrastructure architects for custom enterprise deployments.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenLiveChat}
              className="bg-[#008a45] hover:bg-[#007338] text-white font-black px-6 py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Chat with Architect</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onGoToWebHosting}
              className="border border-white/20 hover:border-white text-white font-bold px-4 py-3.5 rounded-xl text-sm transition-colors cursor-pointer"
            >
              Compare with Web Hosting
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
