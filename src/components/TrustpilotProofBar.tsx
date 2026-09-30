import React from 'react';
import { ShieldCheck, Lock, RefreshCw, Zap } from 'lucide-react';

export const TrustpilotProofBar: React.FC = () => {
  return (
    <section className="bg-white border-b border-gray-100 py-3" id="trustpilot-proof-bar">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Real Trustpilot Link & Rating for hostxeon.com */}
        <a
          href="https://www.trustpilot.com/review/hostxeon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer group"
          id="trustpilot-official-link"
        >
          <span className="font-bold text-slate-900">Excellent</span>
          
          {/* 5 Green Trustpilot Stars */}
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <div 
                key={star} 
                className="w-4 h-4 bg-[#00b67a] flex items-center justify-center text-white text-[10px] shadow-2xs font-bold"
              >
                ★
              </div>
            ))}
          </div>

          <span className="font-medium text-slate-600 group-hover:text-[#00b67a] transition-colors">
            Rated 5.0 on
          </span>
          
          <div className="flex items-center gap-1 font-black text-slate-900">
            <span className="text-[#00b67a] text-base leading-none">★</span>
            <span className="tracking-tight">Trustpilot</span>
          </div>
        </a>

        {/* Supporting Real Business Trust Badges */}
        <div className="flex items-center gap-4 sm:gap-6 text-[11px] text-slate-600 flex-wrap justify-center font-medium">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5 text-[#008a45]" />
            <span>15-Day Money-Back</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-700">
            <Zap className="w-3.5 h-3.5 text-[#fed000] fill-[#fed000]" />
            <span>99.9% Uptime Guarantee</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-700">
            <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
            <span>Free 0-Downtime Migration</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-700">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit Encrypted Checkout</span>
          </div>
        </div>

      </div>
    </section>
  );
};
