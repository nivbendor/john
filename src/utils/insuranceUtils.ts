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
  CostView,
  calculatePremiumByCostView,
  ToggleState
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
} from './insuranceConfig';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function hasMultiplePlans(product: Product): boolean {
  return !['STD', 'Life / AD&D', 'Critical Illness/Cancer', 'LTD'].includes(product);
}

function getLTDPlan(annualSalary: number): Plan {
  return annualSalary >= 100000 ? 'Premium' : 'Basic';
}

export function calculateLTDPremium(individualInfo: IndividualInfo, plan: Plan): number {
  const { annualSalary } = individualInfo;
  const actualPlan = getLTDPlan(annualSalary);

  const maxUnits = LTD_CONFIG.maxUnits[actualPlan];
  const costPerHundred = LTD_CONFIG.costPerHundred[actualPlan];
  const monthlySalary = annualSalary / 12;
  const units = monthlySalary / 100;
  const finalUnits = Math.min(units, maxUnits);

  return finalUnits * costPerHundred;
}



const getAgeBandRate = (age: number, ageBandRates: typeof AGE_BANDED_RATES): number => {
  const ageBand = ageBandRates.find(band => age >= band.minAge && age <= band.maxAge);
  return ageBand ? ageBand.rate : ageBandRates[ageBandRates.length - 1].rate;
};

const getZipCodeRegion = (zipCode: string | number | null | undefined): number | null => {
  console.log(`--- Debug: getZipCodeRegion ---`);
  console.log(`Input ZIP code: ${zipCode}`);

  // Convert to string and trim
  const zipString = String(zipCode || '').trim();

  // Check if the resulting string is empty or not a valid zip code format
  if (!zipString || !/^\d{5}$/.test(zipString)) {
    console.log(`Invalid zip code: ${zipString}`);
    return null;
  }

  const zipPrefix = zipString.substring(0, 3);
  console.log(`ZIP prefix: ${zipPrefix}`);

  for (const [region, prefixes] of Object.entries(ZIP_CODE_REGIONS)) {
    console.log(`Checking region ${region}`);
    console.log(`Prefixes: ${prefixes.join(', ')}`);
    if (prefixes.includes(zipPrefix)) {
      console.log(`Found matching region: ${region}`);
      return parseInt(region, 10);
    }
  }

  console.log(`No exact match found. Searching for closest region.`);

  // If no exact match found, try to find the closest region
  const numericPrefix = parseInt(zipPrefix, 10);
  let closestRegion: number | null = null;
  let smallestDifference = Infinity;

  for (const [region, prefixes] of Object.entries(ZIP_CODE_REGIONS)) {
    for (const prefix of prefixes) {
      const difference = Math.abs(parseInt(prefix, 10) - numericPrefix);
      if (difference < smallestDifference) {
        smallestDifference = difference;
        closestRegion = parseInt(region, 10);
      }
    }
  }

  if (closestRegion !== null) {
    console.log(`Closest region found: ${closestRegion}`);
    return closestRegion;
  }

  console.warn(`No region found for zip prefix: ${zipPrefix}`);
  console.log(`--- End Debug: getZipCodeRegion ---`);
  return null;
};

const getStateCategory = (state: USState): string => {
  return Object.keys(STATE_CATEGORIES).find(category => STATE_CATEGORIES[category].includes(state)) || 'Other';
};
const validateZipCode = (zipCode: string): boolean => {
  return /^\d{5}$/.test(zipCode);
};

export { getZipCodeRegion, getStateCategory, validateZipCode };

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



type PremiumCalculation = {
  [K in Product]: (
    individualInfo: IndividualInfo,
    plan: Plan
  ) => number;
};

export function calculateSTDPremium(individualInfo: IndividualInfo, plan: Plan): number {
  const { annualSalary } = individualInfo;

  const grossWeeklyIncome = annualSalary / STD_CONFIG.weeks;
  const weeklyBenefitAmount = grossWeeklyIncome * STD_CONFIG.benefitAmountKey;
  const cappedWeeklyBenefit = Math.min(weeklyBenefitAmount, STD_CONFIG.maxCoverageAmount);
  const units = cappedWeeklyBenefit / STD_CONFIG.unitsKey;
  const unitsMax = Math.min(units, STD_CONFIG.maxUnits);
  const ageBandRate = getAgeBandRate(individualInfo.age, STD_CONFIG.ageBandRates);

  return unitsMax * ageBandRate;
}


export function calculateLifeADDPremium(individualInfo: IndividualInfo, plan: Plan): number {
  const { age, employeeCoverage, spouseCoverage, eligibility } = individualInfo;

  const units_individual = Math.min(employeeCoverage / LIFE_ADD_CONFIG.units, LIFE_ADD_CONFIG.units_max_individual);
  const monthly_premium_individual = units_individual * getAgeBandRate(age, LIFE_ADD_CONFIG.ageBandRates);

  let monthly_premium_spouse = 0;
  let monthly_premium_children = 0;

  if (eligibility === 'Individual + Spouse' || eligibility === 'Family') {
    const max_coverage_spouse = Math.min(
      employeeCoverage * LIFE_ADD_CONFIG.max_coverage_amount_spouse_conditional,
      LIFE_ADD_CONFIG.max_coverage_amount_spouse
    );
    const units_spouse = Math.min(spouseCoverage / LIFE_ADD_CONFIG.units, max_coverage_spouse / LIFE_ADD_CONFIG.units);
    const units_max_spouse = Math.min(units_spouse, LIFE_ADD_CONFIG.units_max_spouse);
    monthly_premium_spouse = units_max_spouse * getAgeBandRate(age, LIFE_ADD_CONFIG.ageBandRates);
  }

  if (eligibility === 'Individual + Children' || eligibility === 'Family') {
    monthly_premium_children = LIFE_ADD_CONFIG.children_rate;
  }

  return monthly_premium_individual + monthly_premium_spouse + monthly_premium_children;
}

export const PREMIUM_CALCULATIONS: PremiumCalculation = {
  STD: calculateSTDPremium,
  LTD: calculateLTDPremium,
  'Life / AD&D': calculateLifeADDPremium,
  Accident: (individualInfo, plan) => ACCIDENT_PREMIUMS[plan][individualInfo.eligibility],
  Dental: (individualInfo, plan) => {
    const region = getZipCodeRegion(individualInfo.zipCode);
    return region !== null ? (DENTAL_PREMIUMS[plan]?.[region]?.[individualInfo.eligibility] || 0) : 0;
  },
  Vision: (individualInfo, plan) => {
    const stateCategory = getStateCategory(individualInfo.state);
    return VISION_PREMIUMS[stateCategory][plan][individualInfo.eligibility];
  },
  'Critical Illness/Cancer': (individualInfo, plan) => {
    return getCriticalIllnessRate(individualInfo.age, individualInfo.eligibility);
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

  const premium = calculatePremium(individualInfo, plan);
  return calculatePremiumByCostView(premium, costView);
};

export const calculateTotalPremium = (
premiums: Record<Product, number>, activeProducts: Record<Product, boolean>, toggleStates: Record<Product, ToggleState>,
): number => {
  return Object.entries(activeProducts).reduce((total, [product, isActive]) => {
    if (isActive) {
      return total + premiums[product as Product];
    }
    return total;
  }, 0);
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
    PRODUCT_ELIGIBILITY_OPTIONS, calculatePremiumByCostView
  };
