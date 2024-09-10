import React, { ReactNode } from 'react';
import { CostView } from 'utils/insuranceTypes';

interface SelectProps<T> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  onValueChange?: (value: T) => void;
  className?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps<any>>(
  <T,>({ children, onValueChange, className, ...props }: SelectProps<T>, ref: React.Ref<HTMLSelectElement>) => (
    <div className="flex justify-center"> {/* Ensure this div doesn't affect the alignment */}
      <select
        ref={ref}
        className={`border-solid rounded-lg p-1 text-center text-base font-medium ${className || ''}`}
        onChange={(e) => onValueChange && onValueChange(e.target.value as unknown as T)}
        {...props}
      >
        {children}
      </select>
    </div>
  )
);

Select.displayName = 'Select';

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, ...props }, ref) => (
    <button ref={ref} className="w-40 h-10 bg-white rounded-lg border border-gray-300 text-center" {...props}>
      {children}
    </button>
  )
);

SelectTrigger.displayName = 'SelectTrigger';

interface SelectValueProps {
  children?: ReactNode;
  placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ children, placeholder }) => (
  <span className="w-full text-center">{children || placeholder}</span>
);

interface SelectContentProps {
  children: ReactNode;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  if (React.Children.count(children) === 0) {
    return null;
  }
  return <>{children}</>;
};

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: ReactNode;
}

export const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ children, ...props }, ref) => (
    <option ref={ref} {...props} className="text-center">
      {children}
    </option>
  )
);

SelectItem.displayName = 'SelectItem';
