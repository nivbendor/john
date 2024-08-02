import React from 'react';
import { calculatePremiumByCostView, CostView, IndividualInfo, Plan, Product, ToggleState } from '../utils/insuranceTypes';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PREMIUM_CALCULATIONS } from 'utils/insuranceUtils';

interface CostEstimateProps {
  premiums: Record<Product, number>;
  costView: CostView;
  businessEmployees: number;
  toggleStates: Record<Product, ToggleState>;
  activeProducts: Record<Product, boolean>;
}

const CostEstimate: React.FC<CostEstimateProps> = ({
  premiums,
  costView,
  businessEmployees,
  toggleStates,
  activeProducts,
}) => {
  const { total, avgPerIndividual } = React.useMemo(() => {
    let totalSum = 0;
    let avgSum = 0;

    Object.entries(activeProducts).forEach(([product, isActive]) => {
      if (!isActive) return;

      const premium = premiums[product as Product];
      let productTotal = 0;

      switch (toggleStates[product as Product]) {
        case 'Owner':
          productTotal = premium;
          break;
        case 'Employees':
          productTotal = premium * businessEmployees;
          break;
        case 'All':
          productTotal = premium * (businessEmployees + 1);
          break;
      }

      totalSum += productTotal;
    });

    avgSum = totalSum / (businessEmployees + 1);

    return { 
      total: calculatePremiumByCostView(totalSum, costView), 
      avgPerIndividual: calculatePremiumByCostView(avgSum, costView) 
    };
  }, [premiums, costView, businessEmployees, toggleStates, activeProducts]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-gray-800 p-4">
          <div className="text-l mb-4">
            <span className="font-semibold block p-2">Total {costView} Cost</span>
            <span className="text-4xl font-bold text-gray-800 block">{formatCurrency(total)}</span>
          </div>
          <div className="text-l p-1 mb-4">
            <span className="font-semibold block p-2">Avg {costView} Cost per Individual</span>
            <span className="text-4xl font-bold text-gray-800 block">{formatCurrency(avgPerIndividual)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostEstimate;