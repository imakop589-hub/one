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
      className={`font-['Baloo_2',cursive,sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.15] ${alignClass} ${className}`}
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#008a45] text-xs font-bold tracking-wide">
              {badge}
            </span>
          ) : (
            badge
          )}
        </div>
      )}
      <Component
        id={id}
        className={`font-['Baloo_2',cursive,sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight ${className}`}
        {...props}
      >
        {children}
      </Component>
      {subtitle && (
        <p className="text-sm sm:text-base text-gray-600 mt-2.5 sm:mt-3 leading-relaxed max-w-2xl">
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
    1: 'font-[\'Baloo_2\',cursive,sans-serif] text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]',
    2: 'font-[\'Baloo_2\',cursive,sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight',
    3: 'font-[\'Baloo_2\',cursive,sans-serif] text-xl sm:text-2xl font-black text-slate-950 tracking-tight',
    4: 'font-[\'Baloo_2\',cursive,sans-serif] text-lg sm:text-xl font-bold text-slate-950',
    5: 'font-[\'Baloo_2\',cursive,sans-serif] text-base font-bold text-slate-900',
    6: 'font-[\'Baloo_2\',cursive,sans-serif] text-sm font-bold text-slate-900 uppercase tracking-wider',
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
    lead: 'text-lg sm:text-xl text-slate-700 font-normal leading-relaxed',
    body: 'text-sm sm:text-base text-gray-600 font-normal leading-relaxed',
    small: 'text-xs sm:text-sm text-gray-500 leading-normal',
    muted: 'text-xs text-gray-400',
    caption: 'text-[11px] font-medium text-gray-400 tracking-wide uppercase',
  }[variant];

  return (
    <Component className={`${variantClasses} ${className}`} {...props}>
      {children}
    </Component>
  );
};
