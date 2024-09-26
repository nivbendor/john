// utils/insuranceUtils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useMemo } from 'react';
import { findStateByZipCode } from './loadStateFromZip';


import {
  Product,
  EligibilityOption,
  USState,
  Plan,
  IndividualInfo,
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
  insuranceConfig,
  defaultPlans,
  PRODUCTS,
} from './insuranceConfig';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


const getStateFromZip = (zipCode: string): USState | null => {
  console.log(`getStateFromZip called with: ${zipCode}`);
  console.trace(); // This will print the call stack
  return findStateByZipCode(zipCode); // Use the existing mapping function
};



const getZipCodeRegion = (zipCode: string): number | null => {
  const zipPrefix = zipCode.substring(0, 3);
  for (const [region, prefixes] of Object.entries(ZIP_CODE_REGIONS)) {
    if (prefixes.includes(zipPrefix)) {
      return parseInt(region, 10);
    }
  }
  return null;
};






const getSTDRate = (age: number): number => {
  const ageGroup = STD_CONFIG.ageBandRates.find(band => age >= band.minAge && age <= band.maxAge);
  return ageGroup ? ageGroup.rate : STD_CONFIG.ageBandRates[STD_CONFIG.ageBandRates.length - 1].rate;
};

const getLifeADDRate = (age: number): number => {
  const ageGroup = LIFE_ADD_CONFIG.ageBandRates.find(band => age >= band.minAge && age <= band.maxAge);
  return ageGroup ? ageGroup.rate : LIFE_ADD_CONFIG.ageBandRates[LIFE_ADD_CONFIG.ageBandRates.length - 1].rate;
};


const getStateCategory = (zipCode: string): 'AK' | 'CA,CT,HI,NJ,NV,WA' | 'Other' => {
  const state = getStateFromZip(zipCode); // Use the corrected function to get the state from the ZIP code

  if (!state) {
    return 'Other'; // Default category if the state is not found
  }

  // Existing state category logic
  if (state === 'AK') return 'AK';
  if (['CA', 'CT', 'HI', 'NJ', 'NV', 'WA'].includes(state)) return 'CA,CT,HI,NJ,NV,WA';
  return 'Other';
};

// Dynamic content
export function calculateLTDBenefit(annualSalary: number, plan: 'Basic' | 'Premium'): number {
  if (annualSalary <= 0) {
    return 0;
  }

  const monthlyBenefit = (annualSalary / 12) * 0.6;
  const maxBenefit = LTD_CONFIG.maxBenefitAmount[plan];
  const cappedBenefit = Math.min(monthlyBenefit, maxBenefit);
  
  return Math.round(cappedBenefit * 100) / 100; // Rounded to two decimal places
}

//incontent Dynamic - STD Weekly
export function calculateSTDBenefit(annualSalary: number): number {
  if (annualSalary <= 0) {
    return 0;
  }

  const weeklyBenefit = (annualSalary / STD_CONFIG.weeks) * STD_CONFIG.benefitAmountKey;
  const cappedBenefit = Math.min(weeklyBenefit, STD_CONFIG.maxCoverageAmount);
  
  return Math.round(cappedBenefit * 100) / 100; // Rounded to two decimal places
}


export const getDefaultIndividualData = () => {
  return { ...insuranceConfig.Individual };
};

