import React, { useCallback, useEffect, useState } from 'react';
import InputStepper from './ui/ageinput';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
// import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '../components/ui/select';

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const IndividualInfoForm = ({
  individualInfo = { age: 0, zipCode: '', annualSalary: 0 },
  handleIndividualInfoChange,
  handleSalaryChange,
  errors,
  costView,
  setCostView,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Expand by default on lg screens and larger
    if (window.innerWidth >= 1024) {
      setIsExpanded(true);
    }
  }, []);
  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div className="w-full">
      <div className="rounded-xl shadow-md p-6 mb-8 w-full 2xl:px-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-4/4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img 
                  src={`${process.env.PUBLIC_URL}/profile_avatar.png`}
                  alt="Avatar" 
                  className="w-8 h-8 md:w-10 md:h-10 mr-2 rounded-full"
                />
                <h3 className="text-lg font-semibold capitalize">Individual Information</h3>
              </div>
              <button className="setting-btn" onClick={toggleExpand}>
                <img 
                  src={`${process.env.PUBLIC_URL}/edit_icon.png`}
                  alt="Edit" 
                  className="w-4 h-4"
                />
              </button>
            </div>
            {isExpanded ? (
              <div className="flex justify-center items-center gap-4">
                <div className="flex flex-col items-center">
                  <Label htmlFor="age" className="block text-center mb-1 text-xs md:text-sm">Age</Label>
                  <InputStepper
                    value={individualInfo.age}
                    onChange={handleIndividualInfoChange}
                    errors={errors}
                  />
                  {errors["Age"] && <p className="text-red-500 text-sm mt-1">{errors["Age"]}</p>}
                </div>
                <div className="flex flex-col items-center">
                  <Label htmlFor="zipCode" className="block text-center mb-1 text-xs md:text-sm">Zip Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={individualInfo.zipCode || ''}
                    onChange={handleIndividualInfoChange}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <Label htmlFor="annualSalary" className="block text-center mb-1 text-xs md:text-sm">Annual Salary</Label>
                  <Input
                    id="annualSalary"
                    name="annualSalary"
                    value={formatCurrency(individualInfo.annualSalary)}
                    onChange={handleSalaryChange}
                    className={`w-full ${errors["AnnualSalary"] ? 'border-red-500' : ''}`}
                  />
                  {errors["AnnualSalary"] && <p className="text-red-500 text-sm mt-1">{errors["AnnualSalary"]}</p>}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-500 text-center">Age</div>
                  <div className="font-medium text-center">{individualInfo.age}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-500 text-center">Zip Code</div>
                  <div className="font-medium text-center">{individualInfo.zipCode}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-500 text-center">Annual Salary</div>
                  <div className="font-medium text-center">{formatCurrency(individualInfo.annualSalary)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualInfoForm;