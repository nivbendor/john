import React from 'react';
import { IndividualInfo } from '../utils/insuranceTypes';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';

interface IndividualInfoFormProps {
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string | number },
  ) => void;
  errors: Record<string, string>;
  activeTab: 'business' | 'owner' | 'employees';
}

interface PersonInfoFormProps {
  personInfo: IndividualInfo['owner'] | IndividualInfo['employee'];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string | number }) => void;
  errors: Record<string, string>;
}

const PersonInfoForm: React.FC<PersonInfoFormProps> = ({ personInfo, handleChange, errors }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;

    if (name === 'age') {
      parsedValue = parseInt(value) || 0;
    } else if (name === 'annualSalary') {
      parsedValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    }

    handleChange({ name, value: parsedValue });
  };

  return (
    <Card className="mb-4 p-4">
      <h3 className="text-lg font-semibold capitalize mb-4">Individual Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            value={personInfo.age}
            onChange={handleInputChange}
            className={errors["Age"] ? 'border-red-500' : ''}
          />
          {errors["Age"] && <p className="text-red-500 text-sm mt-1">{errors["Age"]}</p>}
        </div>
        <div>
          <Label htmlFor= "Annual Salary">Annual Salary</Label>
          <Input
            id="annualSalary"
            name="annualSalary"
            value={formatCurrency(personInfo.annualSalary)}
            onChange={handleInputChange}
            className={errors["AnnualSalary"] ? 'border-red-500' : ''}
          />
          {errors["AnnualSalary"] && <p className="text-red-500 text-sm mt-1">{errors["AnnualSalary"]}</p>}
        </div>

      </div>
    </Card>
  );
};

const IndividualInfoForm: React.FC<IndividualInfoFormProps> = ({
  individualInfo,
  handleIndividualInfoChange,
  errors,
  activeTab,
}) => { 
  return (
    <div>
        <Card className="mb-4 p-4">
          <h3 className="text-lg font-semibold mb-4">Individual Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div>
              <Label htmlFor="businessZipCode"> Zip Code</Label>
              <Input
                id="businessZipCode"
                name="businessZipCode"
                value={individualInfo.businessZipCode || ''}
                onChange={(e) => handleIndividualInfoChange(e)}
              />
            </div>
           </div>
        </Card>
      
      
        <PersonInfoForm
          personInfo={individualInfo.owner}
          handleChange={handleIndividualInfoChange}
          errors={errors}
        />
      
    </div>
  );
};

export default IndividualInfoForm;