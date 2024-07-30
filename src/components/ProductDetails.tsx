import React, { useState, useEffect, useRef } from 'react';
import { Product, Plan, IndividualInfo, CostView } from '../utils/insuranceTypes';
import { PRODUCT_BULLET_POINTS } from '../utils/insuranceConfig';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
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
  const [selectedPersona, setSelectedPersona] = useState<'owner' | 'employee'>(personType);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, persona: 'owner' | 'employee') => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    handleIndividualInfoChange({ name, value: parsedValue }, persona);
  };

  const renderCoverageFields = (persona: 'owner' | 'employee') => (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${persona}-employeeCoverage`}>Individual Coverage</Label>
        <Input
          id={`${persona}-employeeCoverage`}
          name="employeeCoverage"
          value={formatCurrency(individualInfo[persona].employeeCoverage)}
          onChange={(e) => handleInputChange(e, persona)}
          className={errors[`${persona}EmployeeCoverage`] ? 'border-red-500' : ''}
        />
        {errors[`${persona}EmployeeCoverage`] && <p className="text-red-500 text-sm mt-1">{errors[`${persona}EmployeeCoverage`]}</p>}
        <p className="text-sm text-gray-500 mt-1">The amount of life insurance coverage for the individual.</p>
      </div>
      <div>
        <Label htmlFor={`${persona}-spouseCoverage`}>Spouse Coverage</Label>
        <Input
          id={`${persona}-spouseCoverage`}
          name="spouseCoverage"
          value={formatCurrency(individualInfo[persona].spouseCoverage)}
          onChange={(e) => handleInputChange(e, persona)}
          className={errors[`${persona}SpouseCoverage`] ? 'border-red-500' : ''}
        />
        {errors[`${persona}SpouseCoverage`] && <p className="text-red-500 text-sm mt-1">{errors[`${persona}SpouseCoverage`]}</p>}
        <p className="text-sm text-gray-500 mt-1">The amount of life insurance coverage for the spouse, if applicable.</p>
      </div>
    </div>
  );

  return (
    <Card className="mb-4 p-4">
      <div className="product-details">
        <h2 className="text-2xl font-bold mb-4">{selectedProduct}</h2>
        {hasMultiplePlans(selectedProduct) && (
          <div className="mb-4">
            <Label>Plan</Label>
            <RadioGroup value={currentPlan} onValueChange={handlePlanChange}>
              <RadioGroupItem value="Basic">Basic</RadioGroupItem>
              <RadioGroupItem value="Premium">Premium</RadioGroupItem>
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
            <button
              onClick={() => setIsMoreDetailsOpen(!isMoreDetailsOpen)}
              className="mb-2"
            >
              {isMoreDetailsOpen ? 'Less Details' : 'More Details'}
            </button>
            {isMoreDetailsOpen && (
              <div className="product-tabs product-selector">
                <ul className="product-tabs-list">
                  <li 
                    className={`product-tab-item ${selectedPersona === 'owner' ? 'active' : ''}`}
                    onClick={() => setSelectedPersona('owner')}
                  >
                    <a href="#" className="product-tab-link">Owner</a>
                  </li>
                  <li 
                    className={`product-tab-item ${selectedPersona === 'employee' ? 'active' : ''}`}
                    onClick={() => setSelectedPersona('employee')}
                  >
                    <a href="#" className="product-tab-link">Employee</a>
                  </li>
                </ul>
                <div className="product-details">
                  {renderCoverageFields(selectedPersona)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default ProductDetails;