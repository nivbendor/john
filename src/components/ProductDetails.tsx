import React, { useEffect } from 'react';
import { Product, Plan, IndividualInfo, EligibilityOption, CostView } from '../utils/insuranceTypes';
import { PRODUCT_BULLET_POINTS } from '../utils/insuranceConfig';
import { ELIGIBILITY_OPTIONS } from '../utils/insuranceTypes';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ProductDetailsProps {
  selectedProduct: Product;
  plans: Record<Product, Plan>;
  setProductPlan: (product: Product, plan: Plan) => void;
  premium: number;
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string | number }, personType: 'owner' | 'employee' | 'business') => void;
  errors: Record<string, string>;
  costView: CostView;
  recalculatePremium: (product: Product, plan: Plan) => void;
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
}) => {
  const currentPlan = plans[selectedProduct];
  const bulletPoints = PRODUCT_BULLET_POINTS[selectedProduct][currentPlan];

  useEffect(() => {
    recalculatePremium(selectedProduct, currentPlan);
  }, [selectedProduct, currentPlan, recalculatePremium]);

  const handlePlanChange = (value: string) => {
    if (value === 'Basic' || value === 'Premium') {
      setProductPlan(selectedProduct, value as Plan);
      recalculatePremium(selectedProduct, value as Plan);
    }
  };

  const handleEligibilityChange = (value: EligibilityOption) => {
    handleIndividualInfoChange({ name: 'eligibility', value }, 'owner');
  };

  return (
    <div className="product-details">
      <h2 className="text-2xl font-bold mb-4">{selectedProduct}</h2>
      <div className="mb-4">
        <Label>Plan</Label>
        <RadioGroup value={currentPlan} onValueChange={handlePlanChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Basic" id="basic" />
            <Label htmlFor="basic">Basic</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Premium" id="premium" />
            <Label htmlFor="premium">Premium</Label>
          </div>
        </RadioGroup>
      </div>
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
        <p className="text-xl font-semi">${premium.toFixed(2)} / {costView.toLowerCase()}</p>
      </div>
    </div>
  );
};

export default ProductDetails;