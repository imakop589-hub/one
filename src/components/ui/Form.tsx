import React from 'react';

// ==========================================
// FORM GROUP & FORM FIELD
// ==========================================

export interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className = '',
  cols = 1,
}) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[cols];

  return <div className={`grid ${colClasses} gap-4 sm:gap-5 ${className}`}>{children}</div>;
};

export interface FormFieldProps {
  label?: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required = false,
  error,
  hint,
  className = '',
  children,
  action,
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {(label || action) && (
        <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
          {label && (
            <label htmlFor={htmlFor} className="block tracking-wide">
              {label}
              {required && <span className="text-rose-500 ml-1">*</span>}
            </label>
          )}
          {action && <div className="text-xs">{action}</div>}
        </div>
      )}
      {children}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );
};

// ==========================================
// STANDARD INPUT (Height: 50px, Radius: 8px)
// ==========================================

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  id?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, leftIcon, rightIcon, disabled, id, ...props }, ref) => {
    const errorBorder = error
      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500 bg-rose-50/20'
      : 'border-gray-300 focus:border-[#008a45] focus:ring-[#008a45] bg-white';

    const disabledClass = disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '';

    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3.5 text-gray-400 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          className={`w-full h-[50px] text-sm sm:text-base text-gray-900 placeholder:text-gray-400 rounded-lg border px-4 transition-all duration-150 focus:outline-hidden focus:ring-2 focus:ring-opacity-20 shadow-2xs ${
            leftIcon ? 'pl-11' : ''
          } ${rightIcon ? 'pr-11' : ''} ${errorBorder} ${disabledClass} ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-gray-400 pointer-events-none flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

// ==========================================
// SELECT COMPONENT
// ==========================================

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean | string;
  options?: Array<{ label: string; value: string | number }>;
  id?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', error, children, options, disabled, id, ...props }, ref) => {
    const errorBorder = error
      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
      : 'border-gray-300 focus:border-[#008a45] focus:ring-[#008a45]';

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          id={id}
          disabled={disabled}
          className={`w-full h-[50px] appearance-none text-sm sm:text-base text-gray-900 bg-white rounded-lg border px-4 pr-10 transition-all focus:outline-hidden focus:ring-2 focus:ring-opacity-20 shadow-2xs ${errorBorder} ${
            disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'cursor-pointer'
          } ${className}`}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
);
Select.displayName = 'Select';

// ==========================================
// TEXTAREA COMPONENT
// ==========================================

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string;
  id?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, disabled, id, ...props }, ref) => {
    const errorBorder = error
      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
      : 'border-gray-300 focus:border-[#008a45] focus:ring-[#008a45]';

    return (
      <textarea
        ref={ref}
        id={id}
        disabled={disabled}
        className={`w-full min-h-[100px] text-sm sm:text-base text-gray-900 placeholder:text-gray-400 bg-white rounded-lg border p-4 transition-all focus:outline-hidden focus:ring-2 focus:ring-opacity-20 shadow-2xs ${errorBorder} ${
          disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
        } ${className}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

// ==========================================
// CHECKBOX & RADIO
// ==========================================

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className = '', id, ...props }, ref) => {
    return (
      <label className="inline-flex items-start gap-3 cursor-pointer group select-none">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={`w-5 h-5 mt-0.5 rounded-md border-gray-300 text-[#008a45] focus:ring-[#008a45] focus:ring-offset-0 cursor-pointer ${className}`}
          {...props}
        />
        {(label || description) && (
          <div className="text-sm">
            {label && <span className="font-medium text-gray-900 group-hover:text-black">{label}</span>}
            {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
          </div>
        )}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, className = '', id, ...props }, ref) => {
    return (
      <label className="inline-flex items-start gap-3 cursor-pointer group select-none">
        <input
          ref={ref}
          type="radio"
          id={id}
          className={`w-5 h-5 mt-0.5 border-gray-300 text-[#008a45] focus:ring-[#008a45] focus:ring-offset-0 cursor-pointer ${className}`}
          {...props}
        />
        {(label || description) && (
          <div className="text-sm">
            {label && <span className="font-medium text-gray-900 group-hover:text-black">{label}</span>}
            {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
          </div>
        )}
      </label>
    );
  }
);
Radio.displayName = 'Radio';