// Display / Hide plan dropdown
export function hasMultiplePlans(product: Product): boolean {
  return !['STD', 'Life / AD&D', 'Critical Illness/Cancer', 'LTD', 'Accident', 'Dental', 'Vision'].includes(product);
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

const getAgeBandRate = (age: number, ageBandRates: { minAge: number; maxAge: number; rate: number }[]): number => {
  const ageBand = ageBandRates.find(band => age >= band.minAge && age <= band.maxAge);
  return ageBand ? ageBand.rate : ageBandRates[ageBandRates.length - 1].rate;
};

export function getCriticalIllnessRate(age: number, eligibility: EligibilityOption): number {
  const ageBandRate = getAgeBandRate(age, CRITICAL_ILLNESS_RATES);
  return ageBandRate * (eligibility === 'Individual' ? 1 : 2);
}

export const PREMIUM_CALCULATIONS: Record<Product, (individualInfo: IndividualInfo, plan: Plan) => number> = {
  STD: (individualInfo, plan) => {
    const { age, annualSalary } = individualInfo;
    const rate = getSTDRate(age);
    
    const grossWeeklyIncome = annualSalary / STD_CONFIG.weeks;
    const weeklyBenefitAmount = grossWeeklyIncome * STD_CONFIG.benefitAmountKey;
    const cappedWeeklyBenefit = Math.min(weeklyBenefitAmount, STD_CONFIG.maxCoverageAmount);
    const units = cappedWeeklyBenefit / STD_CONFIG.unitsKey;
    const finalUnits = Math.min(units, STD_CONFIG.maxUnits);
    
    return finalUnits * rate;
  },

  LTD: calculateLTDPremium,
  'Life / AD&D': (individualInfo, plan) => {
    const { age, employeeCoverage = 0, spouseCoverage = 0, eligibility } = individualInfo;
    if (age === 0) {
      return 0;
    }
    const rate = getLifeADDRate(age);
    
    // Calculate individual premium
    const units_individual = Math.min(employeeCoverage / LIFE_ADD_CONFIG.units, LIFE_ADD_CONFIG.units_max_individual);
    const monthly_premium_individual = units_individual * rate;

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
      monthly_premium_spouse = units_max_spouse * rate;
    }

    // Calculate children premium for 'Individual + Children' and 'Family' eligibility
    if (eligibility === 'Individual + Children' || eligibility === 'Family') {
      monthly_premium_children = LIFE_ADD_CONFIG.children_rate;
    }

    // Sum up all applicable premiums
    return monthly_premium_individual + monthly_premium_spouse + monthly_premium_children;
  },

  Accident: (individualInfo, plan) => {
    // Return 0 if age is 0
    if (individualInfo.age === 0) {
      return 0;
    }
    return ACCIDENT_PREMIUMS[plan][individualInfo.eligibility];
  },

  Dental: (individualInfo, plan) => {
    const region = getZipCodeRegion(individualInfo.zipCode);
    return region !== null ? (DENTAL_PREMIUMS[plan]?.[region]?.[individualInfo.eligibility] || 0) : 0;
  },
  
  Vision: (individualInfo, plan) => {
    if (individualInfo.age === 0) {
      return 0;
    }
    
    const stateCategory = getStateCategory(individualInfo.zipCode);
    
    return VISION_PREMIUMS[stateCategory][plan][individualInfo.eligibility];
  },
  // Vision: (individualInfo, plan) => {
  //   // Return 0 if age is 0
  //   if (individualInfo.age === 0) {
  //     return 0;
  //   }
    
    
  //   const stateCategory = getStateCategory(individualInfo.state);
  //   console.log('Vision Premium Calculation:', {
  //     state: individualInfo.state,
  //     stateCategory: stateCategory,
  //     plan: plan,
  //     eligibility: individualInfo.eligibility,
  //     premium: VISION_PREMIUMS
  //   });
  //   return VISION_PREMIUMS[stateCategory][plan][individualInfo.eligibility];
  // },


  'Critical Illness/Cancer': (individualInfo, plan) => {
    // Return 0 if age is 0
    if (individualInfo.age === 0) {
      return 0;
    }
    return getCriticalIllnessRate(individualInfo.age, individualInfo.eligibility);
  }
};

export const calculatePremiums = (
  individualInfo: IndividualInfo,
  selectedProduct: Product,
  costView: CostView,
  plan: Plan = defaultPlans[selectedProduct] // Use the default plan from defaultPlans
): number => {
  const calculatePremium = PREMIUM_CALCULATIONS[selectedProduct];

  if (!calculatePremium) return 0;

  const premium = calculatePremium(individualInfo, plan);
  return calculatePremiumByCostView(premium, costView);
};

export const calculateTotalPremium = (
  premiums: Record<Product, number>,
  activeProducts: Record<Product, boolean>,
  toggleStates: Record<Product, ToggleState>
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
    PRODUCT_ELIGIBILITY_OPTIONS,
    calculatePremiumByCostView,
  getLifeADDRate,
  getZipCodeRegion,
  getStateFromZip,
  };
