import React from 'react';
import { IndividualInfo, EligibilityOption } from '../utils/insuranceTypes';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';

interface IndividualInfoFormProps {
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string | number },
    personType: 'owner' | 'employee' | 'business'
  ) => void;
  errors: Record<string, string>;
  activeTab: 'business' | 'owner' | 'employees';
}

interface PersonInfoFormProps {
  personType: 'owner' | 'employee';
  personInfo: IndividualInfo['owner'] | IndividualInfo['employee'];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string | number }, personType: 'owner' | 'employee') => void;
  errors: Record<string, string>;
}

const PersonInfoForm: React.FC<PersonInfoFormProps> = ({ personType, personInfo, handleChange, errors }) => {
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

    handleChange({ name, value: parsedValue }, personType);
  };

  return (
    <Card className="mb-4 p-4">
      <h3 className="text-lg font-semibold capitalize mb-4">{personType} Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor={`${personType}-age`}>Age</Label>
          <Input
            id={`${personType}-age`}
            name="age"
            value={personInfo.age}
            onChange={handleInputChange}
            className={errors[`${personType}Age`] ? 'border-red-500' : ''}
          />
          {errors[`${personType}Age`] && <p className="text-red-500 text-sm mt-1">{errors[`${personType}Age`]}</p>}
        </div>
        <div>
          <Label htmlFor={`${personType}-annualSalary`}>Annual Salary</Label>
          <Input
            id={`${personType}-annualSalary`}
            name="annualSalary"
            value={formatCurrency(personInfo.annualSalary)}
            onChange={handleInputChange}
            className={errors[`${personType}AnnualSalary`] ? 'border-red-500' : ''}
          />
          {errors[`${personType}AnnualSalary`] && <p className="text-red-500 text-sm mt-1">{errors[`${personType}AnnualSalary`]}</p>}
        </div>
        <div>
          <Label htmlFor={`${personType}-eligibility`}>Eligibility</Label>
          <Select
            value={personInfo.eligibility}
            onValueChange={(value: EligibilityOption) => handleChange({ name: 'eligibility', value }, personType)}
          >
            <SelectTrigger id={`${personType}-eligibility`}>
              <SelectValue>{personInfo.eligibility}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'].map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      {activeTab === 'business' && (
        <Card className="mb-4 p-4">
          <h3 className="text-lg font-semibold mb-4">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div>
              <Label htmlFor="businessZipCode">Business Zip Code</Label>
              <Input
                id="businessZipCode"
                name="businessZipCode"
                value={individualInfo.businessZipCode || ''}
                onChange={(e) => handleIndividualInfoChange(e, 'business')}
              />
            </div>
            <div>
              <Label htmlFor="businessEmployees">Number of Employees</Label>
              <Input
                id="businessEmployees"
                name="businessEmployees"
                type="number"
                min={0}
                max={10}
                value={individualInfo.businessEmployees}
                onChange={(e) => handleIndividualInfoChange(e, 'business')}
              />
            </div>
          </div>
        </Card>
      )}
      {activeTab === 'owner' && (
        <PersonInfoForm
          personType="owner"
          personInfo={individualInfo.owner}
          handleChange={handleIndividualInfoChange}
          errors={errors}
        />
      )}
      {activeTab === 'employees' && (
        <PersonInfoForm
          personType="employee"
          personInfo={individualInfo.employee}
          handleChange={handleIndividualInfoChange}
          errors={errors}
        />
      )}
    </div>
  );
};

export default IndividualInfoForm;