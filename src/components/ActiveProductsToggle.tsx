import React, { useCallback } from 'react';
import { Product, CostView, IndividualInfo, Plan, calculatePremiumByCostView, getCostViewDisplayText, ToggleState } from '../utils/insuranceTypes';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from './ui/select';
import { PREMIUM_CALCULATIONS } from '../utils/insuranceUtils';

interface ActiveProductsToggleProps {
  plan: Record<Product, Plan>,
  products: Record<Product, boolean>;
  premiums: Record<Product, number>;
  costView: CostView;
  individualInfo: IndividualInfo;
  toggleStates: Record<Product, ToggleState>;
  handleToggleChange: (product: Product, newState: ToggleState) => void;
}

const ActiveProductsToggle: React.FC<ActiveProductsToggleProps> = ({
  plan,
  products,
  premiums,
  costView,
  individualInfo,
  toggleStates,
  handleToggleChange,
}) => {
  const getAdjustedPremium = useCallback((product: Product): number => {
    const calculatePremium = PREMIUM_CALCULATIONS[product];
    const ownerPremium = calculatePremium(individualInfo, plan[product], 'owner');
    const employeePremium = calculatePremium(individualInfo, plan[product], 'employee');
    const employeesCount = individualInfo.businessEmployees;

    let totalCost = 0;

    switch (toggleStates[product]) {
      case 'Owner':
        totalCost = ownerPremium;
        break;
      case 'Employees':
        totalCost = employeePremium * employeesCount;
        break;
      case 'All':
        totalCost = ownerPremium + (employeePremium * employeesCount);
        break;
    }

    return calculatePremiumByCostView(totalCost, costView);
  }, [individualInfo, plan, costView, toggleStates]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 font-sans">
      <h2 className="text-2xl font-bold text-gray-900 dark mb-6">Active Products</h2>
      
      <div className="mb-8 bg-primary-50 dark:bg-primary-900 p-4 rounded-md">
        <p className="text-sm text-primary-200 dark:text-primary-300">Total Cost Per</p>
        <p className="text-3xl font-bold text-primary-700 dark:text-primary-200">{getCostViewDisplayText(costView)}</p>
      </div>

      <div className="space-y-6">
        {Object.entries(products)
          .filter(([_, isActive]) => isActive)
          .map(([product]) => (
            <div key={product} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-lg font-medium text-gray-900 dark:text-white mb-2 sm:mb-0">{product}</span>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Select
                  value={toggleStates[product as Product]}
                  onValueChange={(value: ToggleState) => handleToggleChange(product as Product, value)}
                >
                  <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-600">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Owner">Owner</SelectItem>
                    {individualInfo.businessEmployees > 0 && <SelectItem value="Employees">Employees</SelectItem>}
                    {individualInfo.businessEmployees > 0 && <SelectItem value="All">All</SelectItem>}
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-xl font-bold text-primary-600 dark:text-primary-300">
                  ${getAdjustedPremium(product as Product).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
      </div>
      
      <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
        Total Employees (including owner): {individualInfo.businessEmployees + 1}
      </p>
    </div>
  );
};

export default ActiveProductsToggle;