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
      <h1 className="text-2xl font-semibold mb-3 text-center">Get Started</h1>
  
      {/* Blue wavy borders */}
      <div className="h-1 bg-blue-500 rounded-b-full"></div>
      
      <div className="py-2 pl-0.5">
        <h3 className="text-lg font-semibold mb-4 text-left">Individual Information</h3>
        
        {/* Form Fields */}
        <div className="flex flex-col space-y-4">
          
          {/* Mobile layout */}
<div className="lg:hidden">
  {/* First row: Age, Zip Code, Annual Salary */}
  <div className="flex justify-between items-end mb-2">
    {/* Age Field */}
    <div className="flex flex-col items-center w-1/3">
      <Label htmlFor="age" className="text-sm font-normal text-gray-600 mb-1">
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
        <SelectTrigger className="w-full h-10 bg-white rounded-lg border border-gray-300 text-center px-2">
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

    {/* Zip Code Field */}
    <div className="flex flex-col items-center w-1/3 px-2">
      <Label htmlFor="zipCode" className="text-sm font-normal text-gray-600 mb-1">
        Zip Code
      </Label>
      <Input
        id="zipCode"
        name="zipCode"
        value={individualInfo.zipCode}
        onChange={handleIndividualInfoChange}
        className="w-full h-10 bg-white-100 rounded-lg border border-gray-300 text-center px-2"
      />
    </div>

    {/* Annual Salary Field */}
    <div className="flex flex-col items-center w-1/3">
      <Label htmlFor="annualSalary" className="text-sm font-normal text-gray-600 mb-1">
        Annual Salary
      </Label>
      <Input
        id="annualSalary"
        name="annualSalary"
        value={formatCurrency(individualInfo.annualSalary)}
        onChange={handleSalaryChange}
        className={`w-full h-10 bg-white-100 rounded-lg border border-gray-300 text-center px-2 ${
          errors['AnnualSalary'] ? 'border-red-500' : ''
        }`}
      />
    </div>
  </div>

  {/* Second row: Divider line */}
  <div className="w-full h-px bg-gray-300 my-3"></div>

  {/* Third row: Cost View */}
  <div className="flex flex-row items-center justify-center mt-2">
    <Label htmlFor="costView" className="text-sm font-normal text-gray-600 mb-1">
      Cost View
    </Label>
    <Select className="w-3/4" value={costView} onValueChange={setCostView}>
      <SelectTrigger className="justify-center">
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
  
          {/* Desktop layout (unchanged) */}
          <div className="hidden lg:flex lg:items-center lg:space-y-0">
            {/* ... (keep the existing desktop layout code here) ... */}
          </div>
        </div>
      </div>
  
      {/* Blue wavy borders */}
      <div className="h-1 bg-blue-500 rounded-t-full"></div>
    </div>
  );
};

export default IndividualInfoForm;