import React, { useState } from 'react';
import { Product, CostView } from '../utils/insuranceTypes';
import { CardTitle, Card, CardContent, CardHeader } from './ui/card';
import '../styles/toggle3D.css'; 

interface ActiveProductsListProps {
  products: Record<Product, boolean>;
  premiums: Record<Product, number>;
  costView: CostView;
}

type ToggleState = 'Owner' | 'All' | 'Employees';

const ActiveProductsList: React.FC<ActiveProductsListProps> = ({
  products,
  premiums,
  costView,
}) => {
  const [toggleStates, setToggleStates] = useState<Record<Product, ToggleState>>(() => {
    const initialStates: Record<Product, ToggleState> = {} as Record<Product, ToggleState>;
    Object.keys(products).forEach((product) => {
      initialStates[product as Product] = 'All';
    });
    return initialStates;
  });

  const handleToggleChange = (product: Product, value: number) => {
    const newState: ToggleState = value === 0 ? 'Owner' : value === 50 ? 'All' : 'Employees';
    setToggleStates((prevStates) => ({
      ...prevStates,
      [product]: newState,
    }));
  };

  // This is a placeholder function. The actual implementation of premium adjustment
  // based on toggle state should be handled in the parent component or a utility function.
  const getAdjustedPremium = (product: Product, baseAmount: number): number => {
    // For now, we'll just return the base amount. 
    // The actual logic for adjusting the premium should be implemented elsewhere.
    return baseAmount;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(products)
            .filter(([_, isActive]) => isActive)
            .map(([product]) => (
              <div key={product} className="flex items-center justify-between">
                <span className="font-medium">{product}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">
                    ${getAdjustedPremium(product as Product, premiums[product as Product])?.toFixed(2) || '0.00'} / {costView.toLowerCase()}
                  </span>
                  <div className="wrapper">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="50"
                      value={toggleStates[product as Product] === 'Owner' ? 0 : toggleStates[product as Product] === 'All' ? 50 : 100}
                      onChange={(e) => handleToggleChange(product as Product, parseInt(e.target.value))}
                      className={`custom-toggle ${
                        toggleStates[product as Product] === 'Owner'
                          ? 'tgl-def'
                          : toggleStates[product as Product] === 'All'
                          ? 'tgl-on'
                          : 'tgl-off'
                      }`}
                    />
                  </div>
                  <span className="text-xs">{toggleStates[product as Product]}</span>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveProductsList;