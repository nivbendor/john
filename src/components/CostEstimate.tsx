import React from 'react';
import { CostView, Product } from '../utils/insuranceTypes';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type ToggleState = 'Owner' | 'All' | 'Employees';

interface CostEstimateProps {
  premiums: Record<Product, number>;
  costView: CostView;
  businessEmployees: number;
  toggleStates: Record<Product, ToggleState>;
}

const CostEstimate: React.FC<CostEstimateProps> = ({
  premiums,
  costView,
  businessEmployees,
  toggleStates,
}) => {
  const getTotalCost = () => {
    let totalCost = 0;
    Object.entries(premiums).forEach(([product, premium]) => {
      switch (toggleStates[product as Product]) {
        case 'Owner':
          totalCost += premium;
          break;
        case 'Employees':
          totalCost += premium * businessEmployees;
          break;
        case 'All':
          totalCost += premium * (businessEmployees + 1);
          break;
      }
    });

    switch (costView) {
      case 'Weekly':
        return totalCost * 52;
      case 'Semi-Monthly':
        return totalCost * 24;
      case 'Monthly':
        return totalCost * 12;
      case 'Annual':
        return totalCost;
      default:
        return totalCost * 12;
    }
  };

  const getPerEmployeeCost = () => {
    const totalCost = getTotalCost();
    const totalEmployees = businessEmployees + 1; // +1 for the owner
    return totalEmployees > 0 ? totalCost / totalEmployees : 0;
  };

  const totalCost = getTotalCost();
  const perEmployeeCost = getPerEmployeeCost();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Estimate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Total {costView} Cost: </span>
            ${(totalCost / (costView === 'Annual' ? 1 : 12)).toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Total Annual Cost: </span>
            ${totalCost.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Annual Cost per Individual: </span>
            ${perEmployeeCost.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostEstimate;