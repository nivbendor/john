import React from 'react';
import { calculatePremiumByCostView, CostView, IndividualInfo, Plan, Product, ToggleState } from '../utils/insuranceTypes';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PREMIUM_CALCULATIONS } from 'utils/insuranceUtils';

interface CostEstimateProps {
  premiums: Record<Product, number>;
  costView: CostView;
  toggleStates: Record<Product, ToggleState>;
  activeProducts: Record<Product, boolean>;
  individualInfo: IndividualInfo;
  plan: Record<Product, Plan>;
}

const CostEstimate: React.FC<CostEstimateProps> = ({
  premiums,
  costView,
  toggleStates,
  activeProducts,
  individualInfo,
  plan,
}) => {
  // const calculateCosts = () => {
  //   let ownerPremium = 0;
  //   let employeePremium = 0;

  //   Object.entries(premiums).forEach(([product, premium]) => {
  //     if (activeProducts[product as Product]) {
  //       switch (toggleStates[product as Product]) {
  //         case 'Owner':
  //           ownerPremium += premium;
  //           break;
  //         case 'Employees':
  //           employeePremium += premium * businessEmployees;
  //           break;
  //         case 'All':
  //           ownerPremium += premium;
  //           employeePremium += premium * businessEmployees;
  //           break;
  //       }
  //     }
  //   });

  //   const totalMonthlyCost = ownerPremium + employeePremium;
  //   const totalAnnualCost = totalMonthlyCost * 12;
  //   const avgMonthlyPerIndividual = totalMonthlyCost / (businessEmployees + 1);

  //   return { totalMonthlyCost, totalAnnualCost, avgMonthlyPerIndividual };
  // };

  // const { totalMonthlyCost, totalAnnualCost, avgMonthlyPerIndividual } = calculateCosts();

  const getAdjustedPremium = (product: Product): Record<string, number> => {
    const calculatePremium = PREMIUM_CALCULATIONS[product];
    const ownerPremium = calculatePremium(individualInfo, plan[product], 'owner'); 
    const employeePremium = calculatePremium(individualInfo, plan[product], 'employee');
    const employeesCount = individualInfo.businessEmployees;

    let totalCost = 0;
    let avgPerProductPerEmployee = 0;

    switch (toggleStates[product]) {
      case 'Owner':
        totalCost = ownerPremium;
        avgPerProductPerEmployee = totalCost;
        break;
      case 'Employees':
        totalCost = employeePremium * employeesCount;
        avgPerProductPerEmployee = totalCost / employeesCount;
        break;
      case 'All':
        totalCost = ownerPremium + (employeePremium * employeesCount);
        avgPerProductPerEmployee = totalCost / (employeesCount + 1);
        break;
    }

    const totalPerProduct = calculatePremiumByCostView(totalCost, costView);

    return {
      totalPerProduct,
      avgPerProductPerEmployee,
    };
  };

  let total = 0;
  let avgPerIndividual = 0;

  Object.entries(activeProducts).forEach(([product, isActive]) => {
    if (!isActive) {
      return;
    }

    const { totalPerProduct, avgPerProductPerEmployee } = getAdjustedPremium(product as Product);

    total += totalPerProduct;
    avgPerIndividual += avgPerProductPerEmployee;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  };


  // const getCostViewAmount = (monthlyCost: number) => {
  //   switch (costView) {
  //     case 'Weekly':
  //       return monthlyCost / 4;
  //     case 'Semi-Monthly':
  //       return monthlyCost / 2;
  //     case 'Monthly':
  //       return monthlyCost;
  //     case 'Annual':
  //       return monthlyCost * 12;
  //     default:
  //       return monthlyCost;
  //   }
  // };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-center">
          <p>
            <span className="font-semibold">Total {costView} Cost: </span>
            {/* <span>{formatCurrency(getCostViewAmount(total))}</span> */}
            <span>{formatCurrency(total)}</span>
          </p>
        
          <p>
            <p><span className="font-semibold">Avg Monthly Cost per Individual: </span></p>
            {/* <p><span>{formatCurrency(avgMonthlyPerIndividual)}</span></p> */}
            <p><span>{formatCurrency(avgPerIndividual)}</span></p>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostEstimate;