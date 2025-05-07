import React from 'react';
import { Label } from './label';
import { Switch } from './switch';
import { useColorFromUrl } from '../ProductDetails';


interface SmokerStatusToggleProps {
  isSmoker: boolean;
  setIsSmoker: (isSmoker: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
}

const SmokerStatusToggle: React.FC<SmokerStatusToggleProps> = ({
  isSmoker,
  setIsSmoker,
  label = "Smoker Status",
  description = "Have you used tobacco products in the last 12 months?",
  className = "px-5 py-4 bg-gray-50 rounded-lg"
}) => {
  const dynamicColor = useColorFromUrl();

  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div>
        <Label htmlFor="smoker-status" className="font-medium text-secondary text-base">
          {label}
        </Label>
        <p className="text-sm text-neutral mt-1">
          {description}
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <Label 
          htmlFor="smoker-switch" 
          className={isSmoker ? "text-destructive font-medium" : "font-medium"}
          style={isSmoker ? {} : { color: dynamicColor }}
        >
          {isSmoker ? "Smoker" : "Non-Smoker"}
        </Label>
        <Switch
          id="smoker-switch"
          checked={isSmoker}
          onCheckedChange={setIsSmoker}
          className={isSmoker ? "bg-destructive bg-gray-500" : ""}
          style={isSmoker ? {} : { backgroundColor: dynamicColor }}
        />
      </div>
    </div>
  );
};

export default SmokerStatusToggle;
