import React, { useEffect, useState } from 'react';
import { Product, IndividualInfo, Plan, CostView, EligibilityOption, getCostViewDisplayText } from '../utils/insuranceTypes';
import { PRODUCT_BULLET_POINTS, PRODUCT_ELIGIBILITY_OPTIONS } from '../utils/insuranceConfig';
import { hasMultiplePlans, PREMIUM_CALCULATIONS, calculatePremiumByCostView } from '../utils/insuranceUtils';
import { Dropdown } from 'react-bootstrap';

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
  const [planPremiums, setPlanPremiums] = useState<Record<Plan, number>>({ Basic: 0, Premium: 0 });

  useEffect(() => {
    const options = PRODUCT_ELIGIBILITY_OPTIONS[selectedProduct] || ['Individual'];
    setEligibilityOptions(options);

    const eligibilityPremiums = { ...initialEligibilityPremiums };
    options.forEach(option => {
      const tempInfo = { ...individualInfo, eligibility: option };
      const calculatedPremium = PREMIUM_CALCULATIONS[selectedProduct](tempInfo, currentPlan);
      eligibilityPremiums[option] = calculatePremiumByCostView(calculatedPremium, costView);
    });
    setEligibilityPremiums(eligibilityPremiums);

    if (hasMultiplePlans(selectedProduct)) {
      const planPremiums: Record<Plan, number> = { Basic: 0, Premium: 0 };
      (['Basic', 'Premium'] as Plan[]).forEach(plan => {
        const calculatedPremium = PREMIUM_CALCULATIONS[selectedProduct](individualInfo, plan);
        planPremiums[plan] = calculatePremiumByCostView(calculatedPremium, costView);
      });
      setPlanPremiums(planPremiums);
    }

    recalculatePremium(selectedProduct, currentPlan);
  }, [individualInfo, currentPlan, selectedProduct, recalculatePremium, costView]);

  const handlePlanChange = (value: string | null) => {
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

  const costPerHour = premium / 40;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{selectedProduct}</h2>
        <div className="flex items-center space-x-4">
          {hasMultiplePlans(selectedProduct) && (
            <Dropdown onSelect={handlePlanChange}>
              <Dropdown.Toggle variant="primary" id="dropdown-plan">
                {currentPlan}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {['Basic', 'Premium'].map((plan) => (
                  <Dropdown.Item key={plan} eventKey={plan} active={currentPlan === plan}>
                    <div className="flex justify-between items-center w-full">
                      <span>{plan}</span>
                      <span className="ml-4">{formatCurrency(planPremiums[plan as Plan])} / {costView.toLowerCase()}</span>
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
          {eligibilityOptions.length > 1 && (
            <Dropdown onSelect={handleEligibilityChange}>
              <Dropdown.Toggle variant="primary" id="dropdown-eligibility">
                {individualInfo.eligibility}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {eligibilityOptions.map((option) => (
                  <Dropdown.Item key={option} eventKey={option} active={option === individualInfo.eligibility}>
                    <div className="flex justify-between items-center w-full">
                      <span>{option}</span>
                      <span className="ml-4">{formatCurrency(eligibilityPremiums[option])} / {costView.toLowerCase()}</span>
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Plan Details:</h3>
        <ul className="list-disc pl-5">
          {bulletPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <div className="flex items-baseline space-x-2">
          <p className="text-lg font-semibold text-gray-700">Cost:</p>
          <p className="text-lg font-bold text-green-600">{formatCurrency(premium)}</p>
          <span className="text-sm text-gray-500">/{getCostViewDisplayText(costView)}</span>
        </div>
        <div className="flex items-baseline space-x-1 mt-2">
          <span className="font-bold">{formatCurrency(costPerHour)}</span>
          <span className="text-sm text-gray-500">/hour</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
