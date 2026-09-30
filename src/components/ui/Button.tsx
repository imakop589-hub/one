import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  disabled,
  id,
  type = 'button',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-bold transition-all duration-150 select-none focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeClasses = {
    sm: 'h-9 px-3.5 text-xs rounded-lg gap-1.5',
    md: 'h-[50px] px-6 text-sm sm:text-base rounded-lg gap-2',
    lg: 'h-[54px] px-8 text-base rounded-xl gap-2.5 shadow-sm',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#008a45] text-white hover:bg-[#007038] active:bg-[#005a2c] focus:ring-[#008a45] shadow-xs hover:shadow-md',
    accent:
      'bg-[#fed000] text-slate-950 hover:bg-[#ebbe00] active:bg-[#d4ac00] focus:ring-[#fed000] shadow-xs hover:shadow-md font-black',
    secondary:
      'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 focus:ring-slate-900 shadow-xs',
    outline:
      'bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 focus:ring-gray-400',
    ghost:
      'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 focus:ring-gray-300',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 focus:ring-rose-500 shadow-xs',
  }[variant];

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      id={id}
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
