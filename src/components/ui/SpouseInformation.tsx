
import React from 'react';
import { Label } from './label';
import { Switch } from './switch';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './select';
import { useColorFromUrl } from '../ProductDetails';

interface SpouseInformationProps {
  spouseAge: number;
  setSpouseAge: (age: number) => void;
  isSpouseSmoker: boolean;
  setIsSpouseSmoker: (isSmoker: boolean) => void;
}

const SpouseInformation: React.FC<SpouseInformationProps> = ({
  spouseAge,
  setSpouseAge,
  isSpouseSmoker,
  setIsSpouseSmoker
}) => {
  // Generate age options from 18 to 75
  const ageOptions = Array.from({ length: 58 }, (_, i) => i + 18);

  const dynamicColor = useColorFromUrl();

  return (
    <div className="px-5 py-4 bg-primary/5 rounded-lg mb-4 border border-primary/10">
      <h3 className="font-heading font-semibold text-secondary mb-4">Spouse Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spouse Age */}
        <div className="space-y-2">
          <Label htmlFor="spouse-age" className="text-sm font-medium text-secondary">
            Spouse Age
          </Label>
          <Select 
            value={spouseAge.toString()} 
            onValueChange={(value) => setSpouseAge(parseInt(value))}
          >
            <SelectTrigger id="spouse-age" className="w-full bg-white border-gray-200">
              <SelectValue placeholder="Select age" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ageOptions.map((ageOption) => (
                  <SelectItem key={ageOption} value={ageOption.toString()}>
                    {ageOption}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Spouse Smoker Status */}
        <div className="space-y-2">
          <Label htmlFor="spouse-smoker-status" className="text-sm font-medium text-secondary">
            Spouse Smoker Status
          </Label>
          <div className="flex items-center space-x-3 ">
            <div className="w-28">
              <Label 
                htmlFor="spouse-smoker-switch"
                className={isSpouseSmoker ? "text-destructive font-medium" : "font-medium"}
                style={isSpouseSmoker ? {} : { color: dynamicColor }}
              >
                {isSpouseSmoker ? "Smoker" : "Non-Smoker"}
              </Label>
            </div>
            <Switch
              id="spouse-smoker-switch"
              checked={isSpouseSmoker}
              onCheckedChange={setIsSpouseSmoker}
              className={isSpouseSmoker ? "bg-destructive bg-gray-500" : ""}
              style={isSpouseSmoker ? {} : { backgroundColor: dynamicColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpouseInformation;
