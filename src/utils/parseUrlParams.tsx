//src\utils\parseUrlParams.tsx


import { IndividualInfo, EligibilityOption } from '../utils/insuranceTypes';
import { urlParamDefinitions } from './urlParam-def';

const eligibilityMapping: Record<number, EligibilityOption> = {
  1: 'Individual',
  2: 'Individual + Spouse',
  3: 'Individual + Children',
  4: 'Family',
};

export type ParsedUrlParams = Partial<IndividualInfo> & {
  showCostPerHour: boolean;
  showQuoteSection: boolean;
  showFunnel: boolean;
  showSplash: boolean;
  zipDebug: boolean;
  cpValue?: string;
  isKen?: boolean; // New flag
};

export function parseUrlParams(): ParsedUrlParams {
  const params = new URLSearchParams(window.location.search);
  const result: ParsedUrlParams = {
    showCostPerHour: false,
    showQuoteSection: false,
    showFunnel: false,
    showSplash: true,
    zipDebug: false,
  };
  
  
  // Splashscreen param check
  const splashParam = params.get('splash');
  if (splashParam === '1') {
    result.showSplash = true;
  }


// Funnel param check
  const funParam = params.get('fun');
  if (funParam === '1') {
    result.showFunnel = true;
  }

  // ZIP debug param check
  const zipDebugParam = params.get('zipdebug');
  if (zipDebugParam === '1') {
    result.zipDebug = true;
  }

  

  const userParam = params.get('user');
  const userParams = userParam ? urlParamDefinitions[userParam as keyof typeof urlParamDefinitions] : null;

  if (userParams) {
    result.zipCode = userParams.zipCode;
    result.age = userParams.age;
    result.annualSalary = userParams.annualSalary;
    result.eligibility = eligibilityMapping[userParams.eligibility];
    result.showCostPerHour = userParams.cv === 1;
  } else {
    // Fallback to individual parameters in URL if no user match
    const age = params.get('age');
    if (age) {
      result.age = parseInt(age, 10);
    }

    const zipCode = params.get('zipCode');
    if (zipCode) {
      result.zipCode = zipCode;
    }

    const annualSalary = params.get('annualSalary');
    if (annualSalary) {
      result.annualSalary = parseInt(annualSalary, 10);
    }

    const eligibilityParam = params.get('eligibility');
    if (eligibilityParam) {
      const eligibilityNumber = parseInt(eligibilityParam, 10);
      if (!isNaN(eligibilityNumber) && eligibilityNumber in eligibilityMapping) {
        result.eligibility = eligibilityMapping[eligibilityNumber];
      } else if (isValidEligibility(eligibilityParam)) {
        result.eligibility = eligibilityParam as IndividualInfo['eligibility'];
      }
    }

    const showQuoteParam = params.get('showQuote');
    if (showQuoteParam === '1') {
      result.showQuoteSection = true;
    }

    const cvParam = params.get('cv');
    if (cvParam === '1') {
      result.showCostPerHour = true;
    }
  }
  const cpParam = params.get('cp');
  if (cpParam) {
    result.cpValue = cpParam;
    result.isKen = cpParam === 'ken'; // Set the flag if cp=ken
  }

  return result;
}

function isValidEligibility(eligibility: string | null): eligibility is EligibilityOption {
  return eligibility !== null && ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'].includes(eligibility);
}

export const { showCostPerHour, showFunnel, showSplash, zipDebug } = parseUrlParams();