import React from 'react';
import { CostView, Product } from '../utils/insuranceTypes';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type ToggleState = 'Owner' | 'All' | 'Employees';

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
        <CardTitle>Cost Estimate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-center">
          <p>
            <span className="font-semibold">Total {costView} Cost: </span>
            <span>{formatCurrency(getCostViewAmount(totalMonthlyCost))}</span>
          </p>
          <p>
            <span className="font-semibold">Total Annual Cost: </span>
            {formatCurrency(totalAnnualCost)}
          </p>
          <p>
            <span className="font-semibold">Avg Monthly Cost per Individual: </span>
            <span>{formatCurrency(avgMonthlyPerIndividual)}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostEstimate;