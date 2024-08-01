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
      case 'None':
        totalCost = 0;
        break;
    }

    return calculatePremiumByCostView(totalCost, costView);
  }, [individualInfo, plan, costView, toggleStates]);

  const totalPremium = Object.entries(products)
    .filter(([_, isActive]) => isActive)
    .reduce((total, [product]) => total + getAdjustedPremium(product as Product), 0);

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Active Products</h2>
          <div className="text-right">
            <p className="text-4xl font-bold text-gray-800">${totalPremium.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Total {getCostViewDisplayText(costView)} Cost</p>
          </div>
        </div>
  
        <div className="space-y-4">
          {Object.entries(products)
            .filter(([_, isActive]) => isActive)
            .map(([product]) => (
              <div key={product} className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-800 w-1/4">{product}</span>
                <div className="flex items-center space-x-4 w-3/4 justify-end">
                  <Select
                    value={toggleStates[product as Product]}
                    onValueChange={(value: ToggleState) => handleToggleChange(product as Product, value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Owner">Owner</SelectItem>
                      {individualInfo.businessEmployees > 0 && <SelectItem value="Employees">Employees</SelectItem>}
                      {individualInfo.businessEmployees > 0 && <SelectItem value="All">All</SelectItem>}
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm font-bold text-gray-800 w-20 text-right">
                    ${getAdjustedPremium(product as Product).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
        </div>
        
        <p className="mt-6 text-sm text-gray-600">
          Total Employees (including owner): {individualInfo.businessEmployees + 1}
        </p>
      </div>
    );
  };
  
  export default ActiveProductsToggle;