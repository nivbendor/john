import React, { useState, useCallback, useEffect } from 'react';
import { Product, CostView, IndividualInfo, Plan, calculatePremiumByCostView, PremiumResult } from '../utils/insuranceTypes';
import { PREMIUM_CALCULATIONS } from '../utils/insuranceUtils';
import { parseUrlParams } from 'utils/parseUrlParams';

interface ActiveProductsToggleProps {
  plan: Record<Product, Plan>;
  products: Record<Product, boolean>;
  premiums: PremiumResult;
  costView: CostView;
  individualInfo: IndividualInfo;
  handleToggleChange: (product: Product, isActive: boolean) => void;
}

const ActiveProductsToggle: React.FC<ActiveProductsToggleProps> = ({
  plan,
  products,
  premiums,
  costView,
  individualInfo,
  handleToggleChange,
}) => {
  const [activeProducts, setActiveProducts] = useState<Record<Product, boolean>>(() => {
    const initialState = { ...products };
    initialState['Vision'] = false;
    initialState['Critical Illness/Cancer'] = false;
    return initialState;
  });

  const { showCostPerHour } = parseUrlParams();

  const getAdjustedPremium = useCallback((product: Product): number => {
    const calculatePremium = PREMIUM_CALCULATIONS[product];
    const premium = calculatePremium(individualInfo, plan[product]);
    return calculatePremiumByCostView(premium, costView);
  }, [individualInfo, plan, costView]);

  const getMonthlyPremium = useCallback((product: Product): number => {
    const calculatePremium = PREMIUM_CALCULATIONS[product];
    const premium = calculatePremium(individualInfo, plan[product]);
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

  const costPerHour = totalMonthlyPremium / (40); // Assuming 4 weeks per month

  return (
    <div className="bg-white p-6 sm:w-full">
      <div className="flex justify-between items-center mb-6 sm:">
        <h2 className="text-2xl font-bold text-gray-800">Summary</h2>
        <div className="text-right">
          <p className="text-4xl font-bold text-gray-800">{formatCurrency(totalPremium)}</p>
          <p className="text-sm text-gray-600">Total {costView.toLowerCase()} Cost</p>
          {/* {showCostPerHour && (
            <div className="flex items-baseline space-x-1 mt-2">
              <span className="font-bold">{formatCurrency(costPerHour)}</span>
              <span className="text-sm text-gray-500">/hour</span>
            </div>
          )} */}
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(products).map(([product, _]) => {
          const premium = getAdjustedPremium(product as Product);
          const monthlyPremium = getMonthlyPremium(product as Product);
          const productCostPerHour = monthlyPremium * (12/52/40); // Assuming 4 weeks per month
          return (
            <div key={product} className={`flex items-center justify-between py-2 border-b border-gray-200 ${activeProducts[product] ? '' : 'opacity-50'}`}>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeProducts[product]}
                  onChange={() => handleLocalToggle(product as Product)}
                  className="sr-only peer"
                />
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{product}</span>
              </label>
              <div className="flex items-center space-x-2">
                {showCostPerHour && (
                  <span className="text-xs text-gray-500">{formatCurrency(productCostPerHour)}/hr</span>
                )}
                <span className="text-sm font-bold text-gray-800 w-20 text-right">
                  {formatCurrency(premium)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveProductsToggle;