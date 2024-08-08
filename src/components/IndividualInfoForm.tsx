import React from 'react';
import { IndividualInfo } from '../utils/insuranceTypes';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import InputStepper from './ui/ageinput';

interface IndividualInfoFormProps {
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string | number },
  ) => void;
  errors: Record<string, string>;
}

const IndividualInfoForm: React.FC<IndividualInfoFormProps> = ({
  individualInfo,
  handleIndividualInfoChange,
  errors,
}) => {
  const formatCurrency = (value: number) => {
    const limitedValue = Math.min(value, 999999);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(limitedValue);
  };
  const parseCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9.-]+/g, "");
    return parseFloat(numericValue);
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = parseCurrency(rawValue);
    if (!isNaN(numericValue)) {
      const limitedValue = Math.min(numericValue, 999999);
      handleIndividualInfoChange({ name: 'annualSalary', value: limitedValue });
    }
  };

  return (
    <Card className="mb-4 p-4">
      <h3 className="text-lg font-semibold capitalize mb-4">Individual Information</h3>
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
            value={formatCurrency(individualInfo.annualSalary)}
            onChange={handleSalaryChange}
            className={errors["AnnualSalary"] ? 'border-red-500' : ''}
          />
          {errors["AnnualSalary"] && <p className="text-red-500 text-sm mt-1">{errors["AnnualSalary"]}</p>}
        </div>
      </div>
    </Card>
  );
};

export default IndividualInfoForm;