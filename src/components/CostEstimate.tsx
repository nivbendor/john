import React from 'react';
import { Product, CostView, ToggleState, PremiumResult } from '../utils/insuranceTypes';
import { calculateTotalPremium } from '../utils/insuranceUtils';

interface CostEstimateProps {
  premiums: PremiumResult;
  costView: CostView;
  activeProducts: Record<Product, boolean>;
  toggleStates: Record<Product, ToggleState>;
}

const CostEstimate: React.FC<CostEstimateProps> = ({
  premiums,
  costView,
  activeProducts,
  toggleStates,
}) => {
  const totalPremium = calculateTotalPremium(premiums, activeProducts, toggleStates);
  
  const getCostViewText = (view: CostView) => {
    switch (view) {
      case 'Monthly':
        return 'per month';
      case 'Semi-Monthly':
        return 'per semi-month';
      case 'Weekly':
        return 'per week';
      case 'Bi-Weekly':
        return '/ 26 weeks';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Cost Estimate</h3>
      <p className="text-2xl font-bold">${totalPremium.toFixed(2)} {getCostViewText(costView)}</p>
    </div>
  );
};

export default CostEstimate;