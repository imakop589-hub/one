import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Terminal, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ChevronDown, 
  Zap, 
  Lock, 
  Copy, 
  CheckCheck, 
  Layers, 
  Globe, 
  Headphones,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { CartItem } from '../types';

interface VpsHostingPageProps {
  onAddToCart: (item: CartItem) => void;
  onOpenLiveChat: () => void;
}

interface VpsPlan {
  id: string;
  name: string;
  tagline: string;
  vcpu: string;
  ram: string;
  storage: string;
  bandwidth: string;
  monthlyPrice: number;
  annualPrice: number;
  originalPrice: number;
  popular?: boolean;
  badge?: string;
}

const VPS_PLANS: VpsPlan[] = [
  {
    id: 'kvm-1',
    name: 'KVM 1',
    tagline: 'Great for personal projects, microservices & proxy nodes',
    vcpu: '1 vCPU Core',
    ram: '4 GB RAM',
    storage: '50 GB NVMe RAID-10',
    bandwidth: '4 TB High-Speed Transfer',
    monthlyPrice: 5.99,
    annualPrice: 4.49,
    originalPrice: 8.99,
  },
  {
    id: 'kvm-2',
    name: 'KVM 2',
    tagline: 'Best seller for busy web apps, production APIs & staging databases',
    vcpu: '2 vCPU Cores',
    ram: '8 GB RAM',
    storage: '100 GB NVMe RAID-10',
    bandwidth: '8 TB High-Speed Transfer',
    monthlyPrice: 10.99,
    annualPrice: 8.49,
    originalPrice: 16.99,
    popular: true,
    badge: 'Most Popular',
  },
  {
    id: 'kvm-4',
    name: 'KVM 4',
    tagline: 'Heavy computation, continuous integration & multi-container Docker workloads',
    vcpu: '4 vCPU Cores',
    ram: '16 GB RAM',
    storage: '200 GB NVMe RAID-10',
    bandwidth: '16 TB High-Speed Transfer',
    monthlyPrice: 19.99,
    annualPrice: 15.99,
    originalPrice: 29.99,
    badge: 'Developer Choice',
  },
  {
    id: 'kvm-8',
    name: 'KVM 8',
    tagline: 'Enterprise horsepower for database clusters, machine learning & large apps',
    vcpu: '8 vCPU Cores',
    ram: '32 GB RAM',
    storage: '400 GB NVMe RAID-10',
    bandwidth: '32 TB High-Speed Transfer',
    monthlyPrice: 39.99,
    annualPrice: 31.99,
    originalPrice: 59.99,
    badge: 'Heavy Duty',
  },
];

const OS_OPTIONS = [
  { name: 'Ubuntu 24.04 LTS', category: 'Linux' },
  { name: 'Debian 12 Bookworm', category: 'Linux' },
  { name: 'AlmaLinux 9', category: 'Linux' },
  { name: 'Rocky Linux 9', category: 'Linux' },
  { name: 'Windows Server 2022', category: 'Windows' },
];

const LOCATIONS = [
  { name: 'London, UK', flag: '🇬🇧', latency: '12ms' },
  { name: 'Frankfurt, Germany', flag: '🇩🇪', latency: '18ms' },
  { name: 'New York, USA', flag: '🇺🇸', latency: '75ms' },
  { name: 'Singapore, APAC', flag: '🇸🇬', latency: '140ms' },
];

