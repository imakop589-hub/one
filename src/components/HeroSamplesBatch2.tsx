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
  ShoppingCart,
  MapPin,
  Wifi,
  Sliders,
  Send,
  Wand2,
  AlertCircle
} from 'lucide-react';

interface BatchProps {
  onNavigate: (view: any) => void;
  onOpenPricing?: () => void;
  onSearchDomain?: (query: string) => void;
  copiedSample: string | null;
  onCopyFeedback: (sampleNum: number, sampleTitle: string) => void;
}

export const HeroSamplesBatch2: React.FC<BatchProps & { selectedSample: string }> = ({
  onNavigate,
  onOpenPricing,
  onSearchDomain,
  copiedSample,
  onCopyFeedback,
  selectedSample
}) => {
  // Sample 6 State (AI Builder)
  const [promptText, setPromptText] = useState('Italian Artisan Bakery & Coffee in London');
  const [isGenerating, setIsGenerating] = useState(false);
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');

  // Sample 7 State (Security Radar)
  const [securityTab, setSecurityTab] = useState<'waf' | 'ddos' | 'ssl'>('waf');

  // Sample 8 State (Edge Latency)
  const [selectedRegion, setSelectedRegion] = useState<'fra' | 'lon' | 'nyc' | 'tyo' | 'sgp'>('fra');

  // Sample 9 State (WooCommerce)
  const [productCurrency, setProductCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');

  // Sample 10 State (Bento)
  const [bentoActiveTab, setBentoActiveTab] = useState<'storage' | 'backup' | 'cdn'>('storage');

  return (
    <>
      {/* =========================================================================
          SAMPLE 6: THE AI-POWERED WEBSITE BUILDER (WIX STUDIO / FRAMER STYLE)
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample6') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-6-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                06
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 6: AI-Powered Instant Site Builder</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                    AI Studio Concept
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Framer & Wix Studio inspired: Natural language prompt input, instant AI generation preview, and responsive viewport toggle.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onCopyFeedback(6, "AI-Powered Instant Site Builder")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSample === 'Sample 6' ? 'Copied Prompt!' : 'Select Sample 6'}</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-b from-purple-50/40 via-white to-slate-50 py-12 lg:py-20 px-4 sm:px-8 border-b border-gray-100">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column (6 Cols) */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 rounded-full px-3.5 py-1 text-xs font-bold border border-purple-200">
                  <Wand2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Hostxeon Aida 2.5 Generator</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                    Build a complete website with simple prompt words.
                  </h1>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Type your business idea. Our generative AI crafts bespoke layout, high-converting copy, payment checkout, and deploys it on NVMe cloud hosting in 30 seconds.
                  </p>
                </div>

                {/* Interactive AI Prompt Input */}
                <div className="bg-white p-2 rounded-2xl border-2 border-purple-500/80 shadow-xl space-y-2">
                  <div className="flex items-center gap-2 px-2 py-1">
                    <Sparkles className="w-5 h-5 text-purple-600 shrink-0 animate-pulse" />
                    <input 
                      type="text"
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      placeholder="e.g. Modern Architecture Studio in Berlin..."
                      className="w-full text-xs sm:text-sm font-semibold text-slate-900 outline-hidden bg-transparent"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                    <span className="text-[11px] text-slate-500 pl-2">Free .COM domain included</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsGenerating(true);
                        setTimeout(() => setIsGenerating(false), 1200);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-purple-600" /> No Coding Needed</span>
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-purple-600" /> Stripe Integrated</span>
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-purple-600" /> SEO Optimized</span>
                </div>
              </div>

              {/* Right Column: Live Mockup with Viewport Toggles (6 Cols) */}
              <div className="lg:col-span-6 flex flex-col items-center">
                {/* Viewport bar */}
                <div className="bg-white border border-slate-200 rounded-full px-3 py-1 shadow-xs flex items-center gap-2 mb-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setDevicePreview('desktop')}
                    className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                      devicePreview === 'desktop' ? 'bg-purple-600 text-white' : 'text-slate-600'
                    }`}
                  >
                    Desktop View
                  </button>
                  <button
                    type="button"
                    onClick={() => setDevicePreview('mobile')}
                    className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                      devicePreview === 'mobile' ? 'bg-purple-600 text-white' : 'text-slate-600'
                    }`}
                  >
                    Mobile Phone
                  </button>
                </div>

                {/* Simulated Canvas */}
                <div className={`transition-all duration-300 bg-slate-900 rounded-3xl p-3 shadow-2xl border border-slate-700 ${
                  devicePreview === 'mobile' ? 'w-64' : 'w-full max-w-lg'
                }`}>
                  <div className="bg-slate-800 rounded-2xl p-4 text-white space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-700 pb-2">
                      <span className="font-bold text-white flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        AI Live Generated Preview
                      </span>
                      <span>Ready to Publish</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Artisan Roasted</div>
                      <div className="text-base font-extrabold text-white leading-tight">Dolce Far Niente Cafe</div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        Authentic Italian espresso bar and handmade pastries in Covent Garden.
                      </p>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400">Today's Special</div>
                        <div className="text-xs font-bold text-amber-300">Pistachio Cannoli & Flat White</div>
                      </div>
                      <button className="bg-emerald-500 text-slate-950 font-bold text-[10px] px-2.5 py-1 rounded-lg">
                        Order $6.50
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>⚡ 100% NVMe Hosted</span>
                      <span className="text-emerald-400 font-mono">24ms Response</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 7: CYBER DEFENSE & ENTERPRISE SECURITY (CLOUDFLARE STYLE)
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample7') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-7-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-cyan-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
                07
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 7: Cyber Defense & Threat Shielding</span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    Enterprise Shield
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Cloudflare & Palo Alto inspired: Deep cyber navy canvas, real-time DDoS mitigation radar, and cryptographic DNSSEC verification.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onCopyFeedback(7, "Cyber Defense & Threat Shielding")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSample === 'Sample 7' ? 'Copied Prompt!' : 'Select Sample 7'}</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#06101e] text-slate-100 py-12 lg:py-20 px-4 sm:px-8 border-b border-slate-800">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-cyan-950 border border-cyan-800 text-cyan-300 px-3.5 py-1 rounded-full text-xs font-mono">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Always-On DDoS & Zero-Day WAF Defense</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                    Impenetrable security for high-value business assets.
                  </h1>
                  <p className="text-base text-slate-300 leading-relaxed">
                    Protect your website, customer databases, and APIs with military-grade TLS 1.3 encryption, automatic bot mitigation, and instant failover clusters.
                  </p>
                </div>

                {/* 3 Interactive tabs */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSecurityTab('waf')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      securityTab === 'waf' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Web Application Firewall
                  </button>
                  <button
                    type="button"
                    onClick={() => setSecurityTab('ddos')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      securityTab === 'ddos' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    DDoS Mitigation (Tbps)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSecurityTab('ssl')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      securityTab === 'ssl' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Encrypted DNSSEC
                  </button>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('webhosting')}
                    className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-cyan-400/20 flex items-center gap-2"
                  >
                    <span>Secure Your Website Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right: Real-Time Threat Radar (6 Cols) */}
              <div className="lg:col-span-6">
                <div className="bg-[#0b1728] border border-cyan-900/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b border-cyan-950 text-xs">
                    <span className="font-bold text-cyan-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      Hostxeon Global Threat Engine
                    </span>
                    <span className="font-mono text-emerald-400">All Nodes Secure</span>
                  </div>

                  <div className="my-5 grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Threats Blocked Today</div>
                      <div className="text-xl font-bold font-mono text-cyan-300 mt-1">2,841,920</div>
                    </div>
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Mitigation Speed</div>
                      <div className="text-xl font-bold font-mono text-emerald-400 mt-1">&lt; 3ms</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-cyan-950 flex items-center justify-between text-[11px]">
                      <span className="text-slate-300">SYN Flood Attack (32 Gbps)</span>
                      <span className="text-emerald-400 font-bold">Deflected</span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-cyan-950 flex items-center justify-between text-[11px]">
                      <span className="text-slate-300">SQL Injection Vector Attempt</span>
                      <span className="text-emerald-400 font-bold">Blocked by WAF</span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-cyan-950 flex items-center justify-between text-[11px]">
                      <span className="text-slate-300">Automated Bad Bot Scraping</span>
                      <span className="text-cyan-400 font-bold">Challenge Solved</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 8: HIGH-SPEED GLOBAL EDGE NETWORK (FASTLY / AKAMAI STYLE)
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample8') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-8-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
                08
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 8: Global Edge CDN & Low Latency</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                    Network Speed
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Fastly & Cloudflare style: Interactive global city latency selector, sub-second TTFB metrics, and Anycast routing.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onCopyFeedback(8, "Global Edge CDN & Low Latency")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSample === 'Sample 8' ? 'Copied Prompt!' : 'Select Sample 8'}</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden bg-slate-900 text-white py-12 lg:py-20 px-4 sm:px-8 border-b border-slate-800">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold">
                  <Wifi className="w-3.5 h-3.5 text-amber-400" />
                  <span>280+ Anycast Edge Points of Presence</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                    Instant load times anywhere on Earth.
                  </h1>
                  <p className="text-base text-slate-400 leading-relaxed">
                    Cached static assets and dynamic LiteSpeed edge caching deliver your pages to visitors in under 30 milliseconds, no matter where they browse from.
                  </p>
                </div>

                {/* City Latency Tester Pills */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Test Edge Point Latency:</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'fra', name: 'Frankfurt', ping: '12ms' },
                      { id: 'lon', name: 'London', ping: '15ms' },
                      { id: 'nyc', name: 'New York', ping: '18ms' },
                      { id: 'tyo', name: 'Tokyo', ping: '24ms' },
                      { id: 'sgp', name: 'Singapore', ping: '22ms' },
                    ].map((city) => (
                      <button
                        key={city.id}
                        type="button"
                        onClick={() => setSelectedRegion(city.id as any)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          selectedRegion === city.id
                            ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{city.name}</span>
                        <span className="font-mono text-[10px] opacity-80">({city.ping})</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('cloud')}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-amber-400/20"
                  >
                    Explore Cloud CDN Plans
                  </button>
                </div>
              </div>

              {/* Right: Latency Gauge Visual */}
              <div className="lg:col-span-6">
                <div className="bg-[#0b131a] rounded-3xl p-6 border border-slate-700 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">Live Network Telemetry</span>
                    <span className="text-emerald-400 font-mono">Anycast BGP Online</span>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
                    <div className="text-[11px] text-slate-400">Selected Node Latency</div>
                    <div className="text-4xl font-extrabold font-mono text-amber-400">
                      {selectedRegion === 'fra' ? '12ms' : selectedRegion === 'lon' ? '15ms' : selectedRegion === 'nyc' ? '18ms' : selectedRegion === 'tyo' ? '24ms' : '22ms'}
                    </div>
                    <div className="text-xs text-emerald-400 font-semibold">⚡ Sub-50ms Global Guarantee</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">HTTP/3 Quic</div>
                      <div className="font-bold text-white mt-0.5">Active</div>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Packet Loss</div>
                      <div className="font-bold text-emerald-400 mt-0.5">0.00%</div>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Cache Hit Ratio</div>
                      <div className="font-bold text-amber-400 mt-0.5">99.4%</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 9: E-COMMERCE & WOOCOMMERCE TURBOCHARGED (SHOPIFY STYLE)
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample9') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-9-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                09
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 9: E-Commerce & WooCommerce Turbocharged</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Store Focus
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Shopify & BigCommerce inspired: Dedicated to online sellers, instant Apple Pay / Stripe checkout preview, and zero cart abandonment speed.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onCopyFeedback(9, "E-Commerce & WooCommerce Turbocharged")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSample === 'Sample 9' ? 'Copied Prompt!' : 'Select Sample 9'}</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/30 via-white to-slate-50 py-12 lg:py-20 px-4 sm:px-8 border-b border-gray-100">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 rounded-full px-3.5 py-1 text-xs font-bold">
                  <ShoppingCart className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Optimized for WooCommerce, PrestaShop & Magento</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                    Turn visitors into paying customers at lightning speed.
                  </h1>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Every 100ms delay costs 7% in lost sales. Hostxeon's isolated e-commerce NVMe clusters load product catalogues instantly and handle massive Black Friday traffic spikes.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
                    <div className="font-extrabold text-emerald-700 text-base">380ms</div>
                    <div className="text-slate-500 text-[10px]">Product Page Speed</div>
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
                    <div className="font-extrabold text-slate-900 text-base">0% Drops</div>
                    <div className="text-slate-500 text-[10px]">Black Friday Uptime</div>
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
                    <div className="font-extrabold text-blue-700 text-base">PCI-DSS</div>
                    <div className="text-slate-500 text-[10px]">Payment Certified</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('webhosting')}
                    className="bg-[#008a45] hover:bg-[#007038] text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all cursor-pointer shadow-md"
                  >
                    Launch Online Store ($1.99/mo)
                  </button>
                </div>
              </div>

              {/* Right: E-Commerce Store Checkout Mockup */}
              <div className="lg:col-span-6">
                <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 max-w-md mx-auto space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-bold text-slate-900 text-sm">Checkout Experience</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Apple Pay Ready
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      👟
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-xs text-slate-900">Velocity Pro Running Shoe</div>
                      <div className="text-[10px] text-slate-500">Size 10 • In Stock (Ships Today)</div>
                    </div>
                    <div className="font-extrabold text-sm text-slate-900">$129.00</div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">$129.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span className="text-emerald-600 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 pt-1.5 font-extrabold text-slate-900 text-sm">
                      <span>Total</span>
                      <span>$129.00</span>
                    </div>
                  </div>

                  <button className="w-full bg-black text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md">
                    <span>Pay with Apple Pay</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SAMPLE 10: THE MODERN BENTO GRID HERO (LINEAR / RAYCAST STYLE)
          ========================================================================= */}
      {(selectedSample === 'all' || selectedSample === 'sample10') && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-10-wrapper">
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                10
              </span>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Sample 10: Modern Bento Grid Showcase</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    Bento UI
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Linear & Raycast inspired: Clean bento tiles displaying storage containers, automated daily snapshots, and real human support.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onCopyFeedback(10, "Modern Bento Grid Showcase")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSample === 'Sample 10' ? 'Copied Prompt!' : 'Select Sample 10'}</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden bg-slate-50 py-12 lg:py-20 px-4 sm:px-8 border-b border-gray-100">
            <div className="max-w-6xl mx-auto space-y-10">
              
              <div className="max-w-3xl mx-auto text-center space-y-3">
                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  The Complete Hosting Suite
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                  One platform. Infinite digital possibilities.
                </h1>
                <p className="text-base text-slate-600">
                  Carefully engineered micro-services unified into an intuitive hosting console.
                </p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Tile 1: Large Cloud Storage */}
                <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Storage Engine</span>
                    <h3 className="text-lg font-bold text-slate-900">Gen4 Enterprise NVMe Drives</h3>
                    <p className="text-xs text-slate-500">Unmatched file I/O operations with automated garbage collection.</p>
                  </div>

                  <div className="bg-slate-900 text-white p-4 rounded-2xl font-mono text-xs flex items-center justify-between">
                    <div>
                      <div className="text-slate-400 text-[10px]">Read Throughput</div>
                      <div className="text-base font-bold text-emerald-400">7,250 MB/s</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">IOPS Capacity</div>
                      <div className="text-base font-bold text-amber-300">120,000 IOPS</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">RAID-10 Mirror</div>
                      <div className="text-base font-bold text-white">Active</div>
                    </div>
                  </div>
                </div>

                {/* Tile 2: Daily Backup Snapshots */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Data Protection</span>
                    <h3 className="text-lg font-bold text-slate-900">Daily Snapshots</h3>
                    <p className="text-xs text-slate-500">Restore your entire site with a single click rollback.</p>
                  </div>
                  <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#008a45] shrink-0" />
                    <span>Latest backup: Today at 04:00 AM</span>
                  </div>
                </div>

                {/* Tile 3: SSL Certificate */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Wildcard TLS 1.3</h3>
                  <p className="text-xs text-slate-500">Auto-renewing 256-bit SSL certificates for all subdomains.</p>
                </div>

                {/* Tile 4: 24/7 Human Support */}
                <div className="md:col-span-2 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-sm flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">Expert Assistance</span>
                    <h3 className="text-lg font-bold text-white">24/7 Live Senior Engineers</h3>
                    <p className="text-xs text-slate-300">Average ticket response under 2 minutes. No robots.</p>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenPricing}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer shrink-0 shadow-md"
                  >
                    Get Started Now
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
