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
  const ageOptions = Array.from({ length: 100 }, (_, i) => i); // Create age options from 1 to 100
  const costViewOptions: CostView[] = ['Monthly', 'Semi-Monthly', 'Bi-Weekly', 'Weekly'];
 
  // Function to display the age field, showing a dash if age is 0 (unset)
  const displayAge = () => {
    if (individualInfo.age === 0) {
      return '-'; // Display dash if age is unset
    }
    return individualInfo.age.toString(); // Display the actual age if set
  };

  return (
    <div className="w-full bg-white">
      <h1 className="text-2xl font-semibold mb-3 text-center">Get Started</h1>
  
      {/* Blue wavy borders */}
      <div className="h-1 bg-blue-500 rounded-b-full"></div>
      
      <div className="py-2 pl-0.5">
        <h3 className="text-lg font-semibold mb-1 text-left">Individual Information</h3>
        
        {/* Form Fields */}
        <div className="flex flex-col space-y-4">
          
          {/* Mobile layout */}
<div className="lg:hidden xl:hidden 2xl:hidden">
  {/* First row: Age, Zip Code, Annual Salary */}
  <div className="flex justify-between items-end mb-2">
    {/* Age Field */}
    <div className="flex flex-col items-center w-1/3 pt-2">
      <Label htmlFor="age" className="font-normal text-gray-600 mb-3">
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

    <div className="w-px h-10 bg-gray-300"></div>
    

    {/* Zip Code Field */}
    <div className="flex flex-col items-center w-1/3 px-2">
      <Label htmlFor="zipCode" className="font-normal text-gray-600 mb-1">
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
    <div className="w-px h-10 bg-gray-300"></div>

    {/* Annual Salary Field */}
    <div className="flex flex-col items-center w-1/3 px-2">
      <Label htmlFor="annualSalary" className="font-normal text-gray-600 mb-1">
        Annual Income
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
    <Label htmlFor="costView" className="font-normal text-gray-600 mb-1">
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
            <div className="hidden lg:block lg:mr-4">    
              
              <img
                  src={`${process.env.PUBLIC_URL}/profile_avatar.png`}
                  alt="Profile Avatar"
              className="w-16 h-16 rounded-full"
              />
            </div>
                          {/* Age Field */}
                      <div className="flex flex-col items-center flex-1 pr-2 pl-1" >
                        <Label htmlFor="age" className="font-normal text-gray-600 pb-2">
                          Age
                        </Label>
                        <Select
                            value={individualInfo.age !== 0 ? individualInfo.age.toString() : '-'} // Use dash if age is 0
                            onValueChange={(value) =>
                            handleIndividualInfoChange({
                              target: { name: 'age', value: parseInt(value) },
                            } as any)
                          }
                        >
                          <SelectTrigger className="w-24 h-10 bg-white rounded-lg border border-gray-300 text-center">
                            <SelectValue>{displayAge()}</SelectValue> {/* Dash or actual age */}
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
                        <Label htmlFor="zipCode" className="font-normal text-gray-600">
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
                        <Label htmlFor="annualSalary" className="font-normal text-gray-600">
                        Annual Income

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
        {/* Cost View for Large Screens */}
        <div className="flex flex-col items-center flex-1 pr-2 pl-1">
          <Label htmlFor="costView" className="font-normal text-gray-600 pb-2">
            Pay Period
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
        </div>
      </div>
  
      {/* Blue wavy borders */}
      <div className="h-1 bg-blue-500 rounded-t-full"></div>
    </div>
  );
};

export default IndividualInfoForm;