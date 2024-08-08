import React from 'react';
import { cn } from "../../utils/insuranceUtils"

interface CustomBadgeProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  ariaLabel?: string;
}

const variantClasses = {
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-gray-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-black',
  error: 'bg-red-500 text-white',
};

const CustomBadge: React.FC<CustomBadgeProps> = ({ children, className, style, variant = 'primary', ariaLabel }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
      style={style}
      role="status"
      aria-label={ariaLabel}
    >
      {children}
    </span>
  );
};

export default CustomBadge;