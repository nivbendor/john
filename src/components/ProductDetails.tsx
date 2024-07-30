import React, { useState, useEffect, useRef } from 'react';
import { Product, Plan, IndividualInfo, EligibilityOption, CostView } from '../utils/insuranceTypes';
import { PRODUCT_BULLET_POINTS } from '../utils/insuranceConfig';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import Button from './ui/button'; 
import { Card } from './ui/card';
import { hasMultiplePlans } from '../utils/insuranceUtils';

interface ProductDetailsProps {
  selectedProduct: Product;
  plans: Record<Product, Plan>;
  setProductPlan: (product: Product, plan: Plan) => void;
  premium: number;
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string | number }, personType: 'owner' | 'employee' | 'business') => void;
  errors: Record<string, string>;
  costView: CostView;
  recalculatePremium: (product: Product, plan: Plan) => void;
  personType: 'owner' | 'employee';
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  selectedProduct,
  plans,
  setProductPlan,
  recalculatePremium,
  premium,
  individualInfo,
  handleIndividualInfoChange,
  errors,
  costView,
  personType,
}) => {
  const [isMoreDetailsOpen, setIsMoreDetailsOpen] = useState(false);
  const currentPlan = plans[selectedProduct];
  const bulletPoints = PRODUCT_BULLET_POINTS[selectedProduct][currentPlan];
  const previousAnnualSalary = useRef(individualInfo[personType].annualSalary);
  const previousPlan = useRef(currentPlan);

  useEffect(() => {
    if (selectedProduct === 'LTD') {
      if (previousAnnualSalary.current !== individualInfo[personType].annualSalary || previousPlan.current !== currentPlan) {
        recalculatePremium(selectedProduct, currentPlan);
        previousAnnualSalary.current = individualInfo[personType].annualSalary;
        previousPlan.current = currentPlan;
      }
    } else {
      recalculatePremium(selectedProduct, currentPlan);
    }
  }, [individualInfo, selectedProduct, currentPlan, recalculatePremium, personType]);

  const handlePlanChange = (value: string) => {
    if (value === 'Basic' || value === 'Premium') {
      setProductPlan(selectedProduct, value as Plan);
      recalculatePremium(selectedProduct, value as Plan);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    handleIndividualInfoChange({ name, value: parsedValue }, personType);
  };

  return (
    <div className="product-details">
      <h2 className="text-2xl font-bold mb-4">{selectedProduct}</h2>
      {hasMultiplePlans(selectedProduct) && (
        <div className="mb-4">
          <Label>Plan</Label>
          <RadioGroup value={currentPlan} onValueChange={handlePlanChange}>
            <div className="flex space-x-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Basic" id="basic" />
                <Label htmlFor="basic">Basic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Premium" id="premium" />
                <Label htmlFor="premium">Premium</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Features:</h3>
        <ul className="list-disc pl-5">
          {bulletPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Cost:</h3>
        <p className="text-xl font-semibold">${premium.toFixed(2)} / {costView.toLowerCase()}</p>
      </div>
      {selectedProduct === 'Life / AD&D' && (
        <>
          <Button
            onClick={() => setIsMoreDetailsOpen(!isMoreDetailsOpen)}
            className="mb-2"
          >
            {isMoreDetailsOpen ? 'Less Details' : 'More Details'}
          </Button>
          {isMoreDetailsOpen && (
            <Card className="p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`${personType}-employeeCoverage`}>Individual Coverage</Label>
                  <Input
                    id={`${personType}-employeeCoverage`}
                    name="employeeCoverage"
                    value={formatCurrency(individualInfo[personType].employeeCoverage)}
                    onChange={handleInputChange}
                    className={errors[`${personType}EmployeeCoverage`] ? 'border-red-500' : ''}
                  />
                  {errors[`${personType}EmployeeCoverage`] && <p className="text-red-500 text-sm mt-1">{errors[`${personType}EmployeeCoverage`]}</p>}
                  <p className="text-sm text-gray-500 mt-1">The amount of life insurance coverage for the individual.</p>
                </div>
                <div>
                  <Label htmlFor={`${personType}-spouseCoverage`}>Spouse Coverage</Label>
                  <Input
                    id={`${personType}-spouseCoverage`}
                    name="spouseCoverage"
                    value={formatCurrency(individualInfo[personType].spouseCoverage)}
                    onChange={handleInputChange}
                    className={errors[`${personType}SpouseCoverage`] ? 'border-red-500' : ''}
                  />
                  {errors[`${personType}SpouseCoverage`] && <p className="text-red-500 text-sm mt-1">{errors[`${personType}SpouseCoverage`]}</p>}
                  <p className="text-sm text-gray-500 mt-1">The amount of life insurance coverage for the spouse, if applicable.</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Tip: A common rule of thumb is to have life insurance coverage equal to 10-15 times your annual salary.
              </p>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetails;