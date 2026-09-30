import React, { useState } from 'react';
import { Star, CheckCircle, ShieldCheck, ChevronLeft, ChevronRight, ThumbsUp } from 'lucide-react';
import { REVIEWS_DATA } from '../data/siteData';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <section className="bg-[#fcfdfd] py-20 border-y border-gray-200/80" id="reviews">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008a45] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-[#00b67a]" />
            <span>Verified Trustpilot Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Delighting customers for more than 20 years
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
            <span className="font-bold text-gray-900">Rated 4.8 / 5.0</span>
            <span>•</span>
            <div className="flex text-[#00b67a]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span>•</span>
            <span>Over 24,900+ real reviews</span>
          </div>
        </div>

        {/* Reviews Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {REVIEWS_DATA.slice(0, 5).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5 bg-[#00b67a] text-white p-1 rounded-xs">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono">{review.date}</span>
                </div>

                {/* Author Name */}
                <div className="font-bold text-xs text-gray-900 flex items-center gap-1 mb-2">
                  <span>{review.name}</span>
                  <CheckCircle className="w-3 h-3 text-[#00b67a] shrink-0" title="Verified Customer" />
                </div>

                {/* Review Text */}
                <p className="text-xs text-gray-700 leading-relaxed font-normal line-clamp-4">
                  "{review.text}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                <span>Verified Buyer</span>
                <span className="font-bold text-gray-500">{review.country}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row of Reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {REVIEWS_DATA.slice(5, 9).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5 bg-[#00b67a] text-white p-1 rounded-xs">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono">{review.date}</span>
                </div>

                {/* Author Name */}
                <div className="font-bold text-xs text-gray-900 flex items-center gap-1 mb-2">
                  <span>{review.name}</span>
                  <CheckCircle className="w-3 h-3 text-[#00b67a] shrink-0" />
                </div>

                {/* Review Text */}
                <p className="text-xs text-gray-700 leading-relaxed font-normal line-clamp-4">
                  "{review.text}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                <span>Verified Buyer</span>
                <span className="font-bold text-gray-500">{review.country}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
