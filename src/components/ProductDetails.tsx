import React, { useEffect, useState } from 'react';
import { Product, IndividualInfo, Plan, CostView, EligibilityOption, getCostViewDisplayText } from '../utils/insuranceTypes';
import { PRODUCT_BULLET_POINTS, PRODUCT_ELIGIBILITY_OPTIONS } from '../utils/insuranceConfig';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { hasMultiplePlans, PREMIUM_CALCULATIONS, calculatePremiumByCostView } from '../utils/insuranceUtils';
import { SplitButton, Dropdown } from 'react-bootstrap';

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

const initialEligibilityPremiums: Record<EligibilityOption, number> = {
  'Individual': 0,
  'Individual + Spouse': 0,
  'Individual + Children': 0,
  'Family': 0
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  plans,
  selectedProduct,
  premium,
  costView,
  individualInfo,
  setProductPlan,
  handleIndividualInfoChange,
  errors,
  recalculatePremium,
  activeProducts,
}) => {
  const currentPlan = plans[selectedProduct];
  const bulletPoints = PRODUCT_BULLET_POINTS[selectedProduct][currentPlan];
  const [eligibilityOptions, setEligibilityOptions] = useState<EligibilityOption[]>([]);
  const [eligibilityPremiums, setEligibilityPremiums] = useState<Record<EligibilityOption, number>>(initialEligibilityPremiums);

  useEffect(() => {
    const options = PRODUCT_ELIGIBILITY_OPTIONS[selectedProduct] || ['Individual'];
    setEligibilityOptions(options);

    const premiums = { ...initialEligibilityPremiums };
    options.forEach(option => {
      const tempInfo = { ...individualInfo, eligibility: option };
      const calculatedPremium = PREMIUM_CALCULATIONS[selectedProduct](tempInfo, currentPlan);
      premiums[option] = calculatePremiumByCostView(calculatedPremium, costView);
    });
    setEligibilityPremiums(premiums);

    recalculatePremium(selectedProduct, currentPlan);
  }, [individualInfo, currentPlan, selectedProduct, recalculatePremium, costView]);

  const handlePlanChange = (value: string) => {
    if (value === 'Basic' || value === 'Premium') {
      setProductPlan(selectedProduct, value as Plan);
      recalculatePremium(selectedProduct, value as Plan);
    }
  };

  const handleEligibilityChange = (eventKey: string | null) => {
    if (eventKey) {
      handleIndividualInfoChange({ name: 'eligibility', value: eventKey });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
      <div className='text-center'>{hasMultiplePlans(selectedProduct) && (
          <Select value={currentPlan} onValueChange={handlePlanChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Basic">Basic</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
            </SelectContent>
          </Select>
        )}
        </div>
        
        <h2 className="text-2xl font-bold text-xl">{selectedProduct}</h2>
        
        {eligibilityOptions.length > 1 && (
  <SplitButton
    id={`dropdown-split-variants-eligibility`}
    variant="primary"
    title={individualInfo.eligibility}
    onSelect={handleEligibilityChange}
    drop="start" // This makes the dropdown open to the left
  >
    {eligibilityOptions.map((option) => (
      <Dropdown.Item 
        key={option} 
        eventKey={option} 
        active={option === individualInfo.eligibility}
      >
        <div className="flex justify-between items-center w-full">
          <span>{option}</span>
          <span className="ml-4">{formatCurrency(eligibilityPremiums[option])} / {costView.toLowerCase()}</span>
        </div>
      </Dropdown.Item>
    ))}
  </SplitButton>
        )}
      </div>

        
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Plan Details:</h3>
        <ul className="list-disc pl-5">
          {bulletPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))} 
        </ul>
      </div>
      <div className="flex items-baseline space-x-1">
        <p className="text-lg font-semibold">Cost:</p>
        <p className="text-lg font-bold">{formatCurrency(premium)}</p>
        <span className="text-xs">/ {getCostViewDisplayText(costView)}</span>
        
      </div>
    </div>
  );
};

export default ProductDetails;