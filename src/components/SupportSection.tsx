import React from 'react';
import { HelpCircle, MessageSquare, GraduationCap, Mail, ArrowRight } from 'lucide-react';

interface SupportSectionProps {
  onOpenChat: () => void;
  onOpenHelp: () => void;
  onOpenAcademy: () => void;
  onOpenContact: () => void;
}

export const SupportSection: React.FC<SupportSectionProps> = ({
  onOpenChat,
  onOpenHelp,
  onOpenAcademy,
  onOpenContact,
}) => {
  return (
    <section className="bg-white py-20 border-b border-gray-200" id="support">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Need help? We are here for you!
          </h2>
        </div>

        {/* 4 Support Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. Help Center */}
          <div className="bg-[#fcfdfd] border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-400 hover:shadow-md transition-all">
            <div>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2 flex items-center gap-2">
                Help center
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mb-6">
                Have an issue but like learning on your own? We have a dedicated team creating the best help articles for you.
              </p>
            </div>

            <button
              onClick={onOpenHelp}
              className="w-full border border-gray-300 hover:border-gray-900 bg-white hover:bg-gray-50 text-gray-800 hover:text-black font-semibold text-xs sm:text-sm py-2.5 rounded-xl transition-colors cursor-pointer"
              id="support-fix-yourself-btn"
            >
              Fix it yourself
            </button>
          </div>

          {/* 2. Chat Support */}
          <div className="bg-[#fcfdfd] border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-400 hover:shadow-md transition-all">
            <div>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2 flex items-center gap-2">
                Chat support
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mb-6">
                We are always here to help you, 24/7 – 365 days a year. Our support specialists respond within seconds.
              </p>
            </div>

            <button
              onClick={onOpenChat}
              className="w-full border border-gray-300 hover:border-gray-900 bg-white hover:bg-gray-50 text-gray-800 hover:text-black font-semibold text-xs sm:text-sm py-2.5 rounded-xl transition-colors cursor-pointer"
              id="support-chat-with-us-btn"
            >
              Chat with us
            </button>
          </div>

          {/* 3. Academy */}
          <div className="bg-[#fcfdfd] border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-400 hover:shadow-md transition-all">
            <div>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2 flex items-center gap-2">
                Academy
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mb-6">
                Learn more about ecommerce, marketing, business, and much more with in-depth guides, tips & tricks.
              </p>
            </div>

            <button
              onClick={onOpenAcademy}
              className="w-full border border-gray-300 hover:border-gray-900 bg-white hover:bg-gray-50 text-gray-800 hover:text-black font-semibold text-xs sm:text-sm py-2.5 rounded-xl transition-colors cursor-pointer"
              id="support-become-expert-btn"
            >
              Become an expert
            </button>
          </div>

          {/* 4. Email Support */}
          <div className="bg-[#fcfdfd] border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-400 hover:shadow-md transition-all">
            <div>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2 flex items-center gap-2">
                Email support
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mb-6">
                Whatever your question, we will respond within 24 hours all year round with expert technical diagnosis.
              </p>
            </div>

            <button
              onClick={onOpenContact}
              className="w-full border border-gray-300 hover:border-gray-900 bg-white hover:bg-gray-50 text-gray-800 hover:text-black font-semibold text-xs sm:text-sm py-2.5 rounded-xl transition-colors cursor-pointer"
              id="support-contact-us-btn"
            >
              Contact us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
