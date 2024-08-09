import React, { ChangeEvent, useState } from 'react';
import { IndividualInfo, CostView } from '../utils/insuranceTypes';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/Avatar';
import InputStepper from './ui/ageinput';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from './ui/select';
import { useCostView } from './CostViewContext';

interface IndividualInfoFormProps {
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string | number },
  ) => void;
  errors: Record<string, string>;
}

const IndividualInfoForm: React.FC<IndividualInfoFormProps> = ({
  individualInfo = { age: 0, zipCode: '', annualSalary: 0 },
  handleIndividualInfoChange,
  errors,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { costView, setCostView } = useCostView();function handleSalaryChange(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  }

  function formatCurrency(annualSalary: number): string | number | readonly string[] | undefined {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="w-full">
      {isExpanded ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="age">Age</Label>
            <InputStepper
              value={individualInfo.age}
              onChange={handleIndividualInfoChange}
              errors={errors}
            />
            {errors["Age"] && <p className="text-red-500 text-sm mt-1">{errors["Age"]}</p>}
          </div>
          <div>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={individualInfo.zipCode || ''}
              onChange={handleIndividualInfoChange}
            />
          </div>
          <div>
            <Label htmlFor="annualSalary">Annual Salary</Label>
            <Input
              id="annualSalary"
              name="annualSalary"
              value={individualInfo.annualSalary}
              onChange={handleIndividualInfoChange}
              className={errors["AnnualSalary"] ? 'border-red-500' : ''}
            />
            {errors["AnnualSalary"] && <p className="text-red-500 text-sm mt-1">{errors["AnnualSalary"]}</p>}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Label className="text-sm text-gray-500">Age</Label>
            <div className="font-medium">{individualInfo.age}</div>
          </div>
          <div className="flex items-center space-x-2">
            <Label className="text-sm text-gray-500">Zip Code</Label>
            <div className="font-medium">{individualInfo.zipCode}</div>
          </div>
          <div className="flex items-center space-x-2">
            <Label className="text-sm text-gray-500">Annual Salary</Label>
            <div className="font-medium">{individualInfo.annualSalary}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualInfoForm;