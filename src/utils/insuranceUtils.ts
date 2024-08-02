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
  calculatePremiumByCostView
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
  return !['STD', 'Life / AD&D', 'Critical Illness/Cancer'].includes(product);
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
    plan: Plan,
    personType: 'owner' | 'employee'
  ) => number;
};

export function calculateSTDPremium(individualInfo: IndividualInfo, plan: Plan, personType: 'owner' | 'employee'): number {
  // Always use 'Basic' plan for STD
    
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

  const monthlyPremiums = unitsMax * ageBandRate;
  
  console.log('STD Calculation Result:', {
    unitsMax,
    units,
    ageBandRate,
    monthlyPremiums
  }
);
return monthlyPremiums
}

export function calculateLTDPremium(individualInfo: IndividualInfo, plan: Plan, personType: 'owner' | 'employee'): number {
  const person = individualInfo[personType];
  const { annualSalary } = person;

  console.log('LTD Calculation Input:', { annualSalary, plan, personType });

  const maxUnits = LTD_CONFIG.maxUnits[plan];
  const costPerHundred = LTD_CONFIG.costPerHundred[plan];

  // Calculate monthly salary
  const monthlySalary = annualSalary / 12;

  // Calculate units (monthly salary / 100)
  const units = monthlySalary / 100;

  // Apply maxUnits based on the plan
  const finalUnits = Math.min(units, maxUnits);

  // Calculate monthly premium
  const monthlyPremium = finalUnits * costPerHundred;

  console.log('LTD Calculation Result:', {
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
  const { age, employeeCoverage, spouseCoverage, eligibility } = person;
  const totalEmployees = individualInfo.businessEmployees;

  // Calculate individual premium
  const units_individual = Math.min(employeeCoverage / LIFE_ADD_CONFIG.units, LIFE_ADD_CONFIG.units_max_individual);
  const monthly_premium_individual = units_individual * getAgeBandRate(age, LIFE_ADD_CONFIG.ageBandRates);

  let monthly_premium_spouse = 0;
  let monthly_premium_children = 0;

  // Calculate spouse premium for 'Individual + Spouse' and 'Family' eligibility
  if (eligibility === 'Individual + Spouse' || eligibility === 'Family') {
    const max_coverage_spouse = Math.min(
      employeeCoverage * LIFE_ADD_CONFIG.max_coverage_amount_spouse_conditional,
      LIFE_ADD_CONFIG.max_coverage_amount_spouse
    );
    const units_spouse = Math.min(spouseCoverage / LIFE_ADD_CONFIG.units, max_coverage_spouse / LIFE_ADD_CONFIG.units);
    const units_max_spouse = Math.min(units_spouse, LIFE_ADD_CONFIG.units_max_spouse);
    monthly_premium_spouse = units_max_spouse * getAgeBandRate(age, LIFE_ADD_CONFIG.ageBandRates);
  }

  // Calculate children premium for 'Individual + Children' and 'Family' eligibility
  if (eligibility === 'Individual + Children' || eligibility === 'Family') {
    monthly_premium_children = LIFE_ADD_CONFIG.children_rate;
  }

  // Sum up all applicable premiums
  const total_premium = monthly_premium_individual + monthly_premium_spouse + monthly_premium_children;

  // Calculate final premium based on personType
  const final_premium = personType === 'employee' 
    ? total_premium * totalEmployees 
    : total_premium;

  console.log('Life Individual Premium:', monthly_premium_individual.toFixed(2));
  console.log('Life Spouse Premium:', monthly_premium_spouse.toFixed(2));
  console.log('Life Children Premium:', monthly_premium_children.toFixed(2));
  console.log('Life Total Premium:', total_premium.toFixed(2));
  console.log('Life Final Premium:', final_premium.toFixed(2));

  return total_premium;
}

export const Dental = (individualInfo: IndividualInfo, plan: Plan, personType: 'owner' | 'employee'): number => {
  const { businessZipCode } = individualInfo;
  const eligibility = individualInfo[personType].eligibility;
  
  const region = getZipCodeRegion(businessZipCode);
  if (region === null) {
    console.warn(`No region found for businessZipCode: ${businessZipCode}. Using default region.`);
    return DENTAL_PREMIUMS[plan]?.['1']?.[eligibility] || 0;
  }
  
  const premium = DENTAL_PREMIUMS[plan]?.[region]?.[eligibility] || 0;
  if (premium === 0) {
    console.warn(`No premium found for plan: ${plan}, region: ${region}, eligibility: ${eligibility}`);
  }
  return premium;
};


export const PREMIUM_CALCULATIONS: PremiumCalculation = {
  STD: calculateSTDPremium,
  LTD: calculateLTDPremium,
  'Life / AD&D': calculateLifeADDPremium,
  Accident: (individualInfo, plan, personType) =>
    ACCIDENT_PREMIUMS[plan][individualInfo[personType].eligibility],
  Dental: Dental,
  
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
