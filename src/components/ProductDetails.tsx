// src\components\ProductDetails.tsx

import React, { useEffect, useMemo, useState } from 'react';
import { Product, IndividualInfo, Plan, CostView, EligibilityOption, getCostViewDisplayText, EligibilityPerProduct, PlanRecord, LTDPlan } from '../utils/insuranceTypes';
import { LIFE_ADD_CONFIG, PRODUCT_ELIGIBILITY_OPTIONS, PRODUCT_CONTENT } from '../utils/insuranceConfig';
import { hasMultiplePlans, PREMIUM_CALCULATIONS, calculatePremiumByCostView, calculateLTDBenefit, calculateSTDBenefit, getLifeADDRate, hasUltraPlan, isLTDPlanAvailable, getLTDPlan, calculateLTDPremium, calculateLTDPremiumWrapper } from '../utils/insuranceUtils';
import { Dropdown } from 'react-bootstrap';
import { Alert, AlertDescription } from './ui/alert';
import CoverageSlider from './ui/CoverageSlider';
import '../styles/premiumview.css'; // Import the CSS file
import Tooltip from './ui/tooltip';
import { insuranceResources, getProductLabel } from './Resource';
import colors from '../styles/colors';
import { parseUrlParams } from '../utils/parseUrlParams';

// Add the useColorFromUrl hook
const useColorFromUrl = () => {
  const [color, setColor] = useState(colors.default);

  useEffect(() => {
    const updateColor = () => {
      const params = new URLSearchParams(window.location.search);
      const colorParam = params.get('color');
      if (colorParam === '1') setColor(colors.color1);
      else if (colorParam === '2') setColor(colors.color2);
      else if (colorParam === '3') setColor(colors.color3);
      else setColor(colors.default);
    };

    updateColor();

    window.addEventListener('popstate', updateColor);
    return () => window.removeEventListener('popstate', updateColor);
  }, []);

  return color;
};

const label = getProductLabel('LTD');
console.log(label); // Outputs: Long-Term Disability

function isLTDPlan(plan: string): plan is LTDPlan {
  return ['Basic', 'Premium', 'Ultra'].includes(plan);
}