export const VpsHostingPage: React.FC<VpsHostingPageProps> = ({
  onAddToCart,
  onOpenLiveChat,
}) => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [selectedOs, setSelectedOs] = useState('Ubuntu 24.04 LTS');
  const [selectedLocation, setSelectedLocation] = useState('London, UK');
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [addedPlanId, setAddedPlanId] = useState<string | null>(null);

  const handleCopyCmd = () => {
    navigator.clipboard.writeText('ssh root@185.192.110.42');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleSelectPlan = (plan: VpsPlan) => {
    const isAnnual = billingCycle === 'annual';
    const price = isAnnual ? plan.annualPrice * 12 : plan.monthlyPrice;

    onAddToCart({
      id: `${plan.id}-${selectedOs.replace(/\s+/g, '-')}-${billingCycle}`,
      type: 'hosting',
      title: `${plan.name} VPS (${selectedOs})`,
      subtitle: `${plan.vcpu}, ${plan.ram}, ${plan.storage} in ${selectedLocation}`,
      price: Number(price.toFixed(2)),
      period: isAnnual ? '1 year' : '1 month',
    });

    setAddedPlanId(plan.id);
    setTimeout(() => setAddedPlanId(null), 2500);
  };

  const vpsFaqs = [
    {
      q: 'Do I get full root SSH access with my VPS?',
      a: 'Yes, 100% unrestricted root SSH access is provided on all Linux VPS instances, and Administrator RDP access is provided on Windows Server plans. You have full freedom to install custom software, change kernels, and configure firewalls.',
    },
    {
      q: 'What virtualization technology does Hostxeon use?',
      a: 'We use genuine Kernel-based Virtual Machine (KVM) virtualization. Unlike OpenVZ or LXC, KVM guarantees that your assigned vCPU cores and RAM are strictly dedicated to your virtual machine with zero hardware overselling.',
    },
    {
      q: 'Can I upgrade my VPS resources later without losing data?',
      a: 'Yes, our cloud VPS platform allows instant seamless upgrades. You can scale your CPU, RAM, and NVMe disk space with a single click from the client dashboard with only a quick 60-second reboot.',
    },
    {
      q: 'Is automated DDoS protection included?',
      a: 'Yes, every VPS server is protected by our carrier-grade Corero automated anti-DDoS mitigation system capable of absorbing volumetric attacks up to 3.2 Tbps with 0 false positives.',
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
            <Server className="w-3.5 h-3.5 text-[#fed000]" />
            <span>Pure KVM Hardware Virtualization & 100% NVMe RAID-10</span>
            <span className="bg-[#fed000] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">FROM £4.49/MO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            High-Performance KVM VPS with Full Root Access
          </h1>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto font-medium">
            Deploy self-healing Linux or Windows virtual servers in under 55 seconds. Powered by AMD EPYC processors and 10Gbps unmetered network pipelines.
          </p>

          {/* Interactive SSH Terminal Box */}
          <div className="max-w-2xl mx-auto mt-10 rounded-2xl bg-black/80 border border-emerald-500/30 shadow-2xl p-4 text-left font-mono text-xs sm:text-sm text-emerald-400">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-950 text-gray-400 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-emerald-200">root@hostxeon-kvm2:~#</span>
              </div>
              <button
                onClick={handleCopyCmd}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px] bg-white/10 px-2.5 py-1 rounded"
              >
                {copiedCmd ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd ? 'Copied' : 'Copy SSH Command'}</span>
              </button>
            </div>
            <div className="space-y-1">
              <div className="text-gray-300">
                <span className="text-emerald-400 font-bold">hostxeon$</span> ssh root@185.192.110.42 -p 22
              </div>
              <div className="text-gray-400">
                Linux hostxeon-node01 6.8.0-31-generic #31-Ubuntu SMP x86_64
              </div>
              <div className="text-emerald-300">
                [OK] AMD EPYC™ 9654 96-Core Processor detected (100% Dedicated)
              </div>
              <div className="text-emerald-300">
                [OK] NVMe Block Storage Read/Write: 4,200 MB/s (RAID-10 Protected)
              </div>
              <div className="text-emerald-300">
                [OK] Anti-DDoS Filter Active: 3.2 Tbps scrubbing ready
              </div>
              <div className="text-yellow-400 font-bold animate-pulse mt-1">
                root@hostxeon-kvm2:~# ▌
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* 2. Interactive OS & Location Configurator Bar */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-6 relative z-20 mb-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* OS Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select OS:</span>
            {OS_OPTIONS.map((os) => (
              <button
                key={os.name}
                onClick={() => setSelectedOs(os.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedOs === os.name
                    ? 'bg-[#008a45] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {os.name}
              </button>
            ))}
          </div>

          {/* Location Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Datacenter:</span>
            {LOCATIONS.map((loc) => (
              <button
                key={loc.name}
                onClick={() => setSelectedLocation(loc.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedLocation === loc.name
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{loc.flag}</span>
                <span>{loc.name.split(',')[0]}</span>
              </button>
            ))}
          </div>

          {/* Billing Cycle */}
          <div className="bg-gray-100 p-1 rounded-xl flex items-center shrink-0">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'annual' ? 'bg-[#008a45] text-white' : 'text-gray-700'
              }`}
            >
              Annual (Save 25%)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-white text-slate-900' : 'text-gray-700'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </section>

      {/* 3. VPS Pricing Cards */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VPS_PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            const isAdded = addedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-6 transition-all flex flex-col justify-between relative ${
                  plan.popular
                    ? 'border-2 border-[#008a45] shadow-xl ring-4 ring-emerald-50'
                    : 'border border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#008a45] text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-black text-slate-950">{plan.name}</h3>
                  <p className="text-[11px] text-gray-500 mt-1 min-h-[30px]">{plan.tagline}</p>

                  <div className="mt-4 pb-5 border-b border-gray-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-gray-400 line-through">£{plan.originalPrice}</span>
                      <span className="text-3xl font-black text-slate-950">£{price}</span>
                      <span className="text-xs text-gray-500 font-semibold">/ mo</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold mt-1">
                      {billingCycle === 'annual' ? 'Billed £' + (plan.annualPrice * 12).toFixed(2) + '/year' : 'Billed monthly, cancel anytime'}
                    </div>
                  </div>

                  {/* Core Specs */}
                  <div className="py-4 space-y-2.5 text-xs text-gray-800">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5 text-gray-600"><Cpu className="w-3.5 h-3.5 text-[#008a45]" /> CPU:</span>
                      <span>{plan.vcpu}</span>
                    </div>
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5 text-gray-600"><Layers className="w-3.5 h-3.5 text-[#008a45]" /> RAM:</span>
                      <span>{plan.ram}</span>
                    </div>
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5 text-gray-600"><HardDrive className="w-3.5 h-3.5 text-[#008a45]" /> NVMe:</span>
                      <span>{plan.storage}</span>
                    </div>
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5 text-gray-600"><Zap className="w-3.5 h-3.5 text-[#008a45]" /> Bandwidth:</span>
                      <span>{plan.bandwidth}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="pt-3 border-t border-gray-100 space-y-2 text-[11px] text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008a45] shrink-0" />
                      <span>Full Root SSH / Administrator</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008a45] shrink-0" />
                      <span>1 Dedicated IPv4 + /64 IPv6</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008a45] shrink-0" />
                      <span>Anti-DDoS Scrubbing Included</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008a45] shrink-0" />
                      <span>Instant 55s Automated Provision</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isAdded 
                        ? 'bg-emerald-700 text-white' 
                        : plan.popular 
                          ? 'bg-[#008a45] hover:bg-[#007338] text-white shadow-md' 
                          : 'bg-slate-900 hover:bg-black text-white'
                    }`}
                  >
                    <span>{isAdded ? 'Deploying...' : 'Deploy Server'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Enterprise VPS Features Grid */}
      <section className="bg-slate-50 border-y border-gray-200 py-16">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              Developer-First Cloud Infrastructure
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Everything built for high-uptime backend services, Docker containers, and complex pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008a45] flex items-center justify-center mb-4">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">1-Click OS & App Templates</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Rebuild your instance in seconds with clean distributions or pre-installed Docker, cPanel, Plesk, WireGuard, Node.js, and LAMP stacks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008a45] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">3.2 Tbps Always-On Anti-DDoS</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Automated multi-layer threat scrubbing filters malicious SYN floods, UDP amplification, and Layer 7 attacks before traffic reaches your server.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008a45] flex items-center justify-center mb-4">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">REST API & Reverse DNS Control</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Easily automate server spin-up, manage snapshots, configure PTR / rDNS records, and monitor bandwidth usage via our developer API.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQs */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Frequently Asked Questions About VPS
          </h2>
          <p className="text-gray-500 text-sm mt-1">Direct answers for technical architects and developers</p>
        </div>

        <div className="space-y-3">
          {vpsFaqs.map((faq, idx) => (
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

      {/* 6. Bottom Banner */}
      <section className="bg-[#041d16] text-white py-14 border-t border-emerald-950">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black">
              Need a Custom High-Storage or Cluster VPS?
            </h3>
            <p className="text-sm text-emerald-200/80 mt-1 max-w-xl">
              Talk to our enterprise hosting engineers for custom storage arrays, BGP routing, and private VLAN interconnects.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenLiveChat}
              className="bg-[#008a45] hover:bg-[#007338] text-white font-black px-6 py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Chat with VPS Engineer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
