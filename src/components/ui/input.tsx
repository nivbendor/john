import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Add any additional props specific to your Input component
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      className={`
        block
        px-1 sm:px-2
        py-1 sm:py-2
        border border-gray-300
        rounded-lg
        shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition duration-150 ease-in-out
        hover:bg-blue-50
        text-center
        w-28 sm:w-32 md:w-36 lg:w-40
        text-xs sm:text-sm md:text-base
        ${className}
      `}
      ref={ref}
      {...props}
    />
  )
);

Input.displayName = 'Input';