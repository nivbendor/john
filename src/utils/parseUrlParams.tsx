import { IndividualInfo, EligibilityOption } from '../utils/insuranceTypes';

const eligibilityMapping: Record<number, EligibilityOption> = {
  1: 'Individual',
  2: 'Individual + Spouse',
  3: 'Individual + Children',
  4: 'Family'
};

export function parseUrlParams(): Partial<IndividualInfo> {
  const params = new URLSearchParams(window.location.search);
  const result: Partial<IndividualInfo> = {};

  // Business Information
  const zipCode = params.get('zipCode');
  if (params.get('age')) {
    result.age = parseInt(params.get('age')!, 10);
  }

  if (params.get('annualSalary')) {
    result.annualSalary = parseInt(params.get('annualSalary')!, 10);
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

  return result;
}

function isValidEligibility(eligibility: string | null): eligibility is EligibilityOption {
  return eligibility !== null && ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'].includes(eligibility);
}
