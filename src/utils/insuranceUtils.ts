// utils/insuranceUtils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import {
  Product,
  EligibilityOption,
  USState,
  Plan,
  IndividualInfo,
  PRODUCTS,
  ELIGIBILITY_OPTIONS,
  US_STATES,
  CostView
} from './insuranceTypes';

import {
  DENTAL_PREMIUMS,
  VISION_PREMIUMS,
  AGE_BANDED_RATES,
  ZIP_CODE_REGIONS,
  STATE_CATEGORIES,
  STD_CONFIG,
  LTD_CONFIG,
  LIFE_ADD_CONFIG,
  ACCIDENT_PREMIUMS,
  CRITICAL_ILLNESS_RATES,
  PRODUCT_ELIGIBILITY_OPTIONS,
  AGE_BANDED_RATES_LIFE
} from './insuranceConfig';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getAgeBandRate = (age: number, ageBandRates: typeof AGE_BANDED_RATES): number => {
  const ageBand = ageBandRates.find(band => age >= band.minAge && age <= band.maxAge);
  return ageBand ? ageBand.rate : ageBandRates[ageBandRates.length - 1].rate;
};

const getZipCodeRegion = (zipCode: string): number | null => {
  const zipPrefix = zipCode.substring(0, 3);
  for (const region in ZIP_CODE_REGIONS) {
    if (ZIP_CODE_REGIONS[region].includes(zipPrefix)) {
      return parseInt(region, 10);
    }
  }
  return null;
};

const getStateCategory = (state: USState): string => {
  return Object.keys(STATE_CATEGORIES).find(category => STATE_CATEGORIES[category].includes(state)) || 'Other';
};

const getCriticalIllnessRate = (age: number, eligibility: EligibilityOption): number => {
  let ageGroup: keyof typeof CRITICAL_ILLNESS_RATES;

  if (age < 24) ageGroup = '<24';
  else if (age >= 75) ageGroup = '75+';
  else {
    const lowerBound = Math.floor(age / 5) * 5;
    const upperBound = lowerBound + 4;
    ageGroup = `${lowerBound}-${upperBound}` as keyof typeof CRITICAL_ILLNESS_RATES;
  }

  // Default to 'Individual' if eligibility is undefined
  const safeEligibility = eligibility || 'Individual';

  return CRITICAL_ILLNESS_RATES[ageGroup][safeEligibility];
};

export function calculatePremiumByCostView(premium: number, costView: CostView): number {
  switch (costView) {
    case 'Monthly':
      return premium;
    case 'Weekly':
      return premium / 4;  // Approximately 52 weeks / 12 months
    case 'Semi-Monthly':
      return premium / 2;
    case 'Annual':
      return premium * 12;
    default:
      console.warn(`Unexpected cost view: ${costView}. Returning monthly premium.`);
      return premium;
  }
}

type PremiumCalculation = {
  [K in Product]: (
    individualInfo: IndividualInfo,
    plan: Plan,
    personType: 'owner' | 'employee'
  ) => number;
};

export function calculateSTDPremium(individualInfo: IndividualInfo, plan: Plan, personType: 'owner' | 'employee'): number {
  const person = individualInfo[personType];
  const { annualSalary, age } = person;

  const grossWeeklyIncome = annualSalary / STD_CONFIG.weeks;
  
  // Calculate benefit amount
  const weeklyBenefitAmount = grossWeeklyIncome * STD_CONFIG.benefitAmountKey;
  
  // Apply maxCoverageAmount to the weekly benefit
  const cappedWeeklyBenefit = Math.min(weeklyBenefitAmount, STD_CONFIG.maxCoverageAmount);
  
  // Calculate units based on the capped weekly benefit
  const units = cappedWeeklyBenefit / STD_CONFIG.unitsKey;
  
  // Apply maxUnits
  const unitsMax = Math.min(units, STD_CONFIG.maxUnits);
  
  const ageBandRate = getAgeBandRate(age, STD_CONFIG.ageBandRates);

  return unitsMax * ageBandRate;
}

