import React from 'react';
import { ShieldCheck, Lock, RefreshCw, Zap } from 'lucide-react';

export const TrustpilotProofBar: React.FC = () => {
  return (
    <section className="bg-white border-b border-[#E2E8F0] py-2.5" id="trustpilot-proof-bar">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Real Trustpilot Link & Rating for hostxeon.com */}
        <a
          href="https://www.trustpilot.com/review/hostxeon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer group"
          id="trustpilot-official-link"
        >
          <span className="font-semibold text-[#0F172A]">Excellent</span>
          
          {/* 5 Green Trustpilot Stars */}
          <div className="flex items-center gap-0.5" aria-label="5 stars rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <div 
                key={star} 
                className="w-4 h-4 bg-[#00b67a] flex items-center justify-center text-white text-xs font-bold rounded-xs"
              >
                ★
              </div>
            ))}
          </div>

          <span className="font-medium text-[#475569] group-hover:text-[#008744] transition-colors">
            Rated 5.0 on
          </span>
          
          <div className="flex items-center gap-1 font-bold text-[#0F172A]">
            <span className="text-[#00b67a] text-sm leading-none">★</span>
            <span className="tracking-tight">Trustpilot</span>
          </div>
        </a>

        {/* Supporting Real Business Trust Badges with unified 30-Day Guarantee */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs text-[#475569] flex-wrap justify-center font-medium">
          <div className="flex items-center gap-1.5 text-[#006E37]">
            <ShieldCheck className="w-4 h-4 text-[#008744]" />
            <span className="font-semibold">30-Day Money-Back Guarantee</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#475569]">
            <Zap className="w-4 h-4 text-[#F59E0B]" />
            <span>99.9% Uptime Guarantee</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#475569]">
            <RefreshCw className="w-4 h-4 text-blue-600" />
            <span>Free 0-Downtime Migration</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#475569]">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>256-bit Encrypted Checkout</span>
          </div>
        </div>

      </div>
    </section>
  );
};
