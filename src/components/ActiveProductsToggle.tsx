import React, { useCallback } from 'react';
import { Product, CostView, IndividualInfo, Plan, calculatePremiumByCostView, getCostViewDisplayText, ToggleState } from '../utils/insuranceTypes';
import { CardTitle, Card, CardContent, CardHeader } from './ui/card';
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
    <Card>
      <CardHeader>
        <CardTitle>Active Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="mb-4">
            <p className="grid grid-cols-3 md:grid-cols-2">
            <span className="text-m ml-1"> Total Cost Per</span> 
            <span className="text-xl ml-1">{getCostViewDisplayText(costView)}</span>
            
            </p>
          </div>
          {Object.entries(products)
            .filter(([_, isActive]) => isActive)
            .map(([product]) => (
              <div key={product} className="flex items-center justify-between">
                <span className="font-medium">{product}</span>
                <div className="flex items-center space-x-4">
                  <Select
                    value={toggleStates[product as Product]}
                    onValueChange={(value: ToggleState) => handleToggleChange(product as Product, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Owner">Owner</SelectItem>
                      {individualInfo.businessEmployees > 0 && <SelectItem value="Employees">Employees</SelectItem>}
                      {individualInfo.businessEmployees > 0 && <SelectItem value="All">All</SelectItem>}
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm">
                    ${getAdjustedPremium(product as Product).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
        </div>
        
      </CardContent>
      <p className="text-sm  text-gray-700">
              Total Employees (including owner): {individualInfo.businessEmployees + 1}
            </p>
    </Card>
  );
};

export default ActiveProductsToggle;
