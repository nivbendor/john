import React from 'react';
import { CostView, Product, ToggleState } from '../utils/insuranceTypes';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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
  const calculateCosts = () => {
    let ownerPremium = 0;
    let employeePremium = 0;

    Object.entries(premiums).forEach(([product, premium]) => {
      if (activeProducts[product as Product]) {
        switch (toggleStates[product as Product]) {
          case 'Owner':
            ownerPremium += premium;
            break;
          case 'Employees':
            employeePremium += premium * businessEmployees;
            break;
          case 'All':
            ownerPremium += premium;
            employeePremium += premium * businessEmployees;
            break;
        }
      }
    });

    const totalMonthlyCost = ownerPremium + employeePremium;
    const totalAnnualCost = totalMonthlyCost * 12;
    const avgMonthlyPerIndividual = totalMonthlyCost / (businessEmployees + 1);

    return { totalMonthlyCost, totalAnnualCost, avgMonthlyPerIndividual };
  };

  const { totalMonthlyCost, totalAnnualCost, avgMonthlyPerIndividual } = calculateCosts();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  };

  const getCostViewAmount = (monthlyCost: number) => {
    switch (costView) {
      case 'Weekly':
        return monthlyCost / 4;
      case 'Semi-Monthly':
        return monthlyCost / 2;
      case 'Monthly':
        return monthlyCost;
      case 'Annual':
        return monthlyCost * 12;
      default:
        return monthlyCost;
    }
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
              <span className="text-4xl font-bold text-gray-800 block">{formatCurrency(getCostViewAmount(totalMonthlyCost))}</span>
            </div>
          <div className="text-l p-1 mb-4">
              <span className="font-semibold block p-2">Avg {costView} Cost per Individual</span>
              <span className="text-4xl font-bold text-gray-800 block">{formatCurrency(avgMonthlyPerIndividual)}</span>
        </div>
      </div>
    

      </CardContent>
    </Card>
  );
};

export default CostEstimate;