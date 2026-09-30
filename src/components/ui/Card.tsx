import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'flat' | 'elevated' | 'featured' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  id,
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }[padding];

  const variantClasses = {
    default: 'bg-white rounded-2xl border border-gray-100 shadow-sm',
    flat: 'bg-gray-50/70 rounded-2xl border border-gray-200/70',
    elevated: 'bg-white rounded-2xl border border-gray-100 shadow-xl',
    featured: 'bg-white rounded-2xl border-2 border-[#008a45] shadow-xl relative',
    interactive:
      'bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#008a45] transition-all duration-200 cursor-pointer',
  }[variant];

  return (
    <div id={id} className={`${variantClasses} ${paddingClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface PricingCardProps {
  name: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  price: string | number;
  period?: string;
  regularPrice?: string | number;
  isPopular?: boolean;
  features: Array<{ text: string; included: boolean; bold?: boolean }>;
  buttonText: string;
  onSelect: () => void;
  className?: string;
  id?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  badge,
  description,
  price,
  period = '/month',
  regularPrice,
  isPopular = false,
  features,
  buttonText,
  onSelect,
  className = '',
  id,
}) => {
  return (
    <div
      id={id}
      className={`bg-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 relative ${
        isPopular
          ? 'border-2 border-[#008a45] shadow-2xl ring-4 ring-emerald-50'
          : 'border border-gray-200/80 shadow-md hover:shadow-xl hover:border-gray-300'
      } ${className}`}
    >
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#008a45] text-white text-xs font-black uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
          Most Popular
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-['Baloo_2',cursive,sans-serif] text-2xl font-black text-slate-950">
            {name}
          </h3>
          {badge && !isPopular && (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#008a45] border border-emerald-200">
              {badge}
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500 mb-5 min-h-[32px] leading-relaxed">{description}</p>

        <div className="mb-6 pb-6 border-b border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="font-['Baloo_2',cursive,sans-serif] text-4xl sm:text-5xl font-black text-slate-950">
              {typeof price === 'number' ? `£${price.toFixed(2)}` : price}
            </span>
            <span className="text-xs text-gray-500 font-medium">{period}</span>
          </div>
          {regularPrice && (
            <div className="text-xs text-gray-400 mt-1">
              Renews at £{typeof regularPrice === 'number' ? regularPrice.toFixed(2) : regularPrice}
              /mo
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onSelect}
          className={`w-full h-[50px] rounded-lg font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs mb-6 ${
            isPopular
              ? 'bg-[#008a45] hover:bg-[#007038] text-white shadow-md'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          <span>{buttonText}</span>
        </button>

        <div className="space-y-3">
          <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Key Features:
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span
                  className={`mt-0.5 shrink-0 text-sm font-bold ${
                    feat.included ? 'text-[#008a45]' : 'text-gray-300'
                  }`}
                >
                  {feat.included ? '✓' : '✕'}
                </span>
                <span
                  className={`${
                    feat.bold ? 'font-bold text-gray-900' : ''
                  } ${!feat.included ? 'text-gray-400 line-through' : ''}`}
                >
                  {feat.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