export function calculateLTDPremium(individualInfo: IndividualInfo, plan: Plan, personType: 'owner' | 'employee'): number {
  const person = individualInfo[personType];
  const { annualSalary } = person;

  const maxUnits = LTD_CONFIG.maxUnits[plan];
  const costPerHundred = LTD_CONFIG.costPerHundred[plan];

  // Calculate monthly salary
  const monthlySalary = annualSalary / 12;

  // Calculate units (monthly salary / 100)
  const units = monthlySalary / 100;

  // Apply maxUnits based on the plan
  const finalUnits = plan === 'Premium' ? Math.min(units, maxUnits) : Math.min(units, maxUnits);

  // Calculate monthly premium
  const monthlyPremium = finalUnits * costPerHundred;

  console.log(`LTD Calculation for ${personType}:`, {
    annualSalary,
    monthlySalary,
    units,
    maxUnits,
    finalUnits,
    costPerHundred,
    monthlyPremium
  });

  return monthlyPremium;
}
export function calculateLifeADDPremium(individualInfo: IndividualInfo, plan: Plan, personType: 'owner' | 'employee'): number {
  const person = individualInfo[personType];
  const { age, employeeCoverage, spouseCoverage, numberOfChildren, eligibility } = person;

  // Calculate individual premium
  const units_individual = Math.min(employeeCoverage / LIFE_ADD_CONFIG.units, LIFE_ADD_CONFIG.units_max_individual);
  const monthly_premium_individual = units_individual * getAgeBandRate(age, LIFE_ADD_CONFIG.ageBandRates);

  let monthly_premium_spouse = 0;
  let monthly_premium_children = 0;

  // Calculate spouse premium for 'Individual + Spouse' and 'Family' eligibility
  if (eligibility === 'Individual + Spouse' || eligibility === 'Family') {
    const max_coverage_spouse = Math.min(
      LIFE_ADD_CONFIG.max_coverage_amount_spouse,
      employeeCoverage * LIFE_ADD_CONFIG.max_coverage_amount_spouse_conditional
    );
    const units_spouse = Math.min(spouseCoverage, max_coverage_spouse) / LIFE_ADD_CONFIG.units;
    const units_max_spouse = Math.min(units_spouse, LIFE_ADD_CONFIG.units_max_spouse);
    monthly_premium_spouse = units_max_spouse * getAgeBandRate(age, LIFE_ADD_CONFIG.ageBandRates);
  }

  // Calculate children premium for 'Individual + Children' and 'Family' eligibility
  if (eligibility === 'Individual + Children' || eligibility === 'Family') {
    monthly_premium_children = Math.min(numberOfChildren, LIFE_ADD_CONFIG.max_number_of_children) * LIFE_ADD_CONFIG.children_rate;
  }

  // Sum up all applicable premiums
  const total_premium = monthly_premium_individual + monthly_premium_spouse + monthly_premium_children;

  console.log('Individual Premium:', monthly_premium_individual);
  console.log('Spouse Premium:', monthly_premium_spouse);
  console.log('Children Premium:', monthly_premium_children);
  console.log('Total Premium:', total_premium);

  return total_premium;
}

const PREMIUM_CALCULATIONS: PremiumCalculation = {
  STD: calculateSTDPremium,
  LTD: calculateLTDPremium,
  'Life / AD&D': calculateLifeADDPremium,
  Accident: (individualInfo, plan, personType) =>
    ACCIDENT_PREMIUMS[plan][individualInfo[personType].eligibility],
  Dental: (individualInfo, plan, personType) => {
    const { businessZipCode } = individualInfo;
    const region = getZipCodeRegion(businessZipCode);
    if (region === null) {
      console.warn(`No region found for businessZipCode: ${businessZipCode}`);
      return 0;
    }
    return DENTAL_PREMIUMS[plan][region][individualInfo[personType].eligibility] || 0;
  },
  Vision: (individualInfo, plan, personType) => {
    const { state } = individualInfo;
    const stateCategory = getStateCategory(state);
    return VISION_PREMIUMS[stateCategory][plan][individualInfo[personType].eligibility];
  },
  'Critical Illness/Cancer': (individualInfo, plan, personType) => {
    const person = individualInfo[personType];
    const { age, eligibility } = person;
    return getCriticalIllnessRate(age, eligibility);
  }
};

export const calculatePremiums = (
  individualInfo: IndividualInfo,
  plan: Plan,
  selectedProduct: Product,
  costView: CostView
): number => {
  const calculatePremium = PREMIUM_CALCULATIONS[selectedProduct];

  if (!calculatePremium) return 0;

  const ownerPremium = calculatePremium(individualInfo, plan, 'owner');
  const employeePremium = calculatePremium(individualInfo, plan, 'employee');

  // Ensure both owner and employee have a valid eligibility
  if (!individualInfo.owner.eligibility) individualInfo.owner.eligibility = 'Individual';
  if (!individualInfo.employee.eligibility) individualInfo.employee.eligibility = 'Individual';
  
  const totalEmployees = individualInfo.businessEmployees;
  const weightedPremium = ((ownerPremium * 1) + (employeePremium * totalEmployees)) / (totalEmployees + 1);

  // Apply cost view adjustment
  const adjustedPremium = calculatePremiumByCostView(weightedPremium, costView);

  console.log("Owner Premium", "Plan:", plan, ownerPremium);
  console.log("Employee Premium","Plan:", plan, employeePremium);
  console.log("Weighted Premium", "Plan:", plan, weightedPremium);
  console.log("Adjusted Premium", "Plan:", plan, adjustedPremium);

  return adjustedPremium;
};

export type {
  Product,
  EligibilityOption,
  USState,
  Plan,
  IndividualInfo
};

export {
  PRODUCTS,
  ELIGIBILITY_OPTIONS,
  US_STATES,
  DENTAL_PREMIUMS,
  VISION_PREMIUMS,
  AGE_BANDED_RATES,
  ZIP_CODE_REGIONS,
  STATE_CATEGORIES,
  STD_CONFIG,
  LTD_CONFIG,
  LIFE_ADD_CONFIG,
  ACCIDENT_PREMIUMS,
  PRODUCT_ELIGIBILITY_OPTIONS
};
