import { IndividualInfo, EligibilityOption } from '../utils/insuranceTypes';



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

  if (params.get('eligibility')) {
    result.eligibility = params.get('eligibility') as IndividualInfo['eligibility'];
  }

  return result;
}

function isValidEligibility(eligibility: string | null): eligibility is EligibilityOption {
  return eligibility !== null && ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'].includes(eligibility);
}