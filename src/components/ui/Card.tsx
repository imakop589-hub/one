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
    default: 'bg-white rounded-xl border border-[#E2E8F0] shadow-xs',
    flat: 'bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]',
    elevated: 'bg-white rounded-xl border border-[#E2E8F0] shadow-md',
    featured: 'bg-white rounded-xl border-2 border-[#008744] shadow-md relative',
    interactive:
      'bg-white rounded-xl border border-[#E2E8F0] shadow-xs hover:shadow-md hover:border-[#008744] transition-all duration-200 cursor-pointer',
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
      className={`bg-white rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 relative ${
        isPopular
          ? 'border-2 border-[#008744] shadow-lg ring-4 ring-emerald-50/70'
          : 'border border-[#E2E8F0] shadow-xs hover:shadow-md hover:border-slate-300'
      } ${className}`}
    >
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#008744] text-white text-xs font-semibold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-xs">
          Most Popular
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading text-[20px] lg:text-[22px] font-bold text-[#0F172A]">
            {name}
          </h3>
          {badge && !isPopular && (
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#008744] border border-emerald-200">
              {badge}
            </span>
          )}
        </div>

        <p className="text-[13px] text-[#475569] mb-5 min-h-[32px] leading-relaxed font-normal">{description}</p>

        <div className="mb-6 pb-6 border-b border-[#E2E8F0]">
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tabular-nums tracking-tight">
              {typeof price === 'number' ? `£${price.toFixed(2)}` : price}
            </span>
            <span className="text-xs text-[#475569] font-medium">{period}</span>
          </div>
          {regularPrice && (
            <div className="text-xs text-slate-500 mt-1">
              Renews at £{typeof regularPrice === 'number' ? regularPrice.toFixed(2) : regularPrice}
              /mo
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onSelect}
          className={`w-full h-11 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs mb-6 ${
            isPopular
              ? 'bg-[#008744] hover:bg-[#006E37] text-white'
              : 'bg-[#0F172A] hover:bg-slate-800 text-white'
          }`}
        >
          <span>{buttonText}</span>
        </button>

        <div className="space-y-3">
          <div className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider">
            Key Features:
          </div>
          <ul className="space-y-2.5 text-[13px] sm:text-sm text-[#475569]">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span
                  className={`mt-0.5 shrink-0 text-sm font-semibold ${
                    feat.included ? 'text-[#008744]' : 'text-slate-300'
                  }`}
                >
                  {feat.included ? '✓' : '✕'}
                </span>
                <span className={feat.included ? 'text-[#0F172A]' : 'text-slate-400 line-through'}>
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
