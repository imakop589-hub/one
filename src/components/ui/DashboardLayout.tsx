import React from 'react';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebar,
  header,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${className}`}>
      {header}
      <div className="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 flex flex-col lg:flex-row gap-8">
        {sidebar && (
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
              {sidebar}
            </div>
          </aside>
        )}
        <main className="flex-1 min-w-0 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 ${className}`}
      {...props}
    >
      {(title || action) && (
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div>
            {title && (
              <h3 className="font-['Baloo_2',cursive,sans-serif] text-xl font-bold text-slate-950">
                {title}
              </h3>
            )}
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="min-w-0">{children}</div>
    </div>
  );
};
