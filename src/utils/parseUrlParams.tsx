import { IndividualInfo, EligibilityOption } from '../utils/insuranceTypes';
import { urlParamDefinitions } from './urlParam-def';

const eligibilityMapping: Record<number, EligibilityOption> = {
  1: 'Individual',
  2: 'Individual + Spouse',
  3: 'Individual + Children',
  4: 'Family',
};

export function parseUrlParams(): Partial<IndividualInfo> & { showCostPerHour: boolean; showQuoteSection: boolean } {
  const params = new URLSearchParams(window.location.search);
  const result: Partial<IndividualInfo> & { showCostPerHour: boolean; showQuoteSection: boolean } = {
    showCostPerHour: false,
    showQuoteSection: false,
  };

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

  return result;
}

function isValidEligibility(eligibility: string | null): eligibility is EligibilityOption {
  return eligibility !== null && ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'].includes(eligibility);
}

export const { showCostPerHour } = parseUrlParams();
