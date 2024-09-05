import React from 'react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

interface IndividualInfo {
  age: number;
  zipCode: string;
  annualSalary: number;
}

type CostView = 'Monthly' | 'Semi-Monthly' | 'Bi-Weekly' | 'Weekly';

interface IndividualInfoFormProps {
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: number | string }) => void;
  handleSalaryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
  costView: CostView;
  setCostView: (value: CostView) => void;
}

const IndividualInfoForm: React.FC<IndividualInfoFormProps> = ({
  individualInfo,
  handleIndividualInfoChange,
  handleSalaryChange,
  errors,
  costView,
  setCostView
}) => {
  const ageOptions = Array.from({ length: 100 }, (_, i) => i + 1);
  const costViewOptions: CostView[] = ['Monthly', 'Semi-Monthly', 'Bi-Weekly', 'Weekly'];

  return (
    <div className="w-full bg-white">
      {/* Blue wavy borders */}
      <div className="h-2 bg-blue-500 rounded-b-full"></div>
      
      <div className="px-4 py-1">
        <h3 className="text-xl font-semibold mb-3 text-center">Individual Information</h3>
  
        {/* Form Fields */}
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0">
          
          {/* Avatar (only on large screens) */}
          <div className="hidden lg:block lg:mr-4">
            <img
                  src={`${process.env.PUBLIC_URL}/profile_avatar.png`}
                  alt="Profile Avatar"
              className="w-16 h-16 rounded-full"
            />
          </div>
  
          {/* Age Field */}
          <div className="flex flex-col items-center flex-1 pr-2">
            <Label htmlFor="age" className="pr-2 text-sm font-normal text-gray-600">
              Age
            </Label>
            <Select
              value={individualInfo.age.toString()}
              onValueChange={(value) =>
                handleIndividualInfoChange({
                  target: { name: 'age', value: parseInt(value) },
                } as any)
              }
            >
              <SelectTrigger className="w-24 h-10 bg-white rounded-lg border border-gray-300 text-center">
                <SelectValue>{individualInfo.age}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {ageOptions.map((age) => (
                  <SelectItem key={age} value={age.toString()}>
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
  
          <div className="w-px h-10 bg-gray-300"></div>
  
          {/* Zip Code Field */}
          <div className="flex flex-col items-center flex-1 pr-2 pl-1">
            <Label htmlFor="zipCode" className="text-sm font-normal text-gray-600">
              Zip Code
            </Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={individualInfo.zipCode}
              onChange={handleIndividualInfoChange}
              className="w-24 h-10 bg-white-100 rounded-lg border-0 text-center"
            />
          </div>
  
          <div className="w-px h-10 bg-gray-300"></div>
  
          {/* Annual Salary Field */}
          <div className="flex flex-col items-center flex-1 pr-2 pl-1">
            <Label htmlFor="annualSalary" className="text-lg font-normal text-gray-600">
              Annual Salary
            </Label>
            <Input
              id="annualSalary"
              name="annualSalary"
              value={formatCurrency(individualInfo.annualSalary)}
              onChange={handleSalaryChange}
              className={`w-24 h-10 bg-white-100 rounded-lg border-0 text-center ${
                errors['AnnualSalary'] ? 'border-red-500' : ''
              }`}
            />
          </div>
        </div>
  
        {/* Cost View for Large Screens */}
        <div className="hidden lg:flex items-center justify-end lg:space-x-4 lg:mt-0 lg:ml-4">
          <Label htmlFor="costView" className="text-sm font-normal text-gray-600">
            Cost View
          </Label>
          <Select className="w-28" value={costView} onValueChange={setCostView}>
            <SelectTrigger>
              <SelectValue>{costView}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {costViewOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
  
        {/* Cost View for Small Screens */}
        <div className="flex lg:hidden items-center justify-center space-x-4 mt-2">
          <Label htmlFor="costView" className="text-sm font-normal text-gray-600">
            Cost View
          </Label>
          <Select className="w-28" value={costView} onValueChange={setCostView}>
            <SelectTrigger>
              <SelectValue>{costView}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {costViewOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
  
      {/* Blue wavy borders */}
      <div className="h-2 bg-blue-500 rounded-t-full"></div>
    </div>
  );
  
};

export default IndividualInfoForm;