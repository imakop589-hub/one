import React from 'react';
import { ArrowRight, Quote } from 'lucide-react';

interface TestimonialQuoteProps {
  onStartTrial: () => void;
}

export const TestimonialQuote: React.FC<TestimonialQuoteProps> = ({ onStartTrial }) => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 xl:px-10 border-b border-gray-200">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
              Trusted by <br />
              businesses like <br />
              yours
            </h2>

            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
              Millions of customers trust Hostxeon with their online presence. Here's what they have to say.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartTrial}
                className="bg-[#fed000] hover:bg-[#ebbe00] active:scale-[0.98] text-gray-950 font-bold px-6 py-3 rounded-full text-sm sm:text-base flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                id="testimonial-start-trial-btn"
              >
                <span>Start free trial</span>
              </button>

              <a
                href="#features"
                className="border border-gray-300 hover:border-gray-900 text-gray-800 hover:text-black px-6 py-3 rounded-full text-sm sm:text-base font-semibold transition-all"
              >
                See features
              </a>
            </div>
          </div>

          {/* Right Column: Prominent Quote Card */}
          <div className="lg:col-span-7 bg-[#fbfcfb] border border-emerald-900/10 rounded-3xl p-8 sm:p-12 shadow-sm relative">
            <Quote className="w-12 h-12 text-[#008a45]/20 absolute top-6 right-6" />

            <blockquote className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111827] tracking-tight leading-snug mb-8">
              “For us, who aren't tech experts or coders, the best part is that we don't have to worry about the technical stuff.”
            </blockquote>

            {/* Author Profile */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200/60">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#008a45] shrink-0 bg-stone-200 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                  alt="Johan Ekman"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base">Johan Ekman</div>
                <div className="text-xs sm:text-sm text-gray-500 font-normal">
                  Founder of <strong className="text-gray-700 font-semibold">Bokföringskompaniet</strong>, Sweden
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
