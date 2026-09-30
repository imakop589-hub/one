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
  Cpu, 
  Activity, 
  Sparkles, 
  Layers, 
  Check, 
  ExternalLink,
  Terminal,
  Shield,
  Clock,
  ArrowUpRight,
  Database,
  ChevronRight,
  Play,
  Copy,
  Sliders,
  Gauge,
  Boxes,
  Compass,
  FileCode2,
  HardDrive
} from 'lucide-react';

interface BatchProps {
  onNavigate: (view: any) => void;
  onOpenPricing?: () => void;
  onSearchDomain?: (query: string) => void;
  copiedSample: string | null;
  onCopyFeedback: (sampleNum: number, sampleTitle: string) => void;
}

export const HeroSamplesBatch3: React.FC<BatchProps & { selectedSample: string }> = ({
  onNavigate,
  onOpenPricing,
  onSearchDomain,
  copiedSample,
  onCopyFeedback,
  selectedSample
}) => {
  // Sample 12 State (WordPress Staging)
  const [phpVersion, setPhpVersion] = useState<'8.2' | '8.3'>('8.3');

  // Sample 13 State (Traffic Slider)
  const [monthlyHits, setMonthlyHits] = useState(250000);

  // Sample 15 State (VPS Configurator)
  const [vpsPlan, setVpsPlan] = useState<'entry' | 'pro' | 'beast'>('pro');

  const getTrafficSpecs = (hits: number) => {
    if (hits <= 50000) return { cpu: '1 vCPU', ram: '2 GB', price: '$1.99', plan: 'Starter Cloud' };
    if (hits <= 500000) return { cpu: '2 vCPU', ram: '4 GB', price: '$4.99', plan: 'Business NVMe' };
    if (hits <= 2000000) return { cpu: '4 vCPU', ram: '8 GB', price: '$9.99', plan: 'Pro Enterprise' };
    return { cpu: '8 vCPU', ram: '16 GB', price: '$19.99', plan: 'Dedicated Cluster' };
  };

  const trafficInfo = getTrafficSpecs(monthlyHits);

  return (
    <>
      {/* =========================================================================
          SAMPLE 11: NEO-BRUTALIST HIGH-CONTRAST TECH (GUMROAD / FIGMA STYLE)
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample11') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-11-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#fed000] text-slate-950 font-black flex items-center justify-center text-sm shadow-xs border border-slate-900">
                11
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 11: Neo-Brutalist High-Contrast Tech</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                    Neo-Brutalism
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Gumroad & Figma inspired: Thick high-contrast borders, solid drop shadows, vivid emerald & yellow accents, and punchy typography.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onCopyFeedback(11, "Neo-Brutalist High-Contrast Tech")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSample === 'Sample 11' ? 'Copied Prompt!' : 'Select Sample 11'}</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#faf7ee] py-12 lg:py-20 px-4 sm:px-8 border-b-2 border-slate-900">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-block bg-[#fed000] text-slate-950 border-2 border-slate-900 px-3 py-1 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000]">
                  🔥 100% NVMe Hosting • No Boring Servers
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.1]">
                    Cloud hosting that simply never goes down.
                  </h1>
                  <p className="text-base text-slate-800 font-medium leading-relaxed max-w-xl">
                    Deploy your code on blazing-fast servers with zero complicated setups, free SSL security, and 24/7 human backup.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onOpenPricing}
                    className="bg-[#008a45] hover:bg-[#007038] text-white font-black px-7 py-4 text-base border-2 border-slate-900 shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Claim $1.99 Plan</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('domains')}
                    className="bg-white text-slate-950 font-black px-6 py-4 text-base border-2 border-slate-900 shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    Search $0.99 Domains
                  </button>
                </div>

                <div className="flex items-center gap-6 pt-3 text-xs font-bold text-slate-900">
                  <span>✓ 30-Day Money Back</span>
                  <span>✓ Free Domain Included</span>
                  <span>✓ Instant 60s Setup</span>
                </div>
              </div>

              {/* Neo-brutalist card */}
              <div className="lg:col-span-5">
                <div className="bg-white border-3 border-slate-900 p-6 shadow-[8px_8px_0px_#000] space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
                    <span className="font-black text-sm text-slate-950 uppercase">Server Status: ULTRA FAST</span>
                    <span className="bg-[#4ade80] text-slate-950 font-black text-[10px] px-2 py-0.5 border border-slate-900">
                      LIVE
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-bold text-slate-900">
                    <div className="p-2.5 bg-[#fed000]/30 border-2 border-slate-900 flex justify-between">
                      <span>Uptime Guarantee:</span>
                      <span className="font-black">99.99%</span>
                    </div>
                    <div className="p-2.5 bg-emerald-100 border-2 border-slate-900 flex justify-between">
                      <span>Storage Type:</span>
                      <span className="font-black">Gen4 NVMe RAID-10</span>
                    </div>
                    <div className="p-2.5 bg-purple-100 border-2 border-slate-900 flex justify-between">
                      <span>Support Response:</span>
                      <span className="font-black">1.8 Minutes</span>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <span className="text-[11px] font-black text-slate-500 uppercase">Trusted by 140,000+ Smart Creators</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 12: WORDPRESS DEDICATED SPEED ENGINE (WP ENGINE / KINSTA STYLE)
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample12') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-12-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-700 text-white font-black flex items-center justify-center text-sm shadow-xs">
                12
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 12: WordPress Dedicated Speed Engine</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                    WP Managed
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  WP Engine & Kinsta inspired: 1-click staging environments, Redis object caching, and PHP 8.3 performance benchmark comparison.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onCopyFeedback(12, "WordPress Dedicated Speed Engine")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSample === 'Sample 12' ? 'Copied Prompt!' : 'Select Sample 12'}</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-slate-50 py-12 lg:py-20 px-4 sm:px-8 border-b border-gray-100">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 rounded-full px-3.5 py-1 text-xs font-bold">
                  <Zap className="w-3.5 h-3.5 text-blue-700 fill-current" />
                  <span>Managed WordPress with LiteSpeed LSCache</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                    WordPress hosting tuned for 300% faster loading.
                  </h1>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Say goodbye to slow plugins and database bottlenecks. Experience server-level caching, automatic WordPress core updates, and free staging sandboxes.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500">PHP Performance:</span>
                  <button
                    type="button"
                    onClick={() => setPhpVersion('8.2')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      phpVersion === '8.2' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    PHP 8.2 Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhpVersion('8.3')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      phpVersion === '8.3' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    PHP 8.3 LiteSpeed (3.2x Faster)
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('wordpress')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all cursor-pointer shadow-md"
                  >
                    Start WordPress Hosting ($2.49/mo)
                  </button>
                </div>
              </div>

              {/* Right: WordPress Staging & Speed Bar */}
              <div className="lg:col-span-6">
                <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                    <span className="font-bold text-slate-900">WordPress Speed Benchmark</span>
                    <span className="text-blue-600 font-bold">Hostxeon vs Traditional Hosts</span>
                  </div>

                  {/* Benchmark 1 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-900">Hostxeon LiteSpeed + NVMe</span>
                      <span className="text-emerald-600">0.32s Full Load</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[25%]" />
                    </div>
                  </div>

                  {/* Benchmark 2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Standard Apache Hosting</span>
                      <span>1.85s Full Load</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-300 rounded-full w-[85%]" />
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-blue-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      1-Click Staging Sandbox Ready
                    </div>
                    <div className="text-[11px] text-blue-700">
                      Test plugin updates safely on staging.yourdomain.com before publishing.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 13: STARTUP SCALE & TRAFFIC SIMULATION (BREX / RAMP STYLE)
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample13') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-13-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
                13
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 13: Traffic Scale Simulator Hero</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Interactive Calculator
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Brex & Ramp style: Interactive slider simulating traffic from 10k to 5M monthly visitors with dynamic hardware resource scaling.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onCopyFeedback(13, "Traffic Scale Simulator Hero")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSample === 'Sample 13' ? 'Copied Prompt!' : 'Select Sample 13'}</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden bg-slate-900 text-white py-12 lg:py-20 px-4 sm:px-8 border-b border-slate-800">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-3.5 py-1 text-xs text-emerald-400 font-bold">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Auto-Scaling Cloud Clusters</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                    Scale from your first visitor to 10 million with zero downtime.
                  </h1>
                  <p className="text-base text-slate-400 leading-relaxed">
                    Never worry about your website crashing during a viral launch. As traffic grows, our cloud allocates dynamic CPU threads seamlessly.
                  </p>
                </div>

                {/* Interactive Slider */}
                <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Estimated Monthly Traffic:</span>
                    <span className="text-base font-extrabold font-mono text-emerald-400">
                      {monthlyHits.toLocaleString()} visits / mo
                    </span>
                  </div>

                  <input
                    type="range"
                    min={10000}
                    max={3000000}
                    step={20000}
                    value={monthlyHits}
                    onChange={(e) => setMonthlyHits(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>10k / mo</span>
                    <span>500k / mo</span>
                    <span>1.5M / mo</span>
                    <span>3M+ / mo</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenPricing}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Deploy {trafficInfo.plan} ({trafficInfo.price}/mo)
                </button>
              </div>

              {/* Dynamic Specs Card */}
              <div className="lg:col-span-6">
                <div className="bg-[#0b131a] rounded-3xl p-6 border border-slate-700 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] text-emerald-400 uppercase font-bold">Recommended Cloud Setup</span>
                      <h4 className="text-lg font-bold text-white">{trafficInfo.plan}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white">{trafficInfo.price}<span className="text-xs text-slate-400 font-normal">/mo</span></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Compute Cores</div>
                      <div className="text-sm font-bold text-white mt-1">{trafficInfo.cpu} (Dedicated)</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">RAM Allocation</div>
                      <div className="text-sm font-bold text-white mt-1">{trafficInfo.ram} DDR5 ECC</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Zero Downtime Migration Assistance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Automated Traffic Spike Burstable Headroom</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 14: AURORA GLOW & MINIMALIST DARK GLASS (RAYCAST / APPLE DARK STYLE)
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample14') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-14-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-teal-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
                14
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 14: Aurora Glow & Minimalist Dark Glass</span>
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30">
                    Aurora Dark
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Raycast & Apple inspired: Graphite canvas with glowing emerald aurora orbs, frosted glass depth, and razor-sharp typographic hierarchy.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onCopyFeedback(14, "Aurora Glow & Minimalist Dark Glass")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSample === 'Sample 14' ? 'Copied Prompt!' : 'Select Sample 14'}</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#05090e] text-white py-16 lg:py-24 px-4 sm:px-8 border-b border-slate-800">
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 px-4 py-1.5 rounded-full text-xs text-teal-300">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Engineered for Perfectionists • Enterprise 99.99%</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Quietly powering the web's most ambitious projects.
              </h1>

              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                A pristine cloud hosting platform where speed, automated backups, and developer joy come together effortlessly.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={onOpenPricing}
                  className="bg-white text-slate-950 hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl text-sm transition-colors cursor-pointer shadow-lg"
                >
                  Get Started Free
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('webhosting')}
                  className="bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors cursor-pointer backdrop-blur-md"
                >
                  Explore Hosting Architecture
                </button>
              </div>

              {/* 3 Floating Frosted Glass Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 text-left">
                <div className="bg-slate-900/50 backdrop-blur-xl p-5 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="text-teal-400 font-mono text-xs">01 / LATENCY</div>
                  <div className="text-base font-bold text-white">Sub-30ms Global Delivery</div>
                  <p className="text-xs text-slate-400 leading-snug">Edge caching servers located in 280+ cities worldwide.</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl p-5 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="text-emerald-400 font-mono text-xs">02 / RESILIENCE</div>
                  <div className="text-base font-bold text-white">Self-Healing Storage</div>
                  <p className="text-xs text-slate-400 leading-snug">Three-way synchronous NVMe replication with zero data loss.</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl p-5 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="text-cyan-400 font-mono text-xs">03 / COMPLIANCE</div>
                  <div className="text-base font-bold text-white">Certified Zero-Trust</div>
                  <p className="text-xs text-slate-400 leading-snug">End-to-end TLS 1.3 encryption with automated DNSSEC protection.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 15: INTERACTIVE HARDWARE & VPS CONFIGURATOR (DIGITALOCEAN STYLE)
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample15') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-15-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-500 text-white font-black flex items-center justify-center text-sm shadow-xs">
                15
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 15: Interactive Hardware & VPS Configurator</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                    Configurator
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  DigitalOcean & Linode inspired: Live hardware plan switcher (Entry, Pro, Beast), real-time RAM/SSD spec recalculation, and instant deployment.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onCopyFeedback(15, "Interactive Hardware & VPS Configurator")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSample === 'Sample 15' ? 'Copied Prompt!' : 'Select Sample 15'}</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden bg-slate-900 text-white py-12 lg:py-20 px-4 sm:px-8 border-b border-slate-800">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-blue-950 text-blue-300 border border-blue-800 rounded-full px-3.5 py-1 text-xs font-bold">
                  <HardDrive className="w-3.5 h-3.5 text-blue-400" />
                  <span>KVM Virtualized Dedicated CPU Slices</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                    Configure your high-performance cloud instance in seconds.
                  </h1>
                  <p className="text-base text-slate-400 leading-relaxed">
                    Root access, dedicated IPv4 & IPv6, 10Gbps uplinks, and custom ISO installations with zero noisy neighbors.
                  </p>
                </div>

                {/* 3 Tier Hardware Selector Buttons */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Cloud Tier:</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setVpsPlan('entry')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        vpsPlan === 'entry' ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-md' : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="text-xs">Starter Node</div>
                      <div className="text-sm font-extrabold">$4.99/mo</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVpsPlan('pro')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        vpsPlan === 'pro' ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-md' : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="text-xs">Pro Power</div>
                      <div className="text-sm font-extrabold">$14.99/mo</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVpsPlan('beast')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        vpsPlan === 'beast' ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-md' : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="text-xs">Beast EPYC</div>
                      <div className="text-sm font-extrabold">$39.99/mo</div>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('vps')}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-blue-500/20"
                >
                  Spin Up This Server (55s)
                </button>
              </div>

              {/* Dynamic VPS Spec Output Card */}
              <div className="lg:col-span-6">
                <div className="bg-[#0c1622] rounded-3xl p-6 border border-slate-700 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="font-bold text-white">Hardware Allocation Matrix</span>
                    <span className="text-emerald-400 font-mono">10 Gbps Port Ready</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">CPU Cores</div>
                      <div className="text-base font-bold text-white mt-1">
                        {vpsPlan === 'entry' ? '2 vCPU Cores' : vpsPlan === 'pro' ? '4 vCPU Cores' : '8 Dedicated Cores'}
                      </div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">RAM Capacity</div>
                      <div className="text-base font-bold text-white mt-1">
                        {vpsPlan === 'entry' ? '4 GB DDR5' : vpsPlan === 'pro' ? '8 GB DDR5' : '32 GB ECC DDR5'}
                      </div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">NVMe Disk Space</div>
                      <div className="text-base font-bold text-white mt-1">
                        {vpsPlan === 'entry' ? '80 GB NVMe' : vpsPlan === 'pro' ? '160 GB NVMe' : '500 GB Gen4 NVMe'}
                      </div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Bandwidth Transfer</div>
                      <div className="text-base font-bold text-emerald-400 mt-1">
                        {vpsPlan === 'entry' ? '4 TB / mo' : vpsPlan === 'pro' ? '10 TB / mo' : 'Unlimited Unmetered'}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-300">Operating System:</span>
                    <span className="font-mono text-blue-400 font-bold">Ubuntu 24.04 LTS / AlmaLinux 9</span>
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
