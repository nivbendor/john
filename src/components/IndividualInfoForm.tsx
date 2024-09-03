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
        <h3 className="text-xl font-semibold mb-2 text-center">Individual Information</h3>
        <div className="flex flex-col space-y-4">
        <div className="flex justify-around items-center">
            <div className="flex flex-col items-center flex-1">
              <Label htmlFor="age" className="mb-2 text-sm font-normal text-gray-600">Age</Label>
              <Select
                value={individualInfo.age.toString()}
                onValueChange={(value) => handleIndividualInfoChange({ name: 'age', value: parseInt(value) })}
              >
                <SelectTrigger className="w-24 h-10 bg-white rounded-lg border border-gray-300 text-center">
                  <SelectValue>{individualInfo.age}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {ageOptions.map((age) => (
                    <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-px h-10 bg-gray-300"></div>
              <div className="flex flex-col items-center flex-1">
                <Label htmlFor="zipCode" className="mb-2 text-sm font-normal text-gray-600">Zip Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={individualInfo.zipCode}
                  onChange={handleIndividualInfoChange}
                  className="w-24 h-10 bg-white-100 rounded-lg border-0 text-center"
                />
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div className="flex flex-col items-center flex-1">
                <Label htmlFor="annualSalary" className="mb-2 text-lg font-normal text-gray-600">Annual Salary</Label>
                <Input
                  id="annualSalary"
                  name="annualSalary"
                  value={formatCurrency(individualInfo.annualSalary)}
                  onChange={handleSalaryChange}
                  className={`w-28 h-10 bg-white-100 rounded-lg border-0 text-center ${errors["AnnualSalary"] ? 'border-red-500' : ''}`}
                />
              </div>
          </div>
          <div className="flex items-center justify-center space-x-1 -mt-1">

          <Label htmlFor="costView" className="text-sm font-normal text-gray-600">Cost View</Label>
          <Select value={costView} onValueChange={setCostView}>
            <SelectTrigger className="w-28 h-10 bg-white rounded-lg border border-gray-300 text-center">
              <SelectValue>{costView}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {costViewOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        </div>
      </div>

      {/* Blue wavy borders */}
      <div className="h-2 bg-blue-500 rounded-t-full"></div>
    </div>
  );
};

export default IndividualInfoForm;