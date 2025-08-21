import React, { useState, forwardRef } from 'react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'number';
  clearable?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value = '',
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled = false,
      invalid = false,
      loading = false,
      variant = 'outlined',
      size = 'md',
      type = 'text',
      clearable = false,
      showPasswordToggle = false,
      className = '',
      id,
      name,
      required = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = type === 'password' && showPasswordToggle 
      ? (showPassword ? 'text' : 'password') 
      : type;

    const handleClear = () => {
      if (onChange) {
        const event = {
          target: { value: '' }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
    };

    const baseInputClasses = [
      'w-full transition-all duration-200 ease-in-out',
      'focus:outline-none focus:ring-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'placeholder-gray-400'
    ];

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-4 py-3 text-lg'
    };

    const variantClasses = {
      filled: [
        'bg-gray-100 border border-transparent',
        'focus:bg-white focus:border-primary-500 focus:ring-primary-200',
        'hover:bg-gray-50',
        invalid && 'bg-red-50 border-red-200 focus:border-red-500 focus:ring-red-200'
      ],
      outlined: [
        'bg-white border border-gray-300',
        'focus:border-primary-500 focus:ring-primary-200',
        'hover:border-gray-400',
        invalid && 'border-red-300 focus:border-red-500 focus:ring-red-200'
      ],
      ghost: [
        'bg-transparent border-b border-gray-300',
        'focus:border-primary-500 focus:ring-0',
        'hover:border-gray-400',
        invalid && 'border-red-300 focus:border-red-500'
      ]
    };

    const inputClasses = [
      ...baseInputClasses,
      sizeClasses[size],
      ...variantClasses[variant].filter(Boolean),
      className
    ].join(' ');

    const containerClasses = [
      'relative',
      disabled && 'opacity-50 pointer-events-none'
    ].filter(Boolean).join(' ');

    const labelClasses = [
      'block text-sm font-medium mb-1',
      invalid ? 'text-red-600' : 'text-gray-700'
    ].join(' ');

    const helperTextClasses = [
      'text-sm mt-1',
      invalid ? 'text-red-600' : 'text-gray-500'
    ].join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={id} className={labelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            id={id}
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            required={required}
            className={inputClasses}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={invalid}
            aria-describedby={
              errorMessage ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            {...props}
          />

          {/* Loading spinner */}
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin-slow w-4 h-4 border-2 border-gray-300 border-t-primary-500 rounded-full"></div>
            </div>
          )}

                     {/* Password toggle */}
           {showPasswordToggle && type === 'password' && !loading && (
             <button
               type="button"
               onClick={handlePasswordToggle}
               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
               aria-label={showPassword ? 'Hide password' : 'Show password'}
             >
               {showPassword ? (
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                 </svg>
               ) : (
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                 </svg>
               )}
             </button>
           )}

                     {/* Clear button */}
           {clearable && value && !loading && !showPasswordToggle && (
             <button
               type="button"
               onClick={handleClear}
               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
               aria-label="Clear input"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           )}

                     {/* Clear button with password toggle */}
           {clearable && value && !loading && showPasswordToggle && type === 'password' && (
             <button
               type="button"
               onClick={handleClear}
               className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
               aria-label="Clear input"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           )}
        </div>

        {/* Error message */}
        {errorMessage && (
          <p id={`${id}-error`} className="text-sm text-red-600 mt-1" role="alert">
            {errorMessage}
          </p>
        )}

        {/* Helper text */}
        {helperText && !errorMessage && (
          <p id={`${id}-helper`} className={helperTextClasses}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
