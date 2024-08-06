import React, { useState, useEffect, useRef } from 'react';
import { Product, Plan, IndividualInfo, CostView, getCostViewDisplayText, EligibilityOption } from '../utils/insuranceTypes';
import { PRODUCT_BULLET_POINTS } from '../utils/insuranceConfig';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { hasMultiplePlans } from '../utils/insuranceUtils';
import CustomBadge from './ui/CustomBadge';
import { cn } from '../utils/insuranceUtils';

interface ProductDetailsProps {
  selectedProduct: Product;
  plans: Record<Product, Plan>;
  setProductPlan: (product: Product, plan: Plan) => void;
  premium: number;
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string | number }) => void;
  errors: Record<string, string>;
  costView: CostView;
  recalculatePremium: (product: Product, plan: Plan) => void;
  activeProducts: Record<Product, boolean>;
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
  activeProducts,
}) => {
  const [isMoreDetailsOpen, setIsMoreDetailsOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState("Individual");
  const currentPlan = plans[selectedProduct];
  const bulletPoints = PRODUCT_BULLET_POINTS[selectedProduct][currentPlan];
  const previousAnnualSalary = useRef(individualInfo.Individual.annualSalary);
  const previousPlan = useRef(currentPlan);

  useEffect(() => {
    if (selectedProduct === 'LTD') {
      if (previousAnnualSalary.current !== individualInfo.Individual.annualSalary || previousPlan.current !== currentPlan) {
        recalculatePremium(selectedProduct, currentPlan);
        previousAnnualSalary.current = individualInfo.Individual.annualSalary;
        previousPlan.current = currentPlan;
      }
    } else {
      recalculatePremium(selectedProduct, currentPlan);
    }
  }, [individualInfo, selectedProduct, currentPlan, recalculatePremium]);

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
    handleIndividualInfoChange({ name, value: parsedValue });
  };

  // const renderCoverageFields = (persona: 'owner' | 'employee') => (
  //   <div className="space-y-4">
  //     <div>
  //       <Label htmlFor={`${persona}-employeeCoverage`}>Individual Coverage</Label>
  //       <Input
  //         id={`${persona}-employeeCoverage`}
  //         name="employeeCoverage"
  //         value={formatCurrency(individualInfo[persona].employeeCoverage)}
  //         onChange={(e) => handleInputChange(e, persona)}
  //         className={errors[`${persona}EmployeeCoverage`] ? 'border-red-500' : ''}
  //       />
  //       {errors[`${persona}EmployeeCoverage`] && <p className="text-red-500 text-sm mt-1">{errors[`${persona}EmployeeCoverage`]}</p>}
  //       <p className="text-sm text-gray-500 mt-1">The amount of life insurance coverage for the individual.</p>
  //     </div>
  //     <div>
  //       <Label htmlFor={`${persona}-spouseCoverage`}>Spouse Coverage</Label>
  //       <Input
  //         id={`${persona}-spouseCoverage`}
  //         name="spouseCoverage"
  //         value={formatCurrency(individualInfo[persona].spouseCoverage)}
  //         onChange={(e) => handleInputChange(e, persona)}
  //         className={errors[`${persona}SpouseCoverage`] ? 'border-red-500' : ''}
  //       />
  //       {errors[`${persona}SpouseCoverage`] && <p className="text-red-500 text-sm mt-1">{errors[`${persona}SpouseCoverage`]}</p>}
  //       <p className="text-sm text-gray-500 mt-1">The amount of life insurance coverage for the spouse, if applicable.</p>
  //     </div>
  //   </div>
  // );

  return (
    <Card className="mb-4 p-4">
      <div className="product-details text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{selectedProduct}</h2>
        </div>
        <div className="flex justify-center items-center mb-4">
        <div className="flex items-center space-x-2 mr-2">

            <CustomBadge className={cn(
              activeProducts[selectedProduct] 
                ? "bg-blue-100 text-blue-800" 
                : "bg-gray-100 text-gray-800"
            )}>
              Owner: {individualInfo.Individual.eligibility}
            </CustomBadge>
            <CustomBadge className={cn(
              activeProducts[selectedProduct] && individualInfo.businessEmployees > 0
                ? "bg-blue-100 text-blue-800" 
                : "bg-gray-100 text-gray-800"
            )}>
              Employee: {individualInfo.Individual.eligibility}
            </CustomBadge>
          </div>
          {/* <div>
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
        </div> */}
        
          {hasMultiplePlans(selectedProduct) && (
            <Select value={currentPlan} onValueChange={handlePlanChange}>
              <SelectTrigger className="dp-30 w-32">
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="mb-4 text-left">
  <h3 className="text-lg font-semibold">Features:</h3>
  <ul className="list-disc pl-5">
    {bulletPoints.map((point, index) => (
      <li key={index}>{point}</li>
    ))}
  </ul>
</div>

        <div className="mb-4 flex items-center gap-2">
          <h3 className="text-lg font-semibold">Avg. Cost Per Individual:</h3>
          <p className="text-xl font-semibold">
            ${premium.toFixed(2)}
            <span className="text-sm ml-1">/ {getCostViewDisplayText(costView)}</span>
          </p>
        </div>
        {selectedProduct === 'Life / AD&D' && (
          <>
            <button
              onClick={() => setIsMoreDetailsOpen(!isMoreDetailsOpen)}
              className="mb-2 flex justify-center"
            >
              {isMoreDetailsOpen ? 'Less Details' : 'More Details'}
            </button>
            {isMoreDetailsOpen && (
              <div className="product-tabs product-selector">
                <ul className="product-tabs-list flex justify-center">
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
                {/* <div className="product-details">
                  {renderCoverageFields(selectedPersona)}
                </div> */}
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default ProductDetails;
