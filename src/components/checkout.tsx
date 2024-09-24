import React, { useState, useCallback, useEffect } from 'react';
import { Product, CostView, IndividualInfo, Plan, calculatePremiumByCostView, PremiumResult, EligibilityPerProduct } from '../utils/insuranceTypes';
import { PREMIUM_CALCULATIONS } from '../utils/insuranceUtils';
import { parseUrlParams } from 'utils/parseUrlParams';
import { handleQuoteRequest } from '../utils/quoteUtils';
import colors from '../styles/colors';


interface ActiveProductsToggleProps {
  plan: Record<Product, Plan>;
  products: Record<Product, boolean>;
  premiums: PremiumResult;
  costView: CostView;
  individualInfo: IndividualInfo;
  selectedEligibilityPerProduct: EligibilityPerProduct;
  handleToggleChange: (product: Product, isActive: boolean) => void;
}

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

    // Listen for changes in the URL
    window.addEventListener('popstate', updateColor);
    return () => window.removeEventListener('popstate', updateColor);
  }, []);

  return color;
};

const ActiveProductsToggle: React.FC<ActiveProductsToggleProps> = ({
  plan,
  products,
  premiums,
  costView,
  individualInfo,
  selectedEligibilityPerProduct,
  handleToggleChange,
}) => {
  const [activeProducts, setActiveProducts] = useState<Record<Product, boolean>>(() => {
    const initialState = { ...products };
    initialState['LTD'] = true;
    initialState['STD'] = false;
    initialState['Life / AD&D'] = true;
    initialState['Critical Illness/Cancer'] = false;
    initialState['Vision'] = false;
    initialState['Dental'] = true;
    initialState['Accident'] = false;
    
    //default: return product;//

    return initialState;
  });
  const dynamicColor = useColorFromUrl();


  const { showCostPerHour } = parseUrlParams();

  const getAdjustedPremium = useCallback((product: Product): number => {
    const calculatePremium = PREMIUM_CALCULATIONS[product];
    const tempIndividualInfo = {
      ...individualInfo,
      eligibility: selectedEligibilityPerProduct[product],
    };
    const premium = calculatePremium(tempIndividualInfo, plan[product]);
    return calculatePremiumByCostView(premium, costView);
  }, [individualInfo, selectedEligibilityPerProduct, plan, costView]);

  const getMonthlyPremium = useCallback((product: Product): number => {
    const calculatePremium = PREMIUM_CALCULATIONS[product];
    const tempIndividualInfo = {
      ...individualInfo,
      eligibility: selectedEligibilityPerProduct[product],
    };
    const premium = calculatePremium(tempIndividualInfo, plan[product]);
    return calculatePremiumByCostView(premium, 'Monthly');
  }, [individualInfo, plan]);

  const totalPremium = Object.entries(activeProducts)
    .filter(([product, isActive]) => isActive)
    .reduce((total, [product]) => total + getAdjustedPremium(product as Product), 0);

  const totalMonthlyPremium = Object.entries(activeProducts)
    .filter(([product, isActive]) => isActive)
    .reduce((total, [product]) => total + getMonthlyPremium(product as Product), 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  };

  const handleLocalToggle = (product: Product) => {
    setActiveProducts(prev => {
      const newState = { ...prev, [product]: !prev[product] };
      handleToggleChange(product, newState[product]);
      return newState;
    });
  };

  const totalCostPerHour = totalMonthlyPremium * (12/52/40); // Assuming 52 weeks per year, 40 hours per week

  return (
    <div className="bg-white p-2 sm:w-full">
      <div className="flex justify-between items-center mb-6 sm:">
        <h2 className="text-2xl font-bold" style={{ color: dynamicColor }}>Total</h2>
        <div className="text-right">
          <p className="text-4xl font-bold" style={{ color: dynamicColor }}>{formatCurrency(totalPremium)}</p>
          <p className="text-sm text-gray-600">Total {costView.toLowerCase()} Cost</p>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(products).map(([product, _]) => {
          const premium = getAdjustedPremium(product as Product);
          const monthlyPremium = getMonthlyPremium(product as Product);
          const productCostPerHour = monthlyPremium * (12/52/40);
          return (
            <div key={product} className={`flex items-center justify-between py-1 border-gray-200 ${activeProducts[product] ? '' : 'opacity-50'}`}>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeProducts[product]}
                  onChange={() => handleLocalToggle(product as Product)}
                  className="sr-only peer"
                />
                <div className={`relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${dynamicColor} dark:peer-focus:ring-${dynamicColor} rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-${dynamicColor}`}></div>
                <span className="ms-3 text-base font-medium text-gray-900 dark:text-gray-900">{product}</span>
              </label>

              <div className="flex items-center space-x-2">
                {showCostPerHour && (
                  <span className="text-xs text-gray-500">{formatCurrency(productCostPerHour)}/hr</span>
                )}
                <span className="text-base font-bold text-gray-800 w-20 text-right">
                  {formatCurrency(premium)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showCostPerHour && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-semibold text-gray-700">Total Cost per Hour:</span>
            <span className="text-base font-bold" style={{ color: dynamicColor }}>{formatCurrency(totalCostPerHour)}/hr</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveProductsToggle;