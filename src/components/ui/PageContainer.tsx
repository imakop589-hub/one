import React from 'react';

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
  id?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  size = 'default',
  id,
  ...props
}) => {
  const sizeClasses = {
    narrow: 'max-w-5xl',
    default: 'max-w-screen-2xl',
    wide: 'max-w-full',
    full: 'max-w-full',
  };

  return (
    <div
      id={id}
      className={`w-full ${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
