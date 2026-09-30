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
  Heart,
  Layout,
  RefreshCw,
  Copy
} from 'lucide-react';
import { HeroSection } from './HeroSection';
import { HeroSamplesBatch2 } from './HeroSamplesBatch2';
import { HeroSamplesBatch3 } from './HeroSamplesBatch3';
import { GoDaddyHeroBatch } from './GoDaddyHeroBatch';

interface HeroSamplesPageProps {
  onNavigate: (view: any) => void;
  onOpenPricing?: () => void;
  onSearchDomain?: (query: string) => void;
}

export const HeroSamplesPage: React.FC<HeroSamplesPageProps> = ({
  onNavigate,
  onOpenPricing,
  onSearchDomain
}) => {
  const [selectedSample, setSelectedSample] = useState<string>('all');
  const [filterTab, setFilterTab] = useState<'all' | 'godaddy' | 'modern'>('all');
  const [sample2Domain, setSample2Domain] = useState('');
  const [sample5Domain, setSample5Domain] = useState('mystudio');
  const [sample5Tld, setSample5Tld] = useState('.com');
  const [copiedSample, setCopiedSample] = useState<string | null>(null);

  const handleCopyFeedback = (sampleNum: number, sampleTitle: string) => {
    const text = `Mujhe Sample ${sampleNum} (${sampleTitle}) pasand aya hai. Isko main hero bana do!`;
    navigator.clipboard?.writeText(text);
    setCopiedSample(`Sample ${sampleNum}`);
    setTimeout(() => setCopiedSample(null), 3000);
  };

  const sampleList = [
    // Original 15
    { id: 'sample1', num: '1', title: 'Command Center', group: 'modern' },
    { id: 'sample2', num: '2', title: 'Clean Minimal', group: 'modern' },
    { id: 'sample3', num: '3', title: 'Dev Obsidian', group: 'modern' },
    { id: 'sample4', num: '4', title: 'Centered SaaS', group: 'modern' },
    { id: 'sample5', num: '5', title: 'Domain First', group: 'modern' },
    { id: 'sample6', num: '6', title: 'AI Builder', group: 'modern' },
    { id: 'sample7', num: '7', title: 'Cyber Defense', group: 'modern' },
    { id: 'sample8', num: '8', title: 'Global Edge', group: 'modern' },
    { id: 'sample9', num: '9', title: 'E-Commerce', group: 'modern' },
    { id: 'sample10', num: '10', title: 'Bento Grid', group: 'modern' },
    { id: 'sample11', num: '11', title: 'Neo-Brutalist', group: 'modern' },
    { id: 'sample12', num: '12', title: 'WordPress', group: 'modern' },
    { id: 'sample13', num: '13', title: 'Scale Simulator', group: 'modern' },
    { id: 'sample14', num: '14', title: 'Aurora Glass', group: 'modern' },
    { id: 'sample15', num: '15', title: 'VPS Hardware', group: 'modern' },
    // 15 GoDaddy Inspired
    { id: 'sample16', num: '16', title: 'GoDaddy Mega Domain', group: 'godaddy' },
    { id: 'sample17', num: '17', title: 'GoDaddy Airo™ AI', group: 'godaddy' },
    { id: 'sample18', num: '18', title: 'GoDaddy $1.99 Pack', group: 'godaddy' },
    { id: 'sample19', num: '19', title: 'GoDaddy Business Split', group: 'godaddy' },
    { id: 'sample20', num: '20', title: 'GoDaddy Promo Sale', group: 'godaddy' },
    { id: 'sample21', num: '21', title: 'GoDaddy Managed WP', group: 'godaddy' },
    { id: 'sample22', num: '22', title: 'GoDaddy POS Commerce', group: 'godaddy' },
    { id: 'sample23', num: '23', title: 'GoDaddy Branded Email', group: 'godaddy' },
    { id: 'sample24', num: '24', title: 'GoDaddy Web Security', group: 'godaddy' },
    { id: 'sample25', num: '25', title: 'GoDaddy Appraisal Broker', group: 'godaddy' },
    { id: 'sample26', num: '26', title: 'GoDaddy 24/7 Human Phone', group: 'godaddy' },
    { id: 'sample27', num: '27', title: 'GoDaddy SEO Marketing', group: 'godaddy' },
    { id: 'sample28', num: '28', title: 'GoDaddy AI Logo Maker', group: 'godaddy' },
    { id: 'sample29', num: '29', title: 'GoDaddy Pro Agencies', group: 'godaddy' },
    { id: 'sample30', num: '30', title: 'GoDaddy KVM Cloud VPS', group: 'godaddy' },
  ];

  const visibleSamples = filterTab === 'all' 
    ? sampleList 
    : sampleList.filter(s => s.group === filterTab);

  const isSampleVisible = (id: string, group: 'modern' | 'godaddy') => {
    if (selectedSample === id) return true;
    if (selectedSample !== 'all') return false;
    if (filterTab === 'all') return true;
    return filterTab === group;
  };

  const isBatch2Visible = (filterTab !== 'godaddy' && selectedSample === 'all') || 
    ['sample6','sample7','sample8','sample9','sample10'].includes(selectedSample);

  const isBatch3Visible = (filterTab !== 'godaddy' && selectedSample === 'all') || 
    ['sample11','sample12','sample13','sample14','sample15'].includes(selectedSample);

  const isGoDaddyBatchVisible = (filterTab !== 'modern' && selectedSample === 'all') ||
    (selectedSample.startsWith('sample') && parseInt(selectedSample.replace('sample','')) >= 16);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      
      {/* Top Header / Sticky Showcase Bar */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#fed000] text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  30 Hero Showcase
                </span>
                <span className="bg-emerald-100 text-[#008a45] text-xs font-bold px-2 py-0.5 rounded-full uppercase">
                  +15 GoDaddy Inspired
                </span>
                <h1 className="text-base sm:text-lg font-bold text-slate-900">
                  Compare 30 Unique Hero Section Designs
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Neeche 30 mukhtalif designs hain (jin mein 15 khas taur par <strong>GoDaddy</strong> se inspired hain). Jo design acha lagy uska number mujhe chat mein bata dein!
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Category Filter Tabs */}
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setFilterTab('all');
                    setSelectedSample('all');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filterTab === 'all' && selectedSample === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All (30)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilterTab('godaddy');
                    setSelectedSample('all');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                    filterTab === 'godaddy'
                      ? 'bg-[#008a45] text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  <span>🔥 GoDaddy Inspired (15)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilterTab('modern');
                    setSelectedSample('all');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filterTab === 'modern'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Modern SaaS (15)
                </button>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              >
                ← Back
              </button>
            </div>
          </div>

          {/* 30 Hero Quick Switcher Grid Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => setSelectedSample('all')}
              className={`px-3 py-1.5 rounded-lg font-black shrink-0 transition-all cursor-pointer ${
                selectedSample === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
              }`}
            >
              Show All
            </button>
            {visibleSamples.map((hero) => (
              <button
                key={hero.id}
                type="button"
                onClick={() => setSelectedSample(hero.id)}
                className={`px-2.5 py-1.5 rounded-lg font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedSample === hero.id
                    ? hero.group === 'godaddy'
                      ? 'bg-[#008a45] text-white shadow-xs'
                      : 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title={`Hero ${hero.num}: ${hero.title}`}
              >
                <span className="opacity-80">#{hero.num}</span>
                <span>{hero.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-16">
        
        {/* =========================================================================
            SAMPLE 1: MODERN COMMAND CENTER (CURRENT REFINED 50/50 SPLIT)
            ========================================================================= */}
        {isSampleVisible('sample1', 'modern') && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-1-wrapper">
            <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#008a45] text-white font-black flex items-center justify-center text-sm shadow-xs">
                  01
                </span>
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <span>Sample 1: Modern Interactive Command Center</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      50/50 Split
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sleek dark obsidian dashboard with 4 live interactive tabs (Website, Servers, Security, Email) & floating glassmorphic satellites.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyFeedback(1, "Modern Interactive Command Center")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSample === 'Sample 1' ? 'Copied Prompt!' : 'Select Sample 1'}</span>
                </button>
              </div>
            </div>

            {/* Render Actual Hero Component */}
            <div className="p-1 sm:p-2 bg-white">
              <HeroSection 
                onOpenPricing={onOpenPricing} 
                onNavigate={onNavigate} 
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            SAMPLE 2: GODADDY & STRIPE CLEAN MINIMALIST (HIGH CONVERSION SPLIT)
            ========================================================================= */}
        {isSampleVisible('sample2', 'modern') && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-2-wrapper">
            <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                  02
                </span>
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <span>Sample 2: Clean Minimalist & Instant Domain Search</span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                      High Conversion
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    GoDaddy & Stripe style: Light airy background, direct in-hero domain search bar, customer ratings, and live store preview mockup.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyFeedback(2, "Clean Minimalist & Instant Domain Search")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSample === 'Sample 2' ? 'Copied Prompt!' : 'Select Sample 2'}</span>
                </button>
              </div>
            </div>

            {/* Sample 2 Hero Implementation */}
            <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-emerald-50/20 py-12 lg:py-20 px-4 sm:px-8 border-b border-gray-100">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Content (7 Cols) */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  {/* Rating Tag */}
                  <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 shadow-2xs text-xs font-semibold text-slate-700">
                    <div className="flex items-center text-[#fed000]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#fed000]" />
                      ))}
                    </div>
                    <span>4.9 / 5 Rating</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-emerald-700">140k+ Active Websites</span>
                  </div>

                  {/* Headline */}
                  <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                      Everything your business needs to grow online.
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                      Ultra-fast NVMe web hosting, custom domain registration, professional business email, and automated website tools backed by 24/7 human support.
                    </p>
                  </div>

                  {/* Interactive Domain Search inside Hero */}
                  <div className="bg-white p-2 sm:p-2.5 rounded-2xl border-2 border-slate-900 shadow-xl max-w-xl">
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (sample2Domain.trim() && onSearchDomain) {
                          onSearchDomain(sample2Domain);
                        } else {
                          onNavigate('domains');
                        }
                      }}
                      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                    >
                      <div className="flex items-center gap-2 px-3 flex-1 py-1">
                        <Search className="w-5 h-5 text-slate-400 shrink-0" />
                        <input 
                          type="text"
                          value={sample2Domain}
                          onChange={(e) => setSample2Domain(e.target.value)}
                          placeholder="Find your dream domain name..."
                          className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 placeholder-slate-400 outline-hidden"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-[#008a45] hover:bg-[#007038] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0"
                      >
                        <span>Search Domain</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                    
                    {/* Fast TLD Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 px-2 text-[11px] text-slate-500 font-medium border-t border-slate-100 mt-2">
                      <span>Popular:</span>
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">.com $4.99/yr</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">.store $1.99</span>
                      <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">.ai $49.99</span>
                    </div>
                  </div>

                  {/* Value Props Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700 font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#008a45] shrink-0" />
                      <span>Free .COM Domain</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#008a45] shrink-0" />
                      <span>Free SSL & DNSSEC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#008a45] shrink-0" />
                      <span>30-Day Money Back</span>
                    </div>
                  </div>
                </div>

                {/* Right Visual: Clean Store / Browser Mockup (5 Cols) */}
                <div className="lg:col-span-5 relative flex justify-center">
                  <div className="relative w-full max-w-md">
                    
                    {/* Floating Card: Sales Notification */}
                    <div className="absolute -top-4 -left-4 z-20 bg-white rounded-2xl p-3 shadow-lg border border-slate-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                        💰
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">New Order: $148.00</div>
                        <div className="text-[10px] text-slate-500">Stripe payment received</div>
                      </div>
                    </div>

                    {/* Main Browser Card */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative z-10">
                      {/* Browser header */}
                      <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <div className="flex-1 bg-white rounded-md px-2 py-0.5 text-[10px] font-mono text-slate-500 truncate text-center">
                          https://lumina-coffee.com
                        </div>
                      </div>

                      {/* Mockup Store UI */}
                      <div className="p-5 space-y-4 bg-gradient-to-b from-amber-50/30 to-white">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-sm text-slate-900">Lumina Artisan Roasters</span>
                          <span className="text-[10px] font-bold bg-[#fed000] text-slate-950 px-2 py-0.5 rounded-full">
                            Cart (2)
                          </span>
                        </div>

                        <div className="h-28 bg-slate-900 text-white rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                          <div className="space-y-1 relative z-10">
                            <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded text-white font-semibold">Specialty Roast</span>
                            <div className="text-sm font-bold">Single-Origin Ethiopian Yirgacheffe</div>
                          </div>
                          <div className="flex items-center justify-between text-xs font-bold relative z-10">
                            <span>$18.50 / bag</span>
                            <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded">Fast Shipping</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-center text-xs">
                          <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl">
                            <div className="text-emerald-600 font-extrabold">0.4s</div>
                            <div className="text-[10px] text-slate-500">Page Speed</div>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl">
                            <div className="text-slate-900 font-extrabold">100%</div>
                            <div className="text-[10px] text-slate-500">Uptime SLA</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Card: Domain Active */}
                    <div className="absolute -bottom-4 -right-4 z-20 bg-white rounded-2xl p-3 shadow-lg border border-slate-100 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Domain Connected</div>
                        <div className="text-[10px] text-emerald-600 font-medium">SSL Certificate Active</div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SAMPLE 3: DEVELOPER & CLOUD INFRASTRUCTURE (VERCEL / SUPABASE DARK MODE)
            ========================================================================= */}
        {isSampleVisible('sample3', 'modern') && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-3-wrapper">
            <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
                  03
                </span>
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <span>Sample 3: Developer & Cloud Infrastructure</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Obsidian Dark
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Vercel & Supabase inspired: Pure obsidian dark mode, interactive terminal deployment preview, and real-time global latency telemetry.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyFeedback(3, "Developer & Cloud Infrastructure (Dark Mode)")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSample === 'Sample 3' ? 'Copied Prompt!' : 'Select Sample 3'}</span>
                </button>
              </div>
            </div>

            {/* Sample 3 Hero Implementation */}
            <div className="relative overflow-hidden bg-[#070b0f] text-slate-100 py-12 lg:py-20 px-4 sm:px-8 border-b border-slate-800">
              {/* Radial gradient background */}
              <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* Left Column: Developer Copy (6 Cols) */}
                <div className="lg:col-span-6 space-y-6 text-left">
                  {/* Tech Pill */}
                  <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-full px-3.5 py-1.5 text-xs text-slate-300 font-mono shadow-inner">
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AMD EPYC™ 9654 • Gen4 NVMe</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                      Cloud hosting engineered for serious scale.
                    </h1>
                    <p className="text-base text-slate-400 leading-relaxed">
                      Deploy mission-critical web applications with sub-second global latency, isolated cPanel containers, and automated Git CI/CD.
                    </p>
                  </div>

                  {/* Performance Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                    <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                      <div className="text-emerald-400 font-mono font-bold text-sm">99.99%</div>
                      <div className="text-[10px] text-slate-400">Guaranteed SLA</div>
                    </div>
                    <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                      <div className="text-white font-mono font-bold text-sm">18ms</div>
                      <div className="text-[10px] text-slate-400">Edge Latency</div>
                    </div>
                    <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                      <div className="text-emerald-400 font-mono font-bold text-sm">7,200 MB/s</div>
                      <div className="text-[10px] text-slate-400">Read I/O</div>
                    </div>
                    <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                      <div className="text-white font-mono font-bold text-sm">280+</div>
                      <div className="text-[10px] text-slate-400">CDN Pops</div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onNavigate('cloud')}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                    >
                      <span>Deploy Server in 60s</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('vps')}
                      className="border border-slate-700 hover:border-slate-500 text-slate-200 px-5 py-3.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer bg-slate-900/60"
                    >
                      View VPS Cloud Nodes
                    </button>
                  </div>
                </div>

                {/* Right Column: Interactive Terminal Preview (6 Cols) */}
                <div className="lg:col-span-6">
                  <div className="bg-[#0b1219] rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden font-mono text-xs">
                    {/* Terminal Top Bar */}
                    <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        <span className="text-[11px] text-slate-300 ml-2">bash - hostxeon-cli</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        SSH Connected
                      </span>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-4 sm:p-5 space-y-2 text-slate-300 text-[11px] leading-relaxed">
                      <div className="text-slate-400 flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">$</span>
                        <span>hostxeon cluster provision --region eu-central-1</span>
                      </div>
                      <div className="text-emerald-400">✔ Initializing NVMe Gen4 Block Storage [100 GB Allocated]</div>
                      <div className="text-emerald-400">✔ Isolated cPanel Container Mounted (cgroup v2)</div>
                      <div className="text-emerald-400">✔ Free Wildcard SSL Certificate Generated (*.apexstudio.co)</div>
                      <div className="text-emerald-400">✔ LiteSpeed Enterprise Cache Engine Active</div>

                      <div className="pt-3 border-t border-slate-800/80 my-2 text-slate-400">
                        <span className="text-white font-bold">Node Telemetry:</span>
                        <div className="grid grid-cols-3 gap-2 mt-2 font-sans text-xs">
                          <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                            <div className="text-[10px] text-slate-500">Frankfurt (FRA-01)</div>
                            <div className="font-bold text-emerald-400">12ms • 100% SLA</div>
                          </div>
                          <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                            <div className="text-[10px] text-slate-500">London (LON-02)</div>
                            <div className="font-bold text-emerald-400">16ms • 100% SLA</div>
                          </div>
                          <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                            <div className="text-[10px] text-slate-500">New York (NYC-01)</div>
                            <div className="font-bold text-emerald-400">22ms • 100% SLA</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-amber-300 pt-1">
                        🚀 Production deployment complete: https://apexstudio.co (HTTP/3 Quic)
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SAMPLE 4: CENTERED ALL-IN-ONE SAAS SHOWCASE (LINEAR & APPLE STYLE)
            ========================================================================= */}
        {isSampleVisible('sample4', 'modern') && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-4-wrapper">
            <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                  04
                </span>
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <span>Sample 4: Centered All-In-One SaaS Showcase</span>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                      Linear / Apple Style
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Grand centered typography layout with high impact, prominent action buttons, and wide panoramic command center interface underneath.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyFeedback(4, "Centered All-In-One SaaS Showcase")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSample === 'Sample 4' ? 'Copied Prompt!' : 'Select Sample 4'}</span>
                </button>
              </div>
            </div>

            {/* Sample 4 Hero Implementation */}
            <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100/50 py-16 lg:py-24 px-4 sm:px-8 border-b border-gray-100">
              <div className="max-w-4xl mx-auto text-center space-y-7">
                
                {/* Announcement pill */}
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/90 text-[#008a45] rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Spring 2026 Release • AI Builder 2.5 & Gen4 Cloud Active</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                  Everything you need to launch, scale, and secure your digital brand.
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  High-speed NVMe cloud hosting, automated domain security, professional business email, and AI-assisted website creation unified in one single dashboard.
                </p>

                {/* Action Row */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={onOpenPricing}
                    className="w-full sm:w-auto bg-[#008a45] hover:bg-[#007038] text-white font-extrabold px-8 py-4 rounded-xl text-base transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2.5 group"
                  >
                    <span>Start Free for 14 Days</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('webhosting')}
                    className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold px-7 py-4 rounded-xl text-base transition-colors cursor-pointer"
                  >
                    Explore All 4 Hosting Plans
                  </button>
                </div>

                {/* Social Proof Row */}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5 text-slate-800 font-bold">
                    <Check className="w-4 h-4 text-[#008a45]" /> Free Domain Included
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-800 font-bold">
                    <Check className="w-4 h-4 text-[#008a45]" /> 99.99% Uptime SLA
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-800 font-bold">
                    <Check className="w-4 h-4 text-[#008a45]" /> 15-Day Money-Back Guarantee
                  </span>
                </div>

                {/* Wide Panoramic Dashboard Mockup */}
                <div className="pt-8">
                  <div className="bg-[#0b131a] rounded-3xl p-4 sm:p-6 border border-slate-700/70 shadow-2xl text-left text-white max-w-4xl mx-auto relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="w-3 h-3 rounded-full bg-amber-500" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="font-bold ml-2">Hostxeon Global Command Center</span>
                      </div>
                      <span className="text-emerald-400 font-mono text-[11px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        All Systems Operational
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-xs">
                      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                        <div className="text-slate-400">Registered Domains</div>
                        <div className="text-base font-extrabold text-white mt-1">apexstudio.co</div>
                      </div>
                      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                        <div className="text-slate-400">NVMe Cloud Health</div>
                        <div className="text-base font-extrabold text-emerald-400 mt-1">99.99% SLA</div>
                      </div>
                      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                        <div className="text-slate-400">Global CDN Pop</div>
                        <div className="text-base font-extrabold text-white mt-1">280+ Active Nodes</div>
                      </div>
                      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                        <div className="text-slate-400">DNSSEC & SSL</div>
                        <div className="text-base font-extrabold text-emerald-400 mt-1">TLS 1.3 Active</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SAMPLE 5: DOMAIN-FIRST BUSINESS LAUNCHPAD (NAMECHEAP & HOSTINGER STYLE)
            ========================================================================= */}
        {isSampleVisible('sample5', 'modern') && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden" id="sample-5-wrapper">
            <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
                  05
                </span>
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <span>Sample 5: Domain-First Business Launchpad</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                      Action Driven
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Hostinger & Namecheap inspired: Instant domain checker, 3-step launch progress card, live extension pricing, and bundle offer.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyFeedback(5, "Domain-First Business Launchpad")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSample === 'Sample 5' ? 'Copied Prompt!' : 'Select Sample 5'}</span>
                </button>
              </div>
            </div>

            {/* Sample 5 Hero Implementation */}
            <div className="relative overflow-hidden bg-white py-12 lg:py-20 px-4 sm:px-8 border-b border-gray-100">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left: Action-Oriented Domain Search & Value Bundle (7 Cols) */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider">
                    <span>⚡ Claim Your Domain • Launch in 60s</span>
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                      Search your brand name. Launch your website today.
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                      Get everything in a single checkout: your custom web domain, unlimited NVMe cloud hosting, and professional branded mailboxes.
                    </p>
                  </div>

                  {/* Domain Selector Component */}
                  <div className="bg-slate-50 p-3 sm:p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row items-stretch gap-2">
                      <div className="flex-1 flex items-center bg-white rounded-xl border border-slate-300 px-3 py-1 shadow-2xs">
                        <Globe className="w-5 h-5 text-[#008a45] shrink-0 mr-2" />
                        <input
                          type="text"
                          value={sample5Domain}
                          onChange={(e) => setSample5Domain(e.target.value)}
                          placeholder="Type your company name..."
                          className="w-full bg-transparent py-2 text-sm sm:text-base font-bold text-slate-900 outline-hidden"
                        />
                        <span className="text-slate-400 font-bold text-sm sm:text-base">{sample5Tld}</span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          if (onSearchDomain) onSearchDomain(`${sample5Domain}${sample5Tld}`);
                          else onNavigate('domains');
                        }}
                        className="bg-[#008a45] hover:bg-[#007038] text-white font-extrabold px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-sm"
                      >
                        <span>Check Availability</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* TLD Extension Toggles */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {['.com', '.store', '.online', '.tech', '.co', '.ai'].map((tld) => (
                        <button
                          key={tld}
                          type="button"
                          onClick={() => setSample5Tld(tld)}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                            sample5Tld === tld 
                              ? 'bg-[#008a45] text-white shadow-2xs' 
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {tld} {tld === '.com' ? '$4.99' : tld === '.store' ? '$1.99' : '$7.99'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3 Step Timeline */}
                  <div className="grid grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#008a45] flex items-center justify-center text-[10px]">1</span>
                      <span>Claim Domain</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#008a45] flex items-center justify-center text-[10px]">2</span>
                      <span>Pick Hosting</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#008a45] flex items-center justify-center text-[10px]">3</span>
                      <span>Publish Site</span>
                    </div>
                  </div>
                </div>

                {/* Right: Launch Bundle Card Mockup (5 Cols) */}
                <div className="lg:col-span-5">
                  <div className="bg-gradient-to-br from-slate-900 to-[#0c161a] text-white p-6 rounded-3xl shadow-2xl border border-slate-700 relative overflow-hidden space-y-5">
                    
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">All-In-One Starter Pack</span>
                        <h3 className="text-lg font-bold text-white">Business Launch Bundle</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs line-through text-slate-400">$12.99</span>
                        <div className="text-xl font-extrabold text-[#fed000]">$1.99<span className="text-xs text-slate-300 font-normal">/mo</span></div>
                      </div>
                    </div>

                    {/* Included Services list */}
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-emerald-400" />
                          <span className="font-semibold text-slate-200">Custom Domain (.COM)</span>
                        </div>
                        <span className="text-emerald-400 font-bold">FREE 1st Year</span>
                      </div>

                      <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                        <div className="flex items-center gap-2">
                          <Server className="w-4 h-4 text-emerald-400" />
                          <span className="font-semibold text-slate-200">NVMe High-Speed Hosting</span>
                        </div>
                        <span className="text-slate-300">100 GB NVMe</span>
                      </div>

                      <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-amber-400" />
                          <span className="font-semibold text-slate-200">Business Mailboxes</span>
                        </div>
                        <span className="text-emerald-400 font-bold">Included</span>
                      </div>

                      <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-blue-400" />
                          <span className="font-semibold text-slate-200">Wildcard SSL Certificate</span>
                        </div>
                        <span className="text-emerald-400 font-bold">Lifetime Free</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={onOpenPricing}
                      className="w-full bg-[#008a45] hover:bg-[#007038] text-white font-extrabold py-3.5 rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Get Started with This Bundle</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SAMPLES 6 - 10 (AI BUILDER, CYBER DEFENSE, GLOBAL EDGE, E-COMMERCE, BENTO)
            ========================================================================= */}
        {isBatch2Visible && (
          <HeroSamplesBatch2
            onNavigate={onNavigate}
            onOpenPricing={onOpenPricing}
            onSearchDomain={onSearchDomain}
            copiedSample={copiedSample}
            onCopyFeedback={handleCopyFeedback}
            selectedSample={selectedSample}
          />
        )}

        {/* =========================================================================
            SAMPLES 11 - 15 (NEO-BRUTALIST, WORDPRESS, SCALE SIMULATOR, AURORA, VPS)
            ========================================================================= */}
        {isBatch3Visible && (
          <HeroSamplesBatch3
            onNavigate={onNavigate}
            onOpenPricing={onOpenPricing}
            onSearchDomain={onSearchDomain}
            copiedSample={copiedSample}
            onCopyFeedback={handleCopyFeedback}
            selectedSample={selectedSample}
          />
        )}

        {/* =========================================================================
            SAMPLES 16 - 30 (15 GODADDY INSPIRED HERO DESIGNS)
            ========================================================================= */}
        {isGoDaddyBatchVisible && (
          <GoDaddyHeroBatch
            onNavigate={onNavigate}
            onOpenPricing={onOpenPricing}
            onSearchDomain={onSearchDomain}
            copiedSample={copiedSample}
            onCopyFeedback={handleCopyFeedback}
            selectedSample={selectedSample}
          />
        )}

      </div>

      {/* Floating Bottom Notification bar for easy feedback */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-5 py-3 rounded-full shadow-2xl border border-slate-700 backdrop-blur-md flex items-center gap-3 text-xs sm:text-sm font-medium">
        <span className="w-2.5 h-2.5 rounded-full bg-[#fed000] animate-ping shrink-0" />
        <span className="text-slate-300">
          In 30 designs (Sample 1 - 30) me se jo pasand aye, uska number batayein (e.g. <strong className="text-[#fed000]">"Sample 16 (GoDaddy Search)"</strong> ya <strong className="text-emerald-400">"Sample 18 (Bundle)"</strong>)!
        </span>
      </div>

    </div>
  );
};
