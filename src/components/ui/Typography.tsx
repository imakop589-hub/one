import React from 'react';

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
  as?: 'h1' | 'h2';
  id?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  children,
  className = '',
  align = 'left',
  as: Component = 'h1',
  id,
  ...props
}) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <Component
      id={id}
      className={`font-heading text-[32px] md:text-[40px] lg:text-[52px] font-bold tracking-tight text-[#0F172A] leading-[1.15] ${alignClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  as?: 'h2' | 'h3';
  id?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = '',
  align = 'center',
  subtitle,
  badge,
  as: Component = 'h2',
  id,
  ...props
}) => {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col ${alignClass} max-w-3xl mb-8 sm:mb-12`}>
      {badge && (
        <div className="mb-3">
          {typeof badge === 'string' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#008744] text-xs font-semibold tracking-wide">
              {badge}
            </span>
          ) : (
            badge
          )}
        </div>
      )}
      <Component
        id={id}
        className={`font-heading text-[26px] md:text-[30px] lg:text-[36px] font-bold text-[#0F172A] tracking-tight leading-[1.2] ${className}`}
        {...props}
      >
        {children}
      </Component>
      {subtitle && (
        <p className="text-sm md:text-base text-[#475569] mt-2.5 sm:mt-3 leading-relaxed max-w-2xl font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  id?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 3,
  className = '',
  id,
  ...props
}) => {
  const Component = `h${level}` as React.ElementType;
  const levelClasses = {
    1: 'font-heading text-[32px] md:text-[40px] lg:text-[52px] font-bold text-[#0F172A] tracking-tight leading-[1.15]',
    2: 'font-heading text-[26px] md:text-[30px] lg:text-[36px] font-bold text-[#0F172A] tracking-tight leading-[1.2]',
    3: 'font-heading text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#0F172A] tracking-tight leading-[1.3]',
    4: 'font-heading text-base md:text-[18px] font-semibold text-[#0F172A] leading-snug',
    5: 'font-heading text-[15px] md:text-base font-semibold text-[#0F172A]',
    6: 'font-heading text-xs md:text-[13px] font-semibold text-[#475569] uppercase tracking-wider',
  }[level];

  return (
    <Component id={id} className={`${levelClasses} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: 'lead' | 'body' | 'small' | 'muted' | 'caption';
  className?: string;
  as?: 'p' | 'span' | 'div';
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  className = '',
  as: Component = 'p',
  ...props
}) => {
  const variantClasses = {
    lead: 'text-lg sm:text-xl text-[#0F172A] font-normal leading-relaxed',
    body: 'text-base text-[#475569] font-normal leading-relaxed',
    small: 'text-[13px] md:text-sm text-[#475569] leading-normal',
    muted: 'text-xs md:text-[13px] text-slate-500',
    caption: 'text-xs font-medium text-slate-500 tracking-wide uppercase',
  }[variant];

  return (
    <Component className={`${variantClasses} ${className}`} {...props}>
      {children}
    </Component>
  );
};
