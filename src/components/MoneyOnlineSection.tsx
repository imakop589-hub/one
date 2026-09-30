import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Send, 
  Globe, 
  Search, 
  Mail, 
  Calendar, 
  CheckSquare, 
  FileText, 
  Inbox, 
  UserCheck, 
  MessageSquare,
  FileSpreadsheet,
  Layers,
  ChevronRight,
  Zap,
  Activity,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface MoneyOnlineSectionProps {
  onOpenBuilder: () => void;
  onSearchDomain: (query: string) => void;
}

export const MoneyOnlineSection: React.FC<MoneyOnlineSectionProps> = ({
  onOpenBuilder,
  onSearchDomain,
}) => {
  const [interactiveLatency, setInteractiveLatency] = useState('14ms');
  const [selectedRegion, setSelectedRegion] = useState('London');
  const [chatInput, setChatInput] = useState('Add an instant table booking widget');
  const [messages, setMessages] = useState([
    { sender: 'user', text: 'I want a sleek Tokyo omakase dining site with table bookings.' },
    { sender: 'aida', text: 'Drafting modern dark aesthetics with interactive booking engine and instant SMS reminders.' }
  ]);

  const regionPings: Record<string, string> = {
    London: '14ms',
    Frankfurt: '11ms',
    Virginia: '19ms',
    Tokyo: '32ms',
    Sydney: '45ms',
  };

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
    setInteractiveLatency(regionPings[region] || '15ms');
  };

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: chatInput.trim() },
      { sender: 'aida', text: 'Configured! Added real-time reservation calendar and auto-confirmation workflow.' }
    ]);
    setChatInput('');
  };

  return (
    <section className="bg-[#f8faf9] py-24 relative overflow-hidden" id="features">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#d1fae5_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 text-[#008a45]" />
              <span>Full-Stack Web Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Everything you need to <br className="hidden sm:inline" />
              launch, sell, and scale online.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              A comprehensive suite engineered for high performance: autonomous AI design, 100/100 speed hosting, custom domains, and enterprise mail.
            </p>
          </div>
        </div>

        {/* ASYMMETRICAL BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* BENTO CARD 1: Wide AI Autonomous Studio (Span 7 cols) */}
          <div 
            className="lg:col-span-7 bg-gradient-to-br from-[#062c21] to-[#041d16] rounded-3xl p-7 sm:p-9 text-white shadow-xl border border-emerald-900/30 flex flex-col justify-between group hover:shadow-2xl transition-all"
            id="bento-ai-builder"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#fed000]" /> Autonomous Aida 2.5
                </span>
                <button
                  onClick={onOpenBuilder}
                  className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Launch Studio</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-white">
                Conversational Website Generation & Visual Editor
              </h3>
              <p className="text-sm sm:text-base text-emerald-100/80 max-w-xl font-normal leading-relaxed mb-6">
                Tell Aida what you need in plain English. It structures sections, generates copywriting, integrates bookings, and provides a real-time visual canvas for 1-click styling.
              </p>
            </div>

            {/* Interactive Mockup Container */}
            <div className="bg-[#0e3b2e] rounded-2xl p-4 sm:p-5 border border-emerald-700/30 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60 mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="font-mono text-[11px] text-emerald-200">kaysuki-omakase.hostxeon.site</span>
                </div>
                <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-700/50">
                  Ready in 45s
                </span>
              </div>

              {/* Chat interaction simulator */}
              <div className="space-y-2 mb-3 max-h-36 overflow-y-auto pr-1">
                {messages.map((m, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-2 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.sender === 'aida' && (
                      <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 text-[10px] font-bold text-white">
                        A
                      </div>
                    )}
                    <div className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                      m.sender === 'user' 
                        ? 'bg-emerald-700 text-white font-medium rounded-tr-xs' 
                        : 'bg-black/60 text-emerald-100 border border-emerald-500/20 rounded-tl-xs'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendPrompt} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="e.g. Add online store with Stripe checkout..."
                  className="flex-1 bg-black/40 border border-emerald-700/50 rounded-xl px-3 py-2 text-xs text-white placeholder:text-emerald-400/60 focus:outline-hidden focus:border-emerald-400"
                />
                <button
                  type="submit"
                  className="bg-[#fed000] hover:bg-[#eab308] text-slate-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Update</span>
                </button>
              </form>
            </div>
          </div>

          {/* BENTO CARD 2: Edge Hosting & Speed (Span 5 cols) */}
          <div 
            className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-8 text-slate-900 shadow-xl border border-slate-200/80 flex flex-col justify-between group hover:shadow-2xl transition-all"
            id="bento-edge-hosting"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-600" /> Global Edge Cloud
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 99.99% Uptime
                </span>
              </div>

              <h3 className="text-2xl font-black tracking-tight mb-2 text-slate-900">
                100/100 Core Web Vitals
              </h3>
              <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                Built on NVMe Gen4 edge servers with Anycast multi-region caching. Your website loads instantly anywhere across the globe.
              </p>
            </div>

            {/* Interactive Latency Tester */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <span className="text-xs text-slate-400">Global Region Pinger</span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <span className="text-slate-400">Latency:</span>
                  <span className="font-bold text-base">{interactiveLatency}</span>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-1.5 mb-3">
                {Object.keys(regionPings).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRegionClick(r)}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer ${
                      selectedRegion === r
                        ? 'bg-emerald-500 text-slate-950 shadow-xs'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Wildcard SSL Included
                </span>
                <span>Tier-4 Datacenters</span>
              </div>
            </div>
          </div>

          {/* BENTO CARD 3: Custom Domains & Managed DNSSEC (Span 5 cols) */}
          <div 
            onClick={() => onSearchDomain('')}
            className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-8 text-slate-900 shadow-xl border border-slate-200/80 flex flex-col justify-between group hover:shadow-2xl transition-all cursor-pointer"
            id="bento-domain-suite"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-purple-600" /> Smart Registrar
                </span>
                <div className="text-xs font-bold text-purple-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore TLDs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <h3 className="text-2xl font-black tracking-tight mb-2 text-slate-900">
                Find Your Premium Brand Identity
              </h3>
              <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                Instant domain registration with DNSSEC cryptographic security, automatic renewal protection, and free private WHOIS.
              </p>
            </div>

            {/* Interactive Domain Pill Card */}
            <div className="bg-gradient-to-tr from-slate-950 to-slate-900 text-white rounded-2xl p-4 border border-slate-800 flex flex-col gap-2.5">
              <div className="flex items-center justify-between bg-slate-800/90 rounded-xl px-3.5 py-2.5 border border-slate-700">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-extrabold tracking-wide">mycompany<span className="text-[#fed000]">.ai</span></span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Available Now
                </span>
              </div>

              <div className="flex items-center justify-between text-xs px-1 text-slate-400">
                <span>Anycast DNS Resolution</span>
                <span className="text-emerald-400 font-bold">0.02ms Response</span>
              </div>
            </div>
          </div>

          {/* BENTO CARD 4: Business Email & Microsoft 365 (Span 7 cols) */}
          <div 
            className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-8 text-slate-900 shadow-xl border border-slate-200/80 flex flex-col justify-between group hover:shadow-2xl transition-all"
            id="bento-business-email"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-600" /> Professional Identity
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Included with all plans
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-slate-900">
                Branded Custom Email & Microsoft 365
              </h3>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-6">
                Build instant credibility with <span className="font-bold text-slate-900">you@yourcompany.com</span>. Features modern webmail, calendars, SPF/DKIM anti-spam, and optional Microsoft 365 suite.
              </p>
            </div>

            {/* Email + Calendar Preview Box */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
              <div className="sm:col-span-5 bg-white rounded-xl p-3 border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase">
                  <span>Inbox</span>
                  <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">3 New</span>
                </div>
                <div className="space-y-1.5">
                  <div className="bg-emerald-50/80 p-2 rounded-lg border border-emerald-100">
                    <div className="font-bold text-slate-900 text-[11px]">New order received #1084</div>
                    <div className="text-slate-500 text-[10px]">Stripe checkout confirmed £148.00</div>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-slate-50">
                    <div className="font-bold text-slate-800 text-[11px]">Table booking: Sarah J.</div>
                    <div className="text-slate-500 text-[10px]">Tomorrow at 7:30 PM (4 guests)</div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-7 bg-white rounded-xl p-3 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 mb-1">
                    <span>Smart Calendar & Office Suite</span>
                    <span className="text-[10px] text-emerald-600 font-extrabold">1 TB OneDrive</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Seamless sync across iOS, Android, macOS, and Windows with zero setup headaches.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 mt-2">
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded">Word</span>
                  <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded">Excel</span>
                  <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded">Teams</span>
                  <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded">Outlook</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
