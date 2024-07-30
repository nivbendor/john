import React, { useState, useEffect } from 'react';
import { Product, CostView, IndividualInfo } from '../utils/insuranceTypes';
import { CardTitle, Card, CardContent, CardHeader } from './ui/card';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from './ui/select';


interface ActiveProductsToggleProps {
  products: Record<Product, boolean>;
  premiums: Record<Product, number>;
  costView: CostView;
  individualInfo: IndividualInfo;
}

type ToggleState = 'Owner' | 'All' | 'Employees';

const ActiveProductsToggle: React.FC<ActiveProductsToggleProps> = ({
  products,
  premiums,
  costView,
  individualInfo,
}) => {
  const [toggleStates, setToggleStates] = useState<Record<Product, ToggleState>>(() => {
    const initialStates: Record<Product, ToggleState> = {} as Record<Product, ToggleState>;
    Object.keys(products).forEach((product) => {
      initialStates[product as Product] = 'All';
    });
    return initialStates;
  });

  const [totalEmployees, setTotalEmployees] = useState(1);

  useEffect(() => {
    setTotalEmployees(individualInfo.businessEmployees + 1);
  }, [individualInfo.businessEmployees]);

  const handleToggleChange = (product: Product, newState: ToggleState) => {
    setToggleStates((prevStates) => ({
      ...prevStates,
      [product]: newState,
    }));
  };

  const getAdjustedPremium = (product: Product, baseAmount: number): number => {
    switch (toggleStates[product]) {
      case 'Owner':
        return baseAmount / totalEmployees; // Owner's share
      case 'Employees':
        return (baseAmount * (totalEmployees - 1)) / totalEmployees; // Employees' share
      case 'All':
      default:
        return baseAmount; // Full premium
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">
              Total Employees (including owner): {totalEmployees}
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
                    <SelectTrigger className="w-[120px]">
                      <SelectValue>{toggleStates[product as Product]}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Owner">Owner</SelectItem>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Employees">Employees</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm">
                    ${getAdjustedPremium(product as Product, premiums[product as Product]).toFixed(2)} / {costView.toLowerCase()}
                  </span>
                  
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveProductsToggle;