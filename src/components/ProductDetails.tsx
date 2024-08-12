import React, { useEffect, useState } from 'react';
import { Product, IndividualInfo, Plan, CostView, EligibilityOption, getCostViewDisplayText } from '../utils/insuranceTypes';
import { LIFE_ADD_CONFIG, PRODUCT_BULLET_POINTS, PRODUCT_ELIGIBILITY_OPTIONS } from '../utils/insuranceConfig';
import { hasMultiplePlans, PREMIUM_CALCULATIONS, calculatePremiumByCostView } from '../utils/insuranceUtils';
import { Dropdown } from 'react-bootstrap';
import { Alert, AlertDescription } from './ui/alert';
import CoverageSlider from './ui/CoverageSlider';
import '../styles/premiumview.css'; // Import the CSS file


interface ProductDetailsProps {
  plans: Record<Product, Plan>;
  selectedProduct: Product;
  premium: number;
  costView: CostView;
  individualInfo: IndividualInfo;
  setProductPlan: (product: Product, plan: Plan) => void;
  handleIndividualInfoChange: (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string | number }) => void;
  errors: Record<string, string>;
  recalculatePremium: (product: Product, plan: Plan) => void;
  activeProducts: Record<Product, boolean>;
}

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
  const secondaryCost = premium * 0.1; // Example calculation: 10% of the primary premium
  const [eligibilityPremiums, setEligibilityPremiums] = useState<Record<EligibilityOption, number>>({
    Individual: 0,
    'Individual + Spouse': 0,
    'Individual + Children': 0,
    Family: 0,
  });
  const [planPremiums, setPlanPremiums] = useState<Record<Plan, number>>({ Basic: 0, Premium: 0 });

  useEffect(() => {
    const options = PRODUCT_ELIGIBILITY_OPTIONS[selectedProduct] || ['Individual'];
    setEligibilityOptions(options);

    const eligibilityPremiums = { Individual: 0, 'Individual + Spouse': 0, 'Individual + Children': 0, Family: 0 };
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

  const handleCoverageChange = (employee: number, spouse: number) => {
    // Calculate the maximum allowed spouse coverage based on the employee coverage
    const maxSpouseCoverage = Math.min(
      employee * LIFE_ADD_CONFIG.max_coverage_amount_spouse_conditional,
      LIFE_ADD_CONFIG.max_coverage_amount_spouse
    );
  
    // Constrain the spouse coverage to ensure it doesn't exceed the maximum allowed value
    const constrainedSpouseCoverage = Math.min(spouse, maxSpouseCoverage);
  
    console.log('Coverage Change Triggered:', { employee, constrainedSpouseCoverage });
  
    // Update the state with constrained values
    handleIndividualInfoChange({ name: 'employeeCoverage', value: employee });
    handleIndividualInfoChange({ name: 'spouseCoverage', value: constrainedSpouseCoverage });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  
  return (
    <div className="space-y-4">
  <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
    <h2 className="text-2xl font-bold">{selectedProduct}</h2>
    <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4">
      {selectedProduct === 'Life / AD&D' && (
        <div className="w-full lg:w-auto">
          <CoverageSlider
            individualInfo={individualInfo}
            onCoverageChange={handleCoverageChange}
          />
        </div>
      )}
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

  {selectedProduct === 'Life / AD&D' && (errors.employeeCoverage || errors.spouseCoverage) && (
    <Alert variant="destructive">
      <AlertDescription>
        {errors.employeeCoverage && <div>{errors.employeeCoverage}</div>}
        {errors.spouseCoverage && <div>{errors.spouseCoverage}</div>}
      </AlertDescription>
    </Alert>
  )}

  <div className="bg-gray-100 p-4 rounded-md shadow-md">
    <div className="flex items-baseline space-x-2">
      <p className="text-lg font-semibold text-gray-700">Cost:</p>
      <p className="price">{formatCurrency(premium)}</p>
      <span className="text-sm text-gray-500">/{getCostViewDisplayText(costView)}</span>
    </div>
    {/* <div className="small">
    <span>{formatCurrency(secondaryCost)} /hour </span>
  </div> */}
  </div>
</div>

  );
};

export default ProductDetails;