interface ProductDetailsProps {
  plans: Record<Product, Plan>;
  selectedProduct: Product;
  premium: number;
  costView: CostView;
  individualInfo: IndividualInfo;
  setProductPlan: (product: Product, plan: Plan) => void;
  selectedEligibilityPerProduct: EligibilityPerProduct;
  setSelectedEligibilityPerProduct: React.Dispatch<React.SetStateAction<EligibilityPerProduct>>;
  handleIndividualInfoChange: (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string | number }) => void;
  handleSalaryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>
  recalculatePremium: (product: Product, plan: Plan) => void;
  activeProducts: Record<Product, boolean>;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  plans,
  selectedProduct,
  premium,
  costView,
  individualInfo,
  handleSalaryChange,
  setProductPlan,
  selectedEligibilityPerProduct,
  setSelectedEligibilityPerProduct,
  handleIndividualInfoChange,
  errors,
  recalculatePremium,
  activeProducts,
}) => {
  const currentPlan = plans[selectedProduct];
  const dynamicColor = useColorFromUrl();

  const SVGCheckmark = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" width="14" height="14" className="inline-block mr-2">
      <g>
        <path stroke={dynamicColor} strokeLinecap="round" strokeLinejoin="round" d="M0.75 8.5625 5.29545 13.25C7.43437 7.10579 9.2157 4.40965 13.25 0.75" strokeWidth="1"></path>
      </g>
    </svg>
  );

  const { cpValue, isKen } = useMemo(() => parseUrlParams(), []);
  const [showPlanDropdown, setShowPlanDropdown] = useState(false);
  const [availableLTDPlan, setAvailableLTDPlans] = useState<LTDPlan>('Basic');

  useEffect(() => {
    if (selectedProduct === 'LTD') {
      const availablePlans = getLTDPlan(individualInfo.annualSalary, isKen || false);
      setAvailableLTDPlans(availablePlans);
      setShowPlanDropdown(true); // Always show the dropdown for LTD if salary > 0
    } else {
      setShowPlanDropdown(false); // Hide the dropdown if not LTD
    }
  }, [individualInfo.annualSalary, selectedProduct, isKen]);



  const getLTDPlanDisplayName = (plan: LTDPlan) => {
    switch (plan) {
      case 'Basic': return 'Associate';
      case 'Premium': return 'LTD 1';
      case 'Ultra': return 'LTD 2';
      default: return plan;
    }
  };

  const calculateLTDPremiumForDisplay = (plan: LTDPlan) => {
    const monthlyPremium = calculateLTDPremium(
      { ...individualInfo, eligibility: 'Individual' },
      plan,
      isKen || false // Ensure isKen is a boolean
    );
    return calculatePremiumByCostView(monthlyPremium, costView);
  };


  const [isFocused, setIsFocused] = useState(false); // Track if input is focused

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);


  const [eligibilityOptions, setEligibilityOptions] = useState<EligibilityOption[]>([]);
  const [eligibilityPremiums, setEligibilityPremiums] = useState<Record<EligibilityOption, number>>({
    Individual: 0,
    'Individual + Spouse': 0,
    'Individual + Children': 0,
    Family: 0,
  });
  const [planPremiums, setPlanPremiums] = useState<PlanRecord<number>>({ Basic: 0, Premium: 0 });

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
      const planPremiums: PlanRecord<number> = hasUltraPlan(selectedProduct)
        ? { Basic: 0, Premium: 0, Ultra: 0 }
        : { Basic: 0, Premium: 0 };

      const plansToCalculate = hasUltraPlan(selectedProduct)
        ? ['Basic', 'Premium', 'Ultra'] as const
        : ['Basic', 'Premium'] as const;

      plansToCalculate.forEach(plan => {
        const calculatedPremium = PREMIUM_CALCULATIONS[selectedProduct](individualInfo, plan);
        planPremiums[plan] = calculatePremiumByCostView(calculatedPremium, costView);
      });

      setPlanPremiums(planPremiums as PlanRecord<number>);
    }

    recalculatePremium(selectedProduct, currentPlan);
  }, [individualInfo, currentPlan, selectedProduct, recalculatePremium, costView]);

  const handlePlanChange = (value: string | null) => {
    if (value && isLTDPlan(value) && isKen) { // Apply logic only when isKen is true
      setProductPlan(selectedProduct, value as LTDPlan);
      recalculatePremium(selectedProduct, value as LTDPlan);
    }
  };

  const handleEligibilityChange = (eventKey: string | null) => {
    if (eventKey) {
      handleIndividualInfoChange({ name: 'eligibility', value: eventKey });
      setSelectedEligibilityPerProduct((prevEligibilities) => {
        return {
          ...prevEligibilities,
          [selectedProduct]: eventKey,
        }
      });
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

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };
  const getPDFUrl = (productName: string): string | undefined => {
    const resource = insuranceResources.find(r => r.name === productName || r.name.includes(productName) || productName.includes(r.name));
    return resource?.pdfUrl;
  };

  const handlePDFDownload = () => {
    const pdfUrl = getPDFUrl(selectedProduct);
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      console.error(`No PDF URL found for product: ${selectedProduct}`);
    }
  };
  const getFormattedContent = (content: { paragraph: string; bulletPoints: string[] }) => {
    const formattedParagraph = content.paragraph.replace(/\${(\w+)}/g, (match, p1) => {
      switch (p1) {
        case 'monthlyBenefit':
        case 'weeklyBenefit':
          return formatCurrency(premium);
        case 'employeeCoverage':
          return formatCurrency(individualInfo.employeeCoverage);
        case 'spouseCoverage':
          return formatCurrency(individualInfo.spouseCoverage);
        default:
          return match;
      }

    });

    const formattedBulletPoints = content.bulletPoints.map(point =>
      point.replace(/\${(\w+)}/g, (match, p1) => {
        switch (p1) {
          case 'monthlyBenefit':
          case 'weeklyBenefit':
            return formatCurrency(premium);  // Ensure correct premium
          case 'employeeCoverage':
            return formatCurrency(individualInfo.employeeCoverage);
          case 'spouseCoverage':
            return formatCurrency(individualInfo.spouseCoverage);
          default:
            return match;
        }
      })
    );

    return { paragraph: formattedParagraph, bulletPoints: formattedBulletPoints };
  };

  const renderBulletPoint = (point: string): React.ReactNode => {
    if (point.includes('{calculateLTDBenefit}')) {
      const currentPlan = plans[selectedProduct] as 'Basic' | 'Premium' | 'Ultra';
      const monthlyBenefit = calculateLTDBenefit(individualInfo.annualSalary, currentPlan);
      const formattedBenefit = formatCurrency(monthlyBenefit);
      point = point.replace('{calculateLTDBenefit}', formattedBenefit);

    } else if (point.includes('{weeklySTDBenefit}')) {
      const weeklyBenefit = calculateSTDBenefit(individualInfo.annualSalary);
      const formattedBenefit = formatCurrency(weeklyBenefit);
      point = point.replace('{weeklySTDBenefit}', formattedBenefit);
    }

    // Now, handle hyperlinks
    const linkRegex = /\{\{([^|]+)\|([^}]+)\}\}/g;
    const parts = point.split(linkRegex);

    return parts.map((part, index) => {
      if (index % 3 === 1) {
        // This is the link text
        const url = parts[index + 1];
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {part}
          </a>
        );
      } else if (index % 3 === 0) {
        // This is regular text
        return <React.Fragment key={index}>{part}</React.Fragment>;
      }
      return null; // This is the URL part, we don't render it directly
    });
  };

  const content = PRODUCT_CONTENT[selectedProduct][currentPlan];
  const formattedContent = getFormattedContent(content);



  const getCostBreakdown = () => {
    if (selectedProduct !== 'Life / AD&D') {
      return null; // Only Life / AD&D has a detailed breakdown
    }

    const { age, employeeCoverage = 0, spouseCoverage = 0, eligibility } = individualInfo;
    const rate = getLifeADDRate(age);

    const units_individual = Math.min(employeeCoverage / LIFE_ADD_CONFIG.units, LIFE_ADD_CONFIG.units_max_individual);
    const monthly_premium_individual = units_individual * rate;

    let monthly_premium_spouse = 0;
    let monthly_premium_children = 0;

    if (eligibility === 'Individual + Spouse' || eligibility === 'Family') {
      const max_coverage_spouse = Math.min(
        employeeCoverage * LIFE_ADD_CONFIG.max_coverage_amount_spouse_conditional,
        LIFE_ADD_CONFIG.max_coverage_amount_spouse
      );
      const units_spouse = Math.min(spouseCoverage / LIFE_ADD_CONFIG.units, max_coverage_spouse / LIFE_ADD_CONFIG.units);
      const units_max_spouse = Math.min(units_spouse, LIFE_ADD_CONFIG.units_max_spouse);
      monthly_premium_spouse = units_max_spouse * rate;
    }

    if (eligibility === 'Individual + Children' || eligibility === 'Family') {
      monthly_premium_children = LIFE_ADD_CONFIG.children_rate;
    }

    return {
      individual: monthly_premium_individual,
      spouse: monthly_premium_spouse,
      children: monthly_premium_children
    };
  };

  const renderCostBreakdown = () => {
    const breakdown = getCostBreakdown();
    if (!breakdown || individualInfo.eligibility === 'Individual') return null;

    return (
      <div className="mt-2 text-sm text-gray-600">
        <div>Individual: {formatCurrency(calculatePremiumByCostView(breakdown.individual, costView))}/{getCostViewDisplayText(costView)}</div>
        {breakdown.spouse > 0 && (
          <div>Spouse: {formatCurrency(calculatePremiumByCostView(breakdown.spouse, costView))}/{getCostViewDisplayText(costView)}</div>
        )}
        {breakdown.children > 0 && (
          <div>Children: {formatCurrency(calculatePremiumByCostView(breakdown.children, costView))}/{getCostViewDisplayText(costView)}</div>
        )}
      </div>
    );
  };


  return (
    <div className="space-y-4 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <div className="flex flex-col w-full lg:w-auto">
          {/* Product Title */}
          <h2 className="text-2xl font-bold" style={{ color: dynamicColor }}>{getProductLabel(selectedProduct)}</h2>

          {/* New Row for the Hyperlink */}
          <a
            href={getPDFUrl(getProductLabel(selectedProduct))}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm mt-1"
          >
            View/Download Benefit Details
          </a>
        </div>

        <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 w-full lg:w-auto">
          {/* Annual Income Field - Only show for LTD */}
          {selectedProduct === 'LTD' && (
            <>
              <div className="w-full sm:w-32 lg:w-32 mb-4 lg:mb-0 flex justify-center">
                <div className="w-full sm:w-30 lg:w-38">
                  <label htmlFor="annualSalary" className="block text-sm font-medium text-gray-700 mb-1 text-center">
                    Annual Income
                  </label>
                  <input
                    id="annualSalary"
                    name="annualSalary"
                    type="text"
                    value={isFocused ? individualInfo.annualSalary : formatCurrency(individualInfo.annualSalary)}
                    onChange={handleSalaryChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full text-center px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Ensure the dropdown is shown for LTD if annual salary is greater than 0 */}
              {showPlanDropdown && individualInfo.annualSalary > 0 && (
                <Dropdown onSelect={handlePlanChange}>
                  <Dropdown.Toggle variant="primary" id="dropdown-plan">
                    {getLTDPlanDisplayName(currentPlan as LTDPlan)}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      key={availableLTDPlan}
                      eventKey={availableLTDPlan}
                      active={currentPlan === availableLTDPlan}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span>{getLTDPlanDisplayName(availableLTDPlan)}</span>
                        <span className="ml-4">
                          {formatCurrency(calculateLTDBenefit(individualInfo.annualSalary, availableLTDPlan))}
                          <span className="ml-1 text-sm text-white-600">Lost Income / month</span>
                        </span>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </>
          )}



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
                {(selectedProduct === 'LTD' ? ['Basic', 'Premium', 'Ultra'] : ['Basic', 'Premium']).map((plan) => (
                  <Dropdown.Item
                    key={plan}
                    eventKey={plan}
                    active={currentPlan === plan}
                    disabled={selectedProduct === 'LTD' && isLTDPlan(plan) && !isLTDPlanAvailable(plan, individualInfo.annualSalary, isKen || false)}

                  >
                    <div className="flex justify-between items-center w-full">
                      <span>{plan}</span>
                      <span className="ml-4">
                        {selectedProduct === 'LTD' && isLTDPlan(plan)
                          ? `Max: ${formatCurrency(calculateLTDBenefit(individualInfo.annualSalary, plan))}`
                          : `${formatCurrency(planPremiums[plan as Plan])} / ${costView.toLowerCase()}`
                        }
                      </span>
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
          {eligibilityOptions.length > 1 && (
            <Dropdown onSelect={handleEligibilityChange}>
              <Dropdown.Toggle variant="primary" id="dropdown-eligibility">
                {selectedEligibilityPerProduct[selectedProduct]}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {eligibilityOptions.map((option) => (
                  <Dropdown.Item key={option} eventKey={option} active={option === selectedEligibilityPerProduct[selectedProduct]}>
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
        <p className="text-gray-600 mb-2 text-lg ">{formattedContent.paragraph}</p>
        <ul className="list-none pl-2 sm:pl-9">
          {formattedContent.bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start mb-2 text-gray-500">
              <SVGCheckmark />
              <span>{renderBulletPoint(point)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* {selectedProduct === 'LTD' && (
        <div className="flex items-center space-x-2">
          <span>LTD Plan:</span>
          <strong>{currentPlan}</strong>
        </div>
      )} */}

      {selectedProduct === 'Life / AD&D' && (errors.employeeCoverage || errors.spouseCoverage) && (
        <Alert variant="destructive">
          <AlertDescription>
            {errors.employeeCoverage && <div>{errors.employeeCoverage}</div>}
            {errors.spouseCoverage && <div>{errors.spouseCoverage}</div>}
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-gray-100 p-3 rounded-md shadow-md">
        <div className="flex items-baseline space-x-2">
          <p className="text-lg font-semibold text-gray-700">Cost:</p>
          <p className="price">{formatCurrency(premium)}</p>
          <span className="text-base text-gray-500"> /{getCostViewDisplayText(costView)}</span>
        </div>
        {renderCostBreakdown()}
      </div>
    </div>
  );
};

export default ProductDetails;
