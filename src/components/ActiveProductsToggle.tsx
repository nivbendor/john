import React, { useState, useCallback, useEffect } from 'react';
import { Product, CostView, IndividualInfo, Plan, calculatePremiumByCostView, PremiumResult } from '../utils/insuranceTypes';
import { PREMIUM_CALCULATIONS } from '../utils/insuranceUtils';

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

  const getAdjustedPremium = useCallback((product: Product): number => {
    const calculatePremium = PREMIUM_CALCULATIONS[product];
    const premium = calculatePremium(individualInfo, plan[product]);
    return calculatePremiumByCostView(premium, costView);
  }, [individualInfo, plan, costView]);

  const totalPremium = Object.entries(activeProducts)
    .filter(([product, isActive]) => isActive)
    .reduce((total, [product]) => total + getAdjustedPremium(product as Product), 0);

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

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
        <div className="text-right">
          <p className="text-4xl font-bold text-gray-800">{formatCurrency(totalPremium)}</p>
          <p className="text-sm text-gray-600">Total {costView.toLowerCase()} Cost</p>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(products).map(([product, _]) => (
          <div key={product} className={`flex items-center justify-between py-2 border-b border-gray-200 ${activeProducts[product as Product] ? '' : 'opacity-50'}`}>
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={activeProducts[product as Product]} 
                onChange={() => handleLocalToggle(product as Product)}
                className="sr-only peer"
              />
              <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{product}</span>
            </label>
            <span className="text-sm font-bold text-gray-800 w-20 text-right">
              ${getAdjustedPremium(product as Product).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveProductsToggle;