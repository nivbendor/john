import React, { useCallback } from 'react';
import { Product, CostView, IndividualInfo, Plan, calculatePremiumByCostView, getCostViewDisplayText, ToggleState, PremiumResult } from '../utils/insuranceTypes';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from './ui/select';
import { PREMIUM_CALCULATIONS } from '../utils/insuranceUtils';

interface ActiveProductsToggleProps {
  plan: Record<Product, Plan>;
  products: Record<Product, boolean>;
  premiums: PremiumResult;
  costView: CostView;
  individualInfo: IndividualInfo;
  toggleStates: Record<Product, ToggleState>;
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
  const getAdjustedPremium = useCallback((product: Product): number => {
    const calculatePremium = PREMIUM_CALCULATIONS[product];
    const premium = calculatePremium(individualInfo, plan[product]);
    return calculatePremiumByCostView(premium, costView);
  }, [individualInfo, plan, costView]);

  const totalPremium = Object.entries(products)
    .filter(([_, isActive]) => isActive)
    .reduce((total, [product]) => total + getAdjustedPremium(product as Product), 0);
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Active Products</h2>
        <div className="text-right">
        <p className="text-4xl font-bold text-gray-800">{formatCurrency(totalPremium)}</p>
        <p className="text-sm text-gray-600">Total {costView.toLowerCase()} Cost</p>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(products).map(([product, isActive]) => (
          <div key={product} className="flex items-center justify-between py-2 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-800 w-1/4">{product}</span>
            <div className="flex items-center space-x-4 w-3/4 justify-end">
              {/* <Select
                value={isActive ? "Active" : "Inactive"}
                onValueChange={(value) => handleToggleChange(product as Product, value === "Active")}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select> */}
              <span className="text-sm font-bold text-gray-800 w-20 text-right">
                ${getAdjustedPremium(product as Product).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveProductsToggle;